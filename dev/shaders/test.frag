// test.frag

precision highp float;

varying vec2 vTextureCoord;

#ifdef HAS_NORMAL
varying vec3 vNormal;
#endif


uniform float greyscale;

float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

void main(void) {

	vec3 color = vec3(vTextureCoord, 1.0);
	#ifdef HAS_NORMAL
	color = vNormal * .5 + .5;
	#endif

	float g = luma(color);
	color = mix(color, vec3(g), greyscale);


    gl_FragColor = vec4( color , 1.0);
}