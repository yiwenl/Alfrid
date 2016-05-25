import alfrid from '../alfrid';
import SceneApp from './SceneApp';
import '../scss/global.scss';

console.debug('DEVELOPMENT BUILDING VERSION');
console.debug('DEVELOPMENT BUILDING VERSION');
console.debug('DEVELOPMENT BUILDING VERSION');
console.debug('DEVELOPMENT BUILDING VERSION');
console.debug('DEVELOPMENT BUILDING VERSION');

alfrid.log();

if(document.body) {
	_init();
} else {
	window.addEventListener('load', ()=>_init());
}


function _init() {
	//	CREATE CANVAS
	const canvas = document.createElement('canvas');
	canvas.className = 'Main-Canvas';
	document.body.appendChild(canvas);
	

	//	INIT GL TOOL
	alfrid.GL.init(canvas);

	//	INIT SCENE
	const scene = new SceneApp();
}