define(["glMatrix", "Scheduler"], function (glMatrix, scheduler) {

	var check = function() {
		this.count = 0;
		this.setup();
	};

	var p = check.prototype;

	p.setup = function() {
		scheduler.delay(this, this.delayCall, ["Hello world"], 1000);

		this._efIndex = scheduler.addEF(this, this.loop, [], 1000);
	};



	p.delayCall = function(str) {
		console.log("Delay call " , str);
	};


	p.loop = function() {
		console.log("Looping", this.count);
		if(this.count++ > 10) scheduler.removeEF(this._efIndex);
	};

	var checkTest = new check();

});