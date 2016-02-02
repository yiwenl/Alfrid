// reflection.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;
uniform samplerCube texture;
uniform sampler2D textureLight;
uniform mat3 uNormalMatrix;
varying vec2 vTextureCoord;

varying vec3 vNormalWorldSpace;
varying vec3 vEyeDirWorldSpace;

const float PI = 3.141592657;
const float TwoPI = PI * 2.0;

float diffuse(vec3 N, vec3 L) {
	return max(dot(N, normalize(L)), 0.0);
}

vec2 envMapEquirect(vec3 wcNormal, float flipEnvMap) {
  //I assume envMap texture has been flipped the WebGL way (pixel 0,0 is a the bottom)
  //therefore we flip wcNorma.y as acos(1) = 0
  float phi = acos(-wcNormal.y);
  float theta = atan(flipEnvMap * wcNormal.x, wcNormal.z) + PI;
  return vec2(theta / TwoPI, phi / PI);
}

vec2 envMapEquirect(vec3 wcNormal) {
    //-1.0 for left handed coordinate system oriented texture (usual case)
    return envMapEquirect(wcNormal, -1.0);
}

const vec3 light = vec3(1.0);

void main(void) {
    vec3 reflectedEyeWorldSpace = reflect( vEyeDirWorldSpace, normalize(vNormalWorldSpace) );

    vec3 N = uNormalMatrix*vNormalWorldSpace;
    float _diffuse = diffuse(N, light);
    _diffuse = mix(_diffuse, 1.0, .2);
    gl_FragColor = textureCube(texture, reflectedEyeWorldSpace);
    gl_FragColor.rgb *= _diffuse;


    vec2 envLightUV = envMapEquirect(vNormalWorldSpace);
    vec3 envLight = texture2D(textureLight, envLightUV).rgb;
    gl_FragColor.rgb += envLight;
}