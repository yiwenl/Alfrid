precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler0;

void main(void) {
    gl_FragColor = texture2D(uSampler0, vec2(vTextureCoord.s, vTextureCoord.t));
}