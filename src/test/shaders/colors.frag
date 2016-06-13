// colors.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
// uniform sampler2D texture;

uniform float colors[4];

void main(void) {

	if(vTextureCoord.x < .25) {
		gl_FragColor = vec4(vec3(colors[0]), 1.0);
	} else if(vTextureCoord.x < .5) {
		gl_FragColor = vec4(vec3(colors[1]), 1.0);
	} else if(vTextureCoord.x < .75) {
		gl_FragColor = vec4(vec3(colors[2]), 1.0);
	} else {
		gl_FragColor = vec4(vec3(colors[3]), 1.0);
	}
}