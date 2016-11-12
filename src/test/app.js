import alfrid, { GL } from '../alfrid';
import SceneApp from './SceneApp';
import SceneParticle from './SceneParticle';
import SceneGrass from './SceneGrass';
import AssetsLoader from 'assets-loader';
import dat from 'dat-gui';
import '../scss/global.scss';
import Stats from 'stats.js';

console.debug('DEVELOPMENT BUILDING VERSION');
console.debug('DEVELOPMENT BUILDING VERSION');
console.debug('DEVELOPMENT BUILDING VERSION');
console.debug('DEVELOPMENT BUILDING VERSION');
console.debug('DEVELOPMENT BUILDING VERSION');

alfrid.log();

const assets = [
	{ id:'starsmap', url:'assets/img/starsmap.jpg' },
	{ id:'aoTree', url:'assets/img/ao-tree.jpg' },
	{ id:'factory', url:'assets/img/factory_radiance.dds', type: 'binary' },
	{ id:'objModel', url:'assets/obj/tree.obj', type:'text' },
	{ id:'radiance', url:'assets/img/studio_radiance.dds', type: 'binary' },
	{ id:'irr_posx', url:'assets/img/irr_posx.hdr', type:'binary' },
	{ id:'irr_posx', url:'assets/img/irr_posx.hdr', type:'binary' },
	{ id:'irr_posy', url:'assets/img/irr_posy.hdr', type:'binary' },
	{ id:'irr_posz', url:'assets/img/irr_posz.hdr', type:'binary' },
	{ id:'irr_negx', url:'assets/img/irr_negx.hdr', type:'binary' },
	{ id:'irr_negy', url:'assets/img/irr_negy.hdr', type:'binary' },
	{ id:'irr_negz', url:'assets/img/irr_negz.hdr', type:'binary' },
];

const faces = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'];
const NUM_LEVELS = 8;
for (let i = 0; i <= NUM_LEVELS; i++) {
	for (let j = 0; j < faces.length; j++) {
		const face = faces[j];
		const level = `mip${i}`;
		const id = `${level}_rad_${face}`;
		const url = `assets/img/${level}/rad_${face}.hdr`;

		assets.push({
			id,
			url,
			type: 'binary'
		});
	}
}


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
	// const scene = new SceneGrass();


	const stats = new Stats();
	document.body.appendChild(stats.domElement);
	alfrid.Scheduler.addEF(()=> {
		stats.update();
	});
}