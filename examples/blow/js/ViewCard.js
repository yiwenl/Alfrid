// ViewCard.js

define(["alfrid/GLTool", "alfrid/View", "alfrid/Mesh", "text!../assets/shaders/card.vert", "text!../assets/shaders/card.frag"], function(GL, View, Mesh, strVert, strFrag) {
	var ViewCard = function() {
		this.alpha = 0;
		this.x = 0;
		this.y = 0;
		this.z = 0;
		View.call(this, strVert, strFrag);
	}

	var p = ViewCard.prototype = new View();
	var s = View.prototype;


	p._init = function() {
		var positions = [];
		var coords = [];
		var colors = [];
		// var indices = [0, 1, 3, 1, 2, 3];
		var indices = [];
		var index = 0;
		var volume = 1;

		var size = 126;
		var ratio = 1024/896;
		var y = -117;
		var xOffset = 15;

		positions.push([-size+xOffset,	y,   size/ratio]);
		positions.push([ size+xOffset,	y,   size/ratio]);
		positions.push([ size+xOffset,	y,  -size/ratio]);
		positions.push([-size+xOffset,	y,  -size/ratio]);

		coords.push([1, 1]);
		coords.push([0, 1]);
		coords.push([0, 0]);
		coords.push([1, 0]);

		colors.push([1, 1, 1]);
		colors.push([1, 1, 1]);
		colors.push([1, 1, 1]);
		colors.push([1, 1, 1]);

		indices.push(index*4+0);
		indices.push(index*4+1);
		indices.push(index*4+3);
		indices.push(index*4+1);
		indices.push(index*4+2);
		indices.push(index*4+3);

		index ++;

		
		positions.push([ size+xOffset,	y,   size/ratio]);
		positions.push([-size+xOffset,	y,   size/ratio]);
		positions.push([-size+xOffset,	y-volume,   size/ratio]);
		positions.push([ size+xOffset,	y-volume,   size/ratio]);

		coords.push([.1, .1]);
		coords.push([.05, .1]);
		coords.push([.05, .05]);
		coords.push([.1, .05]);

		colors.push([.8, .8, .8]);
		colors.push([.8, .8, .8]);
		colors.push([.8, .8, .8]);
		colors.push([.8, .8, .8]);

		indices.push(index*4+0);
		indices.push(index*4+1);
		indices.push(index*4+3);
		indices.push(index*4+1);
		indices.push(index*4+2);
		indices.push(index*4+3);

		index ++;


		positions.push([ size+xOffset,	y,  -size/ratio]);
		positions.push([ size+xOffset,	y,   size/ratio]);
		positions.push([ size+xOffset,	y-volume,   size/ratio]);
		positions.push([ size+xOffset,	y-volume,  -size/ratio]);

		coords.push([.1, .1]);
		coords.push([.05, .1]);
		coords.push([.05, .05]);
		coords.push([.1, .05]);

		colors.push([.9, .9, .9]);
		colors.push([.9, .9, .9]);
		colors.push([.9, .9, .9]);
		colors.push([.9, .9, .9]);

		indices.push(index*4+0);
		indices.push(index*4+1);
		indices.push(index*4+3);
		indices.push(index*4+1);
		indices.push(index*4+2);
		indices.push(index*4+3);

		index ++;


		positions.push([-size+xOffset,	y,  -size/ratio]);
		positions.push([ size+xOffset,	y,  -size/ratio]);
		positions.push([ size+xOffset,	y-volume,  -size/ratio]);
		positions.push([-size+xOffset,	y-volume,  -size/ratio]);

		coords.push([.1, .1]);
		coords.push([.05, .1]);
		coords.push([.05, .05]);
		coords.push([.1, .05]);

		colors.push([.8, .8, .8]);
		colors.push([.8, .8, .8]);
		colors.push([.8, .8, .8]);
		colors.push([.8, .8, .8]);

		indices.push(index*4+0);
		indices.push(index*4+1);
		indices.push(index*4+3);
		indices.push(index*4+1);
		indices.push(index*4+2);
		indices.push(index*4+3);

		index ++;

		
		positions.push([-size+xOffset,	y,   size/ratio]);
		positions.push([-size+xOffset,	y,  -size/ratio]);
		positions.push([-size+xOffset,	y-volume,  -size/ratio]);
		positions.push([-size+xOffset,	y-volume,   size/ratio]);

		coords.push([.1, .1]);
		coords.push([.05, .1]);
		coords.push([.05, .05]);
		coords.push([.1, .05]);

		colors.push([.9, .9, .9]);
		colors.push([.9, .9, .9]);
		colors.push([.9, .9, .9]);
		colors.push([.9, .9, .9]);

		indices.push(index*4+0);
		indices.push(index*4+1);
		indices.push(index*4+3);
		indices.push(index*4+1);
		indices.push(index*4+2);
		indices.push(index*4+3);

		index ++;


		positions.push([ size+xOffset,	y-volume,   size/ratio]);
		positions.push([-size+xOffset,	y-volume,   size/ratio]);
		positions.push([-size+xOffset,	y-volume,  -size/ratio]);
		positions.push([ size+xOffset,	y-volume,  -size/ratio]);

		coords.push([.1, .1]);
		coords.push([.05, .1]);
		coords.push([.05, .05]);
		coords.push([.1, .05]);

		colors.push([1, 1, 1]);
		colors.push([1, 1, 1]);
		colors.push([1, 1, 1]);
		colors.push([1, 1, 1]);

		indices.push(index*4+0);
		indices.push(index*4+1);
		indices.push(index*4+3);
		indices.push(index*4+1);
		indices.push(index*4+2);
		indices.push(index*4+3);


		this.mesh = new Mesh(positions.length, indices.length, GL.gl.TRIANGLES);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
		this.mesh.bufferData(colors, "aVertexColor", 3);

	};


	p.render = function(texture) {
		if(!this.shader.isReady() ) return;
		this.shader.bind();
		this.shader.uniform("position", "uniform3fv", [this.x, this.y, this.z]);
		this.shader.uniform("texture", "uniform1i", 0);
		this.shader.uniform("alpha", "uniform1f", this.alpha);
		texture.bind(0);
		GL.draw(this.mesh);
	};


	p.intro = function() {
		if(this.tweenPos) TWEEN.remove(this.tweenPos);
		this.x = 200;
		this.y = -500;
		this.z = 500;
		this.alpha = 0;
		this.tweenPos = new TWEEN.Tween(this).to({"x":0, "y":0, "z":0, "alpha":1}, params.openingDuration).easing(TWEEN.Easing.Sinusoidal.Out).start();
	};



	p.outro = function() {
		if(this.tweenPos) TWEEN.remove(this.tweenPos);
		this.tweenPos = new TWEEN.Tween(this).to({"x":-100, "y":-800, "z":-500, "alpha":0}, params.closingDuration).easing(TWEEN.Easing.Sinusoidal.In).start();
	};

	return ViewCard;
});