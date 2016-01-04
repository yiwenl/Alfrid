'use strict';
import glMatrix from 'gl-matrix';
import Camera from './Camera.js';

export default class CameraOrtho extends Camera {
  constructor(){
    super();
    let eye    = glMatrix.vec3.clone([0, 0, 500]  );
    let center = glMatrix.vec3.create( );
    let up     = glMatrix.vec3.clone( [0,-1,0] );
    this.lookAt(eye, center, up);
    this.projection = glMatrix.mat4.create();
  }
  setBoundary(left, right, top, bottom){
    this.left   = left;
    this.right  = right;
    this.top    = top;
    this.bottom = bottom;
    glMatrix.mat4.ortho(this.projection, left, right, top, bottom, 0, 10000);
  }
  ortho(left, right, top, bottom){
    this.setBoundary(left, right, top, bottom);
  }
  resize(){
    glMatrix.mat4.ortho(this.projection, this.left, this.right, this.top, this.bottom, 0, 10000);
  }
}