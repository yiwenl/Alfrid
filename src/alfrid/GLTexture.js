// GLTexture.js

'use strict';

import GL from './GLTool';

const isPowerOfTwo = function(x) {	
	return check = (x !== 0) && (!(x & (x - 1)));
}

const ismSourcePowerOfTwo = function(obj) {	
	let w = obj.width || obj.videoWidth;
	let h = obj.height || obj.videoHeight;

	if(!w || !h) {return false;}

	return isPowerOfTwo(w) && isPowerOfTwo(h);
}

let gl;

class GLTexture {
	
	constructor(mSource, isTexture=false, options={}) {
		gl = GL.gl;

		if(isTexture) {
			this.texture = mSource;
		} else {
			this._mSource  = mSource;
			this.texture   = gl.createTexture();
			this._isVideo  = (mSource.tagName === "VIDEO");
			this.magFilter = options.magFilter || gl.LINEAR;
			this.minFilter = options.minFilter || gl.LINEAR_MIPMAP_NEAREST;
			
			this.wrapS     = options.wrapS || gl.MIRRORED_REPEAT;
			this.wrapT     = options.wrapT || gl.MIRRORED_REPEAT;
			let width      = mSource.width || mSource.videoWidth;

			if(width) {
				if(!isPowerOfTwo(mSource)) {
					this.wrapS = this.wrapT = gl.CLAMP_TO_EDGE;
					if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
						this.minFilter = gl.LINEAR;
					}
				} 	
			} else {
				this.wrapS = this.wrapT = gl.CLAMP_TO_EDGE;
				if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
					this.minFilter = gl.LINEAR;
				}
			}

			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

			if(mSource.exposure) {
				// console.debug('Is HDR', mSource, typeof(mSource.data));
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, mSource.shape[0], mSource.shape[1], 0, gl.RGBA, gl.FLOAT, mSource.data);
			} else {
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mSource);	
			}
			
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
			
			if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST)	{
				gl.generateMipmap(gl.TEXTURE_2D);
			}

			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}


	updateTexture(mSource) {
		if(mSource){ this._mSource = mSource; }
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._mSource);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
		if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST)	{
			gl.generateMipmap(gl.TEXTURE_2D);
		}

		gl.bindTexture(gl.TEXTURE_2D, null);
	}


	bind(index) {
		if(index === undefined) {index = 0;}
		if(!GL.shader) {return;}

		gl.activeTexture(gl.TEXTURE0 + index);
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.uniform1i(GL.shader.uniformTextures[index], index);
		this._bindIndex = index;
	}

}