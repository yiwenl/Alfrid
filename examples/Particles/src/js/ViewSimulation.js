// ViewSimulation.js

import alfrid from '../../../../build/alfrid.js';

var glslify = require("glslify");

let GL = alfrid.GL;

class ViewSimulation extends alfrid.View {
	constructor() {
		super(alfrid.ShaderLibs.bigTriangleVert, glslify('../shaders/sim.frag'));
	}

	_init() {
		console.log('init');

		this.mesh = alfrid.Geom.bigTriangle();
	}


	render(texture) {
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		texture.bind(0);

		GL.draw(this.mesh);
	}
}


export default ViewSimulation;
