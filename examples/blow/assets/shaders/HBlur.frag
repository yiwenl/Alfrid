precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D texture;
uniform float blur;

void main(void) {
    vec4 sum = vec4( 0.0 );

	sum += texture2D( texture, vec2( vTextureCoord.x - 4.0 * blur, vTextureCoord.y ) ) * 0.051;
	sum += texture2D( texture, vec2( vTextureCoord.x - 3.0 * blur, vTextureCoord.y ) ) * 0.0918;
	sum += texture2D( texture, vec2( vTextureCoord.x - 2.0 * blur, vTextureCoord.y ) ) * 0.12245;
	sum += texture2D( texture, vec2( vTextureCoord.x - 1.0 * blur, vTextureCoord.y ) ) * 0.1531;
	sum += texture2D( texture, vec2( vTextureCoord.x,		 	vTextureCoord.y ) ) * 0.1633;
	sum += texture2D( texture, vec2( vTextureCoord.x + 1.0 * blur, vTextureCoord.y ) ) * 0.1531;
	sum += texture2D( texture, vec2( vTextureCoord.x + 2.0 * blur, vTextureCoord.y ) ) * 0.12245;
	sum += texture2D( texture, vec2( vTextureCoord.x + 3.0 * blur, vTextureCoord.y ) ) * 0.0918;
	sum += texture2D( texture, vec2( vTextureCoord.x + 4.0 * blur, vTextureCoord.y ) ) * 0.051;

	gl_FragColor = sum;
}