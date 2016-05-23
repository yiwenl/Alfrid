// ball.vert

precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

uniform vec3 position;
uniform vec3 scale;

varying vec2 vTextureCoord;
varying float vDepth;
varying vec3 vNormal;

void main(void) {
	vec3 pos  	  = aVertexPosition * scale + position;
	vec4 V        = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(pos, 1.0);
	gl_Position   = V;
	
	vTextureCoord = aTextureCoord;
	vDepth        = V.z/V.w;
	vNormal		  = aNormal;
}