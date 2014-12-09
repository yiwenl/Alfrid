define(["alfrid/Scene", "alfrid/GLTool", "alfrid/utils/MathUtils", "alfrid/GLTexture", "BasicSettings", "alfrid/ViewCopy"], function (Scene, GLTool, MathUtils, GLTexture, BasicSettings, ViewCopy) {

	var SuperClass = Scene;

	var BasicScene = function(aImage) {
		SuperClass.call(this);

		this._initTextures(aImage);
		this._initViews();
	};

	var p = BasicScene.prototype = new SuperClass();
	var s = SuperClass.prototype;

	p._initParticles = function() {

		var numParticles = BasicSettings.numParticles * BasicSettings.numParticles;
		this.particles = [];

		for(var i=0; i<numParticles; i++) {
			var x = Math.random();
			var y = MathUtils.random(0.4, 0.6);
			var z = MathUtils.random(0.4, 0.6);

			this.particles.push({x:x, y:y, z:z});
		}
		// console.log("this.particles : ", this.particles);
		


	};

	p._initTextures = function(aImage) {
		this.tex = new GLTexture(aImage);
		console.log("this.tex : ", this.tex);
	};

	p._initViews = function() {

		this._initParticles();
		this._bView = new ViewCopy("files/shaders/basic.vert", "files/shaders/basic.frag");
	};

	p.update = function() {
		s.update.call(this);
	};

	p.render = function() {

		GLTool.gl.viewport(0, 0, window.innerWidth, window.innerHeight);
		
		GLTool.setMatrices(this.camera);
		GLTool.rotate(this.sceneRotation.matrix);

		this._bView.render(this.tex);

	};

	return BasicScene;

});