// GLCubeTexture.js

'use strict';

import GL from './GLTool';

let gl;


class GLCubeTexture {
	constructor(mSource, mParameters={}) {
		gl = GL.gl;

		this.texture = gl.createTexture();
		this.magFilter = mParameters.magFilter || gl.LINEAR;
		this.minFilter = mParameters.minFilter || gl.LINEAR_MIPMAP_NEAREST;
		this.wrapS     = mParameters.wrapS || gl.MIRRORED_REPEAT;
		this.wrapT     = mParameters.wrapT || gl.MIRRORED_REPEAT;

		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
		var targets = [
			gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
			gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
			gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z 
		];

		for (var j = 0; j < 6; j++) {
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
			gl.texImage2D(targets[j], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mSource[j]);	
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, this.wrapS);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, this.wrapT);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, this.magFilter);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, this.minFilter);
		}

		gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
	}

	

	//	PUBLIC METHOD

	bind (index=0) {
		if(!GL.shader) {return;}

		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
		gl.uniform1i(GL.shader.uniformTextures[index], index);
		this._bindIndex = index;
	}

	unbind() {
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);	
	}
}


export default GLCubeTexture;