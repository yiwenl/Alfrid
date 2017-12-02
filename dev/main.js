// main.js
import './global.scss';
import quickSetup from './utils/quickSetup';
import AssetsLoader from 'assets-loader';
import alfrid, { GL, Geom, GLShader, TouchDetector, BatchBall, BatchCopy, GLTexture, GLTexture2 } from '../src/alfrid';
import fs from './test.frag';
import fsUV from './uv.frag';


let loader, bCopy, texture, textureHdr, fbo;
let cube, shader, floor, shaderCopy;
let hit = vec3.fromValues(999, 999, 99);
let ball;
let mtx = mat4.create();
mat4.translate(mtx, mtx, vec3.fromValues(1, 0, 0));

let params = {
	minFilter:'NEAREST',
	wrapS:'CLAMP_TO_EDGE',
	wrapT:'CLAMP_TO_EDGE'
}

function render() {
	if(!texture) {
		return;
	}


	// fbo.bind();
	// GL.clear(0, 0, 0, 0);
	// shader.bind();
	// GL.draw(cube);
	// fbo.unbind();

	shaderCopy.bind();
	shaderCopy.uniform("texture", "uniform1i", 0);
	texture.bind(0);
	GL.draw(floor);

	// let s = 300;
	// GL.viewport(0, 0, s, s);
	// bCopy.draw(fbo.getTexture());

	// GL.viewport(0, 0, GL.width, GL.height);

}

quickSetup(render)
.then((o)=> {
	cube = Geom.cube(1, 1, 1);
	const floorSize = 20;
	floor = Geom.plane(floorSize, floorSize, 1, 'xz');
	shader = new GLShader(null, fs);
	shaderCopy = new GLShader(null, fsUV);
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
	console.log('Assets Loaded : ');
	console.table(o);

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
		255, 255, 0, 255,
		0, 255, 255, 255,
		255, 0, 255, 255
	];

	const source2 = [
		255, 0, 0, 255,
		0, 255, 0, 255,
		0, 0, 255, 255,
		255, 255, 0, 255
	];

	texture = new GLTexture2(img, {minFilter:GL.NEAREST}, 512, 512);
	console.log('texture :', texture);
	// texture = new GLTexture2(source1, {magFilter:GL.NEAREST}, 2, 3);
	// texture = new GLTexture2(source2, {minFilter:GL.NEAREST, magFilter:GL.NEAREST});
	// texture = new GLTexture2(source1, {magFilter:GL.NEAREST}, 2, 2);
	// const oHDR = alfrid.HDRLoader.parse(getAsset('hdr'));
	// textureHdr = new GLTexture2(oHDR.data, {}, oHDR.shape[0], oHDR.shape[1]);

	const s = 1024;
	// fbo = new alfrid.FrameBuffer(s, s);


	const MIP = ['LINEAR', 'LINEAR_MIPMAP_LINEAR', 'LINEAR_MIPMAP_NEAREST', 'NEAREST'];
	const WRAP = ['CLAMP_TO_EDGE', 'MIRRORED_REPEAT', 'REPEAT'];
	gui.add(params, 'minFilter', MIP).onChange(o=> {
		console.log(o);
		texture.minFilter = GL[o];
	});


	gui.add(params, 'wrapS', WRAP).onChange(o=> {
		texture.wrapS = GL[o];
	});

	gui.add(params, 'wrapT', WRAP).onChange(o=> {
		texture.wrapT = GL[o];
	});
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