precision highp float;

varying float alpha;
varying float toDiscard;
varying vec4 vVertexColor;

void main(void) {
	if(toDiscard < .5) discard;
    gl_FragColor = vVertexColor;
    gl_FragColor *= alpha;
    //gl_FragColor.rgb /= alpha;
}