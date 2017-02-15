#version 300 es

precision highp float;
layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_velocity;
layout(location = 2) in vec3 a_extra;


uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec2 uViewport;

out vec4 vColor;

const float radius = 0.01;

void main(void) {
    gl_Position = uProjectionMatrix * uViewMatrix * vec4(a_position, 1.0);

    float distOffset = uViewport.y * uProjectionMatrix[1][1] * radius / gl_Position.w;

    float sizeOffset = cos(a_extra.g * a_extra.z) * 0.1 + 1.0;
    gl_PointSize = distOffset * a_extra.r * sizeOffset;

    float grey = sin(a_extra.g) * 0.25 + 0.75;
    vColor = vec4(vec3(grey), 1.0);
}
