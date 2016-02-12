// ViewBall.js

import alfrid from '../../../../build/alfrid.js';
let GL = alfrid.GL;
var glslify = require("glslify");

class ViewBall extends alfrid.View {
	
	constructor() {
		// super(alfrid.ShaderLibs.generalVert, alfrid.ShaderLibs.simpleColorFrag);
		super(glslify('../shaders/ball.vert'), glslify('../shaders/ball.frag'));
	}


	_init() {
		this.mesh = alfrid.Geom.sphere(1, 48);
	}


	render(position, scale, color=[1,1,1]) {
		this.shader.bind();
		this.shader.uniform("position", "uniform3fv", position);
		this.shader.uniform("scale", "uniform3fv", [scale, scale, scale]);
		this.shader.uniform("color", "uniform3fv", color);
		this.shader.uniform("opacity", "uniform1f", 1);
		GL.draw(this.mesh);
	}


}

export default ViewBall;