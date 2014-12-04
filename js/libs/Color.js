// Color.js


(function() {
	Color = function(value0, value1, value2) {
		if(value1 == undefined) {
			this._hexValue = value0;

			this.r = this._hexValue >> 16 & 0xFF;
			this.g = this._hexValue >> 8 & 0xFF;
			this.b = this._hexValue & 0xFF;
		} else {
			this.r = value0;
			this.g = value1;
			this.b = value2;

			this._hexValue = this.r << 16 | this.g << 8 | this.b;
		}

		
	}

	var p = Color.prototype;

	p.toString = function() {
		return this.r + "/" + this.g + "/" + this.b + "/" + this.a;
	};


	Color.interpole = function(c0, c1, percent) {
		try {
			var r = Math.floor( c0.r + (c1.r - c0.r) * percent);
			var g = Math.floor( c0.g + (c1.g - c0.g) * percent);
			var b = Math.floor( c0.b + (c1.b - c0.b) * percent);

			return new Color(r, g, b);
		} catch (e) {
			// console.log( c0, c1, percent );
			// console.log( e );
		}
		
	}

})();