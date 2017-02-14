precision highp float;
attribute vec3 a_position;
attribute vec3 a_veloctity;


uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec2 uViewport;

const float radius = 0.01;

void main(void) {
    gl_Position = uProjectionMatrix * uViewMatrix * vec4(a_position, 1.0);

    float distOffset = uViewport.y * uProjectionMatrix[1][1] * radius / gl_Position.w;
    gl_PointSize = distOffset;
}
