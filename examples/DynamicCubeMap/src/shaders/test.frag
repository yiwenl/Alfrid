// test.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
uniform float time;

void main(void) {
    gl_FragColor = vec4(vTextureCoord, sin(time)*.5+.5, 1.0 );
}