require(
	[],
	function() {

	if(window.requestAnimFrame == undefined) {
		window.requestAnimFrame = (function(){
	        return  window.requestAnimationFrame       ||
	        window.webkitRequestAnimationFrame ||
	        window.mozRequestAnimationFrame    ||
	        window.oRequestAnimationFrame      ||
	        window.msRequestAnimationFrame     ||
	        function( callback ){
	        window.setTimeout(callback, 1000 / 60);
	        };
	    })();
	}

	// Console grouping polyfill

	if(window.console === undefined) {
	    var console = new Object();
	    window.console = console;
	    console.dir = function(){};
	    console.debug = function(){};
	    console.error = function(){};
	    console.info = function(){};
	    console.warn = function(){};
	    console.log = function() {};
	    console.trace = function(){};
	    console.group = function(){};
	    console.groupCollapsed = function(){};
	    console.timeStamp = function() {};
	    console.profile = function() {};
	    console.profileEnd = function() {};
	    console.error = function() {};
	}
	if(window.console.debug === undefined) {
	    console.debug = function(){};
	}

	// bind polyfill

	if (!Function.prototype.bind) {
	    Function.prototype.bind = function (oThis) {
	        if (typeof this !== "function") {
	          // closest thing possible to the ECMAScript 5 internal IsCallable function
	          throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	        }
	        
	        var aArgs = Array.prototype.slice.call(arguments, 1),
	            fToBind = this,
	            fNOP = function () {},
	            fBound = function () {
	              return fToBind.apply(this instanceof fNOP && oThis
	                                     ? this
	                                     : oThis,
	                                   aArgs.concat(Array.prototype.slice.call(arguments)));
	            };

	        fNOP.prototype = this.prototype;
	        fBound.prototype = new fNOP();

	        return fBound;
	    };
	}
	
});