// ViewDot.js

define(["alfrid/View", "alfrid/GLTool", "alfrid/Mesh"], function(View, GLTool, Mesh) {

	var ViewDot = function() {
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.scale = 1;
		View.call(this, "assets/shaders/general.vert", "assets/shaders/general.frag");
	};

	var p = ViewDot.prototype = new View();
	var s = View.prototype;

	p._init = function() {
		var positions = [];
		var coords = [];
		var indices = [0, 1, 2, 0, 2, 3];
		var size = 25;

		positions.push([-size,	-size,  0]);
		positions.push([ size,	-size,  0]);
		positions.push([ size,	 size,  0]);
		positions.push([-size,	 size,  0]);

		coords.push([0, 0]);
		coords.push([1, 0]);
		coords.push([1, 1]);
		coords.push([0, 1]);

		this.mesh = new Mesh(positions.length, indices.length, GLTool.gl.TRIANGLES);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
	};

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
	
});