// quickSetup.js

import { GL, BatchDotsPlane, BatchAxis, CameraPerspective, OrbitalControl } from '../../src/alfrid';
import Scheduler from 'scheduling';
import dat from 'dat-gui';
import AssetLoader from 'assets-loader';

/*
export default (mRender, mCallback, mResize) => {
	
}

*/


const quickSetup = (mAssetsList, mRender, mResize) => new Promise((resolve, reject) => {
	// create canvas
	const canvas = document.createElement("canvas");
	document.body.appendChild(canvas);


	// INIT GL
	GL.init(canvas);


	//	Camera
	const camera = new CameraPerspective();
	camera.setPerspective(Math.PI/4, window.innerWidth/window.innerHeight, .1, 100);

	//	Camera control
	const orbControl = new OrbitalControl(camera, window, 15);
	orbControl.rx.value = orbControl.ry.value = .3
	orbControl.radius.value = 5;


	//	Views
	const batchDots = new BatchDotsPlane();
	const batchAxis = new BatchAxis();


	//	render loop
	function loop() {
		GL.clear(0, 0, 0, 0);
		GL.setMatrices(camera);
		batchDots.draw();
		batchAxis.draw();

		if(mRender) {
			mRender();
		}
	}
	


	//	resizing
	window.addEventListener('resize', resize);
	function resize() {

		GL.setSize(window.innerWidth, window.innerHeight);
		camera.setPerspective(Math.PI/4, GL.aspectRatio, .1, 100);

		if(mResize) {
			mResize()
		}

	}
	resize();

	const o = {
		camera,
		orbControl
	}

	window.gui = new dat.GUI({width:300});
	mAssetsList = mAssetsList || [];

	console.log(mAssetsList);
	if(mAssetsList.length == 0) {
		Scheduler.addEF(loop);
		resolve(o);
	}

	const loader = new AssetLoader({
		assets:mAssetsList
	}).on('error', err => {
		console.log('Error :', err);
	}).on('progress', p => {
		console.log('Progress :', p);
	}).on('complete', (assets) => {
		window.assets = assets;
		window.getAsset = (id) => {
			const a = assets.filter( a => {
				return a.id === id;
			});

			if(!a) {
				return null;
			}

			return a[0].file;
		}

		resolve(o);	
		Scheduler.addEF(loop);
	})
	.start();

	
});


export default quickSetup;