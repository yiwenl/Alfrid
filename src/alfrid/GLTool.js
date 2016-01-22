// GLTool.js

import glm from 'gl-matrix';

class GLTool {
	constructor() {
		this.canvas;
		this._viewport          = [0, 0, 0, 0];
		this.identityMatrix     = glm.mat4.create();
		this._normalMatrix      = glm.mat3.create();
		this._inverseViewMatrix = glm.mat4.create();
		glm.mat4.identity(this.identityMatrix, this.identityMatrix);
	}


	init(mCanvas, mParameters = {}) {
		if(this.canvas !== undefined) {
			this.destroy();
		}
	
		this.canvas = mCanvas;
		this.setSize(window.innerWidth, window.innerHeight);
		this.gl          = this.canvas.getContext('webgl', mParameters) || this.canvas.getContext('experimental-webgl', mParameters);

		//	extensions
		const extensions = ['EXT_shader_texture_lod', 'GL_EXT_shader_texture_lod', 'EXT_sRGB', 'WEBKIT_WEBGL_depth_texture', 'EXT_frag_depth', 'OES_texture_float', 'OES_texture_half_float', 'OES_texture_float_linear', 'OES_texture_half_float_linear', 'OES_standard_derivatives'];
		this.extensions = {};
		for(let i=0; i<extensions.length; i++) {
			this.extensions[extensions[i]] = this.gl.getExtension(extensions[i]);
		}

		//	Copy gl Attributes
		let gl = this.gl;
		this.VERTEX_SHADER   = gl.VERTEX_SHADER;
		this.FRAGMENT_SHADER = gl.FRAGMENT_SHADER;
		this.COMPILE_STATUS  = gl.COMPILE_STATUS;
	}


	//	PUBLIC METHODS

	setViewport(x, y, w, h) {
		var hasChanged = false;
		if(x!==this._viewport[0]) {hasChanged = true;}
		if(y!==this._viewport[1]) {hasChanged = true;}
		if(w!==this._viewport[2]) {hasChanged = true;}
		if(h!==this._viewport[3]) {hasChanged = true;}

		if(hasChanged) {
			this.gl.viewport(x, y, w, h);
			this._viewport = [x, y, w, h];
		}
	}

	clear(r, g, b, a) {
		this.gl.clearColor( r, g, b, a );
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}

	setMatrices(mCamera) {
		this.camera = mCamera;
	}


	useShader(mShader) {
		this.shader = mShader;
		this.shaderProgram = this.shader.shaderProgram;
	}


	rotate(mRotation) {
		glm.mat4.copy(this.matrix, mRotation);

		glm.mat4.multiply(this.matrix, this.camera.matrix, this.matrix);
		glm.mat3.fromMat4(this._normalMatrix, this.matrix);
		glm.mat3.invert(this._normalMatrix, this._normalMatrix);
		glm.mat3.transpose(this._normalMatrix, this._normalMatrix);

		glm.mat3.fromMat4(this._inverseViewMatrix, this.matrix);
		glm.mat3.invert(this._inverseViewMatrix, this._inverseViewMatrix);
	}


	draw() {

		//	DEFAULT MATRICES
		this.shader.uniform('uProjectionMatrix', 'uniformMatrix4fv', this.camera.projection);
		this.shader.uniform('uModelMatrix', 'uniformMatrix4fv', this.identityMatrix);
		this.shader.uniform('uViewMatrix', 'uniformMatrix4fv', this.camera.matrix);
		this.shader.uniform('uNormalMatrix', 'uniformMatrix3fv', this._normalMatrix);
		this.shader.uniform('uViewMatrixInverse', 'uniformMatrix4fv', this._inverseViewMatrix);
		
	}


	setSize(mWidth, mHeight) {
		this._width = mWidth;
		this._height = mHeight;
		this.canvas.width = this._width;
		this.canvas.height = this._height;
		this._aspectRatio = this._width / this._height;
	}


	displayExtensions() {
		console.log('Extensions : ' , this.extensions);
		for(let ext in this.extensions) {
			if(this.extensions[ext]) {
				console.log(ext, ':', this.extensions[ext]);	
			}
		}	
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


	//	GETTER AND SETTERS

	get width() {	return this._width;		}

	get height() {	return this._height;	}



	destroy() {
		this.canvas = null;
		if(this.canvas.parentNode) {
			try {
				this.canvas.parentNode.removeChild(this.canvas);
			} catch (e) {
				console.log('Error : ', e);
			}
		}
	}
}

let GL = new GLTool();

export default GL;
