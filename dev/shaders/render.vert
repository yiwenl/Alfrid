#version 300 es

precision highp float;
in vec3 aVertexPosition;
in vec2 aTextureCoord;
in vec3 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

uniform vec2 uViewport;
uniform sampler2D texturePos;
uniform sampler2D textureColor;

out vec2 vTextureCoord;
out vec3 vColor;
out vec3 vNormal;

const float radius = 0.005;

void main(void) {
    vec2 uv = aVertexPosition.xy;
    vec3 pos = texture(texturePos, uv).xyz;
    vColor = texture(textureColor, uv).xyz;

    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(pos, 1.0);
    vTextureCoord = aTextureCoord;
    vNormal = aNormal;

    float distOffset = uViewport.y * uProjectionMatrix[1][1] * radius / gl_Position.w;
    gl_PointSize = distOffset * (1.0 + vColor.x * 1.0);
}