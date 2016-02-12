// shadow.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
varying vec4 vPosition;
varying vec4 vShadowCoord;
varying vec4 vColor;

uniform vec3 color;
uniform sampler2D textureDepth;

const float shadowMapSize = 1024.0;
/*
const vec2 poissonDisk[4] = vec2[](
	vec2( -0.94201624, -0.39906216 ),
	vec2( 0.94558609, -0.76890725 ),
	vec2( -0.094184101, -0.92938870 ),
	vec2( 0.34495938, 0.29387760 )
);
*/

const float near = .5;
const float far = 100.0;

float getDepth(float z, float n, float f) {
	return (2.0 * n) / (f + n - z*(f-n));
}

float getDepthValue(vec2 uv) {
	const float tmp = 700.0;
	float d = texture2D( textureDepth, uv ).z;
	return d;
	// return getDepth(d, near, far);
}

float getDepthProjValue(vec4 uv) {
	return 0.0;
}

vec4 getShadowCoord( vec4 sc, vec2 offset) {
	vec4 s = sc;
	s.xy += offset;

	return s;
}

float samplePCF3x3( vec4 sc )
{
	const float s = 2.0/700.0;
	
	float shadow = 0.0;
	float bias = .0001;


	shadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2(-s,-s) )).r;
	shadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2(-s, 0) )).r;
	shadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2(-s, s) )).r;
	shadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2( 0,-s) )).r;
	shadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2( 0, 0) )).r;
	shadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2( 0, s) )).r;
	shadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2( s,-s) )).r;
	shadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2( s, 0) )).r;
	shadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2( s, s) )).r;
	return shadow/9.0;;
}



void main(void) {
	if(vColor.a <= 0.0) discard;

	vec4 ShadowCoord	= vShadowCoord / vShadowCoord.w;
	vec4 Shadow		= vec4(1.0);

	if ( ShadowCoord.z > -1.0 && ShadowCoord.z < 1.0 ) {
		Shadow = texture2DProj( textureDepth, ShadowCoord,  0.00005 );		
	}


	float bias = .0001;
	float visibility = 1.0;
	float descrease = .1;

	const float tmp = 700.0;

	if ( getDepthValue( ShadowCoord.xy + vec2( -0.94201624, -0.39906216 )/ tmp )  <  ShadowCoord.z-bias ){		visibility-=descrease;}
	if ( getDepthValue( ShadowCoord.xy + vec2( 0.94558609, -0.768907256 )/ tmp )  <  ShadowCoord.z-bias ){		visibility-=descrease;}
	if ( getDepthValue( ShadowCoord.xy + vec2( -0.094184101, -0.92938870 )/ tmp )  <  ShadowCoord.z-bias ){	visibility-=descrease;}
	if ( getDepthValue( ShadowCoord.xy + vec2( 0.34495938, 0.29387760 )/ tmp )  <  ShadowCoord.z-bias ){		visibility-=descrease;}

	// visibility = mix(visibility, 1.0, .25);		

	float _pcf = samplePCF3x3(vShadowCoord);

	vec4 color = vColor;
	color.rgb *= visibility;
	// color.rgb *= _pcf;
	gl_FragColor = color;
	// gl_FragColor.rgb = vec3(_pcf);
}