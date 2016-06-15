// textureCube.frag

#extension GL_EXT_shader_texture_lod : enable

#define SHADER_NAME TEXTURE_CUBE

precision highp float;
uniform mat3 uModelViewMatrixInverse;
uniform samplerCube texture;
uniform float lod;
uniform float		uExposure;
uniform float		uGamma;

varying vec3 vNormal;
varying vec2 vTextureCoord;
varying vec3 ecNormal;
varying vec3 ecPos;


const float A = 0.15;
const float B = 0.50;
const float C = 0.10;
const float D = 0.20;
const float E = 0.02;
const float F = 0.30;

vec3 Uncharted2Tonemap( vec3 x )
{
	return ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;
}

vec3 fix_cube_lookup( vec3 v, float cube_size, float lod ) {
	float M = max(max(abs(v.x), abs(v.y)), abs(v.z));
	float scale = 1.0 - exp2(lod) / cube_size;
	if (abs(v.x) != M) v.x *= scale;
	if (abs(v.y) != M) v.y *= scale;
	if (abs(v.z) != M) v.z *= scale;
	return v;
}

vec3 correctGamma(vec3 color, float g) {
	return pow(color, vec3(1.0/g));
}

void main(void) {
    vec3 eyeDir = normalize(ecPos); //Direction to eye = camPos (0,0,0) - ecPos
	vec3 ecN = normalize(ecNormal);
	vec3 ecReflected = reflect(eyeDir, ecN); //eye coordinates reflection vector
	vec3 wcReflected = vec3(uModelViewMatrixInverse * ecReflected); //world coordinates reflection vector

	vec3 lookUp = fix_cube_lookup(wcReflected, 256.0, lod);

	vec3 color = pow(textureCubeLodEXT(texture, lookUp, lod).rgb, vec3(2.2));

	color				= Uncharted2Tonemap( color * uExposure );
	// // white balance
	color				= color * ( 1.0 / Uncharted2Tonemap( vec3( 20.0 ) ) );
	// // gamma correction
	color				= pow( color, vec3( 1.0 / uGamma ) );

	gl_FragColor = vec4(color, 1.0);
}