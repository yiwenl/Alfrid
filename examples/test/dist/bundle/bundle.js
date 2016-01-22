(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// console.log('alfrid : ', alfrid);

// import glslify from 'glslify';


window.addEventListener('load', function () {
	return _init();
});
var cnt = 0;
var GL = alfrid.GL;
var mesh = undefined,
    shader = undefined,
    camera = undefined;

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
	GL.setMatrices(camera);

	//	CREATE SHADER
	shader = new alfrid.GLShader("#define GLSLIFY 1\n// basic.vert\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "#define GLSLIFY 1\n// basic.frag\n\n#define SHADER_NAME BASIC_FRAGMENT\n\nprecision highp float;\nvarying vec2 vTextureCoord;\n// uniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = vec4(vTextureCoord, 0.0, 1.0);\n}");
	shader.bind();

	//	CREATE GEOMETRY
	var positions = [];
	var coords = [];
	var indices = [0, 1, 2, 0, 2, 3];

	positions.push([-1, -1, 0]);
	positions.push([1, -1, 0]);
	positions.push([1, 1, 0]);
	positions.push([-1, 1, 0]);

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
	var max = 60 * 5;
	var gray = 0;
	GL.clear(gray, gray, gray, 1);

	GL.draw(mesh);

	if (cnt++ > max) {
		// window.location.href = './';
	}
}

},{}]},{},[1]);

//# sourceMappingURL=bundle.js.map
