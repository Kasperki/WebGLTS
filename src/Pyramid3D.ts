import {Color} from "./Color";
import {Vector3} from "./Vector3";
import {GameObject} from "./GameObject";

export class Pyramid3D extends GameObject
{

    constructor(gl, shader, name: string, position: Vector3, color: Color)
    {
        super(gl, shader, name, position, color);
        this.InitBuffers();
    }

    /**
     * Init vertices
     */
    public InitBuffers(): void
    {
        this.mesh.vertices = [
            // Front face
            new Vector3(0.0,  1.0,  0.0),
            new Vector3(-1.0, -1.0,  1.0),
            new Vector3( 1.0, -1.0,  1.0),
            // Right face
            new Vector3(0.0,  1.0,  0.0),
            new Vector3(1.0, -1.0,  1.0),
            new Vector3(1.0, -1.0, -1.0),
            // Back face
            new Vector3(0.0,  1.0,  0.0),
            new Vector3(1.0, -1.0, -1.0),
            new Vector3(-1.0, -1.0, -1.0),
            // Left face
            new Vector3(0.0,  1.0,  0.0),
            new Vector3(-1.0, -1.0, -1.0),
            new Vector3(-1.0, -1.0,  1.0)
        ];

        super.InitBuffers();
    }
}