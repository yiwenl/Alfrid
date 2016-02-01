// ViewDome.js
import alfrid from '../../../../build/alfrid.js';
let GL = alfrid.GL;
var glslify = require("glslify");

class ViewDome extends alfrid.View {
	
	constructor() {
		super(null, glslify('../shaders/lines.frag'));
		this.time = Math.random() * 0xFF;
	}


	_init() {
		this.mesh = alfrid.Geom.sphere(30, 48, false, true);
	}


	render() {
		this.time += .01;
		this.shader.bind();
		this.shader.uniform("time", "uniform1f", this.time);
		GL.draw(this.mesh);
	}


}


export default ViewDome;