'use strict';
import glMatrix from 'gl-matrix';
import Camera from './Camera.js';

export default class CameraPerspective extends Camera {
  constructor(){
    super();
    this.projection = glMatrix.mat4.create();
    this.mtxFinal = glMatrix.mat4.create();
  }
  setPerspective(aFov, aAspectRatio, aNear, aFar){
    this._fov = aFov;
    this._near = aNear;
    this._far = aFar;
    this._aspect = aAspectRatio;
    glMatrix.mat4.perspective(this.projection, aFov, aAspectRatio, aNear, aFar);
  }
  resize(aAspectRatio) {
    this._aspect = aAspectRatio;
    glMatrix.mat4.perspective(this.projection, this._fov, aAspectRatio, this._near, this._far);
  }
  get near(){
    return this._near;
  }
  get far(){
    return this._far;
  }
}