// main.js
import './global.scss';
import quickSetup from './utils/quickSetup';
import AssetsLoader from 'assets-loader';
import { GL, Geom, GLShader, TouchDetector, BatchBall } from '../src/alfrid';
import fs from './test.frag';

let loader;
let cube, shader;
let hit = vec3.fromValues(999, 999, 99);
let ball;
let mtx = mat4.create();
mat4.translate(mtx, mtx, vec3.fromValues(1, 0, 0));


function render() {
	let s = .1;
	ball.draw(hit, [s, s, s], [1, 0, 0]);

	GL.rotate(mtx);
	shader.bind();
	GL.draw(cube);
}


quickSetup(render)
.then((o)=> {
	cube = Geom.cube(1, 1, 1);
	shader = new GLShader(null, fs);
	ball = new BatchBall();

	const detector = new TouchDetector(cube, o.camera, false);
	mat4.copy(detector.mtxModel, mtx);

	detector.on('onHit', (o)=> {
		vec3.copy(hit, o.detail.hit);
	});

	const assets = [
		{"id":"scene","url":"assets/models/scene.gltf","type":"text"},
	];

	loader = new AssetsLoader({
		assets		
	}).on('error', (err)=> {
		console.log('Error loading :', err);
	}).on('complete', (o) => {
		_onAssetsLoaded(o);
	}).start();

});


function _onAssetsLoaded(o) {
	window.assets = o;
	console.log('Assets Loaded : ', o);

	const gltfScene = JSON.parse(getAsset('scene'));
	console.log(gltfScene);
}




function loadGltf() {

}


function getAsset(id) {
	const o = assets.find( a => {
		return a.id === id;
	});

	if(!o) {
		return null;
	}
	return o.file;
}