define(["alfrid/GLShader"], function(GLShader) {

	var View = function(aPathVert, aPathFrag) {
		if(aPathVert == undefined) {
			console.warn("aPathVert is undefined");
			return;
		}

		this.shader = new GLShader(aPathVert, aPathFrag);
		this._init();
	};

	var p = View.prototype;

	p._init = function() {
		console.log("Should be overwritten by SuperClass");
	};

	p.render = function() {
		console.log("Should be overwritten by SuperClass");
	};

	return View;
	
});