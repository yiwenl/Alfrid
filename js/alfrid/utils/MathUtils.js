define([], function() {

	var cos = Math.cos,
		PI = Math.PI,
		PI2 = Math.PI * 2,
		HALF_PI = Math.PI * 0.5,
		DEG2RAD = PI / 180,
		RAD2DEG = 180 / PI,
		EPS = 10e-6;

	var MathUtils = function MathUtils() {

	};

	MathUtils.PI2 = PI2;
	MathUtils.HALF_PI = HALF_PI;
	MathUtils.DEG2RAD = DEG2RAD;
	MathUtils.RAD2DEG = RAD2DEG;
	MathUtils.EPS = EPS;

	MathUtils.roundToOneDecimal = function(aNumber) {
		return Math.round( aNumber * 10 ) / 10;
	};

	MathUtils.roundFixedToDecimal = function(aNumber, aDecimalPlace) {
		return parseFloat( aNumber.toFixed(aDecimalPlace) );
	};

	/*
	* Linear interpolation of 'x' in range 'a'->'b'
	*/
	MathUtils.lerp = function( x, a, b ) {
		return a * ( 1 - x ) + b * x;
	};

	/*
	*	Cosine interpolation of 'x' in range 'a'->'b'
	*/
	MathUtils.cosineInterpolation = function ( x, a, b ){
		var x2 = ( 1 - cos( x * PI )) * 0.5;
		return a * ( 1 - x2 ) + b * x2;
	};

	/*
	* Maps 'n' from the range 'oA'->'oB' to the linear range 'dA'->'dB'
	*/
	MathUtils.map = function ( n, oA, oB, dA, dB, constrain ) {
		if(constrain === undefined) constrain = false;
		var value = dA + ( n - oA ) * ( dB - dA ) / ( oB - oA );
		if(constrain) MathUtils.constrain(value, dA, dB);
		return value;
	};

	/*
	* Normalizes 'n' from the given the range 'a'->'b'
	*/
	MathUtils.normalize = function ( n, a, b ) {
		return MathUtils.map( n, a, b, 0, 1 );
	};

	/*
	* Clamp 'n' to range 'a'->'b'
	*/
	MathUtils.clamp = function ( n, a, b ) {
		return ( n < a ) ? a : ( ( n > b ) ? b : n );
	};

	// LVTODO : Write descriptions
	MathUtils.contrast = function(value, scale, midValue) {
		if(midValue === undefined) midValue = 0.5;
		var tmp = value - midValue;
		return tmp * scale + midValue;
	};

	MathUtils.constrain = function(value, min, max) {
		if(value < min) return min;
		else if(value > max ) return max;
		else return value;
	};

	MathUtils.random = function(min, max) {
		return min + Math.random() * (max - min);
	};
	
	MathUtils.sign = function(num) {
		return num?num<0?-1:1:0;
	};

	MathUtils.degreesToRadians = function(aDeg) {
		var rad = aDeg * (Math.PI / 180);
		return rad;
	};

	MathUtils.radiansToDegrees = function(aRad) {
		var deg = aRad * (180 / Math.PI);
		return deg;
	};

	MathUtils.getDistance = function(p1, p2) {
		return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
	};

	//easing function
	//t: current time, b: begInnIng value, c: change In value, d: duration
	MathUtils.easeOutExpo = function (x, t, b, c, d) {
		console.log("MathUtils", t/d);
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	};


	return MathUtils;
});