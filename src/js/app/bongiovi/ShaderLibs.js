'use strict';

import glslify from 'glslify';

export default class ShaderLibs {
  constructor(){
    this.shaders = {};
    this.shaders.copyVert = glslify('../shaders/copy.vert');
    this.shaders.copyNormalVert = glslify('../shaders/copyWithNormal.vert');
    this.shaders.generalVert = glslify('../shaders/general.vert');
    this.shaders.generalNormalVert = glslify('../shaders/generalWithNormal.vert');
    this.shaders.generalWithNormalVert = glslify('../shaders/generalWithNormal.vert');
    this.shaders.copyFrag = glslify('../shaders/copy.frag');
    this.shaders.alphaFrag = glslify('../shaders/alpha.frag');
    this.shaders.simpleColorFrag = glslify('../shaders/simpleColor.frag');
    this.shaders.depthFrag = glslify('../shaders/depth.frag');
    this.shaders.simpleCopyLighting = glslify('../shaders/simpleCopyLighting.frag');
    this.shaders.simpleColorLighting = glslify('../shaders/simpleColorLighting.frag');
  }
  static get(mId){
    return this.shaders[mId];
  }
}