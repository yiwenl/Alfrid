// ObjLoader.js

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BinaryLoader2 = require('./BinaryLoader');

var _BinaryLoader3 = _interopRequireDefault(_BinaryLoader2);

var _Mesh = require('../Mesh');

var _Mesh2 = _interopRequireDefault(_Mesh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjLoader = function (_BinaryLoader) {
	_inherits(ObjLoader, _BinaryLoader);

	function ObjLoader() {
		_classCallCheck(this, ObjLoader);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ObjLoader).call(this));
	}

	_createClass(ObjLoader, [{
		key: 'load',
		value: function load(url, callback) {
			var ignoreNormals = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
			var drawType = arguments.length <= 3 || arguments[3] === undefined ? 4 : arguments[3];

			this._ignoreNormals = ignoreNormals;
			this._drawType = drawType;
			_get(Object.getPrototypeOf(ObjLoader.prototype), 'load', this).call(this, url, callback);
		}
	}, {
		key: '_onLoaded',
		value: function _onLoaded() {
			this._parseObj(this._req.response);
		}
	}, {
		key: '_parseObj',
		value: function _parseObj(objStr) {
			var lines = objStr.split('\n');

			var positions = [];
			var coords = [];
			var finalNormals = [];
			var vertices = [];
			var normals = [];
			var uvs = [];
			var indices = [];
			var count = 0;
			var result = void 0;

			// v float float float
			var vertex_pattern = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

			// vn float float float
			var normal_pattern = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

			// vt float float
			var uv_pattern = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

			// f vertex vertex vertex ...
			var face_pattern1 = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/;

			// f vertex/uv vertex/uv vertex/uv ...
			var face_pattern2 = /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/;

			// f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...
			var face_pattern3 = /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/;

			// f vertex//normal vertex//normal vertex//normal ...
			var face_pattern4 = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/;

			function parseVertexIndex(value) {
				var index = parseInt(value);
				return (index >= 0 ? index - 1 : index + vertices.length / 3) * 3;
			}

			function parseNormalIndex(value) {
				var index = parseInt(value);
				return (index >= 0 ? index - 1 : index + normals.length / 3) * 3;
			}

			function parseUVIndex(value) {
				var index = parseInt(value);
				return (index >= 0 ? index - 1 : index + uvs.length / 2) * 2;
			}

			function addVertex(a, b, c) {
				positions.push([vertices[a], vertices[a + 1], vertices[a + 2]]);
				positions.push([vertices[b], vertices[b + 1], vertices[b + 2]]);
				positions.push([vertices[c], vertices[c + 1], vertices[c + 2]]);

				indices.push(count * 3 + 0);
				indices.push(count * 3 + 1);
				indices.push(count * 3 + 2);

				count++;
			}

			function addUV(a, b, c) {
				coords.push([uvs[a], uvs[a + 1]]);
				coords.push([uvs[b], uvs[b + 1]]);
				coords.push([uvs[c], uvs[c + 1]]);
			}

			function addNormal(a, b, c) {
				finalNormals.push([normals[a], normals[a + 1], normals[a + 2]]);
				finalNormals.push([normals[b], normals[b + 1], normals[b + 2]]);
				finalNormals.push([normals[c], normals[c + 1], normals[c + 2]]);
			}

			function addFace(a, b, c, d, ua, ub, uc, ud, na, nb, nc, nd) {
				var ia = parseVertexIndex(a);
				var ib = parseVertexIndex(b);
				var ic = parseVertexIndex(c);
				var id = void 0;

				if (d === undefined) {

					addVertex(ia, ib, ic);
				} else {

					id = parseVertexIndex(d);

					addVertex(ia, ib, id);
					addVertex(ib, ic, id);
				}

				if (ua !== undefined) {

					ia = parseUVIndex(ua);
					ib = parseUVIndex(ub);
					ic = parseUVIndex(uc);

					if (d === undefined) {

						addUV(ia, ib, ic);
					} else {

						id = parseUVIndex(ud);

						addUV(ia, ib, id);
						addUV(ib, ic, id);
					}
				}

				if (na !== undefined) {

					ia = parseNormalIndex(na);
					ib = parseNormalIndex(nb);
					ic = parseNormalIndex(nc);

					if (d === undefined) {

						addNormal(ia, ib, ic);
					} else {

						id = parseNormalIndex(nd);

						addNormal(ia, ib, id);
						addNormal(ib, ic, id);
					}
				}
			}

			for (var i = 0; i < lines.length; i++) {
				var line = lines[i];
				line = line.trim();

				if (line.length === 0 || line.charAt(0) === '#') {

					continue;
				} else if ((result = vertex_pattern.exec(line)) !== null) {

					vertices.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
				} else if ((result = normal_pattern.exec(line)) !== null) {

					normals.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
				} else if ((result = uv_pattern.exec(line)) !== null) {

					uvs.push(parseFloat(result[1]), parseFloat(result[2]));
				} else if ((result = face_pattern1.exec(line)) !== null) {

					addFace(result[1], result[2], result[3], result[4]);
				} else if ((result = face_pattern2.exec(line)) !== null) {

					addFace(result[2], result[5], result[8], result[11], result[3], result[6], result[9], result[12]);
				} else if ((result = face_pattern3.exec(line)) !== null) {
					addFace(result[2], result[6], result[10], result[14], result[3], result[7], result[11], result[15], result[4], result[8], result[12], result[16]);
				} else if ((result = face_pattern4.exec(line)) !== null) {
					addFace(result[2], result[5], result[8], result[11], undefined, undefined, undefined, undefined, result[3], result[6], result[9], result[12]);
				}
			}

			this._generateMeshes({
				positions: positions,
				coords: coords,
				normals: finalNormals,
				indices: indices
			});
		}
	}, {
		key: '_generateMeshes',
		value: function _generateMeshes(o) {
			var maxNumVertices = 65535;
			var hasNormals = o.normals.length > 0;
			var hasUVs = o.coords.length > 0;

			if (o.positions.length > maxNumVertices) {
				var meshes = [];
				var lastIndex = 0;

				var oCopy = {};
				oCopy.positions = o.positions.concat();
				oCopy.coords = o.coords.concat();
				oCopy.indices = o.indices.concat();
				oCopy.normals = o.normals.concat();

				while (o.indices.length > 0) {

					var sliceNum = Math.min(maxNumVertices, o.positions.length);
					var indices = o.indices.splice(0, sliceNum);
					var positions = [];
					var coords = [];
					var normals = [];
					var index = void 0,
					    tmpIndex = 0;

					for (var i = 0; i < indices.length; i++) {
						if (indices[i] > tmpIndex) {
							tmpIndex = indices[i];
						}

						index = indices[i];

						positions.push(oCopy.positions[index]);
						if (hasUVs) {
							coords.push(oCopy.coords[index]);
						}
						if (hasNormals) {
							normals.push(oCopy.normals[index]);
						}

						indices[i] -= lastIndex;
					}

					lastIndex = tmpIndex + 1;

					var mesh = new _Mesh2.default(this._drawType);
					mesh.bufferVertex(positions);
					if (hasUVs) {
						mesh.bufferTexCoords(coords);
					}

					mesh.bufferIndices(indices);
					if (!this._ignoreNormals && hasNormals) {
						mesh.bufferNormal(normals);
					}

					meshes.push(mesh);
				}

				if (this._callback) {
					this._callback(meshes, oCopy);
				}
			} else {
				var _mesh = new _Mesh2.default(this._drawType);
				_mesh.bufferVertex(o.positions);
				if (hasUVs) {
					_mesh.bufferTexCoords(o.coords);
				}
				_mesh.bufferIndices(o.indices);
				if (!this._ignoreNormals && hasNormals) {
					_mesh.bufferNormal(o.normals);
				}

				if (this._callback) {
					this._callback(_mesh, o);
				}
			}
		}
	}]);

	return ObjLoader;
}(_BinaryLoader3.default);

exports.default = ObjLoader;