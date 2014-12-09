define(["alfrid/View", "alfrid/GLTool", "alfrid/Mesh"], function(View, GLTool, Mesh) {

	var SuperClass = View;

	var ViewCopy = function(aPathVert, aPathFrag) {
		if(aPathVert == undefined) {
			aPathVert = "files/shaders/basic.vert";
			aPathFrag = "files/shaders/basic.frag";
		}
		SuperClass.call(this, aPathVert, aPathFrag);
	};

	var p = ViewCopy.prototype = new SuperClass();
	var s = SuperClass.prototype;

	p._init = function() {
		var positions = [];
		var coords = [];
		var indices = [0,1,2,0,2,3];

		var size = 1;
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

	p.render = function(aTexture) {
		
		if(this.shader.isReady()) {
			this.shader.bind();
			this.shader.uniform("texture", "uniform1i", 0);
			aTexture.bind(0);
			GLTool.draw(this.mesh);
		}

	};

	return ViewCopy;
	
});