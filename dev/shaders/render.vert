#version 300 es

precision highp float;
in vec3 aVertexPosition;
in vec2 aTextureCoord;
in vec3 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uShadowMatrix;

uniform vec2 uViewport;
uniform sampler2D texturePos;
uniform sampler2D textureExtra;

out vec2 vTextureCoord;
out vec3 vColor;
out vec3 vNormal;
out vec4 vShadowCoord;

const float radius = 0.009;

void main(void) {
    vec2 uv = aVertexPosition.xy;
    vec3 pos = texture(texturePos, uv).xyz;
    vec3 extra = texture(textureExtra, uv).xyz;
    vColor = vec3(1.0);

    vec4 wsPos = uModelMatrix * vec4(pos, 1.0);

    gl_Position = uProjectionMatrix * uViewMatrix * wsPos;
    vTextureCoord = aTextureCoord;
    vNormal = aNormal;

    float distOffset = uViewport.y * uProjectionMatrix[1][1] * radius / gl_Position.w;
    gl_PointSize = distOffset * mix(1.0, 1.5, extra.g);

    vShadowCoord = uShadowMatrix * wsPos;
}