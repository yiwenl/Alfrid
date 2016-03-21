// EffectComposer.js

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GLTool = require('../GLTool');

var _GLTool2 = _interopRequireDefault(_GLTool);

var _FrameBuffer = require('../FrameBuffer');

var _FrameBuffer2 = _interopRequireDefault(_FrameBuffer);

var _Geom = require('../Geom');

var _Geom2 = _interopRequireDefault(_Geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EffectComposer = function () {
	function EffectComposer(mWidth, mHeight) {
		var mParameters = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

		_classCallCheck(this, EffectComposer);

		this._fbo = new _FrameBuffer2.default(mWidth, mHeight, mParameters);
		this._fboTarget = new _FrameBuffer2.default(mWidth, mHeight, mParameters);

		this._mesh = _Geom2.default.bigTriangle();

		this._passes = [];
	}

	_createClass(EffectComposer, [{
		key: 'addPass',
		value: function addPass(pass) {
			this._passes.push(pass);
		}
	}, {
		key: 'render',
		value: function render(mSource) {

			for (var i = 0; i < this._passes.length; i++) {

				this._swap();
			}
		}
	}, {
		key: '_swap',
		value: function _swap() {
			var tmp = this._fbo;
			this._fbo = this._fboTarget;
			this._fboTarget = tmp;
		}
	}]);

	return EffectComposer;
}();

exports.default = EffectComposer;