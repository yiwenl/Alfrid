precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform vec3 scale;
uniform vec3 position;

varying vec2 vTextureCoord;

void main(void) {
	vec3 pos = aVertexPosition * scale;
	pos += position;
    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
    vTextureCoord = aTextureCoord;
}