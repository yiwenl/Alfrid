// getTextureParameters.js

import GL from '../GLTool';

function isPowerOfTwo(x) {	
	return (x !== 0) && (!(x & (x - 1)));
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


	mParams.mipmap = mParams.mipmap || true;
	mParams.magFilter = mParams.magFilter || GL.LINEAR;
	mParams.wrapS = mParams.wrapS || GL.CLAMP_TO_EDGE;
	mParams.wrapT = mParams.wrapT || GL.CLAMP_TO_EDGE;
	mParams.premultiplyAlpha = mParams.premultiplyAlpha || false;
	return mParams;
}


export default getTextureParameters;