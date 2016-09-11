import {Color} from "./Color";
import {Vector3} from "./Vector3";
import {Matrix4x4} from "./Matrix4x4";
import {Mesh} from "./Mesh";

//Object 
  //Mesh
  //Shader
 //RenderMesh

export class DrawableObject
{
    public position: Vector3; //Position in world
    public scale: Vector3 = Vector3.One; //Object scale
    public rot: number = 0; //RotationDegrees
    public axis: Vector3 = Vector3.Zero; //Axis where to rotate

    public color: Color; //Color
    public shader; //Current shader

    public mesh: Mesh = new Mesh();
    private lastVertices: Vector3[];

    protected squareVertexPositionBuffer;
    protected gl;

    protected pUniform;
    protected mvUniform;
    protected vColorLocation;

    constructor(gl: WebGLRenderingContext, shader: WebGLProgram, position: Vector3, color: Color)
    {
        this.gl = gl;
        this.shader = shader;
        this.position = position;
        this.color = color;

        this.gl.useProgram(this.shader.shaderProgram);

        this.pUniform = this.gl.getUniformLocation(this.shader.shaderProgram, "uPMatrix");
        this.mvUniform = this.gl.getUniformLocation(this.shader.shaderProgram, "uMVMatrix");
        this.vColorLocation = this.gl.getUniformLocation(this.shader.shaderProgram, "vColor");
    }

    /**
     * Init buffers
     */
    public InitBuffers(): void
    {
        this.squareVertexPositionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.mesh.Flatten()), this.gl.DYNAMIC_DRAW);

        //Calculate and set mesh normals
    }

    //TODO CHANGE THIS TO MESH.
    private modifyVertices()
    {
        if (this.mesh.vertices !== this.lastVertices)
        {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
            this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(this.mesh.Flatten()));
            this.lastVertices = this.mesh.vertices.slice();

            //ReCalculateNormals?
        }
    }

    /**
     * Renders object
     */
    public RenderObject(pMatrix): void
    {
        this.modifyVertices();

        //Translate Position
        let mvMatrix = Matrix4x4.Identity();
        mvMatrix.Translate(this.position);

        //Rotate
        mvMatrix.Rotate(this.rot, this.axis); //TODO Add goodway to change.

        //Scale
        mvMatrix.Scale(this.scale);

        //DrawPosition
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
        this.gl.vertexAttribPointer(this.shader.vertexPositionAttribute, this.mesh.vertexPositionBufferSize, this.gl.FLOAT, false, 0, 0);

        this.setMatrixUniforms(pMatrix.matrix, mvMatrix.matrix);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.mesh.vertexPositionBufferItems);
    }

    private setMatrixUniforms(pMatrix, mMatrix)
    {
        this.gl.useProgram(this.shader.shaderProgram);
        this.gl.uniformMatrix4fv(this.pUniform, false, new Float32Array(pMatrix));
        this.gl.uniformMatrix4fv(this.mvUniform, false, new Float32Array(mMatrix));
        this.gl.uniform4f(this.vColorLocation, this.color.r, this.color.g, this.color.b, this.color.a);
    }
}