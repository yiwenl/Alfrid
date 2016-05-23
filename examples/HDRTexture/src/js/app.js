import alfrid from '../../../../build/alfrid.js';
var glslify = require("glslify");


window.addEventListener('resize', ()=>resize());

let canvas, camera, batch, mesh, shader, GL, img, texture;
let time = 0;
let hdrLoader = new alfrid.HDRLoader();

hdrLoader.load('assets/pisa.hdr', _onImageLoaded);



function _onImageLoaded(hdr) {
	console.log('Image Loaded', hdr);
	img = hdr;

	if(document.body) {
		_init();
	} else {
		window.addEventListener('load', ()=>_init());
	}
}


function _init() {
	//	CREATE CANVAS
	canvas = document.createElement("canvas");
	canvas.className = 'Main-Canvas';
	document.body.appendChild(canvas);

	//	INIT GL TOOL
	alfrid.GL.init(canvas);
	GL = alfrid.GL;

	//	CREATE CAMERA
	camera = new alfrid.CameraPerspective();
	camera.setPerspective(45*Math.PI/180, GL.aspectRatio, 1, 1000);

	//	ORBIAL CAMERA CONTROL
	let orbitalControl = new alfrid.OrbitalControl(camera, window, 15);
	orbitalControl.radius.value = 10;
	orbitalControl.inverseControl(true);

	//	CREATE MESH
	let size = 20;
	mesh = alfrid.Geom.sphere(size, 48, true);

	//	CREATE TEXTURE
	texture = new alfrid.GLTexture(img);

	//	CREATE SHADER
	shader = new alfrid.GLShader(glslify('../shaders/basic.vert'), glslify('../shaders/hdr.frag'));

	//	CREATE BATCH
	batch = new alfrid.Batch(mesh, shader);

	//	LOOPING
	alfrid.Scheduler.addEF(() => _loop());

}


function _loop() {
	GL.clear(0, 0, 0, 0);
	GL.setMatrices(camera);

	time += .02;
	shader.bind();
	shader.uniform('texture', 'uniform1i', 0);
	let exposure = (Math.sin(time) * .5 + .5) * 10.0 + 1.0;
	shader.uniform('exposure', 'uniform1f', exposure);
	texture.bind(0);

	batch.draw();
}


function resize() {
	console.log('resize');
	GL.setSize(window.innerWidth, window.innerHeight);
	camera.setAspectRatio(GL.aspectRatio);
}