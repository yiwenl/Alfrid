precision highp float;
attribute vec3 aVertexPosition;
attribute vec3 aNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform vec3 scale;
uniform vec3 position;

varying vec2 vTextureCoord;
varying vec3 vNormal;
varying vec3 vLight;

#define ambientColor vec3(.4)

#define lightColor0 vec3(1.0)
#define lightDir0 vec3(0.0, -1.0, 0.0)
#define lightWeight0 .5

#define lightColor1 vec3(.9137, .9176, .9843)
#define lightDir1 vec3(1.0, 0.0, 2.0)
#define lightWeight1 .4

#define lightColor2 vec3(.9843, .9725, .9137)
#define lightDir2 vec3(-1.0, 0.0, -2.0)
#define lightWeight2 .4

void main(void) {
	vec3 pos = aVertexPosition * scale;
	pos += position;
    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
    vTextureCoord = aTextureCoord;
    vNormal = aNormal;

    vec3 lightDirNormal0 = normalize(lightDir0);
    vec3 lightOffset0 = dot(lightDirNormal0, aNormal) * lightWeight0 * lightColor0;

    vec3 lightDirNormal1 = normalize(lightDir1);
    vec3 lightOffset1 = dot(lightDirNormal1, aNormal) * lightWeight1 * lightColor1;

    vec3 lightDirNormal2 = normalize(lightDir2);
    vec3 lightOffset2 = dot(lightDirNormal2, aNormal) * lightWeight2 * lightColor2;

    vLight = ambientColor + lightOffset0 + lightOffset1 + lightOffset2;

}