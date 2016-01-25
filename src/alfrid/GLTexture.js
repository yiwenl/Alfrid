// GLTexture.js

'use strict';

import GL from './GLTool';

const isPowerOfTwo = function(x) {	
	return (x !== 0) && (!(x & (x - 1)));
};

const isSourcePowerOfTwo = function(obj) {	
	let w = obj.width || obj.videoWidth;
	let h = obj.height || obj.videoHeight;

	if(!w || !h) {return false;}

	return isPowerOfTwo(w) && isPowerOfTwo(h);
};

let gl;

class GLTexture {

	constructor(mSource, isTexture=false, mParameters={}) {
		gl = GL.gl;

		if(isTexture) {
			this.texture = mSource;
		} else {
			this._mSource  = mSource;
			this.texture   = gl.createTexture();
			this._isVideo  = (mSource.tagName === 'VIDEO');
			this.magFilter = mParameters.magFilter || gl.LINEAR;
			this.minFilter = mParameters.minFilter || gl.LINEAR_MIPMAP_NEAREST;
			
			this.wrapS     = mParameters.wrapS || gl.MIRRORED_REPEAT;
			this.wrapT     = mParameters.wrapT || gl.MIRRORED_REPEAT;
			let width      = mSource.width || mSource.videoWidth;

			if(width) {
				if(!isSourcePowerOfTwo(mSource)) {
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


	//	MIPMAP FILTER

	minFilter(mValue) {
		if(mValue !== gl.LINEAR && mValue !== gl.NEAREST && mValue !== gl.LINEAR_MIPMAP_NEAREST) { return this; }
		this.minFilter = mValue;
		return this;
	}

	magFilter(mValue) {
		if(mValue !== gl.LINEAR && mValue !== gl.NEAREST && mValue !== gl.LINEAR_MIPMAP_NEAREST) { return this; }
		this.magFilter = mValue;
		return this;
	}


	//	WRAP

	wrapS(mValue) {
		if(mValue !== gl.CLAMP_TO_EDGE && mValue !== gl.REPEAT && mValue !== gl.MIRRORED_REPEAT) { return this; }
		this.wrapS = mValue;
		return this;
	}

	wrapT(mValue) {
		if(mValue !== gl.CLAMP_TO_EDGE && mValue !== gl.REPEAT && mValue !== gl.MIRRORED_REPEAT) { return this; }
		this.wrapT = mValue;
		return this;
	}


	//	UPDATE TEXTURE

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

export default GLTexture;