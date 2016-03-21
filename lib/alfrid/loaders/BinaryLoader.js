'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// BinaryLoader.js

var BinaryLoader = function () {
	function BinaryLoader() {
		var _this = this;

		var isArrayBuffer = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

		_classCallCheck(this, BinaryLoader);

		this._req = new XMLHttpRequest();
		this._req.addEventListener('load', function (e) {
			return _this._onLoaded(e);
		});
		this._req.addEventListener('progress', function (e) {
			return _this._onProgress(e);
		});
		if (isArrayBuffer) {
			this._req.responseType = 'arraybuffer';
		}
	}

	_createClass(BinaryLoader, [{
		key: 'load',
		value: function load(url, callback) {
			console.log('Loading : ', url);
			this._callback = callback;

			this._req.open('GET', url);
			this._req.send();
		}
	}, {
		key: '_onLoaded',
		value: function _onLoaded() {
			this._callback(this._req.response);
		}
	}, {
		key: '_onProgress',
		value: function _onProgress() /*e*/{
			// console.log('on Progress:', (e.loaded/e.total*100).toFixed(2));
		}
	}]);

	return BinaryLoader;
}();

exports.default = BinaryLoader;