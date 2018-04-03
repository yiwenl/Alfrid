// gltf-scenegraph.js


import '../global.scss';
import quickSetup from '../utils/quickSetup';
import alfrid, { GL, GLTFLoader, Object3D, BatchSkybox, Geometry, Mesh, Material } from 'src/alfrid';
import vs from 'shaders/cube.vert';
import fs from 'shaders/cube.frag';
import fsTest from 'shaders/test.frag';


let scenes, batchSky;
let textureIrr, textureRad, textureBrdf;
let cube, container, meshCube;

const env = 'studio11';



const assetsToLoad = [
	{"id":"brdf","url":"assets/env/brdfLUT.png"},
	{"id":"irradiance","url":`assets/env/${env}_irradiance.dds`,"type":"binary"},
	{"id":"radiance","url":`assets/env/${env}_radiance.dds`,"type":"binary"}
];

quickSetup(assetsToLoad, render).then((o)=>init(o)).catch(err=>{
	console.log('Error :', err);
});


function init(o) {
	o.orbControl.rx.value = 0.1;
	o.orbControl.radius.value = 10;

	const url = 'assets/gltf/helmet/FlightHelmet.gltf';
	// const url = 'assets/gltf/microphone/microphone.gltf';
	// const url = 'assets/gltf/cube/scene.gltf';
	// const url = 'assets/gltf/frank/scene.gltf';
	// const url = 'assets/gltf/avacado/scene.gltf';

	textureIrr = alfrid.GLCubeTexture.parseDDS(getAsset('irradiance'));
	textureRad = alfrid.GLCubeTexture.parseDDS(getAsset('radiance'));
	textureBrdf = new alfrid.GLTexture(getAsset('brdf'));


	GLTFLoader.load(url)
	.then((gltfInfo)=> {
		const { geometries, meshes } = gltfInfo.output;
		scenes = gltfInfo.output.scenes;
		console.log(scenes);

		meshes.forEach( mesh => {
			mesh.material.uniforms.uBRDFMap = textureBrdf;
			mesh.material.uniforms.uIrradianceMap = textureIrr;
			mesh.material.uniforms.uRadianceMap = textureRad;
		});

	})
	.catch(e => {
		console.log('Error loading gltf:', e);
	});


	
	batchSky = new BatchSkybox();

	container = new Object3D();
	let geometry = alfrid.Geom.cube(1, 1, 1);
	let material = new Material(vs, fsTest, {greyscale:0}, {'HAS_NORMAL':1});
	meshCube = new Mesh(geometry, material);

	container.addChild(meshCube);
}



function render() {
	batchSky.draw(textureRad);

	if(scenes) {
		scenes.forEach( scene => {
			GL.draw(scene);
		});	
	}

}