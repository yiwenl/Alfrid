// HDRLoader.js

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BinaryLoader2 = require('./BinaryLoader');

var _BinaryLoader3 = _interopRequireDefault(_BinaryLoader2);

var _HDRParser = require('../tools/HDRParser');

var _HDRParser2 = _interopRequireDefault(_HDRParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HDRLoader = function (_BinaryLoader) {
	_inherits(HDRLoader, _BinaryLoader);

	function HDRLoader() {
		_classCallCheck(this, HDRLoader);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(HDRLoader).call(this, true));
	}

	_createClass(HDRLoader, [{
		key: 'parse',
		value: function parse(mArrayBuffer) {
			return (0, _HDRParser2.default)(mArrayBuffer);
		}
	}, {
		key: '_onLoaded',
		value: function _onLoaded() {
			var o = this.parse(this._req.response);
			if (this._callback) {
				this._callback(o);
			}
		}
	}]);

	return HDRLoader;
}(_BinaryLoader3.default);

HDRLoader.parse = function (mArrayBuffer) {
	return (0, _HDRParser2.default)(mArrayBuffer);
};

exports.default = HDRLoader;