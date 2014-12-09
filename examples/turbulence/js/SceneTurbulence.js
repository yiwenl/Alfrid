// SceneTurbulence.js
define(["alfrid/GLTool", "alfrid/Scene", "alfrid/GLTexture", "alfrid/ViewCopy", "ViewDot"], function(GLTool, Scene, GLTexture, ViewCopy, ViewDot) {
	var SceneTurbulence = function() {
		Scene.call(this);

		GLTool.gl.disable(GLTool.gl.DEPTH_TEST);
		GLTool.gl.disable(GLTool.gl.CULL_FACE);
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
});