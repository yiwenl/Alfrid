// SceneGrass.js

import alfrid, { GL } from '../alfrid';
import ViewGrass from './grass/ViewGrass';

window.getAsset = function (id) {
	return window.assets.find((a) => a.id === id).file;
};

window.params = {
	grassRange: 5,
	numTiles: 3,
};

class SceneGrass extends alfrid.Scene {
	constructor() {
		super();
		this.camera.setPerspective(90 * Math.PI / 180, GL.aspectRatio, 0.1, 100);
		this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3;
	}

	_initTextures() {
	}
	

	_initViews() {
		this._bCopy      = new alfrid.BatchCopy();
		this._bAxis      = new alfrid.BatchAxis();
		this._bDotPlane  = new alfrid.BatchDotsPlane();

		this._vGrass 	= new ViewGrass();
	}


	render() {
		this._bAxis.draw();
		this._bDotPlane.draw();

		this._vGrass.render();
	}
}


export default SceneGrass;