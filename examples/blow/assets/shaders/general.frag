precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler0;
uniform float alpha;

void main(void) {
    gl_FragColor = texture2D(uSampler0, vec2(vTextureCoord.s, vTextureCoord.t));
    gl_FragColor *= alpha;
}