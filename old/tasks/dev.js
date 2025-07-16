// dev.js

const budo = require('budo');
const babelify = require('babelify');
const browserifyShader = require('browserify-shader');

console.log('Arguments :', process.argv);

const targetFile = process.argv[2];
console.log('Target File :', targetFile);

if(!targetFile) {
	console.log('Target file missing');
	process.exit();
}


budo(targetFile, {
	live: true,   
	stream: process.stdout, // log to stdout
	browserify: {
		transform: [babelify, browserifyShader]   // use ES6
	}
}).on('connect', function(ev) {
	//...
	console.log(`Server UP at ${ev}`);
});