'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Camera.js

var _glMatrix = require('gl-matrix');

var _glMatrix2 = _interopRequireDefault(_glMatrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
	function Camera() {
		_classCallCheck(this, Camera);

		//	VIEW MATRIX
		this._matrix = _glMatrix2.default.mat4.create();

		//	PROJECTION MATRIX
		this._projection = _glMatrix2.default.mat4.create();

		//	POSITION OF CAMERA
		this.position = _glMatrix2.default.vec3.create();
	}

	_createClass(Camera, [{
		key: 'lookAt',
		value: function lookAt(aEye, aCenter, aUp) {
			_glMatrix2.default.vec3.copy(this.position, aEye);
			_glMatrix2.default.mat4.identity(this._matrix);
			_glMatrix2.default.mat4.lookAt(this._matrix, aEye, aCenter, aUp);
		}

		//	GETTERS

	}, {
		key: 'matrix',
		get: function get() {
			return this._matrix;
		}
	}, {
		key: 'viewMatrix',
		get: function get() {
			return this._matrix;
		}
	}, {
		key: 'projection',
		get: function get() {
			return this._projection;
		}
	}, {
		key: 'projectionMatrix',
		get: function get() {
			return this._projection;
		}
	}]);

	return Camera;
}();

exports.default = Camera;