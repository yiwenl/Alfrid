#version 300 es

precision highp float;
in vec3 aVertexPosition;
in vec2 aTextureCoord;
in vec3 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uShadowMatrix;

out vec2 vTextureCoord;
out vec3 vNormal;
out vec3 vPosition;
out vec4 vShadowCoord;

void main(void) {
  vec4 vWsPos = uModelMatrix * vec4(aVertexPosition, 1.0);
  gl_Position = uProjectionMatrix * uViewMatrix * vWsPos;

  vTextureCoord = aTextureCoord;
  vNormal = aNormal;
  vPosition = aVertexPosition;
  vShadowCoord = uShadowMatrix * vWsPos;
}