import {Time} from "Time";
import {Input} from "Input/Input";
import {MouseCode} from "Input/MouseCode";
import {Screen} from "Screen";
import {Vector3} from "Vector3";

import {Scene} from "Scene";
import {Shader} from "Shaders";

let gl: WebGLRenderingContext; // A global variable for the WebGL context
const TARGET_FPS = 60; //Target fps for the webgl program

let time: Time;
let input: Input;
let scene: Scene;

//TODO - make use of some cool design patterns that I have not used before?

//FIX CAMERA IMPORT
 //DEBUG IF DEF... REMOVE FROM RELEASE BUILD for example calculate triangles, show DRAWCALLS!!!
  //Typescript 2.1 conditional compilation? https://github.com/Microsoft/TypeScript/issues/3538

 //Next is calculate faces - normals to faces and from that normals to vertices? pass that to shader and draw simple light :)

 //Typescript 2.0 has readonly., use that.
  //Make all methods to use summaries, and strongly type all!
  //Check all who needs getters & setters

 //Nice way to move, rotate, scale
 //Other shapes... interfaces. refactoring BOX, LINE, TRIANGLE : Inherit from DrawableObject, 
  //COMBINE THESE MESHES WITH SAME SHADER TO REDUCE DRAWCALLS!!!
   //static and dynamic batching?
 //SHADER Modifying
  //textures
  //lightning
   //Ambient
   //Directional
    //CALCULATE VERTEX NORMALS
 //TEXT
 //Advanced shaders, speculars etc....
//Separate engine - program code? - etc.. Scenes to load & abstarat that class
//Node FileServing.
//More unit tests!

export function start()
{
    let canvas = <HTMLCanvasElement>document.getElementById("glcanvas");

    // Initialize the GL context
    gl = initWebGL(canvas);

    // Only continue if WebGL is available and working
    if (gl)
    {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
      gl.clearDepth(1.0);                 // Clear everything
      gl.enable(gl.DEPTH_TEST);           // Enable depth testing
      gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

      //Enable blending for opacity
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      //Init shaders
      let shaderManager = new Shader(gl);
      shaderManager.AddShaderProgram("normal", "vertex.shader", "fragment.shader");
      shaderManager.AddShaderProgram("pink", "vertex.shader", "fragment2.shader");

      //Init Engine Classes
      time = new Time();
      input = new Input();

      //Init Starting Scene
      scene = new Scene(); //TODO LOAD DONT CREATE NEW //LOAD BY NAME?
      scene.Init(gl, "Scene1");

      setInterval(GameLoop, 1000 / TARGET_FPS);
    }
}

function initWebGL(canvas: HTMLCanvasElement): WebGLRenderingContext
{
  gl = null;

  try {
    // Try to grab the standard context. If it fails, fallback to experimental.
    gl = <WebGLRenderingContext>canvas.getContext("webgl", { alpha: false }) || <WebGLRenderingContext>canvas.getContext("experimental-webgl", { alpha: false });
    Screen.width = canvas.width;
    Screen.height = canvas.height;
  }
  catch (e) {}

  // If we don't have a GL context, give up now
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
    gl = null;
  }

  return gl;
}

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

  countFPS();
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

export function getStats()
{
  let vertices = 0;

  for (let i = 0; i < scene.gameObjects.length; i++)
  {
    vertices += scene.gameObjects[i].mesh.vertices.length;
  }

  let stats =
  {
    fps: currentFPS,
    deltaTime: Time.getDeltaTime(),
    time: Time.getTime(),
    objects: scene.gameObjects.length,
    vertices: vertices,
  };
  return stats;
}

export function getGameObjects()
{
  return scene.gameObjects;
}

export function getGameObjectInfo(i)
{
  let info = {
    id: scene.gameObjects[i].id,
    name: scene.gameObjects[i].name,
    position: scene.gameObjects[i].position,
    rotation: scene.gameObjects[i].axis,
    scale: scene.gameObjects[i].scale,
    shader: scene.gameObjects[i].shader,
    color: scene.gameObjects[i].color,
  };

  scene.gameObjects[i].selected = true;
  return info;
}

export function setGameObjectInfo(i, x, y , z)
{
    scene.gameObjects[i].position.x = x;
    scene.gameObjects[i].position.y = y;
    scene.gameObjects[i].position.z = z;
}
