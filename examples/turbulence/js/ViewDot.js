// ViewDot.js
define(["alfrid/View", "alfrid/Mesh", "alfrid/GLTool"], function(View, Mesh, GLTool) {
	var ViewDot = function() {
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.alpha = .5;
		View.call(this, "assets/shaders/general.vert", "assets/shaders/general.frag")
	}

	var p = ViewDot.prototype = new View();
	var s = View.prototype;

	p._init = function() {
		var positions = [];
		var coords = [];
		var indices = [0,1,2,0,2,3];

		var size = 100;
		positions.push([-size, -size, 0]);
		positions.push([size, -size, 0]);
		positions.push([size, size, 0]);
		positions.push([-size, size, 0]);

		coords.push([0, 0]);
		coords.push([1, 0]);
		coords.push([1, 1]);
		coords.push([0, 1]);

		this.mesh = new Mesh(4, 6, GLTool.gl.TRIANGLES);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
	};


	p.render = function(texture) {
		if(!this.shader.isReady()) return;

		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		this.shader.uniform("alpha", "uniform1f", this.alpha);
		texture.bind(0);
		GLTool.draw(this.mesh);
	}

	return ViewDot;
});