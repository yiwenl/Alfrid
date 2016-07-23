// ViewInstanced.js

import alfrid, { GL } from '../alfrid';
import vs from './shaders/instanced.vert';
import fs from './shaders/instanced.frag';

const numInstance = Math.pow(40, 3);
const random = function (min, max) { return min + Math.random() * (max - min);	};

class ViewInstanced extends alfrid.View {
	
	constructor() {
		// super(null, fs);
		super(vs, fs);
	}


	_init() {
		const cubeSize = .24;
		const meshCube = alfrid.Geom.cube(cubeSize, cubeSize, cubeSize);

		const mesh = new alfrid.Mesh();

		const positions = meshCube.vertices;
		const coords = meshCube.coords;
		const normals = meshCube.normals;
		const indices = meshCube.indices;

		mesh.bufferVertex(positions);
		mesh.bufferTexCoord(coords);
		mesh.bufferNormal(normals);
		mesh.bufferIndex(indices);

		const positionOffsets = [];
		const colors = [];
		const range = 10;
		let grey;
		for(let i = 0; i < numInstance; i++) {
			positionOffsets.push([random(-range, range), random(-range, range), random(-range, range)]);
			grey = (i + 1) / numInstance;
			colors.push([Math.random(), Math.random(), Math.random()]);
		}

		mesh.bufferInstance(positionOffsets, 'aOffset');
		mesh.bufferInstance(colors, 'aColor');


		this.mesh = mesh;
	}


	render() {
		this.shader.bind();
		// GL.draw(this.mesh);
		GL.drawInstance(this.mesh);
	}


}

export default ViewInstanced;