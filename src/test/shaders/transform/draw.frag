#version 300 es

precision highp float;
in vec4 vColor;
out vec4 color;

void main(void) {
	if(distance(gl_PointCoord, vec2(.5)) > .5) discard;
    color = vColor;
}