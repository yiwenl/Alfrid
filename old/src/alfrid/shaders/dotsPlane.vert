// basic.vert

#define SHADER_NAME DOTS_PLANE_VERTEX

precision highp float;
attribute vec3 aVertexPosition;
attribute vec3 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec2 viewport;

varying vec3 vNormal;

const float radius = 0.008;

void main(void) {
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition + aNormal * 0.000001, 1.0);
    // gl_PointSize = 1.0;
    vNormal = aNormal;

	float distOffset = viewport.y * uProjectionMatrix[1][1] * radius / gl_Position.w;
    gl_PointSize = distOffset;
}