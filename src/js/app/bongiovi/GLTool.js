'use strict';

import glMatrix from 'gl-matrix';

class GLTool {
  constructor(){
    
    this.aspectRatio   = 1;
    this.fieldOfView   = 45;
    this.zNear         = 5;
    this.zFar          = 3000;

    this.canvas        = null;
    this.gl            = null;

    this.shader        = null;
    this.shaderProgram = null;
  }
  setup(mCanvas, mWidth, mHeight, parameters) {
    if(this.canvas === null) {
      this.canvas = mCanvas || document.createElement('canvas');
    }
    let params = parameters || {};
    params.antialias = true;

    this.gl = this.canvas.getContext('webgl', params) || this.canvas.getContext('experimental-webgl', params);
    console.log('GL TOOLS : ', this.gl);

    if(mWidth !== undefined && mHeight !== undefined) {
      this.setSize(mWidth, mHeight);
    } else {
      this.setSize(window.innerWidth, window.innerHeight);
    }

    this.gl.viewport(0,0,this.gl.viewportWidth, this.gl.viewportHeight);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.BLEND);
    this.gl.clearColor(0,0,0,1);
    this.gl.clearDepth(1);

    this.matrix = glMatrix.mat4.create();
    glMatrix.mat4.identity(this.matrix);

    this.normalMatrix = glMatrix.mat3.create();
    this.invertMatrix = glMatrix.mat3.create();
    this.depthTextureExt = this.gl.getExtension('WEBKIT_WEBGL_depth_texture');
    this.floatTextureExt = this.gl.getExtension('OES_texture_float');
    this.floatTextureLinearExt = this.gl.getExtension('OES_texture_float_linear');
    this.standardDerivativesExt = this.gl.getExtension('OES_standard_derivatives');

    this.enableVertexAttribute = [];
    this.enableAlphaBlending();
    this._viewport = [0,0,this.width,this.height];
  }
  getGL() {
    return this.gl;
  }
  setShader(aShader){
    this.shader = aShader;
  }
  setShaderProgram(aShaderProgram) {
    this.shaderProgram = aShaderProgram;
  }
  setViewport(aX, aY, aW, aH) {
    let hasChanged = false;
    if(aX!==this._viewport[0]) {hasChanged = true;}
    if(aY!==this._viewport[1]) {hasChanged = true;}
    if(aW!==this._viewport[2]) {hasChanged = true;}
    if(aH!==this._viewport[3]) {hasChanged = true;}

    if(hasChanged) {
      this.gl.viewport(aX,aY,aW,aH);
      this._viewport = [aX,aY,aW,aH];
    }
  }
  setMatrices(aCamera) {
    this.camera = aCamera;
  }
  rotate(aRotation) {
    glMatrix.mat4.copy(this.matrix, aRotation);
    
    glMatrix.mat4.multiply(this.matrix, this.camera.getMatrix(), this.matrix);
    glMatrix.mat3.fromMat4(this.normalMatrix, this.matrix);
    glMatrix.mat3.invert(this.normalMatrix, this.normalMatrix);
    glMatrix.mat3.transpose(this.normalMatrix, this.normalMatrix);

    glMatrix.mat3.fromMat4(this.invertMVMatrix, this.matrix);
    glMatrix.mat3.invert(this.invertMVMatrix, this.invertMVMatrix);
  }
  enableAlphaBlending(){
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
  }
  enableAdditiveBlending(){
    this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
  }
  clear(r,g,b,a){
    this.gl.clearColor(r,g,b,a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }
  draw(aMesh){
    if(!this.shaderProgram) {
      console.warn('The shader program is not ready yet! Sort it out');
      return;
    }
    
    // PROJECTION MATRIX
    if(!this.shaderProgram.pMatrixValue) {
      this.shaderProgram.pMatrixValue = glMatrix.mat4.create();
      this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixValue, false, this.camera.projection || this.camera.getMatrix());
      glMatrix.mat4.copy(this.shaderProgram.pMatrixValue, this.camera.projection || this.camera.getMatrix());
    } else {
      let pMatrix = this.camera.projection || this.camera.getMatrix();
      if(glMatrix.mat4.str(this.shaderProgram.pMatrixValue) !== glMatrix.mat4.str(pMatrix)) {
        this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.camera.projection || this.camera.getMatrix());
        glMatrix.mat4.copy(this.shaderProgram.pMatrixValue, pMatrix);
      }
    }

    // MODEL-VIEW MATRIX
    if(!this.shaderProgram.mvMatrixValue) {
      this.shaderProgram.mvMatrixValue = glMatrix.mat4.create();
      this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixValue, false, this.matrix);
      glMatrix.mat4.copy(this.shaderProgram.mvMatrixValue, this.matrix);
    } else {
      if(glMatrix.mat4.str(this.shaderProgram.mvMatrixValue) !== glMatrix.mat4.str(this.matrix)) {
        this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixValue, false, this.matrix);
        glMatrix.mat4.copy(this.shaderProgram.mvMatrixValue, this.matrix);
      }
    }

    //  INVERT MODEL-VIEW MATRIX
    if(!this.shaderProgram.invertMVMatrixValue) {
      this.shaderProgram.invertMVMatrixValue = glMatrix.mat3.create();
      this.gl.uniformMatrix3fv(this.shaderProgram.invertMVMatrixUniform, false, this.invertMVMatrix );
      glMatrix.mat3.copy(this.shaderProgram.invertMVMatrixValue, this.invertMVMatrix);
    } else {
      if(glMatrix.mat3.str(this.shaderProgram.invertMVMatrixValue) !== glMatrix.mat3.str(this.invertMVMatrix)) {
        this.gl.uniformMatrix3fv(this.shaderProgram.invertMVMatrixUniform, false, this.invertMVMatrix );
        glMatrix.mat3.copy(this.shaderProgram.invertMVMatrixValue, this.invertMVMatrix);
      }
    }

    //  NORMAL MATRIX
    if(!this.shaderProgram.normalMatrixValue) {
      this.shaderProgram.normalMatrixValue = glMatrix.mat4.create();
      this.gl.uniformMatrix3fv(this.shaderProgram.normalMatrixUniform, false, this.normalMatrix );
      glMatrix.mat3.copy(this.shaderProgram.normalMatrixValue, this.normalMatrix);
    } else {
      if(glMatrix.mat3.str(this.shaderProgram.normalMatrixValue) !== glMatrix.mat3.str(this.normalMatrix)) {
        this.gl.uniformMatrix3fv(this.shaderProgram.normalMatrixUniform, false, this.normalMatrix );
        glMatrix.mat3.copy(this.shaderProgram.normalMatrixValue, this.normalMatrix);
      }
    }

    //  VERTEX POSITIONS
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, aMesh.vBufferPos);
    var vertexPositionAttribute = GLTool.getAttribLoc(this.gl, this.shaderProgram, 'aVertexPosition');
    this.gl.vertexAttribPointer(vertexPositionAttribute, aMesh.vBufferPos.itemSize, this.gl.FLOAT, false, 0, 0);
    if(this.enabledVertexAttribute.indexOf(vertexPositionAttribute) === -1) {
      this.gl.enableVertexAttribArray(vertexPositionAttribute); 
      this.enabledVertexAttribute.push(vertexPositionAttribute);
    }
  

    //  TEXTURE COORDS
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, aMesh.vBufferUV);
    var textureCoordAttribute = GLTool.getAttribLoc(this.gl, this.shaderProgram, 'aTextureCoord');
    this.gl.vertexAttribPointer(textureCoordAttribute, aMesh.vBufferUV.itemSize, this.gl.FLOAT, false, 0, 0);

    if(this.enabledVertexAttribute.indexOf(textureCoordAttribute) === -1) {
      this.gl.enableVertexAttribArray(textureCoordAttribute);
      this.enabledVertexAttribute.push(textureCoordAttribute);
    }

    //  INDICES
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, aMesh.iBuffer);

    //  EXTRA ATTRIBUTES
    for(var i=0; i<aMesh.extraAttributes.length; i++) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, aMesh.extraAttributes[i].buffer);
      var attrPosition = GLTool.getAttribLoc(this.gl, this.shaderProgram, aMesh.extraAttributes[i].name);
      this.gl.vertexAttribPointer(attrPosition, aMesh.extraAttributes[i].itemSize, this.gl.FLOAT, false, 0, 0);
      // this.gl.enableVertexAttribArray(attrPosition); 
      if(this.enabledVertexAttribute.indexOf(attrPosition) === -1) {
        this.gl.enableVertexAttribArray(attrPosition);
        this.enabledVertexAttribute.push(attrPosition);
      } 
    }

    //  DRAWING
    if(aMesh.drawType === this.gl.POINTS ) {
      this.gl.drawArrays(aMesh.drawType, 0, aMesh.vertexSize);  
    } else {
      this.gl.drawElements(aMesh.drawType, aMesh.iBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);  
    }

  }
  setSize(mWidth, mHeight){
    this._width = mWidth;
    this._height = mHeight;

    this.canvas.width = this.gl.viewportWidth = this._width;
    this.canvas.height = this.gl.viewportWidth = this._height;

    this.gl.viewport(0,0,this._width,this._height);
    this.aspectRatio = this._width / this._height;
  }

  static getAttribLoc(gl, shaderProgram, name) {
    if(shaderProgram.cacheAttribLoc === undefined) {  shaderProgram.cacheAttribLoc = {};  }
    if(shaderProgram.cacheAttribLoc[name] === undefined) {
      shaderProgram.cacheAttribLoc[name] = gl.getAttribLocation(shaderProgram, name);
    }
    return shaderProgram.cacheAttribLoc[name];
  }
  get width(){
    return this._width;
  }
  get height() {
    return this._height;
  }
  get viewport(){
    return this._viewport;
  }
}
let _GLTool = new GLTool();
export default _GLTool;