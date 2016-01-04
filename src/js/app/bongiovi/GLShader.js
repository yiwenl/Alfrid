'use strict';

import _GLTool from './GLTool.js';
import ShaderLibs from './ShaderLibs.js';
import Utils from './Utils.js';

export default class _GLToolShader {
  constructor(aVertexShaderId, aFragmentShaderId){
    this.gl = _GLTool.gl;
    this.idVertex        = aVertexShaderId;
    this.idFragment      = aFragmentShaderId;
    this.parameters      = [];
    this.uniformValues   = {};
    
    this.uniformTextures = [];
    
    this.vertexShader    = undefined;
    this.fragmentShader  = undefined;
    this._isReady        = false;
    this._loadedCount    = 0;

    if(aVertexShaderId === undefined || aVertexShaderId === null ) {
      this.createVertexShaderProgram(ShaderLibs.getShader('copyVert'));
    }

    if(aFragmentShaderId === undefined || aVertexShaderId === null ) {
      this.createFragmentShaderProgram(ShaderLibs.getShader('copyFrag'));
    }

    this.init();
  }
  init(){
    if(this.idVertex && this.idVertex.indexOf('main(void)') > -1) {
      this.createVertexShaderProgram(this.idVertex);
    } else {
      this.getShader(this.idVertex, true);  
    }
    
    if(this.idFragment && this.idFragment.indexOf('main(void)') > -1) {
      this.createFragmentShaderProgram(this.idFragment);
    } else {
      this.getShader(this.idFragment, false); 
    }
  }
  getShader(aId, aIsVertexShader){
    if(!aId) return;
    
    // LV TODO:  Need to check if this works!
    Utils.get(aId).then((response)=>{
      console.log('getShader :: response : ', response);
      if(aIsVertexShader) {
        this.createVertexShaderProgram(response);
      } else {
        this.createFragmentShaderProgram(response);
      }
    });

    /*
    let req = new XMLHttpRequest();
    req.hasCompleted = false;
    let that = this;
    req.onreadystatechange = function(e) {
      if(e.target.readyState === 4) {
        if(aIsVertexShader) {
          that.createVertexShaderProgram(e.target.responseText);
        } else {
          that.createFragmentShaderProgram(e.target.responseText);
        }
      }
    };
    req.open('GET', aId, true);
    req.send(null);
    */
  }
  createVertexShaderProgram(aStr){
    if(!this.gl) { return; }
    let shader = this.gl.createShader(this.gl.VERTEX_SHADER);

    this.gl.shaderSource(shader, aStr);
    this.gl.compileShader(shader);

    if(!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.warn('Error in Vertex Shader : ', this.idVertex, ':', this.gl.getShaderInfoLog(shader));
      console.log(Utils.addLineNumbers(aStr));
      return null;
    }

    this.vertexShader = shader;

    if(this.vertexShader !== undefined && this.fragmentShader !== undefined) {
      this.attachShaderProgram();
    }

    this._loadedCount++;
  }
  createFragmentShaderProgram(aStr) {
    if(!this.gl) { return; }
    let shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

    this.gl.shaderSource(shader, aStr);
    this.gl.compileShader(shader);

    if(!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.warn('Error in Fragment Shader: ', this.idFragment, ':' , this.gl.getShaderInfoLog(shader));
      console.log(Utils.addLineNumbers(aStr));
      return null;
    }

    this.fragmentShader = shader;

    if(this.vertexShader !== undefined && this.fragmentShader !== undefined) {
      this.attachShaderProgram();
    }

    this._loadedCount++;
  }
  attachShaderProgram(){
    this._isReady = true;
    this.shaderProgram = this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, this.vertexShader);
    this.gl.attachShader(this.shaderProgram, this.fragmentShader);
    this.gl.linkProgram(this.shaderProgram);
  }
  bind(){
    if(!this._isReady) {return;}
    this.gl.useProgram(this.shaderProgram);

    if(this.shaderProgram.pMatrixUniform === undefined) { this.shaderProgram.pMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'uPMatrix');}
    if(this.shaderProgram.mvMatrixUniform === undefined) {  this.shaderProgram.mvMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'uMVMatrix');}
    if(this.shaderProgram.normalMatrixUniform === undefined) {  this.shaderProgram.normalMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'normalMatrix');}
    if(this.shaderProgram.invertMVMatrixUniform === undefined) {  this.shaderProgram.invertMVMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'invertMVMatrix');}

    _GLTool.setShader(this);
    _GLTool.setShaderProgram(this.shaderProgram);

    this.uniformTextures = [];
  }
  clearUniforms(){
    this.parameters = [];
    this.uniformValues = {};
  }
  uniform(aName, aType, aValue) {
    if(!this._isReady) return;

    if(aType === 'texture') {aType = 'uniform1i';}

    let hasUniform = false;
    let oUniform;
    for(let i=0; i<this.parameters.length; i++) {
      oUniform = this.parameters[i];
      if(oUniform.name === aName) {
        oUniform.value = aValue;
        hasUniform = true;
        break;
      }
    }

    if(!hasUniform) {
      this.shaderProgram[aName] = this.gl.getUniformLocation(this.shaderProgram, aName);
      this.parameters.push({name : aName, type: aType, value: aValue, uniformLoc: this.shaderProgram[aName]});
    } else {
      this.shaderProgram[aName] = oUniform.uniformLoc;
    }

    if(aType.indexOf('Matrix') === -1) {
      if(!hasUniform) {
        let isArray = Array.isArray(aValue);
        if(isArray) {
          this.uniformValues[aName] = aValue.concat();
        } else {
          this.uniformValues[aName] = aValue; 
        }
        this.gl[aType](this.shaderProgram[aName], aValue);
      } else {
        if(this.checkUniform(aName, aType, aValue)) {
          this.gl[aType](this.shaderProgram[aName], aValue);
        }
      }
    } else {
      this.gl[aType](this.shaderProgram[aName], false, aValue);
      if(!hasUniform) {
        this.gl[aType](this.shaderProgram[aName], false, aValue);
        this.uniformValues[aName] = aValue;
      }
    }

    if(aType === 'uniform1i') {
      // Texture
      this.uniformTextures[aValue] = this.shaderProgram[aName];
    }

  }
  checkUniform(aName, aType, aValue){
    let isArray = Array.isArray(aValue);
    if(!this.uniformValues[aName]) {
      this.uniformValues[aName] = aValue;
      return true;
    }

    if(aType === 'uniform1i') {
      this.uniformValues[aName] = aValue;
      return true;
    }

    let uniformValue = this.uniformValues[aName];
    let hasChanged = false;

    if(isArray) {
      for(let i=0; i<uniformValue.length; i++) {
        if(uniformValue[i] !== aValue[i]) {
          hasChanged = true;
          break;
        }
      } 
    } else {
      hasChanged = uniformValue !== aValue;
    }
    
    if(hasChanged) {
      if(isArray) {
        this.uniformValues[aName] = aValue.concat();
      } else {
        this.uniformValues[aName] = aValue; 
      }
    }

    return hasChanged;
  }
  unbind(){

  }
  destroy(){
    this.gl.detachShader(this.shaderProgram, this.vertexShader);
    this.gl.detachShader(this.shaderProgram, this.fragmentShader);
    this.gl.deleteShader(this.vertexShader);
    this.gl.deleteShader(this.fragmentShader);
    this.gl.deleteProgram(this.shaderProgram);
  }

  get isReady() {
    return this._isReady;
  }
}