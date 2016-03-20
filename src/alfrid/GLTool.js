// GLTool.js

import glm from 'gl-matrix';

class GLTool {

	constructor() {
		this.canvas;
		this._viewport               = [0, 0, 0, 0];
		this._enabledVertexAttribute = [];
		this.identityMatrix          = glm.mat4.create();
		this._normalMatrix           = glm.mat3.create();
		this._inverseModelViewMatrix = glm.mat3.create();
		this._modelMatrix            = glm.mat4.create();
		this._matrix                 = glm.mat4.create();
		glm.mat4.identity(this.identityMatrix, this.identityMatrix);

		this.isMobile = false;
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			this.isMobile = true;
		}
	}

	//	INITIALIZE

	init(mCanvas, mParameters = {}) {

		if(mCanvas === null || mCanvas === undefined) {
			console.error('Canvas not exist');
			return;
		}
		
		if(this.canvas !== undefined && this.canvas !== null) {
			this.destroy();
		}
		
		this.canvas = mCanvas;
		this.setSize(window.innerWidth, window.innerHeight);
		this.gl          = this.canvas.getContext('webgl', mParameters) || this.canvas.getContext('experimental-webgl', mParameters);
		

		//	extensions
		const extensions = ['EXT_shader_texture_lod', 'EXT_sRGB', 'EXT_frag_depth', 'OES_texture_float', 'OES_texture_half_float', 'OES_texture_float_linear', 'OES_texture_half_float_linear', 'OES_standard_derivatives', 'WEBGL_depth_texture'];
		this.extensions = {};
		for(let i=0; i<extensions.length; i++) {
			this.extensions[extensions[i]] = this.gl.getExtension(extensions[i]);
		}
		

		//	Copy gl Attributes
		let gl                     = this.gl;
		this.VERTEX_SHADER         = gl.VERTEX_SHADER;
		this.FRAGMENT_SHADER       = gl.FRAGMENT_SHADER;
		this.COMPILE_STATUS        = gl.COMPILE_STATUS;
		this.DEPTH_TEST            = gl.DEPTH_TEST;
		this.CULL_FACE             = gl.CULL_FACE;
		this.BLEND                 = gl.BLEND;
		this.POINTS                = gl.POINTS;
		this.LINES                 = gl.LINES;
		this.TRIANGLES             = gl.TRIANGLES;
		
		this.LINEAR                = gl.LINEAR;
		this.NEAREST               = gl.NEAREST;
		this.LINEAR_MIPMAP_NEAREST = gl.LINEAR_MIPMAP_NEAREST;
		this.MIRRORED_REPEAT       = gl.MIRRORED_REPEAT;
		this.CLAMP_TO_EDGE         = gl.CLAMP_TO_EDGE;
		this.SCISSOR_TEST		   = gl.SCISSOR_TEST;
		


		this.enable(this.DEPTH_TEST);
		this.enable(this.CULL_FACE);
		this.enable(this.BLEND);
	}


	//	PUBLIC METHODS

	setViewport(x, y, w, h) {
		let hasChanged = false;
		if(x!==this._viewport[0]) {hasChanged = true;}
		if(y!==this._viewport[1]) {hasChanged = true;}
		if(w!==this._viewport[2]) {hasChanged = true;}
		if(h!==this._viewport[3]) {hasChanged = true;}

		if(hasChanged) {
			this.gl.viewport(x, y, w, h);
			this._viewport = [x, y, w, h];
		}
	}

	scissor(x, y, w, h) {
		this.gl.scissor(x, y, w, h);
	}


	clear(r, g, b, a) {
		this.gl.clearColor( r, g, b, a );
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}


	setMatrices(mCamera) {
		this.camera = mCamera;
		this.rotate(this.identityMatrix);
	}


	useShader(mShader) {
		this.shader = mShader;
		this.shaderProgram = this.shader.shaderProgram;
	}


	rotate(mRotation) {
		glm.mat4.copy(this._modelMatrix, mRotation);
		glm.mat4.multiply(this._matrix, this.camera.matrix, this._modelMatrix);
		glm.mat3.fromMat4(this._normalMatrix, this._matrix);
		glm.mat3.invert(this._normalMatrix, this._normalMatrix);
		glm.mat3.transpose(this._normalMatrix, this._normalMatrix);

		glm.mat3.fromMat4(this._inverseModelViewMatrix, this._matrix);
		glm.mat3.invert(this._inverseModelViewMatrix, this._inverseModelViewMatrix);
	}


	draw(mMesh, drawingType) {

		if(mMesh.length) {
			for(let i =0; i<mMesh.length; i++) {
				this.draw(mMesh[i]);
			}
			return;
		}

		function getAttribLoc(gl, shaderProgram, name) {
			if(shaderProgram.cacheAttribLoc === undefined) {	shaderProgram.cacheAttribLoc = {};	}
			if(shaderProgram.cacheAttribLoc[name] === undefined) {
				shaderProgram.cacheAttribLoc[name] = gl.getAttribLocation(shaderProgram, name);
			}

			return shaderProgram.cacheAttribLoc[name];
		}

		//	ATTRIBUTES
		for(let i=0; i<mMesh.attributes.length; i++) {

			let attribute = mMesh.attributes[i];
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attribute.buffer);
			let attrPosition = getAttribLoc(this.gl, this.shaderProgram, attribute.name);
			this.gl.vertexAttribPointer(attrPosition, attribute.itemSize, this.gl.FLOAT, false, 0, 0);
			
			if(this._enabledVertexAttribute.indexOf(attrPosition) === -1) {
				this.gl.enableVertexAttribArray(attrPosition);
				this._enabledVertexAttribute.push(attrPosition);
			}
			
		}


		//	BIND INDEX BUFFER

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, mMesh.iBuffer);


		//	DEFAULT MATRICES
		if(this.camera !== undefined) {
			this.shader.uniform('uProjectionMatrix', 'mat4', this.camera.projection);	
			this.shader.uniform('uViewMatrix', 'mat4', this.camera.matrix);
		}
		
		this.shader.uniform('uModelMatrix', 'mat4', this._modelMatrix);
		this.shader.uniform('uNormalMatrix', 'mat3', this._normalMatrix);
		this.shader.uniform('uModelViewMatrixInverse', 'mat3', this._inverseModelViewMatrix);

		let drawType = mMesh.drawType;
		if(drawingType !== undefined) {
			drawType = drawingType;
		}
		
		//	DRAWING
		if(drawType === this.gl.POINTS ) {
			this.gl.drawArrays(drawType, 0, mMesh.vertexSize);	
		} else {
			this.gl.drawElements(drawType, mMesh.iBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);	
		}

	}


	setSize(mWidth, mHeight) {
		this._width        = mWidth;
		this._height       = mHeight;
		this.canvas.width  = this._width;
		this.canvas.height = this._height;
		this._aspectRatio  = this._width / this._height;

		if(this.gl) {
			this.viewport(0, 0, this._width, this._height);	
		}
		
	}


	showExtensions() {
		console.log('Extensions : ' , this.extensions);
		for(let ext in this.extensions) {
			if(this.extensions[ext]) {
				console.log(ext, ':', this.extensions[ext]);	
			}
		}	
	}

	checkExtension(mExtension) {
		return !!this.extensions[mExtension];
	}


	getExtension(mExtension) {
		return this.extensions[mExtension];
	}

	//	BLEND MODES

	enableAlphaBlending() {
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);	
	}

	enableAdditiveBlending() {
		this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
	}


	//	GL NATIVE FUNCTIONS

	enable(mParameter) {	this.gl.enable(mParameter);		}

	disable(mParameter) {	this.gl.disable(mParameter);	}

	viewport(x, y, w, h) {	this.setViewport(x, y, w, h);	}


	//	GETTER AND SETTERS

	get width() {	return this._width;		}

	get height() {	return this._height;	}

	get aspectRatio() {	return this._aspectRatio;	}

	//	DESTROY

	destroy() {
		
		if(this.canvas.parentNode) {
			try {
				this.canvas.parentNode.removeChild(this.canvas);
			} catch (e) {
				console.log('Error : ', e);
			}
		}

		this.canvas = null;
	}
}

let GL = new GLTool();

export default GL;
