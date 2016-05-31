(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};!function(t,e){"object"==(typeof exports==="undefined"?"undefined":_typeof(exports))&&"object"==(typeof module==="undefined"?"undefined":_typeof(module))?module.exports=e():"function"==typeof define&&define.amd?define("alfrid",[],e):"object"==(typeof exports==="undefined"?"undefined":_typeof(exports))?exports.alfrid=e():t.alfrid=e();}(undefined,function(){return function(t){function e(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return t[r].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports;}var n={};return e.m=t,e.c=n,e.p="",e(0);}([function(t,e,n){t.exports=n(75);},function(t,e){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");};},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}e.__esModule=!0;var a=n(94),i=r(a);e.default=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value" in r&&(r.writable=!0),(0,i.default)(t,r.key,r);}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e;};}();},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=r(a),u=n(2),o=r(u),s=n(8),l=r(s),h=function(){function t(){(0,i.default)(this,t),this.canvas,this._viewport=[0,0,0,0],this._enabledVertexAttribute=[],this.identityMatrix=l.default.mat4.create(),this._normalMatrix=l.default.mat3.create(),this._inverseModelViewMatrix=l.default.mat3.create(),this._modelMatrix=l.default.mat4.create(),this._matrix=l.default.mat4.create(),l.default.mat4.identity(this.identityMatrix,this.identityMatrix),this.isMobile=!1,/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(this.isMobile=!0);}return (0,o.default)(t,[{key:"init",value:function value(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(null===t||void 0===t)return void console.error("Canvas not exist");void 0!==this.canvas&&null!==this.canvas&&this.destroy(),this.canvas=t,this.setSize(window.innerWidth,window.innerHeight),this.gl=this.canvas.getContext("webgl",e)||this.canvas.getContext("experimental-webgl",e);var n=["EXT_shader_texture_lod","EXT_sRGB","EXT_frag_depth","OES_texture_float","OES_texture_half_float","OES_texture_float_linear","OES_texture_half_float_linear","OES_standard_derivatives","WEBGL_depth_texture","EXT_texture_filter_anisotropic","ANGLE_instanced_arrays"];this.extensions={};for(var r=0;r<n.length;r++){this.extensions[n[r]]=this.gl.getExtension(n[r]);}var a=this.gl;this.VERTEX_SHADER=a.VERTEX_SHADER,this.FRAGMENT_SHADER=a.FRAGMENT_SHADER,this.COMPILE_STATUS=a.COMPILE_STATUS,this.DEPTH_TEST=a.DEPTH_TEST,this.CULL_FACE=a.CULL_FACE,this.BLEND=a.BLEND,this.POINTS=a.POINTS,this.LINES=a.LINES,this.TRIANGLES=a.TRIANGLES,this.LINEAR=a.LINEAR,this.NEAREST=a.NEAREST,this.LINEAR_MIPMAP_NEAREST=a.LINEAR_MIPMAP_NEAREST,this.MIRRORED_REPEAT=a.MIRRORED_REPEAT,this.CLAMP_TO_EDGE=a.CLAMP_TO_EDGE,this.SCISSOR_TEST=a.SCISSOR_TEST,this.enable(this.DEPTH_TEST),this.enable(this.CULL_FACE),this.enable(this.BLEND);}},{key:"setViewport",value:function value(t,e,n,r){var a=!1;t!==this._viewport[0]&&(a=!0),e!==this._viewport[1]&&(a=!0),n!==this._viewport[2]&&(a=!0),r!==this._viewport[3]&&(a=!0),a&&(this.gl.viewport(t,e,n,r),this._viewport=[t,e,n,r]);}},{key:"scissor",value:function value(t,e,n,r){this.gl.scissor(t,e,n,r);}},{key:"clear",value:function value(t,e,n,r){this.gl.clearColor(t,e,n,r),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);}},{key:"setMatrices",value:function value(t){this.camera=t,this.rotate(this.identityMatrix);}},{key:"useShader",value:function value(t){this.shader=t,this.shaderProgram=this.shader.shaderProgram;}},{key:"rotate",value:function value(t){l.default.mat4.copy(this._modelMatrix,t),l.default.mat4.multiply(this._matrix,this.camera.matrix,this._modelMatrix),l.default.mat3.fromMat4(this._normalMatrix,this._matrix),l.default.mat3.invert(this._normalMatrix,this._normalMatrix),l.default.mat3.transpose(this._normalMatrix,this._normalMatrix),l.default.mat3.fromMat4(this._inverseModelViewMatrix,this._matrix),l.default.mat3.invert(this._inverseModelViewMatrix,this._inverseModelViewMatrix);}},{key:"draw",value:function value(t,e){function n(t,e,n){return void 0===e.cacheAttribLoc&&(e.cacheAttribLoc={}),void 0===e.cacheAttribLoc[n]&&(e.cacheAttribLoc[n]=t.getAttribLocation(e,n)),e.cacheAttribLoc[n];}if(t.length)for(var r=0;r<t.length;r++){this.draw(t[r]);}else {for(var a=0;a<t.attributes.length;a++){var i=t.attributes[a];this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i.buffer);var u=n(this.gl,this.shaderProgram,i.name);this.gl.vertexAttribPointer(u,i.itemSize,this.gl.FLOAT,!1,0,0),-1===this._enabledVertexAttribute.indexOf(u)&&(this.gl.enableVertexAttribArray(u),this._enabledVertexAttribute.push(u));}this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,t.iBuffer),void 0!==this.camera&&(this.shader.uniform("uProjectionMatrix","mat4",this.camera.projection),this.shader.uniform("uViewMatrix","mat4",this.camera.matrix)),this.shader.uniform("uModelMatrix","mat4",this._modelMatrix),this.shader.uniform("uNormalMatrix","mat3",this._normalMatrix),this.shader.uniform("uModelViewMatrixInverse","mat3",this._inverseModelViewMatrix);var o=t.drawType;void 0!==e&&(o=e),o===this.gl.POINTS?this.gl.drawArrays(o,0,t.vertexSize):this.gl.drawElements(o,t.iBuffer.numItems,this.gl.UNSIGNED_SHORT,0);}}},{key:"setSize",value:function value(t,e){this._width=t,this._height=e,this.canvas.width=this._width,this.canvas.height=this._height,this._aspectRatio=this._width/this._height,this.gl&&this.viewport(0,0,this._width,this._height);}},{key:"showExtensions",value:function value(){console.log("Extensions : ",this.extensions);for(var t in this.extensions){this.extensions[t]&&console.log(t,":",this.extensions[t]);}}},{key:"checkExtension",value:function value(t){return !!this.extensions[t];}},{key:"getExtension",value:function value(t){return this.extensions[t];}},{key:"enableAlphaBlending",value:function value(){this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA);}},{key:"enableAdditiveBlending",value:function value(){this.gl.blendFunc(this.gl.ONE,this.gl.ONE);}},{key:"enable",value:function value(t){this.gl.enable(t);}},{key:"disable",value:function value(t){this.gl.disable(t);}},{key:"viewport",value:function value(t,e,n,r){this.setViewport(t,e,n,r);}},{key:"destroy",value:function value(){if(this.canvas.parentNode)try{this.canvas.parentNode.removeChild(this.canvas);}catch(t){console.log("Error : ",t);}this.canvas=null;}},{key:"width",get:function get(){return this._width;}},{key:"height",get:function get(){return this._height;}},{key:"aspectRatio",get:function get(){return this._aspectRatio;}}]),t;}(),f=new h();e.default=f,t.exports=e.default;},function(t,e,n){t.exports={"default":n(102),__esModule:!0};},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}e.__esModule=!0;var a=n(96),i=r(a),u=n(93),o=r(u),s=n(53),l=r(s);e.default=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof e?"undefined":(0,l.default)(e)));t.prototype=(0,o.default)(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(i.default?(0,i.default)(t,e):t.__proto__=e);};},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}e.__esModule=!0;var a=n(53),i=r(a);e.default=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!==("undefined"==typeof e?"undefined":(0,i.default)(e))&&"function"!=typeof e?t:e;};},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n);},function(t,e,n){e.glMatrix=n(9),e.mat2=n(135),e.mat2d=n(136),e.mat3=n(66),e.mat4=n(137),e.quat=n(138),e.vec2=n(139),e.vec3=n(67),e.vec4=n(68);},function(t,e){var n={};n.EPSILON=1e-6,n.ARRAY_TYPE="undefined"!=typeof Float32Array?Float32Array:Array,n.RANDOM=Math.random,n.ENABLE_SIMD=!1,n.SIMD_AVAILABLE=n.ARRAY_TYPE===Float32Array&&"SIMD" in this,n.USE_SIMD=n.ENABLE_SIMD&&n.SIMD_AVAILABLE,n.setMatrixArrayType=function(t){n.ARRAY_TYPE=t;};var r=Math.PI/180;n.toRadian=function(t){return t*r;},n.equals=function(t,e){return Math.abs(t-e)<=n.EPSILON*Math.max(1,Math.abs(t),Math.abs(e));},t.exports=n;},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n);},function(t,e,n){var r=n(111),a=n(34);t.exports=function(t){return r(a(t));};},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}function a(t,e){return t.every(function(t,n){return t===e[n];});}function i(t){for(var e=t.split("\n"),n=0;n<e.length;n++){e[n]=n+1+": "+e[n];}return e.join("\n");}Object.defineProperty(e,"__esModule",{value:!0});var u=n(1),o=r(u),s=n(2),l=r(s),h=n(3),f=r(h),c=(n(140),void 0),d=n(69),v=n(143),M={"float":"uniform1f",vec2:"uniform2fv",vec3:"uniform3fv",vec4:"uniform4fv","int":"uniform1i",mat3:"uniformMatrix3fv",mat4:"uniformMatrix4fv"},p=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?d:arguments[0],n=arguments.length<=1||void 0===arguments[1]?v:arguments[1];(0,o.default)(this,t),c=f.default.gl,this.parameters=[],this.uniformTextures=[],e||(e=d),n||(n=d);var r=this._createShaderProgram(e,!0),a=this._createShaderProgram(n,!1);this._attachShaderProgram(r,a);}return (0,l.default)(t,[{key:"bind",value:function value(){c.useProgram(this.shaderProgram),f.default.useShader(this),this.uniformTextures=[];}},{key:"uniform",value:function value(t,e,n){if(void 0===n||null===n)return void console.warn("mValue Error:",t);for(var r=M[e]||e,i=!1,u=void 0,o=-1,s=0;s<this.parameters.length;s++){if(u=this.parameters[s],u.name===t){i=!0,o=s;break;}}if(i?this.shaderProgram[t]=u.uniformLoc:(this.shaderProgram[t]=c.getUniformLocation(this.shaderProgram,t),n.slice?this.parameters.push({name:t,type:r,value:n.slice(0),uniformLoc:this.shaderProgram[t]}):this.parameters.push({name:t,type:r,value:n,uniformLoc:this.shaderProgram[t]}),o=this.parameters.length-1),this.parameters[o].uniformLoc)if(-1===r.indexOf("Matrix")){if(n.slice)a(this.parameters[o].value,n)&&i||(c[r](this.shaderProgram[t],n),this.parameters[o].value=n.slice(0));else {var l=this.parameters[o].value!==n||!i;l&&(c[r](this.shaderProgram[t],n),this.parameters[o].value=n);}}else a(this.parameters[o].value,n)&&i||(c[r](this.shaderProgram[t],!1,n),this.parameters[o].value=n.slice(0));}},{key:"_createShaderProgram",value:function value(t,e){var n=e?f.default.VERTEX_SHADER:f.default.FRAGMENT_SHADER,r=c.createShader(n);return c.shaderSource(r,t),c.compileShader(r),c.getShaderParameter(r,c.COMPILE_STATUS)?r:(console.warn("Error in Shader : ",c.getShaderInfoLog(r)),console.log(i(t)),null);}},{key:"_attachShaderProgram",value:function value(t,e){this.shaderProgram=c.createProgram(),c.attachShader(this.shaderProgram,t),c.attachShader(this.shaderProgram,e),c.linkProgram(this.shaderProgram);}}]),t;}();e.default=p,t.exports=e.default;},function(t,e,n){t.exports=!n(24)(function(){return 7!=Object.defineProperty({},"a",{get:function get(){return 7;}}).a;});},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e);};},function(t,e,n){var r=n(23),a=n(57),i=n(45),u=Object.defineProperty;e.f=n(13)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),a)try{return u(t,e,n);}catch(o){}if("get" in n||"set" in n)throw TypeError("Accessors not supported!");return "value" in n&&(t[e]=n.value),t;};},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=r(a),u=n(2),o=r(u),s=n(3),l=r(s),h=function(){function t(e,n){(0,i.default)(this,t),this._mesh=e,this._shader=n;}return (0,o.default)(t,[{key:"draw",value:function value(){this._shader.bind(),l.default.draw(this.mesh);}},{key:"mesh",get:function get(){return this._mesh;}},{key:"shader",get:function get(){return this._shader;}}]),t;}();e.default=h,t.exports=e.default;},function(t,e,n){var r=n(10),a=n(7),i=n(55),u=n(18),o="prototype",s=function s(t,e,n){var l,h,f,c=t&s.F,d=t&s.G,v=t&s.S,M=t&s.P,p=t&s.B,_=t&s.W,m=d?a:a[e]||(a[e]={}),x=m[o],E=d?r:v?r[e]:(r[e]||{})[o];d&&(n=e);for(l in n){h=!c&&E&&void 0!==E[l],h&&l in m||(f=h?E[l]:n[l],m[l]=d&&"function"!=typeof E[l]?n[l]:p&&h?i(f,r):_&&E[l]==f?function(t){var e=function e(_e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t();case 1:return new t(_e);case 2:return new t(_e,n);}return new t(_e,n,r);}return t.apply(this,arguments);};return e[o]=t[o],e;}(f):M&&"function"==typeof f?i(Function.call,f):f,M&&((m.virtual||(m.virtual={}))[l]=f,t&s.R&&x&&!x[l]&&u(x,l,f)));}};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s;},function(t,e,n){var r=n(15),a=n(28);t.exports=n(13)?function(t,e,n){return r.f(t,e,a(1,n));}:function(t,e,n){return t[e]=n,t;};},function(t,e,n){var r=n(43)("wks"),a=n(29),i=n(10).Symbol,u="function"==typeof i,o=t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:a)("Symbol."+t));};o.store=r;},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value" in r&&(r.writable=!0),Object.defineProperty(t,r.key,r);}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e;};}(),a=60,i=function(){function t(){n(this,t),this._delayTasks=[],this._nextTasks=[],this._deferTasks=[],this._highTasks=[],this._usurpTask=[],this._enterframeTasks=[],this._idTable=0,this._loop();}return r(t,[{key:"addEF",value:function value(t,e){e=e||[];var n=this._idTable;return this._enterframeTasks[n]={func:t,params:e},this._idTable++,n;}},{key:"removeEF",value:function value(t){return void 0!==this._enterframeTasks[t]&&(this._enterframeTasks[t]=null),-1;}},{key:"delay",value:function value(t,e,n){var r=new Date().getTime(),a={func:t,params:e,delay:n,time:r};this._delayTasks.push(a);}},{key:"defer",value:function value(t,e){var n={func:t,params:e};this._deferTasks.push(n);}},{key:"next",value:function value(t,e){var n={func:t,params:e};this._nextTasks.push(n);}},{key:"usurp",value:function value(t,e){var n={func:t,params:e};this._usurpTask.push(n);}},{key:"_process",value:function value(){var t=0,e=void 0,n=void 0,r=void 0;for(t=0;t<this._enterframeTasks.length;t++){e=this._enterframeTasks[t],null!==e&&void 0!==e&&e.func(e.params);}for(;this._highTasks.length>0;){e=this._highTasks.pop(),e.func(e.params);}var i=new Date().getTime();for(t=0;t<this._delayTasks.length;t++){e=this._delayTasks[t],i-e.time>e.delay&&(e.func(e.params),this._delayTasks.splice(t,1));}for(i=new Date().getTime(),n=1e3/a;this._deferTasks.length>0;){if(e=this._deferTasks.shift(),r=new Date().getTime(),!(n>r-i)){this._deferTasks.unshift(e);break;}e.func(e.params);}for(i=new Date().getTime(),n=1e3/a;this._usurpTask.length>0;){e=this._usurpTask.shift(),r=new Date().getTime(),n>r-i&&e.func(e.params);}this._highTasks=this._highTasks.concat(this._nextTasks),this._nextTasks=[],this._usurpTask=[];}},{key:"_loop",value:function value(){var t=this;this._process(),window.requestAnimationFrame(function(){return t._loop();});}}]),t;}(),u=new i();e.default=u;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=r(a),u=n(2),o=r(u),s=n(3),l=r(s),h=n(8),f=r(h),c=void 0,d=f.default.vec3,v=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?4:arguments[0];(0,i.default)(this,t),c=l.default.gl,this.drawType=e,this._attributes=[],this._vertexSize=0,this._vertices=[],this._texCoords=[],this._normals=[],this._faceNormals=[],this._tangents=[],this._indices=[],this._faces=[];}return (0,o.default)(t,[{key:"bufferVertex",value:function value(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];this._vertexSize=t.length,this.bufferData(t,"aVertexPosition",3,e),this._vertices=t;for(var n=[],r=0;r<t.length;r++){n.push([1,0,0]);}0===this._normals.length&&this.bufferNormal(n);}},{key:"bufferTexCoord",value:function value(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];this.bufferData(t,"aTextureCoord",2,e),this._texCoords=t;}},{key:"bufferNormal",value:function value(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];this.bufferData(t,"aNormal",3,e),this._normals=t;}},{key:"bufferIndex",value:function value(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],n=e?c.DYNAMIC_DRAW:c.STATIC_DRAW;this._indices=t,this.iBuffer=c.createBuffer(),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this.iBuffer),c.bufferData(c.ELEMENT_ARRAY_BUFFER,new Uint16Array(t),n),this.iBuffer.itemSize=1,this.iBuffer.numItems=t.length,this._indices=t;}},{key:"bufferData",value:function e(t,n,r){var a=arguments.length<=3||void 0===arguments[3]?!1:arguments[3],i=-1,u=0,o=a?c.DYNAMIC_DRAW:c.STATIC_DRAW,e=[],s=void 0,l=void 0;for(u=0;u<this._attributes.length;u++){if(this._attributes[u].name===n){this._attributes[u].data=t,i=u;break;}}for(u=0;u<t.length;u++){for(var h=0;h<t[u].length;h++){e.push(t[u][h]);}}if(-1===i)s=c.createBuffer(),c.bindBuffer(c.ARRAY_BUFFER,s),l=new Float32Array(e),c.bufferData(c.ARRAY_BUFFER,l,o),this._attributes.push({name:n,data:t,itemSize:r,buffer:s,dataArray:l});else {for(s=this._attributes[i].buffer,c.bindBuffer(c.ARRAY_BUFFER,s),l=this._attributes[i].dataArray,u=0;u<e.length;u++){l[u]=e[u];}c.bufferData(c.ARRAY_BUFFER,l,o);}}},{key:"computeNormals",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?!1:arguments[0];this._generateFaces(),t?this._computeFaceNormals():this._computeVertexNormals();}},{key:"computeTangents",value:function value(){}},{key:"_computeFaceNormals",value:function value(){for(var t=void 0,e=void 0,n=[],r=0;r<this._indices.length;r+=3){t=r/3,e=this._faces[t];var a=e.normal;n[e.indices[0]]=a,n[e.indices[1]]=a,n[e.indices[2]]=a;}this.bufferNormal(n);}},{key:"_computeVertexNormals",value:function value(){for(var t=void 0,e=d.create(),n=[],r=0;r<this._vertices.length;r++){d.set(e,0,0,0);for(var a=0;a<this._faces.length;a++){t=this._faces[a],t.indices.indexOf(r)>=0&&(e[0]+=t.normal[0],e[1]+=t.normal[1],e[2]+=t.normal[2]);}d.normalize(e,e),n.push([e[0],e[1],e[2]]);}this.bufferNormal(n);}},{key:"_generateFaces",value:function value(){for(var t=void 0,e=void 0,n=void 0,r=void 0,a=void 0,i=void 0,u=d.create(),o=d.create(),s=d.create(),l=0;l<this._indices.length;l+=3){t=this._indices[l],e=this._indices[l+1],n=this._indices[l+2],r=d.clone(this._vertices[t]),a=d.clone(this._vertices[e]),i=d.clone(this._vertices[n]),d.sub(u,a,r),d.sub(o,i,r),d.cross(s,u,o),d.normalize(s,s);var h=[s[0],s[1],s[2]],f={indices:[t,e,n],normal:h};this._faces.push(f);}}},{key:"vertices",get:function get(){return this._vertices;}},{key:"normals",get:function get(){return this._normals;}},{key:"attributes",get:function get(){return this._attributes;}},{key:"vertexSize",get:function get(){return this._vertexSize;}},{key:"hasNormals",get:function get(){return 0!==this._normals.length;}},{key:"hasTangents",get:function get(){return 0!==this._tangents.length;}}]),t;}();e.default=v,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}e.__esModule=!0;var a=n(4),i=r(a),u=n(95),o=r(u);e.default=function s(t,e,n){null===t&&(t=Function.prototype);var r=(0,o.default)(t,e);if(void 0===r){var a=(0,i.default)(t);return null===a?void 0:s(a,e,n);}if("value" in r)return r.value;var u=r.get;if(void 0!==u)return u.call(n);};},function(t,e,n){var r=n(25);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t;};},function(t,e){t.exports=function(t){try{return !!t();}catch(e){return !0;}};},function(t,e){t.exports=function(t){return "object"==(typeof t==="undefined"?"undefined":_typeof(t))?null!==t:"function"==typeof t;};},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(21),i=r(a),u={};u.plane=function(t,e,n){for(var r=arguments.length<=3||void 0===arguments[3]?"xy":arguments[3],a=arguments.length<=4||void 0===arguments[4]?4:arguments[4],u=[],o=[],s=[],l=[],h=t/n,f=e/n,c=1/n,d=.5*-t,v=.5*-e,M=0,p=0;n>p;p++){for(var _=0;n>_;_++){var m=h*p+d,x=f*_+v,E=p/n,I=_/n;"xz"===r?(u.push([m,0,x+f]),u.push([m+h,0,x+f]),u.push([m+h,0,x]),u.push([m,0,x]),o.push([E,1-(I+c)]),o.push([E+c,1-(I+c)]),o.push([E+c,1-I]),o.push([E,1-I]),l.push([0,1,0]),l.push([0,1,0]),l.push([0,1,0]),l.push([0,1,0])):"yz"===r?(u.push([0,x,m]),u.push([0,x,m+h]),u.push([0,x+f,m+h]),u.push([0,x+f,m]),o.push([E,I]),o.push([E+c,I]),o.push([E+c,I+c]),o.push([E,I+c]),l.push([1,0,0]),l.push([1,0,0]),l.push([1,0,0]),l.push([1,0,0])):(u.push([m,x,0]),u.push([m+h,x,0]),u.push([m+h,x+f,0]),u.push([m,x+f,0]),o.push([E,I]),o.push([E+c,I]),o.push([E+c,I+c]),o.push([E,I+c]),l.push([0,0,1]),l.push([0,0,1]),l.push([0,0,1]),l.push([0,0,1])),s.push(4*M+0),s.push(4*M+1),s.push(4*M+2),s.push(4*M+0),s.push(4*M+2),s.push(4*M+3),M++;}}var S=new i.default(a);return S.bufferVertex(u),S.bufferTexCoord(o),S.bufferIndex(s),S.bufferNormal(l),S;},u.sphere=function(t,e){function n(n,r){var a=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],i=n/e*Math.PI-.5*Math.PI,u=r/e*Math.PI*2,o=a?1:t,s=[];s[1]=Math.sin(i)*o;var l=Math.cos(i)*o;s[0]=Math.cos(u)*l,s[2]=Math.sin(u)*l;var h=1e4;return s[0]=Math.floor(s[0]*h)/h,s[1]=Math.floor(s[1]*h)/h,s[2]=Math.floor(s[2]*h)/h,s;}for(var r=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],a=arguments.length<=3||void 0===arguments[3]?4:arguments[3],u=[],o=[],s=[],l=[],h=1/e,f=0,c=0;e>c;c++){for(var d=0;e>d;d++){u.push(n(c,d)),u.push(n(c+1,d)),u.push(n(c+1,d+1)),u.push(n(c,d+1)),l.push(n(c,d,!0)),l.push(n(c+1,d,!0)),l.push(n(c+1,d+1,!0)),l.push(n(c,d+1,!0));var v=d/e,M=c/e;o.push([1-v,M]),o.push([1-v,M+h]),o.push([1-v-h,M+h]),o.push([1-v-h,M]),s.push(4*f+0),s.push(4*f+1),s.push(4*f+2),s.push(4*f+0),s.push(4*f+2),s.push(4*f+3),f++;}}r&&s.reverse();var p=new i.default(a);return p.bufferVertex(u),p.bufferTexCoord(o),p.bufferIndex(s),p.bufferNormal(l),p;},u.cube=function(t,e,n){var r=arguments.length<=3||void 0===arguments[3]?4:arguments[3];e=e||t,n=n||t;var a=t/2,u=e/2,o=n/2,s=[],l=[],h=[],f=[],c=0;s.push([-a,u,-o]),s.push([a,u,-o]),s.push([a,-u,-o]),s.push([-a,-u,-o]),f.push([0,0,-1]),f.push([0,0,-1]),f.push([0,0,-1]),f.push([0,0,-1]),l.push([0,0]),l.push([1,0]),l.push([1,1]),l.push([0,1]),h.push(4*c+0),h.push(4*c+1),h.push(4*c+2),h.push(4*c+0),h.push(4*c+2),h.push(4*c+3),c++,s.push([a,u,-o]),s.push([a,u,o]),s.push([a,-u,o]),s.push([a,-u,-o]),f.push([1,0,0]),f.push([1,0,0]),f.push([1,0,0]),f.push([1,0,0]),l.push([0,0]),l.push([1,0]),l.push([1,1]),l.push([0,1]),h.push(4*c+0),h.push(4*c+1),h.push(4*c+2),h.push(4*c+0),h.push(4*c+2),h.push(4*c+3),c++,s.push([a,u,o]),s.push([-a,u,o]),s.push([-a,-u,o]),s.push([a,-u,o]),f.push([0,0,1]),f.push([0,0,1]),f.push([0,0,1]),f.push([0,0,1]),l.push([0,0]),l.push([1,0]),l.push([1,1]),l.push([0,1]),h.push(4*c+0),h.push(4*c+1),h.push(4*c+2),h.push(4*c+0),h.push(4*c+2),h.push(4*c+3),c++,s.push([-a,u,o]),s.push([-a,u,-o]),s.push([-a,-u,-o]),s.push([-a,-u,o]),f.push([-1,0,0]),f.push([-1,0,0]),f.push([-1,0,0]),f.push([-1,0,0]),l.push([0,0]),l.push([1,0]),l.push([1,1]),l.push([0,1]),h.push(4*c+0),h.push(4*c+1),h.push(4*c+2),h.push(4*c+0),h.push(4*c+2),h.push(4*c+3),c++,s.push([-a,u,o]),s.push([a,u,o]),s.push([a,u,-o]),s.push([-a,u,-o]),f.push([0,1,0]),f.push([0,1,0]),f.push([0,1,0]),f.push([0,1,0]),l.push([0,0]),l.push([1,0]),l.push([1,1]),l.push([0,1]),h.push(4*c+0),h.push(4*c+1),h.push(4*c+2),h.push(4*c+0),h.push(4*c+2),h.push(4*c+3),c++,s.push([-a,-u,-o]),s.push([a,-u,-o]),s.push([a,-u,o]),s.push([-a,-u,o]),f.push([0,-1,0]),f.push([0,-1,0]),f.push([0,-1,0]),f.push([0,-1,0]),l.push([0,0]),l.push([1,0]),l.push([1,1]),l.push([0,1]),h.push(4*c+0),h.push(4*c+1),h.push(4*c+2),h.push(4*c+0),h.push(4*c+2),h.push(4*c+3),c++;var d=new i.default(r);return d.bufferVertex(s),d.bufferTexCoord(l),d.bufferIndex(h),d.bufferNormal(f),d;},u.skybox=function(t){var e=arguments.length<=1||void 0===arguments[1]?4:arguments[1],n=[],r=[],a=[],u=[],o=0;n.push([t,t,-t]),n.push([-t,t,-t]),n.push([-t,-t,-t]),n.push([t,-t,-t]),u.push([0,0,-1]),u.push([0,0,-1]),u.push([0,0,-1]),u.push([0,0,-1]),r.push([0,0]),r.push([1,0]),r.push([1,1]),r.push([0,1]),a.push(4*o+0),a.push(4*o+1),a.push(4*o+2),a.push(4*o+0),a.push(4*o+2),a.push(4*o+3),o++,n.push([t,-t,-t]),n.push([t,-t,t]),n.push([t,t,t]),n.push([t,t,-t]),u.push([1,0,0]),u.push([1,0,0]),u.push([1,0,0]),u.push([1,0,0]),r.push([0,0]),r.push([1,0]),r.push([1,1]),r.push([0,1]),a.push(4*o+0),a.push(4*o+1),a.push(4*o+2),a.push(4*o+0),a.push(4*o+2),a.push(4*o+3),o++,n.push([-t,t,t]),n.push([t,t,t]),n.push([t,-t,t]),n.push([-t,-t,t]),u.push([0,0,1]),u.push([0,0,1]),u.push([0,0,1]),u.push([0,0,1]),r.push([0,0]),r.push([1,0]),r.push([1,1]),r.push([0,1]),a.push(4*o+0),a.push(4*o+1),a.push(4*o+2),a.push(4*o+0),a.push(4*o+2),a.push(4*o+3),o++,n.push([-t,-t,t]),n.push([-t,-t,-t]),n.push([-t,t,-t]),n.push([-t,t,t]),u.push([-1,0,0]),u.push([-1,0,0]),u.push([-1,0,0]),u.push([-1,0,0]),r.push([0,0]),r.push([1,0]),r.push([1,1]),r.push([0,1]),a.push(4*o+0),a.push(4*o+1),a.push(4*o+2),a.push(4*o+0),a.push(4*o+2),a.push(4*o+3),o++,n.push([t,t,t]),n.push([-t,t,t]),n.push([-t,t,-t]),n.push([t,t,-t]),u.push([0,1,0]),u.push([0,1,0]),u.push([0,1,0]),u.push([0,1,0]),r.push([0,0]),r.push([1,0]),r.push([1,1]),r.push([0,1]),a.push(4*o+0),a.push(4*o+1),a.push(4*o+2),a.push(4*o+0),a.push(4*o+2),a.push(4*o+3),o++,n.push([t,-t,-t]),n.push([-t,-t,-t]),n.push([-t,-t,t]),n.push([t,-t,t]),u.push([0,-1,0]),u.push([0,-1,0]),u.push([0,-1,0]),u.push([0,-1,0]),r.push([0,0]),r.push([1,0]),r.push([1,1]),r.push([0,1]),a.push(4*o+0),a.push(4*o+1),a.push(4*o+2),a.push(4*o+0),a.push(4*o+2),a.push(4*o+3);var s=new i.default(e);return s.bufferVertex(n),s.bufferTexCoord(r),s.bufferIndex(a),s.bufferNormal(u),s;},u.bigTriangle=function(){var t=[2,1,0],e=[[-1,-1],[-1,4],[4,-1]],n=new i.default();return n.bufferData(e,"aPosition",2),n.bufferIndex(t),n;},e.default=u,t.exports=e.default;},function(t,e,n){var r=n(62),a=n(35);t.exports=Object.keys||function(t){return r(t,a);};},function(t,e){t.exports=function(t,e){return {enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e};};},function(t,e){var n=0,r=Math.random();t.exports=function(t){return "Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36));};},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=r(a),u=n(2),o=r(u),s=n(8),l=r(s),h=function(){function t(){(0,i.default)(this,t),this._matrix=l.default.mat4.create(),this._projection=l.default.mat4.create(),this.position=l.default.vec3.create();}return (0,o.default)(t,[{key:"lookAt",value:function value(t,e,n){l.default.vec3.copy(this.position,t),l.default.mat4.identity(this._matrix),l.default.mat4.lookAt(this._matrix,t,e,n);}},{key:"matrix",get:function get(){return this._matrix;}},{key:"viewMatrix",get:function get(){return this._matrix;}},{key:"projection",get:function get(){return this._projection;}},{key:"projectionMatrix",get:function get(){return this._projection;}}]),t;}();e.default=h,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),i=r(a),u=n(1),o=r(u),s=n(2),l=r(s),h=n(6),f=r(h),c=n(5),d=r(c),v=n(30),M=r(v),p=n(8),_=r(p),m=function(t){function e(){return (0,o.default)(this,e),(0,f.default)(this,(0,i.default)(e).apply(this,arguments));}return (0,d.default)(e,t),(0,l.default)(e,[{key:"setPerspective",value:function value(t,e,n,r){this._fov=t,this._near=n,this._far=r,this._aspectRatio=e,_.default.mat4.perspective(this._projection,t,e,n,r);}},{key:"setAspectRatio",value:function value(t){this._aspectRatio=t,_.default.mat4.perspective(this.projection,this._fov,t,this._near,this._far);}}]),e;}(M.default);e.default=m,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=r(a),u=n(2),o=r(u),s=function(){function t(){var e=this,n=arguments.length<=0||void 0===arguments[0]?!1:arguments[0];(0,i.default)(this,t),this._req=new XMLHttpRequest(),this._req.addEventListener("load",function(t){return e._onLoaded(t);}),this._req.addEventListener("progress",function(t){return e._onProgress(t);}),n&&(this._req.responseType="arraybuffer");}return (0,o.default)(t,[{key:"load",value:function value(t,e){console.log("Loading : ",t),this._callback=e,this._req.open("GET",t),this._req.send();}},{key:"_onLoaded",value:function value(){this._callback(this._req.response);}},{key:"_onProgress",value:function value(){}}]),t;}();e.default=s,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=r(a),u=n(2),o=r(u),s=n(20),l=r(s),h=function(){function t(e){var n=this,r=arguments.length<=1||void 0===arguments[1]?.1:arguments[1];(0,i.default)(this,t),this.easing=r,this._value=e,this._targetValue=e,this._efIndex=l.default.addEF(function(){return n._update();});}return (0,o.default)(t,[{key:"_update",value:function value(){var t=1e-4;this._checkLimit(),this._value+=(this._targetValue-this._value)*this.easing,Math.abs(this._targetValue-this._value)<t&&(this._value=this._targetValue);}},{key:"setTo",value:function value(t){this._targetValue=this._value=t;}},{key:"add",value:function value(t){this._targetValue+=t;}},{key:"limit",value:function value(t,e){return t>e?void this.limit(e,t):(this._min=t,this._max=e,void this._checkLimit());}},{key:"_checkLimit",value:function value(){void 0!==this._min&&this._targetValue<this._min&&(this._targetValue=this._min),void 0!==this._max&&this._targetValue>this._max&&(this._targetValue=this._max);}},{key:"destroy",value:function value(){l.default.removeEF(this._efIndex);}},{key:"value",set:function set(t){this._targetValue=t;},get:function get(){return this._value;}},{key:"targetValue",get:function get(){return this._targetValue;}}]),t;}();e.default=h,t.exports=e.default;},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t;};},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");},function(t,e){t.exports={};},function(t,e){t.exports=!0;},function(t,e,n){var r=n(23),a=n(117),i=n(35),u=n(42)("IE_PROTO"),o=function o(){},s="prototype",_l=function l(){var t,e=n(56)("iframe"),r=i.length,a=">";for(e.style.display="none",n(110).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object</script"+a),t.close(),_l=t.F;r--;){delete _l[s][i[r]];}return _l();};t.exports=Object.create||function(t,e){var n;return null!==t?(o[s]=r(t),n=new o(),o[s]=null,n[u]=t):n=_l(),void 0===e?n:a(n,e);};},function(t,e,n){var r=n(40),a=n(28),i=n(11),u=n(45),o=n(14),s=n(57),l=Object.getOwnPropertyDescriptor;e.f=n(13)?l:function(t,e){if(t=i(t),e=u(e,!0),s)try{return l(t,e);}catch(n){}return o(t,e)?a(!r.f.call(t,e),t[e]):void 0;};},function(t,e){e.f={}.propertyIsEnumerable;},function(t,e,n){var r=n(15).f,a=n(14),i=n(19)("toStringTag");t.exports=function(t,e,n){t&&!a(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e});};},function(t,e,n){var r=n(43)("keys"),a=n(29);t.exports=function(t){return r[t]||(r[t]=a(t));};},function(t,e,n){var r=n(10),a="__core-js_shared__",i=r[a]||(r[a]={});t.exports=function(t){return i[t]||(i[t]={});};},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t);};},function(t,e,n){var r=n(25);t.exports=function(t,e){if(!r(t))return t;var n,a;if(e&&"function"==typeof (n=t.toString)&&!r(a=n.call(t)))return a;if("function"==typeof (n=t.valueOf)&&!r(a=n.call(t)))return a;if(!e&&"function"==typeof (n=t.toString)&&!r(a=n.call(t)))return a;throw TypeError("Can't convert object to primitive value");};},function(t,e,n){var r=n(10),a=n(7),i=n(37),u=n(47),o=n(15).f;t.exports=function(t){var e=a.Symbol||(a.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||o(e,t,{value:u.f(t)});};},function(t,e,n){e.f=n(19);},function(t,e){t.exports="// simpleColor.frag\n\n#define SHADER_NAME SIMPLE_COLOR\n\nprecision highp float;\n#define GLSLIFY 1\n\nuniform vec3 color;\nuniform float opacity;\n\nvoid main(void) {\n    gl_FragColor = vec4(color, opacity);\n}";},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=r(a),u=n(2),o=r(u),s=n(3),l=r(s),h=void 0,f=function(){function t(e){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],r=arguments.length<=2||void 0===arguments[2]?!1:arguments[2];if((0,i.default)(this,t),h=l.default.gl,r)return void (this.texture=e);this.texture=h.createTexture(),this.magFilter=n.magFilter||h.LINEAR,this.minFilter=n.minFilter||h.LINEAR_MIPMAP_NEAREST,this.wrapS=n.wrapS||h.CLAMP_TO_EDGE,this.wrapT=n.wrapT||h.CLAMP_TO_EDGE,h.bindTexture(h.TEXTURE_CUBE_MAP,this.texture);for(var a=[h.TEXTURE_CUBE_MAP_POSITIVE_X,h.TEXTURE_CUBE_MAP_NEGATIVE_X,h.TEXTURE_CUBE_MAP_POSITIVE_Y,h.TEXTURE_CUBE_MAP_NEGATIVE_Y,h.TEXTURE_CUBE_MAP_POSITIVE_Z,h.TEXTURE_CUBE_MAP_NEGATIVE_Z],u=0;6>u;u++){h.pixelStorei(h.UNPACK_FLIP_Y_WEBGL,!1),e[u].exposure?h.texImage2D(a[u],0,h.RGBA,e[u].shape[0],e[u].shape[1],0,h.RGBA,h.FLOAT,e[u].data):h.texImage2D(a[u],0,h.RGBA,h.RGBA,h.UNSIGNED_BYTE,e[u]),h.texParameteri(h.TEXTURE_CUBE_MAP,h.TEXTURE_WRAP_S,this.wrapS),h.texParameteri(h.TEXTURE_CUBE_MAP,h.TEXTURE_WRAP_T,this.wrapT),h.texParameteri(h.TEXTURE_CUBE_MAP,h.TEXTURE_MAG_FILTER,this.magFilter),h.texParameteri(h.TEXTURE_CUBE_MAP,h.TEXTURE_MIN_FILTER,this.minFilter);}h.generateMipmap(h.TEXTURE_CUBE_MAP),h.bindTexture(h.TEXTURE_CUBE_MAP,null);}return (0,o.default)(t,[{key:"bind",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?0:arguments[0];l.default.shader&&(h.activeTexture(h.TEXTURE0+t),h.bindTexture(h.TEXTURE_CUBE_MAP,this.texture),h.uniform1i(l.default.shader.uniformTextures[t],t),this._bindIndex=t);}},{key:"unbind",value:function value(){h.bindTexture(h.TEXTURE_CUBE_MAP,null);}}]),t;}();e.default=f,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}function a(t){return 0!==t&&!(t&t-1);}function i(t){var e=t.width||t.videoWidth,n=t.height||t.videoHeight;return e&&n?a(e)&&a(n):!1;}Object.defineProperty(e,"__esModule",{value:!0});var u=n(1),o=r(u),s=n(2),l=r(s),h=n(3),f=r(h),c=void 0,d=function(){function t(e){var n=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],r=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];if((0,o.default)(this,t),c=f.default.gl,n)this.texture=e;else {this._mSource=e,this.texture=c.createTexture(),this._isVideo="VIDEO"===e.tagName,this.magFilter=r.magFilter||c.LINEAR,this.minFilter=r.minFilter||c.LINEAR_MIPMAP_NEAREST,this.wrapS=r.wrapS||c.MIRRORED_REPEAT,this.wrapT=r.wrapT||c.MIRRORED_REPEAT;var a=e.width||e.videoWidth;a?i(e)||(this.wrapS=this.wrapT=c.CLAMP_TO_EDGE,this.minFilter===c.LINEAR_MIPMAP_NEAREST&&(this.minFilter=c.LINEAR)):(this.wrapS=this.wrapT=c.CLAMP_TO_EDGE,this.minFilter===c.LINEAR_MIPMAP_NEAREST&&(this.minFilter=c.LINEAR)),c.bindTexture(c.TEXTURE_2D,this.texture),c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL,!0),e.exposure?c.texImage2D(c.TEXTURE_2D,0,c.RGBA,e.shape[0],e.shape[1],0,c.RGBA,c.FLOAT,e.data):c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,e),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,this.magFilter),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,this.minFilter),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,this.wrapS),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,this.wrapT);var u=f.default.getExtension("EXT_texture_filter_anisotropic");if(u){var s=c.getParameter(u.MAX_TEXTURE_MAX_ANISOTROPY_EXT);c.texParameterf(c.TEXTURE_2D,u.TEXTURE_MAX_ANISOTROPY_EXT,s);}this.minFilter===c.LINEAR_MIPMAP_NEAREST&&c.generateMipmap(c.TEXTURE_2D),c.bindTexture(c.TEXTURE_2D,null);}}return (0,l.default)(t,[{key:"minFilter",value:function value(t){return t!==c.LINEAR&&t!==c.NEAREST&&t!==c.LINEAR_MIPMAP_NEAREST?this:(this.minFilter=t,this);}},{key:"magFilter",value:function value(t){return t!==c.LINEAR&&t!==c.NEAREST&&t!==c.LINEAR_MIPMAP_NEAREST?this:(this.magFilter=t,this);}},{key:"wrapS",value:function value(t){return t!==c.CLAMP_TO_EDGE&&t!==c.REPEAT&&t!==c.MIRRORED_REPEAT?this:(this.wrapS=t,this);}},{key:"wrapT",value:function value(t){return t!==c.CLAMP_TO_EDGE&&t!==c.REPEAT&&t!==c.MIRRORED_REPEAT?this:(this.wrapT=t,this);}},{key:"updateTexture",value:function value(t){t&&(this._mSource=t),c.bindTexture(c.TEXTURE_2D,this.texture),c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL,!0),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,this._mSource),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,this.magFilter),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,this.minFilter),this.minFilter===c.LINEAR_MIPMAP_NEAREST&&c.generateMipmap(c.TEXTURE_2D),c.bindTexture(c.TEXTURE_2D,null);}},{key:"bind",value:function value(t){void 0===t&&(t=0),f.default.shader&&(c.activeTexture(c.TEXTURE0+t),c.bindTexture(c.TEXTURE_2D,this.texture),c.uniform1i(f.default.shader.uniformTextures[t],t),this._bindIndex=t);}}]),t;}(),v=void 0,M=void 0,p=void 0;d.whiteTexture=function(){if(void 0===v){var t=document.createElement("canvas");t.width=t.height=4;var e=t.getContext("2d");e.fillStyle="#fff",e.fillRect(0,0,4,4),v=new d(t);}return v;},d.greyTexture=function(){if(void 0===M){var t=document.createElement("canvas");t.width=t.height=4;var e=t.getContext("2d");e.fillStyle="rgb(127, 127, 127)",e.fillRect(0,0,4,4),M=new d(t);}return M;},d.blackTexture=function(){if(void 0===p){var t=document.createElement("canvas");t.width=t.height=4;var e=t.getContext("2d");e.fillStyle="rgb(127, 127, 127)",e.fillRect(0,0,4,4),p=new d(t);}return p;},e.default=d,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),i=r(a),u=n(1),o=r(u),s=n(2),l=r(s),h=n(6),f=r(h),c=n(5),d=r(c),v=n(30),M=r(v),p=n(8),_=r(p),m=function(t){function e(){(0,o.default)(this,e);var t=(0,f.default)(this,(0,i.default)(e).call(this)),n=_.default.vec3.clone([0,0,5]),r=_.default.vec3.create(),a=_.default.vec3.clone([0,-1,0]);return t.lookAt(n,r,a),t.ortho(1,-1,1,-1),t;}return (0,d.default)(e,t),(0,l.default)(e,[{key:"setBoundary",value:function value(t,e,n,r){this.ortho(t,e,n,r);}},{key:"ortho",value:function value(t,e,n,r){this.left=t,this.right=e,this.top=n,this.bottom=r,_.default.mat4.ortho(this._projection,t,e,n,r,0,1e4);}}]),e;}(M.default);e.default=m,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=r(a),u=n(2),o=r(u),s=n(33),l=r(s),h=n(20),f=r(h),c=n(8),d=r(c),v=function v(t,e){var n=e||{};return t.touches?(n.x=t.touches[0].pageX,n.y=t.touches[0].pageY):(n.x=t.clientX,n.y=t.clientY),n;},M=function(){function t(e){var n=this,r=arguments.length<=1||void 0===arguments[1]?window:arguments[1],a=arguments.length<=2||void 0===arguments[2]?500:arguments[2];(0,i.default)(this,t),this._target=e,this._listenerTarget=r,this._mouse={},this._preMouse={},this.center=d.default.vec3.create(),this._up=d.default.vec3.fromValues(0,1,0),this.radius=new l.default(a),this.position=d.default.vec3.fromValues(0,0,this.radius.value),this.positionOffset=d.default.vec3.create(),this._rx=new l.default(0),this._rx.limit(-Math.PI/2,Math.PI/2),this._ry=new l.default(0),this._preRX=0,this._preRY=0,this._isLockZoom=!1,this._isLockRotation=!1,this._isInvert=!1,this.sensitivity=1,this._listenerTarget.addEventListener("mousewheel",function(t){return n._onWheel(t);}),this._listenerTarget.addEventListener("DOMMouseScroll",function(t){return n._onWheel(t);}),this._listenerTarget.addEventListener("mousedown",function(t){return n._onDown(t);}),this._listenerTarget.addEventListener("touchstart",function(t){return n._onDown(t);}),this._listenerTarget.addEventListener("mousemove",function(t){return n._onMove(t);}),this._listenerTarget.addEventListener("touchmove",function(t){return n._onMove(t);}),window.addEventListener("touchend",function(){return n._onUp();}),window.addEventListener("mouseup",function(){return n._onUp();}),f.default.addEF(function(){return n._loop();});}return (0,o.default)(t,[{key:"lock",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this._isLockZoom=t,this._isLockRotation=t;}},{key:"lockZoom",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this._isLockZoom=t;}},{key:"lockRotation",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this._isLockRotation=t;}},{key:"inverseControl",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this._isInvert=t;}},{key:"_onDown",value:function value(t){this._isLockRotation||(this._isMouseDown=!0,v(t,this._mouse),v(t,this._preMouse),this._preRX=this._rx.targetValue,this._preRY=this._ry.targetValue);}},{key:"_onMove",value:function value(t){if(!this._isLockRotation&&(v(t,this._mouse),t.touches&&t.preventDefault(),this._isMouseDown)){var e=-(this._mouse.x-this._preMouse.x);this._isInvert&&(e*=-1),this._ry.value=this._preRY-.01*e*this.sensitivity;var n=-(this._mouse.y-this._preMouse.y);this._isInvert&&(n*=-1),this._rx.value=this._preRX-.01*n*this.sensitivity;}}},{key:"_onUp",value:function value(){this._isLockRotation||(this._isMouseDown=!1);}},{key:"_onWheel",value:function value(t){if(!this._isLockZoom){var e=t.wheelDelta,n=t.detail,r=0;r=n?e?e/n/40*n>0?1:-1:-n/3:e/120,this.radius.add(2*-r);}}},{key:"_loop",value:function value(){this._updatePosition(),this._target&&this._updateCamera();}},{key:"_updatePosition",value:function value(){this.position[1]=Math.sin(this._rx.value)*this.radius.value;var t=Math.cos(this._rx.value)*this.radius.value;this.position[0]=Math.cos(this._ry.value+.5*Math.PI)*t,this.position[2]=Math.sin(this._ry.value+.5*Math.PI)*t,d.default.vec3.add(this.position,this.position,this.positionOffset);}},{key:"_updateCamera",value:function value(){this._target.lookAt(this.position,this.center,this._up);}},{key:"rx",get:function get(){return this._rx;}},{key:"ry",get:function get(){return this._ry;}}]),t;}();e.default=M,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}e.__esModule=!0;var a=n(98),i=r(a),u=n(97),o=r(u),s="function"==typeof o.default&&"symbol"==_typeof(i.default)?function(t){return typeof t==="undefined"?"undefined":_typeof(t);}:function(t){return t&&"function"==typeof o.default&&t.constructor===o.default?"symbol":typeof t==="undefined"?"undefined":_typeof(t);};e.default="function"==typeof o.default&&"symbol"===s(i.default)?function(t){return "undefined"==typeof t?"undefined":s(t);}:function(t){return t&&"function"==typeof o.default&&t.constructor===o.default?"symbol":"undefined"==typeof t?"undefined":s(t);};},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1);};},function(t,e,n){var r=n(106);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n);};case 2:return function(n,r){return t.call(e,n,r);};case 3:return function(n,r,a){return t.call(e,n,r,a);};}return function(){return t.apply(e,arguments);};};},function(t,e,n){var r=n(25),a=n(10).document,i=r(a)&&r(a.createElement);t.exports=function(t){return i?a.createElement(t):{};};},function(t,e,n){t.exports=!n(13)&&!n(24)(function(){return 7!=Object.defineProperty(n(56)("div"),"a",{get:function get(){return 7;}}).a;});},function(t,e,n){"use strict";var r=n(37),a=n(17),i=n(64),u=n(18),o=n(14),s=n(36),l=n(113),h=n(41),f=n(61),c=n(19)("iterator"),d=!([].keys&&"next" in [].keys()),v="@@iterator",M="keys",p="values",_=function _(){return this;};t.exports=function(t,e,n,m,x,E,I){l(n,e,m);var S,b,g,T=function T(t){if(!d&&t in R)return R[t];switch(t){case M:return function(){return new n(this,t);};case p:return function(){return new n(this,t);};}return function(){return new n(this,t);};},F=e+" Iterator",y=x==p,D=!1,R=t.prototype,w=R[c]||R[v]||x&&R[x],A=w||T(x),P=x?y?T("entries"):A:void 0,O="Array"==e?R.entries||w:w;if(O&&(g=f(O.call(new t())),g!==Object.prototype&&(h(g,F,!0),r||o(g,c)||u(g,c,_))),y&&w&&w.name!==p&&(D=!0,A=function A(){return w.call(this);}),r&&!I||!d&&!D&&R[c]||u(R,c,A),s[e]=A,s[F]=_,x)if(S={values:y?A:T(p),keys:E?A:T(M),entries:P},I)for(b in S){b in R||i(R,b,S[b]);}else a(a.P+a.F*(d||D),e,S);return S;};},function(t,e,n){var r=n(62),a=n(35).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,a);};},function(t,e){e.f=Object.getOwnPropertySymbols;},function(t,e,n){var r=n(14),a=n(65),i=n(42)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=a(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null;};},function(t,e,n){var r=n(14),a=n(11),i=n(108)(!1),u=n(42)("IE_PROTO");t.exports=function(t,e){var n,o=a(t),s=0,l=[];for(n in o){n!=u&&r(o,n)&&l.push(n);}for(;e.length>s;){r(o,n=e[s++])&&(~i(l,n)||l.push(n));}return l;};},function(t,e,n){var r=n(17),a=n(7),i=n(24);t.exports=function(t,e){var n=(a.Object||{})[t]||Object[t],u={};u[t]=e(n),r(r.S+r.F*i(function(){n(1);}),"Object",u);};},function(t,e,n){t.exports=n(18);},function(t,e,n){var r=n(34);t.exports=function(t){return Object(r(t));};},function(t,e,n){var r=n(9),a={};a.create=function(){var t=new r.ARRAY_TYPE(9);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t;},a.fromMat4=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[4],t[4]=e[5],t[5]=e[6],t[6]=e[8],t[7]=e[9],t[8]=e[10],t;},a.clone=function(t){var e=new r.ARRAY_TYPE(9);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e;},a.copy=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t;},a.fromValues=function(t,e,n,a,i,u,o,s,l){var h=new r.ARRAY_TYPE(9);return h[0]=t,h[1]=e,h[2]=n,h[3]=a,h[4]=i,h[5]=u,h[6]=o,h[7]=s,h[8]=l,h;},a.set=function(t,e,n,r,a,i,u,o,s,l){return t[0]=e,t[1]=n,t[2]=r,t[3]=a,t[4]=i,t[5]=u,t[6]=o,t[7]=s,t[8]=l,t;},a.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t;},a.transpose=function(t,e){if(t===e){var n=e[1],r=e[2],a=e[5];t[1]=e[3],t[2]=e[6],t[3]=n,t[5]=e[7],t[6]=r,t[7]=a;}else t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8];return t;},a.invert=function(t,e){var n=e[0],r=e[1],a=e[2],i=e[3],u=e[4],o=e[5],s=e[6],l=e[7],h=e[8],f=h*u-o*l,c=-h*i+o*s,d=l*i-u*s,v=n*f+r*c+a*d;return v?(v=1/v,t[0]=f*v,t[1]=(-h*r+a*l)*v,t[2]=(o*r-a*u)*v,t[3]=c*v,t[4]=(h*n-a*s)*v,t[5]=(-o*n+a*i)*v,t[6]=d*v,t[7]=(-l*n+r*s)*v,t[8]=(u*n-r*i)*v,t):null;},a.adjoint=function(t,e){var n=e[0],r=e[1],a=e[2],i=e[3],u=e[4],o=e[5],s=e[6],l=e[7],h=e[8];return t[0]=u*h-o*l,t[1]=a*l-r*h,t[2]=r*o-a*u,t[3]=o*s-i*h,t[4]=n*h-a*s,t[5]=a*i-n*o,t[6]=i*l-u*s,t[7]=r*s-n*l,t[8]=n*u-r*i,t;},a.determinant=function(t){var e=t[0],n=t[1],r=t[2],a=t[3],i=t[4],u=t[5],o=t[6],s=t[7],l=t[8];return e*(l*i-u*s)+n*(-l*a+u*o)+r*(s*a-i*o);},a.multiply=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=e[3],o=e[4],s=e[5],l=e[6],h=e[7],f=e[8],c=n[0],d=n[1],v=n[2],M=n[3],p=n[4],_=n[5],m=n[6],x=n[7],E=n[8];return t[0]=c*r+d*u+v*l,t[1]=c*a+d*o+v*h,t[2]=c*i+d*s+v*f,t[3]=M*r+p*u+_*l,t[4]=M*a+p*o+_*h,t[5]=M*i+p*s+_*f,t[6]=m*r+x*u+E*l,t[7]=m*a+x*o+E*h,t[8]=m*i+x*s+E*f,t;},a.mul=a.multiply,a.translate=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=e[3],o=e[4],s=e[5],l=e[6],h=e[7],f=e[8],c=n[0],d=n[1];return t[0]=r,t[1]=a,t[2]=i,t[3]=u,t[4]=o,t[5]=s,t[6]=c*r+d*u+l,t[7]=c*a+d*o+h,t[8]=c*i+d*s+f,t;},a.rotate=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=e[3],o=e[4],s=e[5],l=e[6],h=e[7],f=e[8],c=Math.sin(n),d=Math.cos(n);return t[0]=d*r+c*u,t[1]=d*a+c*o,t[2]=d*i+c*s,t[3]=d*u-c*r,t[4]=d*o-c*a,t[5]=d*s-c*i,t[6]=l,t[7]=h,t[8]=f,t;},a.scale=function(t,e,n){var r=n[0],a=n[1];return t[0]=r*e[0],t[1]=r*e[1],t[2]=r*e[2],t[3]=a*e[3],t[4]=a*e[4],t[5]=a*e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t;},a.fromTranslation=function(t,e){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=e[0],t[7]=e[1],t[8]=1,t;},a.fromRotation=function(t,e){var n=Math.sin(e),r=Math.cos(e);return t[0]=r,t[1]=n,t[2]=0,t[3]=-n,t[4]=r,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t;},a.fromScaling=function(t,e){return t[0]=e[0],t[1]=0,t[2]=0,t[3]=0,t[4]=e[1],t[5]=0,t[6]=0,t[7]=0,t[8]=1,t;},a.fromMat2d=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=0,t[3]=e[2],t[4]=e[3],t[5]=0,t[6]=e[4],t[7]=e[5],t[8]=1,t;},a.fromQuat=function(t,e){var n=e[0],r=e[1],a=e[2],i=e[3],u=n+n,o=r+r,s=a+a,l=n*u,h=r*u,f=r*o,c=a*u,d=a*o,v=a*s,M=i*u,p=i*o,_=i*s;return t[0]=1-f-v,t[3]=h-_,t[6]=c+p,t[1]=h+_,t[4]=1-l-v,t[7]=d-M,t[2]=c-p,t[5]=d+M,t[8]=1-l-f,t;},a.normalFromMat4=function(t,e){var n=e[0],r=e[1],a=e[2],i=e[3],u=e[4],o=e[5],s=e[6],l=e[7],h=e[8],f=e[9],c=e[10],d=e[11],v=e[12],M=e[13],p=e[14],_=e[15],m=n*o-r*u,x=n*s-a*u,E=n*l-i*u,I=r*s-a*o,S=r*l-i*o,b=a*l-i*s,g=h*M-f*v,T=h*p-c*v,F=h*_-d*v,y=f*p-c*M,D=f*_-d*M,R=c*_-d*p,w=m*R-x*D+E*y+I*F-S*T+b*g;return w?(w=1/w,t[0]=(o*R-s*D+l*y)*w,t[1]=(s*F-u*R-l*T)*w,t[2]=(u*D-o*F+l*g)*w,t[3]=(a*D-r*R-i*y)*w,t[4]=(n*R-a*F+i*T)*w,t[5]=(r*F-n*D-i*g)*w,t[6]=(M*b-p*S+_*I)*w,t[7]=(p*E-v*b-_*x)*w,t[8]=(v*S-M*E+_*m)*w,t):null;},a.str=function(t){return "mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")";},a.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2));},a.add=function(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t[2]=e[2]+n[2],t[3]=e[3]+n[3],t[4]=e[4]+n[4],t[5]=e[5]+n[5],t[6]=e[6]+n[6],t[7]=e[7]+n[7],t[8]=e[8]+n[8],t;},a.subtract=function(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t[2]=e[2]-n[2],t[3]=e[3]-n[3],t[4]=e[4]-n[4],t[5]=e[5]-n[5],t[6]=e[6]-n[6],t[7]=e[7]-n[7],t[8]=e[8]-n[8],t;},a.sub=a.subtract,a.multiplyScalar=function(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t[3]=e[3]*n,t[4]=e[4]*n,t[5]=e[5]*n,t[6]=e[6]*n,t[7]=e[7]*n,t[8]=e[8]*n,t;},a.multiplyScalarAndAdd=function(t,e,n,r){return t[0]=e[0]+n[0]*r,t[1]=e[1]+n[1]*r,t[2]=e[2]+n[2]*r,t[3]=e[3]+n[3]*r,t[4]=e[4]+n[4]*r,t[5]=e[5]+n[5]*r,t[6]=e[6]+n[6]*r,t[7]=e[7]+n[7]*r,t[8]=e[8]+n[8]*r,t;},a.exactEquals=function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]&&t[3]===e[3]&&t[4]===e[4]&&t[5]===e[5]&&t[6]===e[6]&&t[7]===e[7]&&t[8]===e[8];},a.equals=function(t,e){var n=t[0],a=t[1],i=t[2],u=t[3],o=t[4],s=t[5],l=t[6],h=t[7],f=t[8],c=e[0],d=e[1],v=e[2],M=e[3],p=e[4],_=e[5],m=t[6],x=e[7],E=e[8];return Math.abs(n-c)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(c))&&Math.abs(a-d)<=r.EPSILON*Math.max(1,Math.abs(a),Math.abs(d))&&Math.abs(i-v)<=r.EPSILON*Math.max(1,Math.abs(i),Math.abs(v))&&Math.abs(u-M)<=r.EPSILON*Math.max(1,Math.abs(u),Math.abs(M))&&Math.abs(o-p)<=r.EPSILON*Math.max(1,Math.abs(o),Math.abs(p))&&Math.abs(s-_)<=r.EPSILON*Math.max(1,Math.abs(s),Math.abs(_))&&Math.abs(l-m)<=r.EPSILON*Math.max(1,Math.abs(l),Math.abs(m))&&Math.abs(h-x)<=r.EPSILON*Math.max(1,Math.abs(h),Math.abs(x))&&Math.abs(f-E)<=r.EPSILON*Math.max(1,Math.abs(f),Math.abs(E));},t.exports=a;},function(t,e,n){var r=n(9),a={};a.create=function(){var t=new r.ARRAY_TYPE(3);return t[0]=0,t[1]=0,t[2]=0,t;},a.clone=function(t){var e=new r.ARRAY_TYPE(3);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e;},a.fromValues=function(t,e,n){var a=new r.ARRAY_TYPE(3);return a[0]=t,a[1]=e,a[2]=n,a;},a.copy=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t;},a.set=function(t,e,n,r){return t[0]=e,t[1]=n,t[2]=r,t;},a.add=function(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t[2]=e[2]+n[2],t;},a.subtract=function(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t[2]=e[2]-n[2],t;},a.sub=a.subtract,a.multiply=function(t,e,n){return t[0]=e[0]*n[0],t[1]=e[1]*n[1],t[2]=e[2]*n[2],t;},a.mul=a.multiply,a.divide=function(t,e,n){return t[0]=e[0]/n[0],t[1]=e[1]/n[1],t[2]=e[2]/n[2],t;},a.div=a.divide,a.ceil=function(t,e){return t[0]=Math.ceil(e[0]),t[1]=Math.ceil(e[1]),t[2]=Math.ceil(e[2]),t;},a.floor=function(t,e){return t[0]=Math.floor(e[0]),t[1]=Math.floor(e[1]),t[2]=Math.floor(e[2]),t;},a.min=function(t,e,n){return t[0]=Math.min(e[0],n[0]),t[1]=Math.min(e[1],n[1]),t[2]=Math.min(e[2],n[2]),t;},a.max=function(t,e,n){return t[0]=Math.max(e[0],n[0]),t[1]=Math.max(e[1],n[1]),t[2]=Math.max(e[2],n[2]),t;},a.round=function(t,e){return t[0]=Math.round(e[0]),t[1]=Math.round(e[1]),t[2]=Math.round(e[2]),t;},a.scale=function(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t;},a.scaleAndAdd=function(t,e,n,r){return t[0]=e[0]+n[0]*r,t[1]=e[1]+n[1]*r,t[2]=e[2]+n[2]*r,t;},a.distance=function(t,e){var n=e[0]-t[0],r=e[1]-t[1],a=e[2]-t[2];return Math.sqrt(n*n+r*r+a*a);},a.dist=a.distance,a.squaredDistance=function(t,e){var n=e[0]-t[0],r=e[1]-t[1],a=e[2]-t[2];return n*n+r*r+a*a;},a.sqrDist=a.squaredDistance,a.length=function(t){var e=t[0],n=t[1],r=t[2];return Math.sqrt(e*e+n*n+r*r);},a.len=a.length,a.squaredLength=function(t){var e=t[0],n=t[1],r=t[2];return e*e+n*n+r*r;},a.sqrLen=a.squaredLength,a.negate=function(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t;},a.inverse=function(t,e){return t[0]=1/e[0],t[1]=1/e[1],t[2]=1/e[2],t;},a.normalize=function(t,e){var n=e[0],r=e[1],a=e[2],i=n*n+r*r+a*a;return i>0&&(i=1/Math.sqrt(i),t[0]=e[0]*i,t[1]=e[1]*i,t[2]=e[2]*i),t;},a.dot=function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2];},a.cross=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=n[0],o=n[1],s=n[2];return t[0]=a*s-i*o,t[1]=i*u-r*s,t[2]=r*o-a*u,t;},a.lerp=function(t,e,n,r){var a=e[0],i=e[1],u=e[2];return t[0]=a+r*(n[0]-a),t[1]=i+r*(n[1]-i),t[2]=u+r*(n[2]-u),t;},a.hermite=function(t,e,n,r,a,i){var u=i*i,o=u*(2*i-3)+1,s=u*(i-2)+i,l=u*(i-1),h=u*(3-2*i);return t[0]=e[0]*o+n[0]*s+r[0]*l+a[0]*h,t[1]=e[1]*o+n[1]*s+r[1]*l+a[1]*h,t[2]=e[2]*o+n[2]*s+r[2]*l+a[2]*h,t;},a.bezier=function(t,e,n,r,a,i){var u=1-i,o=u*u,s=i*i,l=o*u,h=3*i*o,f=3*s*u,c=s*i;return t[0]=e[0]*l+n[0]*h+r[0]*f+a[0]*c,t[1]=e[1]*l+n[1]*h+r[1]*f+a[1]*c,t[2]=e[2]*l+n[2]*h+r[2]*f+a[2]*c,t;},a.random=function(t,e){e=e||1;var n=2*r.RANDOM()*Math.PI,a=2*r.RANDOM()-1,i=Math.sqrt(1-a*a)*e;return t[0]=Math.cos(n)*i,t[1]=Math.sin(n)*i,t[2]=a*e,t;},a.transformMat4=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=n[3]*r+n[7]*a+n[11]*i+n[15];return u=u||1,t[0]=(n[0]*r+n[4]*a+n[8]*i+n[12])/u,t[1]=(n[1]*r+n[5]*a+n[9]*i+n[13])/u,t[2]=(n[2]*r+n[6]*a+n[10]*i+n[14])/u,t;},a.transformMat3=function(t,e,n){var r=e[0],a=e[1],i=e[2];return t[0]=r*n[0]+a*n[3]+i*n[6],t[1]=r*n[1]+a*n[4]+i*n[7],t[2]=r*n[2]+a*n[5]+i*n[8],t;},a.transformQuat=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=n[0],o=n[1],s=n[2],l=n[3],h=l*r+o*i-s*a,f=l*a+s*r-u*i,c=l*i+u*a-o*r,d=-u*r-o*a-s*i;return t[0]=h*l+d*-u+f*-s-c*-o,t[1]=f*l+d*-o+c*-u-h*-s,t[2]=c*l+d*-s+h*-o-f*-u,t;},a.rotateX=function(t,e,n,r){var a=[],i=[];return a[0]=e[0]-n[0],a[1]=e[1]-n[1],a[2]=e[2]-n[2],i[0]=a[0],i[1]=a[1]*Math.cos(r)-a[2]*Math.sin(r),i[2]=a[1]*Math.sin(r)+a[2]*Math.cos(r),t[0]=i[0]+n[0],t[1]=i[1]+n[1],t[2]=i[2]+n[2],t;},a.rotateY=function(t,e,n,r){var a=[],i=[];return a[0]=e[0]-n[0],a[1]=e[1]-n[1],a[2]=e[2]-n[2],i[0]=a[2]*Math.sin(r)+a[0]*Math.cos(r),i[1]=a[1],i[2]=a[2]*Math.cos(r)-a[0]*Math.sin(r),t[0]=i[0]+n[0],t[1]=i[1]+n[1],t[2]=i[2]+n[2],t;},a.rotateZ=function(t,e,n,r){var a=[],i=[];return a[0]=e[0]-n[0],a[1]=e[1]-n[1],a[2]=e[2]-n[2],i[0]=a[0]*Math.cos(r)-a[1]*Math.sin(r),i[1]=a[0]*Math.sin(r)+a[1]*Math.cos(r),i[2]=a[2],t[0]=i[0]+n[0],t[1]=i[1]+n[1],t[2]=i[2]+n[2],t;},a.forEach=function(){var t=a.create();return function(e,n,r,a,i,u){var o,s;for(n||(n=3),r||(r=0),s=a?Math.min(a*n+r,e.length):e.length,o=r;s>o;o+=n){t[0]=e[o],t[1]=e[o+1],t[2]=e[o+2],i(t,t,u),e[o]=t[0],e[o+1]=t[1],e[o+2]=t[2];}return e;};}(),a.angle=function(t,e){var n=a.fromValues(t[0],t[1],t[2]),r=a.fromValues(e[0],e[1],e[2]);a.normalize(n,n),a.normalize(r,r);var i=a.dot(n,r);return i>1?0:Math.acos(i);},a.str=function(t){return "vec3("+t[0]+", "+t[1]+", "+t[2]+")";},a.exactEquals=function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2];},a.equals=function(t,e){var n=t[0],a=t[1],i=t[2],u=e[0],o=e[1],s=e[2];return Math.abs(n-u)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(u))&&Math.abs(a-o)<=r.EPSILON*Math.max(1,Math.abs(a),Math.abs(o))&&Math.abs(i-s)<=r.EPSILON*Math.max(1,Math.abs(i),Math.abs(s));},t.exports=a;},function(t,e,n){var r=n(9),a={};a.create=function(){var t=new r.ARRAY_TYPE(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t;},a.clone=function(t){var e=new r.ARRAY_TYPE(4);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e;},a.fromValues=function(t,e,n,a){var i=new r.ARRAY_TYPE(4);return i[0]=t,i[1]=e,i[2]=n,i[3]=a,i;},a.copy=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t;},a.set=function(t,e,n,r,a){return t[0]=e,t[1]=n,t[2]=r,t[3]=a,t;},a.add=function(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t[2]=e[2]+n[2],t[3]=e[3]+n[3],t;},a.subtract=function(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t[2]=e[2]-n[2],t[3]=e[3]-n[3],t;},a.sub=a.subtract,a.multiply=function(t,e,n){return t[0]=e[0]*n[0],t[1]=e[1]*n[1],t[2]=e[2]*n[2],t[3]=e[3]*n[3],t;},a.mul=a.multiply,a.divide=function(t,e,n){return t[0]=e[0]/n[0],t[1]=e[1]/n[1],t[2]=e[2]/n[2],t[3]=e[3]/n[3],t;},a.div=a.divide,a.ceil=function(t,e){return t[0]=Math.ceil(e[0]),t[1]=Math.ceil(e[1]),t[2]=Math.ceil(e[2]),t[3]=Math.ceil(e[3]),t;},a.floor=function(t,e){return t[0]=Math.floor(e[0]),t[1]=Math.floor(e[1]),t[2]=Math.floor(e[2]),t[3]=Math.floor(e[3]),t;},a.min=function(t,e,n){return t[0]=Math.min(e[0],n[0]),t[1]=Math.min(e[1],n[1]),t[2]=Math.min(e[2],n[2]),t[3]=Math.min(e[3],n[3]),t;},a.max=function(t,e,n){return t[0]=Math.max(e[0],n[0]),t[1]=Math.max(e[1],n[1]),t[2]=Math.max(e[2],n[2]),t[3]=Math.max(e[3],n[3]),t;},a.round=function(t,e){return t[0]=Math.round(e[0]),t[1]=Math.round(e[1]),t[2]=Math.round(e[2]),t[3]=Math.round(e[3]),t;},a.scale=function(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t[3]=e[3]*n,t;},a.scaleAndAdd=function(t,e,n,r){return t[0]=e[0]+n[0]*r,t[1]=e[1]+n[1]*r,t[2]=e[2]+n[2]*r,t[3]=e[3]+n[3]*r,t;},a.distance=function(t,e){var n=e[0]-t[0],r=e[1]-t[1],a=e[2]-t[2],i=e[3]-t[3];return Math.sqrt(n*n+r*r+a*a+i*i);},a.dist=a.distance,a.squaredDistance=function(t,e){var n=e[0]-t[0],r=e[1]-t[1],a=e[2]-t[2],i=e[3]-t[3];return n*n+r*r+a*a+i*i;},a.sqrDist=a.squaredDistance,a.length=function(t){var e=t[0],n=t[1],r=t[2],a=t[3];return Math.sqrt(e*e+n*n+r*r+a*a);},a.len=a.length,a.squaredLength=function(t){var e=t[0],n=t[1],r=t[2],a=t[3];return e*e+n*n+r*r+a*a;},a.sqrLen=a.squaredLength,a.negate=function(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=-e[3],t;},a.inverse=function(t,e){return t[0]=1/e[0],t[1]=1/e[1],t[2]=1/e[2],t[3]=1/e[3],t;},a.normalize=function(t,e){var n=e[0],r=e[1],a=e[2],i=e[3],u=n*n+r*r+a*a+i*i;return u>0&&(u=1/Math.sqrt(u),t[0]=n*u,t[1]=r*u,t[2]=a*u,t[3]=i*u),t;},a.dot=function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3];},a.lerp=function(t,e,n,r){var a=e[0],i=e[1],u=e[2],o=e[3];return t[0]=a+r*(n[0]-a),t[1]=i+r*(n[1]-i),t[2]=u+r*(n[2]-u),t[3]=o+r*(n[3]-o),t;},a.random=function(t,e){return e=e||1,t[0]=r.RANDOM(),t[1]=r.RANDOM(),t[2]=r.RANDOM(),t[3]=r.RANDOM(),a.normalize(t,t),a.scale(t,t,e),t;},a.transformMat4=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=e[3];return t[0]=n[0]*r+n[4]*a+n[8]*i+n[12]*u,t[1]=n[1]*r+n[5]*a+n[9]*i+n[13]*u,t[2]=n[2]*r+n[6]*a+n[10]*i+n[14]*u,t[3]=n[3]*r+n[7]*a+n[11]*i+n[15]*u,t;},a.transformQuat=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=n[0],o=n[1],s=n[2],l=n[3],h=l*r+o*i-s*a,f=l*a+s*r-u*i,c=l*i+u*a-o*r,d=-u*r-o*a-s*i;return t[0]=h*l+d*-u+f*-s-c*-o,t[1]=f*l+d*-o+c*-u-h*-s,t[2]=c*l+d*-s+h*-o-f*-u,t[3]=e[3],t;},a.forEach=function(){var t=a.create();return function(e,n,r,a,i,u){var o,s;for(n||(n=4),r||(r=0),s=a?Math.min(a*n+r,e.length):e.length,o=r;s>o;o+=n){t[0]=e[o],t[1]=e[o+1],t[2]=e[o+2],t[3]=e[o+3],i(t,t,u),e[o]=t[0],e[o+1]=t[1],e[o+2]=t[2],e[o+3]=t[3];}return e;};}(),a.str=function(t){return "vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")";},a.exactEquals=function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]&&t[3]===e[3];},a.equals=function(t,e){var n=t[0],a=t[1],i=t[2],u=t[3],o=e[0],s=e[1],l=e[2],h=e[3];return Math.abs(n-o)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(o))&&Math.abs(a-s)<=r.EPSILON*Math.max(1,Math.abs(a),Math.abs(s))&&Math.abs(i-l)<=r.EPSILON*Math.max(1,Math.abs(i),Math.abs(l))&&Math.abs(u-h)<=r.EPSILON*Math.max(1,Math.abs(u),Math.abs(h));},t.exports=a;},function(t,e){t.exports="// basic.vert\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\n#define GLSLIFY 1\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec3 aNormal;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\n\nvoid main(void) {\n    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n    vTextureCoord = aTextureCoord;\n    vNormal = aNormal;\n}";},function(t,e){t.exports="// bigTriangle.vert\n\n#define SHADER_NAME BIG_TRIANGLE_VERTEX\n\nprecision highp float;\n#define GLSLIFY 1\nattribute vec2 aPosition;\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = vec4(aPosition, 0.0, 1.0);\n    vTextureCoord = aPosition * .5 + .5;\n}";},function(t,e){t.exports="// copy.frag\n\n#define SHADER_NAME COPY_FRAGMENT\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = texture2D(texture, vTextureCoord);\n}";},function(t,e){t.exports="// generalWithNormal.vert\n\n#define SHADER_NAME GENERAL_VERTEX\n\nprecision highp float;\n#define GLSLIFY 1\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec3 aNormal;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat3 uNormalMatrix;\n\nuniform vec3 position;\nuniform vec3 scale;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\n\nvoid main(void) {\n	vec3 pos      = aVertexPosition * scale;\n	pos           += position;\n	gl_Position   = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(pos, 1.0);\n	\n	vTextureCoord = aTextureCoord;\n	vNormal       = normalize(uNormalMatrix * aNormal);\n}";},function(t,e){t.exports="// basic.frag\n\n#define SHADER_NAME SKYBOX_FRAGMENT\n\nprecision highp float;\n#define GLSLIFY 1\nuniform samplerCube texture;\nvarying vec2 vTextureCoord;\nvarying vec3 vVertex;\n\nvoid main(void) {\n    gl_FragColor = textureCube(texture, vVertex);\n}";},function(t,e){t.exports="// basic.vert\n\n#define SHADER_NAME SKYBOX_VERTEX\n\nprecision highp float;\n#define GLSLIFY 1\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec3 aNormal;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vVertex;\nvarying vec3 vNormal;\n\nvoid main(void) {\n	gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n	vTextureCoord = aTextureCoord;\n	\n	vVertex = aVertexPosition;\n	vNormal = aNormal;\n}";},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=r(a),u=n(2),o=r(u),s=n(8),l=r(s),h=n(3),f=r(h),c=n(12),d=r(c),v=n(50),M=r(v),p=n(49),_=r(p),m=n(21),x=r(m),E=n(26),I=r(E),S=n(16),b=r(S),g=n(77),T=r(g),F=n(76),y=r(F),D=n(20),R=r(D),w=n(88),A=r(w),P=n(33),O=r(P),L=n(92),k=r(L),N=n(52),U=r(N),C=n(90),z=r(C),V=n(30),B=r(V),X=n(51),j=r(X),Y=n(31),q=r(Y),G=n(78),H=r(G),W=n(32),Z=r(W),Q=n(87),K=r(Q),J=n(86),$=r(J),tt=n(81),et=r(tt),nt=n(79),rt=r(nt),at=n(80),it=r(at),ut=n(82),ot=r(ut),st=n(83),lt=r(st),ht=n(84),ft=r(ht),ct=n(85),dt=r(ct),vt=n(91),Mt=r(vt),pt="0.1.1",_t=function(){function t(){(0,i.default)(this,t),this.glm=l.default,this.GL=f.default,this.GLTool=f.default,this.GLShader=d.default,this.GLTexture=M.default,this.GLCubeTexture=_.default,this.Mesh=x.default,this.Geom=I.default,this.Batch=b.default,this.FrameBuffer=T.default,this.CubeFrameBuffer=y.default,this.Scheduler=R.default,this.EventDispatcher=A.default,this.EaseNumber=O.default,this.TweenNumber=k.default,this.Camera=B.default,this.CameraOrtho=j.default,this.CameraPerspective=q.default,this.CameraCube=H.default,this.OrbitalControl=U.default,this.QuatRotation=z.default,this.BinaryLoader=Z.default,this.ObjLoader=K.default,this.HDRLoader=$.default,this.BatchCopy=et.default,this.BatchAxis=rt.default,this.BatchBall=it.default,this.BatchBall=it.default,this.BatchSkybox=lt.default,this.BatchDotsPlane=ot.default,this.Scene=ft.default,this.View=dt.default,this.ShaderLibs=Mt.default;for(var e in l.default){l.default[e]&&(window[e]=l.default[e]);}}return (0,o.default)(t,[{key:"log",value:function value(){navigator.userAgent.indexOf("Chrome")>-1?console.log("%clib alfrid : VERSION "+pt,"background: #193441; color: #FCFFF5"):console.log("lib alfrid : VERSION ",pt),console.log("%cClasses : ","color: #193441");for(var t in this){this[t]&&console.log("%c - "+t,"color: #3E606F");}}}]),t;}(),mt=new _t();e.default=mt,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=r(a),u=n(2),o=r(u),s=n(3),l=r(s),h=n(49),f=r(h),c=void 0,d=function(){function t(e){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];(0,i.default)(this,t),c=l.default.gl,this._size=e,this.magFilter=n.magFilter||c.LINEAR,this.minFilter=n.minFilter||c.LINEAR,this.wrapS=n.wrapS||c.CLAMP_TO_EDGE,this.wrapT=n.wrapT||c.CLAMP_TO_EDGE,this._init();}return (0,o.default)(t,[{key:"_init",value:function value(){this.texture=c.createTexture(),this.glTexture=new f.default(this.texture,{},!0),c.bindTexture(c.TEXTURE_CUBE_MAP,this.texture),c.texParameteri(c.TEXTURE_CUBE_MAP,c.TEXTURE_MAG_FILTER,this.magFilter),c.texParameteri(c.TEXTURE_CUBE_MAP,c.TEXTURE_MIN_FILTER,this.minFilter),c.texParameteri(c.TEXTURE_CUBE_MAP,c.TEXTURE_WRAP_S,this.wrapS),c.texParameteri(c.TEXTURE_CUBE_MAP,c.TEXTURE_WRAP_T,this.wrapT);for(var t=[c.TEXTURE_CUBE_MAP_POSITIVE_X,c.TEXTURE_CUBE_MAP_NEGATIVE_X,c.TEXTURE_CUBE_MAP_POSITIVE_Y,c.TEXTURE_CUBE_MAP_NEGATIVE_Y,c.TEXTURE_CUBE_MAP_POSITIVE_Z,c.TEXTURE_CUBE_MAP_NEGATIVE_Z],e=0;e<t.length;e++){c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL,!1),c.texImage2D(t[e],0,c.RGBA,this.width,this.height,0,c.RGBA,c.FLOAT,null);}this._frameBuffers=[];for(var n=0;n<t.length;n++){var r=c.createFramebuffer();c.bindFramebuffer(c.FRAMEBUFFER,r),c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,t[n],this.texture,0);var a=c.checkFramebufferStatus(c.FRAMEBUFFER);a!==c.FRAMEBUFFER_COMPLETE&&console.log("'gl.checkFramebufferStatus() returned '"+a),this._frameBuffers.push(r);}c.bindFramebuffer(c.FRAMEBUFFER,null),c.bindRenderbuffer(c.RENDERBUFFER,null),c.bindTexture(c.TEXTURE_CUBE_MAP,null);}},{key:"bind",value:function value(t){l.default.viewport(0,0,this.width,this.height),c.bindFramebuffer(c.FRAMEBUFFER,this._frameBuffers[t]);}},{key:"unbind",value:function value(){c.bindFramebuffer(c.FRAMEBUFFER,null),l.default.viewport(0,0,l.default.width,l.default.height);}},{key:"getTexture",value:function value(){return this.glTexture;}},{key:"width",get:function get(){return this._size;}},{key:"height",get:function get(){return this._size;}}]),t;}();e.default=d,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}function a(t){return 0!==t&&!(t&t-1);}Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),u=r(i),o=n(2),s=r(o),l=n(3),h=r(l),f=n(50),c=r(f),d=void 0,v=void 0,M=function(){function t(e,n){var r=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];(0,u.default)(this,t),d=h.default.gl,v=h.default.checkExtension("WEBGL_depth_texture"),this.width=e,this.height=n,this.magFilter=r.magFilter||d.LINEAR,this.minFilter=r.minFilter||d.LINEAR,this.wrapS=r.wrapS||d.CLAMP_TO_EDGE,this.wrapT=r.wrapT||d.CLAMP_TO_EDGE,this.useDepth=r.useDepth||!0,this.useStencil=r.useStencil||!1,a(this.width)&&a(this.height)||(this.wrapS=this.wrapT=d.CLAMP_TO_EDGE,this.minFilter===d.LINEAR_MIPMAP_NEAREST&&(this.minFilter=d.LINEAR)),this._init();}return (0,s.default)(t,[{key:"_init",value:function value(){this.texture=d.createTexture(),this.glTexture=new c.default(this.texture,!0),this.depthTexture=d.createTexture(),this.glDepthTexture=new c.default(this.depthTexture,!0),this.frameBuffer=d.createFramebuffer(),d.bindFramebuffer(d.FRAMEBUFFER,this.frameBuffer),d.bindTexture(d.TEXTURE_2D,this.texture),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MAG_FILTER,this.magFilter),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MIN_FILTER,this.minFilter),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_S,this.wrapS),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_T,this.wrapT),d.texImage2D(d.TEXTURE_2D,0,d.RGBA,this.width,this.height,0,d.RGBA,h.default.isMobile?d.UNSIGNED_BYTE:d.FLOAT,null),v&&(d.bindTexture(d.TEXTURE_2D,this.depthTexture),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MAG_FILTER,this.magFilter),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MIN_FILTER,this.minFilter),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_S,this.wrapS),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_T,this.wrapT),d.texImage2D(d.TEXTURE_2D,0,d.DEPTH_COMPONENT,this.width,this.height,0,d.DEPTH_COMPONENT,d.UNSIGNED_SHORT,null)),d.framebufferTexture2D(d.FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,this.texture,0),d.framebufferTexture2D(d.FRAMEBUFFER,d.DEPTH_ATTACHMENT,d.TEXTURE_2D,this.depthTexture,0),this.minFilter===d.LINEAR_MIPMAP_NEAREST&&(d.bindTexture(d.TEXTURE_2D,this.texture),d.generateMipmap(d.TEXTURE_2D)),d.bindTexture(d.TEXTURE_2D,null),d.bindRenderbuffer(d.RENDERBUFFER,null),d.bindFramebuffer(d.FRAMEBUFFER,null),this.clear();}},{key:"bind",value:function value(){h.default.viewport(0,0,this.width,this.height),d.bindFramebuffer(d.FRAMEBUFFER,this.frameBuffer);}},{key:"unbind",value:function value(){d.bindFramebuffer(d.FRAMEBUFFER,null),h.default.viewport(0,0,h.default.width,h.default.height);}},{key:"clear",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?0:arguments[0],e=arguments.length<=1||void 0===arguments[1]?0:arguments[1],n=arguments.length<=2||void 0===arguments[2]?0:arguments[2],r=arguments.length<=3||void 0===arguments[3]?0:arguments[3];this.bind(),h.default.clear(t,e,n,r),this.unbind();}},{key:"getTexture",value:function value(){return this.glTexture;}},{key:"getDepthTexture",value:function value(){return this.glDepthTexture;}},{key:"minFilter",value:function value(t){return t!==d.LINEAR&&t!==d.NEAREST&&t!==d.LINEAR_MIPMAP_NEAREST?this:(this.minFilter=t,this);}},{key:"magFilter",value:function value(t){return t!==d.LINEAR&&t!==d.NEAREST&&t!==d.LINEAR_MIPMAP_NEAREST?this:(this.magFilter=t,this);}},{key:"wrapS",value:function value(t){return t!==d.CLAMP_TO_EDGE&&t!==d.REPEAT&&t!==d.MIRRORED_REPEAT?this:(this.wrapS=t,this);}},{key:"wrapT",value:function value(t){return t!==d.CLAMP_TO_EDGE&&t!==d.REPEAT&&t!==d.MIRRORED_REPEAT?this:(this.wrapT=t,this);}}]),t;}();e.default=M,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),i=r(a),u=n(1),o=r(u),s=n(2),l=r(s),h=n(6),f=r(h),c=n(5),d=r(c),v=n(31),M=r(v),p=n(8),_=r(p),m=_.default.vec3,x=[[m.fromValues(0,0,0),m.fromValues(1,0,0),m.fromValues(0,-1,0)],[m.fromValues(0,0,0),m.fromValues(-1,0,0),m.fromValues(0,-1,0)],[m.fromValues(0,0,0),m.fromValues(0,1,0),m.fromValues(0,0,1)],[m.fromValues(0,0,0),m.fromValues(0,-1,0),m.fromValues(0,0,-1)],[m.fromValues(0,0,0),m.fromValues(0,0,1),m.fromValues(0,-1,0)],[m.fromValues(0,0,0),m.fromValues(0,0,-1),m.fromValues(0,-1,0)]],E=function(t){function e(){(0,o.default)(this,e);var t=(0,f.default)(this,(0,i.default)(e).call(this));return t.setPerspective(Math.PI/2,1,.1,1e3),t;}return (0,d.default)(e,t),(0,l.default)(e,[{key:"face",value:function value(t){var e=x[t];this.lookAt(e[0],e[1],e[2]);}}]),e;}(M.default);e.default=E,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),i=r(a),u=n(1),o=r(u),s=n(6),l=r(s),h=n(5),f=r(h),c=n(3),d=r(c),v=n(21),M=r(v),p=n(12),_=r(p),m=n(16),x=r(m),E=n(142),I=n(141),S=function(t){function e(){(0,o.default)(this,e);var t=[],n=[],r=[0,1,2,3,4,5],a=9999;t.push([-a,0,0]),t.push([a,0,0]),t.push([0,-a,0]),t.push([0,a,0]),t.push([0,0,-a]),t.push([0,0,a]),n.push([1,0,0]),n.push([1,0,0]),n.push([0,1,0]),n.push([0,1,0]),n.push([0,0,1]),n.push([0,0,1]);var u=new M.default(d.default.LINES);u.bufferVertex(t),u.bufferIndex(r),u.bufferData(n,"aColor",3);var s=new _.default(E,I);return (0,l.default)(this,(0,i.default)(e).call(this,u,s));}return (0,f.default)(e,t),e;}(x.default);e.default=S,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),i=r(a),u=n(1),o=r(u),s=n(2),l=r(s),h=n(6),f=r(h),c=n(22),d=r(c),v=n(5),M=r(v),p=n(26),_=r(p),m=n(12),x=r(m),E=n(16),I=r(E),S=n(72),b=n(48),g=function(t){function e(){(0,o.default)(this,e);var t=_.default.sphere(1,24),n=new x.default(S,b);return (0,f.default)(this,(0,i.default)(e).call(this,t,n));}return (0,M.default)(e,t),(0,l.default)(e,[{key:"draw",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?[0,0,0]:arguments[0],n=arguments.length<=1||void 0===arguments[1]?[1,1,1]:arguments[1],r=arguments.length<=2||void 0===arguments[2]?[1,1,1]:arguments[2],a=arguments.length<=3||void 0===arguments[3]?1:arguments[3];this.shader.bind(),this.shader.uniform("position","uniform3fv",t),this.shader.uniform("scale","uniform3fv",n),this.shader.uniform("color","uniform3fv",r),this.shader.uniform("opacity","uniform1f",a),(0,d.default)((0,i.default)(e.prototype),"draw",this).call(this);}}]),e;}(I.default);e.default=g,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),i=r(a),u=n(1),o=r(u),s=n(2),l=r(s),h=n(6),f=r(h),c=n(22),d=r(c),v=n(5),M=r(v),p=n(26),_=r(p),m=n(12),x=r(m),E=n(16),I=r(E),S=n(70),b=n(71),g=function(t){function e(){(0,o.default)(this,e);var t=_.default.bigTriangle(),n=new x.default(S,b),r=(0,f.default)(this,(0,i.default)(e).call(this,t,n));return n.bind(),n.uniform("texture","uniform1i",0),r;}return (0,M.default)(e,t),(0,l.default)(e,[{key:"draw",value:function value(t){this.shader.bind(),t.bind(0),(0,d.default)((0,i.default)(e.prototype),"draw",this).call(this);}}]),e;}(I.default);e.default=g,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),i=r(a),u=n(1),o=r(u),s=n(2),l=r(s),h=n(6),f=r(h),c=n(22),d=r(c),v=n(5),M=r(v),p=n(3),_=r(p),m=n(21),x=r(m),E=n(12),I=r(E),S=n(16),b=r(S),g=n(144),T=n(48),F=function(t){function e(){(0,o.default)(this,e);var t=[],n=[],r=0,a=100,u=50,s=u/a,l=void 0,h=void 0;for(l=-u/2;u>l;l+=s){for(h=-u/2;u>h;h+=s){t.push([l,h,0]),n.push(r),r++,t.push([l,0,h]),n.push(r),r++;}}var c=new x.default(_.default.POINTS);c.bufferVertex(t),c.bufferIndex(n);var d=new I.default(g,T),v=(0,f.default)(this,(0,i.default)(e).call(this,c,d));return v.color=[1,1,1],v.opacity=.5,v;}return (0,M.default)(e,t),(0,l.default)(e,[{key:"draw",value:function value(){this.shader.bind(),this.shader.uniform("color","uniform3fv",this.color),this.shader.uniform("opacity","uniform1f",this.opacity),(0,d.default)((0,i.default)(e.prototype),"draw",this).call(this);}}]),e;}(b.default);e.default=F,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),i=r(a),u=n(1),o=r(u),s=n(2),l=r(s),h=n(6),f=r(h),c=n(22),d=r(c),v=n(5),M=r(v),p=n(26),_=r(p),m=n(12),x=r(m),E=n(16),I=r(E),S=n(74),b=n(73),g=function(t){function e(){var t=arguments.length<=0||void 0===arguments[0]?20:arguments[0];(0,o.default)(this,e);var n=_.default.skybox(t),r=new x.default(S,b);return (0,f.default)(this,(0,i.default)(e).call(this,n,r));}return (0,M.default)(e,t),(0,l.default)(e,[{key:"draw",value:function value(t){this.shader.bind(),t.bind(0),(0,d.default)((0,i.default)(e.prototype),"draw",this).call(this);}}]),e;}(I.default);e.default=g,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=r(a),u=n(2),o=r(u),s=n(20),l=r(s),h=n(3),f=r(h),c=n(31),d=r(c),v=n(51),M=r(v),p=n(52),_=r(p),m=function(){function t(){var e=this;(0,i.default)(this,t),this._init(),this._initTextures(),this._initViews(),this._efIndex=l.default.addEF(function(){return e._loop();}),window.addEventListener("resize",function(){return e.resize();});}return (0,o.default)(t,[{key:"render",value:function value(){}},{key:"stop",value:function value(){-1!==this._efIndex&&(this._efIndex=l.default.removeEF(this._efIndex));}},{key:"start",value:function value(){var t=this;-1===this._efIndex&&(this._efIndex=l.default.addEF(function(){return t._loop();}));}},{key:"resize",value:function value(){f.default.setSize(window.innerWidth,window.innerHeight),this.camera.setAspectRatio(f.default.aspectRatio);}},{key:"_initTextures",value:function value(){}},{key:"_initViews",value:function value(){}},{key:"_init",value:function value(){this.camera=new d.default(),this.camera.setPerspective(45*Math.PI/180,f.default.aspectRatio,.1,100),this.orbitalControl=new _.default(this.camera,window,15),this.orbitalControl.radius.value=10,this.cameraOrtho=new M.default();}},{key:"_loop",value:function value(){f.default.viewport(0,0,f.default.width,f.default.height),f.default.setMatrices(this.camera),this.render();}}]),t;}();e.default=m,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=r(a),u=n(2),o=r(u),s=n(12),l=r(s),h=function(){function t(e,n){(0,i.default)(this,t),this.shader=new l.default(e,n),this._init();}return (0,o.default)(t,[{key:"_init",value:function value(){}},{key:"render",value:function value(){}}]),t;}();e.default=h,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),i=r(a),u=n(1),o=r(u),s=n(2),l=r(s),h=n(6),f=r(h),c=n(5),d=r(c),v=n(32),M=r(v),p=n(89),_=r(p),m=function(t){function e(){return (0,o.default)(this,e),(0,f.default)(this,(0,i.default)(e).call(this,!0));}return (0,d.default)(e,t),(0,l.default)(e,[{key:"parse",value:function value(t){return (0,_.default)(t);}},{key:"_onLoaded",value:function value(){var t=this.parse(this._req.response);this._callback&&this._callback(t);}}]),e;}(M.default);m.parse=function(t){return (0,_.default)(t);},e.default=m,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(4),i=r(a),u=n(1),o=r(u),s=n(2),l=r(s),h=n(6),f=r(h),c=n(22),d=r(c),v=n(5),M=r(v),p=n(32),_=r(p),m=n(21),x=r(m),E=function(t){function e(){return (0,o.default)(this,e),(0,f.default)(this,(0,i.default)(e).apply(this,arguments));}return (0,M.default)(e,t),(0,l.default)(e,[{key:"load",value:function value(t,n){var r=arguments.length<=2||void 0===arguments[2]?4:arguments[2];this._drawType=r,(0,d.default)((0,i.default)(e.prototype),"load",this).call(this,t,n);}},{key:"_onLoaded",value:function value(){this.parseObj(this._req.response);}},{key:"parseObj",value:function value(t){function e(t){var e=parseInt(t);return 3*(e>=0?e-1:e+c.length/3);}function n(t){var e=parseInt(t);return 3*(e>=0?e-1:e+d.length/3);}function r(t){var e=parseInt(t);return 2*(e>=0?e-1:e+v.length/2);}function a(t,e,n){l.push([c[t],c[t+1],c[t+2]]),l.push([c[e],c[e+1],c[e+2]]),l.push([c[n],c[n+1],c[n+2]]),M.push(3*p+0),M.push(3*p+1),M.push(3*p+2),p++;}function i(t,e,n){h.push([v[t],v[t+1]]),h.push([v[e],v[e+1]]),h.push([v[n],v[n+1]]);}function u(t,e,n){f.push([d[t],d[t+1],d[t+2]]),f.push([d[e],d[e+1],d[e+2]]),f.push([d[n],d[n+1],d[n+2]]);}function o(t,o,s,l,h,f,c,d,v,M,p,_){var m=e(t),x=e(o),E=e(s),I=void 0;void 0===l?a(m,x,E):(I=e(l),a(m,x,I),a(x,E,I)),void 0!==h&&(m=r(h),x=r(f),E=r(c),void 0===l?i(m,x,E):(I=r(d),i(m,x,I),i(x,E,I))),void 0!==v&&(m=n(v),x=n(M),E=n(p),void 0===l?u(m,x,E):(I=n(_),u(m,x,I),u(x,E,I)));}for(var s=t.split("\n"),l=[],h=[],f=[],c=[],d=[],v=[],M=[],p=0,_=void 0,m=/v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,x=/vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,E=/vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,I=/f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/,S=/f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/,b=/f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/,g=/f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/,T=0;T<s.length;T++){var F=s[T];F=F.trim(),0!==F.length&&"#"!==F.charAt(0)&&(null!==(_=m.exec(F))?c.push(parseFloat(_[1]),parseFloat(_[2]),parseFloat(_[3])):null!==(_=x.exec(F))?d.push(parseFloat(_[1]),parseFloat(_[2]),parseFloat(_[3])):null!==(_=E.exec(F))?v.push(parseFloat(_[1]),parseFloat(_[2])):null!==(_=I.exec(F))?o(_[1],_[2],_[3],_[4]):null!==(_=S.exec(F))?o(_[2],_[5],_[8],_[11],_[3],_[6],_[9],_[12]):null!==(_=b.exec(F))?o(_[2],_[6],_[10],_[14],_[3],_[7],_[11],_[15],_[4],_[8],_[12],_[16]):null!==(_=g.exec(F))&&o(_[2],_[5],_[8],_[11],void 0,void 0,void 0,void 0,_[3],_[6],_[9],_[12]));}return this._generateMeshes({positions:l,coords:h,normals:f,indices:M});}},{key:"_generateMeshes",value:function value(t){var e=65535,n=t.normals.length>0,r=t.coords.length>0,a=void 0;if(t.positions.length>e){var i=[],u=0,o={};for(o.positions=t.positions.concat(),o.coords=t.coords.concat(),o.indices=t.indices.concat(),o.normals=t.normals.concat();t.indices.length>0;){for(var s=Math.min(e,t.positions.length),l=t.indices.splice(0,s),h=[],f=[],c=[],d=void 0,v=0,M=0;M<l.length;M++){l[M]>v&&(v=l[M]),d=l[M],h.push(o.positions[d]),r&&f.push(o.coords[d]),n&&c.push(o.normals[d]),l[M]-=u;}u=v+1,a=new x.default(this._drawType),a.bufferVertex(h),r&&a.bufferTexCoord(f),a.bufferIndex(l),n&&a.bufferNormal(c),i.push(a);}return this._callback&&this._callback(i,o),i;}return a=new x.default(this._drawType),a.bufferVertex(t.positions),r&&a.bufferTexCoord(t.coords),a.bufferIndex(t.indices),n&&a.bufferNormal(t.normals),this._callback&&this._callback(a,t),a;}}]),e;}(_.default);E.parse=function(t){var e=new E();return e.parseObj(t);},e.default=E,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=r(a),u=n(2),o=r(u),s=!0;try{var l=document.createEvent("CustomEvent");l=null;}catch(h){s=!1;}var f=function(){function t(){(0,i.default)(this,t),this._eventListeners={};}return (0,o.default)(t,[{key:"addEventListener",value:function value(t,e){return null!==this._eventListeners&&void 0!==this._eventListeners||(this._eventListeners={}),this._eventListeners[t]||(this._eventListeners[t]=[]),this._eventListeners[t].push(e),this;}},{key:"on",value:function value(t,e){return this.addEventListener(t,e);}},{key:"removeEventListener",value:function value(t,e){null!==this._eventListeners&&void 0!==this._eventListeners||(this._eventListeners={});var n=this._eventListeners[t];if("undefined"==typeof n)return this;for(var r=n.length,a=0;r>a;a++){n[a]===e&&(n.splice(a,1),a--,r--);}return this;}},{key:"off",value:function value(t,e){return this.removeEventListener(t,e);}},{key:"dispatchEvent",value:function value(t){null!==this._eventListeners&&void 0!==this._eventListeners||(this._eventListeners={});var e=t.type;try{null===t.target&&(t.target=this),t.currentTarget=this;}catch(n){var r={type:e,detail:t.detail,dispatcher:this};return this.dispatchEvent(r);}var a=this._eventListeners[e];if(null!==a&&void 0!==a)for(var i=this._copyArray(a),u=i.length,o=0;u>o;o++){var s=i[o];s.call(this,t);}return this;}},{key:"dispatchCustomEvent",value:function value(t,e){var n=void 0;return s?(n=document.createEvent("CustomEvent"),n.dispatcher=this,n.initCustomEvent(t,!1,!1,e)):n={type:t,detail:e,dispatcher:this},this.dispatchEvent(n);}},{key:"trigger",value:function value(t,e){return this.dispatchCustomEvent(t,e);}},{key:"_destroy",value:function value(){if(null!==this._eventListeners){for(var t in this._eventListeners){if(this._eventListeners.hasOwnProperty(t)){for(var e=this._eventListeners[t],n=e.length,r=0;n>r;r++){e[r]=null;}delete this._eventListeners[t];}}this._eventListeners=null;}}},{key:"_copyArray",value:function value(t){for(var e=new Array(t.length),n=e.length,r=0;n>r;r++){e[r]=t[r];}return e;}}]),t;}();e.default=f,t.exports=e.default;},function(t,e){"use strict";function n(t,e,n,r,a,i){function u(e){var n=0;do {e[n++]=t[r];}while(++r<M&&n<e.length);return n;}function o(e,n,a){var i=0;do {e[n+i++]=t[r];}while(++r<M&&a>i);return i;}function s(t,e,n,r){var a=4*r,i=o(e,n,a);if(a>i)throw new Error("Error reading raw pixels: got "+i+" bytes, expected "+a);}for(var l=new Array(4),h=null,f=void 0,c=void 0,d=void 0,v=new Array(2),M=t.length;i>0;){if(u(l)<l.length)throw new Error("Error reading bytes: expected "+l.length);if(2!==l[0]||2!==l[1]||0!==(128&l[2]))return e[n++]=l[0],e[n++]=l[1],e[n++]=l[2],e[n++]=l[3],void s(t,e,n,a*i-1);if(((255&l[2])<<8|255&l[3])!==a)throw new Error("Wrong scanline width "+((255&l[2])<<8|255&l[3])+", expected "+a);null===h&&(h=new Array(4*a)),f=0;for(var p=0;4>p;p++){for(c=(p+1)*a;c>f;){if(u(v)<v.length)throw new Error("Error reading 2-byte buffer");if((255&v[0])>128){if(d=(255&v[0])-128,0===d||d>c-f)throw new Error("Bad scanline data");for(;d-->0;){h[f++]=v[1];}}else {if(d=255&v[0],0===d||d>c-f)throw new Error("Bad scanline data");if(h[f++]=v[1],--d>0){if(o(h,f,d)<d)throw new Error("Error reading non-run data");f+=d;}}}}for(var _=0;a>_;_++){e[n+0]=h[_],e[n+1]=h[_+a],e[n+2]=h[_+2*a],e[n+3]=h[_+3*a],n+=4;}i--;}}function r(t){function e(){var e="";do {var n=t[r];if(n===h){++r;break;}e+=String.fromCharCode(n);}while(++r<l);return e;}t instanceof ArrayBuffer&&(t=new Uint8Array(t));for(var r=0,l=t.length,h=10,f=0,c=0,d=1,v=1,M=!1,p=0;20>p;p++){var _=e(),m=void 0;if(m=_.match(a));else if(m=_.match(o))M=!0;else if(m=_.match(u))d=Number(m[1]);else if(m=_.match(i));else if(m=_.match(s)){c=Number(m[1]),f=Number(m[2]);break;}}if(!M)throw new Error("File is not run length encoded!");var x=new Uint8Array(f*c*4),E=f,I=c;n(t,x,0,r,E,I);for(var S=new Float32Array(f*c*4),b=0;b<x.length;b+=4){var g=x[b+0]/255,T=x[b+1]/255,F=x[b+2]/255,y=x[b+3],D=Math.pow(2,y-128);g*=D,T*=D,F*=D;var R=b;S[R+0]=g,S[R+1]=T,S[R+2]=F,S[R+3]=1;}return {shape:[f,c],exposure:d,gamma:v,data:S};}Object.defineProperty(e,"__esModule",{value:!0});var a="#\\?RADIANCE",i="#.*",u="EXPOSURE=\\s*([0-9]*[.][0-9]*)",o="FORMAT=32-bit_rle_rgbe",s="-Y ([0-9]+) \\+X ([0-9]+)";e.default=r,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(e,"__esModule",{value:!0});var a=n(1),i=r(a),u=n(2),o=r(u),s=n(8),l=r(s),h=n(33),f=r(h),c=n(20),d=r(c),v=function v(t,e){var n=e||{};return t.touches?(n.x=t.touches[0].pageX,n.y=t.touches[0].pageY):(n.x=t.clientX,n.y=t.clientY),n;},M=function(){function t(e){var n=this,r=arguments.length<=1||void 0===arguments[1]?window:arguments[1],a=arguments.length<=2||void 0===arguments[2]?.1:arguments[2];(0,i.default)(this,t),this._target=e,this._listenerTarget=r,this.matrix=l.default.mat4.create(),this.m=l.default.mat4.create(),this._vZaxis=l.default.vec3.clone([0,0,0]),this._zAxis=l.default.vec3.clone([0,0,1]),this.preMouse={x:0,y:0},this.mouse={x:0,y:0},this._isMouseDown=!1,this._rotation=l.default.quat.create(),this.tempRotation=l.default.quat.create(),this._rotateZMargin=0,this._offset=.004,this._slerp=-1,this._isLocked=!1,this._diffX=new f.default(0,a),this._diffY=new f.default(0,a),this._listenerTarget.addEventListener("mousedown",function(t){return n._onDown(t);}),this._listenerTarget.addEventListener("touchstart",function(t){return n._onDown(t);}),this._listenerTarget.addEventListener("mousemove",function(t){return n._onMove(t);}),this._listenerTarget.addEventListener("touchmove",function(t){return n._onMove(t);}),window.addEventListener("touchend",function(){return n._onUp();}),window.addEventListener("mouseup",function(){return n._onUp();}),d.default.addEF(function(){return n._loop();});}return (0,o.default)(t,[{key:"inverseControl",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this._isInvert=t;}},{key:"lock",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this._isLocked=t;}},{key:"setCameraPos",value:function value(t){var e=arguments.length<=1||void 0===arguments[1]?.1:arguments[1];if(this.easing=e,!(this._slerp>0)){var n=l.default.quat.clone(this._rotation);this._updateRotation(n),this._rotation=l.default.quat.clone(n),this._currDiffX=this.diffX=0,this._currDiffY=this.diffY=0,this._isMouseDown=!1,this._isRotateZ=0,this._targetQuat=l.default.quat.clone(t),this._slerp=1;}}},{key:"resetQuat",value:function value(){this._rotation=l.default.quat.clone([0,0,1,0]),this.tempRotation=l.default.quat.clone([0,0,0,0]),this._targetQuat=void 0,this._slerp=-1;}},{key:"_onDown",value:function value(t){if(!this._isLocked){var e=v(t),n=l.default.quat.clone(this._rotation);this._updateRotation(n),this._rotation=n,this._isMouseDown=!0,this._isRotateZ=0,this.preMouse={x:e.x,y:e.y},e.y<this._rotateZMargin||e.y>window.innerHeight-this._rotateZMargin?this._isRotateZ=1:(e.x<this._rotateZMargin||e.x>window.innerWidth-this._rotateZMargin)&&(this._isRotateZ=2),this._diffX.setTo(0),this._diffY.setTo(0);}}},{key:"_onMove",value:function value(t){this._isLocked||v(t,this.mouse);}},{key:"_onUp",value:function value(){this._isLocked||(this._isMouseDown=!1);}},{key:"_updateRotation",value:function value(t){this._isMouseDown&&!this._isLocked&&(this._diffX.value=-(this.mouse.x-this.preMouse.x),this._diffY.value=this.mouse.y-this.preMouse.y,this._isInvert&&(this._diffX.value=-this._diffX.targetValue,this._diffY.value=-this._diffY.targetValue));var e=void 0,n=void 0;if(this._isRotateZ>0)1===this._isRotateZ?(e=-this._diffX.value*this._offset,e*=this.preMouse.y<this._rotateZMargin?-1:1,n=l.default.quat.clone([0,0,Math.sin(e),Math.cos(e)]),l.default.quat.multiply(n,t,n)):(e=-this._diffY.value*this._offset,e*=this.preMouse.x<this._rotateZMargin?1:-1,n=l.default.quat.clone([0,0,Math.sin(e),Math.cos(e)]),l.default.quat.multiply(n,t,n));else {var r=l.default.vec3.clone([this._diffX.value,this._diffY.value,0]),a=l.default.vec3.create();l.default.vec3.cross(a,r,this._zAxis),l.default.vec3.normalize(a,a),e=l.default.vec3.length(r)*this._offset,n=l.default.quat.clone([Math.sin(e)*a[0],Math.sin(e)*a[1],Math.sin(e)*a[2],Math.cos(e)]),l.default.quat.multiply(t,n,t);}}},{key:"_loop",value:function value(){l.default.mat4.identity(this.m),void 0===this._targetQuat?(l.default.quat.set(this.tempRotation,this._rotation[0],this._rotation[1],this._rotation[2],this._rotation[3]),this._updateRotation(this.tempRotation)):(this._slerp+=.1*(0-this._slerp),this._slerp<5e-4?(l.default.quat.copy(this._rotation,this._targetQuat),l.default.quat.copy(this.tempRotation,this._targetQuat),this._targetQuat=void 0,this._diffX.setTo(0),this._diffY.setTo(0),this._slerp=-1):(l.default.quat.set(this.tempRotation,0,0,0,0),l.default.quat.slerp(this.tempRotation,this._targetQuat,this._rotation,this._slerp))),l.default.vec3.transformQuat(this._vZaxis,this._vZaxis,this.tempRotation),l.default.mat4.fromQuat(this.matrix,this.tempRotation);}},{key:"easing",set:function set(t){this._diffX.easing=t,this._diffY.easing=t;},get:function get(){return this._diffX.easing;}}]),t;}();e.default=M,t.exports=e.default;},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(48),a=n(70),i=n(72),u=n(71),o=n(69),s=n(74),l=n(73),h={simpleColorFrag:r,bigTriangleVert:a,generalVert:i,copyFrag:u,basicVert:o,skyboxVert:s,skyboxFrag:l};e.default=h,t.exports=e.default;},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t};}function a(t){switch(t){default:case "linear":return f.Linear.None;case "expIn":return f.Exponential.In;case "expOut":return f.Exponential.Out;case "expInOut":return f.Exponential.InOut;case "cubicIn":return f.Cubic.In;case "cubicOut":return f.Cubic.Out;case "cubicInOut":return f.Cubic.InOut;case "quarticIn":return f.Quartic.In;case "quarticOut":return f.Quartic.Out;case "quarticInOut":return f.Quartic.InOut;case "quinticIn":return f.Quintic.In;case "quinticOut":return f.Quintic.Out;case "quinticInOut":return f.Quintic.InOut;case "sinusoidalIn":return f.Sinusoidal.In;case "sinusoidalOut":return f.Sinusoidal.Out;case "sinusoidalInOut":return f.Sinusoidal.InOut;case "circularIn":return f.Circular.In;case "circularOut":return f.Circular.Out;case "circularInOut":return f.Circular.InOut;case "elasticIn":return f.Elastic.In;case "elasticOut":return f.Elastic.Out;case "elasticInOut":return f.Elastic.InOut;case "backIn":return f.Back.In;case "backOut":return f.Back.Out;case "backInOut":return f.Back.InOut;case "bounceIn":return f.Bounce.in;case "bounceOut":return f.Bounce.out;case "bounceInOut":return f.Bounce.inOut;}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),u=r(i),o=n(2),s=r(o),l=n(20),h=r(l),f={Linear:{None:function None(t){return t;}},Quadratic:{In:function In(t){return t*t;},Out:function Out(t){return t*(2-t);},InOut:function InOut(t){return (t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1);}},Cubic:{In:function In(t){return t*t*t;},Out:function Out(t){return --t*t*t+1;},InOut:function InOut(t){return (t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2);}},Quartic:{In:function In(t){return t*t*t*t;},Out:function Out(t){return 1- --t*t*t*t;},InOut:function InOut(t){return (t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2);}},Quintic:{In:function In(t){return t*t*t*t*t;},Out:function Out(t){return --t*t*t*t*t+1;},InOut:function InOut(t){return (t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2);}},Sinusoidal:{In:function In(t){return 1-Math.cos(t*Math.PI/2);},Out:function Out(t){return Math.sin(t*Math.PI/2);},InOut:function InOut(t){return .5*(1-Math.cos(Math.PI*t));}},Exponential:{In:function In(t){return 0===t?0:Math.pow(1024,t-1);},Out:function Out(t){return 1===t?1:1-Math.pow(2,-10*t);},InOut:function InOut(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2);}},Circular:{In:function In(t){return 1-Math.sqrt(1-t*t);},Out:function Out(t){return Math.sqrt(1- --t*t);},InOut:function InOut(t){return (t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1);}},Elastic:{In:function In(t){var e=void 0,n=.1,r=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=r/4):e=r*Math.asin(1/n)/(2*Math.PI),-(n*Math.pow(2,10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/r)));},Out:function Out(t){var e=void 0,n=.1,r=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=r/4):e=r*Math.asin(1/n)/(2*Math.PI),n*Math.pow(2,-10*t)*Math.sin((t-e)*(2*Math.PI)/r)+1);},InOut:function InOut(t){var e=void 0,n=.1,r=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=r/4):e=r*Math.asin(1/n)/(2*Math.PI),(t*=2)<1?-.5*(n*Math.pow(2,10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/r)):n*Math.pow(2,-10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/r)*.5+1);}},Back:{In:function In(t){var e=1.70158;return t*t*((e+1)*t-e);},Out:function Out(t){var e=1.70158;return --t*t*((e+1)*t+e)+1;},InOut:function InOut(t){var e=2.5949095;return (t*=2)<1?.5*(t*t*((e+1)*t-e)):.5*((t-=2)*t*((e+1)*t+e)+2);}},bounce:{"in":function _in(t){return 1-f.Bounce.out(1-t);},out:function out(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375;},inOut:function inOut(t){return .5>t?.5*f.Bounce.in(2*t):.5*f.Bounce.out(2*t-1)+.5;}}},c=function(){function t(e){var n=this,r=arguments.length<=1||void 0===arguments[1]?"expOut":arguments[1],a=arguments.length<=2||void 0===arguments[2]?.01:arguments[2];(0,u.default)(this,t),this._value=e,this._startValue=e,this._targetValue=e,this._counter=1,this.speed=a,this.easing=r,this._needUpdate=!0,this._efIndex=h.default.addEF(function(){return n._update();});}return (0,s.default)(t,[{key:"_update",value:function value(){var t=this._counter+this.speed;return t>1&&(t=1),this._counter===t?void (this._needUpdate=!1):(this._counter=t,void (this._needUpdate=!0));}},{key:"limit",value:function value(t,e){return t>e?void this.limit(e,t):(this._min=t,this._max=e,void this._checkLimit());}},{key:"setTo",value:function value(t){this._value=t,this._targetValue=t,this._counter=1;}},{key:"_checkLimit",value:function value(){void 0!==this._min&&this._targetValue<this._min&&(this._targetValue=this._min),void 0!==this._max&&this._targetValue>this._max&&(this._targetValue=this._max);}},{key:"destroy",value:function value(){h.default.removeEF(this._efIndex);}},{key:"value",set:function set(t){this._startValue=this._value,this._targetValue=t,this._checkLimit(),this._counter=0;},get:function get(){if(this._needUpdate){var t=a(this.easing),e=t(this._counter);this._value=this._startValue+e*(this._targetValue-this._startValue),this._needUpdate=!1;}return this._value;}},{key:"targetValue",get:function get(){return this._targetValue;}}]),t;}();e.default=c,t.exports=e.default;},function(t,e,n){t.exports={"default":n(99),__esModule:!0};},function(t,e,n){t.exports={"default":n(100),__esModule:!0};},function(t,e,n){t.exports={"default":n(101),__esModule:!0};},function(t,e,n){t.exports={"default":n(103),__esModule:!0};},function(t,e,n){t.exports={"default":n(104),__esModule:!0};},function(t,e,n){t.exports={"default":n(105),__esModule:!0};},function(t,e,n){n(124);var r=n(7).Object;t.exports=function(t,e){return r.create(t,e);};},function(t,e,n){n(125);var r=n(7).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n);};},function(t,e,n){n(126);var r=n(7).Object;t.exports=function(t,e){return r.getOwnPropertyDescriptor(t,e);};},function(t,e,n){n(127),t.exports=n(7).Object.getPrototypeOf;},function(t,e,n){n(128),t.exports=n(7).Object.setPrototypeOf;},function(t,e,n){n(131),n(129),n(132),n(133),t.exports=n(7).Symbol;},function(t,e,n){n(130),n(134),t.exports=n(47).f("iterator");},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t;};},function(t,e){t.exports=function(){};},function(t,e,n){var r=n(11),a=n(122),i=n(121);t.exports=function(t){return function(e,n,u){var o,s=r(e),l=a(s.length),h=i(u,l);if(t&&n!=n){for(;l>h;){if(o=s[h++],o!=o)return !0;}}else for(;l>h;h++){if((t||h in s)&&s[h]===n)return t||h||0;}return !t&&-1;};};},function(t,e,n){var r=n(27),a=n(60),i=n(40);t.exports=function(t){var e=r(t),n=a.f;if(n)for(var u,o=n(t),s=i.f,l=0;o.length>l;){s.call(t,u=o[l++])&&e.push(u);}return e;};},function(t,e,n){t.exports=n(10).document&&document.documentElement;},function(t,e,n){var r=n(54);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return "String"==r(t)?t.split(""):Object(t);};},function(t,e,n){var r=n(54);t.exports=Array.isArray||function(t){return "Array"==r(t);};},function(t,e,n){"use strict";var r=n(38),a=n(28),i=n(41),u={};n(18)(u,n(19)("iterator"),function(){return this;}),t.exports=function(t,e,n){t.prototype=r(u,{next:a(1,n)}),i(t,e+" Iterator");};},function(t,e){t.exports=function(t,e){return {value:e,done:!!t};};},function(t,e,n){var r=n(27),a=n(11);t.exports=function(t,e){for(var n,i=a(t),u=r(i),o=u.length,s=0;o>s;){if(i[n=u[s++]]===e)return n;}};},function(t,e,n){var r=n(29)("meta"),a=n(25),i=n(14),u=n(15).f,o=0,s=Object.isExtensible||function(){return !0;},l=!n(24)(function(){return s(Object.preventExtensions({}));}),h=function h(t){u(t,r,{value:{i:"O"+ ++o,w:{}}});},f=function f(t,e){if(!a(t))return "symbol"==(typeof t==="undefined"?"undefined":_typeof(t))?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!s(t))return "F";if(!e)return "E";h(t);}return t[r].i;},c=function c(t,e){if(!i(t,r)){if(!s(t))return !0;if(!e)return !1;h(t);}return t[r].w;},d=function d(t){return l&&v.NEED&&s(t)&&!i(t,r)&&h(t),t;},v=t.exports={KEY:r,NEED:!1,fastKey:f,getWeak:c,onFreeze:d};},function(t,e,n){var r=n(15),a=n(23),i=n(27);t.exports=n(13)?Object.defineProperties:function(t,e){a(t);for(var n,u=i(e),o=u.length,s=0;o>s;){r.f(t,n=u[s++],e[n]);}return t;};},function(t,e,n){var r=n(11),a=n(59).f,i={}.toString,u="object"==(typeof window==="undefined"?"undefined":_typeof(window))&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],o=function o(t){try{return a(t);}catch(e){return u.slice();}};t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?o(t):a(r(t));};},function(t,e,n){var r=n(25),a=n(23),i=function i(t,e){if(a(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!");};t.exports={set:Object.setPrototypeOf||("__proto__" in {}?function(t,e,r){try{r=n(55)(Function.call,n(39).f(Object.prototype,"__proto__").set,2),r(t,[]),e=!(t instanceof Array);}catch(a){e=!0;}return function(t,n){return i(t,n),e?t.__proto__=n:r(t,n),t;};}({},!1):void 0),check:i};},function(t,e,n){var r=n(44),a=n(34);t.exports=function(t){return function(e,n){var i,u,o=String(a(e)),s=r(n),l=o.length;return 0>s||s>=l?t?"":void 0:(i=o.charCodeAt(s),55296>i||i>56319||s+1===l||(u=o.charCodeAt(s+1))<56320||u>57343?t?o.charAt(s):i:t?o.slice(s,s+2):(i-55296<<10)+(u-56320)+65536);};};},function(t,e,n){var r=n(44),a=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),0>t?a(t+e,0):i(t,e);};},function(t,e,n){var r=n(44),a=Math.min;t.exports=function(t){return t>0?a(r(t),9007199254740991):0;};},function(t,e,n){"use strict";var r=n(107),a=n(114),i=n(36),u=n(11);t.exports=n(58)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e;},function(){var t=this._t,e=this._k,n=this._i++;return !t||n>=t.length?(this._t=void 0,a(1)):"keys"==e?a(0,n):"values"==e?a(0,t[n]):a(0,[n,t[n]]);},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries");},function(t,e,n){var r=n(17);r(r.S,"Object",{create:n(38)});},function(t,e,n){var r=n(17);r(r.S+r.F*!n(13),"Object",{defineProperty:n(15).f});},function(t,e,n){var r=n(11),a=n(39).f;n(63)("getOwnPropertyDescriptor",function(){return function(t,e){return a(r(t),e);};});},function(t,e,n){var r=n(65),a=n(61);n(63)("getPrototypeOf",function(){return function(t){return a(r(t));};});},function(t,e,n){var r=n(17);r(r.S,"Object",{setPrototypeOf:n(119).set});},function(t,e){},function(t,e,n){"use strict";var r=n(120)(!0);n(58)(String,"String",function(t){this._t=String(t),this._i=0;},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1});});},function(t,e,n){"use strict";var r=n(10),a=n(14),i=n(13),u=n(17),o=n(64),s=n(116).KEY,l=n(24),h=n(43),f=n(41),c=n(29),d=n(19),v=n(47),M=n(46),p=n(115),_=n(109),m=n(112),x=n(23),E=n(11),I=n(45),S=n(28),b=n(38),g=n(118),T=n(39),F=n(15),y=n(27),D=T.f,R=F.f,w=g.f,_A=r.Symbol,P=r.JSON,O=P&&P.stringify,L="prototype",k=d("_hidden"),N=d("toPrimitive"),U={}.propertyIsEnumerable,C=h("symbol-registry"),z=h("symbols"),V=h("op-symbols"),B=Object[L],X="function"==typeof _A,j=r.QObject,Y=!j||!j[L]||!j[L].findChild,q=i&&l(function(){return 7!=b(R({},"a",{get:function get(){return R(this,"a",{value:7}).a;}})).a;})?function(t,e,n){var r=D(B,e);r&&delete B[e],R(t,e,n),r&&t!==B&&R(B,e,r);}:R,G=function G(t){var e=z[t]=b(_A[L]);return e._k=t,e;},H=X&&"symbol"==_typeof(_A.iterator)?function(t){return "symbol"==(typeof t==="undefined"?"undefined":_typeof(t));}:function(t){return t instanceof _A;},W=function W(t,e,n){return t===B&&W(V,e,n),x(t),e=I(e,!0),x(n),a(z,e)?(n.enumerable?(a(t,k)&&t[k][e]&&(t[k][e]=!1),n=b(n,{enumerable:S(0,!1)})):(a(t,k)||R(t,k,S(1,{})),t[k][e]=!0),q(t,e,n)):R(t,e,n);},Z=function Z(t,e){x(t);for(var n,r=_(e=E(e)),a=0,i=r.length;i>a;){W(t,n=r[a++],e[n]);}return t;},Q=function Q(t,e){return void 0===e?b(t):Z(b(t),e);},K=function K(t){var e=U.call(this,t=I(t,!0));return this===B&&a(z,t)&&!a(V,t)?!1:e||!a(this,t)||!a(z,t)||a(this,k)&&this[k][t]?e:!0;},J=function J(t,e){if(t=E(t),e=I(e,!0),t!==B||!a(z,e)||a(V,e)){var n=D(t,e);return !n||!a(z,e)||a(t,k)&&t[k][e]||(n.enumerable=!0),n;}},$=function $(t){for(var e,n=w(E(t)),r=[],i=0;n.length>i;){a(z,e=n[i++])||e==k||e==s||r.push(e);}return r;},tt=function tt(t){for(var e,n=t===B,r=w(n?V:E(t)),i=[],u=0;r.length>u;){a(z,e=r[u++])&&(n?a(B,e):!0)&&i.push(z[e]);}return i;};X||(_A=function A(){if(this instanceof _A)throw TypeError("Symbol is not a constructor!");var t=c(arguments.length>0?arguments[0]:void 0),e=function e(n){this===B&&e.call(V,n),a(this,k)&&a(this[k],t)&&(this[k][t]=!1),q(this,t,S(1,n));};return i&&Y&&q(B,t,{configurable:!0,set:e}),G(t);},o(_A[L],"toString",function(){return this._k;}),T.f=J,F.f=W,n(59).f=g.f=$,n(40).f=K,n(60).f=tt,i&&!n(37)&&o(B,"propertyIsEnumerable",K,!0),v.f=function(t){return G(d(t));}),u(u.G+u.W+u.F*!X,{Symbol:_A});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;){d(et[nt++]);}for(var et=y(d.store),nt=0;et.length>nt;){M(et[nt++]);}u(u.S+u.F*!X,"Symbol",{"for":function _for(t){return a(C,t+="")?C[t]:C[t]=_A(t);},keyFor:function keyFor(t){if(H(t))return p(C,t);throw TypeError(t+" is not a symbol!");},useSetter:function useSetter(){Y=!0;},useSimple:function useSimple(){Y=!1;}}),u(u.S+u.F*!X,"Object",{create:Q,defineProperty:W,defineProperties:Z,getOwnPropertyDescriptor:J,getOwnPropertyNames:$,getOwnPropertySymbols:tt}),P&&u(u.S+u.F*(!X||l(function(){var t=_A();return "[null]"!=O([t])||"{}"!=O({a:t})||"{}"!=O(Object(t));})),"JSON",{stringify:function stringify(t){if(void 0!==t&&!H(t)){for(var e,n,r=[t],a=1;arguments.length>a;){r.push(arguments[a++]);}return e=r[1],"function"==typeof e&&(n=e),!n&&m(e)||(e=function e(t,_e2){return n&&(_e2=n.call(this,t,_e2)),H(_e2)?void 0:_e2;}),r[1]=e,O.apply(P,r);}}}),_A[L][N]||n(18)(_A[L],N,_A[L].valueOf),f(_A,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0);},function(t,e,n){n(46)("asyncIterator");},function(t,e,n){n(46)("observable");},function(t,e,n){n(123);for(var r=n(10),a=n(18),i=n(36),u=n(19)("toStringTag"),o=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],s=0;5>s;s++){var l=o[s],h=r[l],f=h&&h.prototype;f&&!f[u]&&a(f,u,l),i[l]=i.Array;}},function(t,e,n){var r=n(9),a={};a.create=function(){var t=new r.ARRAY_TYPE(4);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t;},a.clone=function(t){var e=new r.ARRAY_TYPE(4);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e;},a.copy=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t;},a.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t;},a.fromValues=function(t,e,n,a){var i=new r.ARRAY_TYPE(4);return i[0]=t,i[1]=e,i[2]=n,i[3]=a,i;},a.set=function(t,e,n,r,a){return t[0]=e,t[1]=n,t[2]=r,t[3]=a,t;},a.transpose=function(t,e){if(t===e){var n=e[1];t[1]=e[2],t[2]=n;}else t[0]=e[0],t[1]=e[2],t[2]=e[1],t[3]=e[3];return t;},a.invert=function(t,e){var n=e[0],r=e[1],a=e[2],i=e[3],u=n*i-a*r;return u?(u=1/u,t[0]=i*u,t[1]=-r*u,t[2]=-a*u,t[3]=n*u,t):null;},a.adjoint=function(t,e){var n=e[0];return t[0]=e[3],t[1]=-e[1],t[2]=-e[2],t[3]=n,t;},a.determinant=function(t){return t[0]*t[3]-t[2]*t[1];},a.multiply=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=e[3],o=n[0],s=n[1],l=n[2],h=n[3];return t[0]=r*o+i*s,t[1]=a*o+u*s,t[2]=r*l+i*h,t[3]=a*l+u*h,t;},a.mul=a.multiply,a.rotate=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=e[3],o=Math.sin(n),s=Math.cos(n);return t[0]=r*s+i*o,t[1]=a*s+u*o,t[2]=r*-o+i*s,t[3]=a*-o+u*s,t;},a.scale=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=e[3],o=n[0],s=n[1];return t[0]=r*o,t[1]=a*o,t[2]=i*s,t[3]=u*s,t;},a.fromRotation=function(t,e){var n=Math.sin(e),r=Math.cos(e);return t[0]=r,t[1]=n,t[2]=-n,t[3]=r,t;},a.fromScaling=function(t,e){return t[0]=e[0],t[1]=0,t[2]=0,t[3]=e[1],t;},a.str=function(t){return "mat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")";},a.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2));},a.LDU=function(t,e,n,r){return t[2]=r[2]/r[0],n[0]=r[0],n[1]=r[1],n[3]=r[3]-t[2]*n[1],[t,e,n];},a.add=function(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t[2]=e[2]+n[2],t[3]=e[3]+n[3],t;},a.subtract=function(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t[2]=e[2]-n[2],t[3]=e[3]-n[3],t;},a.sub=a.subtract,a.exactEquals=function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]&&t[3]===e[3];},a.equals=function(t,e){var n=t[0],a=t[1],i=t[2],u=t[3],o=e[0],s=e[1],l=e[2],h=e[3];return Math.abs(n-o)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(o))&&Math.abs(a-s)<=r.EPSILON*Math.max(1,Math.abs(a),Math.abs(s))&&Math.abs(i-l)<=r.EPSILON*Math.max(1,Math.abs(i),Math.abs(l))&&Math.abs(u-h)<=r.EPSILON*Math.max(1,Math.abs(u),Math.abs(h));},a.multiplyScalar=function(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t[3]=e[3]*n,t;},a.multiplyScalarAndAdd=function(t,e,n,r){return t[0]=e[0]+n[0]*r,t[1]=e[1]+n[1]*r,t[2]=e[2]+n[2]*r,t[3]=e[3]+n[3]*r,t;},t.exports=a;},function(t,e,n){var r=n(9),a={};a.create=function(){var t=new r.ARRAY_TYPE(6);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t;},a.clone=function(t){var e=new r.ARRAY_TYPE(6);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e;},a.copy=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t;},a.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t;},a.fromValues=function(t,e,n,a,i,u){var o=new r.ARRAY_TYPE(6);return o[0]=t,o[1]=e,o[2]=n,o[3]=a,o[4]=i,o[5]=u,o;},a.set=function(t,e,n,r,a,i,u){return t[0]=e,t[1]=n,t[2]=r,t[3]=a,t[4]=i,t[5]=u,t;},a.invert=function(t,e){var n=e[0],r=e[1],a=e[2],i=e[3],u=e[4],o=e[5],s=n*i-r*a;return s?(s=1/s,t[0]=i*s,t[1]=-r*s,t[2]=-a*s,t[3]=n*s,t[4]=(a*o-i*u)*s,t[5]=(r*u-n*o)*s,t):null;},a.determinant=function(t){return t[0]*t[3]-t[1]*t[2];},a.multiply=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=e[3],o=e[4],s=e[5],l=n[0],h=n[1],f=n[2],c=n[3],d=n[4],v=n[5];return t[0]=r*l+i*h,t[1]=a*l+u*h,t[2]=r*f+i*c,t[3]=a*f+u*c,t[4]=r*d+i*v+o,t[5]=a*d+u*v+s,t;},a.mul=a.multiply,a.rotate=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=e[3],o=e[4],s=e[5],l=Math.sin(n),h=Math.cos(n);return t[0]=r*h+i*l,t[1]=a*h+u*l,t[2]=r*-l+i*h,t[3]=a*-l+u*h,t[4]=o,t[5]=s,t;},a.scale=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=e[3],o=e[4],s=e[5],l=n[0],h=n[1];return t[0]=r*l,t[1]=a*l,t[2]=i*h,t[3]=u*h,t[4]=o,t[5]=s,t;},a.translate=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=e[3],o=e[4],s=e[5],l=n[0],h=n[1];return t[0]=r,t[1]=a,t[2]=i,t[3]=u,t[4]=r*l+i*h+o,t[5]=a*l+u*h+s,t;},a.fromRotation=function(t,e){var n=Math.sin(e),r=Math.cos(e);return t[0]=r,t[1]=n,t[2]=-n,t[3]=r,t[4]=0,t[5]=0,t;},a.fromScaling=function(t,e){return t[0]=e[0],t[1]=0,t[2]=0,t[3]=e[1],t[4]=0,t[5]=0,t;},a.fromTranslation=function(t,e){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=e[0],t[5]=e[1],t;},a.str=function(t){return "mat2d("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+")";},a.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+1);},a.add=function(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t[2]=e[2]+n[2],t[3]=e[3]+n[3],t[4]=e[4]+n[4],t[5]=e[5]+n[5],t;},a.subtract=function(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t[2]=e[2]-n[2],t[3]=e[3]-n[3],t[4]=e[4]-n[4],t[5]=e[5]-n[5],t;},a.sub=a.subtract,a.multiplyScalar=function(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t[3]=e[3]*n,t[4]=e[4]*n,t[5]=e[5]*n,t;},a.multiplyScalarAndAdd=function(t,e,n,r){return t[0]=e[0]+n[0]*r,t[1]=e[1]+n[1]*r,t[2]=e[2]+n[2]*r,t[3]=e[3]+n[3]*r,t[4]=e[4]+n[4]*r,t[5]=e[5]+n[5]*r,t;},a.exactEquals=function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]&&t[3]===e[3]&&t[4]===e[4]&&t[5]===e[5];},a.equals=function(t,e){var n=t[0],a=t[1],i=t[2],u=t[3],o=t[4],s=t[5],l=e[0],h=e[1],f=e[2],c=e[3],d=e[4],v=e[5];return Math.abs(n-l)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(l))&&Math.abs(a-h)<=r.EPSILON*Math.max(1,Math.abs(a),Math.abs(h))&&Math.abs(i-f)<=r.EPSILON*Math.max(1,Math.abs(i),Math.abs(f))&&Math.abs(u-c)<=r.EPSILON*Math.max(1,Math.abs(u),Math.abs(c))&&Math.abs(o-d)<=r.EPSILON*Math.max(1,Math.abs(o),Math.abs(d))&&Math.abs(s-v)<=r.EPSILON*Math.max(1,Math.abs(s),Math.abs(v));},t.exports=a;},function(t,e,n){var r=n(9),a={scalar:{},SIMD:{}};a.create=function(){var t=new r.ARRAY_TYPE(16);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t;},a.clone=function(t){var e=new r.ARRAY_TYPE(16);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e;},a.copy=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t;},a.fromValues=function(t,e,n,a,i,u,o,s,l,h,f,c,d,v,M,p){var _=new r.ARRAY_TYPE(16);return _[0]=t,_[1]=e,_[2]=n,_[3]=a,_[4]=i,_[5]=u,_[6]=o,_[7]=s,_[8]=l,_[9]=h,_[10]=f,_[11]=c,_[12]=d,_[13]=v,_[14]=M,_[15]=p,_;},a.set=function(t,e,n,r,a,i,u,o,s,l,h,f,c,d,v,M,p){return t[0]=e,t[1]=n,t[2]=r,t[3]=a,t[4]=i,t[5]=u,t[6]=o,t[7]=s,t[8]=l,t[9]=h,t[10]=f,t[11]=c,t[12]=d,t[13]=v,t[14]=M,t[15]=p,t;},a.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t;},a.scalar.transpose=function(t,e){if(t===e){var n=e[1],r=e[2],a=e[3],i=e[6],u=e[7],o=e[11];t[1]=e[4],t[2]=e[8],t[3]=e[12],t[4]=n,t[6]=e[9],t[7]=e[13],t[8]=r,t[9]=i,t[11]=e[14],t[12]=a,t[13]=u,t[14]=o;}else t[0]=e[0],t[1]=e[4],t[2]=e[8],t[3]=e[12],t[4]=e[1],t[5]=e[5],t[6]=e[9],t[7]=e[13],t[8]=e[2],t[9]=e[6],t[10]=e[10],t[11]=e[14],t[12]=e[3],t[13]=e[7],t[14]=e[11],t[15]=e[15];return t;},a.SIMD.transpose=function(t,e){var n,r,a,i,u,o,s,l,h,f;return n=SIMD.Float32x4.load(e,0),r=SIMD.Float32x4.load(e,4),a=SIMD.Float32x4.load(e,8),i=SIMD.Float32x4.load(e,12),u=SIMD.Float32x4.shuffle(n,r,0,1,4,5),o=SIMD.Float32x4.shuffle(a,i,0,1,4,5),s=SIMD.Float32x4.shuffle(u,o,0,2,4,6),l=SIMD.Float32x4.shuffle(u,o,1,3,5,7),SIMD.Float32x4.store(t,0,s),SIMD.Float32x4.store(t,4,l),u=SIMD.Float32x4.shuffle(n,r,2,3,6,7),o=SIMD.Float32x4.shuffle(a,i,2,3,6,7),h=SIMD.Float32x4.shuffle(u,o,0,2,4,6),f=SIMD.Float32x4.shuffle(u,o,1,3,5,7),SIMD.Float32x4.store(t,8,h),SIMD.Float32x4.store(t,12,f),t;},a.transpose=r.USE_SIMD?a.SIMD.transpose:a.scalar.transpose,a.scalar.invert=function(t,e){var n=e[0],r=e[1],a=e[2],i=e[3],u=e[4],o=e[5],s=e[6],l=e[7],h=e[8],f=e[9],c=e[10],d=e[11],v=e[12],M=e[13],p=e[14],_=e[15],m=n*o-r*u,x=n*s-a*u,E=n*l-i*u,I=r*s-a*o,S=r*l-i*o,b=a*l-i*s,g=h*M-f*v,T=h*p-c*v,F=h*_-d*v,y=f*p-c*M,D=f*_-d*M,R=c*_-d*p,w=m*R-x*D+E*y+I*F-S*T+b*g;return w?(w=1/w,t[0]=(o*R-s*D+l*y)*w,t[1]=(a*D-r*R-i*y)*w,t[2]=(M*b-p*S+_*I)*w,t[3]=(c*S-f*b-d*I)*w,t[4]=(s*F-u*R-l*T)*w,t[5]=(n*R-a*F+i*T)*w,t[6]=(p*E-v*b-_*x)*w,t[7]=(h*b-c*E+d*x)*w,t[8]=(u*D-o*F+l*g)*w,t[9]=(r*F-n*D-i*g)*w,t[10]=(v*S-M*E+_*m)*w,t[11]=(f*E-h*S-d*m)*w,t[12]=(o*T-u*y-s*g)*w,t[13]=(n*y-r*T+a*g)*w,t[14]=(M*x-v*I-p*m)*w,t[15]=(h*I-f*x+c*m)*w,t):null;},a.SIMD.invert=function(t,e){var n,r,a,i,u,o,s,l,h,f,c=SIMD.Float32x4.load(e,0),d=SIMD.Float32x4.load(e,4),v=SIMD.Float32x4.load(e,8),M=SIMD.Float32x4.load(e,12);return u=SIMD.Float32x4.shuffle(c,d,0,1,4,5),r=SIMD.Float32x4.shuffle(v,M,0,1,4,5),n=SIMD.Float32x4.shuffle(u,r,0,2,4,6),r=SIMD.Float32x4.shuffle(r,u,1,3,5,7),u=SIMD.Float32x4.shuffle(c,d,2,3,6,7),i=SIMD.Float32x4.shuffle(v,M,2,3,6,7),a=SIMD.Float32x4.shuffle(u,i,0,2,4,6),i=SIMD.Float32x4.shuffle(i,u,1,3,5,7),u=SIMD.Float32x4.mul(a,i),u=SIMD.Float32x4.swizzle(u,1,0,3,2),o=SIMD.Float32x4.mul(r,u),s=SIMD.Float32x4.mul(n,u),u=SIMD.Float32x4.swizzle(u,2,3,0,1),o=SIMD.Float32x4.sub(SIMD.Float32x4.mul(r,u),o),s=SIMD.Float32x4.sub(SIMD.Float32x4.mul(n,u),s),s=SIMD.Float32x4.swizzle(s,2,3,0,1),u=SIMD.Float32x4.mul(r,a),u=SIMD.Float32x4.swizzle(u,1,0,3,2),o=SIMD.Float32x4.add(SIMD.Float32x4.mul(i,u),o),h=SIMD.Float32x4.mul(n,u),u=SIMD.Float32x4.swizzle(u,2,3,0,1),o=SIMD.Float32x4.sub(o,SIMD.Float32x4.mul(i,u)),h=SIMD.Float32x4.sub(SIMD.Float32x4.mul(n,u),h),h=SIMD.Float32x4.swizzle(h,2,3,0,1),u=SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(r,2,3,0,1),i),u=SIMD.Float32x4.swizzle(u,1,0,3,2),a=SIMD.Float32x4.swizzle(a,2,3,0,1),o=SIMD.Float32x4.add(SIMD.Float32x4.mul(a,u),o),l=SIMD.Float32x4.mul(n,u),u=SIMD.Float32x4.swizzle(u,2,3,0,1),o=SIMD.Float32x4.sub(o,SIMD.Float32x4.mul(a,u)),l=SIMD.Float32x4.sub(SIMD.Float32x4.mul(n,u),l),l=SIMD.Float32x4.swizzle(l,2,3,0,1),u=SIMD.Float32x4.mul(n,r),u=SIMD.Float32x4.swizzle(u,1,0,3,2),l=SIMD.Float32x4.add(SIMD.Float32x4.mul(i,u),l),h=SIMD.Float32x4.sub(SIMD.Float32x4.mul(a,u),h),u=SIMD.Float32x4.swizzle(u,2,3,0,1),l=SIMD.Float32x4.sub(SIMD.Float32x4.mul(i,u),l),h=SIMD.Float32x4.sub(h,SIMD.Float32x4.mul(a,u)),u=SIMD.Float32x4.mul(n,i),u=SIMD.Float32x4.swizzle(u,1,0,3,2),s=SIMD.Float32x4.sub(s,SIMD.Float32x4.mul(a,u)),l=SIMD.Float32x4.add(SIMD.Float32x4.mul(r,u),l),u=SIMD.Float32x4.swizzle(u,2,3,0,1),s=SIMD.Float32x4.add(SIMD.Float32x4.mul(a,u),s),l=SIMD.Float32x4.sub(l,SIMD.Float32x4.mul(r,u)),u=SIMD.Float32x4.mul(n,a),u=SIMD.Float32x4.swizzle(u,1,0,3,2),s=SIMD.Float32x4.add(SIMD.Float32x4.mul(i,u),s),h=SIMD.Float32x4.sub(h,SIMD.Float32x4.mul(r,u)),u=SIMD.Float32x4.swizzle(u,2,3,0,1),s=SIMD.Float32x4.sub(s,SIMD.Float32x4.mul(i,u)),h=SIMD.Float32x4.add(SIMD.Float32x4.mul(r,u),h),f=SIMD.Float32x4.mul(n,o),f=SIMD.Float32x4.add(SIMD.Float32x4.swizzle(f,2,3,0,1),f),f=SIMD.Float32x4.add(SIMD.Float32x4.swizzle(f,1,0,3,2),f),u=SIMD.Float32x4.reciprocalApproximation(f),f=SIMD.Float32x4.sub(SIMD.Float32x4.add(u,u),SIMD.Float32x4.mul(f,SIMD.Float32x4.mul(u,u))),(f=SIMD.Float32x4.swizzle(f,0,0,0,0))?(SIMD.Float32x4.store(t,0,SIMD.Float32x4.mul(f,o)),SIMD.Float32x4.store(t,4,SIMD.Float32x4.mul(f,s)),SIMD.Float32x4.store(t,8,SIMD.Float32x4.mul(f,l)),SIMD.Float32x4.store(t,12,SIMD.Float32x4.mul(f,h)),t):null;},a.invert=r.USE_SIMD?a.SIMD.invert:a.scalar.invert,a.scalar.adjoint=function(t,e){var n=e[0],r=e[1],a=e[2],i=e[3],u=e[4],o=e[5],s=e[6],l=e[7],h=e[8],f=e[9],c=e[10],d=e[11],v=e[12],M=e[13],p=e[14],_=e[15];return t[0]=o*(c*_-d*p)-f*(s*_-l*p)+M*(s*d-l*c),t[1]=-(r*(c*_-d*p)-f*(a*_-i*p)+M*(a*d-i*c)),t[2]=r*(s*_-l*p)-o*(a*_-i*p)+M*(a*l-i*s),t[3]=-(r*(s*d-l*c)-o*(a*d-i*c)+f*(a*l-i*s)),t[4]=-(u*(c*_-d*p)-h*(s*_-l*p)+v*(s*d-l*c)),t[5]=n*(c*_-d*p)-h*(a*_-i*p)+v*(a*d-i*c),t[6]=-(n*(s*_-l*p)-u*(a*_-i*p)+v*(a*l-i*s)),t[7]=n*(s*d-l*c)-u*(a*d-i*c)+h*(a*l-i*s),t[8]=u*(f*_-d*M)-h*(o*_-l*M)+v*(o*d-l*f),t[9]=-(n*(f*_-d*M)-h*(r*_-i*M)+v*(r*d-i*f)),t[10]=n*(o*_-l*M)-u*(r*_-i*M)+v*(r*l-i*o),t[11]=-(n*(o*d-l*f)-u*(r*d-i*f)+h*(r*l-i*o)),t[12]=-(u*(f*p-c*M)-h*(o*p-s*M)+v*(o*c-s*f)),t[13]=n*(f*p-c*M)-h*(r*p-a*M)+v*(r*c-a*f),t[14]=-(n*(o*p-s*M)-u*(r*p-a*M)+v*(r*s-a*o)),t[15]=n*(o*c-s*f)-u*(r*c-a*f)+h*(r*s-a*o),t;},a.SIMD.adjoint=function(t,e){var n,r,a,i,u,o,s,l,h,f,c,d,v,n=SIMD.Float32x4.load(e,0),r=SIMD.Float32x4.load(e,4),a=SIMD.Float32x4.load(e,8),i=SIMD.Float32x4.load(e,12);return h=SIMD.Float32x4.shuffle(n,r,0,1,4,5),o=SIMD.Float32x4.shuffle(a,i,0,1,4,5),u=SIMD.Float32x4.shuffle(h,o,0,2,4,6),o=SIMD.Float32x4.shuffle(o,h,1,3,5,7),h=SIMD.Float32x4.shuffle(n,r,2,3,6,7),l=SIMD.Float32x4.shuffle(a,i,2,3,6,7),s=SIMD.Float32x4.shuffle(h,l,0,2,4,6),l=SIMD.Float32x4.shuffle(l,h,1,3,5,7),h=SIMD.Float32x4.mul(s,l),h=SIMD.Float32x4.swizzle(h,1,0,3,2),f=SIMD.Float32x4.mul(o,h),c=SIMD.Float32x4.mul(u,h),h=SIMD.Float32x4.swizzle(h,2,3,0,1),f=SIMD.Float32x4.sub(SIMD.Float32x4.mul(o,h),f),c=SIMD.Float32x4.sub(SIMD.Float32x4.mul(u,h),c),c=SIMD.Float32x4.swizzle(c,2,3,0,1),h=SIMD.Float32x4.mul(o,s),h=SIMD.Float32x4.swizzle(h,1,0,3,2),f=SIMD.Float32x4.add(SIMD.Float32x4.mul(l,h),f),v=SIMD.Float32x4.mul(u,h),h=SIMD.Float32x4.swizzle(h,2,3,0,1),f=SIMD.Float32x4.sub(f,SIMD.Float32x4.mul(l,h)),v=SIMD.Float32x4.sub(SIMD.Float32x4.mul(u,h),v),v=SIMD.Float32x4.swizzle(v,2,3,0,1),h=SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(o,2,3,0,1),l),h=SIMD.Float32x4.swizzle(h,1,0,3,2),s=SIMD.Float32x4.swizzle(s,2,3,0,1),f=SIMD.Float32x4.add(SIMD.Float32x4.mul(s,h),f),d=SIMD.Float32x4.mul(u,h),h=SIMD.Float32x4.swizzle(h,2,3,0,1),f=SIMD.Float32x4.sub(f,SIMD.Float32x4.mul(s,h)),d=SIMD.Float32x4.sub(SIMD.Float32x4.mul(u,h),d),d=SIMD.Float32x4.swizzle(d,2,3,0,1),h=SIMD.Float32x4.mul(u,o),h=SIMD.Float32x4.swizzle(h,1,0,3,2),d=SIMD.Float32x4.add(SIMD.Float32x4.mul(l,h),d),v=SIMD.Float32x4.sub(SIMD.Float32x4.mul(s,h),v),h=SIMD.Float32x4.swizzle(h,2,3,0,1),d=SIMD.Float32x4.sub(SIMD.Float32x4.mul(l,h),d),v=SIMD.Float32x4.sub(v,SIMD.Float32x4.mul(s,h)),h=SIMD.Float32x4.mul(u,l),h=SIMD.Float32x4.swizzle(h,1,0,3,2),c=SIMD.Float32x4.sub(c,SIMD.Float32x4.mul(s,h)),d=SIMD.Float32x4.add(SIMD.Float32x4.mul(o,h),d),h=SIMD.Float32x4.swizzle(h,2,3,0,1),c=SIMD.Float32x4.add(SIMD.Float32x4.mul(s,h),c),d=SIMD.Float32x4.sub(d,SIMD.Float32x4.mul(o,h)),h=SIMD.Float32x4.mul(u,s),h=SIMD.Float32x4.swizzle(h,1,0,3,2),c=SIMD.Float32x4.add(SIMD.Float32x4.mul(l,h),c),v=SIMD.Float32x4.sub(v,SIMD.Float32x4.mul(o,h)),h=SIMD.Float32x4.swizzle(h,2,3,0,1),c=SIMD.Float32x4.sub(c,SIMD.Float32x4.mul(l,h)),v=SIMD.Float32x4.add(SIMD.Float32x4.mul(o,h),v),SIMD.Float32x4.store(t,0,f),SIMD.Float32x4.store(t,4,c),SIMD.Float32x4.store(t,8,d),SIMD.Float32x4.store(t,12,v),t;},a.adjoint=r.USE_SIMD?a.SIMD.adjoint:a.scalar.adjoint,a.determinant=function(t){var e=t[0],n=t[1],r=t[2],a=t[3],i=t[4],u=t[5],o=t[6],s=t[7],l=t[8],h=t[9],f=t[10],c=t[11],d=t[12],v=t[13],M=t[14],p=t[15],_=e*u-n*i,m=e*o-r*i,x=e*s-a*i,E=n*o-r*u,I=n*s-a*u,S=r*s-a*o,b=l*v-h*d,g=l*M-f*d,T=l*p-c*d,F=h*M-f*v,y=h*p-c*v,D=f*p-c*M;return _*D-m*y+x*F+E*T-I*g+S*b;},a.SIMD.multiply=function(t,e,n){var r=SIMD.Float32x4.load(e,0),a=SIMD.Float32x4.load(e,4),i=SIMD.Float32x4.load(e,8),u=SIMD.Float32x4.load(e,12),o=SIMD.Float32x4.load(n,0),s=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(o,0,0,0,0),r),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(o,1,1,1,1),a),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(o,2,2,2,2),i),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(o,3,3,3,3),u))));SIMD.Float32x4.store(t,0,s);var l=SIMD.Float32x4.load(n,4),h=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(l,0,0,0,0),r),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(l,1,1,1,1),a),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(l,2,2,2,2),i),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(l,3,3,3,3),u))));SIMD.Float32x4.store(t,4,h);var f=SIMD.Float32x4.load(n,8),c=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f,0,0,0,0),r),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f,1,1,1,1),a),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f,2,2,2,2),i),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f,3,3,3,3),u))));SIMD.Float32x4.store(t,8,c);var d=SIMD.Float32x4.load(n,12),v=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(d,0,0,0,0),r),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(d,1,1,1,1),a),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(d,2,2,2,2),i),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(d,3,3,3,3),u))));return SIMD.Float32x4.store(t,12,v),t;},a.scalar.multiply=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=e[3],o=e[4],s=e[5],l=e[6],h=e[7],f=e[8],c=e[9],d=e[10],v=e[11],M=e[12],p=e[13],_=e[14],m=e[15],x=n[0],E=n[1],I=n[2],S=n[3];return t[0]=x*r+E*o+I*f+S*M,t[1]=x*a+E*s+I*c+S*p,t[2]=x*i+E*l+I*d+S*_,t[3]=x*u+E*h+I*v+S*m,x=n[4],E=n[5],I=n[6],S=n[7],t[4]=x*r+E*o+I*f+S*M,t[5]=x*a+E*s+I*c+S*p,t[6]=x*i+E*l+I*d+S*_,t[7]=x*u+E*h+I*v+S*m,x=n[8],E=n[9],I=n[10],S=n[11],t[8]=x*r+E*o+I*f+S*M,t[9]=x*a+E*s+I*c+S*p,t[10]=x*i+E*l+I*d+S*_,t[11]=x*u+E*h+I*v+S*m,x=n[12],E=n[13],I=n[14],S=n[15],t[12]=x*r+E*o+I*f+S*M,t[13]=x*a+E*s+I*c+S*p,t[14]=x*i+E*l+I*d+S*_,t[15]=x*u+E*h+I*v+S*m,t;},a.multiply=r.USE_SIMD?a.SIMD.multiply:a.scalar.multiply,a.mul=a.multiply,a.scalar.translate=function(t,e,n){var r,a,i,u,o,s,l,h,f,c,d,v,M=n[0],p=n[1],_=n[2];return e===t?(t[12]=e[0]*M+e[4]*p+e[8]*_+e[12],t[13]=e[1]*M+e[5]*p+e[9]*_+e[13],t[14]=e[2]*M+e[6]*p+e[10]*_+e[14],t[15]=e[3]*M+e[7]*p+e[11]*_+e[15]):(r=e[0],a=e[1],i=e[2],u=e[3],o=e[4],s=e[5],l=e[6],h=e[7],f=e[8],c=e[9],d=e[10],v=e[11],t[0]=r,t[1]=a,t[2]=i,t[3]=u,t[4]=o,t[5]=s,t[6]=l,t[7]=h,t[8]=f,t[9]=c,t[10]=d,t[11]=v,t[12]=r*M+o*p+f*_+e[12],t[13]=a*M+s*p+c*_+e[13],t[14]=i*M+l*p+d*_+e[14],t[15]=u*M+h*p+v*_+e[15]),t;},a.SIMD.translate=function(t,e,n){var r=SIMD.Float32x4.load(e,0),a=SIMD.Float32x4.load(e,4),i=SIMD.Float32x4.load(e,8),u=SIMD.Float32x4.load(e,12),o=SIMD.Float32x4(n[0],n[1],n[2],0);e!==t&&(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11]),r=SIMD.Float32x4.mul(r,SIMD.Float32x4.swizzle(o,0,0,0,0)),a=SIMD.Float32x4.mul(a,SIMD.Float32x4.swizzle(o,1,1,1,1)),i=SIMD.Float32x4.mul(i,SIMD.Float32x4.swizzle(o,2,2,2,2));var s=SIMD.Float32x4.add(r,SIMD.Float32x4.add(a,SIMD.Float32x4.add(i,u)));return SIMD.Float32x4.store(t,12,s),t;},a.translate=r.USE_SIMD?a.SIMD.translate:a.scalar.translate,a.scalar.scale=function(t,e,n){var r=n[0],a=n[1],i=n[2];return t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t[3]=e[3]*r,t[4]=e[4]*a,t[5]=e[5]*a,t[6]=e[6]*a,t[7]=e[7]*a,t[8]=e[8]*i,t[9]=e[9]*i,t[10]=e[10]*i,t[11]=e[11]*i,t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t;},a.SIMD.scale=function(t,e,n){var r,a,i,u=SIMD.Float32x4(n[0],n[1],n[2],0);return r=SIMD.Float32x4.load(e,0),SIMD.Float32x4.store(t,0,SIMD.Float32x4.mul(r,SIMD.Float32x4.swizzle(u,0,0,0,0))),a=SIMD.Float32x4.load(e,4),SIMD.Float32x4.store(t,4,SIMD.Float32x4.mul(a,SIMD.Float32x4.swizzle(u,1,1,1,1))),i=SIMD.Float32x4.load(e,8),SIMD.Float32x4.store(t,8,SIMD.Float32x4.mul(i,SIMD.Float32x4.swizzle(u,2,2,2,2))),t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t;},a.scale=r.USE_SIMD?a.SIMD.scale:a.scalar.scale,a.rotate=function(t,e,n,a){var i,u,o,s,l,h,f,c,d,v,M,p,_,m,x,E,I,S,b,g,T,F,y,D,R=a[0],w=a[1],A=a[2],P=Math.sqrt(R*R+w*w+A*A);return Math.abs(P)<r.EPSILON?null:(P=1/P,R*=P,w*=P,A*=P,i=Math.sin(n),u=Math.cos(n),o=1-u,s=e[0],l=e[1],h=e[2],f=e[3],c=e[4],d=e[5],v=e[6],M=e[7],p=e[8],_=e[9],m=e[10],x=e[11],E=R*R*o+u,I=w*R*o+A*i,S=A*R*o-w*i,b=R*w*o-A*i,g=w*w*o+u,T=A*w*o+R*i,F=R*A*o+w*i,y=w*A*o-R*i,D=A*A*o+u,t[0]=s*E+c*I+p*S,t[1]=l*E+d*I+_*S,t[2]=h*E+v*I+m*S,t[3]=f*E+M*I+x*S,t[4]=s*b+c*g+p*T,t[5]=l*b+d*g+_*T,t[6]=h*b+v*g+m*T,t[7]=f*b+M*g+x*T,t[8]=s*F+c*y+p*D,t[9]=l*F+d*y+_*D,t[10]=h*F+v*y+m*D,t[11]=f*F+M*y+x*D,e!==t&&(t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t);},a.scalar.rotateX=function(t,e,n){var r=Math.sin(n),a=Math.cos(n),i=e[4],u=e[5],o=e[6],s=e[7],l=e[8],h=e[9],f=e[10],c=e[11];return e!==t&&(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[4]=i*a+l*r,t[5]=u*a+h*r,t[6]=o*a+f*r,t[7]=s*a+c*r,t[8]=l*a-i*r,t[9]=h*a-u*r,t[10]=f*a-o*r,t[11]=c*a-s*r,t;},a.SIMD.rotateX=function(t,e,n){var r=SIMD.Float32x4.splat(Math.sin(n)),a=SIMD.Float32x4.splat(Math.cos(n));e!==t&&(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]);var i=SIMD.Float32x4.load(e,4),u=SIMD.Float32x4.load(e,8);return SIMD.Float32x4.store(t,4,SIMD.Float32x4.add(SIMD.Float32x4.mul(i,a),SIMD.Float32x4.mul(u,r))),SIMD.Float32x4.store(t,8,SIMD.Float32x4.sub(SIMD.Float32x4.mul(u,a),SIMD.Float32x4.mul(i,r))),t;},a.rotateX=r.USE_SIMD?a.SIMD.rotateX:a.scalar.rotateX,a.scalar.rotateY=function(t,e,n){var r=Math.sin(n),a=Math.cos(n),i=e[0],u=e[1],o=e[2],s=e[3],l=e[8],h=e[9],f=e[10],c=e[11];return e!==t&&(t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=i*a-l*r,t[1]=u*a-h*r,t[2]=o*a-f*r,t[3]=s*a-c*r,t[8]=i*r+l*a,t[9]=u*r+h*a,t[10]=o*r+f*a,t[11]=s*r+c*a,t;},a.SIMD.rotateY=function(t,e,n){var r=SIMD.Float32x4.splat(Math.sin(n)),a=SIMD.Float32x4.splat(Math.cos(n));e!==t&&(t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]);var i=SIMD.Float32x4.load(e,0),u=SIMD.Float32x4.load(e,8);return SIMD.Float32x4.store(t,0,SIMD.Float32x4.sub(SIMD.Float32x4.mul(i,a),SIMD.Float32x4.mul(u,r))),SIMD.Float32x4.store(t,8,SIMD.Float32x4.add(SIMD.Float32x4.mul(i,r),SIMD.Float32x4.mul(u,a))),t;},a.rotateY=r.USE_SIMD?a.SIMD.rotateY:a.scalar.rotateY,a.scalar.rotateZ=function(t,e,n){var r=Math.sin(n),a=Math.cos(n),i=e[0],u=e[1],o=e[2],s=e[3],l=e[4],h=e[5],f=e[6],c=e[7];return e!==t&&(t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=i*a+l*r,t[1]=u*a+h*r,t[2]=o*a+f*r,t[3]=s*a+c*r,t[4]=l*a-i*r,t[5]=h*a-u*r,t[6]=f*a-o*r,t[7]=c*a-s*r,t;},a.SIMD.rotateZ=function(t,e,n){var r=SIMD.Float32x4.splat(Math.sin(n)),a=SIMD.Float32x4.splat(Math.cos(n));e!==t&&(t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]);var i=SIMD.Float32x4.load(e,0),u=SIMD.Float32x4.load(e,4);return SIMD.Float32x4.store(t,0,SIMD.Float32x4.add(SIMD.Float32x4.mul(i,a),SIMD.Float32x4.mul(u,r))),SIMD.Float32x4.store(t,4,SIMD.Float32x4.sub(SIMD.Float32x4.mul(u,a),SIMD.Float32x4.mul(i,r))),t;},a.rotateZ=r.USE_SIMD?a.SIMD.rotateZ:a.scalar.rotateZ,a.fromTranslation=function(t,e){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=e[0],t[13]=e[1],t[14]=e[2],t[15]=1,t;},a.fromScaling=function(t,e){return t[0]=e[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=e[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=e[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t;},a.fromRotation=function(t,e,n){var a,i,u,o=n[0],s=n[1],l=n[2],h=Math.sqrt(o*o+s*s+l*l);return Math.abs(h)<r.EPSILON?null:(h=1/h,o*=h,s*=h,l*=h,a=Math.sin(e),i=Math.cos(e),u=1-i,t[0]=o*o*u+i,t[1]=s*o*u+l*a,t[2]=l*o*u-s*a,t[3]=0,t[4]=o*s*u-l*a,t[5]=s*s*u+i,t[6]=l*s*u+o*a,t[7]=0,t[8]=o*l*u+s*a,t[9]=s*l*u-o*a,t[10]=l*l*u+i,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t);},a.fromXRotation=function(t,e){var n=Math.sin(e),r=Math.cos(e);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=r,t[6]=n,t[7]=0,t[8]=0,t[9]=-n,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t;},a.fromYRotation=function(t,e){var n=Math.sin(e),r=Math.cos(e);return t[0]=r,t[1]=0,t[2]=-n,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=n,t[9]=0,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t;},a.fromZRotation=function(t,e){var n=Math.sin(e),r=Math.cos(e);return t[0]=r,t[1]=n,t[2]=0,t[3]=0,t[4]=-n,t[5]=r,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t;},a.fromRotationTranslation=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=e[3],o=r+r,s=a+a,l=i+i,h=r*o,f=r*s,c=r*l,d=a*s,v=a*l,M=i*l,p=u*o,_=u*s,m=u*l;return t[0]=1-(d+M),t[1]=f+m,t[2]=c-_,t[3]=0,t[4]=f-m,t[5]=1-(h+M),t[6]=v+p,t[7]=0,t[8]=c+_,t[9]=v-p,t[10]=1-(h+d),t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t;},a.getTranslation=function(t,e){return t[0]=e[12],t[1]=e[13],t[2]=e[14],t;},a.getRotation=function(t,e){var n=e[0]+e[5]+e[10],r=0;return n>0?(r=2*Math.sqrt(n+1),t[3]=.25*r,t[0]=(e[6]-e[9])/r,t[1]=(e[8]-e[2])/r,t[2]=(e[1]-e[4])/r):e[0]>e[5]&e[0]>e[10]?(r=2*Math.sqrt(1+e[0]-e[5]-e[10]),t[3]=(e[6]-e[9])/r,t[0]=.25*r,t[1]=(e[1]+e[4])/r,t[2]=(e[8]+e[2])/r):e[5]>e[10]?(r=2*Math.sqrt(1+e[5]-e[0]-e[10]),t[3]=(e[8]-e[2])/r,t[0]=(e[1]+e[4])/r,t[1]=.25*r,t[2]=(e[6]+e[9])/r):(r=2*Math.sqrt(1+e[10]-e[0]-e[5]),t[3]=(e[1]-e[4])/r,t[0]=(e[8]+e[2])/r,t[1]=(e[6]+e[9])/r,t[2]=.25*r),t;},a.fromRotationTranslationScale=function(t,e,n,r){var a=e[0],i=e[1],u=e[2],o=e[3],s=a+a,l=i+i,h=u+u,f=a*s,c=a*l,d=a*h,v=i*l,M=i*h,p=u*h,_=o*s,m=o*l,x=o*h,E=r[0],I=r[1],S=r[2];return t[0]=(1-(v+p))*E,t[1]=(c+x)*E,t[2]=(d-m)*E,t[3]=0,t[4]=(c-x)*I,t[5]=(1-(f+p))*I,t[6]=(M+_)*I,t[7]=0,t[8]=(d+m)*S,t[9]=(M-_)*S,t[10]=(1-(f+v))*S,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t;},a.fromRotationTranslationScaleOrigin=function(t,e,n,r,a){var i=e[0],u=e[1],o=e[2],s=e[3],l=i+i,h=u+u,f=o+o,c=i*l,d=i*h,v=i*f,M=u*h,p=u*f,_=o*f,m=s*l,x=s*h,E=s*f,I=r[0],S=r[1],b=r[2],g=a[0],T=a[1],F=a[2];return t[0]=(1-(M+_))*I,t[1]=(d+E)*I,t[2]=(v-x)*I,t[3]=0,t[4]=(d-E)*S,t[5]=(1-(c+_))*S,t[6]=(p+m)*S,t[7]=0,t[8]=(v+x)*b,t[9]=(p-m)*b,t[10]=(1-(c+M))*b,t[11]=0,t[12]=n[0]+g-(t[0]*g+t[4]*T+t[8]*F),t[13]=n[1]+T-(t[1]*g+t[5]*T+t[9]*F),t[14]=n[2]+F-(t[2]*g+t[6]*T+t[10]*F),t[15]=1,t;},a.fromQuat=function(t,e){var n=e[0],r=e[1],a=e[2],i=e[3],u=n+n,o=r+r,s=a+a,l=n*u,h=r*u,f=r*o,c=a*u,d=a*o,v=a*s,M=i*u,p=i*o,_=i*s;return t[0]=1-f-v,t[1]=h+_,t[2]=c-p,t[3]=0,t[4]=h-_,t[5]=1-l-v,t[6]=d+M,t[7]=0,t[8]=c+p,t[9]=d-M,t[10]=1-l-f,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t;},a.frustum=function(t,e,n,r,a,i,u){var o=1/(n-e),s=1/(a-r),l=1/(i-u);return t[0]=2*i*o,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*i*s,t[6]=0,t[7]=0,t[8]=(n+e)*o,t[9]=(a+r)*s,t[10]=(u+i)*l,t[11]=-1,t[12]=0,t[13]=0,t[14]=u*i*2*l,t[15]=0,t;},a.perspective=function(t,e,n,r,a){var i=1/Math.tan(e/2),u=1/(r-a);return t[0]=i/n,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=i,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(a+r)*u,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*a*r*u,t[15]=0,t;},a.perspectiveFromFieldOfView=function(t,e,n,r){var a=Math.tan(e.upDegrees*Math.PI/180),i=Math.tan(e.downDegrees*Math.PI/180),u=Math.tan(e.leftDegrees*Math.PI/180),o=Math.tan(e.rightDegrees*Math.PI/180),s=2/(u+o),l=2/(a+i);return t[0]=s,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=l,t[6]=0,t[7]=0,t[8]=-((u-o)*s*.5),t[9]=(a-i)*l*.5,t[10]=r/(n-r),t[11]=-1,t[12]=0,t[13]=0,t[14]=r*n/(n-r),t[15]=0,t;},a.ortho=function(t,e,n,r,a,i,u){var o=1/(e-n),s=1/(r-a),l=1/(i-u);return t[0]=-2*o,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*s,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*l,t[11]=0,t[12]=(e+n)*o,t[13]=(a+r)*s,t[14]=(u+i)*l,t[15]=1,t;},a.lookAt=function(t,e,n,i){var u,o,s,l,h,f,c,d,v,M,p=e[0],_=e[1],m=e[2],x=i[0],E=i[1],I=i[2],S=n[0],b=n[1],g=n[2];return Math.abs(p-S)<r.EPSILON&&Math.abs(_-b)<r.EPSILON&&Math.abs(m-g)<r.EPSILON?a.identity(t):(c=p-S,d=_-b,v=m-g,M=1/Math.sqrt(c*c+d*d+v*v),c*=M,d*=M,v*=M,u=E*v-I*d,o=I*c-x*v,s=x*d-E*c,M=Math.sqrt(u*u+o*o+s*s),M?(M=1/M,u*=M,o*=M,s*=M):(u=0,o=0,s=0),l=d*s-v*o,h=v*u-c*s,f=c*o-d*u,M=Math.sqrt(l*l+h*h+f*f),M?(M=1/M,l*=M,h*=M,f*=M):(l=0,h=0,f=0),t[0]=u,t[1]=l,t[2]=c,t[3]=0,t[4]=o,t[5]=h,t[6]=d,t[7]=0,t[8]=s,t[9]=f,t[10]=v,t[11]=0,t[12]=-(u*p+o*_+s*m),t[13]=-(l*p+h*_+f*m),t[14]=-(c*p+d*_+v*m),t[15]=1,t);},a.str=function(t){return "mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")";},a.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2)+Math.pow(t[9],2)+Math.pow(t[10],2)+Math.pow(t[11],2)+Math.pow(t[12],2)+Math.pow(t[13],2)+Math.pow(t[14],2)+Math.pow(t[15],2));},a.add=function(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t[2]=e[2]+n[2],t[3]=e[3]+n[3],t[4]=e[4]+n[4],t[5]=e[5]+n[5],t[6]=e[6]+n[6],t[7]=e[7]+n[7],t[8]=e[8]+n[8],t[9]=e[9]+n[9],t[10]=e[10]+n[10],t[11]=e[11]+n[11],t[12]=e[12]+n[12],t[13]=e[13]+n[13],t[14]=e[14]+n[14],t[15]=e[15]+n[15],t;},a.subtract=function(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t[2]=e[2]-n[2],t[3]=e[3]-n[3],t[4]=e[4]-n[4],t[5]=e[5]-n[5],t[6]=e[6]-n[6],t[7]=e[7]-n[7],t[8]=e[8]-n[8],t[9]=e[9]-n[9],t[10]=e[10]-n[10],t[11]=e[11]-n[11],t[12]=e[12]-n[12],t[13]=e[13]-n[13],t[14]=e[14]-n[14],t[15]=e[15]-n[15],t;},a.sub=a.subtract,a.multiplyScalar=function(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t[3]=e[3]*n,t[4]=e[4]*n,t[5]=e[5]*n,t[6]=e[6]*n,t[7]=e[7]*n,t[8]=e[8]*n,t[9]=e[9]*n,t[10]=e[10]*n,t[11]=e[11]*n,t[12]=e[12]*n,t[13]=e[13]*n,t[14]=e[14]*n,t[15]=e[15]*n,t;},a.multiplyScalarAndAdd=function(t,e,n,r){return t[0]=e[0]+n[0]*r,t[1]=e[1]+n[1]*r,t[2]=e[2]+n[2]*r,t[3]=e[3]+n[3]*r,t[4]=e[4]+n[4]*r,t[5]=e[5]+n[5]*r,t[6]=e[6]+n[6]*r,t[7]=e[7]+n[7]*r,t[8]=e[8]+n[8]*r,t[9]=e[9]+n[9]*r,t[10]=e[10]+n[10]*r,t[11]=e[11]+n[11]*r,t[12]=e[12]+n[12]*r,t[13]=e[13]+n[13]*r,t[14]=e[14]+n[14]*r,t[15]=e[15]+n[15]*r,t;},a.exactEquals=function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]&&t[3]===e[3]&&t[4]===e[4]&&t[5]===e[5]&&t[6]===e[6]&&t[7]===e[7]&&t[8]===e[8]&&t[9]===e[9]&&t[10]===e[10]&&t[11]===e[11]&&t[12]===e[12]&&t[13]===e[13]&&t[14]===e[14]&&t[15]===e[15];},a.equals=function(t,e){var n=t[0],a=t[1],i=t[2],u=t[3],o=t[4],s=t[5],l=t[6],h=t[7],f=t[8],c=t[9],d=t[10],v=t[11],M=t[12],p=t[13],_=t[14],m=t[15],x=e[0],E=e[1],I=e[2],S=e[3],b=e[4],g=e[5],T=e[6],F=e[7],y=e[8],D=e[9],R=e[10],w=e[11],A=e[12],P=e[13],O=e[14],L=e[15];return Math.abs(n-x)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(x))&&Math.abs(a-E)<=r.EPSILON*Math.max(1,Math.abs(a),Math.abs(E))&&Math.abs(i-I)<=r.EPSILON*Math.max(1,Math.abs(i),Math.abs(I))&&Math.abs(u-S)<=r.EPSILON*Math.max(1,Math.abs(u),Math.abs(S))&&Math.abs(o-b)<=r.EPSILON*Math.max(1,Math.abs(o),Math.abs(b))&&Math.abs(s-g)<=r.EPSILON*Math.max(1,Math.abs(s),Math.abs(g))&&Math.abs(l-T)<=r.EPSILON*Math.max(1,Math.abs(l),Math.abs(T))&&Math.abs(h-F)<=r.EPSILON*Math.max(1,Math.abs(h),Math.abs(F))&&Math.abs(f-y)<=r.EPSILON*Math.max(1,Math.abs(f),Math.abs(y))&&Math.abs(c-D)<=r.EPSILON*Math.max(1,Math.abs(c),Math.abs(D))&&Math.abs(d-R)<=r.EPSILON*Math.max(1,Math.abs(d),Math.abs(R))&&Math.abs(v-w)<=r.EPSILON*Math.max(1,Math.abs(v),Math.abs(w))&&Math.abs(M-A)<=r.EPSILON*Math.max(1,Math.abs(M),Math.abs(A))&&Math.abs(p-P)<=r.EPSILON*Math.max(1,Math.abs(p),Math.abs(P))&&Math.abs(_-O)<=r.EPSILON*Math.max(1,Math.abs(_),Math.abs(O))&&Math.abs(m-L)<=r.EPSILON*Math.max(1,Math.abs(m),Math.abs(L));},t.exports=a;},function(t,e,n){var r=n(9),a=n(66),i=n(67),u=n(68),o={};o.create=function(){var t=new r.ARRAY_TYPE(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t;},o.rotationTo=function(){var t=i.create(),e=i.fromValues(1,0,0),n=i.fromValues(0,1,0);return function(r,a,u){var s=i.dot(a,u);return -.999999>s?(i.cross(t,e,a),i.length(t)<1e-6&&i.cross(t,n,a),i.normalize(t,t),o.setAxisAngle(r,t,Math.PI),r):s>.999999?(r[0]=0,r[1]=0,r[2]=0,r[3]=1,r):(i.cross(t,a,u),r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=1+s,o.normalize(r,r));};}(),o.setAxes=function(){var t=a.create();return function(e,n,r,a){return t[0]=r[0],t[3]=r[1],t[6]=r[2],t[1]=a[0],t[4]=a[1],t[7]=a[2],t[2]=-n[0],t[5]=-n[1],t[8]=-n[2],o.normalize(e,o.fromMat3(e,t));};}(),o.clone=u.clone,o.fromValues=u.fromValues,o.copy=u.copy,o.set=u.set,o.identity=function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t;},o.setAxisAngle=function(t,e,n){n=.5*n;var r=Math.sin(n);return t[0]=r*e[0],t[1]=r*e[1],t[2]=r*e[2],t[3]=Math.cos(n),t;},o.getAxisAngle=function(t,e){var n=2*Math.acos(e[3]),r=Math.sin(n/2);return 0!=r?(t[0]=e[0]/r,t[1]=e[1]/r,t[2]=e[2]/r):(t[0]=1,t[1]=0,t[2]=0),n;},o.add=u.add,o.multiply=function(t,e,n){var r=e[0],a=e[1],i=e[2],u=e[3],o=n[0],s=n[1],l=n[2],h=n[3];return t[0]=r*h+u*o+a*l-i*s,t[1]=a*h+u*s+i*o-r*l,t[2]=i*h+u*l+r*s-a*o,t[3]=u*h-r*o-a*s-i*l,t;},o.mul=o.multiply,o.scale=u.scale,o.rotateX=function(t,e,n){n*=.5;var r=e[0],a=e[1],i=e[2],u=e[3],o=Math.sin(n),s=Math.cos(n);return t[0]=r*s+u*o,t[1]=a*s+i*o,t[2]=i*s-a*o,t[3]=u*s-r*o,t;},o.rotateY=function(t,e,n){n*=.5;var r=e[0],a=e[1],i=e[2],u=e[3],o=Math.sin(n),s=Math.cos(n);return t[0]=r*s-i*o,t[1]=a*s+u*o,t[2]=i*s+r*o,t[3]=u*s-a*o,t;},o.rotateZ=function(t,e,n){n*=.5;var r=e[0],a=e[1],i=e[2],u=e[3],o=Math.sin(n),s=Math.cos(n);return t[0]=r*s+a*o,t[1]=a*s-r*o,t[2]=i*s+u*o,t[3]=u*s-i*o,t;},o.calculateW=function(t,e){var n=e[0],r=e[1],a=e[2];return t[0]=n,t[1]=r,t[2]=a,t[3]=Math.sqrt(Math.abs(1-n*n-r*r-a*a)),t;},o.dot=u.dot,o.lerp=u.lerp,o.slerp=function(t,e,n,r){var a,i,u,o,s,l=e[0],h=e[1],f=e[2],c=e[3],d=n[0],v=n[1],M=n[2],p=n[3];return i=l*d+h*v+f*M+c*p,0>i&&(i=-i,d=-d,v=-v,M=-M,p=-p),1-i>1e-6?(a=Math.acos(i),u=Math.sin(a),o=Math.sin((1-r)*a)/u,s=Math.sin(r*a)/u):(o=1-r,s=r),t[0]=o*l+s*d,t[1]=o*h+s*v,t[2]=o*f+s*M,t[3]=o*c+s*p,t;},o.sqlerp=function(){var t=o.create(),e=o.create();return function(n,r,a,i,u,s){return o.slerp(t,r,u,s),o.slerp(e,a,i,s),o.slerp(n,t,e,2*s*(1-s)),n;};}(),o.invert=function(t,e){var n=e[0],r=e[1],a=e[2],i=e[3],u=n*n+r*r+a*a+i*i,o=u?1/u:0;return t[0]=-n*o,t[1]=-r*o,t[2]=-a*o,t[3]=i*o,t;},o.conjugate=function(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=e[3],t;},o.length=u.length,o.len=o.length,o.squaredLength=u.squaredLength,o.sqrLen=o.squaredLength,o.normalize=u.normalize,o.fromMat3=function(t,e){var n,r=e[0]+e[4]+e[8];if(r>0)n=Math.sqrt(r+1),t[3]=.5*n,n=.5/n,t[0]=(e[5]-e[7])*n,t[1]=(e[6]-e[2])*n,t[2]=(e[1]-e[3])*n;else {var a=0;e[4]>e[0]&&(a=1),e[8]>e[3*a+a]&&(a=2);var i=(a+1)%3,u=(a+2)%3;n=Math.sqrt(e[3*a+a]-e[3*i+i]-e[3*u+u]+1),t[a]=.5*n,n=.5/n,t[3]=(e[3*i+u]-e[3*u+i])*n,t[i]=(e[3*i+a]+e[3*a+i])*n,t[u]=(e[3*u+a]+e[3*a+u])*n;}return t;},o.str=function(t){return "quat("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")";},o.exactEquals=u.exactEquals,o.equals=u.equals,t.exports=o;},function(t,e,n){var r=n(9),a={};a.create=function(){var t=new r.ARRAY_TYPE(2);return t[0]=0,t[1]=0,t;},a.clone=function(t){var e=new r.ARRAY_TYPE(2);return e[0]=t[0],e[1]=t[1],e;},a.fromValues=function(t,e){var n=new r.ARRAY_TYPE(2);return n[0]=t,n[1]=e,n;},a.copy=function(t,e){return t[0]=e[0],t[1]=e[1],t;},a.set=function(t,e,n){return t[0]=e,t[1]=n,t;},a.add=function(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t;},a.subtract=function(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t;},a.sub=a.subtract,a.multiply=function(t,e,n){return t[0]=e[0]*n[0],t[1]=e[1]*n[1],t;},a.mul=a.multiply,a.divide=function(t,e,n){return t[0]=e[0]/n[0],t[1]=e[1]/n[1],t;},a.div=a.divide,a.ceil=function(t,e){return t[0]=Math.ceil(e[0]),t[1]=Math.ceil(e[1]),t;},a.floor=function(t,e){return t[0]=Math.floor(e[0]),t[1]=Math.floor(e[1]),t;},a.min=function(t,e,n){return t[0]=Math.min(e[0],n[0]),t[1]=Math.min(e[1],n[1]),t;},a.max=function(t,e,n){return t[0]=Math.max(e[0],n[0]),t[1]=Math.max(e[1],n[1]),t;},a.round=function(t,e){return t[0]=Math.round(e[0]),t[1]=Math.round(e[1]),t;},a.scale=function(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t;},a.scaleAndAdd=function(t,e,n,r){return t[0]=e[0]+n[0]*r,t[1]=e[1]+n[1]*r,t;},a.distance=function(t,e){var n=e[0]-t[0],r=e[1]-t[1];return Math.sqrt(n*n+r*r);},a.dist=a.distance,a.squaredDistance=function(t,e){var n=e[0]-t[0],r=e[1]-t[1];return n*n+r*r;},a.sqrDist=a.squaredDistance,a.length=function(t){var e=t[0],n=t[1];return Math.sqrt(e*e+n*n);},a.len=a.length,a.squaredLength=function(t){var e=t[0],n=t[1];return e*e+n*n;},a.sqrLen=a.squaredLength,a.negate=function(t,e){return t[0]=-e[0],t[1]=-e[1],t;},a.inverse=function(t,e){return t[0]=1/e[0],t[1]=1/e[1],t;},a.normalize=function(t,e){var n=e[0],r=e[1],a=n*n+r*r;return a>0&&(a=1/Math.sqrt(a),t[0]=e[0]*a,t[1]=e[1]*a),t;},a.dot=function(t,e){return t[0]*e[0]+t[1]*e[1];},a.cross=function(t,e,n){var r=e[0]*n[1]-e[1]*n[0];return t[0]=t[1]=0,t[2]=r,t;},a.lerp=function(t,e,n,r){var a=e[0],i=e[1];return t[0]=a+r*(n[0]-a),t[1]=i+r*(n[1]-i),t;},a.random=function(t,e){e=e||1;var n=2*r.RANDOM()*Math.PI;return t[0]=Math.cos(n)*e,t[1]=Math.sin(n)*e,t;},a.transformMat2=function(t,e,n){var r=e[0],a=e[1];return t[0]=n[0]*r+n[2]*a,t[1]=n[1]*r+n[3]*a,t;},a.transformMat2d=function(t,e,n){var r=e[0],a=e[1];return t[0]=n[0]*r+n[2]*a+n[4],t[1]=n[1]*r+n[3]*a+n[5],t;},a.transformMat3=function(t,e,n){var r=e[0],a=e[1];return t[0]=n[0]*r+n[3]*a+n[6],t[1]=n[1]*r+n[4]*a+n[7],t;},a.transformMat4=function(t,e,n){var r=e[0],a=e[1];return t[0]=n[0]*r+n[4]*a+n[12],t[1]=n[1]*r+n[5]*a+n[13],t;},a.forEach=function(){var t=a.create();return function(e,n,r,a,i,u){var o,s;for(n||(n=2),r||(r=0),s=a?Math.min(a*n+r,e.length):e.length,o=r;s>o;o+=n){t[0]=e[o],t[1]=e[o+1],i(t,t,u),e[o]=t[0],e[o+1]=t[1];}return e;};}(),a.str=function(t){return "vec2("+t[0]+", "+t[1]+")";},a.exactEquals=function(t,e){return t[0]===e[0]&&t[1]===e[1];},a.equals=function(t,e){var n=t[0],a=t[1],i=e[0],u=e[1];return Math.abs(n-i)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(i))&&Math.abs(a-u)<=r.EPSILON*Math.max(1,Math.abs(a),Math.abs(u));},t.exports=a;},function(t,e){t.exports=function(){throw new Error("It appears that you're using glslify in browserify without its transform applied. Make sure that you've set up glslify as a source transform: https://github.com/substack/node-browserify#browserifytransform");};},function(t,e){t.exports="// axis.frag\n\n#define SHADER_NAME SIMPLE_TEXTURE\n\nprecision highp float;\n#define GLSLIFY 1\nvarying vec3 vColor;\n\nvoid main(void) {\n    gl_FragColor = vec4(vColor, 1.0);\n}";},function(t,e){t.exports="// axis.vert\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\n#define GLSLIFY 1\nattribute vec3 aVertexPosition;\nattribute vec3 aColor;\nattribute vec3 aNormal;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec3 vColor;\nvarying vec3 vNormal;\n\nvoid main(void) {\n    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n    vColor = aColor;\n    vNormal = aNormal;\n}";},function(t,e){t.exports="// basic.frag\n\n#define SHADER_NAME BASIC_FRAGMENT\n\nprecision highp float;\n#define GLSLIFY 1\nvarying vec2 vTextureCoord;\nuniform float time;\n// uniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = vec4(vTextureCoord, sin(time) * .5 + .5, 1.0);\n}";},function(t,e){t.exports="// basic.vert\n\n#define SHADER_NAME DOTS_PLANE_VERTEX\n\nprecision highp float;\n#define GLSLIFY 1\nattribute vec3 aVertexPosition;\nattribute vec3 aNormal;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec3 vNormal;\n\nvoid main(void) {\n    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n\n    vNormal = aNormal;\n}";}]);});

},{}],2:[function(require,module,exports){
module.exports = require('./vendor/dat.gui')
module.exports.color = require('./vendor/dat.color')
},{"./vendor/dat.color":3,"./vendor/dat.gui":4}],3:[function(require,module,exports){
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/** @namespace */
var dat = module.exports = dat || {};

/** @namespace */
dat.color = dat.color || {};

/** @namespace */
dat.utils = dat.utils || {};

dat.utils.common = (function () {
  
  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;

  /**
   * Band-aid methods for things that should be a lot easier in JavaScript.
   * Implementation and structure inspired by underscore.js
   * http://documentcloud.github.com/underscore/
   */

  return { 
    
    BREAK: {},
  
    extend: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (!this.isUndefined(obj[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
      
    },
    
    defaults: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (this.isUndefined(target[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
    
    },
    
    compose: function() {
      var toCall = ARR_SLICE.call(arguments);
            return function() {
              var args = ARR_SLICE.call(arguments);
              for (var i = toCall.length -1; i >= 0; i--) {
                args = [toCall[i].apply(this, args)];
              }
              return args[0];
            }
    },
    
    each: function(obj, itr, scope) {

      
      if (ARR_EACH && obj.forEach === ARR_EACH) { 
        
        obj.forEach(itr, scope);
        
      } else if (obj.length === obj.length + 0) { // Is number but not NaN
        
        for (var key = 0, l = obj.length; key < l; key++)
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
            return;
            
      } else {

        for (var key in obj) 
          if (itr.call(scope, obj[key], key) === this.BREAK)
            return;
            
      }
            
    },
    
    defer: function(fnc) {
      setTimeout(fnc, 0);
    },
    
    toArray: function(obj) {
      if (obj.toArray) return obj.toArray();
      return ARR_SLICE.call(obj);
    },

    isUndefined: function(obj) {
      return obj === undefined;
    },
    
    isNull: function(obj) {
      return obj === null;
    },
    
    isNaN: function(obj) {
      return obj !== obj;
    },
    
    isArray: Array.isArray || function(obj) {
      return obj.constructor === Array;
    },
    
    isObject: function(obj) {
      return obj === Object(obj);
    },
    
    isNumber: function(obj) {
      return obj === obj+0;
    },
    
    isString: function(obj) {
      return obj === obj+'';
    },
    
    isBoolean: function(obj) {
      return obj === false || obj === true;
    },
    
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
  
  };
    
})();


dat.color.toString = (function (common) {

  return function(color) {

    if (color.a == 1 || common.isUndefined(color.a)) {

      var s = color.hex.toString(16);
      while (s.length < 6) {
        s = '0' + s;
      }

      return '#' + s;

    } else {

      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

    }

  }

})(dat.utils.common);


dat.Color = dat.color.Color = (function (interpret, math, toString, common) {

  var Color = function() {

    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw 'Failed to interpret color arguments';
    }

    this.__state.a = this.__state.a || 1;


  };

  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

  common.extend(Color.prototype, {

    toString: function() {
      return toString(this);
    },

    toOriginal: function() {
      return this.__state.conversion.write(this);
    }

  });

  defineRGBComponent(Color.prototype, 'r', 2);
  defineRGBComponent(Color.prototype, 'g', 1);
  defineRGBComponent(Color.prototype, 'b', 0);

  defineHSVComponent(Color.prototype, 'h');
  defineHSVComponent(Color.prototype, 's');
  defineHSVComponent(Color.prototype, 'v');

  Object.defineProperty(Color.prototype, 'a', {

    get: function() {
      return this.__state.a;
    },

    set: function(v) {
      this.__state.a = v;
    }

  });

  Object.defineProperty(Color.prototype, 'hex', {

    get: function() {

      if (!this.__state.space !== 'HEX') {
        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
      }

      return this.__state.hex;

    },

    set: function(v) {

      this.__state.space = 'HEX';
      this.__state.hex = v;

    }

  });

  function defineRGBComponent(target, component, componentHexIndex) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'RGB') {
          return this.__state[component];
        }

        recalculateRGB(this, component, componentHexIndex);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'RGB') {
          recalculateRGB(this, component, componentHexIndex);
          this.__state.space = 'RGB';
        }

        this.__state[component] = v;

      }

    });

  }

  function defineHSVComponent(target, component) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'HSV')
          return this.__state[component];

        recalculateHSV(this);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'HSV') {
          recalculateHSV(this);
          this.__state.space = 'HSV';
        }

        this.__state[component] = v;

      }

    });

  }

  function recalculateRGB(color, component, componentHexIndex) {

    if (color.__state.space === 'HEX') {

      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

    } else if (color.__state.space === 'HSV') {

      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

    } else {

      throw 'Corrupted color state';

    }

  }

  function recalculateHSV(color) {

    var result = math.rgb_to_hsv(color.r, color.g, color.b);

    common.extend(color.__state,
        {
          s: result.s,
          v: result.v
        }
    );

    if (!common.isNaN(result.h)) {
      color.__state.h = result.h;
    } else if (common.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }

  }

  return Color;

})(dat.color.interpret = (function (toString, common) {

  var result, toReturn;

  var interpret = function() {

    toReturn = false;

    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

    common.each(INTERPRETATIONS, function(family) {

      if (family.litmus(original)) {

        common.each(family.conversions, function(conversion, conversionName) {

          result = conversion.read(original);

          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return common.BREAK;

          }

        });

        return common.BREAK;

      }

    });

    return toReturn;

  };

  var INTERPRETATIONS = [

    // Strings
    {

      litmus: common.isString,

      conversions: {

        THREE_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt(
                  '0x' +
                      test[1].toString() + test[1].toString() +
                      test[2].toString() + test[2].toString() +
                      test[3].toString() + test[3].toString())
            };

          },

          write: toString

        },

        SIX_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9]{6})$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt('0x' + test[1].toString())
            };

          },

          write: toString

        },

        CSS_RGB: {

          read: function(original) {

            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3])
            };

          },

          write: toString

        },

        CSS_RGBA: {

          read: function(original) {

            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3]),
              a: parseFloat(test[4])
            };

          },

          write: toString

        }

      }

    },

    // Numbers
    {

      litmus: common.isNumber,

      conversions: {

        HEX: {
          read: function(original) {
            return {
              space: 'HEX',
              hex: original,
              conversionName: 'HEX'
            }
          },

          write: function(color) {
            return color.hex;
          }
        }

      }

    },

    // Arrays
    {

      litmus: common.isArray,

      conversions: {

        RGB_ARRAY: {
          read: function(original) {
            if (original.length != 3) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b];
          }

        },

        RGBA_ARRAY: {
          read: function(original) {
            if (original.length != 4) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2],
              a: original[3]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b, color.a];
          }

        }

      }

    },

    // Objects
    {

      litmus: common.isObject,

      conversions: {

        RGBA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b) &&
                common.isNumber(original.a)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b,
              a: color.a
            }
          }
        },

        RGB_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b
            }
          }
        },

        HSVA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v) &&
                common.isNumber(original.a)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v,
              a: color.a
            }
          }
        },

        HSV_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v
            }
          }

        }

      }

    }


  ];

  return interpret;


})(dat.color.toString,
dat.utils.common),
dat.color.math = (function () {

  var tmpComponent;

  return {

    hsv_to_rgb: function(h, s, v) {

      var hi = Math.floor(h / 60) % 6;

      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1.0 - s);
      var q = v * (1.0 - (f * s));
      var t = v * (1.0 - ((1.0 - f) * s));
      var c = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
      ][hi];

      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };

    },

    rgb_to_hsv: function(r, g, b) {

      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s;

      if (max != 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }

      if (r == max) {
        h = (g - b) / delta;
      } else if (g == max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }

      return {
        h: h * 360,
        s: s,
        v: max / 255
      };
    },

    rgb_to_hex: function(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },

    component_from_hex: function(hex, componentIndex) {
      return (hex >> (componentIndex * 8)) & 0xFF;
    },

    hex_with_component: function(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
    }

  }

})(),
dat.color.toString,
dat.utils.common);
},{}],4:[function(require,module,exports){
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/** @namespace */
var dat = module.exports = dat || {};

/** @namespace */
dat.gui = dat.gui || {};

/** @namespace */
dat.utils = dat.utils || {};

/** @namespace */
dat.controllers = dat.controllers || {};

/** @namespace */
dat.dom = dat.dom || {};

/** @namespace */
dat.color = dat.color || {};

dat.utils.css = (function () {
  return {
    load: function (url, doc) {
      doc = doc || document;
      var link = doc.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      doc.getElementsByTagName('head')[0].appendChild(link);
    },
    inject: function(css, doc) {
      doc = doc || document;
      var injected = document.createElement('style');
      injected.type = 'text/css';
      injected.innerHTML = css;
      doc.getElementsByTagName('head')[0].appendChild(injected);
    }
  }
})();


dat.utils.common = (function () {
  
  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;

  /**
   * Band-aid methods for things that should be a lot easier in JavaScript.
   * Implementation and structure inspired by underscore.js
   * http://documentcloud.github.com/underscore/
   */

  return { 
    
    BREAK: {},
  
    extend: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (!this.isUndefined(obj[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
      
    },
    
    defaults: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (this.isUndefined(target[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
    
    },
    
    compose: function() {
      var toCall = ARR_SLICE.call(arguments);
            return function() {
              var args = ARR_SLICE.call(arguments);
              for (var i = toCall.length -1; i >= 0; i--) {
                args = [toCall[i].apply(this, args)];
              }
              return args[0];
            }
    },
    
    each: function(obj, itr, scope) {

      
      if (ARR_EACH && obj.forEach === ARR_EACH) { 
        
        obj.forEach(itr, scope);
        
      } else if (obj.length === obj.length + 0) { // Is number but not NaN
        
        for (var key = 0, l = obj.length; key < l; key++)
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
            return;
            
      } else {

        for (var key in obj) 
          if (itr.call(scope, obj[key], key) === this.BREAK)
            return;
            
      }
            
    },
    
    defer: function(fnc) {
      setTimeout(fnc, 0);
    },
    
    toArray: function(obj) {
      if (obj.toArray) return obj.toArray();
      return ARR_SLICE.call(obj);
    },

    isUndefined: function(obj) {
      return obj === undefined;
    },
    
    isNull: function(obj) {
      return obj === null;
    },
    
    isNaN: function(obj) {
      return obj !== obj;
    },
    
    isArray: Array.isArray || function(obj) {
      return obj.constructor === Array;
    },
    
    isObject: function(obj) {
      return obj === Object(obj);
    },
    
    isNumber: function(obj) {
      return obj === obj+0;
    },
    
    isString: function(obj) {
      return obj === obj+'';
    },
    
    isBoolean: function(obj) {
      return obj === false || obj === true;
    },
    
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
  
  };
    
})();


dat.controllers.Controller = (function (common) {

  /**
   * @class An "abstract" class that represents a given property of an object.
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var Controller = function(object, property) {

    this.initialValue = object[property];

    /**
     * Those who extend this class will put their DOM elements in here.
     * @type {DOMElement}
     */
    this.domElement = document.createElement('div');

    /**
     * The object to manipulate
     * @type {Object}
     */
    this.object = object;

    /**
     * The name of the property to manipulate
     * @type {String}
     */
    this.property = property;

    /**
     * The function to be called on change.
     * @type {Function}
     * @ignore
     */
    this.__onChange = undefined;

    /**
     * The function to be called on finishing change.
     * @type {Function}
     * @ignore
     */
    this.__onFinishChange = undefined;

  };

  common.extend(

      Controller.prototype,

      /** @lends dat.controllers.Controller.prototype */
      {

        /**
         * Specify that a function fire every time someone changes the value with
         * this Controller.
         *
         * @param {Function} fnc This function will be called whenever the value
         * is modified via this Controller.
         * @returns {dat.controllers.Controller} this
         */
        onChange: function(fnc) {
          this.__onChange = fnc;
          return this;
        },

        /**
         * Specify that a function fire every time someone "finishes" changing
         * the value wih this Controller. Useful for values that change
         * incrementally like numbers or strings.
         *
         * @param {Function} fnc This function will be called whenever
         * someone "finishes" changing the value via this Controller.
         * @returns {dat.controllers.Controller} this
         */
        onFinishChange: function(fnc) {
          this.__onFinishChange = fnc;
          return this;
        },

        /**
         * Change the value of <code>object[property]</code>
         *
         * @param {Object} newValue The new value of <code>object[property]</code>
         */
        setValue: function(newValue) {
          this.object[this.property] = newValue;
          if (this.__onChange) {
            this.__onChange.call(this, newValue);
          }
          this.updateDisplay();
          return this;
        },

        /**
         * Gets the value of <code>object[property]</code>
         *
         * @returns {Object} The current value of <code>object[property]</code>
         */
        getValue: function() {
          return this.object[this.property];
        },

        /**
         * Refreshes the visual display of a Controller in order to keep sync
         * with the object's current value.
         * @returns {dat.controllers.Controller} this
         */
        updateDisplay: function() {
          return this;
        },

        /**
         * @returns {Boolean} true if the value has deviated from initialValue
         */
        isModified: function() {
          return this.initialValue !== this.getValue()
        }

      }

  );

  return Controller;


})(dat.utils.common);


dat.dom.dom = (function (common) {

  var EVENT_MAP = {
    'HTMLEvents': ['change'],
    'MouseEvents': ['click','mousemove','mousedown','mouseup', 'mouseover'],
    'KeyboardEvents': ['keydown']
  };

  var EVENT_MAP_INV = {};
  common.each(EVENT_MAP, function(v, k) {
    common.each(v, function(e) {
      EVENT_MAP_INV[e] = k;
    });
  });

  var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

  function cssValueToPixels(val) {

    if (val === '0' || common.isUndefined(val)) return 0;

    var match = val.match(CSS_VALUE_PIXELS);

    if (!common.isNull(match)) {
      return parseFloat(match[1]);
    }

    // TODO ...ems? %?

    return 0;

  }

  /**
   * @namespace
   * @member dat.dom
   */
  var dom = {

    /**
     * 
     * @param elem
     * @param selectable
     */
    makeSelectable: function(elem, selectable) {

      if (elem === undefined || elem.style === undefined) return;

      elem.onselectstart = selectable ? function() {
        return false;
      } : function() {
      };

      elem.style.MozUserSelect = selectable ? 'auto' : 'none';
      elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
      elem.unselectable = selectable ? 'on' : 'off';

    },

    /**
     *
     * @param elem
     * @param horizontal
     * @param vertical
     */
    makeFullscreen: function(elem, horizontal, vertical) {

      if (common.isUndefined(horizontal)) horizontal = true;
      if (common.isUndefined(vertical)) vertical = true;

      elem.style.position = 'absolute';

      if (horizontal) {
        elem.style.left = 0;
        elem.style.right = 0;
      }
      if (vertical) {
        elem.style.top = 0;
        elem.style.bottom = 0;
      }

    },

    /**
     *
     * @param elem
     * @param eventType
     * @param params
     */
    fakeEvent: function(elem, eventType, params, aux) {
      params = params || {};
      var className = EVENT_MAP_INV[eventType];
      if (!className) {
        throw new Error('Event type ' + eventType + ' not supported.');
      }
      var evt = document.createEvent(className);
      switch (className) {
        case 'MouseEvents':
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false,
              params.cancelable || true, window, params.clickCount || 1,
              0, //screen X
              0, //screen Y
              clientX, //client X
              clientY, //client Y
              false, false, false, false, 0, null);
          break;
        case 'KeyboardEvents':
          var init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
          common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false,
              params.cancelable, window,
              params.ctrlKey, params.altKey,
              params.shiftKey, params.metaKey,
              params.keyCode, params.charCode);
          break;
        default:
          evt.initEvent(eventType, params.bubbles || false,
              params.cancelable || true);
          break;
      }
      common.defaults(evt, aux);
      elem.dispatchEvent(evt);
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    bind: function(elem, event, func, bool) {
      bool = bool || false;
      if (elem.addEventListener)
        elem.addEventListener(event, func, bool);
      else if (elem.attachEvent)
        elem.attachEvent('on' + event, func);
      return dom;
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    unbind: function(elem, event, func, bool) {
      bool = bool || false;
      if (elem.removeEventListener)
        elem.removeEventListener(event, func, bool);
      else if (elem.detachEvent)
        elem.detachEvent('on' + event, func);
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    addClass: function(elem, className) {
      if (elem.className === undefined) {
        elem.className = className;
      } else if (elem.className !== className) {
        var classes = elem.className.split(/ +/);
        if (classes.indexOf(className) == -1) {
          classes.push(className);
          elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
        }
      }
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    removeClass: function(elem, className) {
      if (className) {
        if (elem.className === undefined) {
          // elem.className = className;
        } else if (elem.className === className) {
          elem.removeAttribute('class');
        } else {
          var classes = elem.className.split(/ +/);
          var index = classes.indexOf(className);
          if (index != -1) {
            classes.splice(index, 1);
            elem.className = classes.join(' ');
          }
        }
      } else {
        elem.className = undefined;
      }
      return dom;
    },

    hasClass: function(elem, className) {
      return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
    },

    /**
     *
     * @param elem
     */
    getWidth: function(elem) {

      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-left-width']) +
          cssValueToPixels(style['border-right-width']) +
          cssValueToPixels(style['padding-left']) +
          cssValueToPixels(style['padding-right']) +
          cssValueToPixels(style['width']);
    },

    /**
     *
     * @param elem
     */
    getHeight: function(elem) {

      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-top-width']) +
          cssValueToPixels(style['border-bottom-width']) +
          cssValueToPixels(style['padding-top']) +
          cssValueToPixels(style['padding-bottom']) +
          cssValueToPixels(style['height']);
    },

    /**
     *
     * @param elem
     */
    getOffset: function(elem) {
      var offset = {left: 0, top:0};
      if (elem.offsetParent) {
        do {
          offset.left += elem.offsetLeft;
          offset.top += elem.offsetTop;
        } while (elem = elem.offsetParent);
      }
      return offset;
    },

    // http://stackoverflow.com/posts/2684561/revisions
    /**
     * 
     * @param elem
     */
    isActive: function(elem) {
      return elem === document.activeElement && ( elem.type || elem.href );
    }

  };

  return dom;

})(dat.utils.common);


dat.controllers.OptionController = (function (Controller, dom, common) {

  /**
   * @class Provides a select input to alter the property of an object, using a
   * list of accepted values.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object|string[]} options A map of labels to acceptable values, or
   * a list of acceptable string values.
   *
   * @member dat.controllers
   */
  var OptionController = function(object, property, options) {

    OptionController.superclass.call(this, object, property);

    var _this = this;

    /**
     * The drop down menu
     * @ignore
     */
    this.__select = document.createElement('select');

    if (common.isArray(options)) {
      var map = {};
      common.each(options, function(element) {
        map[element] = element;
      });
      options = map;
    }

    common.each(options, function(value, key) {

      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);

    });

    // Acknowledge original value
    this.updateDisplay();

    dom.bind(this.__select, 'change', function() {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });

    this.domElement.appendChild(this.__select);

  };

  OptionController.superclass = Controller;

  common.extend(

      OptionController.prototype,
      Controller.prototype,

      {

        setValue: function(v) {
          var toReturn = OptionController.superclass.prototype.setValue.call(this, v);
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          return toReturn;
        },

        updateDisplay: function() {
          this.__select.value = this.getValue();
          return OptionController.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  return OptionController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.controllers.NumberController = (function (Controller, common) {

  /**
   * @class Represents a given property of an object that is a number.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberController = function(object, property, params) {

    NumberController.superclass.call(this, object, property);

    params = params || {};

    this.__min = params.min;
    this.__max = params.max;
    this.__step = params.step;

    if (common.isUndefined(this.__step)) {

      if (this.initialValue == 0) {
        this.__impliedStep = 1; // What are we, psychics?
      } else {
        // Hey Doug, check this out.
        this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue)/Math.LN10))/10;
      }

    } else {

      this.__impliedStep = this.__step;

    }

    this.__precision = numDecimals(this.__impliedStep);


  };

  NumberController.superclass = Controller;

  common.extend(

      NumberController.prototype,
      Controller.prototype,

      /** @lends dat.controllers.NumberController.prototype */
      {

        setValue: function(v) {

          if (this.__min !== undefined && v < this.__min) {
            v = this.__min;
          } else if (this.__max !== undefined && v > this.__max) {
            v = this.__max;
          }

          if (this.__step !== undefined && v % this.__step != 0) {
            v = Math.round(v / this.__step) * this.__step;
          }

          return NumberController.superclass.prototype.setValue.call(this, v);

        },

        /**
         * Specify a minimum value for <code>object[property]</code>.
         *
         * @param {Number} minValue The minimum value for
         * <code>object[property]</code>
         * @returns {dat.controllers.NumberController} this
         */
        min: function(v) {
          this.__min = v;
          return this;
        },

        /**
         * Specify a maximum value for <code>object[property]</code>.
         *
         * @param {Number} maxValue The maximum value for
         * <code>object[property]</code>
         * @returns {dat.controllers.NumberController} this
         */
        max: function(v) {
          this.__max = v;
          return this;
        },

        /**
         * Specify a step value that dat.controllers.NumberController
         * increments by.
         *
         * @param {Number} stepValue The step value for
         * dat.controllers.NumberController
         * @default if minimum and maximum specified increment is 1% of the
         * difference otherwise stepValue is 1
         * @returns {dat.controllers.NumberController} this
         */
        step: function(v) {
          this.__step = v;
          return this;
        }

      }

  );

  function numDecimals(x) {
    x = x.toString();
    if (x.indexOf('.') > -1) {
      return x.length - x.indexOf('.') - 1;
    } else {
      return 0;
    }
  }

  return NumberController;

})(dat.controllers.Controller,
dat.utils.common);


dat.controllers.NumberControllerBox = (function (NumberController, dom, common) {

  /**
   * @class Represents a given property of an object that is a number and
   * provides an input element with which to manipulate it.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberControllerBox = function(object, property, params) {

    this.__truncationSuspended = false;

    NumberControllerBox.superclass.call(this, object, property, params);

    var _this = this;

    /**
     * {Number} Previous mouse y position
     * @ignore
     */
    var prev_y;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    // Makes it so manually specified values are not truncated.

    dom.bind(this.__input, 'change', onChange);
    dom.bind(this.__input, 'blur', onBlur);
    dom.bind(this.__input, 'mousedown', onMouseDown);
    dom.bind(this.__input, 'keydown', function(e) {

      // When pressing entire, you can be as precise as you want.
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
      }

    });

    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!common.isNaN(attempted)) _this.setValue(attempted);
    }

    function onBlur() {
      onChange();
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prev_y = e.clientY;
    }

    function onMouseDrag(e) {

      var diff = prev_y - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);

      prev_y = e.clientY;

    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);

  };

  NumberControllerBox.superclass = NumberController;

  common.extend(

      NumberControllerBox.prototype,
      NumberController.prototype,

      {

        updateDisplay: function() {

          this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
          return NumberControllerBox.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  function roundToDecimal(value, decimals) {
    var tenTo = Math.pow(10, decimals);
    return Math.round(value * tenTo) / tenTo;
  }

  return NumberControllerBox;

})(dat.controllers.NumberController,
dat.dom.dom,
dat.utils.common);


dat.controllers.NumberControllerSlider = (function (NumberController, dom, css, common, styleSheet) {

  /**
   * @class Represents a given property of an object that is a number, contains
   * a minimum and maximum, and provides a slider element with which to
   * manipulate it. It should be noted that the slider element is made up of
   * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
   * <code>&lt;slider&gt;</code> element.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   * 
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Number} minValue Minimum allowed value
   * @param {Number} maxValue Maximum allowed value
   * @param {Number} stepValue Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberControllerSlider = function(object, property, min, max, step) {

    NumberControllerSlider.superclass.call(this, object, property, { min: min, max: max, step: step });

    var _this = this;

    this.__background = document.createElement('div');
    this.__foreground = document.createElement('div');
    


    dom.bind(this.__background, 'mousedown', onMouseDown);
    
    dom.addClass(this.__background, 'slider');
    dom.addClass(this.__foreground, 'slider-fg');

    function onMouseDown(e) {

      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);

      onMouseDrag(e);
    }

    function onMouseDrag(e) {

      e.preventDefault();

      var offset = dom.getOffset(_this.__background);
      var width = dom.getWidth(_this.__background);
      
      _this.setValue(
        map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max)
      );

      return false;

    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.__background.appendChild(this.__foreground);
    this.domElement.appendChild(this.__background);

  };

  NumberControllerSlider.superclass = NumberController;

  /**
   * Injects default stylesheet for slider elements.
   */
  NumberControllerSlider.useDefaultStyles = function() {
    css.inject(styleSheet);
  };

  common.extend(

      NumberControllerSlider.prototype,
      NumberController.prototype,

      {

        updateDisplay: function() {
          var pct = (this.getValue() - this.__min)/(this.__max - this.__min);
          this.__foreground.style.width = pct*100+'%';
          return NumberControllerSlider.superclass.prototype.updateDisplay.call(this);
        }

      }



  );

  function map(v, i1, i2, o1, o2) {
    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
  }

  return NumberControllerSlider;
  
})(dat.controllers.NumberController,
dat.dom.dom,
dat.utils.css,
dat.utils.common,
".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");


dat.controllers.FunctionController = (function (Controller, dom, common) {

  /**
   * @class Provides a GUI interface to fire a specified method, a property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var FunctionController = function(object, property, text) {

    FunctionController.superclass.call(this, object, property);

    var _this = this;

    this.__button = document.createElement('div');
    this.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(this.__button, 'click', function(e) {
      e.preventDefault();
      _this.fire();
      return false;
    });

    dom.addClass(this.__button, 'button');

    this.domElement.appendChild(this.__button);


  };

  FunctionController.superclass = Controller;

  common.extend(

      FunctionController.prototype,
      Controller.prototype,
      {
        
        fire: function() {
          if (this.__onChange) {
            this.__onChange.call(this);
          }
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          this.getValue().call(this.object);
        }
      }

  );

  return FunctionController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.controllers.BooleanController = (function (Controller, dom, common) {

  /**
   * @class Provides a checkbox input to alter the boolean property of an object.
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var BooleanController = function(object, property) {

    BooleanController.superclass.call(this, object, property);

    var _this = this;
    this.__prev = this.getValue();

    this.__checkbox = document.createElement('input');
    this.__checkbox.setAttribute('type', 'checkbox');


    dom.bind(this.__checkbox, 'change', onChange, false);

    this.domElement.appendChild(this.__checkbox);

    // Match original value
    this.updateDisplay();

    function onChange() {
      _this.setValue(!_this.__prev);
    }

  };

  BooleanController.superclass = Controller;

  common.extend(

      BooleanController.prototype,
      Controller.prototype,

      {

        setValue: function(v) {
          var toReturn = BooleanController.superclass.prototype.setValue.call(this, v);
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          this.__prev = this.getValue();
          return toReturn;
        },

        updateDisplay: function() {
          
          if (this.getValue() === true) {
            this.__checkbox.setAttribute('checked', 'checked');
            this.__checkbox.checked = true;    
          } else {
              this.__checkbox.checked = false;
          }

          return BooleanController.superclass.prototype.updateDisplay.call(this);

        }


      }

  );

  return BooleanController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.color.toString = (function (common) {

  return function(color) {

    if (color.a == 1 || common.isUndefined(color.a)) {

      var s = color.hex.toString(16);
      while (s.length < 6) {
        s = '0' + s;
      }

      return '#' + s;

    } else {

      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

    }

  }

})(dat.utils.common);


dat.color.interpret = (function (toString, common) {

  var result, toReturn;

  var interpret = function() {

    toReturn = false;

    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

    common.each(INTERPRETATIONS, function(family) {

      if (family.litmus(original)) {

        common.each(family.conversions, function(conversion, conversionName) {

          result = conversion.read(original);

          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return common.BREAK;

          }

        });

        return common.BREAK;

      }

    });

    return toReturn;

  };

  var INTERPRETATIONS = [

    // Strings
    {

      litmus: common.isString,

      conversions: {

        THREE_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt(
                  '0x' +
                      test[1].toString() + test[1].toString() +
                      test[2].toString() + test[2].toString() +
                      test[3].toString() + test[3].toString())
            };

          },

          write: toString

        },

        SIX_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9]{6})$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt('0x' + test[1].toString())
            };

          },

          write: toString

        },

        CSS_RGB: {

          read: function(original) {

            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3])
            };

          },

          write: toString

        },

        CSS_RGBA: {

          read: function(original) {

            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3]),
              a: parseFloat(test[4])
            };

          },

          write: toString

        }

      }

    },

    // Numbers
    {

      litmus: common.isNumber,

      conversions: {

        HEX: {
          read: function(original) {
            return {
              space: 'HEX',
              hex: original,
              conversionName: 'HEX'
            }
          },

          write: function(color) {
            return color.hex;
          }
        }

      }

    },

    // Arrays
    {

      litmus: common.isArray,

      conversions: {

        RGB_ARRAY: {
          read: function(original) {
            if (original.length != 3) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b];
          }

        },

        RGBA_ARRAY: {
          read: function(original) {
            if (original.length != 4) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2],
              a: original[3]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b, color.a];
          }

        }

      }

    },

    // Objects
    {

      litmus: common.isObject,

      conversions: {

        RGBA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b) &&
                common.isNumber(original.a)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b,
              a: color.a
            }
          }
        },

        RGB_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b
            }
          }
        },

        HSVA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v) &&
                common.isNumber(original.a)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v,
              a: color.a
            }
          }
        },

        HSV_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v
            }
          }

        }

      }

    }


  ];

  return interpret;


})(dat.color.toString,
dat.utils.common);


dat.GUI = dat.gui.GUI = (function (css, saveDialogueContents, styleSheet, controllerFactory, Controller, BooleanController, FunctionController, NumberControllerBox, NumberControllerSlider, OptionController, ColorController, requestAnimationFrame, CenteredDiv, dom, common) {

  css.inject(styleSheet);

  /** Outer-most className for GUI's */
  var CSS_NAMESPACE = 'dg';

  var HIDE_KEY_CODE = 72;

  /** The only value shared between the JS and SCSS. Use caution. */
  var CLOSE_BUTTON_HEIGHT = 20;

  var DEFAULT_DEFAULT_PRESET_NAME = 'Default';

  var SUPPORTS_LOCAL_STORAGE = (function() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  })();

  var SAVE_DIALOGUE;

  /** Have we yet to create an autoPlace GUI? */
  var auto_place_virgin = true;

  /** Fixed position div that auto place GUI's go inside */
  var auto_place_container;

  /** Are we hiding the GUI's ? */
  var hide = false;

  /** GUI's which should be hidden */
  var hideable_guis = [];

  /**
   * A lightweight controller library for JavaScript. It allows you to easily
   * manipulate variables and fire functions on the fly.
   * @class
   *
   * @member dat.gui
   *
   * @param {Object} [params]
   * @param {String} [params.name] The name of this GUI.
   * @param {Object} [params.load] JSON object representing the saved state of
   * this GUI.
   * @param {Boolean} [params.auto=true]
   * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
   * @param {Boolean} [params.closed] If true, starts closed
   */
  var GUI = function(params) {

    var _this = this;

    /**
     * Outermost DOM Element
     * @type DOMElement
     */
    this.domElement = document.createElement('div');
    this.__ul = document.createElement('ul');
    this.domElement.appendChild(this.__ul);

    dom.addClass(this.domElement, CSS_NAMESPACE);

    /**
     * Nested GUI's by name
     * @ignore
     */
    this.__folders = {};

    this.__controllers = [];

    /**
     * List of objects I'm remembering for save, only used in top level GUI
     * @ignore
     */
    this.__rememberedObjects = [];

    /**
     * Maps the index of remembered objects to a map of controllers, only used
     * in top level GUI.
     *
     * @private
     * @ignore
     *
     * @example
     * [
     *  {
     *    propertyName: Controller,
     *    anotherPropertyName: Controller
     *  },
     *  {
     *    propertyName: Controller
     *  }
     * ]
     */
    this.__rememberedObjectIndecesToControllers = [];

    this.__listening = [];

    params = params || {};

    // Default parameters
    params = common.defaults(params, {
      autoPlace: true,
      width: GUI.DEFAULT_WIDTH
    });

    params = common.defaults(params, {
      resizable: params.autoPlace,
      hideable: params.autoPlace
    });


    if (!common.isUndefined(params.load)) {

      // Explicit preset
      if (params.preset) params.load.preset = params.preset;

    } else {

      params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };

    }

    if (common.isUndefined(params.parent) && params.hideable) {
      hideable_guis.push(this);
    }

    // Only root level GUI's are resizable.
    params.resizable = common.isUndefined(params.parent) && params.resizable;


    if (params.autoPlace && common.isUndefined(params.scrollable)) {
      params.scrollable = true;
    }
//    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;

    // Not part of params because I don't want people passing this in via
    // constructor. Should be a 'remembered' value.
    var use_local_storage =
        SUPPORTS_LOCAL_STORAGE &&
            localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';

    Object.defineProperties(this,

        /** @lends dat.gui.GUI.prototype */
        {

          /**
           * The parent <code>GUI</code>
           * @type dat.gui.GUI
           */
          parent: {
            get: function() {
              return params.parent;
            }
          },

          scrollable: {
            get: function() {
              return params.scrollable;
            }
          },

          /**
           * Handles <code>GUI</code>'s element placement for you
           * @type Boolean
           */
          autoPlace: {
            get: function() {
              return params.autoPlace;
            }
          },

          /**
           * The identifier for a set of saved values
           * @type String
           */
          preset: {

            get: function() {
              if (_this.parent) {
                return _this.getRoot().preset;
              } else {
                return params.load.preset;
              }
            },

            set: function(v) {
              if (_this.parent) {
                _this.getRoot().preset = v;
              } else {
                params.load.preset = v;
              }
              setPresetSelectIndex(this);
              _this.revert();
            }

          },

          /**
           * The width of <code>GUI</code> element
           * @type Number
           */
          width: {
            get: function() {
              return params.width;
            },
            set: function(v) {
              params.width = v;
              setWidth(_this, v);
            }
          },

          /**
           * The name of <code>GUI</code>. Used for folders. i.e
           * a folder's name
           * @type String
           */
          name: {
            get: function() {
              return params.name;
            },
            set: function(v) {
              // TODO Check for collisions among sibling folders
              params.name = v;
              if (title_row_name) {
                title_row_name.innerHTML = params.name;
              }
            }
          },

          /**
           * Whether the <code>GUI</code> is collapsed or not
           * @type Boolean
           */
          closed: {
            get: function() {
              return params.closed;
            },
            set: function(v) {
              params.closed = v;
              if (params.closed) {
                dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
              } else {
                dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
              }
              // For browsers that aren't going to respect the CSS transition,
              // Lets just check our height against the window height right off
              // the bat.
              this.onResize();

              if (_this.__closeButton) {
                _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
              }
            }
          },

          /**
           * Contains all presets
           * @type Object
           */
          load: {
            get: function() {
              return params.load;
            }
          },

          /**
           * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
           * <code>remember</code>ing
           * @type Boolean
           */
          useLocalStorage: {

            get: function() {
              return use_local_storage;
            },
            set: function(bool) {
              if (SUPPORTS_LOCAL_STORAGE) {
                use_local_storage = bool;
                if (bool) {
                  dom.bind(window, 'unload', saveToLocalStorage);
                } else {
                  dom.unbind(window, 'unload', saveToLocalStorage);
                }
                localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
              }
            }

          }

        });

    // Are we a root level GUI?
    if (common.isUndefined(params.parent)) {

      params.closed = false;

      dom.addClass(this.domElement, GUI.CLASS_MAIN);
      dom.makeSelectable(this.domElement, false);

      // Are we supposed to be loading locally?
      if (SUPPORTS_LOCAL_STORAGE) {

        if (use_local_storage) {

          _this.useLocalStorage = true;

          var saved_gui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

          if (saved_gui) {
            params.load = JSON.parse(saved_gui);
          }

        }

      }

      this.__closeButton = document.createElement('div');
      this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
      this.domElement.appendChild(this.__closeButton);

      dom.bind(this.__closeButton, 'click', function() {

        _this.closed = !_this.closed;


      });


      // Oh, you're a nested GUI!
    } else {

      if (params.closed === undefined) {
        params.closed = true;
      }

      var title_row_name = document.createTextNode(params.name);
      dom.addClass(title_row_name, 'controller-name');

      var title_row = addRow(_this, title_row_name);

      var on_click_title = function(e) {
        e.preventDefault();
        _this.closed = !_this.closed;
        return false;
      };

      dom.addClass(this.__ul, GUI.CLASS_CLOSED);

      dom.addClass(title_row, 'title');
      dom.bind(title_row, 'click', on_click_title);

      if (!params.closed) {
        this.closed = false;
      }

    }

    if (params.autoPlace) {

      if (common.isUndefined(params.parent)) {

        if (auto_place_virgin) {
          auto_place_container = document.createElement('div');
          dom.addClass(auto_place_container, CSS_NAMESPACE);
          dom.addClass(auto_place_container, GUI.CLASS_AUTO_PLACE_CONTAINER);
          document.body.appendChild(auto_place_container);
          auto_place_virgin = false;
        }

        // Put it in the dom for you.
        auto_place_container.appendChild(this.domElement);

        // Apply the auto styles
        dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);

      }


      // Make it not elastic.
      if (!this.parent) setWidth(_this, params.width);

    }

    dom.bind(window, 'resize', function() { _this.onResize() });
    dom.bind(this.__ul, 'webkitTransitionEnd', function() { _this.onResize(); });
    dom.bind(this.__ul, 'transitionend', function() { _this.onResize() });
    dom.bind(this.__ul, 'oTransitionEnd', function() { _this.onResize() });
    this.onResize();


    if (params.resizable) {
      addResizeHandle(this);
    }

    function saveToLocalStorage() {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }

    var root = _this.getRoot();
    function resetWidth() {
        var root = _this.getRoot();
        root.width += 1;
        common.defer(function() {
          root.width -= 1;
        });
      }

      if (!params.parent) {
        resetWidth();
      }

  };

  GUI.toggleHide = function() {

    hide = !hide;
    common.each(hideable_guis, function(gui) {
      gui.domElement.style.zIndex = hide ? -999 : 999;
      gui.domElement.style.opacity = hide ? 0 : 1;
    });
  };

  GUI.CLASS_AUTO_PLACE = 'a';
  GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
  GUI.CLASS_MAIN = 'main';
  GUI.CLASS_CONTROLLER_ROW = 'cr';
  GUI.CLASS_TOO_TALL = 'taller-than-window';
  GUI.CLASS_CLOSED = 'closed';
  GUI.CLASS_CLOSE_BUTTON = 'close-button';
  GUI.CLASS_DRAG = 'drag';

  GUI.DEFAULT_WIDTH = 245;
  GUI.TEXT_CLOSED = 'Close Controls';
  GUI.TEXT_OPEN = 'Open Controls';

  dom.bind(window, 'keydown', function(e) {

    if (document.activeElement.type !== 'text' &&
        (e.which === HIDE_KEY_CODE || e.keyCode == HIDE_KEY_CODE)) {
      GUI.toggleHide();
    }

  }, false);

  common.extend(

      GUI.prototype,

      /** @lends dat.gui.GUI */
      {

        /**
         * @param object
         * @param property
         * @returns {dat.controllers.Controller} The new controller that was added.
         * @instance
         */
        add: function(object, property) {

          return add(
              this,
              object,
              property,
              {
                factoryArgs: Array.prototype.slice.call(arguments, 2)
              }
          );

        },

        /**
         * @param object
         * @param property
         * @returns {dat.controllers.ColorController} The new controller that was added.
         * @instance
         */
        addColor: function(object, property) {

          return add(
              this,
              object,
              property,
              {
                color: true
              }
          );

        },

        /**
         * @param controller
         * @instance
         */
        remove: function(controller) {

          // TODO listening?
          this.__ul.removeChild(controller.__li);
          this.__controllers.slice(this.__controllers.indexOf(controller), 1);
          var _this = this;
          common.defer(function() {
            _this.onResize();
          });

        },

        destroy: function() {

          if (this.autoPlace) {
            auto_place_container.removeChild(this.domElement);
          }

        },

        /**
         * @param name
         * @returns {dat.gui.GUI} The new folder.
         * @throws {Error} if this GUI already has a folder by the specified
         * name
         * @instance
         */
        addFolder: function(name) {

          // We have to prevent collisions on names in order to have a key
          // by which to remember saved values
          if (this.__folders[name] !== undefined) {
            throw new Error('You already have a folder in this GUI by the' +
                ' name "' + name + '"');
          }

          var new_gui_params = { name: name, parent: this };

          // We need to pass down the autoPlace trait so that we can
          // attach event listeners to open/close folder actions to
          // ensure that a scrollbar appears if the window is too short.
          new_gui_params.autoPlace = this.autoPlace;

          // Do we have saved appearance data for this folder?

          if (this.load && // Anything loaded?
              this.load.folders && // Was my parent a dead-end?
              this.load.folders[name]) { // Did daddy remember me?

            // Start me closed if I was closed
            new_gui_params.closed = this.load.folders[name].closed;

            // Pass down the loaded data
            new_gui_params.load = this.load.folders[name];

          }

          var gui = new GUI(new_gui_params);
          this.__folders[name] = gui;

          var li = addRow(this, gui.domElement);
          dom.addClass(li, 'folder');
          return gui;

        },

        open: function() {
          this.closed = false;
        },

        close: function() {
          this.closed = true;
        },

        onResize: function() {

          var root = this.getRoot();

          if (root.scrollable) {

            var top = dom.getOffset(root.__ul).top;
            var h = 0;

            common.each(root.__ul.childNodes, function(node) {
              if (! (root.autoPlace && node === root.__save_row))
                h += dom.getHeight(node);
            });

            if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
              dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
              root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
            } else {
              dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
              root.__ul.style.height = 'auto';
            }

          }

          if (root.__resize_handle) {
            common.defer(function() {
              root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
            });
          }

          if (root.__closeButton) {
            root.__closeButton.style.width = root.width + 'px';
          }

        },

        /**
         * Mark objects for saving. The order of these objects cannot change as
         * the GUI grows. When remembering new objects, append them to the end
         * of the list.
         *
         * @param {Object...} objects
         * @throws {Error} if not called on a top level GUI.
         * @instance
         */
        remember: function() {

          if (common.isUndefined(SAVE_DIALOGUE)) {
            SAVE_DIALOGUE = new CenteredDiv();
            SAVE_DIALOGUE.domElement.innerHTML = saveDialogueContents;
          }

          if (this.parent) {
            throw new Error("You can only call remember on a top level GUI.");
          }

          var _this = this;

          common.each(Array.prototype.slice.call(arguments), function(object) {
            if (_this.__rememberedObjects.length == 0) {
              addSaveMenu(_this);
            }
            if (_this.__rememberedObjects.indexOf(object) == -1) {
              _this.__rememberedObjects.push(object);
            }
          });

          if (this.autoPlace) {
            // Set save row width
            setWidth(this, this.width);
          }

        },

        /**
         * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
         * @instance
         */
        getRoot: function() {
          var gui = this;
          while (gui.parent) {
            gui = gui.parent;
          }
          return gui;
        },

        /**
         * @returns {Object} a JSON object representing the current state of
         * this GUI as well as its remembered properties.
         * @instance
         */
        getSaveObject: function() {

          var toReturn = this.load;

          toReturn.closed = this.closed;

          // Am I remembering any values?
          if (this.__rememberedObjects.length > 0) {

            toReturn.preset = this.preset;

            if (!toReturn.remembered) {
              toReturn.remembered = {};
            }

            toReturn.remembered[this.preset] = getCurrentPreset(this);

          }

          toReturn.folders = {};
          common.each(this.__folders, function(element, key) {
            toReturn.folders[key] = element.getSaveObject();
          });

          return toReturn;

        },

        save: function() {

          if (!this.load.remembered) {
            this.load.remembered = {};
          }

          this.load.remembered[this.preset] = getCurrentPreset(this);
          markPresetModified(this, false);

        },

        saveAs: function(presetName) {

          if (!this.load.remembered) {

            // Retain default values upon first save
            this.load.remembered = {};
            this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);

          }

          this.load.remembered[presetName] = getCurrentPreset(this);
          this.preset = presetName;
          addPresetOption(this, presetName, true);

        },

        revert: function(gui) {

          common.each(this.__controllers, function(controller) {
            // Make revert work on Default.
            if (!this.getRoot().load.remembered) {
              controller.setValue(controller.initialValue);
            } else {
              recallSavedValue(gui || this.getRoot(), controller);
            }
          }, this);

          common.each(this.__folders, function(folder) {
            folder.revert(folder);
          });

          if (!gui) {
            markPresetModified(this.getRoot(), false);
          }


        },

        listen: function(controller) {

          var init = this.__listening.length == 0;
          this.__listening.push(controller);
          if (init) updateDisplays(this.__listening);

        }

      }

  );

  function add(gui, object, property, params) {

    if (object[property] === undefined) {
      throw new Error("Object " + object + " has no property \"" + property + "\"");
    }

    var controller;

    if (params.color) {

      controller = new ColorController(object, property);

    } else {

      var factoryArgs = [object,property].concat(params.factoryArgs);
      controller = controllerFactory.apply(gui, factoryArgs);

    }

    if (params.before instanceof Controller) {
      params.before = params.before.__li;
    }

    recallSavedValue(gui, controller);

    dom.addClass(controller.domElement, 'c');

    var name = document.createElement('span');
    dom.addClass(name, 'property-name');
    name.innerHTML = controller.property;

    var container = document.createElement('div');
    container.appendChild(name);
    container.appendChild(controller.domElement);

    var li = addRow(gui, container, params.before);

    dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
    dom.addClass(li, typeof controller.getValue());

    augmentController(gui, li, controller);

    gui.__controllers.push(controller);

    return controller;

  }

  /**
   * Add a row to the end of the GUI or before another row.
   *
   * @param gui
   * @param [dom] If specified, inserts the dom content in the new row
   * @param [liBefore] If specified, places the new row before another row
   */
  function addRow(gui, dom, liBefore) {
    var li = document.createElement('li');
    if (dom) li.appendChild(dom);
    if (liBefore) {
      gui.__ul.insertBefore(li, params.before);
    } else {
      gui.__ul.appendChild(li);
    }
    gui.onResize();
    return li;
  }

  function augmentController(gui, li, controller) {

    controller.__li = li;
    controller.__gui = gui;

    common.extend(controller, {

      options: function(options) {

        if (arguments.length > 1) {
          controller.remove();

          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [common.toArray(arguments)]
              }
          );

        }

        if (common.isArray(options) || common.isObject(options)) {
          controller.remove();

          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [options]
              }
          );

        }

      },

      name: function(v) {
        controller.__li.firstElementChild.firstElementChild.innerHTML = v;
        return controller;
      },

      listen: function() {
        controller.__gui.listen(controller);
        return controller;
      },

      remove: function() {
        controller.__gui.remove(controller);
        return controller;
      }

    });

    // All sliders should be accompanied by a box.
    if (controller instanceof NumberControllerSlider) {

      var box = new NumberControllerBox(controller.object, controller.property,
          { min: controller.__min, max: controller.__max, step: controller.__step });

      common.each(['updateDisplay', 'onChange', 'onFinishChange'], function(method) {
        var pc = controller[method];
        var pb = box[method];
        controller[method] = box[method] = function() {
          var args = Array.prototype.slice.call(arguments);
          pc.apply(controller, args);
          return pb.apply(box, args);
        }
      });

      dom.addClass(li, 'has-slider');
      controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);

    }
    else if (controller instanceof NumberControllerBox) {

      var r = function(returned) {

        // Have we defined both boundaries?
        if (common.isNumber(controller.__min) && common.isNumber(controller.__max)) {

          // Well, then lets just replace this with a slider.
          controller.remove();
          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [controller.__min, controller.__max, controller.__step]
              });

        }

        return returned;

      };

      controller.min = common.compose(r, controller.min);
      controller.max = common.compose(r, controller.max);

    }
    else if (controller instanceof BooleanController) {

      dom.bind(li, 'click', function() {
        dom.fakeEvent(controller.__checkbox, 'click');
      });

      dom.bind(controller.__checkbox, 'click', function(e) {
        e.stopPropagation(); // Prevents double-toggle
      })

    }
    else if (controller instanceof FunctionController) {

      dom.bind(li, 'click', function() {
        dom.fakeEvent(controller.__button, 'click');
      });

      dom.bind(li, 'mouseover', function() {
        dom.addClass(controller.__button, 'hover');
      });

      dom.bind(li, 'mouseout', function() {
        dom.removeClass(controller.__button, 'hover');
      });

    }
    else if (controller instanceof ColorController) {

      dom.addClass(li, 'color');
      controller.updateDisplay = common.compose(function(r) {
        li.style.borderLeftColor = controller.__color.toString();
        return r;
      }, controller.updateDisplay);

      controller.updateDisplay();

    }

    controller.setValue = common.compose(function(r) {
      if (gui.getRoot().__preset_select && controller.isModified()) {
        markPresetModified(gui.getRoot(), true);
      }
      return r;
    }, controller.setValue);

  }

  function recallSavedValue(gui, controller) {

    // Find the topmost GUI, that's where remembered objects live.
    var root = gui.getRoot();

    // Does the object we're controlling match anything we've been told to
    // remember?
    var matched_index = root.__rememberedObjects.indexOf(controller.object);

    // Why yes, it does!
    if (matched_index != -1) {

      // Let me fetch a map of controllers for thcommon.isObject.
      var controller_map =
          root.__rememberedObjectIndecesToControllers[matched_index];

      // Ohp, I believe this is the first controller we've created for this
      // object. Lets make the map fresh.
      if (controller_map === undefined) {
        controller_map = {};
        root.__rememberedObjectIndecesToControllers[matched_index] =
            controller_map;
      }

      // Keep track of this controller
      controller_map[controller.property] = controller;

      // Okay, now have we saved any values for this controller?
      if (root.load && root.load.remembered) {

        var preset_map = root.load.remembered;

        // Which preset are we trying to load?
        var preset;

        if (preset_map[gui.preset]) {

          preset = preset_map[gui.preset];

        } else if (preset_map[DEFAULT_DEFAULT_PRESET_NAME]) {

          // Uhh, you can have the default instead?
          preset = preset_map[DEFAULT_DEFAULT_PRESET_NAME];

        } else {

          // Nada.

          return;

        }


        // Did the loaded object remember thcommon.isObject?
        if (preset[matched_index] &&

          // Did we remember this particular property?
            preset[matched_index][controller.property] !== undefined) {

          // We did remember something for this guy ...
          var value = preset[matched_index][controller.property];

          // And that's what it is.
          controller.initialValue = value;
          controller.setValue(value);

        }

      }

    }

  }

  function getLocalStorageHash(gui, key) {
    // TODO how does this deal with multiple GUI's?
    return document.location.href + '.' + key;

  }

  function addSaveMenu(gui) {

    var div = gui.__save_row = document.createElement('li');

    dom.addClass(gui.domElement, 'has-save');

    gui.__ul.insertBefore(div, gui.__ul.firstChild);

    dom.addClass(div, 'save-row');

    var gears = document.createElement('span');
    gears.innerHTML = '&nbsp;';
    dom.addClass(gears, 'button gears');

    // TODO replace with FunctionController
    var button = document.createElement('span');
    button.innerHTML = 'Save';
    dom.addClass(button, 'button');
    dom.addClass(button, 'save');

    var button2 = document.createElement('span');
    button2.innerHTML = 'New';
    dom.addClass(button2, 'button');
    dom.addClass(button2, 'save-as');

    var button3 = document.createElement('span');
    button3.innerHTML = 'Revert';
    dom.addClass(button3, 'button');
    dom.addClass(button3, 'revert');

    var select = gui.__preset_select = document.createElement('select');

    if (gui.load && gui.load.remembered) {

      common.each(gui.load.remembered, function(value, key) {
        addPresetOption(gui, key, key == gui.preset);
      });

    } else {
      addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
    }

    dom.bind(select, 'change', function() {


      for (var index = 0; index < gui.__preset_select.length; index++) {
        gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
      }

      gui.preset = this.value;

    });

    div.appendChild(select);
    div.appendChild(gears);
    div.appendChild(button);
    div.appendChild(button2);
    div.appendChild(button3);

    if (SUPPORTS_LOCAL_STORAGE) {

      var saveLocally = document.getElementById('dg-save-locally');
      var explain = document.getElementById('dg-local-explain');

      saveLocally.style.display = 'block';

      var localStorageCheckBox = document.getElementById('dg-local-storage');

      if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
        localStorageCheckBox.setAttribute('checked', 'checked');
      }

      function showHideExplain() {
        explain.style.display = gui.useLocalStorage ? 'block' : 'none';
      }

      showHideExplain();

      // TODO: Use a boolean controller, fool!
      dom.bind(localStorageCheckBox, 'change', function() {
        gui.useLocalStorage = !gui.useLocalStorage;
        showHideExplain();
      });

    }

    var newConstructorTextArea = document.getElementById('dg-new-constructor');

    dom.bind(newConstructorTextArea, 'keydown', function(e) {
      if (e.metaKey && (e.which === 67 || e.keyCode == 67)) {
        SAVE_DIALOGUE.hide();
      }
    });

    dom.bind(gears, 'click', function() {
      newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
      SAVE_DIALOGUE.show();
      newConstructorTextArea.focus();
      newConstructorTextArea.select();
    });

    dom.bind(button, 'click', function() {
      gui.save();
    });

    dom.bind(button2, 'click', function() {
      var presetName = prompt('Enter a new preset name.');
      if (presetName) gui.saveAs(presetName);
    });

    dom.bind(button3, 'click', function() {
      gui.revert();
    });

//    div.appendChild(button2);

  }

  function addResizeHandle(gui) {

    gui.__resize_handle = document.createElement('div');

    common.extend(gui.__resize_handle.style, {

      width: '6px',
      marginLeft: '-3px',
      height: '200px',
      cursor: 'ew-resize',
      position: 'absolute'
//      border: '1px solid blue'

    });

    var pmouseX;

    dom.bind(gui.__resize_handle, 'mousedown', dragStart);
    dom.bind(gui.__closeButton, 'mousedown', dragStart);

    gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);

    function dragStart(e) {

      e.preventDefault();

      pmouseX = e.clientX;

      dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.bind(window, 'mousemove', drag);
      dom.bind(window, 'mouseup', dragStop);

      return false;

    }

    function drag(e) {

      e.preventDefault();

      gui.width += pmouseX - e.clientX;
      gui.onResize();
      pmouseX = e.clientX;

      return false;

    }

    function dragStop() {

      dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.unbind(window, 'mousemove', drag);
      dom.unbind(window, 'mouseup', dragStop);

    }

  }

  function setWidth(gui, w) {
    gui.domElement.style.width = w + 'px';
    // Auto placed save-rows are position fixed, so we have to
    // set the width manually if we want it to bleed to the edge
    if (gui.__save_row && gui.autoPlace) {
      gui.__save_row.style.width = w + 'px';
    }if (gui.__closeButton) {
      gui.__closeButton.style.width = w + 'px';
    }
  }

  function getCurrentPreset(gui, useInitialValues) {

    var toReturn = {};

    // For each object I'm remembering
    common.each(gui.__rememberedObjects, function(val, index) {

      var saved_values = {};

      // The controllers I've made for thcommon.isObject by property
      var controller_map =
          gui.__rememberedObjectIndecesToControllers[index];

      // Remember each value for each property
      common.each(controller_map, function(controller, property) {
        saved_values[property] = useInitialValues ? controller.initialValue : controller.getValue();
      });

      // Save the values for thcommon.isObject
      toReturn[index] = saved_values;

    });

    return toReturn;

  }

  function addPresetOption(gui, name, setSelected) {
    var opt = document.createElement('option');
    opt.innerHTML = name;
    opt.value = name;
    gui.__preset_select.appendChild(opt);
    if (setSelected) {
      gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
    }
  }

  function setPresetSelectIndex(gui) {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      if (gui.__preset_select[index].value == gui.preset) {
        gui.__preset_select.selectedIndex = index;
      }
    }
  }

  function markPresetModified(gui, modified) {
    var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
//    console.log('mark', modified, opt);
    if (modified) {
      opt.innerHTML = opt.value + "*";
    } else {
      opt.innerHTML = opt.value;
    }
  }

  function updateDisplays(controllerArray) {


    if (controllerArray.length != 0) {

      requestAnimationFrame(function() {
        updateDisplays(controllerArray);
      });

    }

    common.each(controllerArray, function(c) {
      c.updateDisplay();
    });

  }

  return GUI;

})(dat.utils.css,
"<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>",
".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
dat.controllers.factory = (function (OptionController, NumberControllerBox, NumberControllerSlider, StringController, FunctionController, BooleanController, common) {

      return function(object, property) {

        var initialValue = object[property];

        // Providing options?
        if (common.isArray(arguments[2]) || common.isObject(arguments[2])) {
          return new OptionController(object, property, arguments[2]);
        }

        // Providing a map?

        if (common.isNumber(initialValue)) {

          if (common.isNumber(arguments[2]) && common.isNumber(arguments[3])) {

            // Has min and max.
            return new NumberControllerSlider(object, property, arguments[2], arguments[3]);

          } else {

            return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });

          }

        }

        if (common.isString(initialValue)) {
          return new StringController(object, property);
        }

        if (common.isFunction(initialValue)) {
          return new FunctionController(object, property, '');
        }

        if (common.isBoolean(initialValue)) {
          return new BooleanController(object, property);
        }

      }

    })(dat.controllers.OptionController,
dat.controllers.NumberControllerBox,
dat.controllers.NumberControllerSlider,
dat.controllers.StringController = (function (Controller, dom, common) {

  /**
   * @class Provides a text input to alter the string property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var StringController = function(object, property) {

    StringController.superclass.call(this, object, property);

    var _this = this;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    dom.bind(this.__input, 'keyup', onChange);
    dom.bind(this.__input, 'change', onChange);
    dom.bind(this.__input, 'blur', onBlur);
    dom.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    

    function onChange() {
      _this.setValue(_this.__input.value);
    }

    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);

  };

  StringController.superclass = Controller;

  common.extend(

      StringController.prototype,
      Controller.prototype,

      {

        updateDisplay: function() {
          // Stops the caret from moving on account of:
          // keyup -> setValue -> updateDisplay
          if (!dom.isActive(this.__input)) {
            this.__input.value = this.getValue();
          }
          return StringController.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  return StringController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common),
dat.controllers.FunctionController,
dat.controllers.BooleanController,
dat.utils.common),
dat.controllers.Controller,
dat.controllers.BooleanController,
dat.controllers.FunctionController,
dat.controllers.NumberControllerBox,
dat.controllers.NumberControllerSlider,
dat.controllers.OptionController,
dat.controllers.ColorController = (function (Controller, dom, Color, interpret, common) {

  var ColorController = function(object, property) {

    ColorController.superclass.call(this, object, property);

    this.__color = new Color(this.getValue());
    this.__temp = new Color(0);

    var _this = this;

    this.domElement = document.createElement('div');

    dom.makeSelectable(this.domElement, false);

    this.__selector = document.createElement('div');
    this.__selector.className = 'selector';

    this.__saturation_field = document.createElement('div');
    this.__saturation_field.className = 'saturation-field';

    this.__field_knob = document.createElement('div');
    this.__field_knob.className = 'field-knob';
    this.__field_knob_border = '2px solid ';

    this.__hue_knob = document.createElement('div');
    this.__hue_knob.className = 'hue-knob';

    this.__hue_field = document.createElement('div');
    this.__hue_field.className = 'hue-field';

    this.__input = document.createElement('input');
    this.__input.type = 'text';
    this.__input_textShadow = '0 1px 1px ';

    dom.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) { // on enter
        onBlur.call(this);
      }
    });

    dom.bind(this.__input, 'blur', onBlur);

    dom.bind(this.__selector, 'mousedown', function(e) {

      dom
        .addClass(this, 'drag')
        .bind(window, 'mouseup', function(e) {
          dom.removeClass(_this.__selector, 'drag');
        });

    });

    var value_field = document.createElement('div');

    common.extend(this.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });

    common.extend(this.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: this.__field_knob_border + (this.__color.v < .5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    
    common.extend(this.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });

    common.extend(this.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });

    common.extend(value_field.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    
    linearGradient(value_field, 'top', 'rgba(0,0,0,0)', '#000');

    common.extend(this.__hue_field.style, {
      width: '15px',
      height: '100px',
      display: 'inline-block',
      border: '1px solid #555',
      cursor: 'ns-resize'
    });

    hueGradient(this.__hue_field);

    common.extend(this.__input.style, {
      outline: 'none',
//      width: '120px',
      textAlign: 'center',
//      padding: '4px',
//      marginBottom: '6px',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)'
    });

    dom.bind(this.__saturation_field, 'mousedown', fieldDown);
    dom.bind(this.__field_knob, 'mousedown', fieldDown);

    dom.bind(this.__hue_field, 'mousedown', function(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'mouseup', unbindH);
    });

    function fieldDown(e) {
      setSV(e);
      // document.body.style.cursor = 'none';
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'mouseup', unbindSV);
    }

    function unbindSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'mouseup', unbindSV);
      // document.body.style.cursor = 'default';
    }

    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }

    function unbindH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'mouseup', unbindH);
    }

    this.__saturation_field.appendChild(value_field);
    this.__selector.appendChild(this.__field_knob);
    this.__selector.appendChild(this.__saturation_field);
    this.__selector.appendChild(this.__hue_field);
    this.__hue_field.appendChild(this.__hue_knob);

    this.domElement.appendChild(this.__input);
    this.domElement.appendChild(this.__selector);

    this.updateDisplay();

    function setSV(e) {

      e.preventDefault();

      var w = dom.getWidth(_this.__saturation_field);
      var o = dom.getOffset(_this.__saturation_field);
      var s = (e.clientX - o.left + document.body.scrollLeft) / w;
      var v = 1 - (e.clientY - o.top + document.body.scrollTop) / w;

      if (v > 1) v = 1;
      else if (v < 0) v = 0;

      if (s > 1) s = 1;
      else if (s < 0) s = 0;

      _this.__color.v = v;
      _this.__color.s = s;

      _this.setValue(_this.__color.toOriginal());


      return false;

    }

    function setH(e) {

      e.preventDefault();

      var s = dom.getHeight(_this.__hue_field);
      var o = dom.getOffset(_this.__hue_field);
      var h = 1 - (e.clientY - o.top + document.body.scrollTop) / s;

      if (h > 1) h = 1;
      else if (h < 0) h = 0;

      _this.__color.h = h * 360;

      _this.setValue(_this.__color.toOriginal());

      return false;

    }

  };

  ColorController.superclass = Controller;

  common.extend(

      ColorController.prototype,
      Controller.prototype,

      {

        updateDisplay: function() {

          var i = interpret(this.getValue());

          if (i !== false) {

            var mismatch = false;

            // Check for mismatch on the interpreted value.

            common.each(Color.COMPONENTS, function(component) {
              if (!common.isUndefined(i[component]) &&
                  !common.isUndefined(this.__color.__state[component]) &&
                  i[component] !== this.__color.__state[component]) {
                mismatch = true;
                return {}; // break
              }
            }, this);

            // If nothing diverges, we keep our previous values
            // for statefulness, otherwise we recalculate fresh
            if (mismatch) {
              common.extend(this.__color.__state, i);
            }

          }

          common.extend(this.__temp.__state, this.__color.__state);

          this.__temp.a = 1;

          var flip = (this.__color.v < .5 || this.__color.s > .5) ? 255 : 0;
          var _flip = 255 - flip;

          common.extend(this.__field_knob.style, {
            marginLeft: 100 * this.__color.s - 7 + 'px',
            marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
            backgroundColor: this.__temp.toString(),
            border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip +')'
          });

          this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px'

          this.__temp.s = 1;
          this.__temp.v = 1;

          linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toString());

          common.extend(this.__input.style, {
            backgroundColor: this.__input.value = this.__color.toString(),
            color: 'rgb(' + flip + ',' + flip + ',' + flip +')',
            textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip +',.7)'
          });

        }

      }

  );
  
  var vendors = ['-moz-','-o-','-webkit-','-ms-',''];
  
  function linearGradient(elem, x, a, b) {
    elem.style.background = '';
    common.each(vendors, function(vendor) {
      elem.style.cssText += 'background: ' + vendor + 'linear-gradient('+x+', '+a+' 0%, ' + b + ' 100%); ';
    });
  }
  
  function hueGradient(elem) {
    elem.style.background = '';
    elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'
    elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
  }


  return ColorController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.color.Color = (function (interpret, math, toString, common) {

  var Color = function() {

    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw 'Failed to interpret color arguments';
    }

    this.__state.a = this.__state.a || 1;


  };

  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

  common.extend(Color.prototype, {

    toString: function() {
      return toString(this);
    },

    toOriginal: function() {
      return this.__state.conversion.write(this);
    }

  });

  defineRGBComponent(Color.prototype, 'r', 2);
  defineRGBComponent(Color.prototype, 'g', 1);
  defineRGBComponent(Color.prototype, 'b', 0);

  defineHSVComponent(Color.prototype, 'h');
  defineHSVComponent(Color.prototype, 's');
  defineHSVComponent(Color.prototype, 'v');

  Object.defineProperty(Color.prototype, 'a', {

    get: function() {
      return this.__state.a;
    },

    set: function(v) {
      this.__state.a = v;
    }

  });

  Object.defineProperty(Color.prototype, 'hex', {

    get: function() {

      if (!this.__state.space !== 'HEX') {
        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
      }

      return this.__state.hex;

    },

    set: function(v) {

      this.__state.space = 'HEX';
      this.__state.hex = v;

    }

  });

  function defineRGBComponent(target, component, componentHexIndex) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'RGB') {
          return this.__state[component];
        }

        recalculateRGB(this, component, componentHexIndex);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'RGB') {
          recalculateRGB(this, component, componentHexIndex);
          this.__state.space = 'RGB';
        }

        this.__state[component] = v;

      }

    });

  }

  function defineHSVComponent(target, component) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'HSV')
          return this.__state[component];

        recalculateHSV(this);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'HSV') {
          recalculateHSV(this);
          this.__state.space = 'HSV';
        }

        this.__state[component] = v;

      }

    });

  }

  function recalculateRGB(color, component, componentHexIndex) {

    if (color.__state.space === 'HEX') {

      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

    } else if (color.__state.space === 'HSV') {

      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

    } else {

      throw 'Corrupted color state';

    }

  }

  function recalculateHSV(color) {

    var result = math.rgb_to_hsv(color.r, color.g, color.b);

    common.extend(color.__state,
        {
          s: result.s,
          v: result.v
        }
    );

    if (!common.isNaN(result.h)) {
      color.__state.h = result.h;
    } else if (common.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }

  }

  return Color;

})(dat.color.interpret,
dat.color.math = (function () {

  var tmpComponent;

  return {

    hsv_to_rgb: function(h, s, v) {

      var hi = Math.floor(h / 60) % 6;

      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1.0 - s);
      var q = v * (1.0 - (f * s));
      var t = v * (1.0 - ((1.0 - f) * s));
      var c = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
      ][hi];

      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };

    },

    rgb_to_hsv: function(r, g, b) {

      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s;

      if (max != 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }

      if (r == max) {
        h = (g - b) / delta;
      } else if (g == max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }

      return {
        h: h * 360,
        s: s,
        v: max / 255
      };
    },

    rgb_to_hex: function(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },

    component_from_hex: function(hex, componentIndex) {
      return (hex >> (componentIndex * 8)) & 0xFF;
    },

    hex_with_component: function(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
    }

  }

})(),
dat.color.toString,
dat.utils.common),
dat.color.interpret,
dat.utils.common),
dat.utils.requestAnimationFrame = (function () {

  /**
   * requirejs version of Paul Irish's RequestAnimationFrame
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   */

  return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback, element) {

        window.setTimeout(callback, 1000 / 60);

      };
})(),
dat.dom.CenteredDiv = (function (dom, common) {


  var CenteredDiv = function() {

    this.backgroundElement = document.createElement('div');
    common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear'
    });

    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';

    this.domElement = document.createElement('div');
    common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear'
    });


    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);

    var _this = this;
    dom.bind(this.backgroundElement, 'click', function() {
      _this.hide();
    });


  };

  CenteredDiv.prototype.show = function() {

    var _this = this;
    


    this.backgroundElement.style.display = 'block';

    this.domElement.style.display = 'block';
    this.domElement.style.opacity = 0;
//    this.domElement.style.top = '52%';
    this.domElement.style.webkitTransform = 'scale(1.1)';

    this.layout();

    common.defer(function() {
      _this.backgroundElement.style.opacity = 1;
      _this.domElement.style.opacity = 1;
      _this.domElement.style.webkitTransform = 'scale(1)';
    });

  };

  CenteredDiv.prototype.hide = function() {

    var _this = this;

    var hide = function() {

      _this.domElement.style.display = 'none';
      _this.backgroundElement.style.display = 'none';

      dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
      dom.unbind(_this.domElement, 'transitionend', hide);
      dom.unbind(_this.domElement, 'oTransitionEnd', hide);

    };

    dom.bind(this.domElement, 'webkitTransitionEnd', hide);
    dom.bind(this.domElement, 'transitionend', hide);
    dom.bind(this.domElement, 'oTransitionEnd', hide);

    this.backgroundElement.style.opacity = 0;
//    this.domElement.style.top = '48%';
    this.domElement.style.opacity = 0;
    this.domElement.style.webkitTransform = 'scale(1.1)';

  };

  CenteredDiv.prototype.layout = function() {
    this.domElement.style.left = window.innerWidth/2 - dom.getWidth(this.domElement) / 2 + 'px';
    this.domElement.style.top = window.innerHeight/2 - dom.getHeight(this.domElement) / 2 + 'px';
  };
  
  function lockScroll(e) {
    console.log(e);
  }

  return CenteredDiv;

})(dat.dom.dom,
dat.utils.common),
dat.dom.dom,
dat.utils.common);
},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alfrid = require('../../../../build/alfrid.js');

var _alfrid2 = _interopRequireDefault(_alfrid);

var _ViewCube = require('./ViewCube');

var _ViewCube2 = _interopRequireDefault(_ViewCube);

var _ViewSave = require('./ViewSave');

var _ViewSave2 = _interopRequireDefault(_ViewSave);

var _ViewRender = require('./ViewRender');

var _ViewRender2 = _interopRequireDefault(_ViewRender);

var _ViewSimulation = require('./ViewSimulation');

var _ViewSimulation2 = _interopRequireDefault(_ViewSimulation);

var _ViewTestRender = require('./ViewTestRender');

var _ViewTestRender2 = _interopRequireDefault(_ViewTestRender);

var _ViewShadowRender = require('./ViewShadowRender');

var _ViewShadowRender2 = _interopRequireDefault(_ViewShadowRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // SceneApp.js


var GL = void 0;

var SceneApp = function (_alfrid$Scene) {
	_inherits(SceneApp, _alfrid$Scene);

	function SceneApp() {
		_classCallCheck(this, SceneApp);

		GL = _alfrid2.default.GL;
		GL.enableAlphaBlending();

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SceneApp).call(this));

		_this.lightPosition = [.5, 10, 1];
		_this._vLight.position = _this.lightPosition;
		_this.shadowMatrix = mat4.create();

		_this.cameraLight = new _alfrid2.default.CameraPerspective();
		var fov = 90 * Math.PI / 180;
		var near = .5;
		var far = 400;
		_this.camera.setPerspective(fov, GL.aspectRatio, near, far);
		_this.cameraLight.setPerspective(fov * 3, GL.aspectRatio, near, far);
		_this.cameraLight.lookAt(_this.lightPosition, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 1, 0));
		mat4.multiply(_this.shadowMatrix, _this.cameraLight.projection, _this.cameraLight.viewMatrix);

		_this.orbitalControl._rx.value = .6;
		_this.orbitalControl._ry.value = -.8;
		_this.orbitalControl.radius.value = 15.3;
		_this._count = 0;
		return _this;
	}

	_createClass(SceneApp, [{
		key: '_initTextures',
		value: function _initTextures() {
			console.log('Init textures');

			//	FBOS
			var numParticles = params.numParticles;
			var o = {
				minFilter: GL.NEAREST,
				magFilter: GL.NEAREST
			};
			this._fboCurrent = new _alfrid2.default.FrameBuffer(numParticles * 2, numParticles * 2, o);
			this._fboTarget = new _alfrid2.default.FrameBuffer(numParticles * 2, numParticles * 2, o);

			this._fboRender = new _alfrid2.default.FrameBuffer(GL.width, GL.height);
			this._fboShadowMap = new _alfrid2.default.FrameBuffer(1024, 1024);
		}
	}, {
		key: '_initViews',
		value: function _initViews() {
			console.log('Init Views');
			this._bAxis = new _alfrid2.default.BatchAxis();
			this._bDotsPlane = new _alfrid2.default.BatchDotsPlane();
			this._bCopy = new _alfrid2.default.BatchCopy();

			this._vSim = new _ViewSimulation2.default();
			this._vRender = new _ViewRender2.default();
			this._vShadowRender = new _ViewShadowRender2.default();
			this._vCube = new _ViewCube2.default([0, 0, 0], [1, 1, 1], [1, 1, .5]);
			this._vLight = new _ViewCube2.default([1, 15, 1], [.2, .2, .2], [1, 0, 0]);
			var grey = .9;
			this._vFloor = new _ViewCube2.default([0, -7, 0], [25, 0.1, 25], [grey, grey, grey * .98]);

			this._vTestRender = new _ViewTestRender2.default();

			//	SAVE INIT POSITIONS
			this._vSave = new _ViewSave2.default();
			GL.setMatrices(this.cameraOrtho);

			this._fboCurrent.bind();
			GL.clear(0, 0, 0, 0);
			this._vSave.render();

			this._fboCurrent.unbind();
			GL.viewport(0, 0, GL.width, GL.height);
			GL.setMatrices(this.camera);

			this.meshSphere = _alfrid2.default.Geom.sphere(1, 24);
			this.shaderColor = new _alfrid2.default.GLShader(_alfrid2.default.ShaderLibs.generalVert, _alfrid2.default.ShaderLibs.simpleColorFrag);
		}
	}, {
		key: 'updateFbo',
		value: function updateFbo() {
			GL.setMatrices(this.cameraOrtho);

			this._fboTarget.bind();
			GL.clear(0, 0, 0, 0);
			this._vSim.render(this._fboCurrent.getTexture());
			this._fboTarget.unbind();
			GL.viewport(0, 0, GL.width, GL.height);
			GL.setMatrices(this.camera);

			//	PING PONG
			var tmp = this._fboTarget;
			this._fboTarget = this._fboCurrent;
			this._fboCurrent = tmp;
		}
	}, {
		key: 'render',
		value: function render() {
			// this.lightPosition[0] = 0.5 + this._count * .1;
			var p = 0;

			if (this._count % params.skipCount === 0) {
				this._count = 0;
				this.updateFbo();
			}
			p = this._count / params.skipCount;
			this._count++;

			// this.orbitalControl._ry.value += -.02;

			//	DRAW SHADOW MAP

			this._fboShadowMap.bind();
			GL.clear(1, 1, 1, 1);
			GL.gl.depthFunc(GL.gl.LEQUAL);
			GL.setMatrices(this.cameraLight);
			// this._vFloor.render();
			this._vRender.render(this._fboTarget.getTexture(), this._fboCurrent.getTexture(), p);
			this._fboShadowMap.unbind();

			//	DRAW WITH SHADOW MAP

			GL.viewport(0, 0, GL.width, GL.height);
			GL.setMatrices(this.camera);

			// this._bAxis.draw();
			// this._bDotsPlane.draw();
			// this._vLight.render();
			// this._vFloor.render(this.shadowMatrix, this.lightPosition, this._fboShadowMap.getTexture());
			this._vShadowRender.render(this._fboTarget.getTexture(), this._fboCurrent.getTexture(), p, this._fboShadowMap.getTexture(), this.shadowMatrix, this.lightPosition);

			/*/
   GL.setMatrices(this.cameraOrtho);
   GL.disable(GL.DEPTH_TEST);
   let size = 256;
   GL.viewport(0, 0, size, size/GL.aspectRatio);
   this._bCopy.draw(this._fboShadowMap.getDepthTexture());
   GL.viewport(size, 0, size, size/GL.aspectRatio);
   this._bCopy.draw(this._fboShadowMap.getTexture());
   GL.enable(GL.DEPTH_TEST);
   /*/
		}
	}]);

	return SceneApp;
}(_alfrid2.default.Scene);

exports.default = SceneApp;

},{"../../../../build/alfrid.js":1,"./ViewCube":6,"./ViewRender":7,"./ViewSave":8,"./ViewShadowRender":9,"./ViewSimulation":10,"./ViewTestRender":11}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alfrid = require('../../../../build/alfrid.js');

var _alfrid2 = _interopRequireDefault(_alfrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ViewCube.js


var GL = _alfrid2.default.GL;


var ViewCube = function (_alfrid$View) {
	_inherits(ViewCube, _alfrid$View);

	function ViewCube(position, size, color) {
		_classCallCheck(this, ViewCube);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ViewCube).call(this, _alfrid2.default.ShaderLibs.generalVert, _alfrid2.default.ShaderLibs.simpleColorFrag));

		_this.color = color;
		_this.size = size;
		_this.position = position;
		_this.shaderShadow = new _alfrid2.default.GLShader("// generalShadow.vert\n\n// shadow.vert\n\n#define SHADER_NAME SHADOW_VERTEX\n\nprecision highp float;\n#define GLSLIFY 1\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat4 uShadowMatrix;\nuniform mat3 uNormalMatrix;\n\nuniform vec3 position;\nuniform vec3 scale;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vShadowCoord;\nvarying vec4 vPosition;\n\nconst mat4 biasMatrix = mat4( 0.5, 0.0, 0.0, 0.0,\n\t\t\t\t\t\t\t  0.0, 0.5, 0.0, 0.0,\n\t\t\t\t\t\t\t  0.0, 0.0, 0.5, 0.0,\n\t\t\t\t\t\t\t  0.5, 0.5, 0.5, 1.0 );\n\nvoid main(void) {\n\tvec3 pos        = aVertexPosition * scale;\n\tpos \t\t\t+= position;\n\tvec4 mvPosition = uViewMatrix * uModelMatrix * vec4(pos, 1.0);\n\tgl_Position     = uProjectionMatrix * mvPosition;\n\tvPosition       = mvPosition;\n\tvTextureCoord   = aTextureCoord;\n\tvShadowCoord    = ( biasMatrix * uShadowMatrix * uModelMatrix ) * vec4(pos, 1.0);;\n}", "// shadow.frag\n\nprecision highp float;\n#define GLSLIFY 1\nvarying vec2 vTextureCoord;\nvarying vec4 vPosition;\nvarying vec4 vShadowCoord;\n\nuniform vec3 color;\nuniform sampler2D textureDepth;\n\nvoid main(void) {\n\t\n\tvec4 ShadowCoord\t= vShadowCoord / vShadowCoord.w;\n\tvec4 Shadow\t\t= vec4(1.0);\n\n\tif ( ShadowCoord.z > -1.0 && ShadowCoord.z < 1.0 ) {\n\t\tShadow = texture2DProj( textureDepth, ShadowCoord,  0.00005 );\t\t\n\t}\n\n/*\n\tfloat bias = .0001;\n\tfloat visibility = 1.0;\n\tfloat descrease = .1;\n\n\tif ( texture2D( textureDepth, ShadowCoord.xy + vec2( -0.94201624, -0.39906216 )/700.0 ).z  <  ShadowCoord.z-bias ){\t\tvisibility-=descrease;}\n\tif ( texture2D( textureDepth, ShadowCoord.xy + vec2( 0.94558609, -0.768907256 )/700.0 ).z  <  ShadowCoord.z-bias ){\t\tvisibility-=descrease;}\n\tif ( texture2D( textureDepth, ShadowCoord.xy + vec2( -0.094184101, -0.92938870 )/700.0 ).z  <  ShadowCoord.z-bias ){\tvisibility-=descrease;}\n\tif ( texture2D( textureDepth, ShadowCoord.xy + vec2( 0.34495938, 0.29387760 )/700.0 ).z  <  ShadowCoord.z-bias ){\t\tvisibility-=descrease;}\n*/\n\tgl_FragColor = vec4( color, 1.0) * Shadow;\n\n/*\n\tfloat bias = 0.005*tan(acos(NdotL)); // cosTheta is dot( n,l ), clamped between 0 and 1\n\tbias = clamp(bias, 0.0, 0.01);\n\tfloat visibility = 1.0;\n\tif ( texture2D( textureDepth, ShadowCoord.xy ).z  <  ShadowCoord.z-bias){\n\t\tvisibility = 0.5;\n\t}\n\n    gl_FragColor = vec4(( Diffuse * visibility + Ambient ) * color, 1.0);\n*/  \n}");
		return _this;
	}

	_createClass(ViewCube, [{
		key: '_init',
		value: function _init() {
			this.mesh = _alfrid2.default.Geom.cube(1, 1, 1);
		}
	}, {
		key: 'render',
		value: function render(shadowMatrix, lightPosition, textureDepth) {

			var shader = shadowMatrix === undefined ? this.shader : this.shaderShadow;
			// console.log('isShadow : ', shadowMatrix);
			shader.bind();
			shader.uniform("scale", "uniform3fv", this.size);
			shader.uniform("position", "uniform3fv", this.position);
			shader.uniform("color", "uniform3fv", this.color);
			shader.uniform("opacity", "uniform1f", 1);

			if (shadowMatrix) {
				shader.uniform("lightPosition", "uniform3fv", lightPosition);
				shader.uniform("uShadowMatrix", "uniformMatrix4fv", shadowMatrix);
				shader.uniform("textureDepth", "uniform1i", 0);
				textureDepth.bind(0);
			}

			GL.draw(this.mesh);
		}
	}]);

	return ViewCube;
}(_alfrid2.default.View);

exports.default = ViewCube;

},{"../../../../build/alfrid.js":1}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alfrid = require('../../../../build/alfrid.js');

var _alfrid2 = _interopRequireDefault(_alfrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ViewRender.js



var GL = void 0;

var ViewRender = function (_alfrid$View) {
	_inherits(ViewRender, _alfrid$View);

	function ViewRender() {
		_classCallCheck(this, ViewRender);

		GL = _alfrid2.default.GL;
		return _possibleConstructorReturn(this, Object.getPrototypeOf(ViewRender).call(this, "// render.vert\n\nprecision highp float;\n#define GLSLIFY 1\nattribute vec3 aVertexPosition;\nattribute vec3 aNormal;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nuniform sampler2D texture;\nuniform sampler2D textureNext;\nuniform float percent;\nvarying vec4 vColor;\nvarying vec3 vNormal;\n\nvoid main(void) {\n\tvec2 uv      = aVertexPosition.xy * .5;\n\tvec3 currPos = texture2D(texture, uv).rgb;\n\tvec3 nextPos = texture2D(textureNext, uv).rgb;\n\tvec3 pos     = mix(currPos, nextPos, percent);\n\tvec4 V       = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(pos, 1.0);\n\tgl_Position  = V;\n\tgl_PointSize = 2.0;\n\n\tfloat d \t = V.z/V.w;\n\td \t\t\t = d*.5 + .5;\n\tvColor       = vec4(d, d, d, 1.0);\n\n\tif(length(currPos) - length(nextPos) > 1.0) vColor.a = 0.0;\n\tvNormal = aNormal;\n}", "// render.frag\n\n// save.frag\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec4 vColor;\n\nvoid main(void) {\n\tif(vColor.a <= 0.01) {\n\t\tdiscard;\n\t}\n    gl_FragColor = vColor;\n}"));
	}

	_createClass(ViewRender, [{
		key: '_init',
		value: function _init() {
			var positions = [];
			var coords = [];
			var indices = [];
			var count = 0;
			var numParticles = params.numParticles;
			var ux = void 0,
			    uy = void 0;

			for (var j = 0; j < numParticles; j++) {
				for (var i = 0; i < numParticles; i++) {
					ux = i / numParticles;
					uy = j / numParticles;
					positions.push([ux, uy, 0]);
					indices.push(count);
					count++;
				}
			}

			this.mesh = new _alfrid2.default.Mesh(GL.POINTS);
			this.mesh.bufferVertex(positions);
			this.mesh.bufferIndex(indices);
		}
	}, {
		key: 'render',
		value: function render(texture, textureNext, percent) {
			this.shader.bind();
			this.shader.uniform("texture", "uniform1i", 0);
			texture.bind(0);
			this.shader.uniform("textureNext", "uniform1i", 1);
			textureNext.bind(1);
			this.shader.uniform("percent", "uniform1f", percent);
			GL.draw(this.mesh);
		}
	}]);

	return ViewRender;
}(_alfrid2.default.View);

exports.default = ViewRender;

},{"../../../../build/alfrid.js":1}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alfrid = require('../../../../build/alfrid.js');

var _alfrid2 = _interopRequireDefault(_alfrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ViewSave.js



var random = function random(min, max) {
	return min + Math.random() * (max - min);
};

var GL = void 0;

var ViewSave = function (_alfrid$View) {
	_inherits(ViewSave, _alfrid$View);

	function ViewSave() {
		_classCallCheck(this, ViewSave);

		GL = _alfrid2.default.GL;

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ViewSave).call(this, "// save.vert\n\nprecision highp float;\n#define GLSLIFY 1\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec3 aNormal;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vColor;\nvarying vec3 vNormal;\n\nvoid main(void) {\n\tvColor      = aVertexPosition;\n\tvec3 pos    = vec3(aTextureCoord, 0.0);\n\tgl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(pos, 1.0);\n\n    gl_PointSize = 1.0;\n\n    vNormal = aNormal;\n}", "// save.frag\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec3 vColor;\n\nvoid main(void) {\n    gl_FragColor = vec4(vColor, 1.0);\n}"));
	}

	_createClass(ViewSave, [{
		key: '_init',
		value: function _init() {

			var positions = [];
			var coords = [];
			var indices = [];
			var count = 0;

			var numParticles = params.numParticles;
			var totalParticles = numParticles * numParticles;
			var ux, uy;
			var range = 1.5;

			for (var j = 0; j < numParticles; j++) {
				for (var i = 0; i < numParticles; i++) {
					positions.push([random(-range, range), random(-range, range), random(-range, range)]);

					ux = i / numParticles - 1.0 + .5 / numParticles;
					uy = j / numParticles - 1.0 + .5 / numParticles;
					coords.push([ux, uy]);
					indices.push(count);
					count++;

					positions.push([Math.random(), Math.random(), Math.random()]);
					coords.push([ux, uy + 1.0]);
					indices.push(count);
					count++;
				}
			}

			this.mesh = new _alfrid2.default.Mesh(GL.POINTS);
			this.mesh.bufferVertex(positions);
			this.mesh.bufferTexCoord(coords);
			this.mesh.bufferIndex(indices);
		}
	}, {
		key: 'render',
		value: function render() {

			this.shader.bind();
			GL.draw(this.mesh);
		}
	}]);

	return ViewSave;
}(_alfrid2.default.View);

exports.default = ViewSave;

},{"../../../../build/alfrid.js":1}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alfrid = require('../../../../build/alfrid.js');

var _alfrid2 = _interopRequireDefault(_alfrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ViewShadowRender.js


var GL = _alfrid2.default.GL;


var ViewShadowRender = function (_alfrid$View) {
	_inherits(ViewShadowRender, _alfrid$View);

	function ViewShadowRender() {
		_classCallCheck(this, ViewShadowRender);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ViewShadowRender).call(this, "// shadow.vert\n\n// render.vert\n\nprecision highp float;\n#define GLSLIFY 1\nattribute vec3 aVertexPosition;\nattribute vec3 aNormal;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat4 uShadowMatrix;\n\nuniform sampler2D texture;\nuniform sampler2D textureNext;\nuniform float percent;\nvarying vec4 vColor;\n\nvarying vec4 vShadowCoord;\nvarying vec4 vPosition;\nvarying vec3 vNormal;\n\nconst mat4 biasMatrix = mat4( 0.5, 0.0, 0.0, 0.0,\n\t\t\t\t\t\t\t  0.0, 0.5, 0.0, 0.0,\n\t\t\t\t\t\t\t  0.0, 0.0, 0.5, 0.0,\n\t\t\t\t\t\t\t  0.5, 0.5, 0.5, 1.0 );\n\nvoid main(void) {\n\tvec2 uv      = aVertexPosition.xy * .5;\n\tvec3 currPos = texture2D(texture, uv).rgb;\n\tvec3 nextPos = texture2D(textureNext, uv).rgb;\n\tvec3 pos     = mix(currPos, nextPos, percent);\n\n\tvec4 mvPosition = uViewMatrix * uModelMatrix * vec4(pos, 1.0);\n\n\tgl_Position     = uProjectionMatrix * mvPosition;\n\tvPosition       = mvPosition;\n\tvShadowCoord    = ( biasMatrix * uShadowMatrix ) * vec4(pos, 1.0);;\n\t\n\tfloat d      = length(pos);\n\tfloat a      = smoothstep(3.0, 4.5, d);\n\tvColor       = vec4(1.0, 1.0, 1.0, 1.0);\n\n\tgl_PointSize = 2.0;\n\n\tif(length(currPos) - length(nextPos) > 1.0) vColor.a = 0.0;\n\tvNormal = aNormal;\n}", "// shadow.frag\n\n#define SHADER_NAME SIMPLE_TEXTURE\n\nprecision highp float;\n#define GLSLIFY 1\nvarying vec4 vPosition;\nvarying vec4 vShadowCoord;\nvarying vec4 vColor;\n\nuniform vec3 color;\nuniform sampler2D textureDepth;\n\nconst float shadowMapSize = 1024.0;\n/*\nconst vec2 poissonDisk[4] = vec2[](\n\tvec2( -0.94201624, -0.39906216 ),\n\tvec2( 0.94558609, -0.76890725 ),\n\tvec2( -0.094184101, -0.92938870 ),\n\tvec2( 0.34495938, 0.29387760 )\n);\n*/\n\nconst float near = .5;\nconst float far = 100.0;\n\nfloat getDepth(float z, float n, float f) {\n\treturn (2.0 * n) / (f + n - z*(f-n));\n}\n\nfloat getDepthValue(vec2 uv) {\n\tconst float tmp = 700.0;\n\tfloat d = texture2D( textureDepth, uv ).z;\n\treturn d;\n\t// return getDepth(d, near, far);\n}\n\nfloat getDepthProjValue(vec4 uv) {\n\treturn 0.0;\n}\n\nvec4 getShadowCoord( vec4 sc, vec2 offset) {\n\tvec4 s = sc;\n\ts.xy += offset;\n\n\treturn s;\n}\n\nfloat samplePCF3x3( vec4 sc )\n{\n\tconst float s = 2.0/700.0;\n\t\n\tfloat shadow = 0.0;\n\tfloat bias = .0001;\n\n\tshadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2(-s,-s) )).r;\n\tshadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2(-s, 0) )).r;\n\tshadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2(-s, s) )).r;\n\tshadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2( 0,-s) )).r;\n\tshadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2( 0, 0) )).r;\n\tshadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2( 0, s) )).r;\n\tshadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2( s,-s) )).r;\n\tshadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2( s, 0) )).r;\n\tshadow += texture2DProj( textureDepth, getShadowCoord(sc, vec2( s, s) )).r;\n\treturn shadow/9.0;;\n}\n\nvoid main(void) {\n\tif(vColor.a <= 0.0) discard;\n\n\tvec4 ShadowCoord\t= vShadowCoord / vShadowCoord.w;\n\tvec4 Shadow\t\t= vec4(1.0);\n\n\tif ( ShadowCoord.z > -1.0 && ShadowCoord.z < 1.0 ) {\n\t\tShadow = texture2DProj( textureDepth, ShadowCoord,  0.00005 );\t\t\n\t}\n\n\tfloat bias = .0001;\n\tfloat visibility = 1.0;\n\tfloat descrease = .1;\n\n\tconst float tmp = 700.0;\n\n\tif ( getDepthValue( ShadowCoord.xy + vec2( -0.94201624, -0.39906216 )/ tmp )  <  ShadowCoord.z-bias ){\t\tvisibility-=descrease;}\n\tif ( getDepthValue( ShadowCoord.xy + vec2( 0.94558609, -0.768907256 )/ tmp )  <  ShadowCoord.z-bias ){\t\tvisibility-=descrease;}\n\tif ( getDepthValue( ShadowCoord.xy + vec2( -0.094184101, -0.92938870 )/ tmp )  <  ShadowCoord.z-bias ){\tvisibility-=descrease;}\n\tif ( getDepthValue( ShadowCoord.xy + vec2( 0.34495938, 0.29387760 )/ tmp )  <  ShadowCoord.z-bias ){\t\tvisibility-=descrease;}\n\n\t// visibility = mix(visibility, 1.0, .25);\t\t\n\n\tfloat _pcf = samplePCF3x3(vShadowCoord);\n\n\tvec4 color = vColor;\n\tcolor.rgb *= visibility;\n\t// color.rgb *= _pcf;\n\tgl_FragColor = color;\n\t// gl_FragColor.rgb = vec3(_pcf);\n}"));
	}

	_createClass(ViewShadowRender, [{
		key: '_init',
		value: function _init() {
			var positions = [];
			var coords = [];
			var indices = [];
			var count = 0;
			var numParticles = params.numParticles;
			var ux = void 0,
			    uy = void 0;

			for (var j = 0; j < numParticles; j++) {
				for (var i = 0; i < numParticles; i++) {
					ux = i / numParticles;
					uy = j / numParticles;
					positions.push([ux, uy, 0]);
					indices.push(count);
					count++;
				}
			}

			this.mesh = new _alfrid2.default.Mesh(GL.POINTS);
			this.mesh.bufferVertex(positions);
			this.mesh.bufferIndex(indices);
		}
	}, {
		key: 'render',
		value: function render(texture, textureNext, percent, textureDepth, shadowMatrix, lightPosition) {
			this.shader.bind();
			this.shader.uniform("texture", "uniform1i", 0);
			texture.bind(0);
			this.shader.uniform("textureNext", "uniform1i", 1);
			textureNext.bind(1);
			this.shader.uniform("percent", "uniform1f", percent);
			GL.draw(this.mesh);

			this.shader.uniform("lightPosition", "uniform3fv", lightPosition);
			this.shader.uniform("uShadowMatrix", "uniformMatrix4fv", shadowMatrix);
			this.shader.uniform("textureDepth", "uniform1i", 2);
			// this.shader.uniform("uShadowStrength", "uniform1f", params.shadowStrength);
			// this.shader.uniform("uShadowThreshold", "uniform1f", params.shadowThreshold);
			textureDepth.bind(2);
		}
	}]);

	return ViewShadowRender;
}(_alfrid2.default.View);

exports.default = ViewShadowRender;

},{"../../../../build/alfrid.js":1}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alfrid = require('../../../../build/alfrid.js');

var _alfrid2 = _interopRequireDefault(_alfrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ViewSimulation.js



var GL = _alfrid2.default.GL;

var ViewSimulation = function (_alfrid$View) {
	_inherits(ViewSimulation, _alfrid$View);

	function ViewSimulation() {
		_classCallCheck(this, ViewSimulation);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ViewSimulation).call(this, _alfrid2.default.ShaderLibs.bigTriangleVert, "// sim.frag\n\n#define SHADER_NAME SIMPLE_TEXTURE\n\nprecision highp float;\n#define GLSLIFY 1\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\nuniform float time;\nuniform float skipCount;\n\nvec3 mod289(vec3 x) {\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\t}\n\nvec4 mod289(vec4 x) {\treturn x - floor(x * (1.0 / 289.0)) * 289.0;\t}\n\nvec4 permute(vec4 x) {\treturn mod289(((x*34.0)+1.0)*x);\t}\n\nvec4 taylorInvSqrt(vec4 r) {\treturn 1.79284291400159 - 0.85373472095314 * r;}\n\nfloat snoise(vec3 v) { \n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i); \n  vec4 p = permute( permute( permute( \n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), \n                                dot(p2,x2), dot(p3,x3) ) );\n}\n\nvec3 snoiseVec3( vec3 x ){\n\n  float s  = snoise(vec3( x ));\n  float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));\n  float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));\n  vec3 c = vec3( s , s1 , s2 );\n  return c;\n\n}\n\nvec3 curlNoise( vec3 p ){\n  \n  const float e = .1;\n  vec3 dx = vec3( e   , 0.0 , 0.0 );\n  vec3 dy = vec3( 0.0 , e   , 0.0 );\n  vec3 dz = vec3( 0.0 , 0.0 , e   );\n\n  vec3 p_x0 = snoiseVec3( p - dx );\n  vec3 p_x1 = snoiseVec3( p + dx );\n  vec3 p_y0 = snoiseVec3( p - dy );\n  vec3 p_y1 = snoiseVec3( p + dy );\n  vec3 p_z0 = snoiseVec3( p - dz );\n  vec3 p_z1 = snoiseVec3( p + dz );\n\n  float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;\n  float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;\n  float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;\n\n  const float divisor = 1.0 / ( 2.0 * e );\n  return normalize( vec3( x , y , z ) * divisor );\n\n}\n\nvoid main(void) {\n\n    if(vTextureCoord.y < .5) {\n    \tif(vTextureCoord.x < .5) {\n        vec2 uvVel   = vTextureCoord + vec2(.5, .0);\n        vec2 uvExtra = vTextureCoord + vec2(.5, .5);\n        vec3 pos     = texture2D(texture, vTextureCoord).rgb;\n        vec3 vel     = texture2D(texture, uvVel).rgb;\n        vec3 extra   = texture2D(texture, uvExtra).rgb;\n    \t\tpos += vel;\n    \t\t// \n    \t\t// if(length(pos) > maxRadius) {\n    \t\t// \t// pos *= .001;\n      //     pos = curlNoise(pos*extra) * .1 * extra.b;\n    \t\t// }\n    \t\tgl_FragColor = vec4(pos, 1.0);\n\t\t} else {\n\t\t\t\n      vec2 uvPos      = vTextureCoord - vec2(.5, .0);\n      vec2 uvExtra    = vTextureCoord + vec2(-.5, .5);\n      vec3 pos        = texture2D(texture, uvPos).rgb;\n      vec3 vel        = texture2D(texture, vTextureCoord).rgb;\n      vec3 extra      = texture2D(texture, uvExtra).rgb;\n      float posOffset = (0.5 + extra.r * 0.25) * .15;\n\n\t\t\t/*/\n\t\t\tfloat ax = snoise(pos.xyz * posOffset + time * .1);\n\t\t\tfloat ay = snoise(pos.yzx * posOffset + time * .01);\n\t\t\tfloat az = snoise(pos.zxy * posOffset + time * .001);\n\t\t\tvec3 acc = vec3(ax, ay, az);\n\t\t\t/*/\n\t\t\tvec3 acc = curlNoise(pos * posOffset + time * .3);\n\t\t\t//*/\n\n      const float maxRadius = 2.5;\n      float d = length(pos);\n      if(d > maxRadius) {\n        vec3 dir = normalize(pos);\n        float f = d * .1;\n        acc -= dir * f;\n      }\n\n\t\t\tvel += acc * .003 * (skipCount+1.0);\n\n\t\t\tconst float decrease = .9;\n\t\t\tvel *= decrease;\n\n\t\t\tgl_FragColor = vec4(vel, 1.0);\n\t\t}\n\t} else {\n\t\tgl_FragColor = texture2D(texture, vTextureCoord);\n\t}\n}"));

		_this.time = Math.random() * 0xFF;

		return _this;
	}

	_createClass(ViewSimulation, [{
		key: '_init',
		value: function _init() {
			console.log('init');

			this.mesh = _alfrid2.default.Geom.bigTriangle();
		}
	}, {
		key: 'render',
		value: function render(texture) {
			this.time += .01;
			this.shader.bind();
			this.shader.uniform("texture", "uniform1i", 0);
			texture.bind(0);
			this.shader.uniform("time", "uniform1f", this.time);
			this.shader.uniform("skipCount", "uniform1f", params.skipCount);

			GL.draw(this.mesh);
		}
	}]);

	return ViewSimulation;
}(_alfrid2.default.View);

exports.default = ViewSimulation;

},{"../../../../build/alfrid.js":1}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alfrid = require('../../../../build/alfrid.js');

var _alfrid2 = _interopRequireDefault(_alfrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ViewTestRender.js



var GL = _alfrid2.default.GL;

var ViewTestRender = function (_alfrid$View) {
	_inherits(ViewTestRender, _alfrid$View);

	function ViewTestRender() {
		_classCallCheck(this, ViewTestRender);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ViewTestRender).call(this, "// testRender.vert\n\nprecision highp float;\n#define GLSLIFY 1\n\nattribute vec3 aVertexPosition;\nattribute vec3 aFlipPosition;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat3 uModelViewMatrixInverse;\n\nuniform float flipValue;\nvarying vec4 vColor;\n\nvoid main(void) {\n\n\tvec3 pos = aVertexPosition + (aFlipPosition - aVertexPosition) * flipValue;\n\tpos = uModelViewMatrixInverse * pos;\n\n    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(pos, 1.0);\n    vColor = vec4(1.0, 0.0, 0.0, 1.0);\n}", "// render.frag\n\n// save.frag\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec4 vColor;\n\nvoid main(void) {\n\tif(vColor.a <= 0.01) {\n\t\tdiscard;\n\t}\n    gl_FragColor = vColor;\n}"));

		_this.time = 0;

		return _this;
	}

	_createClass(ViewTestRender, [{
		key: '_init',
		value: function _init() {

			var positions = [];
			var flipPositions = [];
			var coords = [];
			var indices = [0, 1, 2];

			var angler = Math.PI * 2 / 3.0;

			positions.push([Math.sin(angler * 2 + Math.PI), Math.cos(angler * 2 + Math.PI), 0]);
			positions.push([Math.sin(angler + Math.PI), Math.cos(angler + Math.PI), 0]);
			positions.push([Math.sin(angler * 3 + Math.PI), Math.cos(angler * 3 + Math.PI), 0]);

			flipPositions.push([Math.sin(angler * 2), Math.cos(angler * 2), 0]);
			flipPositions.push([Math.sin(angler), Math.cos(angler), 0]);
			flipPositions.push([Math.sin(angler * 3), Math.cos(angler * 3), 0]);

			this.mesh = new _alfrid2.default.Mesh();
			this.mesh.bufferVertex(positions);
			this.mesh.bufferData(flipPositions, 'aFlipPosition', 3);
			this.mesh.bufferIndex(indices);
		}
	}, {
		key: 'render',
		value: function render() {
			// this.time +=.5;
			if (this.time >= 1) this.time = 0;else this.time = 1;

			this.shader.bind();

			this.shader.uniform("flipValue", "uniform1f", this.time);
			GL.draw(this.mesh);
		}
	}]);

	return ViewTestRender;
}(_alfrid2.default.View);

exports.default = ViewTestRender;

},{"../../../../build/alfrid.js":1}],12:[function(require,module,exports){
'use strict';

var _alfrid = require('../../../../build/alfrid.js');

var _alfrid2 = _interopRequireDefault(_alfrid);

var _SceneApp = require('./SceneApp');

var _SceneApp2 = _interopRequireDefault(_SceneApp);

var _datGui = require('dat-gui');

var _datGui2 = _interopRequireDefault(_datGui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.params = {
	numParticles: 512,
	skipCount: 5
};

if (document.body) {
	_init();
} else {
	window.addEventListener('load', function () {
		return _init();
	});
}

function _init() {
	console.debug('Total Particles :', params.numParticles * params.numParticles);

	//	CREATE CANVAS
	var canvas = document.createElement("canvas");
	canvas.className = 'Main-Canvas';
	document.body.appendChild(canvas);

	//	INIT GL TOOL
	_alfrid2.default.GL.init(canvas);

	//	INIT SCENE
	var scene = new _SceneApp2.default();

	// let gui = new dat.GUI({width:300});
}

},{"../../../../build/alfrid.js":1,"./SceneApp":5,"dat-gui":2}]},{},[12]);

//# sourceMappingURL=bundle.js.map
