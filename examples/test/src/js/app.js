// console.log('alfrid : ', alfrid);

// import glslify from 'glslify';
var glslify = require("glslify");


let cnt = 0;
let GL = alfrid.GL;
let mesh, shader, cameraOrtho, cameraPersp, meshPlane, meshSphere, batchSphere, shaderUV, meshPlane2;
let texture;
let batchCopy, batch, batch2;

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
	

	
	meshPlane = alfrid.Geom.plane(2, 2*983/736, 12, false, 'xz', GL.LINES);

	meshPlane2 = alfrid.Geom.plane(2, 2*983/736, 1);
	// let meshPlane3 = alfrid.Geom.plane(2, 2, 4, false, 'yz', GL.LINES);

	// console.log(meshPlane.id, meshPlane2.id, meshPlane3.id);
	meshSphere = alfrid.Geom.sphere(1, 20);

	batch = new alfrid.Batch(meshPlane, shaderUV);
	batch2 = new alfrid.Batch(meshPlane2, shader);
	batchSphere = new alfrid.Batch(meshSphere, shaderUV);
	batchCopy = new alfrid.BatchCopy();
}


function loop() {
	const max = 60 * 5;
	let gray = 0;

	GL.viewport(0, 0, GL.width, GL.height);
	GL.setMatrices(cameraPersp);
	GL.clear(gray, gray, gray, 0);
	
	
	// shader.bind();
	
	// GL.draw(mesh);
	// console.log(batch.mesh.id);

	batch.draw();
	shaderUV.uniform("time", "uniform1f", cnt*.1);

	batch2.draw();
	shader.uniform("time", "uniform1f", cnt*.1);
	

	shaderUV.bind();
	
	batchSphere.draw();

	GL.viewport(0, 0, 100, 100 *983/736);
	GL.setMatrices(cameraOrtho);
	batchCopy.draw(texture);



	if(cnt++ > max) {
		// window.location.href = './';
	}
}