'use strict';

import _scheduler from './Scheduler.js';

export default class EaseNumber {
  constructor(mEasing, mValue) {
    this._easing = mEasing || 0.1;
    this._value = mValue;
    this._targetValue = mValue;

    this._ef = _scheduler.addEF(this, this._update);
  }
  _update() {
    this._checkLimit();
    this._value += (this._targetValue - this._value) * this._easing;
  }
  setTo(mValue) {
    this._targetValue = this._value = mValue;
  }
  add(mAdd){
    this._targetValue += mAdd;
  }
  limit(mMin, mMax) {
    this._min = mMin;
    this._max = mMax;
    this._checkLimit();
  }
  setEasing(mValue){
    this._easing = mValue;
  }
  _checkLimit(){
    if(this._min !== undefined && this._targetValue < this._min) {
      this._targetValue = this._min;
    }
    if(this._max !== undefined && this._targetValue > this._max) {
      this._targetValue = this._max;
    }
  }
  get value(){
    return this._value;
  }
  get targetValue(){
    return this._targetValue;
  }
}