// gltf-example.js
console.log('dev : gltf-example');
import AssetLoader from 'assets-loader';

import '../global.scss';
import quickSetup from '../utils/quickSetup';

import alfrid, { GL, WebglNumber, GLTFLoader } from 'src/alfrid';
import vs from '../shaders/gltf.vert';
import fs from '../shaders/gltf.frag';

const assetsToLoad = [
		{"id":"brdf","url":"assets/gltf/microphone/brdfLUT.png"},
		{"id":"albedo","url":"assets/gltf/microphone/albedo.jpg"},
		{"id":"metalGloss","url":"assets/gltf/microphone/metalGloss.jpg"},
		{"id":"ao","url":"assets/gltf/microphone/ao.jpg"},
		{"id":"normal","url":"assets/gltf/microphone/normal.jpg"},
		{"id":"plight_irradiance","url":"assets/gltf/microphone/studio_irradiance.dds","type":"binary"},
		{"id":"plight_radiance","url":"assets/gltf/microphone/studio_radiance.dds","type":"binary"},
		{"id":"scene","url":"assets/gltf/cube/scene.gltf","type":"text"},
		{"id":"sceneBin","url":"assets/gltf/cube/scene.bin","type":"binary"}
	];


const definesToString = function(defines) {
	let outStr = '';
	for (const def in defines) {
		if(defines[def]) {
			outStr += '#define ' + def + ' ' + defines[def] + '\n';	
		}
		
	}
	return outStr;
};

quickSetup(assetsToLoad, render).then((o)=>init(o)).catch(err=>{
	console.log('Error :', err);
});


const mtx = mat4.create();
// const s = 1.0;
const s = 1;
mat4.scale(mtx, mtx, vec3.fromValues(s, s, s));
let bSky;



var sizeMap = {
	5123:2,
	5126:4,
	5121:1,
	5125:4,
}

const semanticAttributeMap = {
	'NORMAL': 'aNormal',
	'POSITION': 'aVertexPosition',
	// 'TANGENT': 'aTangent',
	'TEXCOORD_0': 'aTextureCoord',
	'TEXCOORD_1': 'aTextureCoord1',
	'WEIGHTS_0': 'aWeight',
	'JOINTS_0': 'aJoint',
	'COLOR': 'aColor'
};

let mesh, shader, meshTest;
let textureIrr, textureRad;

function init(o) {
	console.log('Init', o, assets);
	o.orbControl.radius.value = 5;

	// const gltfInfo = JSON.parse(getAsset('scene'));
	// const url = 'assets/gltf/cube/scene.gltf';
	// const url = 'assets/gltf/frank/scene.gltf';
	// const url = 'assets/gltf/avacado/scene.gltf';
	const url = 'assets/gltf/microphone/microphone.gltf';

	//	textures
	const textureBrdf = new alfrid.GLTexture(getAsset('brdf'));
	const textureColor = new alfrid.GLTexture(getAsset('albedo'));
	const textureMetalGloss = new alfrid.GLTexture(getAsset('metalGloss'));
	const textureAO = new alfrid.GLTexture(getAsset('ao'));
	const textureNormal = new alfrid.GLTexture(getAsset('normal'));
	textureIrr = alfrid.GLCubeTexture.parseDDS(getAsset('plight_irradiance'));
	textureRad = alfrid.GLCubeTexture.parseDDS(getAsset('plight_radiance'));


	//	need to think about loading .bin / textures
	// console.log('Images :', gltfData.images);

	// readAccessors(gltfInfo);
	// mesh = readMesh(gltfInfo);

	// console.log('Mesh :', mesh);

	const defines = {
		'USE_IBL': 1,
		'HAS_BASECOLORMAP': 1,
		'HAS_NORMALMAP': 1,
		'HAS_EMISSIVEMAP': 0,
		'HAS_OCCLUSIONMAP': 1,
		'HAS_METALROUGHNESSMAP': 1,
	};

	const defineStr = definesToString(defines);
    let _vs = `${defineStr}\n${vs}`;
    let _fs = `${defineStr}\n${fs}`;

	shader = new alfrid.GLShader(_vs, _fs);

	shader.bind();
	shader.uniform('uAoMap', 'uniform1i', 0);
	textureAO.bind(0);
	console.log('textureAO', textureAO);
	shader.uniform("uBRDFMap", "uniform1i", 1);
	textureBrdf.bind(1);

	shader.uniform("uColorMap", "uniform1i", 2);
	textureColor.bind(2);

	shader.uniform("uNormalMap", "uniform1i", 3);
	textureNormal.bind(3);

	shader.uniform("uMetallicRoughnessMap", "uniform1i", 4);
	textureMetalGloss.bind(4);

	shader.uniform('uRadianceMap', 'uniform1i', 5);
	shader.uniform('uIrradianceMap', 'uniform1i', 6);
	
	textureRad.bind(5);
	textureIrr.bind(6);

	const baseColor = [1, 1, 1];
	const roughness = 1;
	const metallic = 1;


	shader.uniform('uBaseColor', 'uniform3fv', baseColor);
	shader.uniform('uRoughness', 'uniform1f', roughness);
	shader.uniform('uMetallic', 'uniform1f', metallic);
	shader.uniform("uNormalScale", "float", 1);
	shader.uniform("uEmissiveFactor", "vec3", [0.5, 0.5, 0.5]);

	shader.uniform("uLightDirection", "vec3", [0.5, 0.5, 0.5]);
	shader.uniform("uLightColor", "vec3", [0, 0, 0]);

	shader.uniform("uScaleDiffBaseMR", "vec4", [0, 0, 0, 0]);
	shader.uniform("uScaleFGDSpec", "vec4", [0, 0, 0, 0]);
	shader.uniform("uScaleIBLAmbient", "vec4", [1, 1, 1, 1]);

	
	shader.uniform("uOcclusionStrength", "float", 1);


	GLTFLoader.load(url)
	.then((gltfInfo)=> {
		console.log('GLTF :', gltfInfo);
		const { geometries } = gltfInfo.output;
		mesh = gltfInfo.output.meshes;
		console.log(mesh);
	})
	.catch(e => {
		console.log('Error loading gltf:', e);
	});

	bSky = new alfrid.BatchSkybox();

}


function render() {
	if(!mesh) {	return;	}
	shader.bind();
	shader.uniform("uCameraPos", "vec3", GL.camera.position);
	GL.rotate(mtx);
	GL.draw(mesh);

	/*/
	bSky.draw(textureIrr);
	/*/
	bSky.draw(textureRad);
	//*/
}