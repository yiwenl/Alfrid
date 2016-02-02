// ViewDome.js
import alfrid from '../../../../build/alfrid.js';
let GL = alfrid.GL;
var glslify = require("glslify");

class ViewDome extends alfrid.View {
	
	constructor() {
		super(glslify('../shaders/lines.vert'), glslify('../shaders/lines.frag'));
		this.time = Math.random() * 0xFF;
	}


	_init() {
		this.mesh = alfrid.Geom.sphere(10, 60, false, true);
	}


	render() {
		this.shader.bind();
		this.shader.uniform("time", "uniform1f", this.time);
		GL.draw(this.mesh);
	}


}


export default ViewDome;