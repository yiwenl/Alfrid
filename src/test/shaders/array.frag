// array.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;

const int NUM_ITEMS = 3;

varying vec2 vTextureCoord;
uniform sampler2D texture;
uniform vec3 colors[NUM_ITEMS];

void main(void) {

	// int index = int(vTextureCoord.x / 0.33);
	// vec3 color = colors[index];
	vec3 color;
	if(vTextureCoord.x < .33) {
		color = colors[0];
	} else if(vTextureCoord.x < .67) {
		color = colors[1];
	} else {
		color = colors[2];
	}


    gl_FragColor = vec4(color, 1.0);
}