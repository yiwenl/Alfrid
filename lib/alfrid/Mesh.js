// Mesh.js

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GLTool = require('./GLTool');

var _GLTool2 = _interopRequireDefault(_GLTool);

var _glMatrix = require('gl-matrix');

var _glMatrix2 = _interopRequireDefault(_glMatrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gl = void 0;

var vec3 = _glMatrix2.default.vec3;

var Mesh = function () {
	function Mesh() {
		var mDrawType = arguments.length <= 0 || arguments[0] === undefined ? _GLTool2.default.gl.TRIANGLES : arguments[0];

		_classCallCheck(this, Mesh);

		gl = _GLTool2.default.gl;
		this.drawType = mDrawType;
		this._attributes = [];
		this._vertexSize = 0;

		this._vertices = [];
		this._texCoords = [];
		this._normals = [];
		this._faceNormals = [];
		this._tangents = [];
		this._indices = [];
		this._faces = [];
	}

	_createClass(Mesh, [{
		key: 'bufferVertex',
		value: function bufferVertex(mArrayVertices) {
			var isDynamic = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];


			this._vertexSize = mArrayVertices.length;
			this.bufferData(mArrayVertices, 'aVertexPosition', 3, isDynamic);
			this._vertices = mArrayVertices;
		}
	}, {
		key: 'bufferTexCoords',
		value: function bufferTexCoords(mArrayTexCoords) {
			var isDynamic = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];


			this.bufferData(mArrayTexCoords, 'aTextureCoord', 2, isDynamic);
			this._texCoords = mArrayTexCoords;
		}
	}, {
		key: 'bufferNormal',
		value: function bufferNormal(mNormals) {
			var isDynamic = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];


			this.bufferData(mNormals, 'aNormal', 3, isDynamic);
			this._normals = mNormals;
		}
	}, {
		key: 'bufferIndices',
		value: function bufferIndices(mArrayIndices) {
			var isDynamic = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];


			var drawType = isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
			this._indices = mArrayIndices;
			this.iBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mArrayIndices), drawType);
			this.iBuffer.itemSize = 1;
			this.iBuffer.numItems = mArrayIndices.length;
			this._indices = mArrayIndices;
		}
	}, {
		key: 'bufferData',
		value: function bufferData(mData, mName, mItemSize) {
			var isDynamic = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

			var index = -1,
			    i = 0;
			var drawType = isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
			var bufferData = [];
			var buffer = void 0,
			    dataArray = void 0;

			//	Check for existing attributes
			for (i = 0; i < this._attributes.length; i++) {
				if (this._attributes[i].name === mName) {
					this._attributes[i].data = mData;
					index = i;
					break;
				}
			}

			//	flatten buffer data		
			for (i = 0; i < mData.length; i++) {
				for (var j = 0; j < mData[i].length; j++) {
					bufferData.push(mData[i][j]);
				}
			}

			if (index === -1) {

				//	attribute not exist yet, create new buffer
				buffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

				dataArray = new Float32Array(bufferData);
				gl.bufferData(gl.ARRAY_BUFFER, dataArray, drawType);
				this._attributes.push({ name: mName, data: mData, itemSize: mItemSize, buffer: buffer, dataArray: dataArray });
			} else {

				//	attribute existed, replace with new data
				buffer = this._attributes[index].buffer;
				gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
				dataArray = this._attributes[index].dataArray;
				for (i = 0; i < bufferData.length; i++) {
					dataArray[i] = bufferData[i];
				}
				gl.bufferData(gl.ARRAY_BUFFER, dataArray, drawType);
			}
		}
	}, {
		key: 'computeNormals',
		value: function computeNormals() {
			var usingFaceNormals = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];


			this._generateFaces();

			if (usingFaceNormals) {
				this._computeFaceNormals();
			} else {
				this._computeVertexNormals();
			}
		}
	}, {
		key: 'computeTangents',
		value: function computeTangents() {}

		//	PRIVATE METHODS

	}, {
		key: '_computeFaceNormals',
		value: function _computeFaceNormals() {

			var faceIndex = void 0;
			var face = void 0;
			var normals = [];

			for (var i = 0; i < this._indices.length; i += 3) {
				faceIndex = i / 3;
				face = this._faces[faceIndex];
				var N = face.normal;

				normals[face.indices[0]] = N;
				normals[face.indices[1]] = N;
				normals[face.indices[2]] = N;
			}

			this.bufferNormal(normals);
		}
	}, {
		key: '_computeVertexNormals',
		value: function _computeVertexNormals() {
			//	loop through all vertices
			var sumNormal = vec3.create();
			var face = void 0;
			var normals = [];

			for (var i = 0; i < this._vertices.length; i++) {

				vec3.set(sumNormal, 0, 0, 0);

				for (var j = 0; j < this._faces.length; j++) {
					face = this._faces[j];

					//	if vertex exist in the face, add the normal to sum normal
					if (face.indices.indexOf(i) >= 0) {

						sumNormal[0] += face.normal[0];
						sumNormal[1] += face.normal[1];
						sumNormal[2] += face.normal[2];
					}
				}

				vec3.normalize(sumNormal, sumNormal);
				normals.push([sumNormal[0], sumNormal[1], sumNormal[2]]);
			}

			this.bufferNormal(normals);
		}
	}, {
		key: '_generateFaces',
		value: function _generateFaces() {

			var ia = void 0,
			    ib = void 0,
			    ic = void 0;
			var a = void 0,
			    b = void 0,
			    c = void 0,
			    vba = vec3.create(),
			    vca = vec3.create(),
			    vNormal = vec3.create();

			for (var i = 0; i < this._indices.length; i += 3) {

				ia = this._indices[i];
				ib = this._indices[i + 1];
				ic = this._indices[i + 2];

				a = vec3.clone(this._vertices[ia]);
				b = vec3.clone(this._vertices[ib]);
				c = vec3.clone(this._vertices[ic]);

				vec3.sub(vba, b, a);
				vec3.sub(vca, c, a);

				vec3.cross(vNormal, vba, vca);
				vec3.normalize(vNormal, vNormal);
				var N = [vNormal[0], vNormal[1], vNormal[2]];

				var face = {
					indices: [ia, ib, ic],
					normal: N
				};

				this._faces.push(face);
			}
		}

		//	GETTER AND SETTERS

	}, {
		key: 'vertices',
		get: function get() {
			return this._vertices;
		}
	}, {
		key: 'normals',
		get: function get() {
			return this._normals;
		}
	}, {
		key: 'attributes',
		get: function get() {
			return this._attributes;
		}
	}, {
		key: 'vertexSize',
		get: function get() {
			return this._vertexSize;
		}
	}, {
		key: 'hasNormals',
		get: function get() {
			if (this._normals.length === 0) {
				return false;
			}
			return true;
		}
	}, {
		key: 'hasTangents',
		get: function get() {
			if (this._tangents.length === 0) {
				return false;
			}
			return true;
		}
	}]);

	return Mesh;
}();

exports.default = Mesh;