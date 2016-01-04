import _GLTool from './bongiovi/GLTool.js';
import SimpleImageLoader from './bongiovi/SimpleImageLoader.js';
import _scheduler from './bongiovi/Scheduler.js';
import SceneApp from './SceneApp.js';

class Main {
  constructor(){
    let loader = new SimpleImageLoader();
    loader.load(['images/gold.jpg'], this, this._onImagesLoaded);
  }
  _onImagesLoaded(imgs){
    this.images = imgs;
    console.log('imgs : ', imgs);

    if(document.body) {
      this._init();
    } else {
      window.addEventListener('load', this._init.bind(this));
    }
  }
  _init(){
    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.className = 'Main-Canvas';
    document.getElementById('container').appendChild(this.canvas);
    _GLTool.setup(this.canvas);

    this._scene = new SceneApp(this.images.gold);
    this._efID = _scheduler.addEF(this, this.loop);
  }
  loop(){

  }
}
let main = new Main();
export default main;