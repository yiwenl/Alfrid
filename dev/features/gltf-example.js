// gltf-example.js
console.log('dev : gltf-example');
import AssetLoader from 'assets-loader';

import '../global.scss';
import quickSetup from '../utils/quickSetup';

import alfrid, { GL, WebglNumber } from 'src/alfrid';



quickSetup(render).then((o)=>init(o)).catch(err=>{
	console.log('Error :', err);
});


function init(o) {
	console.log('Init', o);

	const loader = new AssetLoader();
}


function render() {
	// console.log('render');
}