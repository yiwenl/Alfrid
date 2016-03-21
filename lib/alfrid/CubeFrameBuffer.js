// CubeFrameBuffer.js

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GLTool = require('./GLTool');

var _GLTool2 = _interopRequireDefault(_GLTool);

var _GLCubeTexture = require('./GLCubeTexture');

var _GLCubeTexture2 = _interopRequireDefault(_GLCubeTexture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gl = void 0;

var CubeFrameBuffer = function () {
	function CubeFrameBuffer(size) {
		var mParameters = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		_classCallCheck(this, CubeFrameBuffer);

		gl = _GLTool2.default.gl;
		this._size = size;
		this.magFilter = mParameters.magFilter || gl.LINEAR;
		this.minFilter = mParameters.minFilter || gl.LINEAR;
		this.wrapS = mParameters.wrapS || gl.CLAMP_TO_EDGE;
		this.wrapT = mParameters.wrapT || gl.CLAMP_TO_EDGE;

		this._init();
	}

	_createClass(CubeFrameBuffer, [{
		key: '_init',
		value: function _init() {
			this.texture = gl.createTexture();
			this.glTexture = new _GLCubeTexture2.default(this.texture, {}, true);

			gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, this.magFilter);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, this.minFilter);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, this.wrapS);
			gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, this.wrapT);

			var targets = [gl.TEXTURE_CUBE_MAP_POSITIVE_X, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, gl.TEXTURE_CUBE_MAP_POSITIVE_Y, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z];

			for (var i = 0; i < targets.length; i++) {
				gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
				gl.texImage2D(targets[i], 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.FLOAT, null);
			}

			this._frameBuffers = [];
			for (var _i = 0; _i < targets.length; _i++) {
				var frameBuffer = gl.createFramebuffer();
				gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
				gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, targets[_i], this.texture, 0);

				var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
				if (status !== gl.FRAMEBUFFER_COMPLETE) {
					console.log('gl.checkFramebufferStatus() returned ' + status);
				}

				this._frameBuffers.push(frameBuffer);
			}

			// gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			gl.bindRenderbuffer(gl.RENDERBUFFER, null);
			gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
		}
	}, {
		key: 'bind',
		value: function bind(mTargetIndex) {

			// if(Math.random() > .99) console.log('bind :', mTargetIndex, this._frameBuffers[mTargetIndex]);
			_GLTool2.default.viewport(0, 0, this.width, this.height);
			gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffers[mTargetIndex]);
		}
	}, {
		key: 'unbind',
		value: function unbind() {
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			_GLTool2.default.viewport(0, 0, _GLTool2.default.width, _GLTool2.default.height);
		}

		//	TEXTURES

	}, {
		key: 'getTexture',
		value: function getTexture() {
			return this.glTexture;
		}

		//	GETTERS AND SETTERS

	}, {
		key: 'width',
		get: function get() {
			return this._size;
		}
	}, {
		key: 'height',
		get: function get() {
			return this._size;
		}
	}]);

	return CubeFrameBuffer;
}();

exports.default = CubeFrameBuffer;