'use strict';

import _GLTool from './GLTool.js';
import View from './View.js';
import ShaderLibs from './ShaderLibs.js';
import Mesh from './Mesh.js';

export default class ViewDotPlanes extends View {
  constructor(color, afragShader){
    let grey = 0.75;
    let fs = afragShader === undefined ? ShaderLibs.get('simpleColorFrag') : afragShader;
    super(null, fs);
    this.color = color === undefined ? [grey,grey,grey] : color;
  }
  _init(){
    let positions = [];
    let coords = [];
    let indices = [];
    let index = 0;


    let numDots = 100;
    let size = 3000;
    let gap = size / numDots;
    let i, j;


    for(i=-size/2; i<size; i+=gap) {
      for(j=-size/2; j<size; j+=gap) {
        positions.push([i, j, 0]);
        coords.push([0, 0]);
        indices.push(index);
        index++;

        positions.push([i, 0, j]);
        coords.push([0, 0]);
        indices.push(index);
        index++;
      }
    }

    this.mesh = new Mesh(positions.length, indices.length, _GLTool.gl.DOTS);
    this.mesh.bufferVertex(positions);
    this.mesh.bufferTexCoords(coords);
    this.mesh.bufferIndices(indices);
  }
  render() {
    this.shader.bind();
    this.shader.uniform('color', 'uniform3fv', this.color);
    this.shader.uniform('opacity', 'uniform1f', 1);
    _GLTool.draw(this.mesh);
  }
}