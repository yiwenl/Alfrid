'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Batch.js

var _GLTool = require('./GLTool');

var _GLTool2 = _interopRequireDefault(_GLTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Batch = function () {
	function Batch(mMesh, mShader) {
		_classCallCheck(this, Batch);

		this._mesh = mMesh;
		this._shader = mShader;
	}

	//	PUBLIC METHODS

	_createClass(Batch, [{
		key: 'draw',
		value: function draw() {
			this._shader.bind();
			_GLTool2.default.draw(this.mesh);
		}

		//	GETTER AND SETTER

	}, {
		key: 'mesh',
		get: function get() {
			return this._mesh;
		}
	}, {
		key: 'shader',
		get: function get() {
			return this._shader;
		}
	}]);

	return Batch;
}();

exports.default = Batch;