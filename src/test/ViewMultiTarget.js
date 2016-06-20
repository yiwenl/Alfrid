// ViewMultiTarget.js

import alfrid, { GL } from '../alfrid';
import fs from './shaders/multi.frag';

class ViewMultiTarget extends alfrid.View {
	
	constructor() {
		super(null, fs);
	}


	_init() {
		this.mesh = alfrid.Geom.sphere(1, 24);
	}


	render() {
		this.shader.bind();
		GL.draw(this.mesh);
	}


}

export default ViewMultiTarget;