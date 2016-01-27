// shadow.vert

#define SHADER_NAME SHADOW_VERTEX

precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uShadowMatrix;
uniform mat3 uNormalMatrix;

uniform vec3 position;

varying vec2 vTextureCoord;
varying vec3 vNormal;
varying vec4 vShadowCoord;
varying vec4 vPosition;

const mat4 biasMatrix = mat4( 0.5, 0.0, 0.0, 0.0,
							  0.0, 0.5, 0.0, 0.0,
							  0.0, 0.0, 0.5, 0.0,
							  0.5, 0.5, 0.5, 1.0 );

void main(void) {
	vec3 pos        = aVertexPosition + position;
	vec4 mvPosition = uViewMatrix * uModelMatrix * vec4(pos, 1.0);
	gl_Position     = uProjectionMatrix * mvPosition;
	vPosition       = mvPosition;
	vTextureCoord   = aTextureCoord;
	
	vNormal         = normalize(uNormalMatrix * aNormal);
	
	vShadowCoord    = ( biasMatrix * uShadowMatrix * uModelMatrix ) * vec4(pos, 1.0);;
}