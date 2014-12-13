// Microphone.js

define(["alfrid/utils/EventDispatcher", "Scheduler"], function(EventDispatcher, scheduler) {
	var Microphone = function() {
		this.audioContext = undefined;
		this.analyser     = undefined;
	}

	var p = Microphone.prototype = new EventDispatcher();


	p.init = function() {
		if(isSafari() ) {
			console.debug("is safari");
			this.dispatchCustomEvent("onMicroInit", {hasAudio:false});
			return;
		}

		try {
			this.audioContext = new craicAudioContext();
		} catch(e) {
			console.debug('Web Audio API is not supported in this browser');
			this.dispatchCustomEvent("onMicroInit", {hasAudio:this.audioContext != undefined});
		}

		var that = this;
		try {
			navigator.getMedia({audio:true}, this.onStream.bind(this), function(e) {
				console.log( "Error Getting media" );
				that.dispatchCustomEvent("onMicroInit", {hasAudio:this.audioContext != undefined});
			});
		} catch (e) {
			console.debug('webkitGetUserMedia threw exception :' + e);
			this.dispatchCustomEvent("onMicroInit", {hasAudio:this.audioContext != undefined});
		}	
		
	};


	function isSafari() {
		var ua = navigator.userAgent.toLowerCase(); 
		if (ua.indexOf('safari') != -1) { 
			if (ua.indexOf('chrome') > -1) {
				return false;
			} else {
				return true;
			}
		}

		return false;

	}


	p.onStream = function(stream) {
		this.dispatchCustomEvent("onMicroInit", {hasAudio:this.audioContext != undefined});

		var mediaStreamSource = this.audioContext.createMediaStreamSource(stream);

	    // Create a new volume meter and connect it.
		this.meter = createAudioMeter(this.audioContext);
		mediaStreamSource.connect(this.meter);

		scheduler.addEF(this, this._loop, []);
	};


	p._loop = function() {

		
		var threshold = .1;
		var max = 0;
		var v = this.meter.volume;
		if( v > threshold) {
			
			var tmp = (v - threshold)/.35;
			if(tmp > 1) tmp = 1;
			tmp = 1.0 - Math.cos(tmp * Math.PI * .5);
			tmp *= tmp;
			// console.log( v, tmp);
			// max = (v - threshold) * .075;
			max = tmp * .075;
		}

		increase = max * .25;
		params.targetAccOffset = .003 + max * .7;
		this.dispatchCustomEvent("onSound", {increase:increase});
	};



	function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
		var processor = audioContext.createScriptProcessor(512);
		processor.onaudioprocess = volumeAudioProcess;
		processor.clipping = false;
		processor.lastClip = 0;
		processor.volume = 0;
		processor.clipLevel = clipLevel || 0.98;
		processor.averaging = averaging || 0.95;
		processor.clipLag = clipLag || 750;

		// this will have no effect, since we don't copy the input to the output,
		// but works around a current Chrome bug.
		processor.connect(audioContext.destination);

		processor.checkClipping =
			function(){
				if (!this.clipping)
					return false;
				if ((this.lastClip + this.clipLag) < window.performance.now())
					this.clipping = false;
				return this.clipping;
			};

		processor.shutdown =
			function(){
				this.disconnect();
				this.onaudioprocess = null;
			};

		return processor;
	}


	function precision(value, numDigit) {
		var t = Math.pow(10, numDigit);
		return Math.floor(value*t)/t;
	}

	function volumeAudioProcess( event ) {
		var buf = event.inputBuffer.getChannelData(0);
		var bufLength = buf.length;
		var sum = 0;
		var x;

		// Do a root-mean-square on the samples: sum up the squares...
		for (var i=0; i<bufLength; i++) {
			x = buf[i];
			if (Math.abs(x)>=this.clipLevel) {
				this.clipping = true;
				this.lastClip = window.performance.now();
			}
			sum += x * x;
		}

		// ... then take the square root of the sum.
		var rms =  Math.sqrt(sum / bufLength);

		// Now smooth this out with the averaging factor applied
		// to the previous sample - take the max here because we
		// want "fast attack, slow release."
		this.volume = Math.max(rms, this.volume*this.averaging);
	}

	return Microphone;
});