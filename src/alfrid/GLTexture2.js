// GLTexture2.js

import getTextureParameters from './utils/getTextureParameters';
import WebglNumber from './utils/WebglNumber';
import GL from './GLTool';

let gl;

class GLTexture {

	constructor(mSource, mParam, mWidth, mHeight) {
		gl = GL.gl;

		this._source = mSource;
		this._getDimension(mSource, mWidth, mHeight);
		this._sourceType = mParam.type || getSourceType(mSource);
		this._checkSource();
		this._internalFormat;
		this._texelType = this._getTexelType();

		this._params = getTextureParameters(mParam, mSource, this._width, this._height);
		this._checkMipmap();

		//	setup texture
		
		this._texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this._texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

		if(this._isSourceHtmlElement()) {
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, this._texelType, this._source);
		} else {
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._width, this._height, 0, gl.RGBA, this._texelType, this._source);	
		}
		

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._params.magFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._params.minFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._params.wrapS);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._params.wrapT);
		gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this._premultiplyAlpha);

		const ext = GL.getExtension('EXT_texture_filter_anisotropic');
		if(ext) {
			const max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
			gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
		}

		if(this._generateMipmap) {
			gl.generateMipmap(gl.TEXTURE_2D);	
		}
		

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


	generateMipmap() {
		if (!this._generateMipmap) { return; }
		gl.bindTexture(gl.TEXTURE_2D, this._texture);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
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
		console.log('Source type :', WebglNumber[this._sourceType] || this._sourceType);

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

	_getTexelType() {
		if(this._isSourceHtmlElement()) {
			return GL.UNSIGNED_BYTE;	
		}

		return GL[WebglNumber[this._sourceType]];
	}

	_checkMipmap() {
		this._generateMipmap = this._params.mipmap;

		if(!(isPowerOfTwo(this._width) && isPowerOfTwo(this._height))) {
			this._generateMipmap = false;
		}

		const minFilter = WebglNumber[this._params.minFilter];
		if(minFilter.indexOf('MIPMAP') == -1) {
			this._generateMipmap = false;
		}
	}

	showParameters() {
		for(let s in this._params) {
			console.log(s, WebglNumber[this._params[s]] || this._params[s]);
		}

		console.log('Mipmapping :', this._generateMipmap);
	}

	_isSourceHtmlElement() {
		return this._sourceType === 'image' || this._sourceType === 'video';
	}

	get texelType() {
		return this._texelType;
	}

	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

}


function isPowerOfTwo(x) {	
	return (x !== 0) && (!(x & (x - 1)));
};

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
	} else if(mSource instanceof Image) {
		type = 'image';
	}
	return type;
}

export default GLTexture;