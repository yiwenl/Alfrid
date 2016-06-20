// multi.frag

#extension GL_EXT_draw_buffers : require 
#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
varying vec3 vNormal;

void main(void) {
    gl_FragData[0] = vec4(1.0);
    gl_FragData[1] = vec4(vTextureCoord, 0.0, 1.0);
    gl_FragData[2] = vec4(vNormal, 1.0);
    gl_FragData[3] = vec4(1.0, 0.0, 0.0, 1.0);
}