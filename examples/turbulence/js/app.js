<<<<<<< HEAD
define(function (require) {
	imgBg = new Image();
	imgBg.src = "assets/bg.jpg";
	imgBg.onload = function() {	loadComplete();	}

	imgDot = new Image();
	imgDot.src = "assets/blackDot.png";
	imgDot.onload = function() {	loadComplete();	}
	var count = 0;
	

	var loadComplete = function() {
		count++;

		if(count == 2) {
			var main = require("./main");
			new main();
		}
	}

=======
define(["glMatrix", "Scheduler", "SimpleImageLoader", "alfrid/GLTool", "SceneTurbulence"], function (glMatrix, scheduler, SimpleImageLoader, GLTool, SceneTurbulence) {

	var check = function() {
		this.count = 0;
		this.setup();
	};

	var p = check.prototype;

	p.setup = function() {
		var loader = new SimpleImageLoader();
		loader.load([
			"assets/bg.jpg",
			"assets/blackDot.png"
		], this, this._onImageLoaded)

	};

	p._onImageLoaded = function(img) {
		console.log("image loaded", img);
		window.images = img;


		this.canvas = document.createElement('canvas');
		document.body.appendChild(this.canvas);

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		GLTool.init(this.canvas);

		this.scene = new SceneTurbulence();
		scheduler.addEF(this, this.loop, []);
	};


	p.loop = function() {
		this.scene.loop();
	};

	var checkTest = new check();
>>>>>>> 6d975a773a6f2ad091b88f932153c0dd9582bcba
});