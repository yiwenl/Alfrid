// console.log('alfrid : ', alfrid);

// import glslify from 'glslify';
var glslify = require("glslify");


let cnt = 0;
let GL = alfrid.GL;
let mesh, shader, cameraOrtho, cameraPersp, batch, meshPlane;
let texture;
let batchCopy;

let img = new Image();
img.onload = function() {
	if(window.body) {
		_init();
	} else {
		window.addEventListener('load', ()=>_init());
	}
}
img.src ='./assets/image.jpg';

function _init() {
	alfrid.log();

	let canvas = document.createElement("canvas");
	canvas.className = 'Main-Canvas';
	document.body.appendChild(canvas);

	GL.init(canvas);
	// alfrid.GL.showExtensions();

	//	LOOPING
	alfrid.Scheduler.addEF(loop);



	//	CREATE CAMERA
	cameraOrtho = new alfrid.CameraOrtho();

	cameraPersp = new alfrid.CameraPerspective();
	cameraPersp.setPerspective(45*Math.PI/180, GL.aspectRatio, 1, 1000);
	var eye                = vec3.clone( [0, 0, 5]  );
	var center             = vec3.create( );
	var up                 = vec3.clone( [0, 1, 0] );
	cameraPersp.lookAt(eye, center, up);


	let orbitalControl = new alfrid.OrbitalControl(cameraPersp, window, 15);
	orbitalControl.radius.value = 5;

	GL.setMatrices(cameraPersp);

	//	CREATE TEXTURE
	texture = new alfrid.GLTexture(img);

	//	CREATE SHADER
	shader = new alfrid.GLShader(null, glslify('../shaders/basic.frag'));
	shader.bind();
	shader.uniform("texture", "uniform1i", 0);
	texture.bind(0);

	//	CREATE GEOMETRY
	var positions = [];
	var coords = [];
	var indices = [0, 1, 2, 0, 2, 3];

	var size = 1;
	var z = 
	positions.push([-size, -size, 0]);
	positions.push([ size, -size, 0]);
	positions.push([ size,  size, 0]);
	positions.push([-size,  size, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	mesh = new alfrid.Mesh();
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);

	meshPlane = alfrid.Geom.plane(2, 2*983/736, 1);

	batch = new alfrid.Batch(meshPlane, shader);
	batchCopy = new alfrid.BatchCopy();
}


function loop() {
	const max = 60 * 5;
	let gray = 0;

	GL.viewport(0, 0, GL.width, GL.height);
	GL.setMatrices(cameraPersp);
	GL.clear(gray, gray, gray, 0);
	shader.uniform("time", "uniform1f", cnt*.1);

	// GL.draw(mesh);
	batch.draw();

	GL.viewport(0, 0, 100, 100 *983/736);
	GL.setMatrices(cameraOrtho);
	batchCopy.draw(texture);



	if(cnt++ > max) {
		// window.location.href = './';
	}
}