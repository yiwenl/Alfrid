'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GLTool = require('../GLTool');

var _GLTool2 = _interopRequireDefault(_GLTool);

var _Mesh = require('../Mesh');

var _Mesh2 = _interopRequireDefault(_Mesh);

var _GLShader = require('../GLShader');

var _GLShader2 = _interopRequireDefault(_GLShader);

var _Batch2 = require('../Batch');

var _Batch3 = _interopRequireDefault(_Batch2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // BatchDotsPlane.js

var glslify = require('glslify');

var BatchDotsPlane = function (_Batch) {
	_inherits(BatchDotsPlane, _Batch);

	function BatchDotsPlane() {
		_classCallCheck(this, BatchDotsPlane);

		var positions = [];
		var indices = [];
		var index = 0;

		var numDots = 100;
		var size = 50;
		var gap = size / numDots;
		var i = void 0,
		    j = void 0;

		for (i = -size / 2; i < size; i += gap) {
			for (j = -size / 2; j < size; j += gap) {
				positions.push([i, j, 0]);
				indices.push(index);
				index++;

				positions.push([i, 0, j]);
				indices.push(index);
				index++;
			}
		}

		var mesh = new _Mesh2.default(_GLTool2.default.POINTS);
		mesh.bufferVertex(positions);
		mesh.bufferIndices(indices);

		var shader = new _GLShader2.default(glslify('../shaders/dotsPlane.vert'), glslify('../shaders/simpleColor.frag'));

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BatchDotsPlane).call(this, mesh, shader));

		_this.color = [1, 1, 1];
		_this.opacity = 0.5;
		return _this;
	}

	_createClass(BatchDotsPlane, [{
		key: 'draw',
		value: function draw() {
			this.shader.bind();
			this.shader.uniform('color', 'uniform3fv', this.color);
			this.shader.uniform('opacity', 'uniform1f', this.opacity);
			// GL.draw(this.mesh);
			_get(Object.getPrototypeOf(BatchDotsPlane.prototype), 'draw', this).call(this);
		}
	}]);

	return BatchDotsPlane;
}(_Batch3.default);

exports.default = BatchDotsPlane;