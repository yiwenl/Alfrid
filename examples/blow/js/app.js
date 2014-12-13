define(["glMatrix", "Scheduler", "SimpleImageLoader", "alfrid/GLTool", "SceneSand", "alfrid/utils/ElementUtils", "alfrid/utils/Microphone", "tween"], function (glMatrix, scheduler, SimpleImageLoader, GLTool, SceneSand, ElementUtils, Microphone, tween) {

	window.params          = {};
	params.offset          = 0;
	params.posOffset       = 2.5;
	params.targetPosOffset = 2.5;
	params.velOffset       = 0.02;
	params.accOffset       = 0.003;
	params.targetAccOffset = 0.003;
	params.timeOffset      = 0.001;
	params.decreaseRate    = 0.9963;
	params.showForceMap    = false;
	params.showMap         = false;
	
	params.openingDuration = 1500;
	params.closingDuration = 1000;

	window.craicAudioContext = (function(){
		return  window.webkitAudioContext || window.AudioContext ;
	})();

	navigator.getMedia = ( navigator.mozGetUserMedia ||
						   navigator.getUserMedia ||
						   navigator.webkitGetUserMedia ||
						   navigator.msGetUserMedia);


	var Blow = function() {
		this.count = 0;
		this.setup();
	};

	var random = function(min, max) { return min + Math.random() * ( max - min); }	
	var getRandomElement = function(ary) {	return ary[Math.floor(Math.random() * ary.length)]; }

	var p = Blow.prototype;

	p.setup = function() {
		var loader = new SimpleImageLoader();
		loader.load([
			"assets/bg.jpg",
			"assets/card.jpg",
			"assets/image0.jpg",
			"assets/image1.jpg",
			"assets/image2.jpg",
			"assets/image3.jpg",
			"assets/image4.jpg",
			"assets/image5.jpg",
			// "assets/image6.jpg",
			"assets/gold.jpg"
		], this, this._onImageLoaded)


	};

	p._onImageLoaded = function(img) {
		window.images = img;
		this._canvas 			= document.createElement("canvas");
		document.body.appendChild(this._canvas);
		this._canvas.width 		= window.innerWidth;
		this._canvas.height 	= window.innerHeight;
		this._imageDatas 		= [];
		this._needCheckProgress = false;
		this._images 			= [];

		GLTool.init(this._canvas);

		this.parseImages();
		this.scene = new SceneSand();


		this._micro = new Microphone();
		this._micro.addEventListener("onMicroInit", this._onMicroInit.bind(this));
		this._micro.init();

		this._btnRestart  = document.body.querySelector(".btn_restart");
		this._btnRestart.addEventListener("click", this.playNextImage.bind(this));
		
		this._msgLoading  = document.body.querySelector(".msg_loading");
		this._msgBlowing  = document.body.querySelector(".msg_blowing");
		this._microHint   = document.body.querySelector(".micro_hint");
		this._message     = this._msgBlowing;


		ElementUtils.addClass(this._msgLoading, "show");

		window.addEventListener("keypress", this._onKeyPress.bind(this));
		window.addEventListener("keyup", this._onKeyUp.bind(this));

		this.start();
	};


	//	MICROPHONE EVENTS
	p._onMicroInit = function(e) {
		ElementUtils.addClass(this._microHint, "hide");

		console.log( "Has Audio : ", e.detail.hasAudio );

		if(e.detail.hasAudio) {
			this._micro.addEventListener("onSound", this._onSound.bind(this));
		} 
	};


	p._onSound = function(e) {
		var increase = e.detail.increase;
		this.scene.setIncrease(increase);
		
		params.targetPosOffset = 2.5 + increase * 150;

		if(this.scene.isCardReady() && increase > 0 ) {
			ElementUtils.removeClass(this._msgBlowing, "show");
			scheduler.delay(this, this.showRestartButton, [], 1000);
		} 
	};


	//	KEYBOARD EVENTS
	p._onKeyPress = function(e) {
		if(e.charCode == 32) {
			var max = .05;
			params.targetAccOffset = max;
			params.targetPosOffset = 5.5;
			increase = max * .25;
			this.scene.setIncrease(increase);
			ElementUtils.removeClass(this._message, "show");
			scheduler.delay(this, this.showRestartButton, [], 1000);
		}
	};

	p._onKeyUp = function(e) {
		this.scene.setIncrease(0);
		params.targetAccOffset = .003;
		params.targetPosOffset = 2.5;
	};


	//	UI HANDLING
	p.showRestartButton = function() {
		if(!ElementUtils.hasClass(this._btnRestart, "show")) ElementUtils.addClass(this._btnRestart, "show");	
	};


	p.hideRestartButton = function() {
		ElementUtils.removeClass(this._btnRestart, "show");	
	};


	p.parseImages = function() {
		var imgGold     = images["gold"];
		var cvsGold     = document.createElement("canvas");
		cvsGold.width   = imgGold.width;
		cvsGold.height  = imgGold.height;
		var ctxGold     = cvsGold.getContext("2d");
		ctxGold.drawImage(imgGold, 0, 0);
		var imgGoldData = ctxGold.getImageData(0, 0, imgGold.width, imgGold.height);
		this.pixelsGold  = imgGoldData.data;
		
		var i=0;
		while(images["image"+i] != undefined) {
			this._images.push(images["image"+i]);
			i++;
		}

		scheduler.delay(this, this.playNextImage, [], 4000);	
	};


	p.getImageData = function(img) {
		if(img.particleData != undefined) return img.particleData;
		var threshold   = 220;
		var canvas      = document.createElement("canvas");
		canvas.width    = img.width;
		canvas.height   = img.height;
		var ctx         = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		var imgData     = ctx.getImageData(0, 0, img.width, img.height);
		var pixels      = imgData.data;
		var particles 	= [];
		var pixelsGold  = this.pixelsGold;

		for(var i=0; i<pixels.length; i+= 4) {
			var r     = pixels[i];
			var index = i/4;
			var fixed = r < threshold;

			var tx    = index % 512 - 256;
			var ty    = Math.floor(index/512) - 256;
			var tmp   = index * 4;

			var p = {
				x:tx,
				y:ty,
				u:-tx/512+.5,
				v:1.0-(ty/512+.5),

				r:pixelsGold[i]/255,
				g:pixelsGold[i+1]/255,
				b:pixelsGold[i+2]/255,
				a:1,
				fixed: pixels[tmp] < threshold
			};

			particles.push(p);
		}

		img.particleData = particles;
		// this._imageDatas.push(particles);
		return particles;
	};


	p._onImageDataParsed = function() {
		scheduler.delay(this, this.playNextImage, [], 4000);
	};	


	p.playNextImage = function() {
		this.hideRestartButton();
		
		ElementUtils.removeClass(this._message, "show");
		ElementUtils.addClass(this._msgLoading, "show");
		this._needCheckProgress = true;
		this.scene.toHide();

		scheduler.delay(this, this.toPlayNextImg, [], 500);
	};


	p.toPlayNextImg = function() {
		var nextImage = getRandomElement(this._images);
		var particles = this.getImageData(nextImage);
		this.scene.setImagesData(particles);
	};


	p.start = function() {
		scheduler.addEF(this, this.render, []);
	};

	p.render = function() {
		this.scene.loop();
		TWEEN.update();

		if(this._needCheckProgress) {
			if(this.scene.isCardReady()) {
				this._needCheckProgress = false;
				ElementUtils.removeClass(this._msgLoading, "show");
				scheduler.delay(this, this.showHint, [], params.openingDuration);
			}
		}
	};	

	p.showHint = function() {
		ElementUtils.addClass(this._message, "show");
	};

	new Blow();
});