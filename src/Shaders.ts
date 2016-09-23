export class Shader
{
  public static AllShaders = [];
  readonly SHADER_TYPE_FRAGMENT = "x-shader/x-fragment";
  readonly SHADER_TYPE_VERTEX = "x-shader/x-vertex";

  private gl: WebGLRenderingContext;

  //TODO MAKE Abstraction of shaderProgram, WebGLProgram

  constructor (gl: WebGLRenderingContext)
  {
      this.gl = gl;
  }

  public AddShaderProgram (name: string, vertex: string, fragment: string): void
  {
      let vertexShader = this.GetShader(vertex, this.SHADER_TYPE_VERTEX);
      let fragmentShader = this.GetShader(fragment, this.SHADER_TYPE_FRAGMENT);

      let shaderProgram = this.gl.createProgram();
      this.gl.attachShader(shaderProgram, vertexShader);
      this.gl.attachShader(shaderProgram, fragmentShader);
      this.gl.linkProgram(shaderProgram);

      // If creating the shader program failed, alert
      if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS))
      {
        alert("Unable to initialize the shader program: " + this.gl.getProgramInfoLog(shaderProgram));
      }

      this.gl.useProgram(shaderProgram);

      let vertexPositionAttribute = this.gl.getAttribLocation(shaderProgram, "aVertexPosition");
      this.gl.enableVertexAttribArray(vertexPositionAttribute);

      Shader.AllShaders[name] = { name: name, shaderProgram: shaderProgram, vertexPositionAttribute: vertexPositionAttribute };
  };

  private GetShader (file: string, type: string)
  {
      let shaderSource;

      this.GetRequest(file, function(response) {
          shaderSource = response;
      });

      let shader;
      if (type === this.SHADER_TYPE_FRAGMENT)
      {
          shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
      }
      else if (type === this.SHADER_TYPE_VERTEX)
      {
          shader = this.gl.createShader(this.gl.VERTEX_SHADER);
      }
      else
      {
          return null;
      }

      // Send the source to the shader object
      this.gl.shaderSource(shader, shaderSource);

      // Compile the shader program
      this.gl.compileShader(shader);

      //if things didn't go so well alert
      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
      {
          alert("An error occurred compiling the shaders: " + this.gl.getShaderInfoLog(shader));
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