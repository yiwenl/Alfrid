// gltf-scenegraph.js


import '../global.scss';
import quickSetup from '../utils/quickSetup';
import alfrid, { GL, GLTFLoader } from 'src/alfrid';
import vs from 'shaders/cube.vert';
import fs from 'shaders/cube.frag';


let shader, fbo, mesh, bCopy, matrix;

const assetsToLoad = [];

quickSetup(assetsToLoad, render).then((o)=>init(o)).catch(err=>{
	console.log('Error :', err);
});


function init(o) {
	console.log('Init', o);
	o.orbControl.rx.value = 0.1;
	o.orbControl.ry.value = Math.PI - 0.2;

	matrix = mat4.create();
	const s = 25;
	mat4.identity(matrix, matrix);
	mat4.scale(matrix, matrix, vec3.fromValues(s, s, s));

	console.log(matrix);

	const url = 'assets/gltf/helmet/FlightHelmet.gltf';

	GLTFLoader.load(url)
	.then((gltfInfo)=> {
		console.log('GLTF :', gltfInfo);
		const { geometries } = gltfInfo.output;
		mesh = gltfInfo.output.meshes;

		shader = new alfrid.GLShader();
		// console.log(mesh);
	})
	.catch(e => {
		console.log('Error loading gltf:', e);
	});
}


function render() {
	if(!mesh) {
		return;
	}

	GL.rotate(matrix);
	shader.bind();
	GL.draw(mesh);
}