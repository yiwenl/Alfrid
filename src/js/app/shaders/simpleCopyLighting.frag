#define SHADER_NAME SIMPLE_TEXTURE_LIGHTING

precision highp float;

uniform vec3 ambient;
uniform vec3 lightPosition;
uniform vec3 lightColor;
uniform float lightWeight;

uniform sampler2D texture;

varying vec2 vTextureCoord;
varying vec3 vVertex;
varying vec3 vNormal;

void main(void) {
	vec3 L        = normalize(lightPosition-vVertex);
	float lambert = max(dot(vNormal, L), .0);
	vec3 light    = ambient + lightColor * lambert * lightWeight;
	vec4 color 	  = texture2D(texture, vTextureCoord);
	color.rgb 	  *= light;
	
	gl_FragColor  = color;
}