export class Shader
{
  public static AllShaders = []; //TODO ADD ALL CRATED SHADERS TO GLOBAL LIST, WHERE DRAWABLE OBJECTS OR WHO OVER CAN ACCESS THEM?
  private SHADER_TYPE_FRAGMENT = "x-shader/x-fragment";
  private SHADER_TYPE_VERTEX = "x-shader/x-vertex";

  public AddShaderProgram (gl: WebGLRenderingContext, vertex: string, fragment: string): void
  {
      let vertexShader = this.GetShader(gl, vertex, this.SHADER_TYPE_VERTEX);
      let fragmentShader = this.GetShader(gl, fragment, this.SHADER_TYPE_FRAGMENT);

      let shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      // If creating the shader program failed, alert
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
      {
        alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
      }

      gl.useProgram(shaderProgram);

      let vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
      gl.enableVertexAttribArray(vertexPositionAttribute);

      let vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");

      Shader.AllShaders.push({ shaderProgram: shaderProgram, vertexPositionAttribute: vertexPositionAttribute });
  };

  private GetShader (gl, file, type)
  {
      let shaderSource;

      this.GetRequest(file, function(response) {
          shaderSource = response;
      });

      let shader;
      if (type === this.SHADER_TYPE_FRAGMENT)
      {
          shader = gl.createShader(gl.FRAGMENT_SHADER);
      }
      else if (type === this.SHADER_TYPE_VERTEX)
      {
          shader = gl.createShader(gl.VERTEX_SHADER);
      }
      else
      {
          return null;
      }

      // Send the source to the shader object
      gl.shaderSource(shader, shaderSource);

      // Compile the shader program
      gl.compileShader(shader);

      //if things didn't go so well alert
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      {
          alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
          return null;
      }

      //return the shader reference
      return shader;
  };

  private GetRequest(file, callback: (response: string) => void)
  {
    let request = new XMLHttpRequest();

    request.open("GET", "src/shaders/" + file, false);
    request.setRequestHeader("Content-Type", "text/plain");

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            callback(request.responseText);
        }
    };

    request.send(null);  // No data needs to be sent along with the request.
  };
}