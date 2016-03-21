// GLShader.js

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GLTool = require('./GLTool');

var _GLTool2 = _interopRequireDefault(_GLTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var glslify = require('glslify');

var addLineNumbers = function addLineNumbers(string) {
	var lines = string.split('\n');
	for (var i = 0; i < lines.length; i++) {
		lines[i] = i + 1 + ': ' + lines[i];
	}
	return lines.join('\n');
};

var gl = void 0;
var defaultVertexShader = glslify('./shaders/basic.vert');
var defaultFragmentShader = glslify('./shaders/basic.frag');

var uniform_mapping = {
	'float': 'uniform1f',
	'vec2': 'uniform2fv',
	'vec3': 'uniform3fv',
	'vec4': 'uniform4fv',
	'int': 'uniform1i',
	'mat3': 'uniformMatrix3fv',
	'mat4': 'uniformMatrix4fv'
};

var GLShader = function () {
	function GLShader() {
		var strVertexShader = arguments.length <= 0 || arguments[0] === undefined ? defaultVertexShader : arguments[0];
		var strFragmentShader = arguments.length <= 1 || arguments[1] === undefined ? defaultFragmentShader : arguments[1];

		_classCallCheck(this, GLShader);

		gl = _GLTool2.default.gl;
		this.parameters = [];
		this.uniformValues = {};
		this.uniformTextures = [];

		if (!strVertexShader) {
			strVertexShader = defaultVertexShader;
		}
		if (!strFragmentShader) {
			strFragmentShader = defaultVertexShader;
		}

		var vsShader = this._createShaderProgram(strVertexShader, true);
		var fsShader = this._createShaderProgram(strFragmentShader, false);
		this._attachShaderProgram(vsShader, fsShader);
	}

	_createClass(GLShader, [{
		key: 'bind',
		value: function bind() {

			gl.useProgram(this.shaderProgram);
			_GLTool2.default.useShader(this);
			this.uniformTextures = [];
		}
	}, {
		key: 'uniform',
		value: function uniform(mName, mType, mValue) {
			var uniformType = uniform_mapping[mType] || mType;
			var hasUniform = false;
			var oUniform = void 0;

			for (var i = 0; i < this.parameters.length; i++) {
				oUniform = this.parameters[i];
				if (oUniform.name === mName) {
					oUniform.value = mValue;
					hasUniform = true;
					break;
				}
			}

			if (!hasUniform) {
				this.shaderProgram[mName] = gl.getUniformLocation(this.shaderProgram, mName);
				this.parameters.push({ name: mName, type: uniformType, value: mValue, uniformLoc: this.shaderProgram[mName] });
			} else {
				this.shaderProgram[mName] = oUniform.uniformLoc;
			}

			if (uniformType.indexOf('Matrix') === -1) {
				gl[uniformType](this.shaderProgram[mName], mValue);
			} else {
				gl[uniformType](this.shaderProgram[mName], false, mValue);
				this.uniformValues[mName] = mValue;
			}
		}
	}, {
		key: '_createShaderProgram',
		value: function _createShaderProgram(mShaderStr, isVertexShader) {

			var shaderType = isVertexShader ? _GLTool2.default.VERTEX_SHADER : _GLTool2.default.FRAGMENT_SHADER;
			var shader = gl.createShader(shaderType);

			gl.shaderSource(shader, mShaderStr);
			gl.compileShader(shader);

			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				console.warn('Error in Shader : ', gl.getShaderInfoLog(shader));
				console.log(addLineNumbers(mShaderStr));
				return null;
			}

			return shader;
		}
	}, {
		key: '_attachShaderProgram',
		value: function _attachShaderProgram(mVertexShader, mFragmentShader) {

			this.shaderProgram = gl.createProgram();
			gl.attachShader(this.shaderProgram, mVertexShader);
			gl.attachShader(this.shaderProgram, mFragmentShader);
			gl.linkProgram(this.shaderProgram);
		}
	}]);

	return GLShader;
}();

exports.default = GLShader;