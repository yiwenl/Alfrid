// QuatRotation.js

'use strict';

import { mat4, vec3, quat } from 'gl-matrix';
import EaseNumber from './EaseNumber';
import Scheduler from 'scheduling';

const getMouse = function (mEvent, mTarget) {

	const o = mTarget || {};
	if(mEvent.touches) {
		o.x = mEvent.touches[0].pageX;
		o.y = mEvent.touches[0].pageY;
	} else {
		o.x = mEvent.clientX;
		o.y = mEvent.clientY;
	}

	return o;
};

class QuatRotation {
	constructor(mTarget, mListenerTarget = window, mEasing = 0.1) {

		this._target         = mTarget;
		this._listenerTarget = mListenerTarget;
		
		this.matrix          = mat4.create();
		this.m               = mat4.create();
		this._vZaxis         = vec3.clone([0, 0, 0]);
		this._zAxis          = vec3.clone([0, 0, 1]);
		this.preMouse        = { x:0, y:0 };
		this.mouse           = { x:0, y:0 };
		this._isMouseDown    = false;
		this._rotation       = quat.create();
		this.tempRotation    = quat.create();
		this._rotateZMargin  = 0;
		this._offset         = 0.004;
		this._slerp          = -1;
		this._isLocked       = false;
		
		this._diffX          = new EaseNumber(0, mEasing);
		this._diffY          = new EaseNumber(0, mEasing);

		this._listenerTarget.addEventListener('mousedown', (e) => this._onDown(e));
		this._listenerTarget.addEventListener('touchstart', (e) => this._onDown(e));
		this._listenerTarget.addEventListener('mousemove', (e) => this._onMove(e));
		this._listenerTarget.addEventListener('touchmove', (e) => this._onMove(e));
		window.addEventListener('touchend', () => this._onUp());
		window.addEventListener('mouseup', () => this._onUp());

		Scheduler.addEF(() => this._loop());
	}

	// 	PUBLIC METHODS

	inverseControl(isInvert = true) {
		this._isInvert = isInvert;
	}

	lock(mValue = true) {
		this._isLocked = mValue;
	}	

	setCameraPos(mQuat, speed = 0.1) {
		this.easing = speed;
		if(this._slerp > 0) { return; }
		
		const tempRotation  = quat.clone(this._rotation);
		this._updateRotation(tempRotation);
		this._rotation    = quat.clone(tempRotation);
		this._currDiffX   = this.diffX = 0;
		this._currDiffY   = this.diffY = 0;
		
		this._isMouseDown = false;
		this._isRotateZ   = 0;
		
		this._targetQuat  = quat.clone(mQuat);
		this._slerp       = 1;
	}

	resetQuat() {
		this._rotation    = quat.clone([0, 0, 1, 0]);
		this.tempRotation = quat.clone([0, 0, 0, 0]);
		this._targetQuat  = undefined;
		this._slerp       = -1;
	}

	//	EVENT HANDLER

	_onDown(mEvent) {
		if(this._isLocked) { return; }

		const mouse = getMouse(mEvent);
		const tempRotation = quat.clone(this._rotation);
		this._updateRotation(tempRotation);
		this._rotation = tempRotation;

		this._isMouseDown = true;
		this._isRotateZ = 0;
		this.preMouse = { x:mouse.x, y:mouse.y };

		if(mouse.y < this._rotateZMargin || mouse.y > (window.innerHeight - this._rotateZMargin)) {	
			this._isRotateZ = 1;	
		} else if(mouse.x < this._rotateZMargin || mouse.x > (window.innerWidth - this._rotateZMargin)) {	
			this._isRotateZ = 2;	
		}

		this._diffX.setTo(0);
		this._diffY.setTo(0);
	}


	_onMove(mEvent) {
		if(this._isLocked) { return; }
		getMouse(mEvent, this.mouse);
	}


	_onUp() {
		if(this._isLocked) { return; }
		this._isMouseDown = false;
	}


	//	PRIVATE METHODS

	_updateRotation(mTempRotation) {
		if(this._isMouseDown && !this._isLocked) {
			this._diffX.value = -(this.mouse.x - this.preMouse.x);
			this._diffY.value =  (this.mouse.y - this.preMouse.y);

			if(this._isInvert) {
				this._diffX.value = -this._diffX.targetValue;
				this._diffY.value = -this._diffY.targetValue;
			}
		}
		
		let angle, _quat;

		if(this._isRotateZ > 0) {
			if(this._isRotateZ === 1) {
				angle = -this._diffX.value * this._offset; 
				angle *= (this.preMouse.y < this._rotateZMargin) ? -1 : 1;
				_quat = quat.clone([0, 0, Math.sin(angle), Math.cos(angle)]);
				quat.multiply(_quat, mTempRotation, _quat);
			} else {
				angle = -this._diffY.value * this._offset; 
				angle *= (this.preMouse.x < this._rotateZMargin) ? 1 : -1;
				_quat = quat.clone([0, 0, Math.sin(angle), Math.cos(angle)]);
				quat.multiply(_quat, mTempRotation, _quat);
			}
		} else {
			const v = vec3.clone([this._diffX.value, this._diffY.value, 0]);
			const axis = vec3.create();
			vec3.cross(axis, v, this._zAxis);
			vec3.normalize(axis, axis);
			angle = vec3.length(v) * this._offset;
			_quat = quat.clone([Math.sin(angle) * axis[0], Math.sin(angle) * axis[1], Math.sin(angle) * axis[2], Math.cos(angle)]);
			quat.multiply(mTempRotation, _quat, mTempRotation);
		}
	}

	_loop() {
		mat4.identity(this.m);

		if(this._targetQuat === undefined) { 
			quat.set(this.tempRotation, this._rotation[0], this._rotation[1], this._rotation[2], this._rotation[3]);
			this._updateRotation(this.tempRotation);
		} else {
			this._slerp += (0 - this._slerp) * 0.1;

			if(this._slerp < 0.0005) {
				quat.copy(this._rotation, this._targetQuat);
				quat.copy(this.tempRotation, this._targetQuat);
				this._targetQuat = undefined;
				this._diffX.setTo(0);
				this._diffY.setTo(0);
				this._slerp = -1;
			} else {
				quat.set(this.tempRotation, 0, 0, 0, 0);
				quat.slerp(this.tempRotation, this._targetQuat, this._rotation, this._slerp);
			}
		}

		vec3.transformQuat(this._vZaxis, this._vZaxis, this.tempRotation);

		mat4.fromQuat(this.matrix, this.tempRotation);
	}


	//	GETTER AND SETTER

	set easing(mValue) {
		this._diffX.easing = mValue;
		this._diffY.easing = mValue;
	}

	get easing() {
		return this._diffX.easing;
	}
}

export default QuatRotation;