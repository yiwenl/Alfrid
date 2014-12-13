// ViewDeer.js

define(["alfrid/GLTool", "alfrid/View", "alfrid/Mesh", "alfrid/ObjLoader", "text!../assets/shaders/general.vert", "text!../assets/shaders/copy.frag", "text!../assets/deer.obj"], function(GL, View, Mesh, ObjLoader, strVert, strFrag, strObj) {
	var ViewDeer = function() {
		View.call(this, strVert, strFrag);
	}

	var p = ViewDeer.prototype = new View();
	var s = View.prototype;


	p._init = function() {
		this.obj = new ObjLoader(strObj);
		this.mesh = new Mesh(this.obj.positions.length, this.obj.indices.length, GL.gl.TRIANGLES);
		this.mesh.bufferVertex(this.obj.positions);
		this.mesh.bufferTexCoords(this.obj.coords);
		this.mesh.bufferIndices(this.obj.indices);
	};


	p.render = function(texture) {
		if(!this.shader.isReady() ) return;
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		var scale = .3;
		this.shader.uniform("scale", "uniform3fv", [scale, scale, scale]);
		this.shader.uniform("position", "uniform3fv", [0, -100, 0]);
		texture.bind(0);
		GL.draw(this.mesh);
	};

	return ViewDeer;
});