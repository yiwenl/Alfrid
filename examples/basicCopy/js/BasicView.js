define(["alfrid/View", "alfrid/GLTool", "alfrid/Mesh", "BasicSettings"], function (View, GLTool, Mesh, BasicSettings) {

	var SuperClass = View;

	var ViewBasic = function(aParticles, aShaderVert, aShaderFrag) {
		this.particles = aParticles;

		SuperClass.call(this, aShaderVert, aShaderFrag);


	};

	var p = ViewBasic.prototype = new SuperClass();
	var s = SuperClass.prototype;

	p._init = function() {

		var positions = [];
		var coords = [];
		var indices = [];
		var extra = [];

		var numParticles = BasicSettings.numParticles;

		for(var i=0; i<this.particles.length; i++) {
			positions.push([0, 0, 0]);
			
			var tx = i % numParticles;
			var ty = Math.floor(i/numParticles);
			var ux = tx / numParticles;
			var uy = ty / numParticles;

			coords.push([ux, uy]);
			indices.push(i);
			// Animation / Shader extras.
			extra.push([Math.random() * 3 + 0.1, Math.random() * 0.9 + 0.1, 0]);
		}

		this.mesh = new Mesh(positions.length, indices.length, GLTool.gl.POINTS);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
		// Add the extra values to the buffer to be accessed by the shader.
		this.mesh.bufferData(extra, "aExtra", 3);
	};

	p.render = function(texture) {
		if(this.shader.isReady()) {
			this.shader.bind();
			this.shader.uniform("texture", "uniform1i", 0);
			GLTool.draw(this.mesh);
		}
	};

	return ViewBasic;

});