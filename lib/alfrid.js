'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // alfrid.js

//	TOOLS


//	CAMERAS


//	LOADERS


//	HELPERS


//	POST


var _glMatrix = require('gl-matrix');

var _glMatrix2 = _interopRequireDefault(_glMatrix);

var _GLTool = require('./alfrid/GLTool');

var _GLTool2 = _interopRequireDefault(_GLTool);

var _GLShader = require('./alfrid/GLShader');

var _GLShader2 = _interopRequireDefault(_GLShader);

var _GLTexture = require('./alfrid/GLTexture');

var _GLTexture2 = _interopRequireDefault(_GLTexture);

var _GLCubeTexture = require('./alfrid/GLCubeTexture');

var _GLCubeTexture2 = _interopRequireDefault(_GLCubeTexture);

var _Mesh = require('./alfrid/Mesh');

var _Mesh2 = _interopRequireDefault(_Mesh);

var _Geom = require('./alfrid/Geom');

var _Geom2 = _interopRequireDefault(_Geom);

var _Batch = require('./alfrid/Batch');

var _Batch2 = _interopRequireDefault(_Batch);

var _FrameBuffer = require('./alfrid/FrameBuffer');

var _FrameBuffer2 = _interopRequireDefault(_FrameBuffer);

var _CubeFrameBuffer = require('./alfrid/CubeFrameBuffer');

var _CubeFrameBuffer2 = _interopRequireDefault(_CubeFrameBuffer);

var _Scheduler = require('./alfrid/tools/Scheduler');

var _Scheduler2 = _interopRequireDefault(_Scheduler);

var _EventDispatcher = require('./alfrid/tools/EventDispatcher');

var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

var _EaseNumber = require('./alfrid/tools/EaseNumber');

var _EaseNumber2 = _interopRequireDefault(_EaseNumber);

var _OrbitalControl = require('./alfrid/tools/OrbitalControl');

var _OrbitalControl2 = _interopRequireDefault(_OrbitalControl);

var _QuatRotation = require('./alfrid/tools/QuatRotation');

var _QuatRotation2 = _interopRequireDefault(_QuatRotation);

var _Camera = require('./alfrid/cameras/Camera');

var _Camera2 = _interopRequireDefault(_Camera);

var _CameraOrtho = require('./alfrid/cameras/CameraOrtho');

var _CameraOrtho2 = _interopRequireDefault(_CameraOrtho);

var _CameraPerspective = require('./alfrid/cameras/CameraPerspective');

var _CameraPerspective2 = _interopRequireDefault(_CameraPerspective);

var _CameraCube = require('./alfrid/cameras/CameraCube');

var _CameraCube2 = _interopRequireDefault(_CameraCube);

var _BinaryLoader = require('./alfrid/loaders/BinaryLoader');

var _BinaryLoader2 = _interopRequireDefault(_BinaryLoader);

var _ObjLoader = require('./alfrid/loaders/ObjLoader');

var _ObjLoader2 = _interopRequireDefault(_ObjLoader);

var _HDRLoader = require('./alfrid/loaders/HDRLoader');

var _HDRLoader2 = _interopRequireDefault(_HDRLoader);

var _BatchCopy = require('./alfrid/helpers/BatchCopy');

var _BatchCopy2 = _interopRequireDefault(_BatchCopy);

var _BatchAxis = require('./alfrid/helpers/BatchAxis');

var _BatchAxis2 = _interopRequireDefault(_BatchAxis);

var _BatchBall = require('./alfrid/helpers/BatchBall');

var _BatchBall2 = _interopRequireDefault(_BatchBall);

var _BatchDotsPlane = require('./alfrid/helpers/BatchDotsPlane');

var _BatchDotsPlane2 = _interopRequireDefault(_BatchDotsPlane);

var _Scene = require('./alfrid/helpers/Scene');

var _Scene2 = _interopRequireDefault(_Scene);

var _View = require('./alfrid/helpers/View');

var _View2 = _interopRequireDefault(_View);

var _ShaderLibs = require('./alfrid/tools/ShaderLibs');

var _ShaderLibs2 = _interopRequireDefault(_ShaderLibs);

var _EffectComposer = require('./alfrid/post/EffectComposer');

var _EffectComposer2 = _interopRequireDefault(_EffectComposer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VERSION = '0.0.1';

var alfrid = function () {
	function alfrid() {
		_classCallCheck(this, alfrid);

		this.glm = _glMatrix2.default;
		this.GL = _GLTool2.default;
		this.GLTool = _GLTool2.default;
		this.GLShader = _GLShader2.default;
		this.GLTexture = _GLTexture2.default;
		this.GLCubeTexture = _GLCubeTexture2.default;
		this.Mesh = _Mesh2.default;
		this.Geom = _Geom2.default;
		this.Batch = _Batch2.default;
		this.FrameBuffer = _FrameBuffer2.default;
		this.CubeFrameBuffer = _CubeFrameBuffer2.default;
		this.Scheduler = _Scheduler2.default;
		this.EventDispatcher = _EventDispatcher2.default;
		this.EaseNumber = _EaseNumber2.default;
		this.Camera = _Camera2.default;
		this.CameraOrtho = _CameraOrtho2.default;
		this.CameraPerspective = _CameraPerspective2.default;
		this.CameraCube = _CameraCube2.default;
		this.OrbitalControl = _OrbitalControl2.default;
		this.QuatRotation = _QuatRotation2.default;
		this.BinaryLoader = _BinaryLoader2.default;
		this.ObjLoader = _ObjLoader2.default;
		this.HDRLoader = _HDRLoader2.default;
		this.BatchCopy = _BatchCopy2.default;
		this.BatchAxis = _BatchAxis2.default;
		this.BatchBall = _BatchBall2.default;
		this.BatchBall = _BatchBall2.default;
		this.BatchDotsPlane = _BatchDotsPlane2.default;
		this.Scene = _Scene2.default;
		this.View = _View2.default;
		this.EffectComposer = _EffectComposer2.default;
		this.ShaderLibs = _ShaderLibs2.default;

		//	NOT SUPER SURE I'VE DONE THIS IS A GOOD WAY

		for (var s in _glMatrix2.default) {
			if (_glMatrix2.default[s]) {
				window[s] = _glMatrix2.default[s];
			}
		}
	}

	_createClass(alfrid, [{
		key: 'log',
		value: function log() {
			if (navigator.userAgent.indexOf('Chrome') > -1) {
				console.log('%clib alfrid : VERSION ' + VERSION, 'background: #193441; color: #FCFFF5');
			} else {
				console.log('lib alfrid : VERSION ', VERSION);
			}
			console.log('%cClasses : ', 'color: #193441');

			for (var s in this) {
				if (this[s]) {
					console.log('%c - ' + s, 'color: #3E606F');
				}
			}
		}
	}]);

	return alfrid;
}();

var b = new alfrid();

module.exports = b;