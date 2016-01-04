#define SHADER_NAME TEXTURE_WITH_ALPHA

precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D texture;
uniform float opacity;

void main(void) {
  gl_FragColor = texture2D(texture, vTextureCoord);
  gl_FragColor.a *= opacity;
}