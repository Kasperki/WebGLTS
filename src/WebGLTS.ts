import * as Utils from "./Utils";
import {Color} from "./Color";
import {Matrix4x4} from "Matrix4x4";
import {Vector3} from "Vector3";
import {initShaders} from "Shaders";
import {DrawableObject} from "./DrawableObject";

var gl; // A global variable for the WebGL context
const TARGET_FPS = 60; //Target fps for the webgl program
let muodot: DrawableObject[];

//TODO
 //Nice way to move, rotate, scale
 //Change color
 //Other shapes... interfaces. refactoring
 //Input
 //Time
//Scenes?

let timeSpent = 0;
function render() 
{
  
  //Pulsing background
  timeSpent += 1.0 / 60.0;
	var factor = (Math.sin(timeSpent) + 1) * 0.5;
	gl.clearColor(factor * 0.7 + 0.3, factor * 0.7 + 0.3, factor * 0.7 + 0.3, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //SetPerspective
  let pMatrix = Matrix4x4.Identity();
  pMatrix.matrix = Utils.makePerspective(120, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

  //IterateAndDrawAllObjects
  for(let i = 0; i < muodot.length; i++) {
    muodot[i].RenderObject(pMatrix);
  }
}

function renderLoop() 
{
	render();

  document.getElementById("glfps").innerHTML = countFPS();
}

let fps: number = 0, currentFPS:number = 0, time:number = 0;

/**
 * Counts fps on the program
 * @returns string
 */
function countFPS(): string 
{
  fps++;
  if (new Date().getTime() >= time) {
    currentFPS = fps; fps = 0;
    time = new Date().getTime() + 1000;
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

      muodot = new Array();

      //TODO CRAETE ALL OBJECTS HERE :)
      let squareLength = 100;
      for (let y = -5; y < 5; y++) {
        for (let x = 0; x < squareLength; x++) {
          muodot.push(new DrawableObject(gl, shaderProgram, new Vector3(-12.5 + x, y * 2 + x / squareLength * 2, -30 * Math.random()), new Color(x / squareLength * 2, x / squareLength, x / squareLength * 2, 1)));
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