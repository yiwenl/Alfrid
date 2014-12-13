// ViewShadow.js

define(["alfrid/GLTool", "alfrid/View", "alfrid/Mesh", "text!../assets/shaders/copy.vert", "text!../assets/shaders/shadow.frag"], function(GL, View, Mesh, strVert, strFrag) {
	var ViewShadow = function() {
		this.alpha = 0;
		View.call(this, strVert, strFrag);
	}

	var p = ViewShadow.prototype = new View();
	var s = View.prototype;


	p._init = function() {
		var positions = [];
		var coords = [];
		var indices = [0, 1, 2, 0, 2, 3];


		var size = 1;
		positions.push([-size, -size, .5]);
		positions.push([ size, -size, .5]);
		positions.push([ size,  size, .5]);
		positions.push([-size,  size, .5]);

		coords.push([0, 0]);
		coords.push([1, 0]);
		coords.push([1, 1]);
		coords.push([0, 1]);


		this.mesh = new Mesh(4, 6, GL.gl.TRIANGLES);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
	};


	p.render = function(texture) {
		if(!this.shader.isReady() ) return;
		this.shader.bind();
		this.shader.uniform("alpha", "uniform1f", this.alpha);
		this.shader.uniform("texture", "uniform1i", 0);
		texture.bind(0);
		GL.draw(this.mesh);
	};

	return ViewShadow;
});