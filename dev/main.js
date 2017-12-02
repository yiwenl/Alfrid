// main.js
import './global.scss';
import quickSetup from './utils/quickSetup';

import alfrid, { GL, Geom, GLShader, TouchDetector, BatchBall } from '../src/alfrid';
import fs from './test.frag';
let cube, shader, fbo, bCopy;
let hit = vec3.fromValues(999, 999, 99);
let ball;
let mtx = mat4.create();
mat4.translate(mtx, mtx, vec3.fromValues(1, 0, 0));

function render() {
	let s = .1;
	ball.draw(hit, [s, s, s], [1, 0, 0]);

	GL.rotate(mtx);
	shader.bind();
	GL.draw(cube);

	fbo.bind();
	GL.clear(1, 0, 0, 1);
	GL.draw(cube);
	fbo.unbind();

	s = 200;
	GL.viewport(0, 0, s, s);
	bCopy.draw(fbo.getTexture());
	
	GL.viewport(0, 0, GL.width, GL.height);
}

quickSetup(render)
.then((o)=> {
	cube = Geom.cube(1, 1, 1);
	shader = new GLShader(null, fs);
	ball = new BatchBall();

	const detector = new TouchDetector(cube, o.camera, false);
	mat4.copy(detector.mtxModel, mtx);

	detector.on('onHit', (o)=> {
		vec3.copy(hit, o.detail.hit);
	});

	// detector.on('onHit', (o)=> {
	// 	vec3.copy(hit, o.detail.hit);
	// });

	// detector.on('onUp', () => {
	// 	vec3.set(hit, 999, 999, 999);
	// });

	bCopy = new alfrid.BatchCopy();

	const s = 1024;
	fbo = new alfrid.FrameBuffer(s, s);
});
