define(["alfrid/GLTool"], function(GLTool) {

	var GLTexture = function(aSource, aIsTexture) {
		aIsTexture = aIsTexture == undefined ? false : true;
		this.gl = GLTool.gl;
		if(aIsTexture) {
			this.texture = aSource;
		} else {
			this.texture = this.gl.createTexture();
			this._isVideo = (aSource.tagName == "VIDEO");

			this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
			this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, aSource);

			if(this._isVideo) {
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.MIRRORED_REPEAT);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.MIRRORED_REPEAT);
				this.gl.generateMipmap(this.gl.TEXTURE_2D);
			} else {
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.MIRRORED_REPEAT);
				this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.MIRRORED_REPEAT);
				this.gl.generateMipmap(this.gl.TEXTURE_2D);
			}

			this.gl.bindTexture(this.gl.TEXTURE_2D, null);
		}

		this._bindIndex = null;
	};

	var p = GLTexture.prototype;

	p.updateTexture = function(aSource) {
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, aSource);

		if(this._isVideo) {
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
		} else {
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
			this.gl.generateMipmap(this.gl.TEXTURE_2D);
		}

		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
	};

	p.bind = function(aIndex, aToDebug) {
		if(aIndex === undefined) aIndex = 0;

		this.gl.activeTexture(this.gl.TEXTURE0 + aIndex);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		if(aToDebug) console.log( GLTool.shader.uniformTextures[aIndex], this );
		this.gl.uniform1i(GLTool.shader.uniformTextures[aIndex], aIndex);
		this._bindIndex = aIndex;
	};

	p.unbind = function() {
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
	};

	return GLTexture;

});