// GLShader.js

'use strict';

import GL from './GLTool';
var glslify = require('glslify');

let addLineNumbers = function ( string ) {
	let lines = string.split( '\n' );
	for ( let i = 0; i < lines.length; i ++ ) {
		lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];
	}
	return lines.join( '\n' );
};

let gl;
let defaultVertexShader = glslify('./shaders/basic.vert');
let defaultFragmentShader = glslify('./shaders/basic.frag');

class GLShader {
	constructor(strVertexShader=defaultVertexShader, strFragmentShader=defaultFragmentShader) {

		gl                   = GL.gl;
		this.parameters      = [];
		this.uniformValues   = {};
		this.uniformTextures = [];

		if(!strVertexShader) { strVertexShader = defaultVertexShader; }
		if(!strFragmentShader) { strFragmentShader = defaultVertexShader; }

		let vsShader = this._createShaderProgram(strVertexShader, true);
		let fsShader = this._createShaderProgram(strFragmentShader, false);
		this._attachShaderProgram(vsShader, fsShader);

	}


	bind() {

		gl.useProgram(this.shaderProgram);
		GL.useShader(this);
		this.uniformTextures = [];

	}


	uniform(mName, mType, mValue) {

		let hasUniform = false;
		let oUniform;

		for(let i=0; i<this.parameters.length; i++) {
			oUniform = this.parameters[i];
			if(oUniform.name === mName) {
				oUniform.value = mValue;
				hasUniform = true;
				break;
			}
		}

		if(!hasUniform) {
			this.shaderProgram[mName] = gl.getUniformLocation(this.shaderProgram, mName);
			this.parameters.push({name : mName, type: mType, value: mValue, uniformLoc: this.shaderProgram[mName]});
		} else {
			this.shaderProgram[mName] = oUniform.uniformLoc;
		}


		if(mType.indexOf('Matrix') === -1) {
			gl[mType](this.shaderProgram[mName], mValue);
		} else {
			gl[mType](this.shaderProgram[mName], false, mValue);
			this.uniformValues[mName] = mValue;
		}

	}


	_createShaderProgram(mShaderStr, isVertexShader) {
		
		let shaderType = isVertexShader ? GL.VERTEX_SHADER : GL.FRAGMENT_SHADER;
		let shader = gl.createShader(shaderType);

		gl.shaderSource(shader, mShaderStr);
		gl.compileShader(shader);

		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.warn('Error in Shader : ', gl.getShaderInfoLog(shader));
			console.log(addLineNumbers(mShaderStr));
			return null;
		}

		return shader;
	}

	_attachShaderProgram(mVertexShader, mFragmentShader) {

		this.shaderProgram = gl.createProgram();
		gl.attachShader(this.shaderProgram, mVertexShader);
		gl.attachShader(this.shaderProgram, mFragmentShader);
		gl.linkProgram(this.shaderProgram);

	}

}


export default GLShader;