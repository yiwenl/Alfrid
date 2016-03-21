// Scheduler.js

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (window.requestAnimFrame === undefined) {
	window.requestAnimFrame = function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	}();
}

var FRAMERATE = 60;

var Scheduler = function () {
	function Scheduler() {
		_classCallCheck(this, Scheduler);

		this._delayTasks = [];
		this._nextTasks = [];
		this._deferTasks = [];
		this._highTasks = [];
		this._usurpTask = [];
		this._enterframeTasks = [];
		this._idTable = 0;

		this._loop();
	}

	//	PUBLIC METHODS

	_createClass(Scheduler, [{
		key: 'addEF',
		value: function addEF(func, params) {
			params = params || [];
			var id = this._idTable;
			this._enterframeTasks[id] = { func: func, params: params };
			this._idTable++;
			return id;
		}
	}, {
		key: 'removeEF',
		value: function removeEF(id) {
			if (this._enterframeTasks[id] !== undefined) {
				this._enterframeTasks[id] = null;
			}
			return -1;
		}
	}, {
		key: 'delay',
		value: function delay(func, params, _delay) {
			var time = new Date().getTime();
			var t = { func: func, params: params, delay: _delay, time: time };
			this._delayTasks.push(t);
		}
	}, {
		key: 'defer',
		value: function defer(func, params) {
			var t = { func: func, params: params };
			this._deferTasks.push(t);
		}
	}, {
		key: 'next',
		value: function next(func, params) {
			var t = { func: func, params: params };
			this._nextTasks.push(t);
		}
	}, {
		key: 'usurp',
		value: function usurp(func, params) {
			var t = { func: func, params: params };
			this._usurpTask.push(t);
		}

		//	PRIVATE METHODS

	}, {
		key: '_process',
		value: function _process() {
			var i = 0,
			    task = void 0,
			    interval = void 0,
			    current = void 0;
			for (i = 0; i < this._enterframeTasks.length; i++) {
				task = this._enterframeTasks[i];
				if (task !== null && task !== undefined) {
					// task.func.apply(task.scope, task.params);
					// console.log(task.func());
					task.func(task.params);
				}
			}

			while (this._highTasks.length > 0) {
				task = this._highTasks.pop();
				task.func(task.params);
				// task.func.apply(task.scope, task.params);
			}

			var startTime = new Date().getTime();

			for (i = 0; i < this._delayTasks.length; i++) {
				task = this._delayTasks[i];
				if (startTime - task.time > task.delay) {
					// task.func.apply(task.scope, task.params);
					task.func(task.params);
					this._delayTasks.splice(i, 1);
				}
			}

			startTime = new Date().getTime();
			interval = 1000 / FRAMERATE;
			while (this._deferTasks.length > 0) {
				task = this._deferTasks.shift();
				current = new Date().getTime();
				if (current - startTime < interval) {
					// task.func.apply(task.scope, task.params);
					task.func(task.params);
				} else {
					this._deferTasks.unshift(task);
					break;
				}
			}

			startTime = new Date().getTime();
			interval = 1000 / FRAMERATE;
			while (this._usurpTask.length > 0) {
				task = this._usurpTask.shift();
				current = new Date().getTime();
				if (current - startTime < interval) {
					// task.func.apply(task.scope, task.params);
					task.func(task.params);
				} else {
					// this._usurpTask.unshift(task);
					break;
				}
			}

			this._highTasks = this._highTasks.concat(this._nextTasks);
			this._nextTasks = [];
			this._usurpTask = [];
		}
	}, {
		key: '_loop',
		value: function _loop() {
			var _this = this;

			this._process();
			window.requestAnimFrame(function () {
				return _this._loop();
			});
		}
	}]);

	return Scheduler;
}();

var scheduler = new Scheduler();

exports.default = scheduler;