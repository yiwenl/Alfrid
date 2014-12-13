precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler0;
uniform float alpha;

void main(void) {
    gl_FragColor = texture2D(uSampler0, vec2(vTextureCoord.s, vTextureCoord.t));
    vec3 white = vec3(.9843, 0.8313, 0.8039);
    //gl_FragColor.rgb = mix(gl_FragColor.rgb, white, alpha);
    gl_FragColor.rgb = mix(white, gl_FragColor.rgb, alpha);
}