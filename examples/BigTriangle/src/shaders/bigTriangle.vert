// basic.vert

#define SHADER_NAME BASIC_VERTEX

precision highp float;
attribute vec2 aPosition;
varying vec2 vTextureCoord;

void main(void) {
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vTextureCoord = aPosition * .5 + .5;
}