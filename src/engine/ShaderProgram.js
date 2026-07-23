export class ShaderProgram {
  constructor(gl, vertexSource, fragmentSource) {
    this.gl = gl;
    const vertex = this.compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = this.compile(gl.FRAGMENT_SHADER, fragmentSource);
    this.program = gl.createProgram();
    gl.attachShader(this.program, vertex); gl.attachShader(this.program, fragment); gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(this.program));
    gl.deleteShader(vertex); gl.deleteShader(fragment);
  }
  compile(type, source) {
    const shader = this.gl.createShader(type); this.gl.shaderSource(shader, source); this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) throw new Error(this.gl.getShaderInfoLog(shader));
    return shader;
  }
  use() { this.gl.useProgram(this.program); }
  uniform(name) { return this.gl.getUniformLocation(this.program, name); }
  dispose() { this.gl.deleteProgram(this.program); }
}
