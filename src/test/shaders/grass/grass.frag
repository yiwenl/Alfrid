// grass.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision mediump float;
varying vec2 vTextureCoord;
varying mediump vec3 vColor;
// uniform sampler2D texture;

void main(void) {
	float g      = mix(vTextureCoord.y, 1.0, .25);
	vec3 color   = vColor * g;
	gl_FragColor = vec4(color, 1.0);
}