// uv.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D texture;




void main(void) {
	vec2 uv = (vTextureCoord - .5) * 5.0 + .5;
    gl_FragColor = texture2D(texture, uv);
}