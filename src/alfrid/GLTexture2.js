// GLTexture2.js

import getTextureParameters from './utils/getTextureParameters';
import WebglNumber from './utils/WebglNumber';
import GL from './GLTool';

let gl;

class GLTexture {

	constructor(mSource, mParam, mWidth, mHeight) {
		gl = GL.gl;

		if(mSource) {
			this._width = mSource.width || mSource.videoWidth;
			this._height = mSource.height || mSource.videoWidth;	

			this._width = this._width || mWidth;
			this._height = this._height || mHeight;

		} else {
			this._width = mWidth;
			this._height = mHeight;
		}


		this._source = mSource;

		this._params = getTextureParameters(mParam, mSource, this._width, this._height);
		if(this._params.needConvertArray) {
			if(this._params.type === GL.UNSIGNED_BYTE) {
				this._source = new Uint8Array(mSource);
			} else if(this._params.type === GL.FLOAT) {
				this._source = new Float32Array(mSource);
			}
		}
		this._canGenerateMipMap = false;


		console.log('GL TYPE :', this._getGLType());

		console.log('Texture Parameters :');
		for(let s in this._params) {
			console.log(s, WebglNumber[this._params[s]] || this._params[s]);
		}

		//	setup texture
		
		this._texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this._texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

		if(this._source) {
			// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._source);
			// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._source);
			console.log(this._width, this._height);
			// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._width, this._height, 0, gl.RGBA, gl.UNSIGNED_BYTE, this._source);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._width, this._height, 0, gl.RGBA, this._getGLType(), this._source);
		}

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._params.magFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._params.minFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._params.wrapS);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._params.wrapT);

		const ext = GL.getExtension('EXT_texture_filter_anisotropic');
		if(ext) {
			const max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
			gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
		}

		gl.generateMipmap(gl.TEXTURE_2D);

		//	unbind texture
		gl.bindTexture(gl.TEXTURE_2D, null);
	}


	bind(index) {
		if(index === undefined) { index = 0; }
		if(!GL.shader) { return; }

		gl.activeTexture(gl.TEXTURE0 + index);
		gl.bindTexture(gl.TEXTURE_2D, this._texture);
		this._bindIndex = index;
	}


	_getGLType() {
		return GL[WebglNumber[this._params.type]];
	}


	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}


}


export default GLTexture;