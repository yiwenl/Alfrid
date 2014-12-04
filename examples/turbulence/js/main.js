// main.js

define(function (require) {

	var GL = require("alfrid/GLTool");
	var scheduler = new Scheduler();
	var SceneTurbulence = require("./SceneTurbulence");

	var main = function() {
		this._init();
	}

	var p = main.prototype;

	p._init = function() {
		this._canvas 			= document.createElement("canvas");
		document.body.appendChild(this._canvas);
		this._canvas.width 		= window.innerWidth;
		this._canvas.height 	= window.innerHeight;
		this._imageDatas 		= [];
		this._needCheckProgress = false;
		this._images 			= [];

		GL.init(this._canvas);
		this.scene 				= new SceneTurbulence();
		this.start();
	};


	p.start = function() {
		scheduler.addEF(this, this.render, []);
	};

	p.render = function() {
		this.scene.loop();
		TWEEN.update();
	};	

	return main;
});