// cubemap.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec3 vVertex;
uniform samplerCube texture;

void main(void) {
    // gl_FragColor = vec4(normalize(vVertex) * .5 + .5, 1.0);
    gl_FragColor = textureCube(texture, vVertex);
}