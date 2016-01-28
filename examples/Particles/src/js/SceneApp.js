// SceneApp.js
import alfrid from '../../../../build/alfrid.js';
import ViewSave from './ViewSave';
import ViewRender from './ViewRender';
import ViewSimulation from './ViewSimulation';


let GL;

class SceneApp extends alfrid.Scene {
	constructor() {
		GL = alfrid.GL;
		super();
	}


	_initTextures() {
		console.log('Init textures');

		//	FBOS
		const numParticles = params.numParticles;
		const o = {
			minFilter:GL.NEAREST,
			magFilter:GL.NEAREST
		}
		this._fboCurrent = new alfrid.FrameBuffer(numParticles*2, numParticles*2, o);
		this._fboTarget  = new alfrid.FrameBuffer(numParticles*2, numParticles*2, o);
	}
	

	_initViews() {
		console.log('Init Views');
		this._bAxis      = new alfrid.BatchAxis();
		this._bDotsPlane = new alfrid.BatchDotsPlane();
		this._bCopy 	 = new alfrid.BatchCopy();

		this._vRender	 = new ViewRender();
		this._vSim		 = new ViewSimulation();

		//	SAVE INIT POSITIONS
		this._vSave = new ViewSave();
		GL.setMatrices(this.cameraOrtho);

		this._fboCurrent.bind();
		GL.clear(0, 0, 0, 0);
		this._vSave.render();

		this._fboCurrent.unbind();
		GL.viewport(0, 0, GL.width, GL.height);
		GL.setMatrices(this.camera);
	}


	updateFbo() {
		GL.setMatrices(this.cameraOrtho);

		this._fboTarget.bind();
		GL.clear(0, 0, 0, 0);
		this._vSim.render(this._fboCurrent.getTexture());
		this._fboTarget.unbind();
		GL.viewport(0, 0, GL.width, GL.height);
		GL.setMatrices(this.camera);

		//	PING PONG
		var tmp = this._fboTarget;
		this._fboTarget = this._fboCurrent;
		this._fboCurrent = tmp;
	}


	render() {
		this.updateFbo();

		this._bAxis.draw();
		this._bDotsPlane.draw();

		this._vRender.render(this._fboCurrent.getTexture());

		GL.setMatrices(this.cameraOrtho);
		GL.disable(GL.DEPTH_TEST);
		let viewSize = this._fboCurrent.width/2;
		GL.viewport(0, 0, viewSize, viewSize);

		this._bCopy.draw(this._fboCurrent.getTexture());
		GL.enable(GL.DEPTH_TEST);
	}
}


export default SceneApp;