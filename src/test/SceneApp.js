// SceneApp.js
import alfrid, { GL } from '../alfrid';
import Ray from './Ray';

class SceneApp extends alfrid.Scene {
	constructor() {
		super();
		GL.enableAlphaBlending();
		this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3;

		const orgin = vec3.fromValues(0, 0, 1);
		const direction = vec3.fromValues(0, .1, -1);
		const ray = new Ray(orgin, direction);
		const center = vec3.fromValues(0, 0, 0);

		console.log('Intersects : ');
		console.log(ray.intersectsSphere(center, 2));
		console.log(ray.intersectsSphere(center, .5));

		console.log('Intersect Point : ');
		console.log(ray.intersectSphere(center, 2));
		console.log(ray.intersectSphere(center, .5));

		this.ray = ray;


		this.a = [-1, 1, 0];
		this.b = [1, 1, 0];
		this.c = [0, -1, 0];
		this._size = [.1, .1, .1];
		this._time = 0;
	}


	_initTextures() {
	}
	

	_initViews() {
		this._bCopy      = new alfrid.BatchCopy();
		this._bAxis 	 = new alfrid.BatchAxis();
		this._bDotPlane  = new alfrid.BatchDotsPlane();
		this._bBall		 = new alfrid.BatchBall();
		this._bLine 	 = new alfrid.BatchLine();
	}


	render() {
		this._time += 0.01;
		const radius = .75;
		this.ray.direction[0] = Math.cos(this._time) * radius;
		this.ray.direction[1] = Math.sin(this._time) * radius;

		this.orbitalControl.ry.value += 0.001;
		this._bAxis.draw();
		this._bDotPlane.draw();

		this._bBall.draw(this.a, this._size, [1, .5, 0]);
		this._bBall.draw(this.b, this._size, [1, .5, 0]);
		this._bBall.draw(this.c, this._size, [1, .5, 0]);
		this._bBall.draw(this.ray.origin, [.05, .05, .05], [1, 1, 1]);
		this._bBall.draw(this.ray.at(5), [.05, .05, .05], [1, 1, 1]);

		const hit = this.ray.intersectTriangle(this.c, this.b, this.a, true);

		if(hit) {
			this._bBall.draw(hit, [.05, .05, .05], [1, 0, 0]);
		}

		this._bLine.draw(this.ray.origin, this.ray.at(5));
	}


	resize() {
		GL.setSize(window.innerWidth, window.innerHeight);
		this.camera.setAspectRatio(GL.aspectRatio);
	}
}


export default SceneApp;