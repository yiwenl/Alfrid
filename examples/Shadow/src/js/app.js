import alfrid from '../../../../build/alfrid.js';
var glslify = require("glslify");


window.addEventListener('resize', ()=>resize());

let canvas, batch, GL, img, texture, shaderShadow, shaderColor, batchCopy;
let time = 0;
let fbo;
let meshSphere, mesh, meshFloor;
let camera, cameraOrtho, cameraLight;

let lightPosition = vec3.fromValues(0.5, 4.0, .0);

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
	let fov = 45*Math.PI/180;
	camera.setPerspective(fov, GL.aspectRatio, 1., 2000);

	cameraLight = new alfrid.CameraPerspective();
	cameraLight.setPerspective(fov, 1, 1., 2000);
	cameraLight.lookAt(lightPosition, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 1, 0));

	cameraOrtho = new alfrid.CameraOrtho();

	//	ORBIAL CAMERA CONTROL
	let orbitalControl = new alfrid.OrbitalControl(camera, window, 15);
	orbitalControl.radius.value = 10;

	//	CREATE MESH
	let size = .5;
	mesh = alfrid.Geom.cube(size, size, size, true);

	size = 16;
	meshFloor = alfrid.Geom.cube(size, .001, size, true);

	meshSphere = alfrid.Geom.sphere(.1, 24, true);


	//	CREATE TEXTURE
	texture = new alfrid.GLTexture(img);

	//	CREATE SHADER
	shaderColor = new alfrid.GLShader(glslify('../shaders/basic.vert'), glslify('../shaders/simpleColor.frag'));
	shaderShadow = new alfrid.GLShader(glslify('../shaders/shadow.vert'), glslify('../shaders/shadow.frag'));
	

	//	CREATE BATCH
	batchCopy = new alfrid.BatchCopy();

	let fboSize = 1024;
	fbo = new alfrid.FrameBuffer(fboSize, fboSize);

	//	LOOPING
	alfrid.Scheduler.addEF(() => _loop());

}


function _loop() {
	time += .03;
	GL.clear(0, 0, 0, 0);
	GL.setMatrices(cameraLight);
	lightPosition[0] = Math.cos(time) * 2;
	lightPosition[2] = Math.sin(time) * 2;
	cameraLight.lookAt(lightPosition, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 1, 0));


	fbo.bind();
	GL.clear(0, 0, 0, 0);
	shaderColor.bind();
	shaderColor.uniform("color", "uniform3fv", [1, 1, 1]);
	shaderColor.uniform("opacity", "uniform1f", 1);
	shaderColor.uniform("position", "uniform3fv", [0, -1.5, 0]);
	shaderColor.uniform("rotation", "uniform1f", 0);
	GL.draw(meshFloor);

	shaderColor.uniform("rotation", "uniform1f", time);
	shaderColor.uniform("color", "uniform3fv", [1, 1, .5]);
	shaderColor.uniform("position", "uniform3fv", [0, 1+Math.sin(time) * .35, 0]);
	GL.draw(mesh);

	fbo.unbind();

	GL.viewport(0, 0, GL.width, GL.height);
	GL.setMatrices(camera);
	shaderColor.bind();
	shaderColor.uniform("color", "uniform3fv", [1, 1, .79]);
	shaderColor.uniform("position", "uniform3fv", lightPosition);
	GL.draw(meshSphere);


	let shadowMatrix = mat4.create();
	mat4.multiply(shadowMatrix, cameraLight.projection, cameraLight.viewMatrix);

	shaderShadow.bind();
	shaderShadow.uniform("lightPosition", "uniform3fv", lightPosition);
	shaderShadow.uniform("uShadowMatrix", "uniformMatrix4fv", shadowMatrix);
	shaderShadow.uniform("textureDepth", "uniform1i", 0);
	fbo.getDepthTexture().bind(0);

	shaderShadow.uniform("rotation", "uniform1f", 0);
	shaderShadow.uniform("color", "uniform3fv", [1, 1, 1]);
	shaderShadow.uniform("position", "uniform3fv", [0, -1.5, 0]);
	GL.draw(meshFloor);

	shaderShadow.uniform("rotation", "uniform1f", time);
	shaderShadow.uniform("color", "uniform3fv", [1, 1, .5]);
	shaderShadow.uniform("position", "uniform3fv", [0, 1+Math.sin(time) * .35, 0]);
	GL.draw(mesh);
}


function resize() {
	console.log('resize');
	GL.setSize(window.innerWidth, window.innerHeight);
	camera.setAspectRatio(GL.aspectRatio);
}