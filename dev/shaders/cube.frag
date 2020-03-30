// cube.frag

precision highp float;
varying vec2 vTextureCoord;
varying vec3 vNormal;
varying vec3 vPosition;

void main(void) {
    gl_FragData[0] = vec4(vPosition, 1.0);
    gl_FragData[1] = vec4(vTextureCoord, 0.0, 1.0);
    gl_FragData[2] = vec4(vNormal, 1.0);
    gl_FragData[3] = vec4(1.0, 1.0, 1.0, 1.0);
    gl_FragData[4] = vec4(1.0, 0.0, 0.0, 1.0);
    gl_FragData[5] = vec4(0.0, 1.0, 0.0, 1.0);
    gl_FragData[6] = vec4(0.0, 0.0, 1.0, 1.0);
    gl_FragData[7] = vec4(1.0, 1.0, 0.0, 1.0);
}