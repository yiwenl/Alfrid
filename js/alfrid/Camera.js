define(["glMatrix"], function(glMatrix) {

	var Camera = function() {
		this.matrix = glMatrix.mat4.create();
		glMatrix.mat4.identity(this.matrix);
	};

	var p = Camera.prototype;

	p.lookAt = function(aEye, aCenter, aUp) {
		glMatrix.mat4.identity(this.matrix);
		glMatrix.mat4.lookAt(this.matrix, aEye, aCenter, aUp);
	};

	p.getMatrix = function() {
		return this.matrix;
	};

	return Camera;
	
});