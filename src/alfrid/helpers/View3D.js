// View3D.js

import Object3D from '../objects/Object3D';
import GLShader from '../GLShader';
import GL from '../GLTool';

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

}


export default View3D;