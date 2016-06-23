import '../scss/global.scss';
import alfrid, { GL, Camera } from '../../../../build/alfrid';

import vertexShader from '../shaders/basic.vert';
import fragmentShader from '../shaders/color.frag';

if(document.body) {
	_init();
} else {
	window.addEventListener('DOMContentLoaded', _init);
}


let shader, mesh, camera, time = 0;


function _init() {
	//	CREATE CANVAS
	const canvas = document.createElement('canvas');
	canvas.className = 'Main-Canvas';
	document.body.appendChild(canvas);

	//	INIT 3D TOOL
	GL.init(canvas);

	//	INIT SHADER
	shader = new alfrid.GLShader(vertexShader, fragmentShader);

	//	INIT MESH
	mesh = new alfrid.Geom.plane(1, 1, 1);

	//	SETUP CAMERA
	camera = new alfrid.CameraPerspective();
	camera.setPerspective(Math.PI/2, GL.aspectRatio, .1, 100);

	loop();
	window.addEventListener('resize', ()=>resize());
}


function loop() {
	time += 0.01;
	let s = Math.sin(time);
	let c = Math.cos(time);
	camera.lookAt([Math.sin(time), Math.cos(time), 2], [0, 0, 0]);

	GL.setMatrices(camera);
	shader.bind();
	shader.uniform("color", "vec3", [s * .5 + .5, c * .5 + .5, 1]);
	GL.draw(mesh);

	window.requestAnimationFrame(()=>loop());
}


function resize() {
	GL.setSize(window.innerWidth, window.innerHeight);
	if(camera) camera.setAspectRatio(GL.aspectRatio);
}