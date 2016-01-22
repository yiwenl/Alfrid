// console.log('alfrid : ', alfrid);

// import glslify from 'glslify';
var glslify = require("glslify");

window.addEventListener('load', ()=>_init());
let cnt = 0;
let GL = alfrid.GL;
let mesh, shader, camera;

function _init() {
	alfrid.log();

	let canvas = document.createElement("canvas");
	canvas.className = 'Main-Canvas';
	document.body.appendChild(canvas);

	GL.init(canvas);
	// alfrid.GL.displayExtensions();

	//	LOOPING
	alfrid.Scheduler.addEF(loop);



	//	CREATE CAMERA
	camera = new alfrid.CameraOrtho();
	GL.setMatrices(camera);


	//	CREATE SHADER
	shader = new alfrid.GLShader(glslify('../shaders/basic.vert'), glslify('../shaders/basic.frag'))
	shader.bind();

	//	CREATE GEOMETRY
	var positions = [];
	var coords = [];
	var indices = [0, 1, 2, 0, 2, 3];

	positions.push([-1, -1, 0]);
	positions.push([ 1, -1, 0]);
	positions.push([ 1,  1, 0]);
	positions.push([-1,  1, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	mesh = new alfrid.Mesh();
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	

	//	RENDER
	
}



function loop() {
	const max = 60 * 5;
	let gray = 0;
	GL.clear(gray, gray, gray, 1);

	GL.draw(mesh);

	if(cnt++ > max) {
		// window.location.href = './';
	}
}