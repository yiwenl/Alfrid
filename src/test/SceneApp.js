// SceneApp.js
import alfrid, { GL } from '../alfrid';
import ViewPlane from './ViewPlane';

class SceneApp extends alfrid.Scene {
	constructor() {
		super();
		GL.enableAlphaBlending();
		// this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3;

		const orgin = vec3.fromValues(0, 0, 1);
		const direction = vec3.fromValues(0, .1, -1);
		const ray = new alfrid.Ray(orgin, direction);
		const center = vec3.fromValues(0, 0, 0);

		console.log('Intersects : ');
		console.log(ray.intersectsSphere(center, 2));
		console.log(ray.intersectsSphere(center, .5));

		console.log('Intersect Point : ');
		console.log(ray.intersectSphere(center, 2));
		console.log(ray.intersectSphere(center, .5));

		this.ray = ray;

		this.rayMouse = new alfrid.Ray(this.camera.position, vec3.fromValues(0, 0, -1));

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

		this._vPlane  	 = new ViewPlane();


		window.addEventListener('mousemove', (e) => this._onMove(e));
	}


	_onMove(e) {
		let mx = e.clientX;
		let my = e.clientY;

		mx = (mx / window.innerWidth) * 2 - 1;
		my = - (my / window.innerHeight) * 2 + 1;

		const screenPos = [mx, my, 0];
		this.camera.generateRay(screenPos, this.rayMouse);
	}


	render() {
		this._time += 0.01;
		const radius = .6;
		const dist = 10;
		this.ray.direction[0] = Math.cos(this._time) * radius;
		this.ray.direction[1] = Math.sin(this._time) * radius;

		this.orbitalControl.ry.value += 0.001;
		// this._bAxis.draw();
		this._bDotPlane.draw();

		// this._bBall.draw(this.a, this._size, [1, .5, 0]);
		// this._bBall.draw(this.b, this._size, [1, .5, 0]);
		// this._bBall.draw(this.c, this._size, [1, .5, 0]);
		
		
		this._bBall.draw(this.ray.origin, [.05, .05, .05], [1, 1, 1]);
		this._bBall.draw(this.ray.at(5), [.05, .05, .05], [1, 1, 1]);


		const faces = this._vPlane.mesh.faces;
		const faceVertices = faces.map((face)=>(face.vertices));
		this._bLine.draw(this.ray.origin, this.ray.at(5));

		let hit;		
		for(let i = 0; i < faceVertices.length; i++) {
			const vertices = faceVertices[i];
			hit = this.rayMouse.intersectTriangle(vertices[0], vertices[1], vertices[2]);
			if(hit) {
				break;
			}
		}


		if(hit) {
			this._bBall.draw(hit, [.05, .05, .05], [1, 0, 0]);
		}

		this._bBall.draw(this.rayMouse.at(15), [.1, .1, .1], [1, .6, 1]);
		this._vPlane.render();
	}


	resize() {
		GL.setSize(window.innerWidth, window.innerHeight);
		this.camera.setAspectRatio(GL.aspectRatio);
	}
}


export default SceneApp;