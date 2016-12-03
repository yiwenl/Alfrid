// ViewTest3D.js

import alfrid, { GL } from '../alfrid';
import vs from './shaders/test3D.vert';
import fs from './shaders/test3D.frag';

const up = vec3.fromValues(0, 1, 0);

class ViewTest3D extends alfrid.View3D {

	constructor() {
		super(vs, fs);
	}

	_init() {
		this.mesh = alfrid.Geom.cube(1, 1, 1);
		this.time = 0;
		this.scaleX = 0.5;

		this.quat = quat.create();
	}


	render() {
		this.time += 0.01;
		const r = 2;

		quat.setAxisAngle(this.quat, up, this.time);
		// console.log(this.quat);
		this.setRotationFromQuaternion(this.quat);

		this.rotationX = this.time * 0.75;
		// this.rotationY = this.time * 0.5;
		// this.rotationZ = Math.sin(this.time * 1.5);


		this.shader.bind();
		GL.draw(this.mesh);
	}


}

export default ViewTest3D;