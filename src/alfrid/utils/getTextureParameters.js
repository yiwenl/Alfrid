// getTextureParameters.js

import GL from '../GLTool'

function isPowerOfTwo (x) {
  return (x !== 0) && (!(x & (x - 1)))
};

const getTextureParameters = function (mParams, mSource, mWidth, mHeight) {
  if (!mParams.minFilter) {
    let minFilter = GL.LINEAR
    if (mWidth && mWidth) {
      if (isPowerOfTwo(mWidth) && isPowerOfTwo(mHeight)) {
        minFilter = GL.NEAREST_MIPMAP_LINEAR
      }
    }

    mParams.minFilter = minFilter
  }

  mParams.mipmap = mParams.mipmap === undefined ? true : mParams.mipmap
  mParams.magFilter = mParams.magFilter || GL.LINEAR
  mParams.wrapS = mParams.wrapS || GL.CLAMP_TO_EDGE
  mParams.wrapT = mParams.wrapT || GL.CLAMP_TO_EDGE
  mParams.internalFormat = mParams.internalFormat || GL.RGBA
  mParams.format = mParams.format || GL.RGBA
  mParams.premultiplyAlpha = mParams.premultiplyAlpha === undefined ? false : mParams.premultiplyAlpha
  mParams.level = mParams.level || 0
  return mParams
}

export default getTextureParameters
