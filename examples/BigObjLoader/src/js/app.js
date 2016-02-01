import alfrid from '../../../../build/alfrid.js';
var glslify = require("glslify");


window.addEventListener('resize', ()=>resize());

let canvas, camera, batch, mesh, shader, GL, objLoader;

if(document.body) {
	_init();
} else {
	window.addEventListener('load', ()=>_init());
}


function _init() {
	//	CREATE CANVAS
	canvas = document.createElement("canvas");
	canvas.className = 'Main-Canvas';
	document.body.appendChild(canvas);

	//	INIT GL TOOL
	alfrid.GL.init(canvas);
	GL = alfrid.GL;

	objLoader = new alfrid.ObjLoader();
	objLoader.load('assets/tree.obj', (e)=>_onLoaded(e), false);
}

function _onLoaded(mMesh) {
	mesh = mMesh;
	let isBigMesh = mesh.length ? true : false;
	console.log('Obj Loaded :', isBigMesh);

	//	CREATE CAMERA
	camera = new alfrid.CameraPerspective();
	camera.setPerspective(45*Math.PI/180, GL.aspectRatio, 1, 1000);
	let vec3 = alfrid.glm.vec3;

	//	ORBIAL CAMERA CONTROL
	let orbitalControl = new alfrid.OrbitalControl(camera, window, 15);
	orbitalControl.radius.value = 2;

	//	CREATE SHADER
	shader = new alfrid.GLShader(glslify('../shaders/basic.vert'), glslify('../shaders/mask.frag'));

	//	CREATE BATCH
	// batch = new alfrid.Batch(mesh, shader);

	//	LOOPING
	alfrid.Scheduler.addEF(() => _loop());
}



function _loop() {
	GL.clear(0, 0, 0, 0);
	GL.setMatrices(camera);

	// batch.draw();
	shader.bind();
	GL.draw(mesh);
}


function resize() {
	console.log('resize');
	GL.setSize(window.innerWidth, window.innerHeight);
	camera.setAspectRatio(GL.aspectRatio);
}