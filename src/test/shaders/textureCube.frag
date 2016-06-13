// textureCube.frag

#extension GL_EXT_shader_texture_lod : enable

#define SHADER_NAME TEXTURE_CUBE

precision highp float;
uniform mat3 uModelViewMatrixInverse;
uniform samplerCube texture;
uniform float lod;
varying vec3 vNormal;
varying vec2 vTextureCoord;
varying vec3 ecNormal;
varying vec3 ecPos;

void main(void) {
    vec3 eyeDir = normalize(ecPos); //Direction to eye = camPos (0,0,0) - ecPos
	vec3 ecN = normalize(ecNormal);
	vec3 ecReflected = reflect(eyeDir, ecN); //eye coordinates reflection vector
	vec3 wcReflected = vec3(uModelViewMatrixInverse * ecReflected); //world coordinates reflection vector

	gl_FragColor = textureCubeLodEXT(texture, wcReflected, lod);
}