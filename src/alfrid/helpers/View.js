// View.js
import GLShader from '../GLShader';

class View {
	constructor(mStrVertex, mStrFrag) {
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

export default View;