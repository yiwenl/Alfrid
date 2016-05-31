// Mesh.js

'use strict';

import GL from './GLTool';
import glm from 'gl-matrix';

let gl;

const vec3 = glm.vec3;

class Mesh {
	constructor(mDrawingType = 4) {
		gl                = GL.gl;
		this.drawType     = mDrawingType;
		this._attributes  = [];
		this._vertexSize  = 0;
		
		this._vertices    = [];
		this._texCoords   = [];
		this._normals     = [];
		this._faceNormals = [];
		this._tangents    = [];
		this._indices     = [];
		this._faces       = [];
	}


	bufferVertex(mArrayVertices, isDynamic = false) {

		this._vertexSize = mArrayVertices.length;
		this.bufferData(mArrayVertices, 'aVertexPosition', 3, isDynamic);
		this._vertices = mArrayVertices;


		const tempNormals = [];
		for (let i = 0; i < mArrayVertices.length; i++) {
			tempNormals.push([1, 0, 0]);
		}

		if (this._normals.length === 0) {
			this.bufferNormal(tempNormals);	
		}

		if (this._indices.length > 0 && this.drawType === GL.TRIANGLES) {
			this._generateFaces();
		}
	}


	bufferTexCoord(mArrayTexCoords, isDynamic = false) {

		this.bufferData(mArrayTexCoords, 'aTextureCoord', 2, isDynamic);
		this._texCoords = mArrayTexCoords;

	}


	bufferNormal(mNormals, isDynamic = false) {

		this.bufferData(mNormals, 'aNormal', 3, isDynamic);
		this._normals = mNormals;

	}


	bufferIndex(mArrayIndices, isDynamic = false) {

		const drawType          = isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
		this._indices         = mArrayIndices;
		this.iBuffer          = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mArrayIndices), drawType);
		this.iBuffer.itemSize = 1;
		this.iBuffer.numItems = mArrayIndices.length;
		this._indices         = mArrayIndices;


		if (this._vertices.length > 0 && this.drawType === GL.TRIANGLES) {
			this._generateFaces();
		}
	}


	bufferData(mData, mName, mItemSize, isDynamic = false) {
		let index = -1;
		let i = 0;
		const drawType   = isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
		const bufferData = [];
		let buffer;
		let dataArray;

		//	Check for existing attributes
		for(i = 0; i < this._attributes.length; i++) {
			if(this._attributes[i].name === mName) {
				this._attributes[i].data = mData;
				index = i;
				break;
			}
		}

		//	flatten buffer data		
		for(i = 0; i < mData.length; i++) {
			for(let j = 0; j < mData[i].length; j++) {
				bufferData.push(mData[i][j]);
			}
		}

		
		if(index === -1) {	

			//	attribute not exist yet, create new buffer
			buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

			dataArray = new Float32Array(bufferData);
			gl.bufferData(gl.ARRAY_BUFFER, dataArray, drawType);
			this._attributes.push({ name:mName, data:mData, itemSize: mItemSize, buffer:buffer, dataArray:dataArray });

		} else {

			//	attribute existed, replace with new data
			buffer = this._attributes[index].buffer;
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			dataArray = this._attributes[index].dataArray;
			for(i = 0; i < bufferData.length; i++) {
				dataArray[i] = bufferData[i];
			}
			gl.bufferData(gl.ARRAY_BUFFER, dataArray, drawType);

		}

	}


	computeNormals(usingFaceNormals = false) {

		this._generateFaces();

		if(usingFaceNormals) {
			this._computeFaceNormals();
		} else {
			this._computeVertexNormals();
		}
	}


	computeTangents() {

	}

	//	PRIVATE METHODS

	_computeFaceNormals() {

		let faceIndex;
		let face;
		const normals = [];

		for(let i = 0; i < this._indices.length; i += 3) {
			faceIndex = i / 3;
			face = this._faces[faceIndex];
			const N = face.normal;

			normals[face.indices[0]] = N;
			normals[face.indices[1]] = N;
			normals[face.indices[2]] = N;
		}

		this.bufferNormal(normals);
	}


	_computeVertexNormals() {
		//	loop through all vertices
		let face;
		const sumNormal = vec3.create();
		const normals = [];

		for(let i = 0; i < this._vertices.length; i++) {

			vec3.set(sumNormal, 0, 0, 0);

			for(let j = 0; j < this._faces.length; j++) {
				face = this._faces[j];

				//	if vertex exist in the face, add the normal to sum normal
				if(face.indices.indexOf(i) >= 0) {

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


	_generateFaces() {
		console.log(this._vertices.length);
		let ia, ib, ic;
		let a, b, c;
		const vba = vec3.create(), vca = vec3.create(), vNormal = vec3.create();

		for(let i = 0; i < this._indices.length; i += 3) {

			ia = this._indices[i];
			ib = this._indices[i + 1];
			ic = this._indices[i + 2];

			a = this._vertices[ia];
			b = this._vertices[ib];
			c = this._vertices[ic];

			const face = {
				indices:[ia, ib, ic],
				vertices:[a, b, c],
			};

			this._faces.push(face);
		}

	}


	//	GETTER AND SETTERS

	get vertices() {
		return this._vertices;
	}

	get normals() {
		return this._normals;
	}

	get attributes() {
		return this._attributes;
	}

	get vertexSize() {
		return this._vertexSize;
	}

	get hasNormals() {
		if(this._normals.length === 0) {	return false; }
		return true;
	}

	get hasTangents() {
		if(this._tangents.length === 0) {	return false; }
		return true;	
	}

	get faces() {	return this._faces;	}

}


export default Mesh;