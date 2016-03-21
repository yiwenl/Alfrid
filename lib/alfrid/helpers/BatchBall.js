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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // BatchBall.js

var glslify = require('glslify');

var BatchBall = function (_Batch) {
	_inherits(BatchBall, _Batch);

	function BatchBall() {
		_classCallCheck(this, BatchBall);

		var mesh = _Geom2.default.sphere(1, 24);
		var shader = new _GLShader2.default(glslify('../shaders/general.vert'), glslify('../shaders/simpleColor.frag'));
		return _possibleConstructorReturn(this, Object.getPrototypeOf(BatchBall).call(this, mesh, shader));
	}

	_createClass(BatchBall, [{
		key: 'draw',
		value: function draw() {
			var position = arguments.length <= 0 || arguments[0] === undefined ? [0, 0, 0] : arguments[0];
			var scale = arguments.length <= 1 || arguments[1] === undefined ? [1, 1, 1] : arguments[1];
			var color = arguments.length <= 2 || arguments[2] === undefined ? [1, 1, 1] : arguments[2];
			var opacity = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

			this.shader.bind();
			this.shader.uniform('position', 'uniform3fv', position);
			this.shader.uniform('scale', 'uniform3fv', scale);
			this.shader.uniform('color', 'uniform3fv', color);
			this.shader.uniform('opacity', 'uniform1f', opacity);
			_get(Object.getPrototypeOf(BatchBall.prototype), 'draw', this).call(this);
		}
	}]);

	return BatchBall;
}(_Batch3.default);

exports.default = BatchBall;