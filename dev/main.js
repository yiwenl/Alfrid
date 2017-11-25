// main.js
import './global.scss';
import quickSetup from './utils/quickSetup';

import { GL, Geom, GLShader, TouchDetector, BatchBall } from '../src/alfrid';
import fs from './test.frag';
let cube, shader;
let hit = vec3.fromValues(999, 999, 99);
let ball;

function render() {
	shader.bind();

	GL.draw(cube);

	let s = .1;
	ball.draw(hit, [s, s, s], [1, 0, 0]);
}

quickSetup(render)
.then((o)=> {
	cube = Geom.cube(1, 1, 1);
	shader = new GLShader(null, fs);
	ball = new BatchBall();

	const detector = new TouchDetector(cube, o.camera, true);


	detector.on('onDown', (o)=> {
		vec3.copy(hit, o.detail.hit);
	});

	// detector.on('onHit', (o)=> {
	// 	vec3.copy(hit, o.detail.hit);
	// });

	// detector.on('onUp', () => {
	// 	vec3.set(hit, 999, 999, 999);
	// });

});
