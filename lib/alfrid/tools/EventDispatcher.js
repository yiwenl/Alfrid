'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// EventDispatcher.js

var supportsCustomEvents = true;
try {
	var newTestCustomEvent = document.createEvent('CustomEvent');
	newTestCustomEvent = null;
} catch (e) {
	supportsCustomEvents = false;
}

var EventDispatcher = function () {
	function EventDispatcher() {
		_classCallCheck(this, EventDispatcher);
	}

	_createClass(EventDispatcher, [{
		key: 'addEventListener',
		value: function addEventListener(aEventType, aFunction) {

			if (this._eventListeners === null) {
				this._eventListeners = {};
			}
			if (!this._eventListeners[aEventType]) {
				this._eventListeners[aEventType] = [];
			}
			this._eventListeners[aEventType].push(aFunction);

			return this;
		}
	}, {
		key: 'removeEventListener',
		value: function removeEventListener(aEventType, aFunction) {
			if (this._eventListeners === null) {
				this._eventListeners = {};
			}
			var currentArray = this._eventListeners[aEventType];

			if (typeof currentArray === 'undefined') {
				return this;
			}

			var currentArrayLength = currentArray.length;
			for (var i = 0; i < currentArrayLength; i++) {
				if (currentArray[i] === aFunction) {
					currentArray.splice(i, 1);
					i--;
					currentArrayLength--;
				}
			}
			return this;
		}
	}, {
		key: 'dispatchEvent',
		value: function dispatchEvent(aEvent) {
			if (this._eventListeners === null) {
				this._eventListeners = {};
			}
			var eventType = aEvent.type;

			try {
				if (aEvent.target === null) {
					aEvent.target = this;
				}
				aEvent.currentTarget = this;
			} catch (theError) {
				var newEvent = { 'type': eventType, 'detail': aEvent.detail, 'dispatcher': this };
				return this.dispatchEvent(newEvent);
			}

			var currentEventListeners = this._eventListeners[eventType];
			if (currentEventListeners !== null && currentEventListeners !== undefined) {
				var currentArray = this._copyArray(currentEventListeners);
				var currentArrayLength = currentArray.length;
				for (var i = 0; i < currentArrayLength; i++) {
					var currentFunction = currentArray[i];
					currentFunction.call(this, aEvent);
				}
			}
			return this;
		}
	}, {
		key: 'dispatchCustomEvent',
		value: function dispatchCustomEvent(aEventType, aDetail) {
			var newEvent = void 0;
			if (supportsCustomEvents) {
				newEvent = document.createEvent('CustomEvent');
				newEvent.dispatcher = this;
				newEvent.initCustomEvent(aEventType, false, false, aDetail);
			} else {
				newEvent = { 'type': aEventType, 'detail': aDetail, 'dispatcher': this };
			}
			return this.dispatchEvent(newEvent);
		}
	}, {
		key: '_destroy',
		value: function _destroy() {
			if (this._eventListeners !== null) {
				for (var objectName in this._eventListeners) {
					if (this._eventListeners.hasOwnProperty(objectName)) {
						var currentArray = this._eventListeners[objectName];
						var currentArrayLength = currentArray.length;
						for (var i = 0; i < currentArrayLength; i++) {
							currentArray[i] = null;
						}
						delete this._eventListeners[objectName];
					}
				}
				this._eventListeners = null;
			}
		}
	}, {
		key: '_copyArray',
		value: function _copyArray(aArray) {
			var currentArray = new Array(aArray.length);
			var currentArrayLength = currentArray.length;
			for (var i = 0; i < currentArrayLength; i++) {
				currentArray[i] = aArray[i];
			}
			return currentArray;
		}
	}]);

	return EventDispatcher;
}();

exports.default = EventDispatcher;