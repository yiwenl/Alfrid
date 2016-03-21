// Geom.js

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Mesh = require('./Mesh');

var _Mesh2 = _interopRequireDefault(_Mesh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Geom = {};

Geom.plane = function (width, height, numSegments) {
	var withNormals = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	var axis = arguments.length <= 4 || arguments[4] === undefined ? 'xy' : arguments[4];
	var drawType = arguments.length <= 5 || arguments[5] === undefined ? 4 : arguments[5];

	var positions = [];
	var coords = [];
	var indices = [];
	var normals = [];

	var gapX = width / numSegments;
	var gapY = height / numSegments;
	var gapUV = 1 / numSegments;
	var index = 0;
	var sx = -width * 0.5;
	var sy = -height * 0.5;

	for (var i = 0; i < numSegments; i++) {
		for (var j = 0; j < numSegments; j++) {
			var tx = gapX * i + sx;
			var ty = gapY * j + sy;

			if (axis === 'xz') {
				positions.push([tx, 0, -ty + gapY]);
				positions.push([tx + gapX, 0, -ty + gapY]);
				positions.push([tx + gapX, 0, -ty]);
				positions.push([tx, 0, -ty]);

				normals.push([0, 1, 0]);
				normals.push([0, 1, 0]);
				normals.push([0, 1, 0]);
				normals.push([0, 1, 0]);
			} else if (axis === 'yz') {
				positions.push([0, tx, ty]);
				positions.push([0, tx + gapX, ty]);
				positions.push([0, tx + gapX, ty + gapY]);
				positions.push([0, tx, ty + gapY]);

				normals.push([1, 0, 0]);
				normals.push([1, 0, 0]);
				normals.push([1, 0, 0]);
				normals.push([1, 0, 0]);
			} else {
				positions.push([tx, ty, 0]);
				positions.push([tx + gapX, ty, 0]);
				positions.push([tx + gapX, ty + gapY, 0]);
				positions.push([tx, ty + gapY, 0]);

				normals.push([0, 0, 1]);
				normals.push([0, 0, 1]);
				normals.push([0, 0, 1]);
				normals.push([0, 0, 1]);
			}

			var u = i / numSegments;
			var v = j / numSegments;

			coords.push([u, v]);
			coords.push([u + gapUV, v]);
			coords.push([u + gapUV, v + gapUV]);
			coords.push([u, v + gapUV]);

			indices.push(index * 4 + 0);
			indices.push(index * 4 + 1);
			indices.push(index * 4 + 2);
			indices.push(index * 4 + 0);
			indices.push(index * 4 + 2);
			indices.push(index * 4 + 3);

			index++;
		}
	}

	var mesh = new _Mesh2.default(drawType);
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	if (withNormals) {
		mesh.bufferNormal(normals);
	}

	return mesh;
};

Geom.sphere = function (size, numSegments) {
	var withNormals = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	var isInvert = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	var drawType = arguments.length <= 4 || arguments[4] === undefined ? 4 : arguments[4];

	var positions = [];
	var coords = [];
	var indices = [];
	var normals = [];
	var index = 0;
	var gapUV = 1 / numSegments;

	var getPosition = function getPosition(i, j) {
		var isNormal = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
		//	rx : -90 ~ 90 , ry : 0 ~ 360
		var rx = i / numSegments * Math.PI - Math.PI * 0.5;
		var ry = j / numSegments * Math.PI * 2;
		var r = isNormal ? 1 : size;
		var pos = [];
		pos[1] = Math.sin(rx) * r;
		var t = Math.cos(rx) * r;
		pos[0] = Math.cos(ry) * t;
		pos[2] = Math.sin(ry) * t;

		var precision = 10000;
		pos[0] = Math.floor(pos[0] * precision) / precision;
		pos[1] = Math.floor(pos[1] * precision) / precision;
		pos[2] = Math.floor(pos[2] * precision) / precision;

		return pos;
	};

	for (var i = 0; i < numSegments; i++) {
		for (var j = 0; j < numSegments; j++) {
			positions.push(getPosition(i, j));
			positions.push(getPosition(i + 1, j));
			positions.push(getPosition(i + 1, j + 1));
			positions.push(getPosition(i, j + 1));

			if (withNormals) {
				normals.push(getPosition(i, j, true));
				normals.push(getPosition(i + 1, j, true));
				normals.push(getPosition(i + 1, j + 1, true));
				normals.push(getPosition(i, j + 1, true));
			}

			var u = j / numSegments;
			var v = i / numSegments;

			coords.push([1.0 - u, v]);
			coords.push([1.0 - u, v + gapUV]);
			coords.push([1.0 - u - gapUV, v + gapUV]);
			coords.push([1.0 - u - gapUV, v]);

			indices.push(index * 4 + 0);
			indices.push(index * 4 + 1);
			indices.push(index * 4 + 2);
			indices.push(index * 4 + 0);
			indices.push(index * 4 + 2);
			indices.push(index * 4 + 3);

			index++;
		}
	}

	if (isInvert) {
		indices.reverse();
	}

	var mesh = new _Mesh2.default(drawType);
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	if (withNormals) {
		mesh.bufferNormal(normals);
	}

	return mesh;
};

Geom.cube = function (w, h, d) {
	var withNormals = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	var drawType = arguments.length <= 4 || arguments[4] === undefined ? 4 : arguments[4];

	h = h || w;
	d = d || w;

	var x = w / 2;
	var y = h / 2;
	var z = d / 2;

	var positions = [];
	var coords = [];
	var indices = [];
	var normals = [];
	var count = 0;

	// BACK
	positions.push([-x, y, -z]);
	positions.push([x, y, -z]);
	positions.push([x, -y, -z]);
	positions.push([-x, -y, -z]);

	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count * 4 + 0);
	indices.push(count * 4 + 1);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 0);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 3);

	count++;

	// RIGHT
	positions.push([x, y, -z]);
	positions.push([x, y, z]);
	positions.push([x, -y, z]);
	positions.push([x, -y, -z]);

	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count * 4 + 0);
	indices.push(count * 4 + 1);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 0);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 3);

	count++;

	// FRONT
	positions.push([x, y, z]);
	positions.push([-x, y, z]);
	positions.push([-x, -y, z]);
	positions.push([x, -y, z]);

	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count * 4 + 0);
	indices.push(count * 4 + 1);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 0);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 3);

	count++;

	// LEFT
	positions.push([-x, y, z]);
	positions.push([-x, y, -z]);
	positions.push([-x, -y, -z]);
	positions.push([-x, -y, z]);

	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count * 4 + 0);
	indices.push(count * 4 + 1);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 0);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 3);

	count++;

	// TOP
	positions.push([-x, y, z]);
	positions.push([x, y, z]);
	positions.push([x, y, -z]);
	positions.push([-x, y, -z]);

	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count * 4 + 0);
	indices.push(count * 4 + 1);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 0);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 3);

	count++;

	// BOTTOM
	positions.push([-x, -y, -z]);
	positions.push([x, -y, -z]);
	positions.push([x, -y, z]);
	positions.push([-x, -y, z]);

	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count * 4 + 0);
	indices.push(count * 4 + 1);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 0);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 3);

	count++;

	var mesh = new _Mesh2.default(drawType);
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	if (withNormals) {
		mesh.bufferNormal(normals);
	}

	return mesh;
};

Geom.skybox = function (size) {
	var withNormals = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	var drawType = arguments.length <= 2 || arguments[2] === undefined ? 4 : arguments[2];

	var positions = [];
	var coords = [];
	var indices = [];
	var normals = [];
	var count = 0;

	// BACK
	positions.push([size, size, -size]);
	positions.push([-size, size, -size]);
	positions.push([-size, -size, -size]);
	positions.push([size, -size, -size]);

	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);
	normals.push([0, 0, -1]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count * 4 + 0);
	indices.push(count * 4 + 1);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 0);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 3);

	count++;

	// RIGHT
	positions.push([size, -size, -size]);
	positions.push([size, -size, size]);
	positions.push([size, size, size]);
	positions.push([size, size, -size]);

	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);
	normals.push([1, 0, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count * 4 + 0);
	indices.push(count * 4 + 1);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 0);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 3);

	count++;

	// FRONT
	positions.push([-size, size, size]);
	positions.push([size, size, size]);
	positions.push([size, -size, size]);
	positions.push([-size, -size, size]);

	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);
	normals.push([0, 0, 1]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count * 4 + 0);
	indices.push(count * 4 + 1);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 0);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 3);

	count++;

	// LEFT
	positions.push([-size, -size, size]);
	positions.push([-size, -size, -size]);
	positions.push([-size, size, -size]);
	positions.push([-size, size, size]);

	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);
	normals.push([-1, 0, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count * 4 + 0);
	indices.push(count * 4 + 1);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 0);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 3);

	count++;

	// TOP
	positions.push([size, size, size]);
	positions.push([-size, size, size]);
	positions.push([-size, size, -size]);
	positions.push([size, size, -size]);

	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);
	normals.push([0, 1, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count * 4 + 0);
	indices.push(count * 4 + 1);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 0);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 3);

	count++;

	// BOTTOM
	positions.push([size, -size, -size]);
	positions.push([-size, -size, -size]);
	positions.push([-size, -size, size]);
	positions.push([size, -size, size]);

	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);
	normals.push([0, -1, 0]);

	coords.push([0, 0]);
	coords.push([1, 0]);
	coords.push([1, 1]);
	coords.push([0, 1]);

	indices.push(count * 4 + 0);
	indices.push(count * 4 + 1);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 0);
	indices.push(count * 4 + 2);
	indices.push(count * 4 + 3);

	var mesh = new _Mesh2.default(drawType);
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	if (withNormals) {
		mesh.bufferNormal(normals);
	}

	return mesh;
};

Geom.bigTriangle = function () {
	var indices = [2, 1, 0];
	var positions = [[-1, -1], [-1, 4], [4, -1]];

	var mesh = new _Mesh2.default();
	mesh.bufferData(positions, 'aPosition', 2);
	mesh.bufferIndices(indices);

	return mesh;
};

exports.default = Geom;