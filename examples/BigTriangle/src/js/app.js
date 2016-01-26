import alfrid from '../../../../build/alfrid.js';
var glslify = require("glslify");


window.addEventListener('resize', ()=>resize());

let canvas, camera, batch, mesh, shader, GL, img, texture;


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

	camera = new alfrid.CameraOrtho();

	mesh = alfrid.Geom.bigTriangle();

	shader = new alfrid.GLShader(glslify('../shaders/bigTriangle.vert'), glslify('../shaders/uv.frag'));

	texture = new alfrid.GLTexture(img);

	batch = new alfrid.Batch(mesh, shader);

	alfrid.Scheduler.addEF(() => _loop());

}


function _loop() {
	GL.clear(0, 0, 0, 0);
	GL.setMatrices(camera);

	shader.bind();
	shader.uniform("texture", "uniform1i", 0);
	texture.bind(0);
	
	batch.draw();
}
