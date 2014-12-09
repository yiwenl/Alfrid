define([], function() {

	var instance = null;

	var ImageManager = function() {
		this._imgs = {};
		this._loadedCount = 0;
		this._toLoadCount = 0;
		this._scope = null;
		this._callback = null;
	};

	var p = ImageManager.prototype;

	p.load = function(aImgPaths, aScope, aCallback) {
		console.log('load');
		this._loadedCount = 0;
		this._toLoadCount = aImgPaths.length;
		this._scope = aScope;
		this._callback = aCallback;

		var that = this;
		for ( var i=0; i<aImgPaths.length ; i++) {
			var img = new Image();
			img.onload = function() {
				console.log('loaded');
				that._onImageLoaded();	
			};
			var path = aImgPaths[i];
			var tmp = path.split("/");
			var ref = tmp[tmp.length-1].split(".")[0];
			this._imgs[ref] = img;
			img.src = path;
		}
	};

	p._onImageLoaded = function() {
		this._loadedCount++;
		if(this._loadedCount == this._toLoadCount) {
			this._callback.call(this._scope, this._imgs);
		}
	};

	ImageManager.getInstance = function() {
		if(instance == null) {
			instance = new ImageManager();
		}
		return instance;
	};

	return ImageManager.getInstance();

});