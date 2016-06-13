// ViewColors.js

import alfrid, { GL } from '../alfrid';

const fs = require('./shaders/colors.frag');

class ViewColors extends alfrid.View {
	
	constructor() {
		super(null, fs);
		this.time = 0;
	}


	_init() {
		this.mesh = alfrid.Geom.plane(2, 2, 1);

		this.colors = [
			.2,
			.4,
			.6,
			.4
		];
	}


	render() {
		this.time += 0.03;
		this.colors[3] = Math.sin(this.time) * .5 + .5;
		let colors = [];
		for(let i = 0; i < this.colors.length; i++) {
			colors = colors.concat(this.colors[i]);
		}

		// console.log(this.colors);
		this.shader.bind();
		this.shader.uniform('colors', 'float', this.colors);
		GL.draw(this.mesh);
	}

}

export default ViewColors;