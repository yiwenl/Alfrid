// ViewDot.js
<<<<<<< HEAD

define(["alfrid/View", "alfrid/GLTool", "alfrid/Mesh"], function(View, GLTool, Mesh) {

=======
define(["alfrid/View", "alfrid/Mesh", "alfrid/GLTool"], function(View, Mesh, GLTool) {
>>>>>>> 6d975a773a6f2ad091b88f932153c0dd9582bcba
	var ViewDot = function() {
		this.x = 0;
		this.y = 0;
		this.z = 0;
<<<<<<< HEAD
		this.scale = 1;
		View.call(this, "assets/shaders/general.vert", "assets/shaders/general.frag");
	};
=======
		this.alpha = .5;
		View.call(this, "assets/shaders/general.vert", "assets/shaders/general.frag")
	}
>>>>>>> 6d975a773a6f2ad091b88f932153c0dd9582bcba

	var p = ViewDot.prototype = new View();
	var s = View.prototype;

	p._init = function() {
		var positions = [];
		var coords = [];
<<<<<<< HEAD
		var indices = [0, 1, 2, 0, 2, 3];
		var size = 25;

		positions.push([-size,	-size,  0]);
		positions.push([ size,	-size,  0]);
		positions.push([ size,	 size,  0]);
		positions.push([-size,	 size,  0]);
=======
		var indices = [0,1,2,0,2,3];

		var size = 100;
		positions.push([-size, -size, 0]);
		positions.push([size, -size, 0]);
		positions.push([size, size, 0]);
		positions.push([-size, size, 0]);
>>>>>>> 6d975a773a6f2ad091b88f932153c0dd9582bcba

		coords.push([0, 0]);
		coords.push([1, 0]);
		coords.push([1, 1]);
		coords.push([0, 1]);

<<<<<<< HEAD
		this.mesh = new Mesh(positions.length, indices.length, GLTool.gl.TRIANGLES);
=======
		this.mesh = new Mesh(4, 6, GLTool.gl.TRIANGLES);
>>>>>>> 6d975a773a6f2ad091b88f932153c0dd9582bcba
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
	};

<<<<<<< HEAD
	p.render = function(texture) {
		if(!this.shader.isReady()) return;
		// console.log(this.shader);
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		this.shader.uniform("position", "uniform3fv", [this.x, this.y, this.z]);
		this.shader.uniform("scale", "uniform3fv", [this.scale, this.scale, this.scale]);
		// this.shader.uniform("alpha", "uniform1f", 1);
		
		texture.bind(0);
		GLTool.draw(this.mesh);
	};

	return ViewDot;
	
=======

	p.render = function(texture) {
		if(!this.shader.isReady()) return;

		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		this.shader.uniform("alpha", "uniform1f", this.alpha);
		texture.bind(0);
		GLTool.draw(this.mesh);
	}

	return ViewDot;
>>>>>>> 6d975a773a6f2ad091b88f932153c0dd9582bcba
});