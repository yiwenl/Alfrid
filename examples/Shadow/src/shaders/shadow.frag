// shadow.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec2 vTextureCoord;
varying vec4 vPosition;
varying vec4 vShadowCoord;
varying vec3 vNormal;

uniform vec3 color;
uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;
uniform vec3 lightPosition;
uniform sampler2D textureDepth;

void main(void) {
	vec3 lightPos = (uModelMatrix * uViewMatrix * vec4(lightPosition, 1.0)).xyz;

	vec3 Normal			= normalize( vNormal );
	vec3 LightVec		= normalize( lightPos - vPosition.xyz );
	// float NdotL			= max( dot( vNormal, normalize(lightPos) ), 0.0 );
	float NdotL			= max( dot( vNormal, LightVec ), 0.0 );

	vec3 Diffuse		= vec3( NdotL );
	vec3 Ambient		= vec3( 0.3 );
	
	vec4 ShadowCoord	= vShadowCoord / vShadowCoord.w;
	float Shadow		= 1.0;

	if ( ShadowCoord.z > -1.0 && ShadowCoord.z < 1.0 ) {
		Shadow = texture2D( textureDepth, ShadowCoord.xy ).r ;
	}

	gl_FragColor = vec4(( Diffuse * Shadow + Ambient ) * color, 1.0);

/*
	float bias = 0.005*tan(acos(NdotL)); // cosTheta is dot( n,l ), clamped between 0 and 1
	bias = clamp(bias, 0.0, 0.01);
	float visibility = 1.0;
	if ( texture2D( textureDepth, ShadowCoord.xy ).z  <  ShadowCoord.z-bias){
		visibility = 0.5;
	}

    gl_FragColor = vec4(( Diffuse * visibility + Ambient ) * color, 1.0);
*/  
}