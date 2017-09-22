// main.js
import './global.scss';

import { GL, BatchDotsPlane, BatchAxis, CameraPerspective, OrbitalControl } from '../src/alfrid';
import Scheduler from 'scheduling';


// create canvas
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);


// INIT GL
GL.init(canvas);


//	Camera
const camera = new CameraPerspective();
camera.setPerspective(Math.PI/4, window.innerWidth/window.innerHeight, .1, 100);

//	Camera control
const orbControl = new OrbitalControl(camera, window, 15);
orbControl.rx.value = orbControl.ry.value = .3
orbControl.radius.value = 5;


//	Views
const batchDots = new BatchDotsPlane();
const batchAxis = new BatchAxis();


//	render loop
function render() {
	GL.clear(0, 0, 0, 0);
	GL.setMatrices(camera);
	batchDots.draw();
	batchAxis.draw();
}
Scheduler.addEF(render);


//	resizing
window.addEventListener('resize', resize);
function resize() {

	GL.setSize(window.innerWidth, window.innerHeight);
	camera.setPerspective(Math.PI/4, GL.aspectRatio, .1, 100);

}
resize();