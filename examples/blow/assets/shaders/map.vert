precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aVertexColor;
//attribute vec3 aExtra;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform vec3 position;
uniform float opacity;
uniform sampler2D texture;
varying vec4 vVertexColor;
varying float alpha;
varying float toDiscard;

#define PI 3.1415926

void main(void) {
	vec3 pos = aVertexPosition;
	vec4 color = texture2D(texture, aTextureCoord);
	float range = 200.0;
	alpha = clamp(1.5 - color.y, 0.0, 1.0);

	alpha = sin(alpha * PI * .5);
	alpha *= opacity;
	pos = color.rgb - vec3(.5);
	pos.y *= 1.3;
	pos *= range;
	if(aTextureCoord.x < .5 && aTextureCoord.y < .5) {
		toDiscard = 1.0;
	} else {
		toDiscard = 0.0;
	}

	if(color.y >= 1.5) toDiscard = 0.0;

    gl_Position = uPMatrix * uMVMatrix * vec4(pos+position, 1.0);
    vVertexColor = aVertexColor;
}