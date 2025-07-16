// scene-graph.js
import '../global.scss';
import quickSetup from '../utils/quickSetup';
import alfrid, { GL, WebglNumber, Object3D, View3D, Scheduler } from 'src/alfrid';
import ViewCube from './classes/ViewCube';

let shader, fbo, mesh, container, child, count = 0;
let vCube;

quickSetup(render).then((o)=>init(o)).catch(err=>{
	console.log('Error :', err);
});


function init(o) {
	container = new Object3D();
	child = new Object3D();
	vCube = new ViewCube();
	container.addChild(child);
	container.addChild(vCube);

	shader = new alfrid.GLShader();
	const s = .2;
	mesh = alfrid.Geom.cube(s, s, s);
}


function render() {
	const r = 1;

	container.x = Math.cos(Scheduler.deltaTime) * r;
	container.y = Math.sin(-Scheduler.deltaTime) * r;
	// child.z = Math.sin(-Scheduler.deltaTime) * Math.cos(-Scheduler.deltaTime) * r;
	// GL.rotate(child.matrix);

	// shader.bind();
	// GL.draw(mesh);

	vCube.render();
}
