precision highp float;
attribute vec2 a_position;
attribute float a_ID;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 v_position;

float rand(vec2 co){
	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(void) {
    // gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(a_position, 1.0);
    v_position = a_position + vec2(0.0, rand(a_position) * .001);
    gl_PointSize = 2.0;
}