'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // View.js

var _GLShader = require('../GLShader');

var _GLShader2 = _interopRequireDefault(_GLShader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
	function View(mStrVertex, mStrFrag) {
		_classCallCheck(this, View);

		this.shader = new _GLShader2.default(mStrVertex, mStrFrag);

		this._init();
	}

	//	PROTECTED METHODS

	_createClass(View, [{
		key: '_init',
		value: function _init() {}

		// 	PUBLIC METHODS

	}, {
		key: 'render',
		value: function render() {}
	}]);

	return View;
}();

exports.default = View;