import {Matrix4x4} from "Matrix4x4";
import {initShaders} from "Shaders";

var gl; // A global variable for the WebGL context
var shaderProgram;

const TARGET_FPS = 60; //Target fps for the webgl program

let timeSpent = 0;
let squareVerticesBuffer;
let squareVertexColorBuffer;

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just have
// one object -- a simple two-dimensional square.
//
function initBuffers() {

  // Create a buffer for the square's vertices.
  squareVerticesBuffer = gl.createBuffer();

  // Select the squareVerticesBuffer as the one to apply vertex
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

  // Now create an array of vertices for the square. Note that the Z
  // coordinate is always 0 here.

  var vertices : number[] = [
    1.0,  1.0,  0.0,
    -1.0, 1.0,  0.0,
    1.0,  -1.0, 0.0,
    -1.0, -1.0, 0.0
  ];

  // Now pass the list of vertices into WebGL to build the shape. We
  // do this by creating a Float32Array from the JavaScript array,
  // then use it to fill the current vertex buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

   squareVerticesBuffer.itemSize = 3;
   squareVerticesBuffer.numItems = 4;

  squareVertexColorBuffer = gl.createBuffer();
  
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
  let colors = [];
  for (var i=0; i < 4; i++) {
    colors = colors.concat([i / 4, 0.5, 1.0, 1.0]);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  squareVertexColorBuffer.itemSize = 4;
  squareVertexColorBuffer.numItems = 4;
}

function render() {
  
  //Pulsing background
  timeSpent += 1.0 / 60.0;
	var factor = (Math.sin(timeSpent) + 1) * 0.5;
	gl.clearColor(factor * 0.7 + 0.3, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  let pMatrix = Matrix4x4.Identity();
  pMatrix.matrix = makePerspective(60, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
  
  let mvMatrix = Matrix4x4.Identity();
  mvMatrix.Translate([-1.5, 0.0, -7.0 * factor]);

  console.log(mvMatrix.matrix);

  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVerticesBuffer.itemSize, gl.FLOAT, false, 0, 0);
  setMatrixUniforms(pMatrix.matrix, mvMatrix.matrix);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVerticesBuffer.numItems);

  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
}

function setMatrixUniforms(pMatrix, mMatrix) {
  var pUniform = gl.getUniformLocation(shaderProgram.shaderProgram, "uPMatrix");
  gl.uniformMatrix4fv(pUniform, false, new Float32Array(pMatrix));

  var mvUniform = gl.getUniformLocation(shaderProgram.shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mMatrix));
}

function renderLoop() {
	render();

  document.getElementById("glfps").innerHTML = countFPS();
}

let fps: number = 0, currentFPS:number = 0, time:number = 0;

/**
 * Counts fps on the program
 * @returns string
 */
function countFPS(): string {
  fps++;
  if (new Date().getTime() >= time) {
    currentFPS = fps; fps = 0;
    time = new Date().getTime() + 1000;
  }

  return currentFPS.toString();
}

export function start() {
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
      shaderProgram = initShaders(gl);

      // Here's where we call the routine that builds all the objects
      // we'll be drawing.
      initBuffers();

      setInterval(renderLoop, 1000 / TARGET_FPS);
    }
}

function initWebGL(canvas): WebGLRenderingContext {
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




//
// gluPerspective
//
function makePerspective(fovy, aspect, znear, zfar)
{
    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
}

//
// glFrustum
//
function makeFrustum(left, right, bottom, top, znear, zfar) : number[]
{
    var X = 2*znear/(right-left);
    var Y = 2*znear/(top-bottom);
    var A = (right+left)/(right-left);
    var B = (top+bottom)/(top-bottom);
    var C = -(zfar+znear)/(zfar-znear);
    var D = -2*zfar*znear/(zfar-znear);

    return [
            X, 0, A, 0,
            0, Y, B, 0,
            0, 0, C, -1,
            0, 0, D, 0];
}