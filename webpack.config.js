/* eslint comma-dangle: 0 */
const webpack           = require('webpack');
const path              = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const prod              = process.env.NODE_ENV === 'production';
const ip                = require('ip');
const serverIp          = ip.address();
const libraryName       = 'alfrid';

console.log('is Prod : ', prod);

function getOutput() {

	if(prod) {
		return path.resolve(__dirname, "build/" )  
	} else {
		return path.resolve(__dirname, "test/assets/" )  
	}
	
}

const settings = {
	hotPort: 8158,
	cache: !prod,
	debug: !prod,
	entry: {
		app: prod ? ['./src/alfrid.js'] : ['./src/test/app.js']
	},
	stats: {
		cached: false,
		cachedAssets: false,
		chunkModules: false,
		chunks: false,
		colors: true,
		errorDetails: true,
		hash: false,
		progress: true,
		reasons: false,
		timings: true,
		version: false
	},
	output: {
		path: getOutput(),
		filename: prod ? libraryName + '.js' : 'js/bundle.js',
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true,
		publicPath: !prod ? `http://${serverIp}:8158/assets/` : ''
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					plugins: ['transform-runtime', 'add-module-exports'],
					presets: ['es2015', 'stage-1']
				}
			},
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.scss$/,
				loader: prod ?
					ExtractTextPlugin.extract("style-loader", `css-loader!autoprefixer-loader?browsers=last 3 version!sass-loader?includePaths[]=test`) :
					`style!css!autoprefixer?browsers=last 3 version!sass?includePaths[]=test` 
			},
			{ test: /\.(glsl|frag|vert)$/, loader: 'raw', exclude: /node_modules/ },
			{ test: /\.(glsl|frag|vert)$/, loader: 'glslify', exclude: /node_modules/ }
		]
	},
	plugins: prod ? [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false
			}
		}),
		new ExtractTextPlugin('css/main.css')
	] : [new webpack.optimize.OccurenceOrderPlugin()]
};

if(prod) {
	settings.devtool = 'source-map';
}


module.exports = settings;