import alfrid from '../../../../build/alfrid.min.js';
import SceneApp from './SceneApp';
import AssetsLoader from 'assets-loader';
import dat from 'dat-gui';

var glslify = require("glslify");

window.alfrid = alfrid;

window.params = {
	metallic:1,
	roughness:0,
	specular:1,
	offset:0,

	gamma:2.2,
	exposure:5
};

let assets = [
	{id:'irr_posx', url:'assets/irr_posx.hdr', type:'binary'},
	{id:'irr_posy', url:'assets/irr_posy.hdr', type:'binary'},
	{id:'irr_posz', url:'assets/irr_posz.hdr', type:'binary'},
	{id:'irr_negx', url:'assets/irr_negx.hdr', type:'binary'},
	{id:'irr_negy', url:'assets/irr_negy.hdr', type:'binary'},
	{id:'irr_negz', url:'assets/irr_negz.hdr', type:'binary'},

	{id:'rad_posx', url:'assets/rad_posx.hdr', type:'binary'},
	{id:'rad_posy', url:'assets/rad_posy.hdr', type:'binary'},
	{id:'rad_posz', url:'assets/rad_posz.hdr', type:'binary'},
	{id:'rad_negx', url:'assets/rad_negx.hdr', type:'binary'},
	{id:'rad_negy', url:'assets/rad_negy.hdr', type:'binary'},
	{id:'rad_negz', url:'assets/rad_negz.hdr', type:'binary'}
]
let loader = new AssetsLoader({
	assets:assets
}).on('error', function(error) {
	console.error(error);
}).on('progress', function(p) {
	// console.log('Progress : ', p);
}).on('complete', _onImageLoaded)
.start();


function _onImageLoaded(o) {
	window.assets = o;

	if(document.body) {
		_init();
	} else {
		window.addEventListener('load', ()=>_init());
	}
}


function _init() {
	//	CREATE CANVAS
	let canvas = document.createElement("canvas");
	canvas.className = 'Main-Canvas';
	document.body.appendChild(canvas);

	//	INIT GL TOOL
	alfrid.GL.init(canvas);

	//	INIT SCENE
	let scene = new SceneApp();

	let gui = new dat.GUI({width:300});
	gui.add(params, 'offset', 0, 1).listen();
	// gui.add(params, 'metallic', 0, 1).listen();
	// gui.add(params, 'roughness', 0, 1).listen();
	// gui.add(params, 'specular', 0.15, 1).listen();
	gui.add(params, 'gamma', 1, 10);
	gui.add(params, 'exposure', 1, 30);
}

