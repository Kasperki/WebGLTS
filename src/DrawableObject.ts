import {Color} from "./Color";
import {Vector3} from "./Vector3";
import {Matrix4x4} from "./Matrix4x4";

export class DrawableObject 
{
    public position: Vector3;
    public scale: Vector3 = Vector3.One;

    public color: Color;
    public shader;

    private squareVertexPositionBuffer;
    private squareVertexColorBuffer;
    private gl;

    private pUniform;
    private mvUniform;

    constructor(gl, shader, position: Vector3, color: Color) 
    {
        this.gl = gl;
        this.shader = shader;
        this.position = position;
        this.color = color;

        this.pUniform = this.gl.getUniformLocation(this.shader.shaderProgram, "uPMatrix");
        this.mvUniform = this.gl.getUniformLocation(this.shader.shaderProgram, "uMVMatrix");

        this.InitBuffers();
    }

    public InitBuffers() : void
    {
        //VERTICES
        this.squareVertexPositionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
        var vertices : number[] = [
            1.0,  1.0,  0.0,
            -1.0, 1.0,  0.0,
            1.0,  -1.0, 0.0,
            -1.0, -1.0, 0.0
        ];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
        this.squareVertexPositionBuffer.itemSize = 3;
        this.squareVertexPositionBuffer.numItems = 4;

        //COLOUR
        this.squareVertexColorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVertexColorBuffer);
        let colors = [];
        for (var i=0; i < 4; i++) {
            colors = colors.concat([this.color.r, this.color.g, this.color.b, this.color.a]);
        }
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);
        this.squareVertexColorBuffer.itemSize = 4;
        this.squareVertexColorBuffer.numItems = 4;
    }

    private a = 0; private rotation = 0;
    public RenderObject(pMatrix) : void
    {  
        this.a += 0.01;
        this.rotation += 10;

        //Translate Position
        let mvMatrix = Matrix4x4.Identity();
        mvMatrix.Translate(new Vector3(this.position.x * Math.tan(this.a), this.position.y, -20 + this.position.z * Math.sin(this.a)));

        //Rotate
        mvMatrix.Rotate(this.rotation, new Vector3(0,1,0)); //TODO Add someway to change.

        //Scale
        mvMatrix.Scale(this.scale);

        //DrawPosition
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
        this.gl.vertexAttribPointer(this.shader.vertexPositionAttribute, this.squareVertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

        //DrawColor
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVertexColorBuffer);
        this.gl.vertexAttribPointer(this.shader.vertexColorAttribute, this.squareVertexColorBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

        this.setMatrixUniforms(pMatrix.matrix, mvMatrix.matrix);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.squareVertexPositionBuffer.numItems);
    }

    private setMatrixUniforms(pMatrix, mMatrix) 
    {
        this.gl.uniformMatrix4fv(this.pUniform, false, new Float32Array(pMatrix));
        this.gl.uniformMatrix4fv(this.mvUniform, false, new Float32Array(mMatrix));
    }
}