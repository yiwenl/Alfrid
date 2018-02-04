// gltf-example.js
console.log('dev : gltf-example');
import AssetLoader from 'assets-loader';

import '../global.scss';
import quickSetup from '../utils/quickSetup';

import alfrid, { GL, WebglNumber, GLTFLoader } from 'src/alfrid';
import vs from '../shaders/gltf.vert';
import fs from '../shaders/gltf.frag';

const assetsToLoad = [
		{"id":"scene","url":"assets/gltf/cube/scene.gltf","type":"text"},
		{"id":"sceneBin","url":"assets/gltf/cube/scene.bin","type":"binary"}
	];

quickSetup(assetsToLoad, render).then((o)=>init(o)).catch(err=>{
	console.log('Error :', err);
});


const mtx = mat4.create();
// const s = 1.0;
const s = 0.1;
mat4.scale(mtx, mtx, vec3.fromValues(s, s, s));



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

function init(o) {
	console.log('Init', o, assets);

	const gltfInfo = JSON.parse(getAsset('scene'));
	// const url = 'assets/gltf/cube/scene.gltf';
	const url = 'assets/gltf/frank/scene.gltf';
	// const url = 'assets/gltf/avacado/scene.gltf';

	//	need to think about loading .bin / textures
	// console.log('Images :', gltfData.images);

	// readAccessors(gltfInfo);
	// mesh = readMesh(gltfInfo);

	// console.log('Mesh :', mesh);

	shader = new alfrid.GLShader(vs, fs);

	GLTFLoader.load(url)
	.then((gltfInfo)=> {
		// console.log('GLTF :', o);
		const { geometries } = gltfInfo.output;
		mesh = gltfInfo.output.meshes;
		console.log(mesh);
	})
	.catch(e => {
		console.log('Error loading gltf:', e);
	});
}


function render() {
	if(!mesh) {	return;	}
	shader.bind();
	GL.rotate(mtx);
	GL.draw(mesh);
}