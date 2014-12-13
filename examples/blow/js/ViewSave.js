// ViewSave.js

define(["alfrid/GLTool", "alfrid/View", "alfrid/Mesh", "text!../assets/shaders/save.vert", "text!../assets/shaders/save.frag"], function(GL, View, Mesh, strVert, strFrag) {

	window.perlins = [];

	var ViewSave = function(particles) {
		this.particles = particles;
		View.call(this, strVert, strFrag);
	}

	var getDistance = function(x0, y0, x1, y1) {	return Math.sqrt( (x0-x1) * (x0-x1) + (y0-y1) * (y0-y1) );	}
	var p = ViewSave.prototype = new View();
	var s = View.prototype;


	p._init = function() {
		var positions    = [];
		var colors       = [];
		var coords       = [];
		var indices      = [];
		var size         = 2;
		var index        = 0;
		var noiseOffset  = 10.0;
		var noiseSeed    = Math.random() * 0xFFFF;
		var numParticles = params.numParticles;
		var center       = {x:Math.random(), y:Math.random()};

		for(var i=0; i<this.particles.length; i++) {
			var p = this.particles[i];
			var dist = getDistance(center.x, center.y, p.u, p.v);
			var noise = Perlin.noise(p.u*noiseOffset, p.v*noiseOffset, noiseSeed) * .5 + dist;

			positions.push([ p.u-1.0, p.v-1.0, 0]);
			coords.push([0, 0]);
			indices.push(index);
			colors.push([p.u, 0.05, p.v]);

			positions.push([ p.u-1.0, p.v, 0]);
			coords.push([0, 0]);
			indices.push(index);
			colors.push([p.fixed ? 0.0 : .3+Math.random()*.7, Math.random()*.95+.5, noise]);

			index++;
		}


		this.mesh = new Mesh(positions.length, indices.length, GL.gl.POINTS);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
		this.mesh.bufferData(colors, "aVertexColor", 3);
	};


	p.updateParticles = function(particles) {
		this.particles = particles;
		var colors       = [];
		var noiseOffset  = 10.0;
		var noiseSeed    = Math.random() * 0xFFFF;
		var center       = {x:Math.random(), y:Math.random()};
		var hasPerlin 	 = window.perlins.length >= 3;
		if(hasPerlin) perlin = window.perlins[Math.floor(Math.random() * 3)];
		else perlin = [];
		var noise;

		for(var i=0; i<this.particles.length; i++) {
			var p = this.particles[i];
			var dist = getDistance(center.x, center.y, p.u, p.v);
			if(hasPerlin) noise = perlin[i];
			else {
				noise = Perlin.noise(p.u*noiseOffset, p.v*noiseOffset, noiseSeed) * .5
				perlin.push(noise);
			}
			 // = Perlin.noise(p.u*noiseOffset, p.v*noiseOffset, noiseSeed)  + dist;
			noise += dist;

			colors.push([p.u, 0.05, p.v]);
			colors.push([p.fixed ? 0.0 : .3+Math.random()*.7, Math.random()*.95+.5, noise]);
		}

		if(!hasPerlin) window.perlins.push(perlin);

		this.mesh.bufferData(colors, "aVertexColor", 3);
	};


	p.render = function() {
		this.shader.bind();
		GL.draw(this.mesh);
	};

	return ViewSave;
});