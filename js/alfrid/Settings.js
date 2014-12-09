define(["datgui"], function (datgui) {

	var Settings = function() {
		this.params = new datgui.GUI();
	};
	var p = Settings.prototype;

	p.setup = function() {
		console.log("this should be overwritten");
	};

	return Settings;

});