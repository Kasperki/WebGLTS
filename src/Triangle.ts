import {Color} from "./Color";
import {Vector3} from "./Vector3";
import {Matrix4x4} from "./Matrix4x4";
import {DrawableObject} from "./DrawableObject";

export class Triangle extends DrawableObject
{

    constructor(gl, shader, position: Vector3, color: Color) 
    {
        super(gl,shader,position,color);
        this.InitBuffers();
    }

    /**
     * Init vertices
     */
    public InitBuffers() : void
    {
        this.mesh.vertices = [
            new Vector3(0,1,0),
            new Vector3(-1,-1,0),
            new Vector3(1,-1,0)
        ];

        console.log("Called");

        super.InitBuffers();
    }
}