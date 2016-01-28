import alfrid from '../../../../build/alfrid.js';
var glslify = require("glslify");


window.addEventListener('resize', ()=>resize());

let canvas, camera, cameraOrtho, batch, mesh, shader, GL, img, texture, fbo, shaderPost, batchPost, batchCopy;
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
	cameraOrtho = new alfrid.CameraOrtho();

	//	ORBIAL CAMERA CONTROL
	let orbitalControl = new alfrid.OrbitalControl(camera, window, 15);
	orbitalControl.radius.value = 10;

	//	CREATE MESH
	let size = 2;
	mesh = alfrid.Geom.cube(size, size, size, true);
	let meshPost = alfrid.Geom.plane(2, 2, 1);

	//	CREATE TEXTURE
	texture = new alfrid.GLTexture(img);

	//	CREATE SHADER
	shader = new alfrid.GLShader(glslify('../shaders/basic.vert'), glslify('../shaders/cube.frag'));
	shaderPost = new alfrid.GLShader(alfrid.ShaderLibs.generalVert, glslify('../shaders/post.frag'));

	//	CREATE BATCH
	batch = new alfrid.Batch(mesh, shader);
	batchPost = new alfrid.Batch(meshPost, shaderPost);
	batchCopy = new alfrid.BatchCopy();

	//	CREATE FRAMEBUFFER
	fbo = new alfrid.FrameBuffer(1024, 1024);

	//	LOOPING
	alfrid.Scheduler.addEF(() => _loop());

}


function _loop() {

	GL.clear(0, 0, 0, 0);
	GL.setMatrices(camera);

	fbo.bind();
	GL.clear(0, 0, 0, 0);
	time += .02;
	shader.bind();
	shader.uniform('texture', 'uniform1i', 0);
	shader.uniform('time', 'uniform1f', time);
	texture.bind(0);

	batch.draw();
	fbo.unbind();

	GL.viewport(0, 0, GL.width, GL.height);
	GL.disable(GL.DEPTH_TEST);
	GL.setMatrices(cameraOrtho);
	shaderPost.bind();
	shaderPost.uniform('texture', 'uniform1i', 0);
	shaderPost.uniform('scale', 'uniform3fv', [1, 1, 1]);
	fbo.getTexture().bind(0);
	batchPost.draw();

	let size = 150;
	GL.viewport(0, 0, size, size/GL.aspectRatio);
	batchCopy.draw(fbo.getDepthTexture());
	GL.enable(GL.DEPTH_TEST);
}


function resize() {
	
	GL.setSize(window.innerWidth, window.innerHeight);
	camera.setAspectRatio(GL.aspectRatio);
}