// FrameBuffer.js

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GLTool = require('./GLTool');

var _GLTool2 = _interopRequireDefault(_GLTool);

var _GLTexture = require('./GLTexture');

var _GLTexture2 = _interopRequireDefault(_GLTexture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isPowerOfTwo = function isPowerOfTwo(x) {
	return x !== 0 && !(x & x - 1);
};

var gl = void 0;
var WEBGL_depth_texture = void 0;

var FrameBuffer = function () {
	function FrameBuffer(mWidth, mHeight) {
		var mParameters = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

		_classCallCheck(this, FrameBuffer);

		gl = _GLTool2.default.gl;
		WEBGL_depth_texture = _GLTool2.default.checkExtension('WEBGL_depth_texture');

		this.width = mWidth;
		this.height = mHeight;

		this.magFilter = mParameters.magFilter || gl.LINEAR;
		this.minFilter = mParameters.minFilter || gl.LINEAR;
		this.wrapS = mParameters.wrapS || gl.CLAMP_TO_EDGE;
		this.wrapT = mParameters.wrapT || gl.CLAMP_TO_EDGE;
		this.useDepth = mParameters.useDepth || true;
		this.useStencil = mParameters.useStencil || false;

		if (!isPowerOfTwo(this.width) || !isPowerOfTwo(this.height)) {
			this.wrapS = this.wrapT = gl.CLAMP_TO_EDGE;

			if (this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
				this.minFilter = gl.LINEAR;
			}
		}

		this._init();
	}

	_createClass(FrameBuffer, [{
		key: '_init',
		value: function _init() {
			this.texture = gl.createTexture();
			this.glTexture = new _GLTexture2.default(this.texture, true);

			this.depthTexture = gl.createTexture();
			this.glDepthTexture = new _GLTexture2.default(this.depthTexture, true);

			this.frameBuffer = gl.createFramebuffer();
			gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);

			//	SETUP TEXTURE MIPMAP, WRAP

			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, _GLTool2.default.isMobile ? gl.UNSIGNED_BYTE : gl.FLOAT, null);

			if (WEBGL_depth_texture) {
				gl.bindTexture(gl.TEXTURE_2D, this.depthTexture);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.width, this.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
			}

			//	GET COLOUR

			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);

			//	GET DEPTH

			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture, 0);

			if (this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
				gl.bindTexture(gl.TEXTURE_2D, this.texture);
				gl.generateMipmap(gl.TEXTURE_2D);
			}

			//	UNBIND

			gl.bindTexture(gl.TEXTURE_2D, null);
			gl.bindRenderbuffer(gl.RENDERBUFFER, null);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);

			//	CLEAR FRAMEBUFFER

			this.clear();
		}

		//	PUBLIC METHODS

	}, {
		key: 'bind',
		value: function bind() {
			_GLTool2.default.viewport(0, 0, this.width, this.height);
			gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
		}
	}, {
		key: 'unbind',
		value: function unbind() {
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			_GLTool2.default.viewport(0, 0, _GLTool2.default.width, _GLTool2.default.height);
		}
	}, {
		key: 'clear',
		value: function clear() {
			var r = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
			var g = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
			var b = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
			var a = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

			this.bind();
			_GLTool2.default.clear(r, g, b, a);
			this.unbind();
		}

		//	TEXTURES

	}, {
		key: 'getTexture',
		value: function getTexture() {
			return this.glTexture;
		}
	}, {
		key: 'getDepthTexture',
		value: function getDepthTexture() {
			return this.glDepthTexture;
		}

		//	MIPMAP FILTER

	}, {
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
	}]);

	return FrameBuffer;
}();

exports.default = FrameBuffer;