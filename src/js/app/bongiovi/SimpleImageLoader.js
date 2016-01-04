'use strict';

export default class SimpleImageLoader {
  constructor(){
    this._imgs             = {};
    this._loadedCount      = 0;
    this._toLoadCount      = 0;
    this._scope            = undefined;
    this._callback         = undefined;
    this._callbackProgress = undefined;
  }
  load(imgs, scope, callback, callbackProgress){
    this._imgs = {};
    this._loadedCount = 0;
    this._toLoadCount = imgs.length;
    this._scope = scope;
    this._callback = callback;
    this._callbackProgress = callbackProgress;

    this._imgLoadedBind = this.onImageLoaded.bind(this);

    for(let i=0, len=imgs.length; i<len; i++) {
      let img         = new Image();
      img.onload      = this._imgLoadedBind;
      let path        = imgs[i];
      let tmp         = path.split('/');
      let ref         = tmp[tmp.length-1].split('.')[0];
      this._imgs[ref] = img;
      img.src         = path;
    }

  }
  onImageLoaded(){
    this._loadedCount++;
    if(this._loadedCount === this._toLoadCount) {
      this._callback.call(this._scope, this._imgs);
    } else {
      if(this._callbackProgress) {
        let p = this._loadedCount / this._toLoadCount;
        this._callbackProgress.call(this._scope, p);
      }
    }
  }

}