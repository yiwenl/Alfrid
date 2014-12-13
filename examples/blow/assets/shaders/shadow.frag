precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler0;

float contrast(float value, float scale) {
	return .5 + (value-.5) * scale;
}

vec2 contrast(vec2 value, float scale) {
	return vec2(contrast(value.x, scale), contrast(value.y, scale));
}

void main(void) {
	vec2 uv = contrast(vTextureCoord, .96);
    gl_FragColor = texture2D(uSampler0, uv);
    gl_FragColor.rgb = vec3(0.0);
    gl_FragColor.a *= .75;
}