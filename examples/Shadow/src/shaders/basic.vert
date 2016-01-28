// basic.vert

#define SHADER_NAME BASIC_VERTEX

precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

uniform vec3 position;
uniform float rotation;

varying vec2 vTextureCoord;
varying vec3 vNormal;

vec2 rotate(vec2 v, float t) {
	float c = cos(t);
	float s = sin(t);
	mat2 m = mat2(c, -s, s, c);
	return m*v;
}

void main(void) {
	vec3 pos        = aVertexPosition;
	// pos.xz 			= rotate(pos.xz, rotation);
	pos 			+= position;
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(pos, 1.0);
    vTextureCoord = aTextureCoord;
	vNormal         = normalize(uNormalMatrix * aNormal);
}