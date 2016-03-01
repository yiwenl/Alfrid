// FrameBuffer.js

'use strict';

import GL from './GLTool';
import GLTexture from './GLTexture';

const isPowerOfTwo = function(x) {	
	return (x !== 0) && (!(x & (x - 1)));
};

let gl;
let WEBGL_depth_texture;

class FrameBuffer {

	constructor(mWidth, mHeight, mParameters={}) {
		gl = GL.gl;
		WEBGL_depth_texture = GL.checkExtension('WEBGL_depth_texture');

		this.width      = mWidth;
		this.height     = mHeight;

		this.magFilter  = mParameters.magFilter 	|| gl.LINEAR;
		this.minFilter  = mParameters.minFilter 	|| gl.LINEAR;
		this.wrapS      = mParameters.wrapS 		|| gl.CLAMP_TO_EDGE;
		this.wrapT      = mParameters.wrapT 		|| gl.CLAMP_TO_EDGE;
		this.useDepth   = mParameters.useDepth 		|| true;
		this.useStencil = mParameters.useStencil 	|| false;

		if(!isPowerOfTwo(this.width) || !isPowerOfTwo(this.height)) {
			this.wrapS = this.wrapT = gl.CLAMP_TO_EDGE;

			if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
				this.minFilter = gl.LINEAR;
			}
		} 

		this._init();
	}


	_init() {
		this.texture            = gl.createTexture();
		this.glTexture			= new GLTexture(this.texture, true);

		this.depthTexture       = gl.createTexture();
		this.glDepthTexture		= new GLTexture(this.depthTexture, true);
		
		this.frameBuffer        = gl.createFramebuffer();		
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);


		//	SETUP TEXTURE MIPMAP, WRAP

		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, GL.isMobile ? gl.UNSIGNED_BYTE : gl.FLOAT, null);

		if(WEBGL_depth_texture) {
			gl.bindTexture(gl.TEXTURE_2D, this.depthTexture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.width, this.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);	
		}
		

		//	GET COLOUR

		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);

		//	GET DEPTH

		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture, 0);


		if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST)	{
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.generateMipmap(gl.TEXTURE_2D);
		}

		//	UNBIND

		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);

		
		//	CLEAR FRAMEBUFFER 

		this.clear();
	}


	//	PUBLIC METHODS

	bind() {
		GL.viewport(0, 0, this.width, this.height);
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
	}


	unbind() {
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		GL.viewport(0, 0, GL.width, GL.height);
	}


	clear(r=0, g=0, b=0, a=0) {
		this.bind();
		GL.clear(r, g, b, a);
		this.unbind();
	}	


	//	TEXTURES

	getTexture() {
		return this.glTexture;
	}

	getDepthTexture() {
		return this.glDepthTexture;
	}


	//	MIPMAP FILTER

	minFilter(mValue) {
		if(mValue !== gl.LINEAR && mValue !== gl.NEAREST && mValue !== gl.LINEAR_MIPMAP_NEAREST) { return this; }
		this.minFilter = mValue;
		return this;
	}

	magFilter(mValue) {
		if(mValue !== gl.LINEAR && mValue !== gl.NEAREST && mValue !== gl.LINEAR_MIPMAP_NEAREST) { return this; }
		this.magFilter = mValue;
		return this;
	}


	//	WRAP

	wrapS(mValue) {
		if(mValue !== gl.CLAMP_TO_EDGE && mValue !== gl.REPEAT && mValue !== gl.MIRRORED_REPEAT) { return this; }
		this.wrapS = mValue;
		return this;
	}

	wrapT(mValue) {
		if(mValue !== gl.CLAMP_TO_EDGE && mValue !== gl.REPEAT && mValue !== gl.MIRRORED_REPEAT) { return this; }
		this.wrapT = mValue;
		return this;
	}


}


export default FrameBuffer;