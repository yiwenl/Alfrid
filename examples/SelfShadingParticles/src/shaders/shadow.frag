// shadow.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec4 vPosition;
varying vec4 vShadowCoord;
varying vec4 vColor;

uniform vec3 color;
uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform vec3 lightPosition;
uniform sampler2D textureDepth;

void main(void) {
	if(vColor.a <= 0.0) discard;

	// vec3 lightPos = (uModelMatrix * uViewMatrix * vec4(lightPosition, 1.0)).xyz;
	vec4 ShadowCoord	= vShadowCoord / vShadowCoord.w;
	float Shadow		= 1.0;

	if ( ShadowCoord.z > -1.0 && ShadowCoord.z < 1.0 ) {
		Shadow = texture2DProj( textureDepth, ShadowCoord, -0.00005 ).r;		
	}

	float bias = .0005;
	float visibility = 1.0;
	if ( texture2D( textureDepth, ShadowCoord.xy ).z  <  ShadowCoord.z-bias){
		visibility = 0.75;
	}

	// Shadow.r = pow(Shadow.r, 2.0);

	vec4 color = vColor;
	color.rgb *= Shadow;
	// color.rgb = vPosition.rgb;
	gl_FragColor = color;
}