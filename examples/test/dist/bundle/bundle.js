(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// console.log('alfrid : ', alfrid);

// import glslify from 'glslify';


var cnt = 0;
var GL = alfrid.GL;
var mesh = undefined,
    shader = undefined,
    camera = undefined,
    cameraPersp = undefined;
var texture = undefined;

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
	// alfrid.GL.displayExtensions();

	//	LOOPING
	alfrid.Scheduler.addEF(loop);

	//	CREATE CAMERA
	camera = new alfrid.CameraOrtho();

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
	shader = new alfrid.GLShader(null, "#define GLSLIFY 1\n// basic.frag\n\n#define SHADER_NAME BASIC_FRAGMENT\n\nprecision highp float;\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = texture2D(texture, vTextureCoord);\n}");
	shader.bind();
	shader.uniform("texture", "uniform1i", 0);
	texture.bind(0);

	//	CREATE GEOMETRY
	var positions = [];
	var coords = [];
	var indices = [0, 1, 2, 0, 2, 3];

	var size = 1;
	positions.push([-size, -size, 0]);
	positions.push([size, -size, 0]);
	positions.push([size, size, 0]);
	positions.push([-size, size, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	mesh = new alfrid.Mesh();
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
}

function loop() {
	var max = 60 * 5;
	var gray = 0;
	GL.clear(gray, gray, gray, 1);
	shader.uniform("time", "uniform1f", cnt * .1);

	GL.draw(mesh);

	if (cnt++ > max) {
		// window.location.href = './';
	}
}

},{}]},{},[1]);

//# sourceMappingURL=bundle.js.map
