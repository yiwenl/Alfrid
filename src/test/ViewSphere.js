// ViewSphere.js


import alfrid, { GL } from '../alfrid';
import vs from './shaders/textureCube.vert';
import fs from './shaders/textureCube.frag';

class ViewSphere extends alfrid.View {
	
	constructor() {
		super(vs, fs);
	}


	_init() {
		this.mesh = alfrid.Geom.sphere(1.5, 24 * 2);

		this.gamma = 2.2;
		this.exposure = 1;
		gui.add(this, 'gamma', 1, 10);
		gui.add(this, 'exposure', 1, 10);
	}


	render(textureCube, lod = 0, position = [0, 0, 0]) {
		this.shader.bind();
		this.shader.uniform('texture', 'uniform1i', 0);
		textureCube.bind(0);
		this.shader.uniform('lod', 'float', lod);
		this.shader.uniform('uPosition', 'vec3', position);

		this.shader.uniform('uExposure', 'uniform1f', this.exposure);
		this.shader.uniform('uGamma', 'uniform1f', this.gamma);
		GL.draw(this.mesh);
	}

}

export default ViewSphere;