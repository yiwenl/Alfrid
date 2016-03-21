// OrbitalControl.js
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EaseNumber = require('./EaseNumber');

var _EaseNumber2 = _interopRequireDefault(_EaseNumber);

var _Scheduler = require('./Scheduler');

var _Scheduler2 = _interopRequireDefault(_Scheduler);

var _glMatrix = require('gl-matrix');

var _glMatrix2 = _interopRequireDefault(_glMatrix);

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

var OrbitalControl = function () {
	function OrbitalControl(mTarget) {
		var _this = this;

		var mListenerTarget = arguments.length <= 1 || arguments[1] === undefined ? window : arguments[1];
		var mRadius = arguments.length <= 2 || arguments[2] === undefined ? 500 : arguments[2];

		_classCallCheck(this, OrbitalControl);

		this._target = mTarget;
		this._listenerTarget = mListenerTarget;
		this._mouse = {};
		this._preMouse = {};
		this.center = _glMatrix2.default.vec3.create();
		this._up = _glMatrix2.default.vec3.fromValues(0, 1, 0);
		this.radius = new _EaseNumber2.default(mRadius);
		this.position = _glMatrix2.default.vec3.fromValues(0, 0, this.radius.value);
		this.positionOffset = _glMatrix2.default.vec3.create();
		this._rx = new _EaseNumber2.default(0);
		this._rx.limit(-Math.PI / 2, Math.PI / 2);
		this._ry = new _EaseNumber2.default(0);
		this._preRX = 0;
		this._preRY = 0;

		this._isLockZoom = false;
		this._isLockRotation = false;
		this._isInvert = false;

		this._listenerTarget.addEventListener('mousewheel', function (e) {
			return _this._onWheel(e);
		});
		this._listenerTarget.addEventListener('DOMMouseScroll', function (e) {
			return _this._onWheel(e);
		});

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

	//	PUBLIC METHODS

	_createClass(OrbitalControl, [{
		key: 'lock',
		value: function lock() {
			var mValue = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			this._isLockZoom = mValue;
			this._isLockRotation = mValue;
		}
	}, {
		key: 'lockZoom',
		value: function lockZoom() {
			var mValue = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			this._isLockZoom = mValue;
		}
	}, {
		key: 'lockRotation',
		value: function lockRotation() {
			var mValue = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			this._isLockRotation = mValue;
		}
	}, {
		key: 'inverseControl',
		value: function inverseControl() {
			var isInvert = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			this._isInvert = isInvert;
		}

		//	EVENT HANDLERES

	}, {
		key: '_onDown',
		value: function _onDown(mEvent) {
			if (this._isLockRotation) {
				return;
			}
			this._isMouseDown = true;
			getMouse(mEvent, this._mouse);
			getMouse(mEvent, this._preMouse);
			this._preRX = this._rx.targetValue;
			this._preRY = this._ry.targetValue;
		}
	}, {
		key: '_onMove',
		value: function _onMove(mEvent) {
			if (this._isLockRotation) {
				return;
			}
			getMouse(mEvent, this._mouse);
			if (mEvent.touches) {
				mEvent.preventDefault();
			}

			if (this._isMouseDown) {
				var diffX = -(this._mouse.x - this._preMouse.x);
				if (this._isInvert) {
					diffX *= -1;
				}
				this._ry.value = this._preRY - diffX * 0.01;

				var diffY = -(this._mouse.y - this._preMouse.y);
				if (this._isInvert) {
					diffY *= -1;
				}
				this._rx.value = this._preRX - diffY * 0.01;
			}
		}
	}, {
		key: '_onUp',
		value: function _onUp() {
			if (this._isLockRotation) {
				return;
			}
			this._isMouseDown = false;
		}
	}, {
		key: '_onWheel',
		value: function _onWheel(mEvent) {
			if (this._isLockZoom) {
				return;
			}
			var w = mEvent.wheelDelta;
			var d = mEvent.detail;
			var value = 0;
			if (d) {
				if (w) {
					value = w / d / 40 * d > 0 ? 1 : -1; // Opera
				} else {
						value = -d / 3; // Firefox;         TODO: do not /3 for OS X
					}
			} else {
					value = w / 120;
				}

			this.radius.add(-value * 2);
		}

		//	PRIVATE METHODS

	}, {
		key: '_loop',
		value: function _loop() {

			this._updatePosition();

			if (this._target) {
				this._updateCamera();
			}
		}
	}, {
		key: '_updatePosition',
		value: function _updatePosition() {
			this.position[1] = Math.sin(this._rx.value) * this.radius.value;
			var tr = Math.cos(this._rx.value) * this.radius.value;
			this.position[0] = Math.cos(this._ry.value + Math.PI * 0.5) * tr;
			this.position[2] = Math.sin(this._ry.value + Math.PI * 0.5) * tr;
			_glMatrix2.default.vec3.add(this.position, this.position, this.positionOffset);
		}
	}, {
		key: '_updateCamera',
		value: function _updateCamera() {
			this._target.lookAt(this.position, this.center, this._up);
		}

		//	GETTER / SETTER

	}, {
		key: 'rx',
		get: function get() {
			return this._rx;
		}
	}, {
		key: 'ry',
		get: function get() {
			return this._ry;
		}
	}]);

	return OrbitalControl;
}();

exports.default = OrbitalControl;