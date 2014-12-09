define(["require", "alfrid/ImageManager", "alfrid/GLTool", "BasicScene"], function (require, ImageManager, GLTool, BasicScene) {

	var check = function() {
		console.log("check");

		this.canvas = null;
		this.scene = null;

		this._images = {};

		this.setup();
	};
	var p = check.prototype;

	p.setup = function() {
		console.log("setup");

		this.canvas = document.createElement('canvas');
		document.body.appendChild(this.canvas);

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		GLTool.init(this.canvas);

		var imgAssets = [
			"files/images/dot.png"
		];
		ImageManager.load(imgAssets, this, this.start);
	};

	p.start = function(aImgs) {
		this._images = aImgs;

		this.scene = new BasicScene(this._images["dot"]);

		this.render();
	};

	p.render = function() {
		this.scene.loop();


		requestAnimFrame(this.render.bind(this));
	};

	var checkTest = new check();

});