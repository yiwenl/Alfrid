// main.js
import './global.scss';
import quickSetup from './utils/quickSetup';
import AssetsLoader from 'assets-loader';
import alfrid, { GL, Geom, GLShader, TouchDetector, BatchBall, BatchCopy, GLTexture, FboPingPong, Draw } from '../src/alfrid';
import fs from './test.frag';
import fsNoise from './noise.frag';
import fsUV from './uv.frag';

var random = function(min, max) { return min + Math.random() * (max - min);	}


let loader, bCopy, texture, textureData, textureHdr, textureVideo, fbo, drawNoise;
let cube, shader, floor, shaderCopy;
let hit = vec3.fromValues(999, 999, 99);
let ball;
let mtx = mat4.create();
let x, y;
mat4.translate(mtx, mtx, vec3.fromValues(1, 0, 0));

let params = {
	minFilter:'NEAREST',
	magFilter:'NEAREST',
	wrapS:'CLAMP_TO_EDGE',
	wrapT:'CLAMP_TO_EDGE'
}

function render() {
	if(!ball) {	return; }
	if(!texture) { return; }
	if(!drawNoise) { return; }


	// console.log('drawNoise', drawNoise);
	drawNoise
	.uniform('uTime', 'float', alfrid.Scheduler.deltaTime)
	.draw();


	GL.viewport(0, 0, GL.width, GL.height);

	let s = .2;
	ball.draw([x.value, y.value, 0], [s, s, s], [1, 0, 0]);


	s = 1024;
	
	if(!bCopy) {
		bCopy = new alfrid.BatchCopy();
	}
	GL.disable(GL.DEPTH_TEST);
	

	GL.viewport(0, 0, s, s);
	bCopy.draw(fbo.getTexture());
	GL.viewport(s, 0, s, s);
	bCopy.draw(texture);
	GL.enable(GL.DEPTH_TEST);
	GL.viewport(0, 0, GL.width, GL.height);
}

quickSetup(render)
.then((o)=> {

	const assets = [
		{"id":"image","url":"assets/img/test.jpg"},
		{"id":"image1","url":"assets/img/test1.jpg"},
		{"id":"image2","url":"assets/img/test2.jpg"},
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
	console.table(o);
	window.assets = o;
	// console.log('Assets Loaded : ');
	// console.table(o);

	const img = getAsset('image');
	// texture = new GLTexture(img);

	// const source = new Float32Array([
	// 	255, 0, 0, 255,
	// 	0, 255, 0, 255,
	// 	0, 0, 255, 255,
	// 	255, 255, 0, 255
	// ]);

	// const source1 = [
	// 	255, 0, 0, 255,
	// 	0, 255, 0, 255,
	// 	0, 0, 255, 255,
	// 	255, 255, 0, 255,
	// 	0, 255, 255, 255,
	// 	255, 0, 255, 255
	// ];

	// const source2 = [
	// 	255, 0, 0, 255,
	// 	0, 255, 0, 255,
	// 	0, 0, 255, 255,
	// 	255, 255, 0, 255
	// ];

	// const source3 = [
	// 	255, 255, 255, 255,
	// 	0, 0, 0, 255,
	// 	0, 0, 0, 255,
	// 	255, 255, 255, 255
	// ];	

	texture = new GLTexture(img, {minFilter:GL.NEAREST, wrapS:GL.MIRRORED_REPEAT});

	// console.log('texture', texture);
	// textureData = new GLTexture(source2, {magFilter:GL.NEAREST, minFilter:GL.NEAREST, type:GL.FLOAT});

	// const video = document.createElement("Video");
	// video.src = 'assets/video/color1.mp4';
	// video.loop = true;
	// video.load();
	// video.play();
	// textureVideo = new GLTexture(video);

	// const s = 1024;
	// fbo = new alfrid.FrameBuffer(s, s, {minFilter:GL.LINEAR_MIPMAP_NEAREST});

	const MIP = ['LINEAR', 'NEAREST', 'LINEAR_MIPMAP_LINEAR', 'LINEAR_MIPMAP_NEAREST'];
	const WRAP = ['CLAMP_TO_EDGE', 'MIRRORED_REPEAT', 'REPEAT'];
	gui.add(params, 'minFilter', MIP).onChange(o=> {
		fbo.getTexture().minFilter = GL[o];
		// fbo.getTexture().showParameters();
		texture.minFilter = GL[o];
	});

	gui.add(params, 'magFilter', MIP).onChange(o=> {
		fbo.getTexture().magFilter = GL[o];
		// fbo.getTexture().showParameters();
		texture.magFilter = GL[o];
	});

	// gui.add(params, 'wrapS', WRAP).onChange(o=> {
	// 	texture.wrapS = GL[o];
	// });

	// gui.add(params, 'wrapT', WRAP).onChange(o=> {
	// 	texture.wrapT = GL[o];
	// });


	ball = new BatchBall();
	x = new alfrid.SpringNumber(0);
	y = new alfrid.SpringNumber(0);
	x.limit(0, 2);

	window.addEventListener('mousedown', (e) => {
		console.log('mouse down');
		let r = 2;
		x.value = random(-r, r);
		y.value = random(-r, r);
	})


	const size = 256;
	fbo = new alfrid.FrameBuffer(size, size, {
		minFilter:GL.NEAREST,
		magFilter:GL.NEAREST,
		type:GL.FLOAT,
		mipmap:false
	});

	// const shaderNoise = new alfrid.GLShader(alfrid.ShaderLibs.bigTriangleVert, fsNoise);
	// const mesh = alfrid.Geom.bigTriangle();
	// fbo.bind();
	// shaderNoise.bind();
	// GL.draw(mesh);
	// fbo.unbind();

	drawNoise = new Draw()
		.setClearColor(1, 0, 0, 1)
		.useProgram(alfrid.ShaderLibs.bigTriangleVert, fsNoise)
		.setMesh(alfrid.Geom.bigTriangle())
		.bindFrameBuffer(fbo)
		.draw();

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