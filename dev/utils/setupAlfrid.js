// setupAlfrid.js

import alfrid from '../../src/alfrid';
const { GL, OrbitalControl } = alfrid;

const setStyle = (mTarget, mStyleName, mValue) => {
	mTarget.style[mStyleName] = mValue;
}


const resizeCanvas = (mCanvas) => {
	setStyle(mCanvas, 'width', '100%');
	setStyle(mCanvas, 'height', '100%');
	setStyle(mCanvas, 'top', '0');
	setStyle(mCanvas, 'left', '0');
}


const setupAlfrid = (initOptions, functions) => new Promise((resolve, reject) => {
	const canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);
	resizeCanvas(canvas);
	

	GL.init(canvas, initOptions);
	GL.enableAlphaBlending();

	const { init, render, resize } = functions;
	const camera = new alfrid.CameraPerspective(Math.PI/4, canvas.width/canvas.height, .1, 100);
	const orbitalControl = new OrbitalControl(camera, window, 10);

	//	INIT
	if(init) {
		init(camera, orbitalControl);
	}


	//	LOOPING
	if(render) {
		alfrid.Scheduler.addEF(render);
	}


	window.addEventListener('resize', () => {
		resizeCanvas(canvas);

		GL.setSize(window.innerWidth, window.innerHeight);
		camera.setAspectRatio(GL.aspectRatio);

		if(resize) {
			resize();
		}
	})

	resolve({
		canvas,
		camera
	});
});


module.exports = setupAlfrid;