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

#define lightColor vec3(1.0)
#define ambientColor vec3(.45)
#define lightDir vec3(-1.0, -1.0, 1.0)
#define lightWeight .65

void main(void) {
	vec3 pos = aVertexPosition * scale;
	pos += position;
    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
    vTextureCoord = aTextureCoord;
    vNormal = aNormal;

    vec3 lightDirNormal = normalize(lightDir);
    float lightOffset = dot(lightDirNormal, aNormal);
    vLight = ambientColor + (lightOffset * lightColor * lightWeight);

}