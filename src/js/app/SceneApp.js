import _GLTool from './bongiovi/GLTool.js';
import GLTexture from './bongiovi/GLTexture.js';
import Scene from './bongiovi/Scene.js';
import ViewDotPlanes from './bongiovi/ViewDotPlanes.js';
import ViewAxis from './bongiovi/ViewAxis.js';

export default class SceneApp extends Scene {
  constructor(aImage){
    super();
    
    this.lightPosition = [0,0,0];
    this.count = 0;
    this.image = aImage;

    window.addEventListener('resize', this.resize.bind(this));
  }
  _initTextures(){
    console.log('this.image : ', this.image);
    this._textureGold = new GLTexture(this.image);
  }
  _initViews(){
    this._vAxis = new ViewAxis();
    this._vDotPlane = new ViewDotPlanes();
  }
  render(){
    this.count += .01;
    let r = 150;
    this.lightPosition[0] = Math.cos(this.count) * r;
    this.lightPosition[1] = Math.sin(this.count * .75) * 50 + 60;
    this.lightPosition[2] = Math.sin(this.count) * r;

    this._vAxis.render();
    this._vDotPlane.render();
  }
  resize(){
    _GLTool.setSize(window.innerWidth, window.innerHeight);
    this.camera.resize(_GLTool.aspectRatio);
  }
}