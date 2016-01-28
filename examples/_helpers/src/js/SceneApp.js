// SceneApp.js
import alfrid from '../../../../build/alfrid.js';
import ViewCube from './ViewCube';

let GL;

class SceneApp extends alfrid.Scene {
	constructor() {
		super();

		GL = alfrid.GL;
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
		this._bCopy 	 = new alfrid.BatchCopy();
	}


	render() {
		this._bAxis.draw();
		this._bDotsPlane.draw();

		this._vCube.render(this._texture);


		GL.setMatrices(this.cameraOrtho);
		GL.disable(GL.DEPTH_TEST);
		GL.viewport(0, 0, 256, 256);
		this._bCopy.draw(this._texture);
		GL.enable(GL.DEPTH_TEST);
	}
}


export default SceneApp;