// ViewSphere.js


import alfrid, { GL } from '../alfrid';
import vs from './shaders/textureCube.vert';
import fs from './shaders/textureCube.frag';

class ViewSphere extends alfrid.View {
	
	constructor() {
		super(vs, fs);
	}


	_init() {
		this.mesh = alfrid.Geom.sphere(1, 24);

		this.lod = 0;
		gui.add(this, 'lod', 0, 8);
	}


	render(textureCube) {
		this.shader.bind();
		this.shader.uniform('texture', 'uniform1i', 0);
		textureCube.bind(0);
		this.shader.uniform('lod', 'float', this.lod);
		GL.draw(this.mesh);
	}

}

export default ViewSphere;