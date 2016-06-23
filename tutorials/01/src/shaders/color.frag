// color.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision mediump float;
uniform vec3 color;

void main(void) {
    gl_FragColor = vec4(color, 1.0);
}