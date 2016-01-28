// SceneApp.js
import alfrid from '../../../../build/alfrid.js';

import ViewCube from './ViewCube';

class SceneApp extends alfrid.Scene {
	constructor() {
		super();
	}


	_initTextures() {
		console.log('Init textures');
		this._texture = new alfrid.GLTexture(image);
	}

	_initViews() {
		console.log('Init Views');
		this._vCube      = new ViewCube();
		this._bAxis      = new alfrid.BatchAxis();
		this._bDotsPlane = new alfrid.BatchDotsPlane();
	}


	render() {
		this._bAxis.draw();
		this._bDotsPlane.draw();

		this._vCube.render(this._texture);
	}
}


export default SceneApp;