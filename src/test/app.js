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
	{ id:'factory', url:'assets/img/factory.dds', type: 'binary' },
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

}