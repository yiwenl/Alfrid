define([], function() {

	var Camera = function() {
		this.matrix = mat4.create();
		mat4.identity(this.matrix);
	};

	var p = Camera.prototype;

	p.lookAt = function(aEye, aCenter, aUp) {
		mat4.identity(this.matrix);
		this.matrix = mat4.lookAt(aEye, aCenter, aUp);
	};

	p.getMatrix = function() {
		return this.matrix;
	};

	return Camera;
	
});