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
		// Initialise the mesh here.
	};

	p.render = function() {

	};

	return View;
	
});