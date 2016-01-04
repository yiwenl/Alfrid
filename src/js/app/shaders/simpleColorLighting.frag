// simpleColorLighting.frag

#define SHADER_NAME SIMPLE_COLOR_LIGHTING

precision highp float;

uniform vec3 ambient;
uniform vec3 lightPosition;
uniform vec3 lightColor;
uniform float lightWeight;

uniform vec3 color;
uniform float opacity;

varying vec3 vVertex;
varying vec3 vNormal;

void main(void) {
	vec3 L        = normalize(lightPosition-vVertex);
	float lambert = max(dot(vNormal, L), .0);
	vec3 light    = ambient + lightColor * lambert * lightWeight;
	
	gl_FragColor  = vec4(color * light, opacity);
}