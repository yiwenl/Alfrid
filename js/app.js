define(["require"], function (require) {

	var check = function() {
		console.log("check");

		this.setup();
	};
	var p = check.prototype;

	p.setup = function() {
		
	};

	var checkTest = new check();

});