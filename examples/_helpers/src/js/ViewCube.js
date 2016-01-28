// ViewCube.js
import alfrid from '../../../../build/alfrid.js';
let GL = alfrid.GL;
var glslify = require("glslify");

class ViewCube extends alfrid.View {
	constructor() {
		let vs = glslify('../shaders/basic.vert');
		let fs = glslify('../shaders/cube.frag');	
		super(vs, fs);

		this.time = 0;
	}

	_init() {
		let size = 1;
		this.mesh = alfrid.Geom.cube(size, size, size, true);
	}

	render(texture) {
		this.time += .02;
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		texture.bind(0);
		this.shader.uniform("time", "uniform1f", this.time);
		GL.draw(this.mesh);
	}
}

export default ViewCube;