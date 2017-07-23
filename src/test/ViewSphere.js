// ViewSphere.js


import alfrid, { GL } from '../alfrid';
import vs from './shaders/textureCube.vert';
import fs from './shaders/textureCube.frag';

class ViewSphere extends alfrid.View {
	
	constructor() {
		super();
	}


	_init() {
		this.mesh = alfrid.Geom.sphere(1.5, 24 * 2);

		this.gamma = 2.2;
		this.exposure = 1;
		gui.add(this, 'gamma', 1, 10);
		gui.add(this, 'exposure', 1, 10);
	}


	render() {
		this.shader.bind();
		GL.draw(this.mesh);
	}

}

export default ViewSphere;