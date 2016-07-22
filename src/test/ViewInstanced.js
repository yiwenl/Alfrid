// ViewInstanced.js

import alfrid, { GL } from '../alfrid';
import vs from './shaders/instanced.vert';
import fs from './shaders/instanced.frag';

const numInstance = 10;

class ViewInstanced extends alfrid.View {
	
	constructor() {
		// super(null, fs);
		super(vs, fs);
	}


	_init() {
		const cubeSize = 1;
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
		let grey;
		for(let i = 0; i < numInstance; i++) {
			positionOffsets.push([-numInstance / 2 + i, 0, 0]);
			grey = (i + 1) / numInstance;
			colors.push([grey, grey, grey]);
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