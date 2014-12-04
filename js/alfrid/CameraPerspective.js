define(["glMatrix", "alfrid/Camera"], function(glMatrix, Camera) {

	var SuperClass = Camera;

	var CameraPerspective = function() {
		SuperClass.call(this);

		this.projection = glMatrix.mat4.create();
		glMatrix.mat4.identity(this.projection);
		this.mtxFinal = glMatrix.mat4.create();
	};

	var p = CameraPerspective.prototype = new SuperClass();
	var s = SuperClass.prototype;

	p.setPerspective = function(aFov, aAspectRatio, aNear, aFar) {
		this.projection = glMatrix.mat4.perspective(aFov, aAspectRatio, aNear, aFar);
	};

	p.getMatrix = function() {
		glMatrix.mat4.multiply(this.projection, this.matrix, this.mtxFinal);
		return this.mtxFinal;
	};

	return CameraPerspective;

});