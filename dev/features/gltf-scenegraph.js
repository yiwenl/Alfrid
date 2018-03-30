// gltf-scenegraph.js


import '../global.scss';
import quickSetup from '../utils/quickSetup';
import alfrid, { GL, GLTFLoader, Object3D } from 'src/alfrid';
import vs from 'shaders/cube.vert';
import fs from 'shaders/cube.frag';


let shader, fbo, mesh, bCopy, matrix, scenes;
let cube, container, meshCube;

const assetsToLoad = [];

quickSetup(assetsToLoad, render).then((o)=>init(o)).catch(err=>{
	console.log('Error :', err);
});


function init(o) {
	console.log('Init', o);
	o.orbControl.rx.value = 0.1;
	o.orbControl.radius.value = 5;
	// o.orbControl.ry.value = Math.PI - 0.2;

	matrix = mat4.create();
	const s = 25;
	mat4.identity(matrix, matrix);
	mat4.scale(matrix, matrix, vec3.fromValues(s, s, s));

	// const url = 'assets/gltf/helmet/FlightHelmet.gltf';
	const url = 'assets/gltf/microphone/microphone.gltf';
	// const url = 'assets/gltf/cube/scene.gltf';
	// const url = 'assets/gltf/frank/scene.gltf';
	// const url = 'assets/gltf/avacado/scene.gltf';

	GLTFLoader.load(url)
	.then((gltfInfo)=> {
		console.log('GLTF :', gltfInfo);
		const { geometries } = gltfInfo.output;
		mesh = gltfInfo.output.meshes;
		scenes = gltfInfo.output.scenes;

		shader = new alfrid.GLShader();
		// console.log(mesh);
	})
	.catch(e => {
		console.log('Error loading gltf:', e);
	});


	container = new Object3D();
	cube = new Object3D();
	container.addChild(cube);
	meshCube = alfrid.Geom.cube(1, 1, 1);
}


function renderTree(child) {
	child.matrix;
	if(child.mesh) {
		GL.pushMatrix();
		GL.rotate(child.matrix);
		GL.draw(child.mesh);
		// console.log(child.mesh.material);
		GL.popMatrix();
	}

	if(child.children) {
		child.children.forEach( c => {
			renderTree(c);
		});

	}
}


function render() {
	if(!mesh) {
		return;
	}

	GL.rotate(matrix);
	shader.bind();
	scenes.forEach( scene => {
		GL.rotate(scene.matrix);
		renderTree(scene);
	});


	// container.x = Math.sin(alfrid.Scheduler.deltaTime);
	// cube.y = Math.cos(alfrid.Scheduler.deltaTime);
	// cube.scaleX = Math.cos(alfrid.Scheduler.deltaTime) * .3 + .4;
	// cube.scaleY = Math.sin(alfrid.Scheduler.deltaTime) * .3 + .4;
	// GL.rotate(cube.matrix);
	// GL.draw(meshCube);

}