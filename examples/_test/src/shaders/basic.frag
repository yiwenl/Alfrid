// basic.frag

#define SHADER_NAME BASIC_FRAGMENT

precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D texture;
uniform float time;

void main(void) {
    gl_FragColor = texture2D(texture, vTextureCoord);
    // gl_FragColor = vec4(vTextureCoord, sin(time) * .5 + .5, 1.0);
}