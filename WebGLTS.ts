var gl; // A global variable for the WebGL context

const TARGET_FPS = 60; //Target fps for the webgl program

let timeSpent = 0;
function render() {
  timeSpent += 1.0 / 60.0;
	var factor = (Math.sin(timeSpent) + 1) * 0.5;
	gl.clearColor(factor * 0.7 + 0.3, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function renderLoop() {
	render();

  document.getElementById("glfps").innerHTML = countFPS();
}

let fps: number = 0, currentFPS:number = 0, time:number = 0;
function countFPS(): string {
  fps++;
  if (new Date().getTime() >= time) {
    currentFPS = fps; fps = 0;
    time = new Date().getTime() + 1000;
  }

  return currentFPS.toString();
}

function start() {
    var canvas = document.getElementById("glcanvas");

    // Initialize the GL context
    gl = initWebGL(canvas);
    
    // Only continue if WebGL is available and working
    if (gl) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
      gl.clearDepth(1.0);                 // Clear everything
      gl.enable(gl.DEPTH_TEST);           // Enable depth testing
      gl.depthFunc(gl.LEQUAL); // Near things obscure far things
      
      //Init shaders
      initShaders(gl);

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
  }
  catch(e) {}
  
  // If we don't have a GL context, give up now
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
    gl = null;
  }
  
  return gl;
}


let squareVerticesBuffer;
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

  var vertices = [
    1.0,  1.0,  0.0,
    -1.0, 1.0,  0.0,
    1.0,  -1.0, 0.0,
    -1.0, -1.0, 0.0
  ];

  // Now pass the list of vertices into WebGL to build the shape. We
  // do this by creating a Float32Array from the JavaScript array,
  // then use it to fill the current vertex buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}