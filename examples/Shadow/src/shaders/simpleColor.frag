#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
// varying vec2 vTextureCoord;
// uniform sampler2D texture;

uniform vec3 color;
uniform float opacity;

void main(void) {
    gl_FragColor = vec4(color, opacity);
}