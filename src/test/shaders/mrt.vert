#version 300 es

precision highp float;
precision highp int;

layout(location = 0) in vec3 aVertexPosition;
layout(location = 1) in vec2 aTextureCoord;
layout(location = 2) in vec3 aNormal;
layout(location = 3) in vec3 aPosOffset;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

out vec2 vTextureCoord;
out vec3 vNormal;


void main(void) {
	gl_Position   = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition+aPosOffset, 1.0);
	vTextureCoord = aTextureCoord;
	vNormal       = aNormal;
}