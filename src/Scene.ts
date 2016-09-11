import {DrawableObject} from "DrawableObject";
import {Camera} from "Camera";
import {Matrix4x4} from "Matrix4x4";
import {Vector3} from "Vector3";
import {Pyramid3D} from "Pyramid3D";
import {Color} from "Color";
import {Input} from "Input/Input";
import {Time} from "Time";
import {Shader} from "Shaders";

//TODO MAKE ABSTRACT
export class Scene
{
    public name: string;
    public gameObjects: DrawableObject[];
    public mainCamera: Camera;

    private gl: WebGLRenderingContext;

    public Init(gl: WebGLRenderingContext): void
    {
        this.gl = gl;
        this.mainCamera = new Camera();

        this.gameObjects = [];

        let squareLength = 150;
        for (let y = -8; y < 8; y++)
        {
            for (let x = 0; x < squareLength; x++)
            {
                this.gameObjects.push(new Pyramid3D(gl, Shader.AllShaders[(x % 2 === 0 ? "normal" : "pink" )], new Vector3(-12.5 + x, y * 2 + x / squareLength * 2, -30 * Math.random()), new Color(x / squareLength * 2, x / squareLength, x / squareLength * 2, 1)));
            }
        }
    }

    private timeSpent = 0;
    private a = 0;

    public Update(): void
    {
        this.mainCamera.Init(this.gl);

        this.a += 0.01;
        //IterateAndDrawAllObjects
        for (let i = 0; i < this.gameObjects.length; i++)
        {
            this.gameObjects[i].color = new Color(i / this.gameObjects.length, Math.sin(this.a), Math.tan(this.a), 1);
            //this.gameObjects[i].mesh.vertices[0] = new Vector3(0, Math.cos(this.a) * 10, 0);
            //this.gameObjects[i].mesh.vertices[3] = new Vector3(0, Math.cos(this.a) * 10, 0);
            //this.gameObjects[i].mesh.vertices[6] = new Vector3(0, Math.cos(this.a) * 10, 0);

            //let pos = new Vector3(this.gameObjects[i].position.x * Math.tan(this.a), this.gameObjects[i].position.y, -20 + this.gameObjects[i].position.z * Math.sin(this.a));
            //this.gameObjects[i].position = pos;

            this.gameObjects[i].axis = new Vector3(1, 1, 0);
            this.gameObjects[i].rot = this.a * 100;
        }

        if (Input.GetKey("A"))
        {
            this.mainCamera.position.x += 0.5;
        }
        if (Input.GetKey("D"))
        {
            this.mainCamera.position.x -= 0.5;
        }
        if (Input.GetKey("W"))
        {
            this.mainCamera.position.z += 0.25;
        }
        if (Input.GetKey("S"))
        {
            this.mainCamera.position.z -= 0.25;
        }

        if (Input.GetKey("C"))
        {
            this.mainCamera.position.y += 0.25;
        }
        if (Input.GetKey("Z"))
        {
            this.mainCamera.position.y -= 0.25;
        }

        if (Input.GetKey("Q"))
        {
            this.mainCamera.axis = new Vector3(0, 1, 0);
            this.mainCamera.rot += 1.0;
        }
        if (Input.GetKey("E"))
        {
            this.mainCamera.axis = new Vector3(0, 1, 0);
            this.mainCamera.rot -= 1.0;
        }

    }

    public LateUpdate(): void
    {

    }

    public Render(): void
    {
        this.mainCamera.Update();

        for (let i = 0; i < this.gameObjects.length; i++)
        {
            this.gameObjects[i].RenderObject(this.mainCamera.pMatrix);
        }
    }
}