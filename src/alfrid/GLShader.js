// GLShader.js

'use strict';

import GL from './GLTool';
var glslify = require('glslify');
const isSame = function(array1, array2) {
	return array1.every(function(element, index) {
	    if( element !== array2[index]) {
	    	return false;
	    }
	    return true;
	});
};

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

const uniform_mapping = {
	'float':'uniform1f',
	'vec2':'uniform2fv',
	'vec3':'uniform3fv',
	'vec4':'uniform4fv',
	'int':'uniform1i',
	'mat3':'uniformMatrix3fv',
	'mat4':'uniformMatrix4fv'
};

class GLShader {
	constructor(strVertexShader=defaultVertexShader, strFragmentShader=defaultFragmentShader) {

		gl                   = GL.gl;
		this.parameters      = [];
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
		if(mValue === undefined) {
			return;
		}

		let uniformType = uniform_mapping[mType] || mType;
		let hasUniform = false;
		let oUniform;
		let parameterIndex = -1;

		for(let i=0; i<this.parameters.length; i++) {
			oUniform = this.parameters[i];
			if(oUniform.name === mName) {
				hasUniform = true;
				parameterIndex = i;
				break;
			}
		}

		if(!hasUniform) {
			this.shaderProgram[mName] = gl.getUniformLocation(this.shaderProgram, mName);
			if( !mValue.slice) {
				this.parameters.push({name : mName, type: uniformType, value: mValue, uniformLoc: this.shaderProgram[mName]});	
			} else {
				this.parameters.push({name : mName, type: uniformType, value: mValue.slice(0), uniformLoc: this.shaderProgram[mName]});	
			}
			
			parameterIndex = this.parameters.length-1;
		} else {
			this.shaderProgram[mName] = oUniform.uniformLoc;
		}

		if(uniformType.indexOf('Matrix') === -1) {
			if(mValue.slice) {
				if( !isSame(this.parameters[parameterIndex].value, mValue) || !hasUniform || 1) {
					gl[uniformType](this.shaderProgram[mName], mValue);	
					this.parameters[parameterIndex].value = mValue.slice(0);
				}
			} else {
				const needUpdate = (this.parameters[parameterIndex].value !== mValue || !hasUniform || 1);
				if( needUpdate) {
					gl[uniformType](this.shaderProgram[mName], mValue);	
					this.parameters[parameterIndex].value = mValue;
				}
			}

		} else {
			if( !isSame(this.parameters[parameterIndex].value, mValue) || !hasUniform || 1) {
				gl[uniformType](this.shaderProgram[mName], false, mValue);	
				this.parameters[parameterIndex].value = mValue.slice(0);
			}
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