// SceneCube.js
define(["alfrid/GLTool", "alfrid/Scene", "alfrid/GLTexture", "alfrid/ViewCopy", "ViewDeer"], function(GLTool, Scene, GLTexture, ViewCopy, ViewDeer) {
	var SceneCube = function() {
		Scene.call(this);

		GLTool.gl.enable(GLTool.gl.DEPTH_TEST);
		GLTool.gl.enable(GLTool.gl.CULL_FACE);
		this._initTextures();
		this._initViews();
	}

	var p = SceneCube.prototype = new Scene();
	var s = Scene.prototype;


	p._initTextures = function() {
		this.tex  = new GLTexture(images.texture);
	};


	p._initViews = function() {
		this._vDeer = new ViewDeer();
	};


	p.render = function() {
		this._vDeer.render(this.tex);
	};

	return SceneCube;
});