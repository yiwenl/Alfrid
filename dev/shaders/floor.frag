#version 300 es

precision highp float;
in vec4 vShadowCoord;
uniform sampler2D textureDepth;
out vec4 oColor;


float samplePCF4x4( vec4 sc )
{
    const float r = 2.0;
    const float s = 2.0 * r;
    
    float shadow = 0.0;
    float threshold = 1.0;
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2(-s,-s) ).r);
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2(-r,-s) ).r);
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2( r,-s) ).r);
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2( s,-s) ).r);
    
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2(-s,-r) ).r);
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2(-r,-r) ).r);
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2( r,-r) ).r);
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2( s,-r) ).r);
    
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2(-s, r) ).r);
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2(-r, r) ).r);
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2( r, r) ).r);
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2( s, r) ).r);
    
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2(-s, s) ).r);
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2(-r, s) ).r);
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2( r, s) ).r);
    shadow += step(threshold, textureProjOffset( textureDepth,  sc, ivec2( s, s) ).r);
        
    return shadow/16.0;
}


float samplePCF4x4NoThreshold( vec4 sc )
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
	// float s             = samplePCF4x4NoThreshold(shadowCoord);

    oColor = vec4(vec3(s), 1.0);
}