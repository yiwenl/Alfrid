precision highp float;
attribute vec3 a_position;
attribute vec3 a_veloctity;


uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

void main(void) {
    gl_Position = uProjectionMatrix * uViewMatrix * vec4(a_position, 1.0);
    gl_PointSize = 2.0;
}
