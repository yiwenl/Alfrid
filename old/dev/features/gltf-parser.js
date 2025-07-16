// gltf-parser.js
import '../global.scss';
import quickSetup from '../utils/quickSetup';
import alfrid, { GL, WebglNumber, GLTFParser, Object3D } from 'src/alfrid';
import AssetsLoader from 'assets-loader';


let isLoaded = false;
let container, mesh, shader;

quickSetup(render).then((o)=>init(o)).catch(err=>{
	console.log('Error :', err);
});


function init(o) {
	console.log('Init', o);

	shader = new alfrid.GLShader();

	const assetsToLoad = [
		{"id":"deer","url":"assets/gltf/deer/deer1.gltf","type":"text"},
		{"id":"deer_bin","url":"assets/gltf/deer/deer1.bin","type":"binary"},
		{"id":"head","url":"assets/gltf/head/model.gltf","type":"text"},
		{"id":"head_bin","url":"assets/gltf/head/model.bin","type":"binary"},
		{"id":"microphone","url":"assets/gltf/microphone/microphone.gltf","type":"text"},
		{"id":"microphone_bin","url":"assets/gltf/microphone/microphone.bin","type":"binary"},
	];


	const loader = new AssetsLoader({
		assets:assetsToLoad
	})
	.on('error', (error)=>{
		console.log('Error :', error);
	})
	.on('progress', (p) => {
		console.log('Progress : ', p);
	})
	.on('complete', onAssetsLoaded)
	.start();

}

function onAssetsLoaded(o) {
	console.log('Assets Loaded :', o);

	const getAsset = (mID) => {
		const a = o.filter( a => a.id === mID);
		if(a.length === 0) {
			return null;
		}
		return a[0].file;
	}

	// const modelID = 'microphone';
	const modelID = 'head';
	const gltf = JSON.parse(getAsset(modelID));
	const bin = getAsset(`${modelID}_bin`);

	GLTFParser.parse(gltf, bin)
	.then(
		(o)=> {
			console.log('Parsed :', o);
			console.log('Nodes :', o.nodes);
			container = new Object3D();
			// const rotation = quat.clone(gltf.nodes[0].rotation)
			// container.setRotationFromQuaternion(rotation);
			// mesh = o.output.meshes[0];
			
		}, 
		(err) => {
			console.log('Error:', err);
		}
	);

	const modelID1 = 'microphone';
	const gltf1 = JSON.parse(getAsset(modelID1));
	const bin1 = getAsset(`${modelID1}_bin`);

	GLTFParser.parse(gltf1, bin1)
	.then(
		(o)=> {
			console.log('Parsed :', o);
			console.log('Nodes :', o.nodes);
			// container = new Object3D();
			// const rotation = quat.clone(gltf.nodes[0].rotation)
			// container.setRotationFromQuaternion(rotation);
			// mesh = o.output.meshes[0];
			
		}, 
		(err) => {
			console.log('Error:', err);
		}
	);
}


function render() {
	if(!container) {
		return
	}

	// GL.rotate(container.matrix);
	// shader.bind();
	// shader.uniform('color', 'vec3', [1, 1, 1]);
	// shader.uniform('opacity', 'float', 1);
	// GL.draw(mesh);
}
