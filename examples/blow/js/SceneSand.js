// SceneSand.js

define(["alfrid/GLTool", "alfrid/Scene", "alfrid/GLTexture", "alfrid/ViewCopy", "alfrid/Framebuffer", "alfrid/Pass", "alfrid/EffectComposer", "Scheduler", "ViewShadow", "ViewBg", "ViewCard", "ViewBlur", "ViewForce", "ViewSave", "ViewRender"], 
	function(GLTool, Scene, GLTexture, ViewCopy, Framebuffer, Pass, EffectComposer, scheduler, ViewShadow, ViewBg, ViewCard, ViewBlur, ViewForce, ViewSave, ViewRender) {
	var gl = GLTool.gl;
	var random = function(min, max) { return min + Math.random() * (max - min); }
	var FBO_BLUR_SIZE = 512;
	var GL;


	var SceneSand = function(particles) {
		this.particles = particles;
		Scene.call(this);
		this.camera.setPerspective(45, window.innerWidth/window.innerHeight, 5, 5000);
		gl = GLTool.gl;
		GL = GLTool;
		gl.disable(gl.DEPTH_TEST);
		this.hasSaved     = false;
		this.hasCard      = false;
		this._isCardReady = false;
		this._isClosing   = false;

		this._initTextures();
		this._initViews();
	}

	var p = SceneSand.prototype = new Scene();
	var s = Scene.prototype;


	p._initTextures = function() {
		this.texBg 		= new GLTexture(images["bg"]);
		this.texCard 	= new GLTexture(images["card"]);
		this.fboCurrent = new Framebuffer(512*2, 512*2, gl.NEAREST, gl.NEAREST);
		this.fboTarget  = new Framebuffer(512*2, 512*2, gl.NEAREST, gl.NEAREST);
		this.fboCard    = new Framebuffer(FBO_BLUR_SIZE, FBO_BLUR_SIZE);
	};


	p._initViews = function() {
		this._vCopy = new ViewCopy();
		this._vShadow = new ViewShadow();

		this._hBlur			= new ViewBlur("assets/shaders/HBlur.frag");
		this._passHBlur 	= new Pass(this._hBlur, FBO_BLUR_SIZE, FBO_BLUR_SIZE);
		this._vBlur			= new ViewBlur("assets/shaders/VBlur.frag");
		this._passVBlur 	= new Pass(this._vBlur, FBO_BLUR_SIZE, FBO_BLUR_SIZE);

		this._composer = new EffectComposer();
		this._composer.addPass(this._passHBlur);
		this._composer.addPass(this._passVBlur);

		scheduler.defer(this, this.createBg, []);
		scheduler.defer(this, this.createForce, []);
		scheduler.defer(this, this.createCard, []);
	};

	p.createForce = function() {	this._vCal    = new ViewForce();	};

	p.createCard = function() {		this._vCard   = new ViewCard();		};

	p.createBg = function() {
		this._vBg   = new ViewBg;
		new TWEEN.Tween(this._vBg).to({"alpha":1}, 3000).easing(TWEEN.Easing.Cubic.In).start();
	};


	p.setImagesData = function(data) {
		this.particles = data;

		if(this.hasCard) this._hideCard() 
		else this._showCard();
	};


	p.toHide = function() {
		this._isClosing = true;
	};


	p._hideCard = function() {
		this._vCard.outro();
		this.sceneRotation.setCameraPos([0.7958, 0.1950, -0.2651, -0.5083]);
		scheduler.delay(this, this._showCard, [], params.closingDuration);
	};


	p._showCard = function() {
		this.hasSaved = false;
		this._isCardReady = false;
		this._isClosing = false;

		if(this._vSave == undefined) this._vSave   = new ViewSave(this.particles);
		else this._vSave.updateParticles(this.particles);
		if(this._vRender == undefined ) this._vRender = new ViewRender(this.particles);

		this._vCal.reset();
		this.hasCard = true;
		this._isCardReady = true;
		this._vCard.intro();
		this.sceneRotation.resetQuat();
		this.sceneRotation.setCameraPos([0.9657, 0.0065, -0.2068, -0.1566]);
	};

	p.isCardReady = function() {	
		if(this._isClosing) return false;
		return this._isCardReady;	
	};

	p.setIncrease = function(increase) {
		if(this._vCal) this._vCal.increase = increase;
	};


	p.render = function() {
		params.accOffset += (params.targetAccOffset - params.accOffset) * .25;
		params.posOffset += (params.targetPosOffset - params.posOffset) * .25;

		GL.gl.disable(GL.gl.DEPTH_TEST);
		if(!this.hasSaved && this._isCardReady) {
			this.fboCurrent.bind();
			GL.gl.viewport(0, 0, this.fboCurrent.width, this.fboCurrent.height);
			GL.clear(0.5, 0.5, 0.5, 1.0);
			GL.setMatrices(this.cameraOtho);
			GL.rotate(this.rotationFront);
			this._vSave.render();
			this.fboCurrent.unbind();

			this.fboTarget.bind();
			GL.clear(0.5, 0.5, 0.5, 1.0);
			this.fboTarget.unbind();

			GL.gl.viewport(0, 0, window.innerWidth, window.innerHeight);
			this.hasSaved = true;
			return;
		}

		
		//	RENDER THE FORCE
		if(this._isCardReady) {
			GL.gl.viewport(0, 0, this.fboCurrent.width, this.fboCurrent.height);
			GL.setMatrices(this.cameraOtho);
			GL.rotate(this.rotationFront);
			this.fboTarget.bind();
			GL.clear(0.5, 0.5, 0.5, 1.0);
			this._vCal.render( this.fboCurrent.getTexture() );
			this.fboTarget.unbind();
		}
		

		//	RENDER THE PARTICLES
		GL.gl.viewport(0, 0, window.innerWidth, window.innerHeight);
		var clear = 0;
		GL.clear(clear, clear, clear, 0.0);

		GL.setMatrices(this.cameraOtho);
		GL.rotate(this.rotationFront);
		if(this._vBg) this._vBg.render(this.texBg);


		if(this._vCard && this._vCard.alpha > 0 && false) {
			//	RENDER CARD TO TEXTURE TO CREATE DROPSHADOW
			GL.setMatrices(this.camera);
			GL.rotate(this.sceneRotation.matrix);
			GL.gl.viewport(0, 0, this.fboCard.width, this.fboCard.height);
			this.fboCard.bind();
			GL.clear(0, 0, 0, 0);
			this._vCard.render(this.texCard);
			this.fboCard.unbind();

			//	APPLY THE BLUR
			GL.gl.viewport(0, 0, FBO_BLUR_SIZE, FBO_BLUR_SIZE);
			GL.setMatrices(this.cameraOtho);
			GL.rotate(this.rotationFront);
			this._composer.render(this.fboCard.getTexture() );

			//	RENDER CARD FBO BACK TO SCREEN
			GL.gl.viewport(0, 0, window.innerWidth, window.innerHeight);
			this._vShadow.render(this._composer.getTexture());
			this._vCopy.render(this.fboCard.getTexture());
		}


		GL.gl.viewport(0, 0, window.innerWidth, window.innerHeight);

		if(this._isCardReady) {
			GL.gl.enable(GL.gl.DEPTH_TEST);
			GL.setMatrices(this.camera);
			GL.rotate(this.sceneRotation.matrix);
			this._vCard.render(this.texCard);
			this._vRender.copy(this._vCard);
			this._vRender.render(this.fboTarget.getTexture());

			this.swapFbos();
		}
		
	};	


	p.swapFbos = function() {
		var tmp = this.fboTarget;
		this.fboTarget = this.fboCurrent;
		this.fboCurrent = tmp;
	};


	return SceneSand;
});