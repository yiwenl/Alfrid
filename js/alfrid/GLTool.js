define(["glMatrix"], function(glMatrix) {

	var instance = null;

	var GLTools = function() {
		this.aspectRatio = window.innerWidth/window.innerHeight;
		this.fieldOfView = 45;
		this.zNear = 5;
		this.zFar = 3000;

		this.canvas = null;
		this.gl = null;
		
		this.W = 0;
		this.H = 0;

		this.shader = null;
		this.shaderProgram = null;
	};

	var p = GLTools.prototype;

	p.init = function(aCanvas) {
		this.canvas = aCanvas;
		this.gl = this.canvas.getContext("experimental-webgl", {antialias:true});
		this.resize();

		var size = this.gl.getParameter(this.gl.SAMPLES);
		var antialias = this.gl.getContextAttributes().antialias;
		console.log( "Sample size : ", size, antialias );

		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE)
		this.gl.enable(this.gl.BLEND);
		this.gl.clearColor( 0, 0, 0, 1 );
		this.gl.clearDepth( 1 );

		this.matrix = glMatrix.mat4.create();
		glMatrix.mat4.identity(this.matrix);
		this.depthTextureExt 	= this.gl.getExtension("WEBKIT_WEBGL_depth_texture"); // Or browser-appropriate prefix
		this.floatTextureExt 	= this.gl.getExtension("OES_texture_float") // Or browser-appropriate prefix

		console.log( "Extentions : ", this.depthTextureExt, this.floatTextureExt );

		this.enableAlphaBlending();

		var that = this;
		window.addEventListener("resize", function() {
			that.resize();
		});

	};

	p.getGL = function() {
		return this.gl;
	};

	p.setShader = function(aShader) {
		this.shader = aShader;
	};
	p.setShaderProgram = function(aShaderProgram) {
		this.shaderProgram = aShaderProgram;
	}

	p.setViewport = function(aX, aY, aW, aH) {
		this.gl.viewport(aX, aY, aW, aH);
	};

	p.setMatrices = function(aCamera) {
		this.camera = aCamera;	
	};

	p.rotate = function(aRotation) {
		glMatrix.mat4.copy(this.matrix, aRotation);
	};

	p.render = function() {
		if(this.shaderProgram == null) return;
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
	};

	p.enableAlphaBlending = function() {
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);	
	};

	p.enableAdditiveBlending = function() {
		this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
	};

	p.clear = function(r, g, b, a) {
		this.gl.clearColor( r, g, b, a );
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}

	p.draw = function(aMesh) {

		this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.camera.getMatrix() );
		this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.matrix );

		// 	VERTEX POSITIONS
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, aMesh.vBufferPos);
		var vertexPositionAttribute = getAttribLoc(this.gl, this.shaderProgram, "aVertexPosition");
		this.gl.vertexAttribPointer(vertexPositionAttribute, aMesh.vBufferPos.itemSize, this.gl.FLOAT, false, 0, 0);
		this.gl.enableVertexAttribArray(vertexPositionAttribute);

		//	TEXTURE COORDS
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, aMesh.vBufferUV);
		var textureCoordAttribute = getAttribLoc(this.gl, this.shaderProgram, "aTextureCoord");
		this.gl.vertexAttribPointer(textureCoordAttribute, aMesh.vBufferUV.itemSize, this.gl.FLOAT, false, 0, 0);
		this.gl.enableVertexAttribArray(textureCoordAttribute);

		//	INDICES
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, aMesh.iBuffer);

		//	EXTRA ATTRIBUTES
		for(var i=0; i<aMesh.extraAttributes.length; i++) {
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, aMesh.extraAttributes[i].buffer);
			var attrPosition = getAttribLoc(this.gl, this.shaderProgram, aMesh.extraAttributes[i].name);
			this.gl.vertexAttribPointer(attrPosition, aMesh.extraAttributes[i].itemSize, this.gl.FLOAT, false, 0, 0);
			this.gl.enableVertexAttribArray(attrPosition);		
		}

		//	DRAWING
		if(aMesh.drawType == this.gl.POINTS ) {
			this.gl.drawArrays(aMesh.drawType, 0, aMesh.vertexSize);	
		} else {
			this.gl.drawElements(aMesh.drawType, aMesh.iBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);	
		}


		function getAttribLoc(gl, shaderProgram, name) {
			if(shaderProgram.cacheAttribLoc  == undefined) shaderProgram.cacheAttribLoc = {};
			if(shaderProgram.cacheAttribLoc[name] == undefined) {
				shaderProgram.cacheAttribLoc[name] = gl.getAttribLocation(shaderProgram, name);
			}

			return shaderProgram.cacheAttribLoc[name];
		}

	};

	p.resize = function() {
		this.W 	= window.innerWidth;
		this.H  = window.innerHeight;

		this.canvas.width      = this.W;
		this.canvas.height     = this.H;
		this.gl.viewportWidth  = this.W;
		this.gl.viewportHeight = this.H;
		this.gl.viewport(0, 0, this.W, this.H);
		this.aspectRatio       = window.innerWidth/window.innerHeight;

		this.render();
	};

	GLTools.getInstance = function() {
		if(instance == null) {
			instance = new GLTools();
		}
		return instance;
	};

	return GLTools.getInstance();

});