import {Transform} from "./Transform";
import {Component} from "./Component";
import {Color} from "./Color";
import {Vector3} from "./Vector3";
import {Matrix4x4} from "./Matrix4x4";
import {Mesh} from "./Mesh";
import * as utils from "./Utils";

//Object 
  //Mesh
  //Shader
 //RenderMesh

//Components[]
 //{ Transform, Color, Mesh, Shader; }

export class GameObject
{
    public id: string; //ID of the object
    public name: string; //Name of the GameObject

    public components: Component[];

    public tranform: Transform; //Position rotation scale
    public color: Color; //Color
    public shader; //Current shader

    public selected: boolean;

    public mesh: Mesh = new Mesh();
    private lastVertices: Vector3[];

    protected vertexPositionBuffer;
    protected gl;

    protected pUniform;
    protected mvUniform;
    protected vColorLocation;

    constructor(gl: WebGLRenderingContext, shader: WebGLProgram, name: string, position: Vector3, color: Color)
    {
        this.gl = gl;
        this.shader = shader;

        this.id = utils.uuid();
        this.name = name;

        this.tranform = new Transform();
        this.tranform.position = position;
        this.color = color;

        this.components = [this.tranform, this.color];

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
        this.vertexPositionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.mesh.Flatten()), this.gl.DYNAMIC_DRAW);

        //Calculate and set mesh normals
    }

    //TODO CHANGE THIS TO MESH.
    private modifyVertices()
    {
        if (this.mesh.vertices !== this.lastVertices)
        {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
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
        mvMatrix.Translate(this.tranform.position);

        //Rotate
        mvMatrix.Rotate(this.tranform.rot, this.tranform.axis); //TODO Add goodway to change.

        //Scale
        mvMatrix.Scale(this.tranform.scale);

        //DrawPosition
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        this.gl.vertexAttribPointer(this.shader.vertexPositionAttribute, this.mesh.vertexPositionBufferSize, this.gl.FLOAT, false, 0, 0);

        this.setMatrixUniforms(pMatrix.matrix, mvMatrix.matrix);

        if (this.selected) {
            this.gl.drawArrays(this.gl.LINE_STRIP, 0, this.mesh.vertexPositionBufferItems);
        }
        else {
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.mesh.vertexPositionBufferItems);
        }

        //TODO DRAWCALSS++
    }

    private setMatrixUniforms(pMatrix, mMatrix)
    {
        this.gl.useProgram(this.shader.shaderProgram);
        this.gl.uniformMatrix4fv(this.pUniform, false, new Float32Array(pMatrix));
        this.gl.uniformMatrix4fv(this.mvUniform, false, new Float32Array(mMatrix));
        this.gl.uniform4f(this.vColorLocation, this.color.r, this.color.g, this.color.b, this.color.a);
    }
}