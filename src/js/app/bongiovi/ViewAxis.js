'use strict';
import _GLTool from './GLTool.js';
import Mesh from './Mesh.js';
import View from './View.js';

export default class ViewAxis extends View {
  constructor(lineWidth, aFragShader){
    let vertShader = 'precision highp float;attribute vec3 aVertexPosition;attribute vec2 aTextureCoord;attribute vec3 aColor;uniform mat4 uMVMatrix;uniform mat4 uPMatrix;varying vec2 vTextureCoord;varying vec3 vColor;void main(void) {    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);    vTextureCoord = aTextureCoord;    vColor = aColor;}';
    let fragShader = aFragShader !== undefined ? aFragShader : 'precision mediump float;varying vec3 vColor;void main(void) {    gl_FragColor = vec4(vColor, 1.0);}';
    super(vertShader, fragShader);
    this.lineWidth = lineWidth === undefined ? 2.0 : lineWidth;
  }
  _init() {
    let positions = [];
    let colors    = [];
    let coords    = [];
    let indices   = [0,1,2,3,4,5];
    let r         = 9999;

    positions.push([-r,  0,  0]);
    positions.push([ r,  0,  0]);
    positions.push([ 0, -r,  0]);
    positions.push([ 0,  r,  0]);
    positions.push([ 0,  0, -r]);
    positions.push([ 0,  0,  r]);


    colors.push([1, 0, 0]);
    colors.push([1, 0, 0]);
    colors.push([0, 1, 0]);
    colors.push([0, 1, 0]);
    colors.push([0, 0, 1]);
    colors.push([0, 0, 1]);


    coords.push([0, 0]);
    coords.push([0, 0]);
    coords.push([0, 0]);
    coords.push([0, 0]);
    coords.push([0, 0]);
    coords.push([0, 0]);

    this.mesh = new Mesh(positions.length, indices.length, _GLTool.gl.LINES);
    this.mesh.bufferVertex(positions);
    this.mesh.bufferTexCoords(coords);
    this.mesh.bufferIndices(indices);
    this.mesh.bufferData(colors, 'aColor', 3, false);
  }
  render(){
    if(!this.shader.isReady()) return;
    this.shader.bind();
    _GLTool.gl.lineWidth(this.lineWidth);
    _GLTool.gl.draw(this.mesh);
    _GLTool.gl.lineWidth(1.0);
  }
}