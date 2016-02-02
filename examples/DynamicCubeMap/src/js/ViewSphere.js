// ViewSphere.js

import alfrid from '../../../../build/alfrid.js';
var glslify = require("glslify");

let GL = alfrid.GL;

class ViewSphere extends alfrid.View {
	constructor() {
		super(glslify('../shaders/reflection.vert'), glslify('../shaders/reflection.frag'));
	}


	_init() {
		this.mesh = alfrid.Geom.sphere(.85, 24, true);
	}


	render(texture, textureLight, position=[0, 0, 0], scale=[1, 1, 1]) {
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		texture.bind(0);
		this.shader.uniform("textureLight", "uniform1i", 1);
		textureLight.bind(1);
		this.shader.uniform("position", "uniform3fv", position);
		this.shader.uniform("scale", "uniform3fv", scale);
		GL.draw(this.mesh);
	}
}

export default ViewSphere;