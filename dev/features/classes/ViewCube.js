// ViewCube.js

import alfrid, { GL, View3D } from 'src/alfrid';

class ViewCube extends View3D {
	
	constructor() {
		super();
	}


	_init() {
		this.mesh = alfrid.Geom.cube(.1, .1, .1);
	}


	render() {
		GL.rotate(this.matrix);
		this.shader.bind();
		GL.draw(this.mesh);
	}


}

export default ViewCube;