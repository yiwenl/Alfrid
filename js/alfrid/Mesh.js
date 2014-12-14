define(["alfrid/GLTool"], function(GLTool) {

	var Mesh = function(aVertexSize, aIndexSize, aDrawType) {

		this.gl = GLTool.gl;
		this.vertexSize = aVertexSize;
		this.indexSize = aIndexSize;
		this.drawType = aDrawType;
		this.extraAttributes = [];
		
		this.vBufferPos = undefined;
		this._floatArrayVertex = undefined;

		this._init();
	};

	var p = Mesh.prototype;

	p._init = function() {

	};

	p.bufferVertex = function(aArrayVertices) {
		var vertices = [];

		for(var i=0; i<aArrayVertices.length; i++) {
			for(var j=0; j<aArrayVertices[i].length; j++) vertices.push(aArrayVertices[i][j]);
		}

		if(this.vBufferPos == undefined) this.vBufferPos = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBufferPos);

		if(this._floatArrayVertex == undefined) {
			this._floatArrayVertex = new Float32Array(vertices);
		} else {
			if(aArrayVertices.length != this._floatArrayVertex.length) {
				this._floatArrayVertex = new Float32Array(vertices);
			} else {
				for(var i=0; i<aArrayVertices.length; i++) {
					this._floatArrayVertex[i] = aArrayVertices[i];
				}
			}
		}

		this.gl.bufferData(this.gl.ARRAY_BUFFER, this._floatArrayVertex, this.gl.STATIC_DRAW);
		this.vBufferPos.itemSize = 3;
	};

	p.bufferTexCoords = function(aArrayTexCoords) {
		var coords = [];

		for(var i=0; i<aArrayTexCoords.length; i++) {
			for(var j=0; j<aArrayTexCoords[i].length; j++) coords.push(aArrayTexCoords[i][j]);
		}

		this.vBufferUV = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vBufferUV);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(coords), this.gl.STATIC_DRAW);
		this.vBufferUV.itemSize = 2;
	};

	p.bufferData = function(aData, aName, aItemSize) {
		var index = -1;

		for(var i=0; i<this.extraAttributes.length; i++) {
			if(this.extraAttributes[i].name == aName) {
				this.extraAttributes[i].data = aData;
				index = i;
				break;
			}
		}

		var bufferData = [];
		for(var i=0; i<aData.length; i++) {
			for(var j=0; j<aData[i].length; j++) bufferData.push(aData[i][j]);
		}

		if(index == -1) {
			var buffer = this.gl.createBuffer();
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
			var floatArray = new Float32Array(bufferData);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, floatArray, this.gl.STATIC_DRAW);
			this.extraAttributes.push({name:aName, data:aData, itemSize: aItemSize, buffer:buffer, floatArray:floatArray});
		} else {
			var buffer = this.extraAttributes[index].buffer;
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
			var floatArray = this.extraAttributes[index].floatArray;
			for(var i=0; i<bufferData.length; i++) {
				floatArray[i] = bufferData[i];
			}
			this.gl.bufferData(this.gl.ARRAY_BUFFER, floatArray, this.gl.STATIC_DRAW);
		}

	};

	p.bufferIndices = function(aArrayIndices) {
		this.iBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(aArrayIndices), this.gl.STATIC_DRAW);
		this.iBuffer.itemSize = 1;
		this.iBuffer.numItems = aArrayIndices.length;
	};

	return Mesh;

});