// basic.frag

#define SHADER_NAME BASIC_FRAGMENT

precision highp float;
varying vec2 vTextureCoord;
varying vec3 vNormal;


const vec3 light0 = vec3(1.0, 1.0, 1.0);
const vec3 light1 = vec3(-1.0, -1.0, 0.5);
const float fade = .95;
const vec3 lightColor0 = vec3(1.0, 1.0, fade);
const vec3 lightColor1 = vec3(fade, fade, 1.0);

float diffuse(vec3 N, vec3 L) {
	return max(dot(N, normalize(L)), 0.0);
}

vec3 diffuse(vec3 N, vec3 L, vec3 C) {
	return C * diffuse(N, L);
}

void main(void) {
	vec3 color0 = diffuse(vNormal, light0, lightColor0);
	vec3 color1 = diffuse(vNormal, light1, lightColor1) * .5;
	gl_FragColor = vec4(color0 + color1, 1.0);
}