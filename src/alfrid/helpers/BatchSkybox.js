// BatchSkybox.js

import Geom from '../Geom';
import GLShader from '../GLShader';
import Batch from '../Batch';

let glslify = require('glslify');


class BatchSkybox extends Batch {

	constructor(size=20) {
		let mesh = Geom.skybox(size);
		let shader = new GLShader(glslify('../shaders/skybox.vert'), glslify('../shaders/skybox.frag'));

		super(mesh, shader);
	}

	draw(texture) {
		this.shader.bind();
		texture.bind(0);
		super.draw();
	}


}


export default BatchSkybox;