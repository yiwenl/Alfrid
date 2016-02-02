// SceneApp.js
import alfrid from '../../../../build/alfrid.js';
import ViewSkybox from './ViewSkybox';
import ViewDome from './ViewDome';
import ViewSphere from './ViewSphere';
import ViewColorSphere from './ViewColorSphere';

var glslify = require("glslify");

let GL = alfrid.GL;

class SceneApp extends alfrid.Scene {
	constructor() {
		super();
		this.time = 0;
		this.orbitalControl.invertControl = true;
	}


	_initTextures() {
		console.log('Init textures');
		this._texture = new alfrid.GLTexture(image);

		this.camera.setPerspective(120 * Math.PI/180, GL.aspectRatio, 0.1, 1000);
		this.orbitalControl.radius.value = 2.;

		this.cameraCube = new alfrid.CameraCube();
		this.orbitalControl.lockZoom(true);
		
		this.mesh = alfrid.Geom.plane(2, 2, 1);
		this.shader = new alfrid.GLShader(null, glslify('../shaders/test.frag'));

		let fboSize = 512;
		this._cubeFbo = new alfrid.CubeFrameBuffer(fboSize);
	}
	

	_initViews() {
		console.log('Init Views');
		this._bAxis        = new alfrid.BatchAxis();
		this._bDotsPlane   = new alfrid.BatchDotsPlane();
		this._bCopy        = new alfrid.BatchCopy();
		this._vSkyBox      = new ViewSkybox();
		this._vDome        = new ViewDome();
		this._vSphere      = new ViewSphere();
		this._vColorSphere = new ViewColorSphere();
	}


	render() {
		this.time += 0.01;

		this.orbitalControl._rx.value = .3;
		this.orbitalControl._ry.value -= .01;

		GL.setMatrices(this.cameraCube);
		this._vDome.time += .01;

		let r = 1.5;
		let pos = [Math.cos(this.time)*r, Math.sin(this.time*.316456) + Math.cos(this.time* .87534), Math.sin(this.time) * r];

		for(var i=0; i<6; i++) {
			this._cubeFbo.bind(i);
			GL.clear();
			this.cameraCube.face(i);
			this._vDome.render();
			this._vColorSphere.render(pos, .1);
			// this._vSphere.render(this._cubeFbo.getTexture(), [2, 0, 0]);

			this._cubeFbo.unbind();
		}

		GL.setMatrices(this.camera);
		GL.clear(0, 0, 0, 0);

		this._bAxis.draw();
		this._bDotsPlane.draw();
		this._vColorSphere.render(pos, .1);
		this._vSkyBox.render(this._cubeFbo.getTexture());
		this._vSphere.render(this._cubeFbo.getTexture(), this._texture);
	}
}


export default SceneApp;