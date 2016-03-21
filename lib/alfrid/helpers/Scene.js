'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Scene.js

var _GLTool = require('../GLTool');

var _GLTool2 = _interopRequireDefault(_GLTool);

var _Scheduler = require('../tools/Scheduler');

var _Scheduler2 = _interopRequireDefault(_Scheduler);

var _CameraPerspective = require('../cameras/CameraPerspective');

var _CameraPerspective2 = _interopRequireDefault(_CameraPerspective);

var _CameraOrtho = require('../cameras/CameraOrtho');

var _CameraOrtho2 = _interopRequireDefault(_CameraOrtho);

var _OrbitalControl = require('../tools/OrbitalControl');

var _OrbitalControl2 = _interopRequireDefault(_OrbitalControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene = function () {
	function Scene() {
		var _this = this;

		_classCallCheck(this, Scene);

		this._init();
		this._initTextures();
		this._initViews();

		this._efIndex = _Scheduler2.default.addEF(function () {
			return _this._loop();
		});
		window.addEventListener('resize', function () {
			return _this.resize();
		});
	}

	//	PUBLIC METHODS

	_createClass(Scene, [{
		key: 'render',
		value: function render() {}
	}, {
		key: 'stop',
		value: function stop() {
			if (this._efIndex === -1) {
				return;
			}
			this._efIndex = _Scheduler2.default.removeEF(this._efIndex);
		}
	}, {
		key: 'start',
		value: function start() {
			var _this2 = this;

			if (this._efIndex !== -1) {
				return;
			}

			this._efIndex = _Scheduler2.default.addEF(function () {
				return _this2._loop();
			});
		}
	}, {
		key: 'resize',
		value: function resize() {
			_GLTool2.default.setSize(window.innerWidth, window.innerHeight);
			this.camera.setAspectRatio(_GLTool2.default.aspectRatio);
		}

		//	PROTECTED METHODS TO BE OVERRIDEN BY CHILDREN

	}, {
		key: '_initTextures',
		value: function _initTextures() {}
	}, {
		key: '_initViews',
		value: function _initViews() {}

		//	PRIVATE METHODS

	}, {
		key: '_init',
		value: function _init() {
			this.camera = new _CameraPerspective2.default();
			this.camera.setPerspective(45 * Math.PI / 180, _GLTool2.default.aspectRatio, 0.1, 100);
			this.orbitalControl = new _OrbitalControl2.default(this.camera, window, 15);
			this.orbitalControl.radius.value = 10;

			this.cameraOrtho = new _CameraOrtho2.default();
		}
	}, {
		key: '_loop',
		value: function _loop() {

			//	RESET VIEWPORT
			_GLTool2.default.viewport(0, 0, _GLTool2.default.width, _GLTool2.default.height);

			//	RESET CAMERA
			_GLTool2.default.setMatrices(this.camera);

			this.render();
		}
	}]);

	return Scene;
}();

exports.default = Scene;