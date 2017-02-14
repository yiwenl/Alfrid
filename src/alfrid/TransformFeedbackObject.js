// TransformFeedbackObject.js

import GL from './GLTool';
import GLShader from './GLShader';
import Mesh from './Mesh';

let gl;

class TransformFeedbackObject {


	constructor(strVertexShader, strFragmentShader) {
		gl = GL.gl;
		this.shader = new GLShader(strVertexShader, strFragmentShader);
		this._varyings = [];
		this.transformFeedback = gl.createTransformFeedback();
		this._init();
	}


	_init() {
		this._meshCurrent = new Mesh();
		this._meshTarget = new Mesh();
	}


	bufferData(mData, mName, mVaryingName) {
		this._meshCurrent.bufferData(mData, mName);
		this._meshTarget.bufferData(mData, mName);
		this._varyings.push(mVaryingName);
	}

	uniform(mName, mType, mValue) {
		this.shader.uniform(mName, mType, mValue);
	}

	_swap() {
		const tmp          = this._meshCurrent;
		this._meshCurrent = this._meshTarget;
		this._meshTarget  = tmp;
	}

	render() {
		this.shader.bind();
		GL.drawTransformFeedback(this);

		this._swap();
	}


	get meshCurrent() {	return this._meshCurrent;	}
	get meshTarget() {	return this._meshTarget;	}
}


export default TransformFeedbackObject;