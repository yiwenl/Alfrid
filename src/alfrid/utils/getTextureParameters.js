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

	mParams.magFilter = mParams.magFilter || GL.LINEAR;
	mParams.wrapS = mParams.wrapS || GL.CLAMP_TO_EDGE;
	mParams.wrapT = mParams.wrapT || GL.CLAMP_TO_EDGE;
	mParams.premultiplyAlpha = mParams.premultiplyAlpha || false;
	return mParams;
}


export default getTextureParameters;