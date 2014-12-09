define(["alfrid/GLTool", "alfrid/Scene", "alfrid/GLTexture", "alfrid/ViewCopy", "ViewDot", "glMatrix"], function(GLTool, Scene, GLTexture, ViewCopy, ViewDot, glMatrix) {
	var random = function(min, max) {	return min + Math.random() * ( max - min );	}

	var SceneTurbulence = function() {
		Scene.call(this);

		GLTool.gl.disable(GLTool.gl.DEPTH_TEST);
		GLTool.gl.disable(GLTool.gl.CULL_FACE);
		this.q = glMatrix.quat.create();
		this.q1 = glMatrix.quat.create();

		this._initParticles();
		this._initTextures();
		this._initViews();
	}

	var p = SceneTurbulence.prototype = new Scene();
	var s = Scene.prototype;


	p._initTextures = function() {
		this.texBg = new GLTexture(images.bg);
		this.texDot = new GLTexture(images.blackDot);
	};

	p._initViews = function() {
		this._vBg = new ViewCopy("assets/shaders/copy.vert", "assets/shaders/copy.frag");
		this._dot = new ViewDot();
	};


	p._initParticles = function() {
		var numParticles = 3000;
		this._particles = [];
		this._scales = [];
		var m = glMatrix.mat4.create();
		for(var i=0; i<numParticles; i++) {
			var v = glMatrix.vec3.fromValues(200, 0, 0);
			glMatrix.mat4.identity(m);
			glMatrix.mat4.rotateX(m, m, Math.random() * Math.PI * 2);
			glMatrix.mat4.rotateY(m, m, Math.random() * Math.PI * 2);
			glMatrix.mat4.rotateZ(m, m, Math.random() * Math.PI * 2);
			// glMatrix.mat4.multiplyVec3(m, v);
			glMatrix.vec3.transformMat4(v, v, m);

			this._scales.push(random(.25, 2));
			this._particles.push(v);
		}
	};	


	p.render = function() {
		GLTool.setMatrices(this.cameraOtho);
		GLTool.rotate(this.rotationFront);
		this._vBg.render(this.texBg);

		GLTool.setMatrices(this.camera);
		GLTool.rotate(this.sceneRotation.matrix);

		var timeOffset  = .001;
		var thetaOffset = .0025;
		var vAxis       = glMatrix.vec3.create();
		var vY          = glMatrix.vec3.fromValues(0, -1, 0);
		var posOffset   = .01;

		for(var i=0; i<this._particles.length; i++) {
			var p = this._particles[i];
			glMatrix.vec3.cross(vAxis, p, vY);
			var xTheta = Perlin.noise(p[0]*posOffset+this.count * timeOffset, p[1]*posOffset, p[2]*posOffset+i*.001)-.5;
			xTheta *= .000007;
			glMatrix.quat.set(this.q1, Math.sin(xTheta) * vAxis[0], Math.sin(xTheta) * vAxis[1], Math.sin(xTheta) * vAxis[2], Math.cos(xTheta) )
			// glMatrix.quat4.multiplyVec3(this.q1, p);
			glMatrix.vec3.transformQuat(p, p, this.q1);
			
			var theta = Perlin.noise(p[2]*posOffset+this.count * timeOffset, p[1]*posOffset*2.0, p[0]*posOffset);
			glMatrix.quat.set(this.q, 0, Math.sin(theta*thetaOffset), 0, Math.cos(theta*thetaOffset));
			// glMatrix.quat4.multiplyVec3(this.q, p);
			glMatrix.vec3.transformQuat(p, p, this.q);

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
});