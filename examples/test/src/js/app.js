// console.log('alfrid : ', alfrid);

// import glslify from 'glslify';
var glslify = require("glslify");

window.addEventListener('load', ()=>_init());
let number = new alfrid.EaseNumber(0, .01);
let cnt = 0;
let GL = alfrid.GL;

function _init() {
	alfrid.log();
	

	let canvas = document.createElement("canvas");
	canvas.className = 'Main-Canvas';

	document.body.appendChild(canvas);

	GL.init(canvas);
	// alfrid.GL.displayExtensions();

	alfrid.scheduler.addEF(loop);

	number.value = 1;


	//	CREATE CAMERA
	let camera = new alfrid.CameraOrtho();
	GL.setMatrices(camera);


	//	CREATE SHADER
	let shader = new alfrid.GLShader(glslify('../shaders/basic.vert'), glslify('../shaders/basic.frag'))
	shader.bind();

	//	CREATE GEOMETRY
	

	//	RENDER
	GL.draw();
}



function loop() {
	const max = 60 * 5;
	let gray = cnt / max;
	GL.clear(gray, gray, gray, 1);

	if(cnt++ > max) {
		window.location.href = './';
	}
}