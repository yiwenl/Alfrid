// GLTexture2.js

import getTextureParameters from './utils/getTextureParameters';
import WebglNumber from './utils/WebglNumber';
import GL from './GLTool';

let gl;

class GLTexture {

	constructor(mSource, mParam, mWidth, mHeight) {
		gl = GL.gl;

		this._source = mSource;
		this._sourceType = mParam.type || getSourceType(mSource);
		this._checkSource();
		
		this._internalFormat;
		this._format = this._getFormat();
		console.log('Format :', WebglNumber[this._format]);

		this._getDimension(mSource, mWidth, mHeight);

		this._params = getTextureParameters(mParam, mSource, this._width, this._height);
		if(this._params.needConvertArray) {
			if(this._params.type === GL.UNSIGNED_BYTE) {
				this._source = new Uint8Array(mSource);
			} else if(this._params.type === GL.FLOAT) {
				this._source = new Float32Array(mSource);
			}
		}
		this._canGenerateMipMap = false;

		// console.log('Texture Parameters :');
		// for(let s in this._params) {
		// 	console.log(s, WebglNumber[this._params[s]] || this._params[s]);
		// }

		//	setup texture
		
		this._texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this._texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

		if(this._source) {
			// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._source);
			// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._source);
			// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._width, this._height, 0, gl.RGBA, gl.UNSIGNED_BYTE, this._source);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._width, this._height, 0, gl.RGBA, this._getFormat(), this._source);
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


	_getDimension(mSource, mWidth, mHeight) {
		if(mSource) {
			//	for html image / video element
			this._width = mSource.width || mSource.videoWidth;
			this._height = mSource.height || mSource.videoWidth;	

			//	for manual width / height settings
			this._width = this._width || mWidth;
			this._height = this._height || mHeight;

			//	auto detect ( data array) ? not sure is good idea ? 
			//	todo : check HDR 
			if(!this._width || !this._height) {
				this._width = this._height = Math.sqrt(mSource.length / 4);
				console.log('Auto detect, data dimension : ', this._width, this._height);	
			}

		} else {
			this._width = mWidth;
			this._height = mHeight;
		}
	}

	_checkSource() {
		console.log('Source type :', WebglNumber[this._sourceType]);

		if(this._sourceType === GL.UNSIGNED_BYTE) {
			if (!(this._source instanceof Uint8Array)) {
				console.log('Converting to Uint8Array');
				this._source = new Uint8Array(this._source);
			}
		} else if(this._sourceType === GL.FLOAT) {
			if (!(this._source instanceof Float32Array)) {
				console.log('Converting to Float32Array');
				this._source = new Float32Array(this._source);
			}
		}
	}

	_getFormat() {
		return GL[WebglNumber[this._sourceType]];
	}


	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}


}


function getSourceType(mSource) {
	//	possible source type : Image / Video / Unit8Array / Float32Array
	//	this list must be flexible

	let type = GL.UNSIGNED_BYTE;

	if(mSource instanceof Array) {
		type = GL.UNSIGNED_BYTE;
	} else if(mSource instanceof Uint8Array) {
		type = GL.UNSIGNED_BYTE;
	} else if(mSource instanceof Float32Array) {
		type = GL.FLOAT;
	}
	return type;
}

export default GLTexture;