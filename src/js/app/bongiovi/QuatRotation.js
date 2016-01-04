'use strict';
import glMatrix from 'gl-matrix';

export default class QuatRotation {
  constructor(mListenerTarget){
    if(mListenerTarget === undefined) { mListenerTarget = document; }
    this._isRotateZ     = 0;
    this.matrix         = glMatrix.mat4.create();
    this.m              = glMatrix.mat4.create();
    this._vZaxis        = glMatrix.vec3.clone([0, 0, 0]);
    this._zAxis         = glMatrix.vec3.clone([0, 0, -1]);
    this.preMouse       = {x:0, y:0};
    this.mouse          = {x:0, y:0};
    this._isMouseDown   = false;
    this._rotation      = glMatrix.quat.clone([0, 0, 1, 0]);
    this.tempRotation   = glMatrix.quat.clone([0, 0, 0, 0]);
    this._rotateZMargin = 0;
    this.diffX          = 0;
    this.diffY          = 0;
    this._currDiffX     = 0;
    this._currDiffY     = 0;
    this._offset        = 0.004;
    this._easing        = 0.1;
    this._slerp         = -1;
    this._isLocked      = false;

    mListenerTarget.addEventListener('mousedown', (aEvent) => { this._onMouseDown(aEvent); });
    mListenerTarget.addEventListener('touchstart', (aEvent) => { this._onMouseDown(aEvent); });
    mListenerTarget.addEventListener('mouseup', (aEvent) => { this._onMouseUp(aEvent); });
    mListenerTarget.addEventListener('touchend', (aEvent) => { this._onMouseUp(aEvent); });
    mListenerTarget.addEventListener('mousemove', (aEvent) => { this._onMouseMove(aEvent); });
    mListenerTarget.addEventListener('touchmove', (aEvent) => { this._onMouseMove(aEvent); });
  }
  inverseControl(value){
    if(value === undefined) { 
      this._isInvert = true;  
    } else {
      this._isInvert = value;
    }
  }
  lock(value) {
    if(value === undefined) { 
      this._isLocked = true;  
    } else {  
      this._isLocked = value; 
    }
  }
  getMousePos(aEvent) {
    let mouseX, mouseY;
    if(aEvent.changedTouches !== undefined) {
      mouseX = aEvent.changedTouches[0].pageX;
      mouseY = aEvent.changedTouches[0].pageY;
    } else {
      mouseX = aEvent.clientX;
      mouseY = aEvent.clientY;
    }
    return {x:mouseX, y:mouseY};
  }
  _onMouseDown(aEvent){
    if(this._isLocked || this._isMouseDown) return;

    let mouse = this.getMousePos(aEvent);
    let tempRotation = glMatrix.quat.clone(this._rotation);
    this._updateRotation(tempRotation);
    this._rotation = tempRotation;

    this._isMouseDown = true;
    this._isRotateZ = 0;
    this.preMouse = {x:mouse.x, y:mouse.y};

    if(mouse.y < this._rotateZMargin || mouse.y > (window.innerHeight - this._rotateZMargin) ) {  this._isRotateZ = 1;  }
    else if(mouse.x < this._rotateZMargin || mouse.x > (window.innerWidth - this._rotateZMargin) ) {  this._isRotateZ = 2;  }

    this._currDiffX = this.diffX = 0;
    this._currDiffY = this.diffY = 0;
  }
  _onMouseMove(aEvent) {
    if(this._isLocked) return;
    if(aEvent.touches) {aEvent.preventDefault();}
    this.mouse = this.getMousePos(aEvent);
  }
  _onMouseUp(){
    if(this._isLocked || !this._isMouseDown) return;
    this._isMouseDown = false;
  }
  setCameraPos(mQuat, speed){
    if(this._slerp > 0) return;

    speed             = speed || this._easing;
    this._easing      = speed;
    
    let tempRotation  = glMatrix.quat.clone(this._rotation);
    this._updateRotation(tempRotation);
    this._rotation    = glMatrix.quat.clone(tempRotation);
    this._currDiffX   = this.diffX = 0;
    this._currDiffY   = this.diffY = 0;
    
    this._isMouseDown = false;
    this._isRotateZ   = 0;
    
    this._targetQuat  = glMatrix.quat.clone(mQuat);
    this._slerp       = 1;
  }
  resetQuat(){
    this._rotation    = glMatrix.quat.clone([0, 0, 1, 0]);
    this.tempRotation = glMatrix.quat.clone([0, 0, 0, 0]);
    this._targetQuat  = undefined;
    this._slerp       = -1;
  }
  update(){
    glMatrix.mat4.identity(this.m);

    if(this._targetQuat === undefined) { 
      glMatrix.quat.set(this.tempRotation, this._rotation[0], this._rotation[1], this._rotation[2], this._rotation[3]);
      this._updateRotation(this.tempRotation);
    } else {
      this._slerp += (0 - this._slerp) * 0.1;

      if(this._slerp < 0.001) {
        // quat.set(this._targetQuat, this._rotation);
        glMatrix.quat.set(this._rotation, this._targetQuat[0], this._targetQuat[1], this._targetQuat[2], this._targetQuat[3]);
        this._targetQuat = undefined;
        this._slerp = -1;
      } else {
        glMatrix.quat.set(this.tempRotation, 0, 0, 0, 0);
        glMatrix.quat.slerp(this.tempRotation, this._targetQuat, this._rotation, this._slerp);
      }
    }

    glMatrix.vec3.transformQuat(this._vZaxis, this._vZaxis, this.tempRotation);

    glMatrix.mat4.fromQuat(this.matrix, this.tempRotation);
  }
  _updateRotation(aTempRotation){
    if(this._isMouseDown && !this._isLocked) {
      this.diffX = -(this.mouse.x - this.preMouse.x);
      this.diffY = (this.mouse.y - this.preMouse.y);

      if(this._isInvert) {
        this.diffX = -this.diffX;
        this.diffY = -this.diffY;
      }
    }
    
    this._currDiffX += (this.diffX - this._currDiffX) * this._easing;
    this._currDiffY += (this.diffY - this._currDiffY) * this._easing;

    var angle, _quat;

    if(this._isRotateZ > 0) {
      if(this._isRotateZ === 1) {
        angle = -this._currDiffX * this._offset; 
        angle *= (this.preMouse.y < this._rotateZMargin) ? -1 : 1;
        _quat = glMatrix.quat.clone( [0, 0, Math.sin(angle), Math.cos(angle) ] );
        glMatrix.quat.multiply(_quat, aTempRotation, _quat);
      } else {
        angle = -this._currDiffY * this._offset; 
        angle *= (this.preMouse.x < this._rotateZMargin) ? 1 : -1;
        _quat = glMatrix.quat.clone( [0, 0, Math.sin(angle), Math.cos(angle) ] );
        glMatrix.quat.multiply(_quat, aTempRotation, _quat);
      }
    } else {
      var v = glMatrix.vec3.clone([this._currDiffX, this._currDiffY, 0]);
      var axis = glMatrix.vec3.create();
      glMatrix.vec3.cross(axis, v, this._zAxis);
      glMatrix.vec3.normalize(axis, axis);
      angle = glMatrix.vec3.length(v) * this._offset;
      _quat = glMatrix.quat.clone( [Math.sin(angle) * axis[0], Math.sin(angle) * axis[1], Math.sin(angle) * axis[2], Math.cos(angle) ] );
      glMatrix.quat.multiply(aTempRotation, _quat, aTempRotation);
    }

  }
  
}