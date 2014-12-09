define(["glMatrix", "alfrid/GLTool", "alfrid/CameraPerspective", "alfrid/SceneRotation", "alfrid/Camera"], function(glMatrix, GLTool, CameraPerspective, SceneRotation, Camera) {

	var Scene = function() {

		this.gl = GLTool.gl;

		this._init();
	};

	var p = Scene.prototype;

	p._init = function() {
		this.camera = new CameraPerspective();
		this.camera.setPerspective(45, window.innerWidth/window.innerHeight, 5, 3000);

		var eye            = glMatrix.vec3.clone([0, 0, 500]  );
		var center         = glMatrix.vec3.create( );
		var up             = glMatrix.vec3.clone( [0,-1,0] );
		this.camera.lookAt(eye, center, up);
		
		this.sceneRotation = new SceneRotation();
		this.rotationFront = glMatrix.mat4.create();
		glMatrix.mat4.identity(this.rotationFront);
		
		this.cameraOtho    = new Camera();

		// In SuperClass should call following functions.
		// this._initTextures();
		// this._initViews();
	};

	p._initTextures = function() {
		// console.log("Should be overwritten by SuperClass");
	};

	p._initViews = function() {
		// console.log("Should be overwritten by SuperClass");
	};

	p.loop = function() {
		this.update();
		this.render();
	};

	p.update = function() {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.sceneRotation.update();
		GLTool.setMatrices(this.camera );
		GLTool.rotate(this.sceneRotation.matrix);
	};

	p.render = function() {

	};

	return Scene;

});