// SceneVAO.js

import alfrid, { GL } from '../alfrid';
import fs from './shaders/normal.frag';
import vsArray from './shaders/array.vert';
import fsArray from './shaders/array.frag';
import vsInstanced from './shaders/testInstance.vert';

class SceneVAO extends alfrid.Scene {

	constructor() {
		super();
		this.time = 0;
		this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3;
	}

	_initViews() {
		this._bAxis = new alfrid.BatchAxis();
		this._bDots = new alfrid.BatchDotsPlane();

		this.shader = new alfrid.GLShader(vsInstanced);
		this.shader1 = new alfrid.GLShader(vsInstanced);
		this.mesh = alfrid.Geom.cube(1, 1, 1);

		this.shaderArray = new alfrid.GLShader(vsArray, fsArray);


		this.meshTri = new alfrid.Mesh(4);
		this.positions = [[2, 0, 0], [3, 0, 0], [2, 1, 0] ];
		this.uvs = [[1, 0], [0, 1], [1, 1] ];
		this.normals = [[0, 0, -1], [0, 0, -1], [0, 0, -1]];
		this.index = [0, 1, 2];

		this.positionOffset = [[0, 0, 0], [0, 0, -2], [0, 0, 2]];
		this.positionOffset1 = [[0, 0, 0], [-4, 0, 0]];
		this.mesh.bufferInstance(this.positionOffset, 'aPosOffset');
		this.meshTri.bufferInstance(this.positionOffset1, 'aPosOffset');

		this.meshTri.bufferVertex(this.positions);
		this.meshTri.bufferTexCoord(this.uvs);
		this.meshTri.bufferNormal(this.normals);
		this.meshTri.bufferIndex(this.index);

		const { vertices, coords, normals, indices } = this.meshTri;
		// console.log('Triangle : ', vertices, coords, normals, indices);

		const attr = this.meshTri.getAttribute('aVertexPosition');
		// console.log('Attr :', attr);
		this.meshTri.generateFaces();

		this.meshPlane = alfrid.Geom.plane(5, 5, 1);

		this._uniformObj = {
			time:0,
			uPosOffset:[1, 1],
			colors:[
				[0, 0, .9],
				[1, 1, 1],
				[.9, 0, 0]
			]
		};

	}

	render() {
		this.time += 0.01;
		this._uniformObj.time += 0.001;
		this._bAxis.draw();
		this._bDots.draw();

		// this.shader.bind();
		// GL.draw(this.mesh);

		// this.shader1.bind();
		// this.positions[1][1] = Math.sin(this.time) * 0.5;
		// this.positions[2][0] = Math.cos(this.time) * 0.5 + 2;
		// this.meshTri.bufferVertex(this.positions);
		// GL.draw(this.meshTri);

		this.shaderArray.bind();
		this.shaderArray.uniform(this._uniformObj);
		GL.draw(this.meshPlane);
	}

	resize() {
		GL.setSize(window.innerWidth, window.innerHeight);
		this.camera.setAspectRatio(GL.aspectRatio);
	}
}

export default SceneVAO;