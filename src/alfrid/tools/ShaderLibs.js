// ShaderLbs.js

'use strict';

var glslify = require('glslify');

const ShaderLibs = {
	simpleColorFrag:glslify('../shaders/simpleColor.frag'),
	bigTriangleVert:glslify('../shaders/bigTriangle.vert'),
	generalVert:glslify('../shaders/general.vert'),
	generalNormalVert:glslify('../shaders/generalWithNormal.vert')
};


export default ShaderLibs;