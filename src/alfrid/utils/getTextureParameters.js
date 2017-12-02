// getTextureParameters.js

import GL from '../GLTool';

function isPowerOfTwo(x) {	
	return (x !== 0) && (!(x & (x - 1)));
};

function isSourcePowerOfTwo(obj) {	
	const w = obj.width || obj.videoWidth;
	const h = obj.height || obj.videoHeight;

	if(!w || !h) { return false; }

	return isPowerOfTwo(w) && isPowerOfTwo(h);
};

const getTextureParameters = function(mParams, mSource, mWidth, mHeight) {
	if(!mParams.minFilter) {
		let minFilter = GL.LINEAR;
		if(mWidth && mWidth) {
			if(isPowerOfTwo(mWidth) && isPowerOfTwo(mHeight)) {
				minFilter = GL.NEAREST_MIPMAP_LINEAR;
			}
		}

		mParams.minFilter = minFilter;
	} 


	if(!mParams.type) {
		if(mSource) {
			// console.log('Source type : ');
			if (mSource instanceof Uint8Array) {
				// console.log('Uint8Array');
				mParams.type = GL.UNSIGNED_BYTE;
				mParams.needConvertArray = true;
			} else if(mSource instanceof Float32Array) {
				// console.log('Float32Array');
				mParams.type = GL.FLOAT;
				mParams.needConvertArray = true;
			} else if(mSource instanceof Array) {
				// console.log('Array');
				mParams.type = GL.UNSIGNED_BYTE;
				mParams.needConvertArray = true;
			} else {
				console.log(typeof mSource);

			}
		} else {
			mParams.type = GL.UNSIGNED_BYTE;
		}
	}

	if(mParams.type === GL.FLOAT || GL.UNSIGNED_BYTE) {
		if(mSource instanceof Array) {
			mParams.needConvertArray = true;	
		}
	}
	
	mParams.magFilter = mParams.magFilter || GL.LINEAR;
	mParams.wrapS = mParams.wrapS || GL.CLAMP_TO_EDGE;
	mParams.wrapT = mParams.wrapT || GL.CLAMP_TO_EDGE;
	mParams.premultiplyAlpha = mParams.premultiplyAlpha || false;
	return mParams;
}


export default getTextureParameters;