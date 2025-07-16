// TextureMinFilter.js

import alfrid from '../../src/alfrid';
import setupAlfrid from '../utils/setupAlfrid';

const { GL, BatchAxis, Geom } = alfrid;

setupAlfrid({ignoreWebgl2:true}, {init, render, resize}).then((canvas)=> {
	console.log('canvas created:', canvas);
})
.catch((err) => {
	console.log('Error :', err);
});



function init(camera, orbitalControl) {
	// console.log('Init', GL);

}

function render() {
	// console.log('render', b);

}

function resize() {
}