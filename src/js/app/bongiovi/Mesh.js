'use strict';

import glMatrix from 'gl-matrix';
import _GLTool from './GLTool.js';
import Face from './Face.js';


export default class Mesh {
  constructor(aVertexSize, aIndexSize, aDrawType) {
    this.gl = _GLTool.gl;
    this.vertexSize = aVertexSize;
    this.indexSize = aIndexSize;
    this.drawType = aDrawType;
    this.extraAttributes = [];

    this.vBufferPos = undefined;
    this._floatArrayVertex = undefined;
  }
  bufferVertex(aArrayVertices, isDynamic) {
    let vertices = [];
    let drawType = isDynamic ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW;
    this._vertices = [];

    for(let i=0; i<aArrayVertices.length; i++) {
      for(let j=0; j<aArrayVertices[i].length; j++) {
        vertices.push(aArrayVertices[i][j]);
      }
      this._vertices.push(glMatrix.vec3.clone(aArrayVertices[i]));
    }

    if(this.vBufferPos === undefined) {
      this.vBufferPos = this.gl.createBuffer();
    }
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBufferPos);

    if(this._floatArrayVertex === undefined) {
      this._floatArrayVertex = new Float32Array(vertices);
    } else {
      if(aArrayVertices.length !== this._floatArrayVertex.length) {
        this._floatArrayVertex = new Float32Array(vertices);
      } else {
        for(let k=0; k<aArrayVertices.length; k++) {
          this._floatArrayVertex[k] = aArrayVertices[k];
        }
      }
    }

    this.gl.bufferData(this.gl.ARRAY_BUFFER, this._floatArrayVertex, drawType);
    this.vBufferPos.itemSize = 3; 
  }
  bufferTexCoords(aArrayTexCoords){
    let coords = [];
    for(let i=0; i<aArrayTexCoords.length; i++) {
      for(let j=0; j<aArrayTexCoords[i].length; j++) {
        coords.push(aArrayTexCoords[i][j]);
      }
    }

    this.vBufferUV = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBufferUV);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(coords), this.gl.STATIC_DRAW);
    this.vBufferUV.itemSize = 2;
  }
  bufferData(aData, aName, aItemSize, isDynamic){
    let index = -1;
    let drawType = isDynamic ? this.gl.DYNAMIC_DRAW : this.gl.STATIC_DRAW;
    let i=0;

    for(i=0; i<this.extraAttributes.length; i++) {
      if(this.extraAttributes[i].name === aName) {
        this.extraAttributes[i].data = aData;
        index = i;
        break;
      }
    }

    let bufferData = [];
    for(i=0; i<aData.length; i++) {
      for(let j=0; j<aData[i].length; j++) {
        bufferData.push(aData[i][j]);
      }
    }

    let buffer, floatArray;
    if(index === -1) {
      buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
      floatArray = new Float32Array(bufferData);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, floatArray, drawType);
      this.extraAttributes.push({name:aName, data:aData, itemSize: aItemSize, buffer:buffer, floatArray:floatArray});
    } else {
      buffer = this.extraAttributes[index].buffer;
      // console.debug('Buffer exist', buffer);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
      floatArray = this.extraAttributes[index].floatArray;
      for(i=0; i<bufferData.length; i++) {
        floatArray[i] = bufferData[i];
      }
      this.gl.bufferData(this.gl.ARRAY_BUFFER, floatArray, drawType);
    }
  }
  computeNormals(){
    if(this.drawType !== this.gl.TRIANGLES) {return;}

    if(this._faces === undefined) { this._generateFaces();  }
    console.log('Start computing');

    let time = new Date().getTime();
    let j=0;

    this._normals = [];
    for(let i=0; i<this._vertices.length; i++) {
      let normal = glMatrix.vec3.create();
      let faceCount = 0;
      for(j=0; j<this._faces.length; j++) {
        if(this._faces[j].contains(this._vertices[i])) {
          glMatrix.vec3.add(normal, normal, this._faces[j].faceNormal);
          faceCount ++;
        }
      }

      glMatrix.vec3.normalize(normal, normal);
      this._normals.push(normal);
    }

    this.bufferData(this._normals, 'aNormal', 3);

    let totalTime = new Date().getTime() - time;
    console.log('Total Time : ', totalTime);
  }
  computeTangent(){
    // LVTODO.
  }
  _generateFaces(){
    this._faces = [];
    for(let i=0; i<this._indices.length; i+=3) {
      let p0 = this._vertices[this._indices[i+0]];
      let p1 = this._vertices[this._indices[i+1]];
      let p2 = this._vertices[this._indices[i+2]];
      this._faces.push(new Face(p0, p1, p2));
    }
  }
}