'use strict';

import glMatrix from 'gl-matrix';
import Utils from './Utils.js';

export default class Face {
  constructor(mA, mB, mC) {
    this._vertexA = mA;
    this._vertexB = mB;
    this._vertexC = mC;

    this._init();
  }
  _init(){
    let BA = glMatrix.vec3.create();
    let CA = glMatrix.vec3.create();
    glMatrix.vec3.sub(BA, this._vertexB, this._vertexA);
    glMatrix.vec3.sub(CA, this._vertexC, this._vertexA);

    this._faceNormal = glMatrix.vec3.create();
    glMatrix.vec3.cross(this._faceNormal, BA, CA);
    glMatrix.vec3.normalize(this._faceNormal, this._faceNormal);
  }
  contains(mVertex) {
    return ( Utils.equal(mVertex, this._vertexA) || Utils.equal(mVertex, this._vertexB) || Utils.equal(mVertex, this._vertexC) );
  }
  get faceNormal(){
    return this._faceNormal;
  }
}