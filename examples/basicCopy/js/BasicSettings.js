define(["alfrid/Settings"], function (Settings) {

	var instance = null;
	var SuperClass = Settings;

	var BasicSettings = function() {
		this.setup();
	};
	var p = BasicSettings.prototype = new SuperClass();
	var s = SuperClass.prototype;

	p.setup = function() {
		
		this.numParticles = 500;
		
		var f1 = this.params.addFolder("particles");
		this.patricleCountCtrl = f1.add(this, "numParticles");

		
	};

	BasicSettings.getInstance = function() {
		if(instance == null) {
			instance = new BasicSettings();
		}
		return instance;
	};

	return BasicSettings.getInstance();

});