// GLCubeTexture.js

'use strict';

import GL from './GLTool';

let gl;


class GLCubeTexture {
	constructor(mSource, mParameters={}, isCubeTexture=false) {
		// console.log(typeof(mSource));
		gl = GL.gl;

		if(isCubeTexture) {
			this.texture = mSource;
			return;
		}

		this.texture   = gl.createTexture();
		this.magFilter = mParameters.magFilter || gl.LINEAR;
		this.minFilter = mParameters.minFilter || gl.LINEAR_MIPMAP_NEAREST;
		this.wrapS     = mParameters.wrapS || gl.CLAMP_TO_EDGE;
		this.wrapT     = mParameters.wrapT || gl.CLAMP_TO_EDGE;

		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
		const targets = [
			gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
			gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
			gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z 
		];

		for (let j = 0; j < 6; j++) {
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
			// gl.texImage2D(targets[j], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mSource[j]);	
			if(mSource[j].exposure) {
				gl.texImage2D(targets[j], 0, gl.RGBA, mSource[j].shape[0], mSource[j].shape[1], 0, gl.RGBA, gl.FLOAT, mSource[j].data);
			} else {
				gl.texImage2D(targets[j], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mSource[j]);
			}
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

		gl.activeTexture(gl.TEXTURE0 + index);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
		gl.uniform1i(GL.shader.uniformTextures[index], index);
		this._bindIndex = index;
	}

	unbind() {
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);	
	}
}


export default GLCubeTexture;