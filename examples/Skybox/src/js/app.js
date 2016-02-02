import alfrid from '../../../../build/alfrid.js';
import AssetLoader from 'assets-loader';
var glslify = require("glslify");

// let assets = [
// 	{id:'posx', url:'assets/posx.jpg'},
// 	{id:'posy', url:'assets/posy.jpg'},
// 	{id:'posz', url:'assets/posz.jpg'},
// 	{id:'negx', url:'assets/negx.jpg'},
// 	{id:'negy', url:'assets/negy.jpg'},
// 	{id:'negz', url:'assets/negz.jpg'}
// ]

let assets = [
	{id:'posx', url:'assets/px.png'},
	{id:'posy', url:'assets/py.png'},
	{id:'posz', url:'assets/pz.png'},
	{id:'negx', url:'assets/nx.png'},
	{id:'negy', url:'assets/ny.png'},
	{id:'negz', url:'assets/nz.png'}
]

let loader = new AssetLoader({
	assets:assets
}).on('error', function(error) {
	console.error(error);
}).on('progress', function(p) {
	// console.log('Progress : ', p);
}).on('complete', _onImageLoaded)
.start();

window.addEventListener('resize', ()=>resize());

let canvas, camera, batch, mesh, shader, GL, texture, images, textureCube;
let batchSphere, shaderReflection;

function getImage(id) {
	for(let i=0; i<images.length; i++) {
		if(images[i].id === id) {
			return images[i].file;
		}
	}
}

function _onImageLoaded(imgs) {
	images = imgs;

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
	camera                      = new alfrid.CameraPerspective();
	camera.setPerspective(45*Math.PI/180, GL.aspectRatio, 1, 1000);
	
	//	ORBIAL CAMERA CONTROL
	let orbitalControl          = new alfrid.OrbitalControl(camera, window, 15);
	orbitalControl.radius.value = 10;
	orbitalControl.inverseControl(true);
	
	//	CREATE MESH
	mesh                        = alfrid.Geom.skybox(15);				//	SKYBOX
	let meshSphere              = alfrid.Geom.sphere(1, 24, true);			//	SPHERE
	
	//	CREATE TEXTURE
	let faces                   = [getImage('posx'), getImage('negx'), getImage('posy'), getImage('negy'), getImage('posz'), getImage('negz')];
	textureCube                 = new alfrid.GLCubeTexture(faces);
	
	//	CREATE SHADER
	shader                      = new alfrid.GLShader(glslify('../shaders/skybox.vert'), glslify('../shaders/skybox.frag'));
	shaderReflection            = new alfrid.GLShader(glslify('../shaders/reflection.vert'), glslify('../shaders/reflection.frag'));
	
	//	CREATE BATCH
	batch                       = new alfrid.Batch(mesh, shader);
	batchSphere                 = new alfrid.Batch(meshSphere, shaderReflection);

	//	LOOPING
	alfrid.Scheduler.addEF(() => _loop());

}


function _loop() {
	GL.clear(0, 0, 0, 0);
	GL.setMatrices(camera);

	//	DRAW SKYBOX
	shader.bind();
	shader.uniform('texture', 'uniform1i', 0);
	textureCube.bind(0);
	batch.draw();


	//	DRAW SPHERE
	shaderReflection.bind();
	shaderReflection.uniform("cameraPosition", "uniform3fv", GL.camera.position);
	shaderReflection.uniform("texture", "uniform1i", 0);
	textureCube.bind(0);
	batchSphere.draw();
	
}


function resize() {
	console.log('resize');
	GL.setSize(window.innerWidth, window.innerHeight);
	camera.setAspectRatio(GL.aspectRatio);
}