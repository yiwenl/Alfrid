// GLTexture.js

define(["alfrid/GLTool"], function(GL, ViewCopy, Framebuffer) {
	var gl;

	var GLTexture = function(source, isTexture) {
		isTexture = isTexture == undefined ? false : true;
		gl = GL.gl;
		if(isTexture) {
			this.texture = source;
		} else {
			this.texture = gl.createTexture();
			this._isVideo = (source.tagName == "VIDEO");


			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

			if(!this._isVideo) {
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
				gl.generateMipmap(gl.TEXTURE_2D);
			} else {
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
				gl.generateMipmap(gl.TEXTURE_2D);
			}

			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}

	var p = GLTexture.prototype;


	p.updateTexture = function(source) {
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

		if(!this._isVideo) {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
			gl.generateMipmap(gl.TEXTURE_2D);
		} else {
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		}

		gl.bindTexture(gl.TEXTURE_2D, null);
	};


	p.bind = function(index, toDebug) {
		if(index == undefined) index = 0;

		gl.activeTexture(gl.TEXTURE0 + index);
		// console.log( gl.TEXTURE0 + i, this._textures[i].texture );
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		// gl.uniform1i(shaderProgram["samplerUniform"+i], i);
		// if(toDebug) console.log( GL.shader.uniformTextures[index], this );
		gl.uniform1i(GL.shader.uniformTextures[index], index);
		this._bindIndex = index;
	};


	p.unbind = function() {
		gl.bindTexture(gl.TEXTURE_2D, null);
	};

	return GLTexture;
});