'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // EaseNumber.js

var _Scheduler = require('./Scheduler');

var _Scheduler2 = _interopRequireDefault(_Scheduler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EaseNumber = function () {
	function EaseNumber(mValue) {
		var _this = this;

		var mEasing = arguments.length <= 1 || arguments[1] === undefined ? 0.1 : arguments[1];

		_classCallCheck(this, EaseNumber);

		this.easing = mEasing;
		this._value = mValue;
		this._targetValue = mValue;
		_Scheduler2.default.addEF(function () {
			return _this._update();
		});
	}

	_createClass(EaseNumber, [{
		key: '_update',
		value: function _update() {
			this._checkLimit();
			this._value += (this._targetValue - this._value) * this.easing;
		}
	}, {
		key: 'setTo',
		value: function setTo(mValue) {
			this._targetValue = this._value = mValue;
		}
	}, {
		key: 'add',
		value: function add(mAdd) {
			this._targetValue += mAdd;
		}
	}, {
		key: 'limit',
		value: function limit(mMin, mMax) {
			if (mMin > mMax) {
				this.limit(mMax, mMin);
				return;
			}

			this._min = mMin;
			this._max = mMax;

			this._checkLimit();
		}
	}, {
		key: '_checkLimit',
		value: function _checkLimit() {
			if (this._min !== undefined && this._targetValue < this._min) {
				this._targetValue = this._min;
			}

			if (this._max !== undefined && this._targetValue > this._max) {
				this._targetValue = this._max;
			}
		}

		//	GETTERS / SETTERS

	}, {
		key: 'value',
		set: function set(mValue) {
			this._targetValue = mValue;
		},
		get: function get() {
			return this._value;
		}
	}, {
		key: 'targetValue',
		get: function get() {
			return this._targetValue;
		}
	}]);

	return EaseNumber;
}();

exports.default = EaseNumber;