// SceneApp.js
import alfrid, { GL } from '../alfrid';
import ViewPlane from './ViewPlane';
import ViewSphere from './ViewSphere';

window.getAsset = function (id) {
	return window.assets.find((a) => a.id === id).file;
};

class SceneApp extends alfrid.Scene {
	constructor() {
		super();
		GL.enableAlphaBlending();
		GL.disable(GL.CULL_FACE);
		this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3;

		const orgin = vec3.fromValues(0, 0, 1);
		const direction = vec3.fromValues(0, .1, -1);
		const ray = new alfrid.Ray(orgin, direction);
		const center = vec3.fromValues(0, 0, 0);
		this.ray = ray;

		this.rayMouse = new alfrid.Ray(this.camera.position, vec3.fromValues(0, 0, -1));

		this.a = [-1, 1, 0];
		this.b = [1, 1, 0];
		this.c = [0, -1, 0];
		this._size = [.1, .1, .1];
		this._time = 0;

		this.shader = new alfrid.GLShader();
		this.mesh = new alfrid.Mesh();
		this.positions = [];
		this.coords = [];
		this.indices = [];
		this.count = 0;

		this.addTriangle();

		window.addEventListener('mousedown', ()=>this.addTriangle());
	}


	addTriangle() {
		const random = function (min, max) { return min + Math.random() * (max - min);	};
		const range = 2;
		const cx = random(-range, range);
		const cy = random(-range, range);
		const cz = random(-range, range);

		this.positions.push([cx - 1, cy + 1, cz]);
		this.positions.push([cx + 1, cy + 1, cz]);
		this.positions.push([cx, cy - 1, cz]);

		this.coords.push([0, 0]);
		this.coords.push([1, 0]);
		this.coords.push([0.5, 1]);

		this.indices.push(this.count * 3);
		this.indices.push(this.count * 3 + 1);
		this.indices.push(this.count * 3 + 2);

		this.mesh.bufferVertex(this.positions, true);
		this.mesh.bufferTexCoord(this.coords, true);
		this.mesh.bufferIndex(this.indices, true);
		this.mesh.bufferNormal(this.positions, true);

		this.count ++;
	}


	_initTextures() {
		const radPosx = alfrid.HDRLoader.parse(getAsset('rad_posx'));
		const radNegx = alfrid.HDRLoader.parse(getAsset('rad_negx'));
		const radPosy = alfrid.HDRLoader.parse(getAsset('rad_posy'));
		const radNegy = alfrid.HDRLoader.parse(getAsset('rad_negy'));
		const radPosz = alfrid.HDRLoader.parse(getAsset('rad_posz'));
		const radNegz = alfrid.HDRLoader.parse(getAsset('rad_negz'));

		// this._textureRad = new alfrid.GLCubeTexture([radPosx, radNegx, radPosy, radNegy, radPosz, radNegz]);


		const cubeTextures = [];
		const faces = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'];
		const NUM_LEVELS = 8;

		for (let i = 0; i <= NUM_LEVELS; i++) {
			for (let j = 0; j < faces.length; j++) {
				const id = `mip${i}_rad_${faces[j]}`;
				const file = alfrid.HDRLoader.parse(getAsset(id));
				console.log(id, file.shape);
				cubeTextures.push(file);	
			}
		}

		// cubeTextures.length = 6;

		console.log('cubeTextures : ', cubeTextures.length);
		this._textureRad = new alfrid.GLCubeTexture(cubeTextures);
	}
	

	_initViews() {
		this._bCopy      = new alfrid.BatchCopy();
		this._bAxis 	 = new alfrid.BatchAxis();
		this._bDotPlane  = new alfrid.BatchDotsPlane();
		this._bBall		 = new alfrid.BatchBall();
		this._bLine 	 = new alfrid.BatchLine();
		this._bSkybox 	 = new alfrid.BatchSkybox();

		this._vPlane  	 = new ViewPlane();
		this._vSphere 	 = new ViewSphere();

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
		
		/*
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
		
*/
		// this._vPlane.render();

		// this.shader.bind();
		// GL.draw(this.mesh);

		this._bSkybox.draw(this._textureRad);
		this._vSphere.render(this._textureRad);
	}


	resize() {
		GL.setSize(window.innerWidth, window.innerHeight);
		this.camera.setAspectRatio(GL.aspectRatio);
	}
}


export default SceneApp;