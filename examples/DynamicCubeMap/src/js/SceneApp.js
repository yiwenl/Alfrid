// SceneApp.js
import alfrid from '../../../../build/alfrid.js';
import ViewSkybox from './ViewSkybox';
import ViewDome from './ViewDome';

var glslify = require("glslify");

let GL = alfrid.GL;;

class SceneApp extends alfrid.Scene {
	constructor() {
		super();
		this.time = 0;
	}


	_initTextures() {
		console.log('Init textures');
		this._texture = new alfrid.GLTexture(image);

		let fboSize = 256;
		this.mesh = alfrid.Geom.plane(2, 2, 1);
		this.shader = new alfrid.GLShader(null, glslify('../shaders/test.frag'));

		this._cubeFbo = new alfrid.CubeFrameBuffer(512);
	}
	

	_initViews() {
		console.log('Init Views');
		this._bAxis      = new alfrid.BatchAxis();
		this._bDotsPlane = new alfrid.BatchDotsPlane();
		this._bCopy 	 = new alfrid.BatchCopy();
		this._vSkyBox 	 = new ViewSkybox();
		this._vDome 	 = new ViewDome();
	}


	render() {
		GL.setMatrices(this.cameraOrtho);
		this.shader.bind();
		for(var i=0; i<6; i++) {
			this._cubeFbo.bind(i);
			GL.clear();
			GL.draw(this.mesh);
			this._cubeFbo.unbind();
		}


		// GL.viewport(0, 0, GL.width, GL.height);
		GL.setMatrices(this.camera);

		this._bAxis.draw();
		this._bDotsPlane.draw();

		this._vDome.render();

		this._vSkyBox.render(this._cubeFbo.getTexture());
	}
}


export default SceneApp;