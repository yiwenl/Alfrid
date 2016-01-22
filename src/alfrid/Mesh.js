// Mesh.js

import GL from './GLTool';
import glm from 'gl-matrix';

class Mesh {
	constructor(mDrawType = GL.gl.TRIANGLES) {
		this.drawType = mDrawType;
		console.log('Drawing type :', this.drawType === GL.gl.TRIANGLES);
		this._attributes = [];
	}


	bufferVertex(mArrayVertices, isDynamic) {
		this.bufferData(mArrayVertices, 'aVertexPosition', 3, isDynamic);
	}


	bufferData(mData, mName, mItemSize, isDynamic) {
		let index = -1;
		let drawType = isDynamic ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW;
		let i=0;

		for(i=0; i<this._attributes.length; i++) {
			if(this._attributes[i].name === mName) {
				this._attributes[i].data = mData;
				index = i;
				break;
			}
		}

		let bufferData = [];
		for(i=0; i<mData.length; i++) {
			for(let j=0; j<mData[i].length; j++) {
				bufferData.push(mData[i][j]);
			}
		}

		let buffer, floatArray;
		if(index === -1) {
			buffer = this.gl.createBuffer();
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
			floatArray = new Float32Array(bufferData);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, floatArray, drawType);
			this._attributes.push({name:mName, data:mData, itemSize: mItemSize, buffer:buffer, floatArray:floatArray});
		} else {
			buffer = this._attributes[index].buffer;
			// console.debug("Buffer exist", buffer);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
			floatArray = this._attributes[index].floatArray;
			for(i=0; i<bufferData.length; i++) {
				floatArray[i] = bufferData[i];
			}
			this.gl.bufferData(this.gl.ARRAY_BUFFER, floatArray, drawType);
		}
	}


}


export default Mesh;