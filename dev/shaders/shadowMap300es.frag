#version 300 es


precision highp float;
// precision mediump sampler2DShadow;
in vec2 vTextureCoord;
in vec3 vNormal;
in vec4 vShadowCoord;

out vec4 oColor;



// uniform sampler2DShadow textureDepth;
uniform sampler2D textureDepth;


#define uMapSize vec2(1024.0)
#define FOG_DENSITY 0.2
#define LIGHT_POS vec3(0.0, 10.0, 0.0)


float rand(vec4 seed4) {
	float dot_product = dot(seed4, vec4(12.9898,78.233,45.164,94.673));
	return fract(sin(dot_product) * 43758.5453);
}


float PCFShadow(sampler2D depths, vec2 size, vec4 shadowCoord) {
	float result = 0.0;
	float bias = 0.005;
	vec2 uv = shadowCoord.xy;

	for(int x=-1; x<=1; x++){
		for(int y=-1; y<=1; y++){
			vec2 off = vec2(x,y) + rand(vec4(gl_FragCoord.xy, float(x), float(y)));
			off /= size;

			float d = texture(depths, uv + off).r;
			if(d < shadowCoord.z - bias) {
				result += 1.0;
			}

		}
	}
	return 1.0 -result/9.0;

}


float samplePCF4x4( vec4 sc )
{
    const int r = 2;
    const int s = 2 * r;
    
    float shadow = 0.0;
    shadow += textureProjOffset( textureDepth,  sc, ivec2(-s,-s) ).r;
    shadow += textureProjOffset( textureDepth,  sc, ivec2(-r,-s) ).r;
    shadow += textureProjOffset( textureDepth,  sc, ivec2( r,-s) ).r;
    shadow += textureProjOffset( textureDepth,  sc, ivec2( s,-s) ).r;
    
    shadow += textureProjOffset( textureDepth,  sc, ivec2(-s,-r) ).r;
    shadow += textureProjOffset( textureDepth,  sc, ivec2(-r,-r) ).r;
    shadow += textureProjOffset( textureDepth,  sc, ivec2( r,-r) ).r;
    shadow += textureProjOffset( textureDepth,  sc, ivec2( s,-r) ).r;
    
    shadow += textureProjOffset( textureDepth,  sc, ivec2(-s, r) ).r;
    shadow += textureProjOffset( textureDepth,  sc, ivec2(-r, r) ).r;
    shadow += textureProjOffset( textureDepth,  sc, ivec2( r, r) ).r;
    shadow += textureProjOffset( textureDepth,  sc, ivec2( s, r) ).r;
    
    shadow += textureProjOffset( textureDepth,  sc, ivec2(-s, s) ).r;
    shadow += textureProjOffset( textureDepth,  sc, ivec2(-r, s) ).r;
    shadow += textureProjOffset( textureDepth,  sc, ivec2( r, s) ).r;
    shadow += textureProjOffset( textureDepth,  sc, ivec2( s, s) ).r;
        
    return shadow/16.0;
}

void main(void) {
  vec4 shadowCoord    = vShadowCoord / vShadowCoord.w;
	// float s             = PCFShadow(textureDepth, uMapSize, shadowCoord);
	float s             = samplePCF4x4(shadowCoord);
  oColor        			= vec4(vec3(s), 1.0);
}