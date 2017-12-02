// FrameBuffer.js

'use strict';

import GL from './GLTool';
import GLTexture from './GLTexture';
import GLTexture2 from './GLTexture2';
import WebglNumber from './utils/WebglNumber';

function isPowerOfTwo(x) {	
	return (x !== 0) && (!(x & (x - 1)));
};

let gl;
let webglDepthTexture;
let hasCheckedMultiRenderSupport = false;
let extDrawBuffer;


const checkMultiRender = function () {
	if(GL.webgl2) {
		return true;
	} else {
		extDrawBuffer = GL.getExtension('WEBGL_draw_buffers');
		return !!extDrawBuffer;
	}
	
	hasCheckedMultiRenderSupport = true;
};

class FrameBuffer {

	constructor(mWidth, mHeight, mParameters = {}, mNumTargets = 1) {
		gl = GL.gl;
		webglDepthTexture = GL.checkExtension('WEBGL_depth_texture');

		this.width            = mWidth;
		this.height           = mHeight;
		this._numTargets 	  = mNumTargets;
		this._multipleTargets = mNumTargets > 1;
		this._parameters = mParameters;

		// this.magFilter  = mParameters.magFilter 	|| gl.LINEAR;
		// this.minFilter  = mParameters.minFilter 	|| gl.LINEAR_MIPMAP_NEAREST;
		// this.wrapS      = mParameters.wrapS 		|| gl.CLAMP_TO_EDGE;
		// this.wrapT      = mParameters.wrapT 		|| gl.CLAMP_TO_EDGE;
		// this.useDepth   = mParameters.useDepth 		|| true;
		// this.useStencil = mParameters.useStencil 	|| false;
		// this.texelType 	= mParameters.type;

		// if(!isPowerOfTwo(this.width) || !isPowerOfTwo(this.height)) {
		// 	this.wrapS = this.wrapT = gl.CLAMP_TO_EDGE;

		// 	if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
		// 		this.minFilter = gl.LINEAR;
		// 	}
		// } 

		if(!hasCheckedMultiRenderSupport) {
			// console.log('Has multi render support  :', checkMultiRender());
			checkMultiRender();
		}
		this._init();
	}


	_init() {
		// let texelType = gl.UNSIGNED_BYTE;
		// if (this.texelType) {
		// 	texelType = this.texelType;
		// }

		// this.texelType = texelType;

		
		this._initTextures();
		
		this.frameBuffer        = gl.createFramebuffer();		
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);

		if(GL.webgl2) {
			// this.renderBufferDepth = gl.createRenderbuffer();
			// gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBufferDepth);
			// gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
			// gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderBufferDepth);

			const buffers = [];
			for (let i = 0; i < this._textures.length; i++) {
				gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, this._textures[i].texture, 0);
				buffers.push(gl[`COLOR_ATTACHMENT${i}`]);
			}

			gl.drawBuffers(buffers);

			gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.glDepthTexture.texture, 0);

		} else {
			for (let i = 0; i < this._textures.length; i++) {
				gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, this._textures[i].texture, 0);	
			}

			if(this._multipleTargets) {
				const drawBuffers = [];
				for(let i=0; i<this._numTargets; i++) {
					console.log(i, extDrawBuffer[`COLOR_ATTACHMENT${i}_WEBGL`]);
					drawBuffers.push(extDrawBuffer[`COLOR_ATTACHMENT${i}_WEBGL`]);
				}

				extDrawBuffer.drawBuffersWEBGL(drawBuffers);	
			}

			if(webglDepthTexture) {
				gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.glDepthTexture.texture, 0);	
			}
		}
		

		//	CHECKING FBO
		const FBOstatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		if(FBOstatus != gl.FRAMEBUFFER_COMPLETE) {
			console.warn('GL_FRAMEBUFFER_COMPLETE failed, CANNOT use Framebuffer');
		}

		//	UNBIND

		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);

		
		//	CLEAR FRAMEBUFFER 

		this.clear();
	}


	_initTextures() {
		this._textures = [];
		console.log('num textures :', this._numTargets);
		for (let i = 0; i < this._numTargets; i++) {
			const glt = this._createTexture2();
			this._textures.push(glt);
		}

		
		if(GL.webgl2) { 
			this.glDepthTexture = this._createTexture(gl.DEPTH_COMPONENT16, gl.UNSIGNED_SHORT, gl.DEPTH_COMPONENT, true);
		} else {
			// this.glDepthTexture = this._createTexture(gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT);
			this.glDepthTexture = this._createTexture2(gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, gl.DEPTH_COMPONENT, { minFilter:GL.LINEAR });
		}
	}


	_createTexture2(mInternalformat, mTexelType, mFormat, mParameters = {}) {
		const parameters = Object.assign({}, this._parameters);
		if(!mFormat) {	mFormat = mInternalformat; }
		
		parameters.internalFormat = mInternalformat || gl.RGBA;
		parameters.format = mFormat;
		parameters.type = parameters.type || mTexelType || GL.UNSIGNED_BYTE;
		for(const s in mParameters) {
			parameters[s] = mParameters[s];
		}

		const texture = new GLTexture2(null, parameters, this.width, this.height);
		return texture;
	}

	_createTexture(mInternalformat, mTexelType, mFormat, forceNearest = false) {
		if(mInternalformat === undefined) {	mInternalformat = gl.RGBA;	}
		if(mTexelType === undefined) {	mTexelType = this.texelType;	}
		if(!mFormat) {	mFormat = mInternalformat; }

		const t = gl.createTexture();
		const glt = new GLTexture(t, true);
		const magFilter = forceNearest ? GL.NEAREST : this.magFilter;
		const minFilter = forceNearest ? GL.NEAREST : this.minFilter;

		gl.bindTexture(gl.TEXTURE_2D, t);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
		gl.texImage2D(gl.TEXTURE_2D, 0, mInternalformat, this.width, this.height, 0, mFormat, mTexelType, null);	
		gl.bindTexture(gl.TEXTURE_2D, null);

		return glt;
	}

	//	PUBLIC METHODS

	bind(mAutoSetViewport=true) {
		if(mAutoSetViewport) {
			GL.viewport(0, 0, this.width, this.height);	
		}
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
	}


	unbind(mAutoSetViewport=true) {
		if(mAutoSetViewport) {
			GL.viewport(0, 0, GL.width, GL.height);	
		}
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);

		this._textures.forEach(texture => {
			texture.generateMipmap();
		});
	}


	clear(r = 0, g = 0, b = 0, a = 0) {
		this.bind();
		GL.clear(r, g, b, a);
		this.unbind();
	}	


	//	TEXTURES

	getTexture(mIndex = 0) {
		return this._textures[mIndex];
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


	showParameters() {
		this._textures[0].showParameters();
	}
}


export default FrameBuffer;