// lines.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
// uniform sampler2D texture;
uniform float time;


vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}

const float PI = 3.141592657;

void main(void) {
	vec2 uv = vTextureCoord - vec2(.5);
	// uv = rotate(uv, sin(time*3.0) * .2 + sin( (uv.x+.5)*PI) * PI * .5);
	uv = rotate(uv, sin(time*3.0) * .2 * sin( (uv.x+.5)*PI*3.0) * PI);
	float grey = uv.y;
	grey = fract(grey * 15.0);

	// float offset = .25 + sin(time)*.03;
	float start = .25 + sin(time) * .1;
	grey = smoothstep(start, start+.02, abs(grey - .5));

    gl_FragColor = vec4(vec3(grey), 1.0);
}