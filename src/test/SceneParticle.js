// SceneParticle.js
import alfrid, { GL } from '../alfrid';
import ViewSave from './particles/ViewSave';
import ViewAddVel from './particles/ViewAddVel';
import ViewRender from './particles/ViewRender';
import ViewSim from './particles/ViewSim';

window.getAsset = function (id) {	return window.assets.find((a) => a.id === id).file;	};

window.params = {
	numParticles: GL.isMobile ? 24 : 100,
	skipCount:10,
	maxRadius: 2.5,
	range:1.2,
	speed:1.5,
	focus:.79,
	minThreshold:.50,
	maxThreshold:.80,
	isInvert:false,
};

class SceneParticle extends alfrid.Scene {
	constructor() {
		super();

		this._count = 0;
		GL.enableAlphaBlending();
		this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3;
		this.orbitalControl.radius.value = 20;
	}


	_initTextures() {
		const numParticles = params.numParticles;
		const extHalfFloat = GL.getExtension('OES_texture_half_float');
		const o = {
			minFilter:GL.NEAREST,
			magFilter:GL.NEAREST,
			type:extHalfFloat.HALF_FLOAT_OES,
		};

		this._fboCurrentPos = new alfrid.FrameBuffer(numParticles, numParticles, o);
		this._fboTargetPos  = new alfrid.FrameBuffer(numParticles, numParticles, o);
		this._fboCurrentVel = new alfrid.FrameBuffer(numParticles, numParticles, o);
		this._fboTargetVel  = new alfrid.FrameBuffer(numParticles, numParticles, o);
		this._fboExtra  	= new alfrid.FrameBuffer(numParticles, numParticles, o);
		this._fboSpeed      = new alfrid.FrameBuffer(numParticles, numParticles, o);
	}


	_initViews() {
		//	helpers
		this._bCopy = new alfrid.BatchCopy();
		this._bAxis = new alfrid.BatchAxis();
		this._bDots = new alfrid.BatchDotsPlane();


		this._vAddVel = new ViewAddVel();
		this._vRender = new ViewRender();
		this._vSim = new ViewSim();

		this._vSave = new ViewSave();
		GL.setMatrices(this.cameraOrtho);

		this._fboCurrentPos.bind();
		this._vSave.render(0);
		this._fboCurrentPos.unbind();

		this._fboExtra.bind();
		this._vSave.render(1);
		this._fboExtra.unbind();

		this._fboSpeed.bind();
		this._vSave.render(2);
		this._fboSpeed.unbind();

		this._fboTargetPos.bind();
		this._bCopy.draw(this._fboCurrentPos.getTexture());
		this._fboTargetPos.unbind();

		GL.setMatrices(this.camera);
	}


	updateFbo() {
		// 	Update Velocity : bind target Velocity, render simulation with current velocity / current position
		this._fboTargetVel.bind();
		GL.clear(0, 0, 0, 1);
		this._vSim.render(this._fboCurrentVel.getTexture(), this._fboCurrentPos.getTexture(), this._fboExtra.getTexture(), this._fboSpeed.getTexture());
		// this._vSim.render(this._fboCurrentVel.getTexture(), this._fboCurrentPos.getTexture(), this._fboExtra.getTexture(), this._fboSpeed.getTexture() );
		this._fboTargetVel.unbind();


		//	Update position : bind target Position, render addVel with current position / target velocity;
		this._fboTargetPos.bind();
		GL.clear(0, 0, 0, 1);
		this._vAddVel.render(this._fboCurrentPos.getTexture(), this._fboTargetVel.getTexture());
		this._fboTargetPos.unbind();

		//	SWAPPING : PING PONG
		const tmpVel          = this._fboCurrentVel;
		this._fboCurrentVel = this._fboTargetVel;
		this._fboTargetVel  = tmpVel;

		const tmpPos          = this._fboCurrentPos;
		this._fboCurrentPos = this._fboTargetPos;
		this._fboTargetPos  = tmpPos;

	}


	render() {

		this._count ++;
		if(this._count % params.skipCount == 0) {
			this._count = 0;
			this.updateFbo();
		}

		const p = this._count / params.skipCount;

		GL.clear(0, 0, 0, 0);
		this._bAxis.draw();
		// this._bDots.draw();


		this._vRender.render(this._fboTargetPos.getTexture(), this._fboCurrentPos.getTexture(), p, this._fboExtra.getTexture());

		const size = 200;

	}

	resize() {
		GL.setSize(window.innerWidth, window.innerHeight);
		this.camera.setAspectRatio(GL.aspectRatio);
	}
}


export default SceneParticle;