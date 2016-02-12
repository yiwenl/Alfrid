// ball.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
varying float vDepth;

void main(void) {
    gl_FragColor = vec4(vec3(vDepth), 1.0);
}