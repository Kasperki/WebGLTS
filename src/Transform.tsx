import {Component} from "./Component";
import {Vector3} from "./Vector3";
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * Transform
 */
export class Transform extends Component
{
    public position: Vector3; //Position in world
    public scale: Vector3 = Vector3.One; //Object scale
    public rot: number = 0; //RotationDegrees
    public axis: Vector3 = Vector3.Zero; //Axis where to rotate

    public GenerateInspectorDOM()
    {
        var TransformInspector = "TransformInspector";
        var app = 
        <TransformInspector>
            <div className="transformPositionLabel">
                <label>Position </label>
            </div>
            <div className="transformPositionData">
                <input id="posX" type="number"/>
                <input id="posY" type="number"/>
                <input id="posZ" type="number"/>
            </div>

            <div className="transformRotationLabel">
                <label>Rotation </label>
            </div>
            <div className="transformRotationData">
                <p></p>
            </div>

            <div className="transformScaleLabel">
                <label>Scale </label>
            </div>
            <div className="transformScaleData">
                <input id="scaleX" type="number"/>
                <input id="scaleY" type="number"/>
                <input id="scaleZ" type="number"/>
            </div>
        </TransformInspector>;

        ReactDOM.render(
            app,
            document.getElementById('fuckyou')
        );
    }
}