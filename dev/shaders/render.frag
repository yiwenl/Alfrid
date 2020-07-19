#version 300 es
precision highp float;
in vec3 vColor;
in vec4 vShadowCoord;

uniform sampler2D textureDepth;

out vec4 oColor;


float samplePCF4x4( vec4 sc )
{
    const int r = 2;
    const int s = 2 * r;
    
    float shadow = 0.0;
    float bias = 0.001;
    float threshold = sc.z - bias;
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



void main(void) {
    if(distance(gl_PointCoord, vec2(.5)) > .5) {
        discard;
    }

    vec4 shadowCoord    = vShadowCoord / vShadowCoord.w;
	float s             = samplePCF4x4(shadowCoord);
    s = mix(s, 1.0, .25);
    oColor = vec4(vColor * s, 1.0);
}