import * as Utils from "Utils";
import {Color} from "Color";
import {Matrix4x4} from "Matrix4x4";
import {Vector3} from "Vector3";

export class Camera
{
    public fieldOfView = 120;
    public znear = 0.1;
    public zfar = 100.0;

    public position = Vector3.One;
    public rot = 0;
    public axis = Vector3.One;

    public pMatrix;

    //background color of camera
    public background = Color.White;

    public Init(gl)
    {
        //SetPerspective
        this.pMatrix = Matrix4x4.Identity();
        this.pMatrix.matrix = Utils.makePerspective(this.fieldOfView, gl.viewportWidth / gl.viewportHeight, this.znear, this.zfar);

        gl.clearColor(this.background.r, this.background.g, this.background.b, this.background.a);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    public Update(): void
    {
        this.pMatrix.Translate(this.position);
        this.pMatrix.Rotate(this.rot, this.axis);
    }
}