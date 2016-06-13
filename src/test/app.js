import alfrid, { GL } from '../alfrid';
import SceneApp from './SceneApp';
import AssetsLoader from 'assets-loader';
import dat from 'dat-gui';
import '../scss/global.scss';

console.debug('DEVELOPMENT BUILDING VERSION');
console.debug('DEVELOPMENT BUILDING VERSION');
console.debug('DEVELOPMENT BUILDING VERSION');
console.debug('DEVELOPMENT BUILDING VERSION');
console.debug('DEVELOPMENT BUILDING VERSION');

alfrid.log();

const assets = [
	{ id:'irr_posx', url:'assets/img/irr_posx.hdr', type:'binary' },
	{ id:'irr_posy', url:'assets/img/irr_posy.hdr', type:'binary' },
	{ id:'irr_posz', url:'assets/img/irr_posz.hdr', type:'binary' },
	{ id:'irr_negx', url:'assets/img/irr_negx.hdr', type:'binary' },
	{ id:'irr_negy', url:'assets/img/irr_negy.hdr', type:'binary' },
	{ id:'irr_negz', url:'assets/img/irr_negz.hdr', type:'binary' },

	{ id:'rad_posx', url:'assets/img/rad_posx.hdr', type:'binary' },
	{ id:'rad_posy', url:'assets/img/rad_posy.hdr', type:'binary' },
	{ id:'rad_posz', url:'assets/img/rad_posz.hdr', type:'binary' },
	{ id:'rad_negx', url:'assets/img/rad_negx.hdr', type:'binary' },
	{ id:'rad_negy', url:'assets/img/rad_negy.hdr', type:'binary' },
	{ id:'rad_negz', url:'assets/img/rad_negz.hdr', type:'binary' }
];

if(document.body) {
	_init();
} else {
	window.addEventListener('DOMContentLoaded', _init);	
}


function _init() {
	//	CREATE CANVAS
	if(assets.length > 0) {
		document.body.classList.add('isLoading');

		const loader = new AssetsLoader({
			assets:assets
		})
		.on('error', (error) => {
			console.error(error);
		})
		.on('progress', (p) => {
			const loader = document.body.querySelector('.Loading-Bar');
			// if(loader) loader.style.width = (p * 100).toFixed(2) + '%';
		})
		.on('complete', _onImageLoaded)
		.start();	
	} else {
		_init3D();
	}
}




function _onImageLoaded(o) {

	//	ASSETS
	console.log('Image Loaded : ', o);
	document.body.classList.remove('isLoading');
	window.assets = o;	

	_init3D();
}


function _init3D() {
	//	CREATE CANVAS
	const canvas = document.createElement('canvas');
	canvas.className = 'Main-Canvas';
	document.body.appendChild(canvas);

	//	INIT 3D TOOL
	GL.init(canvas);

	window.gui = new dat.GUI({ width:300 });

	//	CREATE SCENE
	const scene = new SceneApp();

}