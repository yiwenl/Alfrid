'use strict';

import _GLTool from './GLTool.js';
import Utils from './Utils.js';

export default class GLTexture {
  constructor(source, isTexture, options) {
    isTexture = isTexture || false;
    options = options || {};
    this.gl = _GLTool.gl;
    if(isTexture) {
      this.texture = source;
    } else {
      this._source   = source;
      this.texture   = this.gl.createTexture();
      this._isVideo  = (source.tagName === 'VIDEO');
      this.magFilter = options.magFilter || this.gl.LINEAR;
      this.minFilter = options.minFilter || this.gl.LINEAR_MIPMAP_NEAREST;

      this.wrapS     = options.wrapS || this.gl.MIRRORED_REPEAT;
      this.wrapT     = options.wrapT || this.gl.MIRRORED_REPEAT;
      var width      = source.width || source.videoWidth;

      if(width) {
        if(Utils.isPowerOfTwo(source)) {
          this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE;
          if(this.minFilter === this.gl.LINEAR_MIPMAP_NEAREST){
            this.minFilter = this.gl.LINEAR;
          }
        }
      } else {
        this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE;
        if(this.minFilter === this.gl.LINEAR_MIPMAP_NEAREST) {
          this.minFilter = this.gl.LINEAR;
        }
      }

      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, source);

      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.wrapS);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.wrapT);
      
      if(this.minFilter === this.gl.LINEAR_MIPMAP_NEAREST) {
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
      }

      this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }
  }
  updateTexture(source){
    if(source){
      this._source = source;
    }
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this._source);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
    if(this.minFilter === this.gl.LINEAR_MIPMAP_NEAREST) {
      this.gl.generateMipmap(this.gl.TEXTURE_2D);
    }

    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }
  bind(index){
    if(!_GLTool.shader) return;
    if(index === undefined) {
      index = 0;
    }

    this.gl.activeTexture(this.gl.TEXTURE0 + index);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.uniform1i(_GLTool.shader.uniformTextures[index], index);
    this._bindIndex = index;
  }
  unbind(){
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }
  destroy(){
    this.gl.deleteTexture(this.texture);
  }
}