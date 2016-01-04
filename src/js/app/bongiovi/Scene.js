'use strict';
import glMatrix from 'gl-matrix';
import QuatRotation from './QuatRotation.js';
import CameraOrtho from './CameraOrtho.js';
import SimpleCamera from './SimpleCamera.js';
import _GLTool from './GLTool.js';

export default class Scene {
  constructor() {
    if(_GLTool.canvas === null) {
      console.log('We don\'t have a canvas on the GLTool.');
      return;
    }
    this.gl = _GLTool.gl;
    this._children = [];
    this._init();
  }
  _init(){
    this.camera = new SimpleCamera(_GLTool.canvas);
    this.camera.setPerspective(45*Math.PI/180, _GLTool.aspectRatio, 5, 3000);
    this.camera.lockRotation();

    var eye                = glMatrix.vec3.clone([0, 0, 500]  );
    var center             = glMatrix.vec3.create( );
    var up                 = glMatrix.vec3.clone( [0,-1,0] );
    this.camera.lookAt(eye, center, up);
    
    this.sceneRotation     = new QuatRotation(_GLTool.canvas);
    this.rotationFront     = glMatrix.mat4.create();
    glMatrix.mat4.identity(this.rotationFront);
    
    this.cameraOrtho       = new CameraOrtho();
    this.cameraOrthoScreen = new CameraOrtho();
    this.cameraOtho        = this.cameraOrtho;

    this.cameraOrtho.lookAt(eye, center, up);
    this.cameraOrtho.ortho( 1, -1, 1, -1);

    this.cameraOrthoScreen.lookAt(eye, center, up);
    this.cameraOrthoScreen.ortho( 0, _GLTool.width, _GLTool.height, 0);

    this._initTextures();
    this._initViews();

    window.addEventListener('resize', this._onResize.bind(this));
  }
  _initTextures(){
    console.log('_initTextures should be overwritten by SuperClass');
  }
  _initViews(){
    console.log('_initViews should be overwritten by SuperClass');
  }
  loop(){
    this.update();
    this.render();
  }
  update(){
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.sceneRotation.update();
    _GLTool.setViewport(0, 0, _GLTool.width, _GLTool.height);
    _GLTool.setMatrices(this.camera );
    _GLTool.rotate(this.sceneRotation.matrix);
  }
  resize(){

  }
  render(){

  }
  _onResize(){
    this.cameraOrthoScreen.ortho(0, _GLTool.width, _GLTool.height, 0);
  }
}