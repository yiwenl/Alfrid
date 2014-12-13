// ViewBlur.js

define(["alfrid/GLTool", "alfrid/View", "alfrid/Mesh", "text!../assets/shaders/copy.vert"], function(GL, View, Mesh, strVertex) {
	var ViewBlur = function(frag) {
		View.call(this, strVertex, frag);
		this.blur = 1.0/512.0;
	}

	var p = ViewBlur.prototype = new View();
	var s = View.prototype;

	p._init = function() {
		var positions = [];
		var coords = [];
		var indices = [0, 1, 2, 0, 2, 3];

		positions.push([-1,	-1,  0]);
		positions.push([ 1,	-1,  0]);
		positions.push([ 1,	 1,  0]);
		positions.push([-1,	 1,  0]);

		coords.push([0, 0]);
		coords.push([1, 0]);
		coords.push([1, 1]);
		coords.push([0, 1]);

		this.mesh = new Mesh(positions.length, indices.length, GL.gl.TRIANGLES);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
	};


	p.render = function(texture) {
		this.shader.bind();
		this.shader.uniform("blur", "uniform1f", this.blur);
		this.shader.uniform("texture", "uniform1i", 0);
		texture.bind(0);
		GL.draw(this.mesh);
	};

	return ViewBlur;
});