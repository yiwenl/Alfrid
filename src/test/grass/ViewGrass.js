// ViewGrass.js

import alfrid, { GL } from '../../alfrid';
import vs from '../shaders/grass/grass.vert';
import fs from '../shaders/grass/grass.frag';

const random = function (min, max) { return min + Math.random() * (max - min);	};
const colours = [
	[64 / 255, 109 / 255, 26 / 255],
	[97 / 255, 148 / 255, 41 / 255],
	[113 / 255, 162 / 255, 55 / 255],
	[98 / 255, 154 / 255, 39 / 255],
	[128 / 255, 171 / 255, 71 / 255]
];

class ViewGrass extends alfrid.View {
	
	constructor() {
		super(vs, fs);
		this.time = Math.random() * 0xFF;
	}


	_init() {
		this.mesh = new alfrid.Mesh();

		const positions = [];
		const coords = [];
		const indices = [0, 1, 2, 0, 2, 3];
		const normals = [];
		const NUM_GRASS = 5000;
		const RANGE = params.grassRange;

		const W = .1;
		const H = 1;
		positions.push([-W, 0, 0]);
		positions.push([ W, 0, 0]);
		positions.push([ W, H, 0]);
		positions.push([-W, H, 0]);

		coords.push([0, 0]);
		coords.push([1, 0]);
		coords.push([1, 1]);
		coords.push([0, 1]);

		normals.push([0, 0, 1]);
		normals.push([0, 0, 1]);
		normals.push([0, 0, 1]);
		normals.push([0, 0, 1]);

		this.mesh.bufferVertex(positions);
		this.mesh.bufferNormal(normals);
		this.mesh.bufferTexCoord(coords);
		this.mesh.bufferIndex(indices);

		const positionOffsets = [];
		const colors = [];

		function getColor() {
			return colours[Math.floor(Math.random() * colours.length)];
		}

		this.numInstance = NUM_GRASS;
		for(let i = 0; i < this.numInstance; i++) {
			positionOffsets.push([random(-RANGE, RANGE), random(1, 1.5), random(-RANGE, RANGE), Math.random() * Math.PI * 2]);
			colors.push(getColor());
		}

		console.log('Number of Grass : ', positionOffsets.length);

		this.mesh.bufferInstance(positionOffsets, 'aPosOffset');
		this.mesh.bufferInstance(colors, 'aColor');
	}


	render() {
		this.time += 0.01;
		this.shader.bind();
		this.shader.uniform('uTime', 'float', this.time);
		const numTiles = params.numTiles;
		const pos = [0, 0, 0];
		const uvOffset = [0, 0];
		const r = params.grassRange * 2.0;
		const start = (-numTiles / 2 + 0.5) * r;

		for(let j = 0; j < numTiles; j++) {
			for(let i = 0; i < numTiles; i++) {
				pos[0] = start + r * i;
				pos[2] = start + r * j;

				uvOffset[0] = i/numTiles;
				uvOffset[1] = j/numTiles;
				this.shader.uniform('uPositionOffset', 'vec3', pos);
				this.shader.uniform('uUVOffset', 'vec2', uvOffset);

				GL.draw(this.mesh);
			}
		}
	}


}

export default ViewGrass;