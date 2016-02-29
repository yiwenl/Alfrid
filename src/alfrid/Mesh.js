// Mesh.js

'use strict';

import GL from './GLTool';
import glm from 'gl-matrix';

let gl;

const vec3 = glm.vec3;

class Mesh {
	constructor(mDrawType = GL.gl.TRIANGLES) {
		gl                = GL.gl;
		this.drawType     = mDrawType;
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


	bufferVertex(mArrayVertices, isDynamic=false) {

		this._vertexSize = mArrayVertices.length;
		this.bufferData(mArrayVertices, 'aVertexPosition', 3, isDynamic);
		this._vertices = mArrayVertices;

	}


	bufferTexCoords(mArrayTexCoords, isDynamic=false) {

		this.bufferData(mArrayTexCoords, 'aTextureCoord', 2, isDynamic);
		this._texCoords = mArrayTexCoords;

	}


	bufferNormal(mNormals, isDynamic=false) {

		this.bufferData(mNormals, 'aNormal', 3, isDynamic);
		this._normals = mNormals;

	}


	bufferIndices(mArrayIndices, isDynamic=false) {

		let drawType          = isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
		this._indices         = mArrayIndices;
		this.iBuffer          = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mArrayIndices), drawType);
		this.iBuffer.itemSize = 1;
		this.iBuffer.numItems = mArrayIndices.length;
		this._indices         = mArrayIndices;

	}


	bufferData(mData, mName, mItemSize, isDynamic=false) {
		let index = -1, i=0;
		let drawType   = isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
		let bufferData = [];
		let buffer, dataArray;

		//	Check for existing attributes
		for(i=0; i<this._attributes.length; i++) {
			if(this._attributes[i].name === mName) {
				this._attributes[i].data = mData;
				index = i;
				break;
			}
		}

		//	flatten buffer data		
		for(i=0; i<mData.length; i++) {
			for(let j=0; j<mData[i].length; j++) {
				bufferData.push(mData[i][j]);
			}
		}

		
		if(index === -1) {	

			//	attribute not exist yet, create new buffer
			buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

			dataArray = new Float32Array(bufferData);
			gl.bufferData(gl.ARRAY_BUFFER, dataArray, drawType);
			this._attributes.push({name:mName, data:mData, itemSize: mItemSize, buffer:buffer, dataArray:dataArray});

		} else {

			//	attribute existed, replace with new data
			buffer = this._attributes[index].buffer;
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			dataArray = this._attributes[index].dataArray;
			for(i=0; i<bufferData.length; i++) {
				dataArray[i] = bufferData[i];
			}
			gl.bufferData(gl.ARRAY_BUFFER, dataArray, drawType);

		}

	}


	computeNormals(usingFaceNormals=false) {

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
		let normals = [];

		for(let i=0; i<this._indices.length; i+=3) {
			faceIndex = i/3;
			face = this._faces[faceIndex];
			let N = face.normal;

			normals[ face.indices[0] ] = N;
			normals[ face.indices[1] ] = N;
			normals[ face.indices[2] ] = N;
		}

		this.bufferNormal(normals);
	}


	_computeVertexNormals() {
		//	loop through all vertices
		let sumNormal = vec3.create();
		let face;
		let normals = [];

		for(let i=0; i<this._vertices.length; i++) {

			vec3.set(sumNormal, 0, 0, 0);

			for( let j=0; j<this._faces.length; j++) {
				face = this._faces[j];

				//	if vertex exist in the face, add the normal to sum normal
				if(face.indices.indexOf(i) >= 0) {

					sumNormal[0] += face.normal[0];
					sumNormal[1] += face.normal[1];
					sumNormal[2] += face.normal[2];

				}

			}

			vec3.normalize(sumNormal, sumNormal);
			normals.push( [sumNormal[0], sumNormal[1], sumNormal[2]] );
		}

		this.bufferNormal(normals);

	}


	_generateFaces() {
		
		let ia, ib, ic;
		let a, b, c, vba = vec3.create(), vca = vec3.create(), vNormal = vec3.create();

		for(let i=0; i<this._indices.length; i+=3) {

			ia = this._indices[i];
			ib = this._indices[i+1];
			ic = this._indices[i+2];

			a = vec3.clone(this._vertices[ia]);
			b = vec3.clone(this._vertices[ib]);
			c = vec3.clone(this._vertices[ic]);

			vec3.sub(vba, b, a);
			vec3.sub(vca, c, a);

			vec3.cross(vNormal, vba, vca);
			vec3.normalize(vNormal, vNormal);
			let N = [vNormal[0], vNormal[1], vNormal[2]];

			let face = {
				indices:[ia, ib, ic],
				normal:N 
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


}


export default Mesh;