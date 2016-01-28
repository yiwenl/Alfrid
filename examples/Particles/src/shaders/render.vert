// render.vert

precision highp float;
attribute vec3 aVertexPosition;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform sampler2D texture;

varying vec4 vColor;

void main(void) {
	vec2 uv      = aVertexPosition.xy * .5;
	vec3 pos     = texture2D(texture, uv).rgb;
	gl_Position  = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(pos, 1.0);
	
	gl_PointSize = 1.0;
	
	float d      = length(pos);
	float a      = smoothstep(3.0, 4.5, d);
	vColor       = vec4(1.0, 1.0, 1.0, 1.0-a);
}