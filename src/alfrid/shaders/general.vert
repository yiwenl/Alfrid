// general.vert

#define SHADER_NAME GENERAL_VERTEX

precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

uniform vec3 position;
uniform vec3 scale;

varying vec2 vTextureCoord;

void main(void) {
	vec3 pos      = aVertexPosition * scale;
	pos           += position;
	gl_Position   = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(pos, 1.0);
	vTextureCoord = aTextureCoord;
}