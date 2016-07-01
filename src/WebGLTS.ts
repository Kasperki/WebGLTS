import * as Utils from "Utils";
import {Color} from "Color";
import {Time} from "Time";
import {Input} from "Input/Input";
import {MouseCode} from "Input/MouseCode";
import {Matrix4x4} from "Matrix4x4";
import {Vector3} from "Vector3";
import {initShaders} from "Shaders";
import {DrawableObject} from "DrawableObject";
import {Plane} from "Plane";
import {Triangle} from "Triangle";

var gl; // A global variable for the WebGL context
const TARGET_FPS = 60; //Target fps for the webgl program
let time: Time;
let input: Input;

let muodot: DrawableObject[];

//TODO
 //Nice way to move, rotate, scale
 //Other shapes... interfaces. refactoring BOX, LINE, TRIANGLE : Inherit from DrawableObject, 
  //COMBINE THESE MESHES WITH SAME SHADER TO REDUCE DRAWCALLS!!!
 //SHADER Modifying
  //textures
  //lightning
 //TEXT
 //CAMERA
 //Advanced shaders, speculars etc....
//Scenes?

let timeSpent = 0; let a = 0;
function render() 
{
  
  //Pulsing background
  timeSpent += 1.0 / 60.0;
	var factor = (Math.sin(timeSpent) + 1) * 0.5;
	gl.clearColor(factor * 0.7 + 0.3, factor * 0.7 + 0.3, factor * 0.7 + 0.3, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //SetPerspective
  let pMatrix = Matrix4x4.Identity();
  pMatrix.matrix = Utils.makePerspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

  a += 0.01;
  //IterateAndDrawAllObjects
  for(let i = 0; i < muodot.length; i++) {  
    let org = muodot[i].position;
    
    muodot[i].color = new Color(i / muodot.length, Math.sin(a), Math.tan(a), 1);
    
    let pos = new Vector3(muodot[i].position.x * Math.tan(a), muodot[i].position.y, -20 + muodot[i].position.z * Math.sin(a));
    muodot[i].position = pos;
    
    muodot[i].axis = new Vector3(1,1,1);
    muodot[i].rot = a * 100;
    
    muodot[i].RenderObject(pMatrix);

    muodot[i].position = org;
  }
}

function renderLoop() 
{
  //ProjectStuff
  render();
 
  //EngineStuff
 	input.Update();
  time.countDeltaTime();
  
  document.getElementById("glfps").innerHTML = "FPS:" + countFPS() + " Dtime:" + time.getDeltaTime().toString() + " time:" + time.getTime();
}

let fps: number = 0, currentFPS:number = 0, frameTime:number = 0;

/**
 * Counts fps on the program
 * @returns string
 */
function countFPS(): string 
{
  fps++;
  if (new Date().getTime() >= frameTime) {
    currentFPS = fps; fps = 0;
    frameTime = new Date().getTime() + 1000;
  }

  return currentFPS.toString();
}

export function start() 
{
    var canvas = document.getElementById("glcanvas");

    // Initialize the GL context
    gl = initWebGL(canvas);
    
    // Only continue if WebGL is available and working
    if (gl) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
      gl.clearDepth(1.0);                 // Clear everything
      gl.enable(gl.DEPTH_TEST);           // Enable depth testing
      gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
      
      //Init shaders
      let shaderProgram = initShaders(gl);

      //Init Custom Classes
      time = new Time();
      input = new Input();

      //Init game
      muodot = new Array();

      //TODO CRAETE ALL OBJECTS HERE :)
      let squareLength = 100;
      for (let y = -5; y < 5; y++) {
        for (let x = 0; x < squareLength; x++) {
          muodot.push(new Triangle(gl, shaderProgram, new Vector3(-12.5 + x, y * 2 + x / squareLength * 2, -30 * Math.random()), new Color(x / squareLength * 2, x / squareLength, x / squareLength * 2, 1)));
        }
      }
      
      setInterval(renderLoop, 1000 / TARGET_FPS);
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
  catch(e) {}
  
  // If we don't have a GL context, give up now
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
    gl = null;
  }
  
  return gl;
}