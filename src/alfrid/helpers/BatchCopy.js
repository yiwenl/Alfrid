// BatchCopy.js

// import GL from '../GLTool';
import Geom from '../Geom';
import GLShader from '../GLShader';
import Batch from '../Batch';

var glslify = require('glslify');

class BatchCopy extends Batch {

	constructor() {
		let mesh = Geom.plane(2, 2, 1);
		let shader = new GLShader(null, glslify('../shaders/copy.frag'));
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