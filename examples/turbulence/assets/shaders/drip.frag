precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler0;
uniform float alpha;
uniform vec3 color;

void main(void) {
    gl_FragColor = texture2D(uSampler0, vec2(vTextureCoord.s, 1.0 - vTextureCoord.t));
    float alphaOffset = 1.0;
    if(vTextureCoord.y > .9) alphaOffset = 0.0;
    else if(vTextureCoord.y > .8) alphaOffset = 1.0 - (vTextureCoord.y - .8) / .1;
    // else if(vTextureCoord.y < .2) alphaOffset = (vTextureCoord.y-.1) / .1;
    gl_FragColor.rgb *= color;
    gl_FragColor *= alpha * alphaOffset;
    if(gl_FragColor.a<.0001) discard;
}