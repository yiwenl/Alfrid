// mrtest1.frag
#extension GL_EXT_draw_buffers : require 

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec3 vNormal;

void main() {
    gl_FragData[0] = vec4( vNormal, 1.0 );
    gl_FragData[1] = vec4( vNormal.rrr, 1.0 );
    gl_FragData[2] = vec4( vNormal.ggg, 1.0 );
    gl_FragData[3] = vec4( vNormal.bbb, 1.0 );
}