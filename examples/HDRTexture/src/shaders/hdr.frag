// basic.frag

#define SHADER_NAME BASIC_FRAGMENT

precision highp float;
uniform sampler2D texture;
varying vec2 vTextureCoord;
varying vec3 vNormal;
uniform float exposure;

void main(void) {
    gl_FragColor = texture2D(texture, vTextureCoord);
    gl_FragColor.rgb *= exposure;
}