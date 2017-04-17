// greyscale.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D texture;

void main(void) {
	
    vec4 color = texture2D(texture, vTextureCoord);
    float br = (color.r + color.g + color.b)/3.0;
    color.rgb = vec3(br);
    gl_FragColor = vec4(vec3(br), 1.0);
}