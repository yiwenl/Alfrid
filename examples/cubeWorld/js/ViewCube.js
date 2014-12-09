// ViewCube.js

define(["alfrid/View", "alfrid/Mesh", "alfrid/GLTool"], function(View, Mesh, GLTool) {
	var ViewCube = function() {
		View.call(this, "assets/shaders/copy.vert", "assets/shaders/copy.frag");
	}

	var p = ViewCube.prototype = new View();
	var s = View.prototype;


	p._init = function() {
		var size = 500;
		var positions = [];
		var coords = [];
		var indices = [0, 1, 2, 0, 2, 3];


		//	FRONT
		positions.push([-size, -size,  -size]);
		positions.push([ size, -size,  -size]);
		positions.push([ size,  size,  -size]);
		positions.push([-size,  size,  -size]);

		coords.push([0, 0]);
		coords.push([1, 0]);
		coords.push([1, 1]);
		coords.push([0, 1]);

		this.meshFront = new Mesh(4, 6, GLTool.gl.TRIANGLES);
		this.meshFront.bufferVertex(positions);
		this.meshFront.bufferTexCoords(coords);
		this.meshFront.bufferIndices(indices);

		//	LEFT
		positions = [];
		positions.push([-size, -size,   size]);
		positions.push([-size, -size,  -size]);
		positions.push([-size,  size,  -size]);
		positions.push([-size,  size,   size]);

		this.meshLeft = new Mesh(4, 6, GLTool.gl.TRIANGLES);
		this.meshLeft.bufferVertex(positions);
		this.meshLeft.bufferTexCoords(coords);
		this.meshLeft.bufferIndices(indices);


		//	RIGHT
		positions = [];
		positions.push([ size, -size,  -size]);
		positions.push([ size, -size,   size]);
		positions.push([ size,  size,   size]);
		positions.push([ size,  size,  -size]);

		this.meshRight = new Mesh(4, 6, GLTool.gl.TRIANGLES);
		this.meshRight.bufferVertex(positions);
		this.meshRight.bufferTexCoords(coords);
		this.meshRight.bufferIndices(indices);


		//	BACK
		positions = [];
		positions.push([ size, -size,   size]);
		positions.push([-size, -size,   size]);
		positions.push([-size,  size,   size]);
		positions.push([ size,  size,   size]);

		this.meshBack = new Mesh(4, 6, GLTool.gl.TRIANGLES);
		this.meshBack.bufferVertex(positions);
		this.meshBack.bufferTexCoords(coords);
		this.meshBack.bufferIndices(indices);


		//	TOP
		positions = [];
		positions.push([-size,  size,  -size]);
		positions.push([ size,  size,  -size]);
		positions.push([ size,  size,   size]);
		positions.push([-size,  size,   size]);

		this.meshTop = new Mesh(4, 6, GLTool.gl.TRIANGLES);
		this.meshTop.bufferVertex(positions);
		this.meshTop.bufferTexCoords(coords);
		this.meshTop.bufferIndices(indices);


		//	BOTTOM
		positions = [];
		positions.push([-size, -size,   size]);
		positions.push([ size, -size,   size]);
		positions.push([ size, -size,  -size]);
		positions.push([-size, -size,  -size]);

		this.meshBottom = new Mesh(4, 6, GLTool.gl.TRIANGLES);
		this.meshBottom.bufferVertex(positions);
		this.meshBottom.bufferTexCoords(coords);
		this.meshBottom.bufferIndices(indices);
	};

	p.render = function(textures) {
		if(!this.shader.isReady()) return;

		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		textures.front.bind(0);
		GLTool.draw(this.meshFront);
		// textures.left.bind(0);
		// GLTool.draw(this.meshLeft);
		// textures.right.bind(0);
		// GLTool.draw(this.meshRight);
		// textures.back.bind(0);
		// GLTool.draw(this.meshBack);
		// textures.up.bind(0);
		// GLTool.draw(this.meshTop);
		// textures.down.bind(0);
		// GLTool.draw(this.meshBottom);
	};

	return ViewCube;
});