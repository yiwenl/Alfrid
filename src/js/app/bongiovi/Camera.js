'use strict';
import glMatrix from 'gl-matrix';

export default class Camera {
  constructor(){
    this.matrix = glMatrix.mat4.create();
    glMatrix.mat4.identity(this.matrix);

    this.position = glMatrix.vec3.create();
  }
  lookAt(aEye, aCenter, aUp) {
    glMatrix.vec3.copy(this.position, aEye);
    glMatrix.mat4.identity(this.matrix);
    glMatrix.mat4.lookAt(this.matrix, aEye, aCenter, aUp);
  }
  get getMatrix() {
    return this.matrix;
  }
}