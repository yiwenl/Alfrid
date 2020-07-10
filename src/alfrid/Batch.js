// Batch.js

import GL from './GLTool';

class Batch {

	constructor(mMesh, mShader) {
		this._mesh = mMesh;
		this._shader = mShader;
	}


	//	PUBLIC METHODS

	draw() {
		this._shader.bind();
		GL.draw(this.mesh);
	}


	//	GETTER AND SETTER

	get mesh() {	return this._mesh;	}

	get shader() {	return this._shader;	}

	destroy() {
		this.mesh.destroy();
		const gl = GL.gl;

		gl.useProgram(null);
		gl.deleteProgram(this._shader.shaderProgram);
	}
}

export default Batch;