define(["alfrid/Camera"], function(Camera) {

	var SuperClass = Camera;

	var CameraPerspective = function() {
		SuperClass.call(this);

		this.projection = mat4.create();
		mat4.identity(this.projection);
		this.mtxFinal = mat4.create();
	};

	var p = CameraPerspective.prototype = new SuperClass();
	var s = SuperClass.prototype;

	p.setPerspective = function(aFov, aAspectRatio, aNear, aFar) {
		this.projection = mat4.perspective(aFov, aAspectRatio, aNear, aFar);
	};

	p.getMatrix = function() {
		mat4.multiply(this.projection, this.matrix, this.mtxFinal);
		return this.mtxFinal;
	};

	return CameraPerspective;

});