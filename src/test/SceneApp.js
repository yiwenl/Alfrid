// SceneApp.js
import alfrid, { GL } from '../alfrid';
import Ray from './Ray';

class SceneApp extends alfrid.Scene {
	constructor() {
		super();
		GL.enableAlphaBlending();
		this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3;

		const orgin = vec3.fromValues(0, 0, 1);
		const direction = vec3.fromValues(0, 0, -1);
		const ray = new Ray(orgin, direction);
		const center = vec3.fromValues(0, 0, 0);

		console.log('Intersects : ');
		console.log(ray.intersectsSphere(center, 2));
		console.log(ray.intersectsSphere(center, .5));

		console.log('Intersect Point : ');
		console.log(ray.intersectSphere(center, 2));
		console.log(ray.intersectSphere(center, .5));
	}


	_initTextures() {
	}
	

	_initViews() {
		this._bCopy      = new alfrid.BatchCopy();
		this._bAxis 	 = new alfrid.BatchAxis();
		this._bDotPlane  = new alfrid.BatchDotsPlane();
	}


	render() {
		this.orbitalControl.ry.value += 0.001;
		this._bAxis.draw();
		this._bDotPlane.draw();
	}


	resize() {
		GL.setSize(window.innerWidth, window.innerHeight);
		this.camera.setAspectRatio(GL.aspectRatio);
	}
}


export default SceneApp;