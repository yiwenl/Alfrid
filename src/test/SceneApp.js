// SceneApp.js
import alfrid, { GL, BatchSky } from '../alfrid';
import ViewPlane from './ViewPlane';
import ViewSphere from './ViewSphere';
import ViewMultiTarget from './ViewMultiTarget';
import ViewObjModel from './ViewObjModel';
import ViewInstanced from './ViewInstanced';
import parse from 'parse-dds';

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

		this.hasRendered = false;

		// this.addTriangle();
		// window.addEventListener('mousedown', ()=>this.addTriangle());
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
		const factory = getAsset('factory');
		this._textureFactory = alfrid.GLCubeTexture.parseDDS(factory);

		const cubeTextures = [];
		const faces = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'];
		const NUM_LEVELS = 8;

		for (let i = 0; i <= NUM_LEVELS; i++) {
			for (let j = 0; j < faces.length; j++) {
				const id = `mip${i}_rad_${faces[j]}`;
				const file = alfrid.HDRLoader.parse(getAsset(id));
				// console.log(id, file.shape);
				cubeTextures.push(file);	
			}
		}

		cubeTextures.length = 6;

		// console.log('cubeTextures : ', cubeTextures.length);
		this._textureRad = new alfrid.GLCubeTexture(cubeTextures);

		this.lod = 0;
		gui.add(this, 'lod', 0, 6).listen();

		this._fboRenderSimple = new alfrid.FrameBuffer(GL.width, GL.height);
		this._fboRender = new alfrid.FrameBuffer(GL.width, GL.height, {}, true);

		this._textureStars = new alfrid.GLTexture(getAsset('starsmap'));


		const irrposx = alfrid.HDRLoader.parse(getAsset('irr_posx'));
		const irrnegx = alfrid.HDRLoader.parse(getAsset('irr_negx'));
		const irrposy = alfrid.HDRLoader.parse(getAsset('irr_posy'));
		const irrnegy = alfrid.HDRLoader.parse(getAsset('irr_negy'));
		const irrposz = alfrid.HDRLoader.parse(getAsset('irr_posz'));
		const irrnegz = alfrid.HDRLoader.parse(getAsset('irr_negz'));

		this._textureIrr = new alfrid.GLCubeTexture([irrposx, irrnegx, irrposy, irrnegy, irrposz, irrnegz]);
		this._textureRad = alfrid.GLCubeTexture.parseDDS(getAsset('radiance'));
		this._textureAO = new alfrid.GLTexture(getAsset('aoTree'));
	}
	

	_initViews() {
		this._bCopy      = new alfrid.BatchCopy();
		this._bAxis      = new alfrid.BatchAxis();
		this._bDotPlane  = new alfrid.BatchDotsPlane();
		this._bBall      = new alfrid.BatchBall();
		this._bLine      = new alfrid.BatchLine();
		this._bSkybox    = new alfrid.BatchSkybox();
		this._bSky 		 = new BatchSky();
		
		this._vPlane     = new ViewPlane();
		this._vSphere    = new ViewSphere();
		this._vMulti     = new ViewMultiTarget();
		this._vObj       = new ViewObjModel();
		this._vInstanced = new ViewInstanced();

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
		if(this.hasRendered) return;
		this._time += 0.01;
		const radius = .6;
		const dist = 10;
		this.ray.direction[0] = Math.cos(this._time) * radius;
		this.ray.direction[1] = Math.sin(this._time) * radius;

		this.orbitalControl.ry.value += 0.001;

		this._bSky.draw(this._textureStars);

		this._bAxis.draw();
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

		this.lod = Math.sin(this._time) * 3 + 3;
/*
		//	LOD
		this._bSkybox.draw(this._textureFactory);
		this._vSphere.render(this._textureFactory, this.lod, [2, 0, 0]);
		this._vSphere.render(this._textureRad, this.lod, [-2, 0, 0]);
*/

		this._vObj.render(this._textureRad, this._textureIrr, this._textureAO);

		//	Multiple rendering target		
/*		
		this._fboRender.bind();
		GL.clear(0, 0, 0, 0);
		this._vMulti.render();
		this._fboRender.unbind();

		this._fboRenderSimple.bind();
		GL.clear(0, 0, 0, 0);
		this._vSphere.render(this._textureFactory, this.lod, [0, 0, 0]);
		this._fboRenderSimple.unbind();

		const size = GL.width / 4;
		for(let i = 0; i < 4; i++) {
			GL.viewport(size * i, 0, size, size / GL.aspectRatio);
			this._bCopy.draw(this._fboRender.getTexture(i));
		}

		GL.viewport(0, size / GL.aspectRatio, size, size / GL.aspectRatio);
		this._bCopy.draw(this._fboRenderSimple.getTexture());
*/		

		// this._vInstanced.render();
		// this.hasRendered = true;
	}


	resize() {
		GL.setSize(window.innerWidth, window.innerHeight);
		this.camera.setAspectRatio(GL.aspectRatio);
	}
}


export default SceneApp;