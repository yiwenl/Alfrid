// View3D.js

import GL from '../GLTool';
import GLShader from '../GLShader';
import Object3D from '../objects/Object3D';

class View3D extends Object3D {
	constructor(mStrVertex, mStrFrag) {
		super();

		this._children = [];
		this.shader = new GLShader(mStrVertex, mStrFrag);
		this._init();
	}


	//	PROTECTED METHODS

	_init() {

	}

	// 	PUBLIC METHODS

	render() {
	}

	destroy() {
		this.shader.destroy();
	}

}


export default View3D;