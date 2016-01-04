precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D texture;
uniform float n;
uniform float f;

float getDepth(float z) {
	return (6.0 * n) / (f + n - z*(f-n));
}

void main(void) {
    float r = texture2D(texture, vTextureCoord).r;
    float grey = getDepth(r);
    gl_FragColor = vec4(grey, grey, grey, 1.0);
}