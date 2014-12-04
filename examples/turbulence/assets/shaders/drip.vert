precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 invertMatrix;
uniform vec3 position;
uniform vec3 scale;

varying vec2 vTextureCoord;

void main(void) {
	vec4 pos = invertMatrix * ( vec4 (aVertexPosition, 1.0) );
	pos.rgb *= scale;
    gl_Position = uPMatrix * uMVMatrix * vec4(pos.rgb+position, 1.0);
    vTextureCoord = aTextureCoord;
}