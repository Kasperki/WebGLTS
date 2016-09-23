import {Color} from "./Color";
import {Vector3} from "./Vector3";
import {GameObject} from "./GameObject";

export class Triangle extends GameObject
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
            new Vector3(0, 1, 0),
            new Vector3(-1, -1, 0),
            new Vector3(1, -1, 0)
        ];

        super.InitBuffers();
    }
}