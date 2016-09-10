import * as Utils from "Utils";
import {Camera} from "Camera";
import {Color} from "Color";
import {Time} from "Time";
import {Input} from "Input/Input";
import {MouseCode} from "Input/MouseCode";
import {Matrix4x4} from "Matrix4x4";
import {Vector3} from "Vector3";

import {DrawableObject} from "DrawableObject";
import {Plane} from "Plane";
import {Triangle} from "Triangle";
import {Pyramid3D} from "Pyramid3D";
import {Scene} from "Scene";

import {Shader} from "Shaders";

let gl; // A global variable for the WebGL context
const TARGET_FPS = 60; //Target fps for the webgl program
let time: Time;
let input: Input;

let scene: Scene;

//TODO
 //Nice way to move, rotate, scale
 //Other shapes... interfaces. refactoring BOX, LINE, TRIANGLE : Inherit from DrawableObject, 
  //COMBINE THESE MESHES WITH SAME SHADER TO REDUCE DRAWCALLS!!!
 //SHADER Modifying
  //textures
  //lightning
   //Ambient
   //Directional
    //CALCULATE VERTEX NORMALS
 //TEXT
 //Advanced shaders, speculars etc....
//Separate engine - program code?
//Node FileServing.
//More unit tests!

function GameLoop()
{
  //Call Scene Update
  scene.Update();

  //Call Scene LateUpdate
  scene.LateUpdate();

  //Render Scene
  scene.Render();

  //EngineStuff
  input.Update();
  time.countDeltaTime();

  document.getElementById("glfps").innerHTML = "FPS:" + countFPS() + " Dtime:" + time.getDeltaTime() + " time:" + time.getTime();
}

let fps: number = 0, currentFPS: number = 0, frameTime: number = 0;

/**
 * Counts fps on the program
 * @returns number
 */
function countFPS(): number
{
  fps++;
  if (new Date().getTime() >= frameTime) {
    currentFPS = fps; fps = 0;
    frameTime = new Date().getTime() + 1000;
  }

  return currentFPS;
}

export function start()
{
    let canvas = document.getElementById("glcanvas");

    // Initialize the GL context
    gl = initWebGL(canvas);

    // Only continue if WebGL is available and working
    if (gl)
    {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
      gl.clearDepth(1.0);                 // Clear everything
      gl.enable(gl.DEPTH_TEST);           // Enable depth testing
      gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

      //Init shaders
      let shaderManager = new Shader();
      shaderManager.AddShaderProgram(gl, "vertex.shader", "fragment.shader");
      shaderManager.AddShaderProgram(gl, "vertex.shader", "fragment2.shader");

      //Init Engine Classes
      time = new Time();
      input = new Input();

      //Init Starting Scene
      scene = new Scene(); //TODO LOAD DONT CREATE NEW
      scene.Init(gl);

      setInterval(GameLoop, 1000 / TARGET_FPS);
    }
}

function initWebGL(canvas): WebGLRenderingContext
{
  gl = null;

  try {
    // Try to grab the standard context. If it fails, fallback to experimental.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  }
  catch (e) {}

  // If we don't have a GL context, give up now
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
    gl = null;
  }

  return gl;
}