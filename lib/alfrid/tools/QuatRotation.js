// QuatRotation.js

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glMatrix = require('gl-matrix');

var _glMatrix2 = _interopRequireDefault(_glMatrix);

var _EaseNumber = require('./EaseNumber');

var _EaseNumber2 = _interopRequireDefault(_EaseNumber);

var _Scheduler = require('./Scheduler');

var _Scheduler2 = _interopRequireDefault(_Scheduler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getMouse = function getMouse(mEvent, mTarget) {

	var o = mTarget || {};
	if (mEvent.touches) {
		o.x = mEvent.touches[0].pageX;
		o.y = mEvent.touches[0].pageY;
	} else {
		o.x = mEvent.clientX;
		o.y = mEvent.clientY;
	}

	return o;
};

var QuatRotation = function () {
	function QuatRotation(mTarget) {
		var _this = this;

		var mListenerTarget = arguments.length <= 1 || arguments[1] === undefined ? window : arguments[1];
		var mEasing = arguments.length <= 2 || arguments[2] === undefined ? 0.1 : arguments[2];

		_classCallCheck(this, QuatRotation);

		this._target = mTarget;
		this._listenerTarget = mListenerTarget;

		this.matrix = _glMatrix2.default.mat4.create();
		this.m = _glMatrix2.default.mat4.create();
		this._vZaxis = _glMatrix2.default.vec3.clone([0, 0, 0]);
		this._zAxis = _glMatrix2.default.vec3.clone([0, 0, 1]);
		this.preMouse = { x: 0, y: 0 };
		this.mouse = { x: 0, y: 0 };
		this._isMouseDown = false;
		this._rotation = _glMatrix2.default.quat.create();
		this.tempRotation = _glMatrix2.default.quat.create();
		this._rotateZMargin = 0;
		this._offset = 0.004;
		this._slerp = -1;
		this._isLocked = false;

		this._diffX = new _EaseNumber2.default(0, mEasing);
		this._diffY = new _EaseNumber2.default(0, mEasing);

		this._listenerTarget.addEventListener('mousedown', function (e) {
			return _this._onDown(e);
		});
		this._listenerTarget.addEventListener('touchstart', function (e) {
			return _this._onDown(e);
		});
		this._listenerTarget.addEventListener('mousemove', function (e) {
			return _this._onMove(e);
		});
		this._listenerTarget.addEventListener('touchmove', function (e) {
			return _this._onMove(e);
		});
		window.addEventListener('touchend', function () {
			return _this._onUp();
		});
		window.addEventListener('mouseup', function () {
			return _this._onUp();
		});

		_Scheduler2.default.addEF(function () {
			return _this._loop();
		});
	}

	// 	PUBLIC METHODS

	_createClass(QuatRotation, [{
		key: 'inverseControl',
		value: function inverseControl() {
			var isInvert = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			this._isInvert = isInvert;
		}
	}, {
		key: 'lock',
		value: function lock() {
			var mValue = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			this._isLocked = mValue;
		}
	}, {
		key: 'setCameraPos',
		value: function setCameraPos(mQuat) {
			var speed = arguments.length <= 1 || arguments[1] === undefined ? 0.1 : arguments[1];

			this.easing = speed;
			if (this._slerp > 0) {
				return;
			}

			var tempRotation = _glMatrix2.default.quat.clone(this._rotation);
			this._updateRotation(tempRotation);
			this._rotation = _glMatrix2.default.quat.clone(tempRotation);
			this._currDiffX = this.diffX = 0;
			this._currDiffY = this.diffY = 0;

			this._isMouseDown = false;
			this._isRotateZ = 0;

			this._targetQuat = _glMatrix2.default.quat.clone(mQuat);
			this._slerp = 1;
		}
	}, {
		key: 'resetQuat',
		value: function resetQuat() {
			this._rotation = _glMatrix2.default.quat.clone([0, 0, 1, 0]);
			this.tempRotation = _glMatrix2.default.quat.clone([0, 0, 0, 0]);
			this._targetQuat = undefined;
			this._slerp = -1;
		}

		//	EVENT HANDLER

	}, {
		key: '_onDown',
		value: function _onDown(mEvent) {
			if (this._isLocked) {
				return;
			}

			var mouse = getMouse(mEvent);
			var tempRotation = _glMatrix2.default.quat.clone(this._rotation);
			this._updateRotation(tempRotation);
			this._rotation = tempRotation;

			this._isMouseDown = true;
			this._isRotateZ = 0;
			this.preMouse = { x: mouse.x, y: mouse.y };

			if (mouse.y < this._rotateZMargin || mouse.y > window.innerHeight - this._rotateZMargin) {
				this._isRotateZ = 1;
			} else if (mouse.x < this._rotateZMargin || mouse.x > window.innerWidth - this._rotateZMargin) {
				this._isRotateZ = 2;
			}

			this._diffX.setTo(0);
			this._diffY.setTo(0);
		}
	}, {
		key: '_onMove',
		value: function _onMove(mEvent) {
			if (this._isLocked) {
				return;
			}
			getMouse(mEvent, this.mouse);
		}
	}, {
		key: '_onUp',
		value: function _onUp() {
			if (this._isLocked) {
				return;
			}
			this._isMouseDown = false;
		}

		//	PRIVATE METHODS

	}, {
		key: '_updateRotation',
		value: function _updateRotation(mTempRotation) {
			if (this._isMouseDown && !this._isLocked) {
				this._diffX.value = -(this.mouse.x - this.preMouse.x);
				this._diffY.value = this.mouse.y - this.preMouse.y;

				if (this._isInvert) {
					this._diffX.value = -this._diffX.targetValue;
					this._diffY.value = -this._diffY.targetValue;
				}
			}

			var angle = void 0,
			    _quat = void 0;

			if (this._isRotateZ > 0) {
				if (this._isRotateZ === 1) {
					angle = -this._diffX.value * this._offset;
					angle *= this.preMouse.y < this._rotateZMargin ? -1 : 1;
					_quat = _glMatrix2.default.quat.clone([0, 0, Math.sin(angle), Math.cos(angle)]);
					_glMatrix2.default.quat.multiply(_quat, mTempRotation, _quat);
				} else {
					angle = -this._diffY.value * this._offset;
					angle *= this.preMouse.x < this._rotateZMargin ? 1 : -1;
					_quat = _glMatrix2.default.quat.clone([0, 0, Math.sin(angle), Math.cos(angle)]);
					_glMatrix2.default.quat.multiply(_quat, mTempRotation, _quat);
				}
			} else {
				var v = _glMatrix2.default.vec3.clone([this._diffX.value, this._diffY.value, 0]);
				var axis = _glMatrix2.default.vec3.create();
				_glMatrix2.default.vec3.cross(axis, v, this._zAxis);
				_glMatrix2.default.vec3.normalize(axis, axis);
				angle = _glMatrix2.default.vec3.length(v) * this._offset;
				_quat = _glMatrix2.default.quat.clone([Math.sin(angle) * axis[0], Math.sin(angle) * axis[1], Math.sin(angle) * axis[2], Math.cos(angle)]);
				_glMatrix2.default.quat.multiply(mTempRotation, _quat, mTempRotation);
			}
		}
	}, {
		key: '_loop',
		value: function _loop() {
			_glMatrix2.default.mat4.identity(this.m);

			if (this._targetQuat === undefined) {
				_glMatrix2.default.quat.set(this.tempRotation, this._rotation[0], this._rotation[1], this._rotation[2], this._rotation[3]);
				this._updateRotation(this.tempRotation);
			} else {
				this._slerp += (0 - this._slerp) * 0.1;

				if (this._slerp < 0.001) {
					_glMatrix2.default.quat.set(this._rotation, this._targetQuat[0], this._targetQuat[1], this._targetQuat[2], this._targetQuat[3]);
					this._targetQuat = undefined;
					this._slerp = -1;
				} else {
					_glMatrix2.default.quat.set(this.tempRotation, 0, 0, 0, 0);
					_glMatrix2.default.quat.slerp(this.tempRotation, this._targetQuat, this._rotation, this._slerp);
				}
			}

			_glMatrix2.default.vec3.transformQuat(this._vZaxis, this._vZaxis, this.tempRotation);

			_glMatrix2.default.mat4.fromQuat(this.matrix, this.tempRotation);
		}

		//	GETTER AND SETTER

	}, {
		key: 'easing',
		set: function set(mValue) {
			this._diffX.easing = mValue;
			this._diffY.easing = mValue;
		},
		get: function get() {
			return this._diffX.easing;
		}
	}]);

	return QuatRotation;
}();

exports.default = QuatRotation;