// GLTexture.js

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GLTool = require('./GLTool');

var _GLTool2 = _interopRequireDefault(_GLTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isPowerOfTwo = function isPowerOfTwo(x) {
	return x !== 0 && !(x & x - 1);
};

var isSourcePowerOfTwo = function isSourcePowerOfTwo(obj) {
	var w = obj.width || obj.videoWidth;
	var h = obj.height || obj.videoHeight;

	if (!w || !h) {
		return false;
	}

	return isPowerOfTwo(w) && isPowerOfTwo(h);
};

var gl = void 0;

var GLTexture = function () {
	function GLTexture(mSource) {
		var isTexture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
		var mParameters = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

		_classCallCheck(this, GLTexture);

		gl = _GLTool2.default.gl;

		if (isTexture) {
			this.texture = mSource;
		} else {
			this._mSource = mSource;
			this.texture = gl.createTexture();
			this._isVideo = mSource.tagName === 'VIDEO';
			this.magFilter = mParameters.magFilter || gl.LINEAR;
			this.minFilter = mParameters.minFilter || gl.LINEAR_MIPMAP_NEAREST;

			this.wrapS = mParameters.wrapS || gl.MIRRORED_REPEAT;
			this.wrapT = mParameters.wrapT || gl.MIRRORED_REPEAT;
			var width = mSource.width || mSource.videoWidth;

			if (width) {
				if (!isSourcePowerOfTwo(mSource)) {
					this.wrapS = this.wrapT = gl.CLAMP_TO_EDGE;
					if (this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
						this.minFilter = gl.LINEAR;
					}
				}
			} else {
				this.wrapS = this.wrapT = gl.CLAMP_TO_EDGE;
				if (this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
					this.minFilter = gl.LINEAR;
				}
			}

			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

			if (mSource.exposure) {
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, mSource.shape[0], mSource.shape[1], 0, gl.RGBA, gl.FLOAT, mSource.data);
			} else {
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mSource);
			}

			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);

			if (this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
				gl.generateMipmap(gl.TEXTURE_2D);
			}

			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}

	//	MIPMAP FILTER

	_createClass(GLTexture, [{
		key: 'minFilter',
		value: function minFilter(mValue) {
			if (mValue !== gl.LINEAR && mValue !== gl.NEAREST && mValue !== gl.LINEAR_MIPMAP_NEAREST) {
				return this;
			}
			this.minFilter = mValue;
			return this;
		}
	}, {
		key: 'magFilter',
		value: function magFilter(mValue) {
			if (mValue !== gl.LINEAR && mValue !== gl.NEAREST && mValue !== gl.LINEAR_MIPMAP_NEAREST) {
				return this;
			}
			this.magFilter = mValue;
			return this;
		}

		//	WRAP

	}, {
		key: 'wrapS',
		value: function wrapS(mValue) {
			if (mValue !== gl.CLAMP_TO_EDGE && mValue !== gl.REPEAT && mValue !== gl.MIRRORED_REPEAT) {
				return this;
			}
			this.wrapS = mValue;
			return this;
		}
	}, {
		key: 'wrapT',
		value: function wrapT(mValue) {
			if (mValue !== gl.CLAMP_TO_EDGE && mValue !== gl.REPEAT && mValue !== gl.MIRRORED_REPEAT) {
				return this;
			}
			this.wrapT = mValue;
			return this;
		}

		//	UPDATE TEXTURE

	}, {
		key: 'updateTexture',
		value: function updateTexture(mSource) {
			if (mSource) {
				this._mSource = mSource;
			}
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._mSource);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
			if (this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
				gl.generateMipmap(gl.TEXTURE_2D);
			}

			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}, {
		key: 'bind',
		value: function bind(index) {
			if (index === undefined) {
				index = 0;
			}
			if (!_GLTool2.default.shader) {
				return;
			}

			gl.activeTexture(gl.TEXTURE0 + index);
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.uniform1i(_GLTool2.default.shader.uniformTextures[index], index);
			this._bindIndex = index;
		}
	}]);

	return GLTexture;
}();

exports.default = GLTexture;