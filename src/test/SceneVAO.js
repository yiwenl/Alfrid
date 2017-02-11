// SceneVAO.js

import alfrid, { GL } from '../alfrid';

class SceneVAO extends alfrid.Scene {

	constructor() {
		super();

		this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3;
	}

	_initViews() {
		this._bAxis = new alfrid.BatchAxis();
		this._bDots = new alfrid.BatchDotsPlane();

		this.shader = new alfrid.GLShader();
		this.mesh = alfrid.Geom.cube(2, 2, 2);
	}

	render() {
		this._bAxis.draw();
		this._bDots.draw();

		this.shader.bind();
		GL.draw(this.mesh);
	}

	resize() {
		GL.setSize(window.innerWidth, window.innerHeight);
		this.camera.setAspectRatio(GL.aspectRatio);
	}
}

export default SceneVAO;