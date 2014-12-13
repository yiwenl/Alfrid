precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aVertexColor;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform vec3 position;

varying vec2 vTextureCoord;
varying vec3 vVertexColor;

void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+position, 1.0);
    vTextureCoord = aTextureCoord;
    vVertexColor = aVertexColor;
}