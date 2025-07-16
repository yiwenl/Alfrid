// BatchCopy.js

import Geom from '../Geom';
import GLShader from '../GLShader';
import Batch from '../Batch';

import vs from '../shaders/bigTriangle.vert';
import fs from '../shaders/copy.frag';

class BatchCopy extends Batch {

	constructor() {
		const mesh = Geom.bigTriangle();
		const shader = new GLShader(vs, fs);
		super(mesh, shader);

		shader.bind();
		shader.uniform('texture', 'uniform1i', 0);
	}


	draw(texture) {
		this.shader.bind();
		texture.bind(0);
		super.draw();
	}

}

export default BatchCopy;