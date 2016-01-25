(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// console.log('alfrid : ', alfrid);

// import glslify from 'glslify';


var cnt = 0;
var GL = alfrid.GL;
var mesh = undefined,
    shader = undefined,
    cameraOrtho = undefined,
    cameraPersp = undefined,
    meshPlane = undefined,
    meshSphere = undefined,
    batchSphere = undefined,
    shaderUV = undefined,
    meshPlane2 = undefined;
var texture = undefined;
var batchCopy = undefined,
    batch = undefined,
    batch2 = undefined;

var img = new Image();
img.onload = function () {
	if (window.body) {
		_init();
	} else {
		window.addEventListener('load', function () {
			return _init();
		});
	}
};
img.src = './assets/image.jpg';

function _init() {
	alfrid.log();

	var canvas = document.createElement("canvas");
	canvas.className = 'Main-Canvas';
	document.body.appendChild(canvas);

	GL.init(canvas);
	// alfrid.GL.showExtensions();

	//	LOOPING
	alfrid.Scheduler.addEF(loop);

	//	CREATE CAMERA
	cameraOrtho = new alfrid.CameraOrtho();

	cameraPersp = new alfrid.CameraPerspective();
	cameraPersp.setPerspective(45 * Math.PI / 180, GL.aspectRatio, 1, 1000);
	var eye = vec3.clone([0, 0, 5]);
	var center = vec3.create();
	var up = vec3.clone([0, 1, 0]);
	cameraPersp.lookAt(eye, center, up);

	var orbitalControl = new alfrid.OrbitalControl(cameraPersp, window, 15);
	orbitalControl.radius.value = 5;

	GL.setMatrices(cameraPersp);

	//	CREATE TEXTURE
	texture = new alfrid.GLTexture(img);

	//	CREATE SHADER
	shader = new alfrid.GLShader(null, "#define GLSLIFY 1\n// basic.frag\n\n#define SHADER_NAME BASIC_FRAGMENT\n\nprecision highp float;\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\nuniform float time;\n\nvoid main(void) {\n    gl_FragColor = texture2D(texture, vTextureCoord);\n    // gl_FragColor = vec4(vTextureCoord, sin(time) * .5 + .5, 1.0);\n}");
	shaderUV = new alfrid.GLShader(null, "#define GLSLIFY 1\n// basic.frag\n\n#define SHADER_NAME BASIC_FRAGMENT\n\nprecision highp float;\nvarying vec2 vTextureCoord;\n// uniform sampler2D texture;\nuniform float time;\n\nvoid main(void) {\n    // gl_FragColor = texture2D(texture, vTextureCoord);\n    gl_FragColor = vec4(vTextureCoord, sin(time) * .5 + .5, 1.0);\n}");
	shader.bind();
	shader.uniform("texture", "uniform1i", 0);
	texture.bind(0);

	//	CREATE GEOMETRY
	var positions = [];
	var coords = [];
	var indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7];

	var size = 1;
	var xOffset = .5;
	positions.push([-size - xOffset, -size, -0.5]);
	positions.push([size - xOffset, -size, -0.5]);
	positions.push([size - xOffset, size, -0.5]);
	positions.push([-size - xOffset, size, -0.5]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	positions.push([-size + xOffset, -size, 0.5]);
	positions.push([size + xOffset, -size, 0.5]);
	positions.push([size + xOffset, size, 0.5]);
	positions.push([-size + xOffset, size, 0.5]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	mesh = new alfrid.Mesh();
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);

	meshPlane = alfrid.Geom.plane(2, 2 * 983 / 736, 12, false, 'xz', GL.LINES);

	meshPlane2 = alfrid.Geom.plane(2, 2 * 983 / 736, 1);
	// let meshPlane3 = alfrid.Geom.plane(2, 2, 4, false, 'yz', GL.LINES);

	// console.log(meshPlane.id, meshPlane2.id, meshPlane3.id);
	meshSphere = alfrid.Geom.sphere(1, 20);

	batch = new alfrid.Batch(meshPlane, shaderUV);
	batch2 = new alfrid.Batch(meshPlane2, shader);
	batchSphere = new alfrid.Batch(meshSphere, shaderUV);
	batchCopy = new alfrid.BatchCopy();
}

function loop() {
	var max = 60 * 5;
	var gray = 0;

	GL.viewport(0, 0, GL.width, GL.height);
	GL.setMatrices(cameraPersp);
	GL.clear(gray, gray, gray, 0);

	// shader.bind();

	// GL.draw(mesh);
	// console.log(batch.mesh.id);

	batch.draw();
	shaderUV.uniform("time", "uniform1f", cnt * .1);

	batch2.draw();
	shader.uniform("time", "uniform1f", cnt * .1);

	shaderUV.bind();

	batchSphere.draw();

	GL.viewport(0, 0, 100, 100 * 983 / 736);
	GL.setMatrices(cameraOrtho);
	batchCopy.draw(texture);

	if (cnt++ > max) {
		// window.location.href = './';
	}
}

},{}]},{},[1]);

//# sourceMappingURL=bundle.js.map
