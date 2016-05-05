// console.log('alfrid : ', alfrid);

import DispatcherTest from './DispatcherTest';
// import glslify from 'glslify';
var glslify = require("glslify");


let cnt = 0;
let GL = alfrid.GL;
let mesh, shader, cameraOrtho, cameraPersp, meshPlane, meshSphere, batchSphere, shaderUV, meshPlane2;
let texture;
let batchCopy, batch, batch2;
let fbo;

let img = new Image();
img.onload = function() {
	if(window.body) {
		_init();
	} else {
		window.addEventListener('load', ()=>_init());
	}
}
img.src ='./assets/image.jpg';

window.addEventListener('resize', () => resize());


let dispatcher = new DispatcherTest();

// dispatcher.addEventListener('test', (o)=>onTest(o));
dispatcher.on('test', (o)=>onTest(o));

function onTest(o) {
	// console.log('onTest :', o);
}


function _init() {
	// alfrid.log();

	let canvas = document.createElement("canvas");
	canvas.className = 'Main-Canvas';
	document.body.appendChild(canvas);

	GL.init(canvas);
	alfrid.GL.showExtensions();

	//	LOOPING
	alfrid.Scheduler.addEF(loop);


	//	CREATE CAMERA
	cameraOrtho = new alfrid.CameraOrtho();

	cameraPersp = new alfrid.CameraPerspective();
	cameraPersp.setPerspective(45*Math.PI/180, GL.aspectRatio, 1, 1000);
	// var eye                = vec3.clone( [0, 0, 5]  );
	// var center             = vec3.create( );
	// var up                 = vec3.clone( [0, 1, 0] );
	// cameraPersp.lookAt(eye, center, up);


	let orbitalControl = new alfrid.OrbitalControl(cameraPersp, window, 15);
	orbitalControl.radius.value = 10;

	GL.setMatrices(cameraPersp);

	//	CREATE TEXTURE
	texture = new alfrid.GLTexture(img);

	//	CREATE SHADER
	shader = new alfrid.GLShader(null, glslify('../shaders/basic.frag'));
	shaderUV = new alfrid.GLShader(null, glslify('../shaders/uv.frag'));
	shader.bind();
	shader.uniform("texture", "uniform1i", 0);
	texture.bind(0);

	//	CREATE GEOMETRY
	var positions = [];
	var coords = [];
	var indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7];

	var size = 1;
	var xOffset = .5;
	positions.push([-size-xOffset, -size, -0.5]);
	positions.push([ size-xOffset, -size, -0.5]);
	positions.push([ size-xOffset,  size, -0.5]);
	positions.push([-size-xOffset,  size, -0.5]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	positions.push([-size+xOffset, -size, 0.5]);
	positions.push([ size+xOffset, -size, 0.5]);
	positions.push([ size+xOffset,  size, 0.5]);
	positions.push([-size+xOffset,  size, 0.5]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	mesh = new alfrid.Mesh();
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);


	
	//	MESH VIA GEOM

	// meshPlane  = alfrid.Geom.plane(7, 7*983/736, 12, false, 'xz');
	meshPlane  = alfrid.Geom.plane(5, 5, 1, false, 'xz');
	meshPlane2 = alfrid.Geom.plane(1.5, 1.5*983/736, 1);
	meshSphere = alfrid.Geom.sphere(1, 48);

	//	BATCH

	batch       = new alfrid.Batch(meshPlane, shader);
	batch2      = new alfrid.Batch(meshPlane2, shader);
	batchSphere = new alfrid.Batch(meshSphere, shaderUV);
	batchCopy   = new alfrid.BatchCopy();

	//	FRAME BUFFER
	let fboSize = 1024 * 2;
	fbo = new alfrid.FrameBuffer(fboSize, fboSize, {
		minFilter:GL.LINEAR_MIPMAP_LINEAR,
		magFilter:GL.LINEAR
	});
}


function loop() {
	
	const max = 60 * 5;
	let gray = 0;


	GL.enable(GL.DEPTH_TEST);
	GL.viewport(0, 0, GL.width, GL.height);
	fbo.bind();
	GL.setMatrices(cameraPersp);
	GL.clear(0, 0, 0, 0);


	//	WITHOUT BATCH : BIND SHADER THEN DRAW MESH

	shader.bind();
	GL.draw(mesh);


	//	DRAWING USING BATCH

	batch.draw();
	batch2.draw();
	shader.uniform("time", "float", cnt*.1);
	

	shaderUV.bind();
	shaderUV.uniform("time", "uniform1f", cnt*.1);
	
	batchSphere.draw();
	fbo.unbind();


	GL.setMatrices(cameraOrtho);
	GL.disable(GL.DEPTH_TEST);

	GL.viewport(0, 0, GL.width, GL.height);
	batchCopy.draw(fbo.getTexture());

	GL.viewport(0, 0, 200, 200/GL.aspectRatio);
	batchCopy.draw(fbo.getDepthTexture());

	GL.viewport(200, 0, 100, 100 *983/736);
	batchCopy.draw(texture);



	if(cnt++ > max) {
		// window.location.href = './';
	}

}

function resize() {
	GL.setSize(window.innerWidth, window.innerHeight);
	cameraPersp.setAspectRatio(GL.aspectRatio);
}