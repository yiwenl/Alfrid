import alfrid from '../../../../build/alfrid.js';
var glslify = require("glslify");


window.addEventListener('resize', ()=>resize());

let canvas, camera, batch, mesh, shader, GL, img, texture;
let time = 0;


img = new Image();
img.addEventListener('load', ()=>_onImageLoaded());
img.src = 'assets/texture.jpg';


function _onImageLoaded() {
	console.log('Image Loaded');

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

	//	CREATE MESH
	let size = 2;
	mesh = alfrid.Geom.cube(size, size, size);
	mesh.computeNormals();

	//	CREATE TEXTURE
	texture = new alfrid.GLTexture(img);

	//	CREATE SHADER
	shader = new alfrid.GLShader(glslify('../shaders/basic.vert'), glslify('../shaders/cube.frag'));

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
	shader.uniform('time', 'uniform1f', time);
	texture.bind(0);

	batch.draw();
}


function resize() {
	console.log('resize');
	GL.setSize(window.innerWidth, window.innerHeight);
	camera.setAspectRatio(GL.aspectRatio);
}