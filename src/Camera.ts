import * as Utils from "Utils";
import {Color} from "Color";
import {Matrix4x4} from "Matrix4x4";
import {Vector3} from "Vector3";

import {screenWidth} from "WebGLTS";
import {screenHeight} from "WebGLTS";

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
    public backgroundColor = Color.Black;

    public Init(gl: WebGLRenderingContext)
    {
        //SetPerspective
        this.pMatrix = Matrix4x4.Identity();
        this.pMatrix.matrix = Utils.makePerspective(this.fieldOfView, screenWidth / screenHeight, this.znear, this.zfar);

        gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    public Update(): void
    {
        this.pMatrix.Translate(this.position);
        this.pMatrix.Rotate(this.rot, this.axis);
    }
}