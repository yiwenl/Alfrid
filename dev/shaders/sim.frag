#version 300 es

precision highp float;
in vec2 vTextureCoord;
uniform sampler2D texturePos;
uniform sampler2D textureVel;
uniform sampler2D textureExtra;

uniform float uTime;

#pragma glslify: snoise = require(glsl-utils/snoise.glsl)
#pragma glslify: curlNoise = require(glsl-utils/curlNoise.glsl)

layout (location = 0) out vec4 oFragColor0;
layout (location = 1) out vec4 oFragColor1;
layout (location = 2) out vec4 oFragColor2;

void main(void) {
    vec3 pos = texture(texturePos, vTextureCoord).xyz;
    vec3 vel = texture(textureVel, vTextureCoord).xyz;
    vec3 extra = texture(textureExtra, vTextureCoord).xyz;

    float noiseBase = snoise(pos * 0.1 + extra * 0.2 - uTime * 0.02) * .5 + .5;
    float posOffset = mix(0.1, 0.2, noiseBase);
    vec3 noise = curlNoise(pos * posOffset + uTime * 0.1);

    vec3 acc = noise;

    const float maxRadius = 1.0;
    vec3 dir = -normalize(pos);
    float dist = length(pos);

    if(dist > maxRadius) {
        float f = mix(1.0, 2.0, extra.b);
        acc += dir * (dist - maxRadius) * f * 0.5;
    }

    float speedOffset = mix(0.5, 1.0, extra.r);
    vel += acc * 0.002 * speedOffset;

    pos += vel;

    vel *= 0.96;

    oFragColor0 = vec4(pos, 1.0);
    oFragColor1 = vec4(vel, 1.0);
    oFragColor2 = vec4(extra, 1.0);
}