precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler0;
<<<<<<< HEAD
// uniform float alpha;

void main(void) {
    gl_FragColor = texture2D(uSampler0, vec2(vTextureCoord.s, vTextureCoord.t));
    // gl_FragColor.a *= alpha;

    // gl_FragColor = vec4(1.0);
=======
uniform float alpha;

void main(void) {
    gl_FragColor = texture2D(uSampler0, vec2(vTextureCoord.s, vTextureCoord.t));
    gl_FragColor.a *= alpha;
>>>>>>> 6d975a773a6f2ad091b88f932153c0dd9582bcba
}