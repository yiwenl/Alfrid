// EffectComposer.js

define(["alfrid/Pass"], function(Pass) {
	var EffectComposer = function() {
		this.texture;
		this._passes = [];
	}

	var p = EffectComposer.prototype = new Pass();
	var s = Pass.prototype;

	p.addPass = function(pass) {
		this._passes.push(pass);
	};

	p.render = function(texture) {
		this.texture = texture;
		for(var i=0; i<this._passes.length; i++) {
			this.texture = this._passes[i].render(this.texture);
		}

		return this.texture;
	};

	p.getTexture = function() {
		return this.texture;	
	};

	return EffectComposer;
	
});