// BatchAxis.js

import GL from '../GLTool';
import Mesh from '../Mesh';
import GLShader from '../GLShader';
import Batch from '../Batch';

let glslify = require('glslify');


class BatchAxis extends Batch {

	constructor() {
		let positions = [];
		let colors = [];
		let indices = [0, 1, 2, 3, 4, 5];
		let r = 9999;

		positions.push([-r,  0,  0]);
		positions.push([ r,  0,  0]);
		positions.push([ 0, -r,  0]);
		positions.push([ 0,  r,  0]);
		positions.push([ 0,  0, -r]);
		positions.push([ 0,  0,  r]);


		colors.push([1, 0, 0]);
		colors.push([1, 0, 0]);
		colors.push([0, 1, 0]);
		colors.push([0, 1, 0]);
		colors.push([0, 0, 1]);
		colors.push([0, 0, 1]);

		let mesh = new Mesh(GL.LINES);
		mesh.bufferVertex(positions);
		mesh.bufferIndices(indices);
		mesh.bufferData(colors, 'aColor', 3);

		let shader = new GLShader(glslify('../shaders/axis.vert'), glslify('../shaders/axis.frag'));

		super(mesh, shader);

	}


}


export default BatchAxis;