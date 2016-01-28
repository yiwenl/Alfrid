// post.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D texture;

void main(void) {
	vec2 uv = vTextureCoord;
	const float gap = .01;
	vec2 uvRed = uv + vec2(gap, 0);
	vec2 uvBlue = uv - vec2(gap, 0);

	float r = texture2D(texture, uvRed).r;
	float g = texture2D(texture, uv).g;
	float b = texture2D(texture, uvBlue).b;

	gl_FragColor = vec4(r, g, b, 1.0);
}