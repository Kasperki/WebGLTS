import {Color} from "./Color";
import {Vector3} from "./Vector3";
import {Matrix4x4} from "./Matrix4x4";

export class DrawableObject 
{
    public position: Vector3; //Position in world
    public scale: Vector3 = Vector3.One; //Object scale
    public rot: number = 0; //RotationDegrees
    public axis: Vector3 = Vector3.Zero; //Axis where to rotate

    public color: Color;
    public shader;

    private squareVertexPositionBuffer;
    private gl;

    private pUniform;
    private mvUniform;
    private vColorLocation;

    constructor(gl, shader, position: Vector3, color: Color) 
    {
        this.gl = gl;
        this.shader = shader;
        this.position = position;
        this.color = color;

        this.pUniform = this.gl.getUniformLocation(this.shader.shaderProgram, "uPMatrix");
        this.mvUniform = this.gl.getUniformLocation(this.shader.shaderProgram, "uMVMatrix");
        this.vColorLocation = this.gl.getUniformLocation(this.shader.shaderProgram, "vColor");

        this.InitBuffers();
    }

    /**
     * Init vertices
     */
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
    }

    /**
     * Renders object
     */
    public RenderObject(pMatrix) : void
    {  
        //Translate Position
        let mvMatrix = Matrix4x4.Identity();
        mvMatrix.Translate(this.position);

        //Rotate
        mvMatrix.Rotate(this.rot, this.axis); //TODO Add someway to change.

        //Scale
        mvMatrix.Scale(this.scale);

        //DrawPosition
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
        this.gl.vertexAttribPointer(this.shader.vertexPositionAttribute, this.squareVertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

        this.setMatrixUniforms(pMatrix.matrix, mvMatrix.matrix);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.squareVertexPositionBuffer.numItems);
    }

    private setMatrixUniforms(pMatrix, mMatrix) 
    {
        this.gl.uniformMatrix4fv(this.pUniform, false, new Float32Array(pMatrix));
        this.gl.uniformMatrix4fv(this.mvUniform, false, new Float32Array(mMatrix));
        this.gl.uniform4f(this.vColorLocation, this.color.r, this.color.g, this.color.b, this.color.a);
    }
}