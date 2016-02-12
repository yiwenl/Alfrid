// SceneApp.js
import alfrid from '../../../../build/alfrid.js';
import ViewCube from './ViewCube';
import ViewBall from './ViewBall';
import ViewSSAO from './ViewSSAO';

let random = function(min, max) { return min + Math.random() * (max - min);	};
let GL = alfrid.GL;

class SceneApp extends alfrid.Scene {
	constructor() {
		super();
	}


	_initTextures() {
		console.log('Init textures');
		this.camera.setPerspective(Math.PI/2, GL.aspectRatio, 1, 100);
		this._texture = new alfrid.GLTexture(image);
		this._fboRender = new alfrid.FrameBuffer(GL.width, GL.height);
		this.orbitalControl.radius.value = 5;
		// console.log(this.orbitalControl.radius.value);

	}
	

	_initViews() {
		console.log('Init Views');
		this._vCube      = new ViewCube();
		this._vBall		 = new ViewBall();
		this._bAxis      = new alfrid.BatchAxis();
		this._bDotsPlane = new alfrid.BatchDotsPlane();
		this._bCopy 	 = new alfrid.BatchCopy();
		this._vSSAO 	 = new ViewSSAO();

		const r = 1;
		this._balls 	 = [];

		for(let i=0; i<10; i++) {
			let b = {
				position:[random(-r, r), random(-r, r), random(-r, r)],
				scale:random(.5, 1)
			}

			this._balls.push(b);
		}
	}


	render() {
		// this._bAxis.draw();
		// this._bDotsPlane.draw();

		// this._vCube.render(this._texture);

		this._fboRender.bind();
		GL.clear(0, 0, 0, 0);
		for(let i=0; i<this._balls.length;i++) {
			let b = this._balls[i];
			this._vBall.render(b.position, b.scale);
		}
		this._fboRender.unbind();


		GL.setMatrices(this.cameraOrtho);
		GL.disable(GL.DEPTH_TEST);
		GL.clear(1, 0, 0, 1);
		this._vSSAO.render(this._fboRender.getDepthTexture());

		// GL.viewport(0, 0, 256, 256/GL.aspectRatio);
		// this._bCopy.draw(this._fboRender.getTexture());
		// GL.viewport(256, 0, 256, 256/GL.aspectRatio);
		// this._bCopy.draw(this._fboRender.getDepthTexture());

		
		GL.enable(GL.DEPTH_TEST);
		GL.viewport(GL.width, GL.height);
	}
}


export default SceneApp;