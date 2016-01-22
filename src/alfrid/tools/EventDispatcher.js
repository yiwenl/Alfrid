// EventDispatcher.js

let supportsCustomEvents = true;
try {
	let newTestCustomEvent = document.createEvent('CustomEvent');
	newTestCustomEvent = null;
} catch(e){
	supportsCustomEvents = false;
}

class EventDispatcher {

	constructor() {

	}


	addEventListener(aEventType, aFunction) {

		if(this._eventListeners === null) {
			this._eventListeners = {};
		}
		if(!this._eventListeners[aEventType]){
			this._eventListeners[aEventType] = [];
		}
		this._eventListeners[aEventType].push(aFunction);
		
		return this;

	}


	removeEventListener(aEventType, aFunction) {
		if(this._eventListeners === null) {
			this._eventListeners = {};
		}
		let currentArray = this._eventListeners[aEventType];
		
		if (typeof(currentArray) === 'undefined') {
			return this;
		}
		
		let currentArrayLength = currentArray.length;
		for(let i = 0; i < currentArrayLength; i++){
			if(currentArray[i] === aFunction){
				currentArray.splice(i, 1);
				i--;
				currentArrayLength--;
			}
		}
		return this;
	}

	dispatchEvent(aEvent) {
		if(this._eventListeners === null) {
			this._eventListeners = {};
		}
		let eventType = aEvent.type;
		
		try {
			if(aEvent.target === null) {
				aEvent.target = this;
			}
			aEvent.currentTarget = this;
		}
		catch(theError) {
			let newEvent = {'type' : eventType, 'detail' : aEvent.detail, 'dispatcher' : this };
			return this.dispatchEvent(newEvent);
		}
		
		let currentEventListeners = this._eventListeners[eventType];
		if(currentEventListeners !== null && currentEventListeners !== undefined) {
			let currentArray = this._copyArray(currentEventListeners);
			let currentArrayLength = currentArray.length;
			for(let i = 0; i < currentArrayLength; i++){
				let currentFunction = currentArray[i];
				currentFunction.call(this, aEvent);
			}
		}
		return this;
	}

	dispatchCustomEvent(aEventType, aDetail) {
		let newEvent;
		if (supportsCustomEvents){
			newEvent = document.createEvent('CustomEvent');
			newEvent.dispatcher = this;
			newEvent.initCustomEvent(aEventType, false, false, aDetail);
		}
		else {
			newEvent = {'type' : aEventType, 'detail' : aDetail, 'dispatcher' : this };
		}
		return this.dispatchEvent(newEvent);
	}

	_destroy() {
		if(this._eventListeners !== null) {
			for(let objectName in this._eventListeners) {
				if(this._eventListeners.hasOwnProperty(objectName)) {
					let currentArray = this._eventListeners[objectName];
					let currentArrayLength = currentArray.length;
					for(let i = 0; i < currentArrayLength; i++) {
						currentArray[i] = null;
					}
					delete this._eventListeners[objectName];	
				}
			}
			this._eventListeners = null;
		}
	}

	_copyArray(aArray) {
		let currentArray = new Array(aArray.length);
		let currentArrayLength = currentArray.length;
		for(let i = 0; i < currentArrayLength; i++) {
			currentArray[i] = aArray[i];
		}
		return currentArray;
	}
}


export default EventDispatcher;