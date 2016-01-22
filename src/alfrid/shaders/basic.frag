// basic.frag

#define SHADER_NAME BASIC_FRAGMENT

precision highp float;
varying vec2 vTextureCoord;
// uniform sampler2D texture;

void main(void) {
    gl_FragColor = vec4(vTextureCoord, 0.0, 1.0);
}