// FrameBuffer.js

'use strict';

import GL from './GLTool';
import GLTexture from './GLTexture';

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

class FrameBuffer {

	constructor(mWidth, mHeight, mParameters={}) {
		gl = GL.gl;

		this.width     = width;
		this.height    = height;
		this.magFilter = options.magFilter || gl.LINEAR;
		this.minFilter = options.minFilter || gl.LINEAR;
		this.wrapS     = options.wrapS || gl.MIRRORED_REPEAT;
		this.wrapT     = options.wrapT || gl.MIRRORED_REPEAT;

		if(!isPowerOfTwo(width) || !isPowerOfTwo(height)) {
			this.wrapS = this.wrapT = gl.CLAMP_TO_EDGE;

			if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
				this.minFilter = gl.LINEAR;
			}
		} 

		this._init();
	}

	_init() {

	}


	//	PUBLIC METHODS

	bind() {

	}


	unbind() {

	}


	//	MIPMAP FILTER

	minFilter(mValue) {
		if(mValue != gl.LINEAR && mValue != gl.NEAREST && mValue != gl.LINEAR_MIPMAP_NEAREST) { return this; }
		this.minFilter = mValue;
		return this;
	}

	magFilter(mValue) {
		if(mValue != gl.LINEAR && mValue != gl.NEAREST && mValue != gl.LINEAR_MIPMAP_NEAREST) { return this; }
		this.magFilter = mValue;
		return this;
	}


	//	WRAP

	wrapS(mValue) {
		if(mValue != gl.CLAMP_TO_EDGE && mValue != gl.REPEAT && mValue != gl.MIRRORED_REPEAT) { return this; }
		this.wrapS = mValue;
		return this;
	}

	wrapT(mValue) {
		if(mValue != gl.CLAMP_TO_EDGE && mValue != gl.REPEAT && mValue != gl.MIRRORED_REPEAT) { return this; }
		this.wrapT = mValue;
		return this;
	}


	//	TEXTURES

	getTexture() {
		return this.glTexture;
	}

	getDepthTexture() {
		return this.glDepthTexture;
	}

}


export default FrameBuffer;