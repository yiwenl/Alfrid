'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Camera2 = require('./Camera');

var _Camera3 = _interopRequireDefault(_Camera2);

var _glMatrix = require('gl-matrix');

var _glMatrix2 = _interopRequireDefault(_glMatrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // CameraPerspective.js

var CameraPerspective = function (_Camera) {
	_inherits(CameraPerspective, _Camera);

	function CameraPerspective() {
		_classCallCheck(this, CameraPerspective);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(CameraPerspective).call(this));
	}

	_createClass(CameraPerspective, [{
		key: 'setPerspective',
		value: function setPerspective(mFov, mAspectRatio, mNear, mFar) {

			this._fov = mFov;
			this._near = mNear;
			this._far = mFar;
			this._aspectRatio = mAspectRatio;
			_glMatrix2.default.mat4.perspective(this._projection, mFov, mAspectRatio, mNear, mFar);
		}
	}, {
		key: 'setAspectRatio',
		value: function setAspectRatio(mAspectRatio) {
			this._aspectRatio = mAspectRatio;
			_glMatrix2.default.mat4.perspective(this.projection, this._fov, mAspectRatio, this._near, this._far);
		}
	}]);

	return CameraPerspective;
}(_Camera3.default);

exports.default = CameraPerspective;