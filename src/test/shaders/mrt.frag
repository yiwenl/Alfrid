#version 300 es

precision highp float;

layout(location = 0) out vec4 colorFull;
layout(location = 1) out vec4 colorRed;
layout(location = 2) out vec4 colorBlue;
layout(location = 3) out vec4 colorGreen;

in vec2 vTextureCoord;
in vec3 vNormal;

void main(void) {
    colorFull 	= vec4(vNormal, 1.0);

    colorRed 	= vec4(vNormal.rrr, 1.0);
    colorBlue 	= vec4(vNormal.ggg, 1.0);
    colorGreen 	= vec4(vNormal.bbb, 1.0);
}