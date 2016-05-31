import alfrid from '../../../../build/alfrid.js';
var glslify = require("glslify");


window.addEventListener('resize', ()=>resize());

let GL;
let time = 0;
let fbo;
let meshSphere, meshCube, meshFloor;
let shaderShadow, shaderColor;
let camera, cameraLight;
let lightPosition = vec3.fromValues(0.0, 4.0, .0);

if(document.body) {
	_init();
} else {
	window.addEventListener('load', ()=>_init());
}


function _init() {

	//	CREATE CANVAS
	let canvas                  = document.createElement("canvas");
	canvas.className            = 'Main-Canvas';
	document.body.appendChild(canvas);
	
	//	INIT GL TOOL
	alfrid.GL.init(canvas);
	GL                          = alfrid.GL;
	
	//	CREATE CAMERA
	camera                      = new alfrid.CameraPerspective();
	let fov                     = 90*Math.PI/180;
	camera.setPerspective(fov, GL.aspectRatio, 1., 2000);
	
	cameraLight                 = new alfrid.CameraPerspective();
	cameraLight.setPerspective(fov*3, 1, 1., 2000);
	cameraLight.lookAt(lightPosition, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 1, 0));
	
	//	ORBIAL CAMERA CONTROL
	let orbitalControl          = new alfrid.OrbitalControl(camera, window, 15);
	orbitalControl.radius.value = 10;
	
	//	CREATE MESH
	let size                    = .5;
	meshCube                    = alfrid.Geom.cube(size, size, size);
	size                        = 16;
	meshFloor                   = alfrid.Geom.cube(size, .001, size);
	meshSphere                  = alfrid.Geom.sphere(.1, 24, true);
	
	//	CREATE SHADER
	shaderColor                 = new alfrid.GLShader(glslify('../shaders/basic.vert'), glslify('../shaders/simpleColor.frag'));
	shaderShadow                = new alfrid.GLShader(glslify('../shaders/shadow.vert'), glslify('../shaders/shadow.frag'));
	
	//	CREATE FRAMEBUFFER
	let fboSize                 = 1024;
	fbo                         = new alfrid.FrameBuffer(fboSize, fboSize);

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
	drawScene(shaderColor, true);
	fbo.unbind();

	GL.viewport(0, 0, GL.width, GL.height);
	GL.setMatrices(camera);
	shaderColor.bind();
	shaderColor.uniform("color", "uniform3fv", [1, 1, .79]);
	shaderColor.uniform("position", "uniform3fv", lightPosition);
	GL.draw(meshSphere);	//	LIGHT SOURCE


	let shadowMatrix = mat4.create();
	mat4.multiply(shadowMatrix, cameraLight.projection, cameraLight.viewMatrix);
	
	shaderShadow.bind();
	shaderShadow.uniform("uShadowStrength", "uniform1f", 0.4);
	shaderShadow.uniform("lightPosition", "uniform3fv", lightPosition);
	shaderShadow.uniform("uShadowMatrix", "uniformMatrix4fv", shadowMatrix);
	shaderShadow.uniform("textureDepth", "uniform1i", 0);
	fbo.getDepthTexture().bind(0);

	drawScene(shaderShadow, false);
}

function drawScene(shader, isShadowMap) {
	if(!isShadowMap) {
		shader.uniform("color", "uniform3fv", [1, 1, 1]);
		shader.uniform("opacity", "uniform1f", 1);
		shader.uniform("position", "uniform3fv", [0, -1.5, 0]);
		shader.uniform("rotation", "uniform1f", 0);
		GL.draw(meshFloor);	
	}
	

	shader.uniform("rotation", "uniform1f", time);
	shader.uniform("color", "uniform3fv", [1, 1, .5]);
	shader.uniform("position", "uniform3fv", [0, 1+Math.sin(time) * .35, 0]);
	GL.draw(meshCube);

	shader.uniform("rotation", "uniform1f", time);
	shader.uniform("color", "uniform3fv", [1, .5, 1]);
	shader.uniform("position", "uniform3fv", [1, 0, 1+Math.cos(time) * .35]);
	GL.draw(meshCube);
}


function resize() {
	console.log('resize');
	GL.setSize(window.innerWidth, window.innerHeight);
	camera.setAspectRatio(GL.aspectRatio);
}