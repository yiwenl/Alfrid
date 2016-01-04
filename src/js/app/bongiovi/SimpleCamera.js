'use strict';
import glMatrix from 'gl-matrix';
import CameraPerspective from './CameraPerspective.js';
import EaseNumber from './EaseNumber.js';

export default class SimpleCamera extends CameraPerspective {
  constructor(mListenerTarget){
    super();
    this._listenerTarget = mListenerTarget || window;

    this.radius          = new EaseNumber(500);
    this.position[2]     = this.radius.value;
    this.center          = glMatrix.vec3.create( );
    this.up              = glMatrix.vec3.clone( [0,-1,0] );
    this.lookAt(this.position, this.center, this.up);
    this._mouse          = {};
    this._preMouse       = {};
    this._isMouseDown    = false;
    
    this._rx             = new EaseNumber(0);
    this._rx.limit(-Math.PI/2, Math.PI/2);
    this._ry             = new EaseNumber(0);
    this._preRX          = 0;
    this._preRY          = 0;
    // this._isLocked    = false;
    this._isLockZoom     = false;
    this._isLockRotation = false;
    this._isInvert       = false;

    this.bindEvents();
  }
  bindEvents(){
    this._listenerTarget.addEventListener('mousewheel', this._onWheel.bind(this));
    this._listenerTarget.addEventListener('DOMMouseScroll', this._onWheel.bind(this));

    this._listenerTarget.addEventListener('mousedown', this._onMouseDown.bind(this));
    this._listenerTarget.addEventListener('touchstart', this._onMouseDown.bind(this));
    this._listenerTarget.addEventListener('mousemove', this._onMouseMove.bind(this));
    this._listenerTarget.addEventListener('touchmove', this._onMouseMove.bind(this));
    window.addEventListener('mouseup', this._onMouseUp.bind(this));
    window.addEventListener('touchend', this._onMouseUp.bind(this));
  }
  inverseControl(value){
    if(value === undefined) {
      this._isInvert = true;
    } else {
      this._isInvert = value;
    }
  }
  lock(value){
    if(value === undefined) {
      // this._isLocked = true;
      this._isLockZoom = true;
      this._isLockRotation = true;
    } else {
      this._isLockZoom = value;
      this._isLockRotation = value;
    }
  }
  lockRotation(value) {
    if(value === undefined) {
      this._isLockRotation = true;
    } else {
      this._isLockRotation = value;
    }
  }
  lockZoom(value) {
    this._isLockZoom = value === undefined ? true : value;
  }
  _onMouseDown(mEvent) {
    if(this._isLockRotation) return;
    this._isMouseDown = true;
    this.getMouse(mEvent, this._mouse);
    this.getMouse(mEvent, this._preMouse);
    this._preRX = this._rx.targetValue;
    this._preRY = this._ry.targetValue;
  }
  _onMouseMove(mEvent) {
    if(this._isLockRotation) {return;}
    this.getMouse(mEvent, this._mouse);
    if(mEvent.touches) {mEvent.preventDefault();}
    if(this._isMouseDown) {
      let diffX = this._mouse.x - this._preMouse.x;
      if(this._isInvert) {diffX *= -1;}
      this._ry.value = this._preRY - diffX * 0.01;

      let diffY = this._mouse.y - this._preMouse.y;
      if(this._isInvert) {diffY *= -1;}
      this._rx.value = this._preRX - diffY * 0.01;

      // if(this._rx.targetValue > Math.PI * 0.5) {this._rx.targetValue = Math; }
    }
  }
  _onMouseUp() {
    if(this._isLockRotation) return;
    this._isMouseDown = false;
  }
  _onWheel(aEvent) {
    if(this._isLockZoom) return;

    let w = aEvent.wheelDelta;
    let d = aEvent.detail;
    let value = 0;
    if (d){
      if (w) {
        value = w/d/40*d>0?1:-1; // Opera
      } else {
        value = -d/3;            // Firefox; TODO: do not /3 for OS X
      }
    } else {
      value = w/120; 
    }

    // this._targetRadius -= value * 5;
    this.radius.add( -value * 5);
  }
  _updateCameraPosition(){
    this.position[2]  = this.radius.value;

    this.position[1] = Math.sin(this._rx.value) * this.radius.value;
    let tr = Math.cos(this._rx.value) * this.radius.value;
    this.position[0] = Math.cos(this._ry.value + Math.PI*0.5) * tr;
    this.position[2] = Math.sin(this._ry.value + Math.PI*0.5) * tr;
  }
  getMouse(mEvent, mTarget){
    let o = mTarget || {};
    if(mEvent.touches) {
      o.x = mEvent.touches[0].pageX;
      o.y = mEvent.touches[0].pageY;
    } else {
      o.x = mEvent.clientX;
      o.y = mEvent.clientY;
    }
    return o;
  }
  get rx(){
    return this._rx.targetValue;
  }
  set rx(mValue){
    this._rx.value = mValue;
  }
  get ry(){
    return this._ry.targetValue;
  }
  set ry(mValue){
    this._ry.value = mValue;
  }
  get getMatrix(){
    this._updateCameraPosition();
    this.lookAt(this.position, this.center, this.up);
    return super.getMatrix();
  }

}