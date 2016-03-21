// ShaderLbs.js

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var glslify = require('glslify');

var ShaderLibs = {
	simpleColorFrag: glslify('../shaders/simpleColor.frag'),
	bigTriangleVert: glslify('../shaders/bigTriangle.vert'),
	generalVert: glslify('../shaders/general.vert'),
	generalNormalVert: glslify('../shaders/generalWithNormal.vert')
};

exports.default = ShaderLibs;