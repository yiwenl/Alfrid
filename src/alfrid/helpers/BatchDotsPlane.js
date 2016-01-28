// BatchDotsPlane.js

import GL from '../GLTool';
import Mesh from '../Mesh';
import GLShader from '../GLShader';
import Batch from '../Batch';

let glslify = require('glslify');

class BatchDotsPlane extends Batch {

	constructor() {
		let positions = [];
		let indices   = [];
		let index     = 0;
		
		let numDots   = 100;
		let size      = 50;
		let gap       = size / numDots;
		let i, j;


		for(i=-size/2; i<size; i+=gap) {
			for(j=-size/2; j<size; j+=gap) {
				positions.push([i, j, 0]);
				indices.push(index);
				index++;

				positions.push([i, 0, j]);
				indices.push(index);
				index++;
			}
		}
		
		let mesh     = new Mesh(GL.POINTS);
		mesh.bufferVertex(positions);
		mesh.bufferIndices(indices);
		
		let shader   = new GLShader(glslify('../shaders/dotsPlane.vert'), glslify('../shaders/simpleColor.frag'));
		
		super(mesh, shader);
		
		this.color   = [1, 1, 1];
		this.opacity = 0.5;
	}


	draw() {
		this.shader.bind();
		this.shader.uniform('color', 'uniform3fv', this.color);
		this.shader.uniform('opacity', 'uniform1f', this.opacity);
		// GL.draw(this.mesh);
		super.draw();
	}
}

export default BatchDotsPlane;