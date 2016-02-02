// ViewColorSphere.js

import alfrid from '../../../../build/alfrid.js';
var glslify = require("glslify");

let GL = alfrid.GL;

class ViewColorSphere extends alfrid.View {

	constructor() {
		super(alfrid.ShaderLibs.generalVert, alfrid.ShaderLibs.simpleColorFrag);
	}

	_init() {
		this.mesh = alfrid.Geom.sphere(1, 24);
	}


	render(position=[0, 0, 0], scale=1) {
		this.shader.bind();
		this.shader.uniform("color", "uniform3fv", [.75, 0, 0]);
		this.shader.uniform("opacity", "uniform1f", 1);
		this.shader.uniform("position", "uniform3fv", position);
		this.shader.uniform("scale", "uniform3fv", [scale, scale, scale]);
		GL.draw(this.mesh);
	}
}

export default ViewColorSphere;