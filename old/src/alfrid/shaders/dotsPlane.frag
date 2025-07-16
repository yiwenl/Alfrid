// dotsPlane.frag

precision highp float;

uniform vec3 color;
uniform float opacity;

void main(void) {
	if(distance(gl_PointCoord, vec2(.5)) > .5) {
		discard;
	}
    gl_FragColor = vec4(color, opacity);
}