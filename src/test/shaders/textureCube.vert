// textureCube.vert

precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;
uniform vec3 uPosition;

varying vec2 vTextureCoord;
varying vec3 vNormal;

varying vec3 ecNormal;
varying vec3 ecPos;

void main(void) {
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition+uPosition, 1.0);
    vTextureCoord = aTextureCoord;
    vNormal = aNormal;


    ecPos = (uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0)).xyz;
  	ecNormal = uNormalMatrix * aNormal;
}