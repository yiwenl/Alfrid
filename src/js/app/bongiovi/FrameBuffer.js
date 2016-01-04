'use strict';

import _GLTool from './GLTool.js';
import Utils from './Utils.js';
import GLTexture from './GLTexture.js';

export default class FrameBuffer {
  constructor(width, height, options) {
    this.gl = _GLTool.gl;
    options        = options || {};
    this.width     = width;
    this.height    = height;
    this.magFilter = options.magFilter || this.gl.LINEAR;
    this.minFilter = options.minFilter || this.gl.LINEAR;
    this.wrapS     = options.wrapS || this.gl.MIRRORED_REPEAT;
    this.wrapT     = options.wrapT || this.gl.MIRRORED_REPEAT;

    if(!Utils._isPowerOfTwo(width) || !Utils._isPowerOfTwo(height)) {
      this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE;

      if(this.minFilter === this.gl.LINEAR_MIPMAP_NEAREST) {
        this.minFilter = this.gl.LINEAR;
      }
    } 

    this._init();
  }
  _init() {
    this.texture = this.gl.createTexture();
    this.glTexture = new GLTexture(this.texture, true);
  
    this.frameBuffer = this.gl.createFramebuffer();   
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer);
    this.frameBuffer.width = this.width;
    this.frameBuffer.height = this.height;

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

    if(_GLTool.depthTextureExt) {
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, this.gl.RGBA, this.gl.FLOAT, null);
    } else {
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.frameBuffer.width, this.frameBuffer.height, 0, this.gl.RGBA, this.gl.FLOAT, null);
    }

    if(this.minFilter === this.gl.LINEAR_MIPMAP_NEAREST) {
      this.gl.generateMipmap(this.gl.TEXTURE_2D);
    }

    this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texture, 0);
    if(_GLTool.depthTextureExt === null) {
      var renderbuffer = this.gl.createRenderbuffer();
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, renderbuffer);
      this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, this.frameBuffer.width, this.frameBuffer.height);
      this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texture, 0);
      this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, renderbuffer);
      // this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, renderbuffer);  
      // if (this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER) != this.gl.FRAMEBUFFER_COMPLETE) {
      //      throw new Error('Rendering to this texture is not supported (incomplete framebuffer)');
      //    }

      // this.gl.renderbufferStorage( this.gl.RENDERBUFFER, this.gl.RGBA4, this.frameBuffer.width, this.frameBuffer.height );
    } else {
      this.depthTexture = this.gl.createTexture();
      this.this.glDepthTexture = new GLTexture(this.depthTexture, true);

      this.gl.bindTexture(this.gl.TEXTURE_2D, this.depthTexture);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.DEPTH_COMPONENT, this.width, this.height, 0, this.gl.DEPTH_COMPONENT, this.gl.UNSIGNED_SHORT, null);

      this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture, 0);
    }

    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

  }
  bind(){
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer);
  }
  unbind(){
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  }
  get getTexture(){
    return this.glTexture;
  }
  get getDepthTexture(){
    return this.glDepthTexture;
  }
  destory() {
    this.gl.deleteFrameBuffer(this.framebuffer);

    this.glTexture.destory();
    if(this.glDepthTexture) {
      this.glDepthTexture.destory();
    }
  }
}