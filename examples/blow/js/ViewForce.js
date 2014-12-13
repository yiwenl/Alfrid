// ViewForce.js

define(["alfrid/GLTool", "alfrid/View", "alfrid/Mesh", "text!../assets/shaders/copy.vert", "text!../assets/shaders/cal2.frag"], function(GL, View, Mesh, strVert, strFrag) {
	var ViewForce = function() {
		this.count        = Math.random() * 0xFFFF;
		this.revealOffset = .2;
		this.increase     = 0;
		View.call(this, strVert, strFrag);

	}

	var p = ViewForce.prototype = new View();
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



	p.reset = function() {
		this.revealOffset = .2;
	};


	p.render = function(texture) {
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		this.shader.uniform("time", "uniform1f", this.count++ * .001);

		this.shader.uniform("velOffset", "uniform1f", params.velOffset);
		this.shader.uniform("accOffset", "uniform1f", params.accOffset);
		this.shader.uniform("posOffset", "uniform1f", params.posOffset);
		this.shader.uniform("revealOffset", "uniform1f", this.revealOffset);
		this.revealOffset += this.increase*.5;
		// this.revealOffset += .001;

		texture.bind(0);
		GL.draw(this.mesh);
	};

	return ViewForce;
});