// SceneTurbulence.js
<<<<<<< HEAD

define(["alfrid/GLTool", "alfrid/Scene", "alfrid/GLTexture", "alfrid/ViewCopy", "./ViewDot"], function(GLTool, Scene, GLTexture, ViewCopy, ViewDot) {

	// var ViewDot = require("./ViewDot");
	var random = function(min, max) { return min + Math.random() * (max - min); }

	var SceneTurbulence = function() {

		this._initParticles();
		this.q = quat4.create();
		this.q1 = quat4.create();
		GLTool.gl.disable(GLTool.gl.DEPTH_TEST);
		GLTool.gl.disable(GLTool.gl.CULL_FACE);
		this.count = 0;

		Scene.call(this);
	};
=======
define(["alfrid/GLTool", "alfrid/Scene", "alfrid/GLTexture", "alfrid/ViewCopy", "ViewDot"], function(GLTool, Scene, GLTexture, ViewCopy, ViewDot) {
	var SceneTurbulence = function() {
		Scene.call(this);

		GLTool.gl.disable(GLTool.gl.DEPTH_TEST);
		GLTool.gl.disable(GLTool.gl.CULL_FACE);
		this._initTextures();
		this._initViews();
	}
>>>>>>> 6d975a773a6f2ad091b88f932153c0dd9582bcba

	var p = SceneTurbulence.prototype = new Scene();
	var s = Scene.prototype;


	p._initTextures = function() {
<<<<<<< HEAD
		this.texBg = new GLTexture(imgBg);
		this.texDot = new GLTexture(imgDot);
	};

	p._initViews = function() {
		this._vBg = new ViewCopy("assets/shaders/copy.vert", "assets/shaders/copy.frag");
		this._dot = new ViewDot();
	};


	p._initParticles = function() {
		var numParticles = 1;
		this._particles = [];
		this._scales = [];
		var m = mat4.create();
		for(var i=0; i<numParticles; i++) {
			var v = vec3.create([350, 0, 0]);
			mat4.identity(m);
			mat4.rotateX(m, Math.random() * Math.PI * 2);
			mat4.rotateY(m, Math.random() * Math.PI * 2);
			mat4.rotateZ(m, Math.random() * Math.PI * 2);
			mat4.multiplyVec3(m, v);

			this._scales.push(random(.25, 2));
			this._particles.push(v);
		}
	};	


	p.render = function() {
		GLTool.setMatrices(this.cameraOtho);
		GLTool.rotate(this.rotationFront);
		this._vBg.render(this.texBg);

		// GLTool.clear(1, 1, 1, 1);
		
		GLTool.setMatrices(this.camera);
		GLTool.rotate(this.sceneRotation.matrix);

		this._vBg.render(this.texDot);

		var timeOffset = .001;
		var thetaOffset = .0025;
		var vAxis = vec3.create();
		var vY = vec3.create([0, -1, 0]);
		var posOffset = .01;

		for(var i=0; i<this._particles.length; i++) {
			var p = this._particles[i];
			vec3.cross(p, vY, vAxis);
			var xTheta = Perlin.noise(p[0]*posOffset+this.count * timeOffset, p[1]*posOffset, p[2]*posOffset+i*.001)-.5;
			xTheta *= .000007;
			quat4.set([Math.sin(xTheta) * vAxis[0], Math.sin(xTheta) * vAxis[1], Math.sin(xTheta) * vAxis[2], Math.cos(xTheta) ], this.q1)
			quat4.multiplyVec3(this.q1, p);
			
			var theta = Perlin.noise(p[2]*posOffset+this.count * timeOffset, p[1]*posOffset*2.0, p[0]*posOffset);
			quat4.set([0, Math.sin(theta*thetaOffset), 0, Math.cos(theta*thetaOffset)], this.q);
			quat4.multiplyVec3(this.q, p);

			this._dot.x = p[0];
			this._dot.y = p[1];
			this._dot.z = p[2];
			// if(i == 0) console.log(this._dot.x, this._dot.y, this._dot.z, this._scales[i]);
			this._dot.scale = this._scales[i];
			this._dot.render(this.texDot);
		}

		this.count++;
	};


	return SceneTurbulence;
	
=======
		this.texBg = new GLTexture(images.bg);
		this.texDot = new GLTexture(images.blackDot);
	};


	p._initViews = function() {
		this._vCopy = new ViewCopy("assets/shaders/copy.vert", "assets/shaders/copy.frag");
		this._vDot = new ViewDot();
	};


	p.render = function() {
		GLTool.setMatrices(this.cameraOtho);
		GLTool.rotate(this.rotationFront);
		this._vCopy.render(this.texBg);


		GLTool.setMatrices(this.camera);
		GLTool.rotate(this.sceneRotation.matrix);
		this._vDot.render(this.texDot);
	};

	return SceneTurbulence;
>>>>>>> 6d975a773a6f2ad091b88f932153c0dd9582bcba
});