// main.js
import './global.scss';
import quickSetup from './utils/quickSetup';
import AssetsLoader from 'assets-loader';
import alfrid, { GL, Geom, GLShader, TouchDetector, BatchBall, BatchCopy, GLTexture, FboPingPong } from '../src/alfrid';
import fs from './test.frag';
import fsNoise from './noise.frag';
import fsUV from './uv.frag';

var random = function(min, max) { return min + Math.random() * (max - min);	}


let loader, bCopy, texture, textureData, textureHdr, textureVideo, fbo;
let cube, shader, floor, shaderCopy;
let hit = vec3.fromValues(999, 999, 99);
let ball;
let mtx = mat4.create();
let x, y;
mat4.translate(mtx, mtx, vec3.fromValues(1, 0, 0));

let params = {
	minFilter:'NEAREST',
	wrapS:'CLAMP_TO_EDGE',
	wrapT:'CLAMP_TO_EDGE'
}

function render() {
	if(!ball) {
		return;
	}
	// if(!texture) { return; }


	let s = .2;
	ball.draw([x.value, y.value, 0], [s, s, s], [1, 0, 0]);


	s = 256;
	GL.viewport(0, 0, s, s);
	if(!bCopy) {
		bCopy = new alfrid.BatchCopy();
	}
	bCopy.draw(fbo.getTexture());
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
	// window.assets = o;
	// console.log('Assets Loaded : ');
	// console.table(o);

	// const img = getAsset('image');
	// // texture = new GLTexture(img);

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

	// texture = new GLTexture(img, {minFilter:GL.NEAREST, wrapS:GL.MIRRORED_REPEAT}, 512, 512);

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
		console.log('Change :', GL[o]);
		fbo.getTexture().minFilter = GL[o];
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


	const size = 512;
	fbo = new alfrid.FrameBuffer(size, size, {
		minFilter:GL.NEAREST,
		magFilter:GL.NEAREST
	});

	const shaderNoise = new alfrid.GLShader(alfrid.ShaderLibs.bigTriangleVert, fsNoise);
	const mesh = alfrid.Geom.bigTriangle();
	fbo.bind();
	shaderNoise.bind();
	GL.draw(mesh);
	fbo.unbind();

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