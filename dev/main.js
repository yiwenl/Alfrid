// main.js
import './global.scss';
import quickSetup from './utils/quickSetup';
import AssetsLoader from 'assets-loader';
import alfrid, { GL, Geom, GLShader, TouchDetector, BatchBall, BatchCopy, GLTexture, GLTexture2 } from '../src/alfrid';
import fs from './test.frag';


let loader, bCopy, texture, fbo;
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



	if(!texture) {
		return;
	}

	fbo.bind();
	GL.clear(1, 0, 0, 1);
	GL.draw(cube);	
	fbo.unbind();


	s = 200;
	GL.viewport(s, 0, s, s);
	bCopy.draw(texture);
	GL.viewport(0, 0, s, s);
	bCopy.draw(fbo.getTexture());

	GL.viewport(0, 0, GL.width, GL.height);
}

quickSetup(render)
.then((o)=> {
	cube = Geom.cube(1, 1, 1);
	shader = new GLShader(null, fs);
	ball = new BatchBall();
	bCopy = new BatchCopy();

	const detector = new TouchDetector(cube, o.camera, false);
	mat4.copy(detector.mtxModel, mtx);

	detector.on('onHit', (o)=> {
		vec3.copy(hit, o.detail.hit);
	});


	const assets = [
		{"id":"image","url":"assets/img/test.jpg"},
		{"id":"hdr","url":"assets/img/singleLight.hdr","type":"binary"},
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

	const img = getAsset('image');
	// texture = new GLTexture(img);

	const source = new Float32Array([
		255, 0, 0, 255,
		0, 255, 0, 255,
		0, 0, 255, 255,
		255, 255, 0, 255
	]);

	const source1 = [
		255, 0, 0, 255,
		0, 255, 0, 255,
		0, 0, 255, 255,
		255, 255, 0, 255
	];

	// texture = new GLTexture2(img, {magFilter:GL.LINEAR}, 512, 512);
	texture = new GLTexture2(source1, {magFilter:GL.NEAREST});
	// texture = new GLTexture2(source1, {magFilter:GL.NEAREST}, 2, 2);

	const s = 1024;
	fbo = new alfrid.FrameBuffer(s, s)
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