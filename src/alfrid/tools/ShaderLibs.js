// ShaderLbs.js

'use strict';

var glslify = require('glslify');

const ShaderLibs = {
	simpleColorFrag:glslify('../shaders/simpleColor.frag'),
	bigTriangleVert:glslify('../shaders/bigTriangle.vert'),
	generalVert:glslify('../shaders/general.vert'),
	copyFrag:glslify('../shaders/copy.frag'),
	basicVert:glslify('../shaders/basic.vert'),
	skyboxVert:glslify('../shaders/skybox.vert'),
	skyboxFrag:glslify('../shaders/skybox.frag')
};


export default ShaderLibs;