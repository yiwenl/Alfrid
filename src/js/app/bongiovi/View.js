'use strict';
import GLShader from './GLShader.js';

export default class View {
  constructor(aPathVert, aPathFrag){
    this.shader = new GLShader(aPathVert, aPathFrag);
    this._init();
  }
  _init(){
    console.log('View :: _init : Should be overwritten by SuperClass');
  }
  render(){
    console.log('View :: render : Should be overwritten by SuperClass');
  }
}