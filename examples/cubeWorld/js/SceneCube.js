// SceneCube.js
define(["alfrid/GLTool", "alfrid/Scene", "alfrid/GLTexture", "alfrid/ViewCopy", "ViewCube"], function(GLTool, Scene, GLTexture, ViewCopy, ViewCube) {
	var SceneCube = function() {
		Scene.call(this);
		this._initTextures();
		this._initViews();
	}

	var p = SceneCube.prototype = new Scene();
	var s = Scene.prototype;


	p._initTextures = function() {
		this.texCube       = {};
		this.texCube.left  = new GLTexture(images.left);
		this.texCube.right = new GLTexture(images.right);
		this.texCube.up    = new GLTexture(images.up);
		this.texCube.down  = new GLTexture(images.down);
		this.texCube.front = new GLTexture(images.front);
		this.texCube.back  = new GLTexture(images.back);

		console.log("Init textures", this.texCube);
	};


	p._initViews = function() {
		console.log("Init views");
		this._vCube = new ViewCube();
		this._vCopy = new ViewCopy("assets/shaders/copy.vert", "assets/shaders/copy.frag");
	};


	p.render = function() {
		// this._vCube.render(this.texCube);

		// return;
		GLTool.setMatrices(this.cameraOtho);
		GLTool.rotate(this.rotationFront);
		// this._vCopy.render(this.texCube.front);
		this._vCube.render(this.texCube);
	};

	return SceneCube;
});