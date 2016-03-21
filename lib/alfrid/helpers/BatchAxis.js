'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // BatchAxis.js

var glslify = require('glslify');

var BatchAxis = function (_Batch) {
	_inherits(BatchAxis, _Batch);

	function BatchAxis() {
		_classCallCheck(this, BatchAxis);

		var positions = [];
		var colors = [];
		var indices = [0, 1, 2, 3, 4, 5];
		var r = 9999;

		positions.push([-r, 0, 0]);
		positions.push([r, 0, 0]);
		positions.push([0, -r, 0]);
		positions.push([0, r, 0]);
		positions.push([0, 0, -r]);
		positions.push([0, 0, r]);

		colors.push([1, 0, 0]);
		colors.push([1, 0, 0]);
		colors.push([0, 1, 0]);
		colors.push([0, 1, 0]);
		colors.push([0, 0, 1]);
		colors.push([0, 0, 1]);

		var mesh = new _Mesh2.default(_GLTool2.default.LINES);
		mesh.bufferVertex(positions);
		mesh.bufferIndices(indices);
		mesh.bufferData(colors, 'aColor', 3);

		var shader = new _GLShader2.default(glslify('../shaders/axis.vert'), glslify('../shaders/axis.frag'));

		return _possibleConstructorReturn(this, Object.getPrototypeOf(BatchAxis).call(this, mesh, shader));
	}

	return BatchAxis;
}(_Batch3.default);

exports.default = BatchAxis;