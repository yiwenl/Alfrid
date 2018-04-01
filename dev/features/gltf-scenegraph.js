// gltf-scenegraph.js


import '../global.scss';
import quickSetup from '../utils/quickSetup';
import alfrid, { GL, GLTFLoader, Object3D, BatchSkybox } from 'src/alfrid';
import vs from 'shaders/cube.vert';
import fs from 'shaders/cube.frag';


let shader, matrix, scenes, batchSky;
let textureIrr, textureRad, textureBrdf;
let cube, container, meshCube;

const env = 'pisa';



const assetsToLoad = [
	{"id":"brdf","url":"assets/env/brdfLUT.png"},
	{"id":"irradiance","url":`assets/env/${env}_irradiance.dds`,"type":"binary"},
	{"id":"radiance","url":`assets/env/${env}_radiance.dds`,"type":"binary"}
];

quickSetup(assetsToLoad, render).then((o)=>init(o)).catch(err=>{
	console.log('Error :', err);
});


function init(o) {
	console.log('Init', o);
	o.orbControl.rx.value = 0.1;
	o.orbControl.radius.value = 10;
	// o.orbControl.ry.value = Math.PI - 0.2;

	matrix = mat4.create();
	const s = 25;
	mat4.identity(matrix, matrix);
	mat4.scale(matrix, matrix, vec3.fromValues(s, s, s));

	const url = 'assets/gltf/helmet/FlightHelmet.gltf';
	// const url = 'assets/gltf/microphone/microphone.gltf';
	// const url = 'assets/gltf/cube/scene.gltf';
	// const url = 'assets/gltf/frank/scene.gltf';
	// const url = 'assets/gltf/avacado/scene.gltf';

	textureIrr = alfrid.GLCubeTexture.parseDDS(getAsset('irradiance'));
	textureRad = alfrid.GLCubeTexture.parseDDS(getAsset('radiance'));
	textureBrdf = new alfrid.GLTexture(getAsset('brdf'));

	shader = new alfrid.GLShader();

	GLTFLoader.load(url)
	.then((gltfInfo)=> {
		const { geometries, meshes } = gltfInfo.output;
		scenes = gltfInfo.output.scenes;
		console.log(meshes[0].material);

		meshes.forEach( mesh => {
			mesh.material.uniforms.uBRDFMap = textureBrdf;
			mesh.material.uniforms.uIrradianceMap = textureIrr;
			mesh.material.uniforms.uRadianceMap = textureRad;
		});

	})
	.catch(e => {
		console.log('Error loading gltf:', e);
	});


	container = new Object3D();
	cube = new Object3D();
	container.addChild(cube);
	meshCube = alfrid.Geom.cube(1, 1, 1);


	batchSky = new BatchSkybox();
	console.log('here', batchSky);
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
	if(!scenes) {
		return;
	}

	batchSky.draw(textureRad);

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