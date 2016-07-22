// instanced.vert

precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aNormal;
attribute vec3 aOffset;
attribute vec3 aColor;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 vTextureCoord;
varying vec3 vNormal;
varying vec3 vColor;
varying vec3 vOffset;

void main(void) {
	gl_Position   = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition+aOffset, 1.0);
	vTextureCoord = aTextureCoord;
	vNormal       = aNormal;
	vColor        = aColor;
	vOffset 	  = aOffset;
}