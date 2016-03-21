'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Geom = require('../Geom');

var _Geom2 = _interopRequireDefault(_Geom);

var _GLShader = require('../GLShader');

var _GLShader2 = _interopRequireDefault(_GLShader);

var _Batch2 = require('../Batch');

var _Batch3 = _interopRequireDefault(_Batch2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // BatchCopy.js

var glslify = require('glslify');

var BatchCopy = function (_Batch) {
	_inherits(BatchCopy, _Batch);

	function BatchCopy() {
		_classCallCheck(this, BatchCopy);

		var mesh = _Geom2.default.bigTriangle();
		var shader = new _GLShader2.default(glslify('../shaders/bigTriangle.vert'), glslify('../shaders/copy.frag'));

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BatchCopy).call(this, mesh, shader));

		shader.bind();
		shader.uniform('texture', 'uniform1i', 0);
		return _this;
	}

	_createClass(BatchCopy, [{
		key: 'draw',
		value: function draw(texture) {
			this.shader.bind();
			texture.bind(0);
			_get(Object.getPrototypeOf(BatchCopy.prototype), 'draw', this).call(this);
		}
	}]);

	return BatchCopy;
}(_Batch3.default);

exports.default = BatchCopy;