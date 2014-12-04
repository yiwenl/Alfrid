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

});