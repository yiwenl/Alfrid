(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};(function(f){if((typeof exports==="undefined"?"undefined":_typeof(exports))==="object"&&typeof module!=="undefined"){module.exports=f();}else if(typeof define==="function"&&define.amd){define([],f);}else {var g;if(typeof window!=="undefined"){g=window;}else if(typeof global!=="undefined"){g=global;}else if(typeof self!=="undefined"){g=self;}else {g=this;}g.alfrid=f();}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o]);}return s;}({1:[function(_dereq_,module,exports){ /**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.3.0
 */ /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */ // END HEADER
exports.glMatrix=_dereq_("./gl-matrix/common.js");exports.mat2=_dereq_("./gl-matrix/mat2.js");exports.mat2d=_dereq_("./gl-matrix/mat2d.js");exports.mat3=_dereq_("./gl-matrix/mat3.js");exports.mat4=_dereq_("./gl-matrix/mat4.js");exports.quat=_dereq_("./gl-matrix/quat.js");exports.vec2=_dereq_("./gl-matrix/vec2.js");exports.vec3=_dereq_("./gl-matrix/vec3.js");exports.vec4=_dereq_("./gl-matrix/vec4.js");},{"./gl-matrix/common.js":2,"./gl-matrix/mat2.js":3,"./gl-matrix/mat2d.js":4,"./gl-matrix/mat3.js":5,"./gl-matrix/mat4.js":6,"./gl-matrix/quat.js":7,"./gl-matrix/vec2.js":8,"./gl-matrix/vec3.js":9,"./gl-matrix/vec4.js":10}],2:[function(_dereq_,module,exports){ /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */ /**
 * @class Common utilities
 * @name glMatrix
 */var glMatrix={}; // Constants
glMatrix.EPSILON=0.000001;glMatrix.ARRAY_TYPE=typeof Float32Array!=='undefined'?Float32Array:Array;glMatrix.RANDOM=Math.random; /**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */glMatrix.setMatrixArrayType=function(type){GLMAT_ARRAY_TYPE=type;};var degree=Math.PI/180; /**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/glMatrix.toRadian=function(a){return a*degree;};module.exports=glMatrix;},{}],3:[function(_dereq_,module,exports){ /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */var glMatrix=_dereq_("./common.js"); /**
 * @class 2x2 Matrix
 * @name mat2
 */var mat2={}; /**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */mat2.create=function(){var out=new glMatrix.ARRAY_TYPE(4);out[0]=1;out[1]=0;out[2]=0;out[3]=1;return out;}; /**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */mat2.clone=function(a){var out=new glMatrix.ARRAY_TYPE(4);out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];return out;}; /**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */mat2.copy=function(out,a){out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];return out;}; /**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */mat2.identity=function(out){out[0]=1;out[1]=0;out[2]=0;out[3]=1;return out;}; /**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */mat2.transpose=function(out,a){ // If we are transposing ourselves we can skip a few steps but have to cache some values
if(out===a){var a1=a[1];out[1]=a[2];out[2]=a1;}else {out[0]=a[0];out[1]=a[2];out[2]=a[1];out[3]=a[3];}return out;}; /**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */mat2.invert=function(out,a){var a0=a[0],a1=a[1],a2=a[2],a3=a[3], // Calculate the determinant
det=a0*a3-a2*a1;if(!det){return null;}det=1.0/det;out[0]=a3*det;out[1]=-a1*det;out[2]=-a2*det;out[3]=a0*det;return out;}; /**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */mat2.adjoint=function(out,a){ // Caching this value is nessecary if out == a
var a0=a[0];out[0]=a[3];out[1]=-a[1];out[2]=-a[2];out[3]=a0;return out;}; /**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */mat2.determinant=function(a){return a[0]*a[3]-a[2]*a[1];}; /**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */mat2.multiply=function(out,a,b){var a0=a[0],a1=a[1],a2=a[2],a3=a[3];var b0=b[0],b1=b[1],b2=b[2],b3=b[3];out[0]=a0*b0+a2*b1;out[1]=a1*b0+a3*b1;out[2]=a0*b2+a2*b3;out[3]=a1*b2+a3*b3;return out;}; /**
 * Alias for {@link mat2.multiply}
 * @function
 */mat2.mul=mat2.multiply; /**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */mat2.rotate=function(out,a,rad){var a0=a[0],a1=a[1],a2=a[2],a3=a[3],s=Math.sin(rad),c=Math.cos(rad);out[0]=a0*c+a2*s;out[1]=a1*c+a3*s;out[2]=a0*-s+a2*c;out[3]=a1*-s+a3*c;return out;}; /**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/mat2.scale=function(out,a,v){var a0=a[0],a1=a[1],a2=a[2],a3=a[3],v0=v[0],v1=v[1];out[0]=a0*v0;out[1]=a1*v0;out[2]=a2*v1;out[3]=a3*v1;return out;}; /**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */mat2.fromRotation=function(out,rad){var s=Math.sin(rad),c=Math.cos(rad);out[0]=c;out[1]=s;out[2]=-s;out[3]=c;return out;}; /**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */mat2.fromScaling=function(out,v){out[0]=v[0];out[1]=0;out[2]=0;out[3]=v[1];return out;}; /**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */mat2.str=function(a){return 'mat2('+a[0]+', '+a[1]+', '+a[2]+', '+a[3]+')';}; /**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */mat2.frob=function(a){return Math.sqrt(Math.pow(a[0],2)+Math.pow(a[1],2)+Math.pow(a[2],2)+Math.pow(a[3],2));}; /**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */mat2.LDU=function(L,D,U,a){L[2]=a[2]/a[0];U[0]=a[0];U[1]=a[1];U[3]=a[3]-L[2]*U[1];return [L,D,U];};module.exports=mat2;},{"./common.js":2}],4:[function(_dereq_,module,exports){ /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */var glMatrix=_dereq_("./common.js"); /**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */var mat2d={}; /**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */mat2d.create=function(){var out=new glMatrix.ARRAY_TYPE(6);out[0]=1;out[1]=0;out[2]=0;out[3]=1;out[4]=0;out[5]=0;return out;}; /**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */mat2d.clone=function(a){var out=new glMatrix.ARRAY_TYPE(6);out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];out[4]=a[4];out[5]=a[5];return out;}; /**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */mat2d.copy=function(out,a){out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];out[4]=a[4];out[5]=a[5];return out;}; /**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */mat2d.identity=function(out){out[0]=1;out[1]=0;out[2]=0;out[3]=1;out[4]=0;out[5]=0;return out;}; /**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */mat2d.invert=function(out,a){var aa=a[0],ab=a[1],ac=a[2],ad=a[3],atx=a[4],aty=a[5];var det=aa*ad-ab*ac;if(!det){return null;}det=1.0/det;out[0]=ad*det;out[1]=-ab*det;out[2]=-ac*det;out[3]=aa*det;out[4]=(ac*aty-ad*atx)*det;out[5]=(ab*atx-aa*aty)*det;return out;}; /**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */mat2d.determinant=function(a){return a[0]*a[3]-a[1]*a[2];}; /**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */mat2d.multiply=function(out,a,b){var a0=a[0],a1=a[1],a2=a[2],a3=a[3],a4=a[4],a5=a[5],b0=b[0],b1=b[1],b2=b[2],b3=b[3],b4=b[4],b5=b[5];out[0]=a0*b0+a2*b1;out[1]=a1*b0+a3*b1;out[2]=a0*b2+a2*b3;out[3]=a1*b2+a3*b3;out[4]=a0*b4+a2*b5+a4;out[5]=a1*b4+a3*b5+a5;return out;}; /**
 * Alias for {@link mat2d.multiply}
 * @function
 */mat2d.mul=mat2d.multiply; /**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */mat2d.rotate=function(out,a,rad){var a0=a[0],a1=a[1],a2=a[2],a3=a[3],a4=a[4],a5=a[5],s=Math.sin(rad),c=Math.cos(rad);out[0]=a0*c+a2*s;out[1]=a1*c+a3*s;out[2]=a0*-s+a2*c;out[3]=a1*-s+a3*c;out[4]=a4;out[5]=a5;return out;}; /**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/mat2d.scale=function(out,a,v){var a0=a[0],a1=a[1],a2=a[2],a3=a[3],a4=a[4],a5=a[5],v0=v[0],v1=v[1];out[0]=a0*v0;out[1]=a1*v0;out[2]=a2*v1;out[3]=a3*v1;out[4]=a4;out[5]=a5;return out;}; /**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/mat2d.translate=function(out,a,v){var a0=a[0],a1=a[1],a2=a[2],a3=a[3],a4=a[4],a5=a[5],v0=v[0],v1=v[1];out[0]=a0;out[1]=a1;out[2]=a2;out[3]=a3;out[4]=a0*v0+a2*v1+a4;out[5]=a1*v0+a3*v1+a5;return out;}; /**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */mat2d.fromRotation=function(out,rad){var s=Math.sin(rad),c=Math.cos(rad);out[0]=c;out[1]=s;out[2]=-s;out[3]=c;out[4]=0;out[5]=0;return out;}; /**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */mat2d.fromScaling=function(out,v){out[0]=v[0];out[1]=0;out[2]=0;out[3]=v[1];out[4]=0;out[5]=0;return out;}; /**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */mat2d.fromTranslation=function(out,v){out[0]=1;out[1]=0;out[2]=0;out[3]=1;out[4]=v[0];out[5]=v[1];return out;}; /**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */mat2d.str=function(a){return 'mat2d('+a[0]+', '+a[1]+', '+a[2]+', '+a[3]+', '+a[4]+', '+a[5]+')';}; /**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */mat2d.frob=function(a){return Math.sqrt(Math.pow(a[0],2)+Math.pow(a[1],2)+Math.pow(a[2],2)+Math.pow(a[3],2)+Math.pow(a[4],2)+Math.pow(a[5],2)+1);};module.exports=mat2d;},{"./common.js":2}],5:[function(_dereq_,module,exports){ /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */var glMatrix=_dereq_("./common.js"); /**
 * @class 3x3 Matrix
 * @name mat3
 */var mat3={}; /**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */mat3.create=function(){var out=new glMatrix.ARRAY_TYPE(9);out[0]=1;out[1]=0;out[2]=0;out[3]=0;out[4]=1;out[5]=0;out[6]=0;out[7]=0;out[8]=1;return out;}; /**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */mat3.fromMat4=function(out,a){out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[4];out[4]=a[5];out[5]=a[6];out[6]=a[8];out[7]=a[9];out[8]=a[10];return out;}; /**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */mat3.clone=function(a){var out=new glMatrix.ARRAY_TYPE(9);out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];out[4]=a[4];out[5]=a[5];out[6]=a[6];out[7]=a[7];out[8]=a[8];return out;}; /**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */mat3.copy=function(out,a){out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];out[4]=a[4];out[5]=a[5];out[6]=a[6];out[7]=a[7];out[8]=a[8];return out;}; /**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */mat3.identity=function(out){out[0]=1;out[1]=0;out[2]=0;out[3]=0;out[4]=1;out[5]=0;out[6]=0;out[7]=0;out[8]=1;return out;}; /**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */mat3.transpose=function(out,a){ // If we are transposing ourselves we can skip a few steps but have to cache some values
if(out===a){var a01=a[1],a02=a[2],a12=a[5];out[1]=a[3];out[2]=a[6];out[3]=a01;out[5]=a[7];out[6]=a02;out[7]=a12;}else {out[0]=a[0];out[1]=a[3];out[2]=a[6];out[3]=a[1];out[4]=a[4];out[5]=a[7];out[6]=a[2];out[7]=a[5];out[8]=a[8];}return out;}; /**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */mat3.invert=function(out,a){var a00=a[0],a01=a[1],a02=a[2],a10=a[3],a11=a[4],a12=a[5],a20=a[6],a21=a[7],a22=a[8],b01=a22*a11-a12*a21,b11=-a22*a10+a12*a20,b21=a21*a10-a11*a20, // Calculate the determinant
det=a00*b01+a01*b11+a02*b21;if(!det){return null;}det=1.0/det;out[0]=b01*det;out[1]=(-a22*a01+a02*a21)*det;out[2]=(a12*a01-a02*a11)*det;out[3]=b11*det;out[4]=(a22*a00-a02*a20)*det;out[5]=(-a12*a00+a02*a10)*det;out[6]=b21*det;out[7]=(-a21*a00+a01*a20)*det;out[8]=(a11*a00-a01*a10)*det;return out;}; /**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */mat3.adjoint=function(out,a){var a00=a[0],a01=a[1],a02=a[2],a10=a[3],a11=a[4],a12=a[5],a20=a[6],a21=a[7],a22=a[8];out[0]=a11*a22-a12*a21;out[1]=a02*a21-a01*a22;out[2]=a01*a12-a02*a11;out[3]=a12*a20-a10*a22;out[4]=a00*a22-a02*a20;out[5]=a02*a10-a00*a12;out[6]=a10*a21-a11*a20;out[7]=a01*a20-a00*a21;out[8]=a00*a11-a01*a10;return out;}; /**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */mat3.determinant=function(a){var a00=a[0],a01=a[1],a02=a[2],a10=a[3],a11=a[4],a12=a[5],a20=a[6],a21=a[7],a22=a[8];return a00*(a22*a11-a12*a21)+a01*(-a22*a10+a12*a20)+a02*(a21*a10-a11*a20);}; /**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */mat3.multiply=function(out,a,b){var a00=a[0],a01=a[1],a02=a[2],a10=a[3],a11=a[4],a12=a[5],a20=a[6],a21=a[7],a22=a[8],b00=b[0],b01=b[1],b02=b[2],b10=b[3],b11=b[4],b12=b[5],b20=b[6],b21=b[7],b22=b[8];out[0]=b00*a00+b01*a10+b02*a20;out[1]=b00*a01+b01*a11+b02*a21;out[2]=b00*a02+b01*a12+b02*a22;out[3]=b10*a00+b11*a10+b12*a20;out[4]=b10*a01+b11*a11+b12*a21;out[5]=b10*a02+b11*a12+b12*a22;out[6]=b20*a00+b21*a10+b22*a20;out[7]=b20*a01+b21*a11+b22*a21;out[8]=b20*a02+b21*a12+b22*a22;return out;}; /**
 * Alias for {@link mat3.multiply}
 * @function
 */mat3.mul=mat3.multiply; /**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */mat3.translate=function(out,a,v){var a00=a[0],a01=a[1],a02=a[2],a10=a[3],a11=a[4],a12=a[5],a20=a[6],a21=a[7],a22=a[8],x=v[0],y=v[1];out[0]=a00;out[1]=a01;out[2]=a02;out[3]=a10;out[4]=a11;out[5]=a12;out[6]=x*a00+y*a10+a20;out[7]=x*a01+y*a11+a21;out[8]=x*a02+y*a12+a22;return out;}; /**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */mat3.rotate=function(out,a,rad){var a00=a[0],a01=a[1],a02=a[2],a10=a[3],a11=a[4],a12=a[5],a20=a[6],a21=a[7],a22=a[8],s=Math.sin(rad),c=Math.cos(rad);out[0]=c*a00+s*a10;out[1]=c*a01+s*a11;out[2]=c*a02+s*a12;out[3]=c*a10-s*a00;out[4]=c*a11-s*a01;out[5]=c*a12-s*a02;out[6]=a20;out[7]=a21;out[8]=a22;return out;}; /**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/mat3.scale=function(out,a,v){var x=v[0],y=v[1];out[0]=x*a[0];out[1]=x*a[1];out[2]=x*a[2];out[3]=y*a[3];out[4]=y*a[4];out[5]=y*a[5];out[6]=a[6];out[7]=a[7];out[8]=a[8];return out;}; /**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */mat3.fromTranslation=function(out,v){out[0]=1;out[1]=0;out[2]=0;out[3]=0;out[4]=1;out[5]=0;out[6]=v[0];out[7]=v[1];out[8]=1;return out;}; /**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */mat3.fromRotation=function(out,rad){var s=Math.sin(rad),c=Math.cos(rad);out[0]=c;out[1]=s;out[2]=0;out[3]=-s;out[4]=c;out[5]=0;out[6]=0;out[7]=0;out[8]=1;return out;}; /**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */mat3.fromScaling=function(out,v){out[0]=v[0];out[1]=0;out[2]=0;out[3]=0;out[4]=v[1];out[5]=0;out[6]=0;out[7]=0;out[8]=1;return out;}; /**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/mat3.fromMat2d=function(out,a){out[0]=a[0];out[1]=a[1];out[2]=0;out[3]=a[2];out[4]=a[3];out[5]=0;out[6]=a[4];out[7]=a[5];out[8]=1;return out;}; /**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/mat3.fromQuat=function(out,q){var x=q[0],y=q[1],z=q[2],w=q[3],x2=x+x,y2=y+y,z2=z+z,xx=x*x2,yx=y*x2,yy=y*y2,zx=z*x2,zy=z*y2,zz=z*z2,wx=w*x2,wy=w*y2,wz=w*z2;out[0]=1-yy-zz;out[3]=yx-wz;out[6]=zx+wy;out[1]=yx+wz;out[4]=1-xx-zz;out[7]=zy-wx;out[2]=zx-wy;out[5]=zy+wx;out[8]=1-xx-yy;return out;}; /**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/mat3.normalFromMat4=function(out,a){var a00=a[0],a01=a[1],a02=a[2],a03=a[3],a10=a[4],a11=a[5],a12=a[6],a13=a[7],a20=a[8],a21=a[9],a22=a[10],a23=a[11],a30=a[12],a31=a[13],a32=a[14],a33=a[15],b00=a00*a11-a01*a10,b01=a00*a12-a02*a10,b02=a00*a13-a03*a10,b03=a01*a12-a02*a11,b04=a01*a13-a03*a11,b05=a02*a13-a03*a12,b06=a20*a31-a21*a30,b07=a20*a32-a22*a30,b08=a20*a33-a23*a30,b09=a21*a32-a22*a31,b10=a21*a33-a23*a31,b11=a22*a33-a23*a32, // Calculate the determinant
det=b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06;if(!det){return null;}det=1.0/det;out[0]=(a11*b11-a12*b10+a13*b09)*det;out[1]=(a12*b08-a10*b11-a13*b07)*det;out[2]=(a10*b10-a11*b08+a13*b06)*det;out[3]=(a02*b10-a01*b11-a03*b09)*det;out[4]=(a00*b11-a02*b08+a03*b07)*det;out[5]=(a01*b08-a00*b10-a03*b06)*det;out[6]=(a31*b05-a32*b04+a33*b03)*det;out[7]=(a32*b02-a30*b05-a33*b01)*det;out[8]=(a30*b04-a31*b02+a33*b00)*det;return out;}; /**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */mat3.str=function(a){return 'mat3('+a[0]+', '+a[1]+', '+a[2]+', '+a[3]+', '+a[4]+', '+a[5]+', '+a[6]+', '+a[7]+', '+a[8]+')';}; /**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */mat3.frob=function(a){return Math.sqrt(Math.pow(a[0],2)+Math.pow(a[1],2)+Math.pow(a[2],2)+Math.pow(a[3],2)+Math.pow(a[4],2)+Math.pow(a[5],2)+Math.pow(a[6],2)+Math.pow(a[7],2)+Math.pow(a[8],2));};module.exports=mat3;},{"./common.js":2}],6:[function(_dereq_,module,exports){ /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */var glMatrix=_dereq_("./common.js"); /**
 * @class 4x4 Matrix
 * @name mat4
 */var mat4={}; /**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */mat4.create=function(){var out=new glMatrix.ARRAY_TYPE(16);out[0]=1;out[1]=0;out[2]=0;out[3]=0;out[4]=0;out[5]=1;out[6]=0;out[7]=0;out[8]=0;out[9]=0;out[10]=1;out[11]=0;out[12]=0;out[13]=0;out[14]=0;out[15]=1;return out;}; /**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */mat4.clone=function(a){var out=new glMatrix.ARRAY_TYPE(16);out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];out[4]=a[4];out[5]=a[5];out[6]=a[6];out[7]=a[7];out[8]=a[8];out[9]=a[9];out[10]=a[10];out[11]=a[11];out[12]=a[12];out[13]=a[13];out[14]=a[14];out[15]=a[15];return out;}; /**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */mat4.copy=function(out,a){out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];out[4]=a[4];out[5]=a[5];out[6]=a[6];out[7]=a[7];out[8]=a[8];out[9]=a[9];out[10]=a[10];out[11]=a[11];out[12]=a[12];out[13]=a[13];out[14]=a[14];out[15]=a[15];return out;}; /**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */mat4.identity=function(out){out[0]=1;out[1]=0;out[2]=0;out[3]=0;out[4]=0;out[5]=1;out[6]=0;out[7]=0;out[8]=0;out[9]=0;out[10]=1;out[11]=0;out[12]=0;out[13]=0;out[14]=0;out[15]=1;return out;}; /**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */mat4.transpose=function(out,a){ // If we are transposing ourselves we can skip a few steps but have to cache some values
if(out===a){var a01=a[1],a02=a[2],a03=a[3],a12=a[6],a13=a[7],a23=a[11];out[1]=a[4];out[2]=a[8];out[3]=a[12];out[4]=a01;out[6]=a[9];out[7]=a[13];out[8]=a02;out[9]=a12;out[11]=a[14];out[12]=a03;out[13]=a13;out[14]=a23;}else {out[0]=a[0];out[1]=a[4];out[2]=a[8];out[3]=a[12];out[4]=a[1];out[5]=a[5];out[6]=a[9];out[7]=a[13];out[8]=a[2];out[9]=a[6];out[10]=a[10];out[11]=a[14];out[12]=a[3];out[13]=a[7];out[14]=a[11];out[15]=a[15];}return out;}; /**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */mat4.invert=function(out,a){var a00=a[0],a01=a[1],a02=a[2],a03=a[3],a10=a[4],a11=a[5],a12=a[6],a13=a[7],a20=a[8],a21=a[9],a22=a[10],a23=a[11],a30=a[12],a31=a[13],a32=a[14],a33=a[15],b00=a00*a11-a01*a10,b01=a00*a12-a02*a10,b02=a00*a13-a03*a10,b03=a01*a12-a02*a11,b04=a01*a13-a03*a11,b05=a02*a13-a03*a12,b06=a20*a31-a21*a30,b07=a20*a32-a22*a30,b08=a20*a33-a23*a30,b09=a21*a32-a22*a31,b10=a21*a33-a23*a31,b11=a22*a33-a23*a32, // Calculate the determinant
det=b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06;if(!det){return null;}det=1.0/det;out[0]=(a11*b11-a12*b10+a13*b09)*det;out[1]=(a02*b10-a01*b11-a03*b09)*det;out[2]=(a31*b05-a32*b04+a33*b03)*det;out[3]=(a22*b04-a21*b05-a23*b03)*det;out[4]=(a12*b08-a10*b11-a13*b07)*det;out[5]=(a00*b11-a02*b08+a03*b07)*det;out[6]=(a32*b02-a30*b05-a33*b01)*det;out[7]=(a20*b05-a22*b02+a23*b01)*det;out[8]=(a10*b10-a11*b08+a13*b06)*det;out[9]=(a01*b08-a00*b10-a03*b06)*det;out[10]=(a30*b04-a31*b02+a33*b00)*det;out[11]=(a21*b02-a20*b04-a23*b00)*det;out[12]=(a11*b07-a10*b09-a12*b06)*det;out[13]=(a00*b09-a01*b07+a02*b06)*det;out[14]=(a31*b01-a30*b03-a32*b00)*det;out[15]=(a20*b03-a21*b01+a22*b00)*det;return out;}; /**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */mat4.adjoint=function(out,a){var a00=a[0],a01=a[1],a02=a[2],a03=a[3],a10=a[4],a11=a[5],a12=a[6],a13=a[7],a20=a[8],a21=a[9],a22=a[10],a23=a[11],a30=a[12],a31=a[13],a32=a[14],a33=a[15];out[0]=a11*(a22*a33-a23*a32)-a21*(a12*a33-a13*a32)+a31*(a12*a23-a13*a22);out[1]=-(a01*(a22*a33-a23*a32)-a21*(a02*a33-a03*a32)+a31*(a02*a23-a03*a22));out[2]=a01*(a12*a33-a13*a32)-a11*(a02*a33-a03*a32)+a31*(a02*a13-a03*a12);out[3]=-(a01*(a12*a23-a13*a22)-a11*(a02*a23-a03*a22)+a21*(a02*a13-a03*a12));out[4]=-(a10*(a22*a33-a23*a32)-a20*(a12*a33-a13*a32)+a30*(a12*a23-a13*a22));out[5]=a00*(a22*a33-a23*a32)-a20*(a02*a33-a03*a32)+a30*(a02*a23-a03*a22);out[6]=-(a00*(a12*a33-a13*a32)-a10*(a02*a33-a03*a32)+a30*(a02*a13-a03*a12));out[7]=a00*(a12*a23-a13*a22)-a10*(a02*a23-a03*a22)+a20*(a02*a13-a03*a12);out[8]=a10*(a21*a33-a23*a31)-a20*(a11*a33-a13*a31)+a30*(a11*a23-a13*a21);out[9]=-(a00*(a21*a33-a23*a31)-a20*(a01*a33-a03*a31)+a30*(a01*a23-a03*a21));out[10]=a00*(a11*a33-a13*a31)-a10*(a01*a33-a03*a31)+a30*(a01*a13-a03*a11);out[11]=-(a00*(a11*a23-a13*a21)-a10*(a01*a23-a03*a21)+a20*(a01*a13-a03*a11));out[12]=-(a10*(a21*a32-a22*a31)-a20*(a11*a32-a12*a31)+a30*(a11*a22-a12*a21));out[13]=a00*(a21*a32-a22*a31)-a20*(a01*a32-a02*a31)+a30*(a01*a22-a02*a21);out[14]=-(a00*(a11*a32-a12*a31)-a10*(a01*a32-a02*a31)+a30*(a01*a12-a02*a11));out[15]=a00*(a11*a22-a12*a21)-a10*(a01*a22-a02*a21)+a20*(a01*a12-a02*a11);return out;}; /**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */mat4.determinant=function(a){var a00=a[0],a01=a[1],a02=a[2],a03=a[3],a10=a[4],a11=a[5],a12=a[6],a13=a[7],a20=a[8],a21=a[9],a22=a[10],a23=a[11],a30=a[12],a31=a[13],a32=a[14],a33=a[15],b00=a00*a11-a01*a10,b01=a00*a12-a02*a10,b02=a00*a13-a03*a10,b03=a01*a12-a02*a11,b04=a01*a13-a03*a11,b05=a02*a13-a03*a12,b06=a20*a31-a21*a30,b07=a20*a32-a22*a30,b08=a20*a33-a23*a30,b09=a21*a32-a22*a31,b10=a21*a33-a23*a31,b11=a22*a33-a23*a32; // Calculate the determinant
return b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06;}; /**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */mat4.multiply=function(out,a,b){var a00=a[0],a01=a[1],a02=a[2],a03=a[3],a10=a[4],a11=a[5],a12=a[6],a13=a[7],a20=a[8],a21=a[9],a22=a[10],a23=a[11],a30=a[12],a31=a[13],a32=a[14],a33=a[15]; // Cache only the current line of the second matrix
var b0=b[0],b1=b[1],b2=b[2],b3=b[3];out[0]=b0*a00+b1*a10+b2*a20+b3*a30;out[1]=b0*a01+b1*a11+b2*a21+b3*a31;out[2]=b0*a02+b1*a12+b2*a22+b3*a32;out[3]=b0*a03+b1*a13+b2*a23+b3*a33;b0=b[4];b1=b[5];b2=b[6];b3=b[7];out[4]=b0*a00+b1*a10+b2*a20+b3*a30;out[5]=b0*a01+b1*a11+b2*a21+b3*a31;out[6]=b0*a02+b1*a12+b2*a22+b3*a32;out[7]=b0*a03+b1*a13+b2*a23+b3*a33;b0=b[8];b1=b[9];b2=b[10];b3=b[11];out[8]=b0*a00+b1*a10+b2*a20+b3*a30;out[9]=b0*a01+b1*a11+b2*a21+b3*a31;out[10]=b0*a02+b1*a12+b2*a22+b3*a32;out[11]=b0*a03+b1*a13+b2*a23+b3*a33;b0=b[12];b1=b[13];b2=b[14];b3=b[15];out[12]=b0*a00+b1*a10+b2*a20+b3*a30;out[13]=b0*a01+b1*a11+b2*a21+b3*a31;out[14]=b0*a02+b1*a12+b2*a22+b3*a32;out[15]=b0*a03+b1*a13+b2*a23+b3*a33;return out;}; /**
 * Alias for {@link mat4.multiply}
 * @function
 */mat4.mul=mat4.multiply; /**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */mat4.translate=function(out,a,v){var x=v[0],y=v[1],z=v[2],a00,a01,a02,a03,a10,a11,a12,a13,a20,a21,a22,a23;if(a===out){out[12]=a[0]*x+a[4]*y+a[8]*z+a[12];out[13]=a[1]*x+a[5]*y+a[9]*z+a[13];out[14]=a[2]*x+a[6]*y+a[10]*z+a[14];out[15]=a[3]*x+a[7]*y+a[11]*z+a[15];}else {a00=a[0];a01=a[1];a02=a[2];a03=a[3];a10=a[4];a11=a[5];a12=a[6];a13=a[7];a20=a[8];a21=a[9];a22=a[10];a23=a[11];out[0]=a00;out[1]=a01;out[2]=a02;out[3]=a03;out[4]=a10;out[5]=a11;out[6]=a12;out[7]=a13;out[8]=a20;out[9]=a21;out[10]=a22;out[11]=a23;out[12]=a00*x+a10*y+a20*z+a[12];out[13]=a01*x+a11*y+a21*z+a[13];out[14]=a02*x+a12*y+a22*z+a[14];out[15]=a03*x+a13*y+a23*z+a[15];}return out;}; /**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/mat4.scale=function(out,a,v){var x=v[0],y=v[1],z=v[2];out[0]=a[0]*x;out[1]=a[1]*x;out[2]=a[2]*x;out[3]=a[3]*x;out[4]=a[4]*y;out[5]=a[5]*y;out[6]=a[6]*y;out[7]=a[7]*y;out[8]=a[8]*z;out[9]=a[9]*z;out[10]=a[10]*z;out[11]=a[11]*z;out[12]=a[12];out[13]=a[13];out[14]=a[14];out[15]=a[15];return out;}; /**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */mat4.rotate=function(out,a,rad,axis){var x=axis[0],y=axis[1],z=axis[2],len=Math.sqrt(x*x+y*y+z*z),s,c,t,a00,a01,a02,a03,a10,a11,a12,a13,a20,a21,a22,a23,b00,b01,b02,b10,b11,b12,b20,b21,b22;if(Math.abs(len)<glMatrix.EPSILON){return null;}len=1/len;x*=len;y*=len;z*=len;s=Math.sin(rad);c=Math.cos(rad);t=1-c;a00=a[0];a01=a[1];a02=a[2];a03=a[3];a10=a[4];a11=a[5];a12=a[6];a13=a[7];a20=a[8];a21=a[9];a22=a[10];a23=a[11]; // Construct the elements of the rotation matrix
b00=x*x*t+c;b01=y*x*t+z*s;b02=z*x*t-y*s;b10=x*y*t-z*s;b11=y*y*t+c;b12=z*y*t+x*s;b20=x*z*t+y*s;b21=y*z*t-x*s;b22=z*z*t+c; // Perform rotation-specific matrix multiplication
out[0]=a00*b00+a10*b01+a20*b02;out[1]=a01*b00+a11*b01+a21*b02;out[2]=a02*b00+a12*b01+a22*b02;out[3]=a03*b00+a13*b01+a23*b02;out[4]=a00*b10+a10*b11+a20*b12;out[5]=a01*b10+a11*b11+a21*b12;out[6]=a02*b10+a12*b11+a22*b12;out[7]=a03*b10+a13*b11+a23*b12;out[8]=a00*b20+a10*b21+a20*b22;out[9]=a01*b20+a11*b21+a21*b22;out[10]=a02*b20+a12*b21+a22*b22;out[11]=a03*b20+a13*b21+a23*b22;if(a!==out){ // If the source and destination differ, copy the unchanged last row
out[12]=a[12];out[13]=a[13];out[14]=a[14];out[15]=a[15];}return out;}; /**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */mat4.rotateX=function(out,a,rad){var s=Math.sin(rad),c=Math.cos(rad),a10=a[4],a11=a[5],a12=a[6],a13=a[7],a20=a[8],a21=a[9],a22=a[10],a23=a[11];if(a!==out){ // If the source and destination differ, copy the unchanged rows
out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];out[12]=a[12];out[13]=a[13];out[14]=a[14];out[15]=a[15];} // Perform axis-specific matrix multiplication
out[4]=a10*c+a20*s;out[5]=a11*c+a21*s;out[6]=a12*c+a22*s;out[7]=a13*c+a23*s;out[8]=a20*c-a10*s;out[9]=a21*c-a11*s;out[10]=a22*c-a12*s;out[11]=a23*c-a13*s;return out;}; /**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */mat4.rotateY=function(out,a,rad){var s=Math.sin(rad),c=Math.cos(rad),a00=a[0],a01=a[1],a02=a[2],a03=a[3],a20=a[8],a21=a[9],a22=a[10],a23=a[11];if(a!==out){ // If the source and destination differ, copy the unchanged rows
out[4]=a[4];out[5]=a[5];out[6]=a[6];out[7]=a[7];out[12]=a[12];out[13]=a[13];out[14]=a[14];out[15]=a[15];} // Perform axis-specific matrix multiplication
out[0]=a00*c-a20*s;out[1]=a01*c-a21*s;out[2]=a02*c-a22*s;out[3]=a03*c-a23*s;out[8]=a00*s+a20*c;out[9]=a01*s+a21*c;out[10]=a02*s+a22*c;out[11]=a03*s+a23*c;return out;}; /**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */mat4.rotateZ=function(out,a,rad){var s=Math.sin(rad),c=Math.cos(rad),a00=a[0],a01=a[1],a02=a[2],a03=a[3],a10=a[4],a11=a[5],a12=a[6],a13=a[7];if(a!==out){ // If the source and destination differ, copy the unchanged last row
out[8]=a[8];out[9]=a[9];out[10]=a[10];out[11]=a[11];out[12]=a[12];out[13]=a[13];out[14]=a[14];out[15]=a[15];} // Perform axis-specific matrix multiplication
out[0]=a00*c+a10*s;out[1]=a01*c+a11*s;out[2]=a02*c+a12*s;out[3]=a03*c+a13*s;out[4]=a10*c-a00*s;out[5]=a11*c-a01*s;out[6]=a12*c-a02*s;out[7]=a13*c-a03*s;return out;}; /**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */mat4.fromTranslation=function(out,v){out[0]=1;out[1]=0;out[2]=0;out[3]=0;out[4]=0;out[5]=1;out[6]=0;out[7]=0;out[8]=0;out[9]=0;out[10]=1;out[11]=0;out[12]=v[0];out[13]=v[1];out[14]=v[2];out[15]=1;return out;}; /**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */mat4.fromScaling=function(out,v){out[0]=v[0];out[1]=0;out[2]=0;out[3]=0;out[4]=0;out[5]=v[1];out[6]=0;out[7]=0;out[8]=0;out[9]=0;out[10]=v[2];out[11]=0;out[12]=0;out[13]=0;out[14]=0;out[15]=1;return out;}; /**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */mat4.fromRotation=function(out,rad,axis){var x=axis[0],y=axis[1],z=axis[2],len=Math.sqrt(x*x+y*y+z*z),s,c,t;if(Math.abs(len)<glMatrix.EPSILON){return null;}len=1/len;x*=len;y*=len;z*=len;s=Math.sin(rad);c=Math.cos(rad);t=1-c; // Perform rotation-specific matrix multiplication
out[0]=x*x*t+c;out[1]=y*x*t+z*s;out[2]=z*x*t-y*s;out[3]=0;out[4]=x*y*t-z*s;out[5]=y*y*t+c;out[6]=z*y*t+x*s;out[7]=0;out[8]=x*z*t+y*s;out[9]=y*z*t-x*s;out[10]=z*z*t+c;out[11]=0;out[12]=0;out[13]=0;out[14]=0;out[15]=1;return out;}; /**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */mat4.fromXRotation=function(out,rad){var s=Math.sin(rad),c=Math.cos(rad); // Perform axis-specific matrix multiplication
out[0]=1;out[1]=0;out[2]=0;out[3]=0;out[4]=0;out[5]=c;out[6]=s;out[7]=0;out[8]=0;out[9]=-s;out[10]=c;out[11]=0;out[12]=0;out[13]=0;out[14]=0;out[15]=1;return out;}; /**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */mat4.fromYRotation=function(out,rad){var s=Math.sin(rad),c=Math.cos(rad); // Perform axis-specific matrix multiplication
out[0]=c;out[1]=0;out[2]=-s;out[3]=0;out[4]=0;out[5]=1;out[6]=0;out[7]=0;out[8]=s;out[9]=0;out[10]=c;out[11]=0;out[12]=0;out[13]=0;out[14]=0;out[15]=1;return out;}; /**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */mat4.fromZRotation=function(out,rad){var s=Math.sin(rad),c=Math.cos(rad); // Perform axis-specific matrix multiplication
out[0]=c;out[1]=s;out[2]=0;out[3]=0;out[4]=-s;out[5]=c;out[6]=0;out[7]=0;out[8]=0;out[9]=0;out[10]=1;out[11]=0;out[12]=0;out[13]=0;out[14]=0;out[15]=1;return out;}; /**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */mat4.fromRotationTranslation=function(out,q,v){ // Quaternion math
var x=q[0],y=q[1],z=q[2],w=q[3],x2=x+x,y2=y+y,z2=z+z,xx=x*x2,xy=x*y2,xz=x*z2,yy=y*y2,yz=y*z2,zz=z*z2,wx=w*x2,wy=w*y2,wz=w*z2;out[0]=1-(yy+zz);out[1]=xy+wz;out[2]=xz-wy;out[3]=0;out[4]=xy-wz;out[5]=1-(xx+zz);out[6]=yz+wx;out[7]=0;out[8]=xz+wy;out[9]=yz-wx;out[10]=1-(xx+yy);out[11]=0;out[12]=v[0];out[13]=v[1];out[14]=v[2];out[15]=1;return out;}; /**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */mat4.fromRotationTranslationScale=function(out,q,v,s){ // Quaternion math
var x=q[0],y=q[1],z=q[2],w=q[3],x2=x+x,y2=y+y,z2=z+z,xx=x*x2,xy=x*y2,xz=x*z2,yy=y*y2,yz=y*z2,zz=z*z2,wx=w*x2,wy=w*y2,wz=w*z2,sx=s[0],sy=s[1],sz=s[2];out[0]=(1-(yy+zz))*sx;out[1]=(xy+wz)*sx;out[2]=(xz-wy)*sx;out[3]=0;out[4]=(xy-wz)*sy;out[5]=(1-(xx+zz))*sy;out[6]=(yz+wx)*sy;out[7]=0;out[8]=(xz+wy)*sz;out[9]=(yz-wx)*sz;out[10]=(1-(xx+yy))*sz;out[11]=0;out[12]=v[0];out[13]=v[1];out[14]=v[2];out[15]=1;return out;}; /**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */mat4.fromRotationTranslationScaleOrigin=function(out,q,v,s,o){ // Quaternion math
var x=q[0],y=q[1],z=q[2],w=q[3],x2=x+x,y2=y+y,z2=z+z,xx=x*x2,xy=x*y2,xz=x*z2,yy=y*y2,yz=y*z2,zz=z*z2,wx=w*x2,wy=w*y2,wz=w*z2,sx=s[0],sy=s[1],sz=s[2],ox=o[0],oy=o[1],oz=o[2];out[0]=(1-(yy+zz))*sx;out[1]=(xy+wz)*sx;out[2]=(xz-wy)*sx;out[3]=0;out[4]=(xy-wz)*sy;out[5]=(1-(xx+zz))*sy;out[6]=(yz+wx)*sy;out[7]=0;out[8]=(xz+wy)*sz;out[9]=(yz-wx)*sz;out[10]=(1-(xx+yy))*sz;out[11]=0;out[12]=v[0]+ox-(out[0]*ox+out[4]*oy+out[8]*oz);out[13]=v[1]+oy-(out[1]*ox+out[5]*oy+out[9]*oz);out[14]=v[2]+oz-(out[2]*ox+out[6]*oy+out[10]*oz);out[15]=1;return out;};mat4.fromQuat=function(out,q){var x=q[0],y=q[1],z=q[2],w=q[3],x2=x+x,y2=y+y,z2=z+z,xx=x*x2,yx=y*x2,yy=y*y2,zx=z*x2,zy=z*y2,zz=z*z2,wx=w*x2,wy=w*y2,wz=w*z2;out[0]=1-yy-zz;out[1]=yx+wz;out[2]=zx-wy;out[3]=0;out[4]=yx-wz;out[5]=1-xx-zz;out[6]=zy+wx;out[7]=0;out[8]=zx+wy;out[9]=zy-wx;out[10]=1-xx-yy;out[11]=0;out[12]=0;out[13]=0;out[14]=0;out[15]=1;return out;}; /**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */mat4.frustum=function(out,left,right,bottom,top,near,far){var rl=1/(right-left),tb=1/(top-bottom),nf=1/(near-far);out[0]=near*2*rl;out[1]=0;out[2]=0;out[3]=0;out[4]=0;out[5]=near*2*tb;out[6]=0;out[7]=0;out[8]=(right+left)*rl;out[9]=(top+bottom)*tb;out[10]=(far+near)*nf;out[11]=-1;out[12]=0;out[13]=0;out[14]=far*near*2*nf;out[15]=0;return out;}; /**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */mat4.perspective=function(out,fovy,aspect,near,far){var f=1.0/Math.tan(fovy/2),nf=1/(near-far);out[0]=f/aspect;out[1]=0;out[2]=0;out[3]=0;out[4]=0;out[5]=f;out[6]=0;out[7]=0;out[8]=0;out[9]=0;out[10]=(far+near)*nf;out[11]=-1;out[12]=0;out[13]=0;out[14]=2*far*near*nf;out[15]=0;return out;}; /**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */mat4.perspectiveFromFieldOfView=function(out,fov,near,far){var upTan=Math.tan(fov.upDegrees*Math.PI/180.0),downTan=Math.tan(fov.downDegrees*Math.PI/180.0),leftTan=Math.tan(fov.leftDegrees*Math.PI/180.0),rightTan=Math.tan(fov.rightDegrees*Math.PI/180.0),xScale=2.0/(leftTan+rightTan),yScale=2.0/(upTan+downTan);out[0]=xScale;out[1]=0.0;out[2]=0.0;out[3]=0.0;out[4]=0.0;out[5]=yScale;out[6]=0.0;out[7]=0.0;out[8]=-((leftTan-rightTan)*xScale*0.5);out[9]=(upTan-downTan)*yScale*0.5;out[10]=far/(near-far);out[11]=-1.0;out[12]=0.0;out[13]=0.0;out[14]=far*near/(near-far);out[15]=0.0;return out;}; /**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */mat4.ortho=function(out,left,right,bottom,top,near,far){var lr=1/(left-right),bt=1/(bottom-top),nf=1/(near-far);out[0]=-2*lr;out[1]=0;out[2]=0;out[3]=0;out[4]=0;out[5]=-2*bt;out[6]=0;out[7]=0;out[8]=0;out[9]=0;out[10]=2*nf;out[11]=0;out[12]=(left+right)*lr;out[13]=(top+bottom)*bt;out[14]=(far+near)*nf;out[15]=1;return out;}; /**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */mat4.lookAt=function(out,eye,center,up){var x0,x1,x2,y0,y1,y2,z0,z1,z2,len,eyex=eye[0],eyey=eye[1],eyez=eye[2],upx=up[0],upy=up[1],upz=up[2],centerx=center[0],centery=center[1],centerz=center[2];if(Math.abs(eyex-centerx)<glMatrix.EPSILON&&Math.abs(eyey-centery)<glMatrix.EPSILON&&Math.abs(eyez-centerz)<glMatrix.EPSILON){return mat4.identity(out);}z0=eyex-centerx;z1=eyey-centery;z2=eyez-centerz;len=1/Math.sqrt(z0*z0+z1*z1+z2*z2);z0*=len;z1*=len;z2*=len;x0=upy*z2-upz*z1;x1=upz*z0-upx*z2;x2=upx*z1-upy*z0;len=Math.sqrt(x0*x0+x1*x1+x2*x2);if(!len){x0=0;x1=0;x2=0;}else {len=1/len;x0*=len;x1*=len;x2*=len;}y0=z1*x2-z2*x1;y1=z2*x0-z0*x2;y2=z0*x1-z1*x0;len=Math.sqrt(y0*y0+y1*y1+y2*y2);if(!len){y0=0;y1=0;y2=0;}else {len=1/len;y0*=len;y1*=len;y2*=len;}out[0]=x0;out[1]=y0;out[2]=z0;out[3]=0;out[4]=x1;out[5]=y1;out[6]=z1;out[7]=0;out[8]=x2;out[9]=y2;out[10]=z2;out[11]=0;out[12]=-(x0*eyex+x1*eyey+x2*eyez);out[13]=-(y0*eyex+y1*eyey+y2*eyez);out[14]=-(z0*eyex+z1*eyey+z2*eyez);out[15]=1;return out;}; /**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */mat4.str=function(a){return 'mat4('+a[0]+', '+a[1]+', '+a[2]+', '+a[3]+', '+a[4]+', '+a[5]+', '+a[6]+', '+a[7]+', '+a[8]+', '+a[9]+', '+a[10]+', '+a[11]+', '+a[12]+', '+a[13]+', '+a[14]+', '+a[15]+')';}; /**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */mat4.frob=function(a){return Math.sqrt(Math.pow(a[0],2)+Math.pow(a[1],2)+Math.pow(a[2],2)+Math.pow(a[3],2)+Math.pow(a[4],2)+Math.pow(a[5],2)+Math.pow(a[6],2)+Math.pow(a[7],2)+Math.pow(a[8],2)+Math.pow(a[9],2)+Math.pow(a[10],2)+Math.pow(a[11],2)+Math.pow(a[12],2)+Math.pow(a[13],2)+Math.pow(a[14],2)+Math.pow(a[15],2));};module.exports=mat4;},{"./common.js":2}],7:[function(_dereq_,module,exports){ /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */var glMatrix=_dereq_("./common.js");var mat3=_dereq_("./mat3.js");var vec3=_dereq_("./vec3.js");var vec4=_dereq_("./vec4.js"); /**
 * @class Quaternion
 * @name quat
 */var quat={}; /**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */quat.create=function(){var out=new glMatrix.ARRAY_TYPE(4);out[0]=0;out[1]=0;out[2]=0;out[3]=1;return out;}; /**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */quat.rotationTo=function(){var tmpvec3=vec3.create();var xUnitVec3=vec3.fromValues(1,0,0);var yUnitVec3=vec3.fromValues(0,1,0);return function(out,a,b){var dot=vec3.dot(a,b);if(dot<-0.999999){vec3.cross(tmpvec3,xUnitVec3,a);if(vec3.length(tmpvec3)<0.000001)vec3.cross(tmpvec3,yUnitVec3,a);vec3.normalize(tmpvec3,tmpvec3);quat.setAxisAngle(out,tmpvec3,Math.PI);return out;}else if(dot>0.999999){out[0]=0;out[1]=0;out[2]=0;out[3]=1;return out;}else {vec3.cross(tmpvec3,a,b);out[0]=tmpvec3[0];out[1]=tmpvec3[1];out[2]=tmpvec3[2];out[3]=1+dot;return quat.normalize(out,out);}};}(); /**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */quat.setAxes=function(){var matr=mat3.create();return function(out,view,right,up){matr[0]=right[0];matr[3]=right[1];matr[6]=right[2];matr[1]=up[0];matr[4]=up[1];matr[7]=up[2];matr[2]=-view[0];matr[5]=-view[1];matr[8]=-view[2];return quat.normalize(out,quat.fromMat3(out,matr));};}(); /**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */quat.clone=vec4.clone; /**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */quat.fromValues=vec4.fromValues; /**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */quat.copy=vec4.copy; /**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */quat.set=vec4.set; /**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */quat.identity=function(out){out[0]=0;out[1]=0;out[2]=0;out[3]=1;return out;}; /**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/quat.setAxisAngle=function(out,axis,rad){rad=rad*0.5;var s=Math.sin(rad);out[0]=s*axis[0];out[1]=s*axis[1];out[2]=s*axis[2];out[3]=Math.cos(rad);return out;}; /**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */quat.add=vec4.add; /**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */quat.multiply=function(out,a,b){var ax=a[0],ay=a[1],az=a[2],aw=a[3],bx=b[0],by=b[1],bz=b[2],bw=b[3];out[0]=ax*bw+aw*bx+ay*bz-az*by;out[1]=ay*bw+aw*by+az*bx-ax*bz;out[2]=az*bw+aw*bz+ax*by-ay*bx;out[3]=aw*bw-ax*bx-ay*by-az*bz;return out;}; /**
 * Alias for {@link quat.multiply}
 * @function
 */quat.mul=quat.multiply; /**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */quat.scale=vec4.scale; /**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */quat.rotateX=function(out,a,rad){rad*=0.5;var ax=a[0],ay=a[1],az=a[2],aw=a[3],bx=Math.sin(rad),bw=Math.cos(rad);out[0]=ax*bw+aw*bx;out[1]=ay*bw+az*bx;out[2]=az*bw-ay*bx;out[3]=aw*bw-ax*bx;return out;}; /**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */quat.rotateY=function(out,a,rad){rad*=0.5;var ax=a[0],ay=a[1],az=a[2],aw=a[3],by=Math.sin(rad),bw=Math.cos(rad);out[0]=ax*bw-az*by;out[1]=ay*bw+aw*by;out[2]=az*bw+ax*by;out[3]=aw*bw-ay*by;return out;}; /**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */quat.rotateZ=function(out,a,rad){rad*=0.5;var ax=a[0],ay=a[1],az=a[2],aw=a[3],bz=Math.sin(rad),bw=Math.cos(rad);out[0]=ax*bw+ay*bz;out[1]=ay*bw-ax*bz;out[2]=az*bw+aw*bz;out[3]=aw*bw-az*bz;return out;}; /**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */quat.calculateW=function(out,a){var x=a[0],y=a[1],z=a[2];out[0]=x;out[1]=y;out[2]=z;out[3]=Math.sqrt(Math.abs(1.0-x*x-y*y-z*z));return out;}; /**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */quat.dot=vec4.dot; /**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */quat.lerp=vec4.lerp; /**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */quat.slerp=function(out,a,b,t){ // benchmarks:
//    http://jsperf.com/quaternion-slerp-implementations
var ax=a[0],ay=a[1],az=a[2],aw=a[3],bx=b[0],by=b[1],bz=b[2],bw=b[3];var omega,cosom,sinom,scale0,scale1; // calc cosine
cosom=ax*bx+ay*by+az*bz+aw*bw; // adjust signs (if necessary)
if(cosom<0.0){cosom=-cosom;bx=-bx;by=-by;bz=-bz;bw=-bw;} // calculate coefficients
if(1.0-cosom>0.000001){ // standard case (slerp)
omega=Math.acos(cosom);sinom=Math.sin(omega);scale0=Math.sin((1.0-t)*omega)/sinom;scale1=Math.sin(t*omega)/sinom;}else { // "from" and "to" quaternions are very close 
//  ... so we can do a linear interpolation
scale0=1.0-t;scale1=t;} // calculate final values
out[0]=scale0*ax+scale1*bx;out[1]=scale0*ay+scale1*by;out[2]=scale0*az+scale1*bz;out[3]=scale0*aw+scale1*bw;return out;}; /**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */quat.sqlerp=function(){var temp1=quat.create();var temp2=quat.create();return function(out,a,b,c,d,t){quat.slerp(temp1,a,d,t);quat.slerp(temp2,b,c,t);quat.slerp(out,temp1,temp2,2*t*(1-t));return out;};}(); /**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */quat.invert=function(out,a){var a0=a[0],a1=a[1],a2=a[2],a3=a[3],dot=a0*a0+a1*a1+a2*a2+a3*a3,invDot=dot?1.0/dot:0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
out[0]=-a0*invDot;out[1]=-a1*invDot;out[2]=-a2*invDot;out[3]=a3*invDot;return out;}; /**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */quat.conjugate=function(out,a){out[0]=-a[0];out[1]=-a[1];out[2]=-a[2];out[3]=a[3];return out;}; /**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */quat.length=vec4.length; /**
 * Alias for {@link quat.length}
 * @function
 */quat.len=quat.length; /**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */quat.squaredLength=vec4.squaredLength; /**
 * Alias for {@link quat.squaredLength}
 * @function
 */quat.sqrLen=quat.squaredLength; /**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */quat.normalize=vec4.normalize; /**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */quat.fromMat3=function(out,m){ // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
// article "Quaternion Calculus and Fast Animation".
var fTrace=m[0]+m[4]+m[8];var fRoot;if(fTrace>0.0){ // |w| > 1/2, may as well choose w > 1/2
fRoot=Math.sqrt(fTrace+1.0); // 2w
out[3]=0.5*fRoot;fRoot=0.5/fRoot; // 1/(4w)
out[0]=(m[5]-m[7])*fRoot;out[1]=(m[6]-m[2])*fRoot;out[2]=(m[1]-m[3])*fRoot;}else { // |w| <= 1/2
var i=0;if(m[4]>m[0])i=1;if(m[8]>m[i*3+i])i=2;var j=(i+1)%3;var k=(i+2)%3;fRoot=Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k]+1.0);out[i]=0.5*fRoot;fRoot=0.5/fRoot;out[3]=(m[j*3+k]-m[k*3+j])*fRoot;out[j]=(m[j*3+i]+m[i*3+j])*fRoot;out[k]=(m[k*3+i]+m[i*3+k])*fRoot;}return out;}; /**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */quat.str=function(a){return 'quat('+a[0]+', '+a[1]+', '+a[2]+', '+a[3]+')';};module.exports=quat;},{"./common.js":2,"./mat3.js":5,"./vec3.js":9,"./vec4.js":10}],8:[function(_dereq_,module,exports){ /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */var glMatrix=_dereq_("./common.js"); /**
 * @class 2 Dimensional Vector
 * @name vec2
 */var vec2={}; /**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */vec2.create=function(){var out=new glMatrix.ARRAY_TYPE(2);out[0]=0;out[1]=0;return out;}; /**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */vec2.clone=function(a){var out=new glMatrix.ARRAY_TYPE(2);out[0]=a[0];out[1]=a[1];return out;}; /**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */vec2.fromValues=function(x,y){var out=new glMatrix.ARRAY_TYPE(2);out[0]=x;out[1]=y;return out;}; /**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */vec2.copy=function(out,a){out[0]=a[0];out[1]=a[1];return out;}; /**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */vec2.set=function(out,x,y){out[0]=x;out[1]=y;return out;}; /**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */vec2.add=function(out,a,b){out[0]=a[0]+b[0];out[1]=a[1]+b[1];return out;}; /**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */vec2.subtract=function(out,a,b){out[0]=a[0]-b[0];out[1]=a[1]-b[1];return out;}; /**
 * Alias for {@link vec2.subtract}
 * @function
 */vec2.sub=vec2.subtract; /**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */vec2.multiply=function(out,a,b){out[0]=a[0]*b[0];out[1]=a[1]*b[1];return out;}; /**
 * Alias for {@link vec2.multiply}
 * @function
 */vec2.mul=vec2.multiply; /**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */vec2.divide=function(out,a,b){out[0]=a[0]/b[0];out[1]=a[1]/b[1];return out;}; /**
 * Alias for {@link vec2.divide}
 * @function
 */vec2.div=vec2.divide; /**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */vec2.min=function(out,a,b){out[0]=Math.min(a[0],b[0]);out[1]=Math.min(a[1],b[1]);return out;}; /**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */vec2.max=function(out,a,b){out[0]=Math.max(a[0],b[0]);out[1]=Math.max(a[1],b[1]);return out;}; /**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */vec2.scale=function(out,a,b){out[0]=a[0]*b;out[1]=a[1]*b;return out;}; /**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */vec2.scaleAndAdd=function(out,a,b,scale){out[0]=a[0]+b[0]*scale;out[1]=a[1]+b[1]*scale;return out;}; /**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */vec2.distance=function(a,b){var x=b[0]-a[0],y=b[1]-a[1];return Math.sqrt(x*x+y*y);}; /**
 * Alias for {@link vec2.distance}
 * @function
 */vec2.dist=vec2.distance; /**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */vec2.squaredDistance=function(a,b){var x=b[0]-a[0],y=b[1]-a[1];return x*x+y*y;}; /**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */vec2.sqrDist=vec2.squaredDistance; /**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */vec2.length=function(a){var x=a[0],y=a[1];return Math.sqrt(x*x+y*y);}; /**
 * Alias for {@link vec2.length}
 * @function
 */vec2.len=vec2.length; /**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */vec2.squaredLength=function(a){var x=a[0],y=a[1];return x*x+y*y;}; /**
 * Alias for {@link vec2.squaredLength}
 * @function
 */vec2.sqrLen=vec2.squaredLength; /**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */vec2.negate=function(out,a){out[0]=-a[0];out[1]=-a[1];return out;}; /**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */vec2.inverse=function(out,a){out[0]=1.0/a[0];out[1]=1.0/a[1];return out;}; /**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */vec2.normalize=function(out,a){var x=a[0],y=a[1];var len=x*x+y*y;if(len>0){ //TODO: evaluate use of glm_invsqrt here?
len=1/Math.sqrt(len);out[0]=a[0]*len;out[1]=a[1]*len;}return out;}; /**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */vec2.dot=function(a,b){return a[0]*b[0]+a[1]*b[1];}; /**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */vec2.cross=function(out,a,b){var z=a[0]*b[1]-a[1]*b[0];out[0]=out[1]=0;out[2]=z;return out;}; /**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */vec2.lerp=function(out,a,b,t){var ax=a[0],ay=a[1];out[0]=ax+t*(b[0]-ax);out[1]=ay+t*(b[1]-ay);return out;}; /**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */vec2.random=function(out,scale){scale=scale||1.0;var r=glMatrix.RANDOM()*2.0*Math.PI;out[0]=Math.cos(r)*scale;out[1]=Math.sin(r)*scale;return out;}; /**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */vec2.transformMat2=function(out,a,m){var x=a[0],y=a[1];out[0]=m[0]*x+m[2]*y;out[1]=m[1]*x+m[3]*y;return out;}; /**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */vec2.transformMat2d=function(out,a,m){var x=a[0],y=a[1];out[0]=m[0]*x+m[2]*y+m[4];out[1]=m[1]*x+m[3]*y+m[5];return out;}; /**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */vec2.transformMat3=function(out,a,m){var x=a[0],y=a[1];out[0]=m[0]*x+m[3]*y+m[6];out[1]=m[1]*x+m[4]*y+m[7];return out;}; /**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */vec2.transformMat4=function(out,a,m){var x=a[0],y=a[1];out[0]=m[0]*x+m[4]*y+m[12];out[1]=m[1]*x+m[5]*y+m[13];return out;}; /**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */vec2.forEach=function(){var vec=vec2.create();return function(a,stride,offset,count,fn,arg){var i,l;if(!stride){stride=2;}if(!offset){offset=0;}if(count){l=Math.min(count*stride+offset,a.length);}else {l=a.length;}for(i=offset;i<l;i+=stride){vec[0]=a[i];vec[1]=a[i+1];fn(vec,vec,arg);a[i]=vec[0];a[i+1]=vec[1];}return a;};}(); /**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */vec2.str=function(a){return 'vec2('+a[0]+', '+a[1]+')';};module.exports=vec2;},{"./common.js":2}],9:[function(_dereq_,module,exports){ /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */var glMatrix=_dereq_("./common.js"); /**
 * @class 3 Dimensional Vector
 * @name vec3
 */var vec3={}; /**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */vec3.create=function(){var out=new glMatrix.ARRAY_TYPE(3);out[0]=0;out[1]=0;out[2]=0;return out;}; /**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */vec3.clone=function(a){var out=new glMatrix.ARRAY_TYPE(3);out[0]=a[0];out[1]=a[1];out[2]=a[2];return out;}; /**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */vec3.fromValues=function(x,y,z){var out=new glMatrix.ARRAY_TYPE(3);out[0]=x;out[1]=y;out[2]=z;return out;}; /**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */vec3.copy=function(out,a){out[0]=a[0];out[1]=a[1];out[2]=a[2];return out;}; /**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */vec3.set=function(out,x,y,z){out[0]=x;out[1]=y;out[2]=z;return out;}; /**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */vec3.add=function(out,a,b){out[0]=a[0]+b[0];out[1]=a[1]+b[1];out[2]=a[2]+b[2];return out;}; /**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */vec3.subtract=function(out,a,b){out[0]=a[0]-b[0];out[1]=a[1]-b[1];out[2]=a[2]-b[2];return out;}; /**
 * Alias for {@link vec3.subtract}
 * @function
 */vec3.sub=vec3.subtract; /**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */vec3.multiply=function(out,a,b){out[0]=a[0]*b[0];out[1]=a[1]*b[1];out[2]=a[2]*b[2];return out;}; /**
 * Alias for {@link vec3.multiply}
 * @function
 */vec3.mul=vec3.multiply; /**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */vec3.divide=function(out,a,b){out[0]=a[0]/b[0];out[1]=a[1]/b[1];out[2]=a[2]/b[2];return out;}; /**
 * Alias for {@link vec3.divide}
 * @function
 */vec3.div=vec3.divide; /**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */vec3.min=function(out,a,b){out[0]=Math.min(a[0],b[0]);out[1]=Math.min(a[1],b[1]);out[2]=Math.min(a[2],b[2]);return out;}; /**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */vec3.max=function(out,a,b){out[0]=Math.max(a[0],b[0]);out[1]=Math.max(a[1],b[1]);out[2]=Math.max(a[2],b[2]);return out;}; /**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */vec3.scale=function(out,a,b){out[0]=a[0]*b;out[1]=a[1]*b;out[2]=a[2]*b;return out;}; /**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */vec3.scaleAndAdd=function(out,a,b,scale){out[0]=a[0]+b[0]*scale;out[1]=a[1]+b[1]*scale;out[2]=a[2]+b[2]*scale;return out;}; /**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */vec3.distance=function(a,b){var x=b[0]-a[0],y=b[1]-a[1],z=b[2]-a[2];return Math.sqrt(x*x+y*y+z*z);}; /**
 * Alias for {@link vec3.distance}
 * @function
 */vec3.dist=vec3.distance; /**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */vec3.squaredDistance=function(a,b){var x=b[0]-a[0],y=b[1]-a[1],z=b[2]-a[2];return x*x+y*y+z*z;}; /**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */vec3.sqrDist=vec3.squaredDistance; /**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */vec3.length=function(a){var x=a[0],y=a[1],z=a[2];return Math.sqrt(x*x+y*y+z*z);}; /**
 * Alias for {@link vec3.length}
 * @function
 */vec3.len=vec3.length; /**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */vec3.squaredLength=function(a){var x=a[0],y=a[1],z=a[2];return x*x+y*y+z*z;}; /**
 * Alias for {@link vec3.squaredLength}
 * @function
 */vec3.sqrLen=vec3.squaredLength; /**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */vec3.negate=function(out,a){out[0]=-a[0];out[1]=-a[1];out[2]=-a[2];return out;}; /**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */vec3.inverse=function(out,a){out[0]=1.0/a[0];out[1]=1.0/a[1];out[2]=1.0/a[2];return out;}; /**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */vec3.normalize=function(out,a){var x=a[0],y=a[1],z=a[2];var len=x*x+y*y+z*z;if(len>0){ //TODO: evaluate use of glm_invsqrt here?
len=1/Math.sqrt(len);out[0]=a[0]*len;out[1]=a[1]*len;out[2]=a[2]*len;}return out;}; /**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */vec3.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}; /**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */vec3.cross=function(out,a,b){var ax=a[0],ay=a[1],az=a[2],bx=b[0],by=b[1],bz=b[2];out[0]=ay*bz-az*by;out[1]=az*bx-ax*bz;out[2]=ax*by-ay*bx;return out;}; /**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */vec3.lerp=function(out,a,b,t){var ax=a[0],ay=a[1],az=a[2];out[0]=ax+t*(b[0]-ax);out[1]=ay+t*(b[1]-ay);out[2]=az+t*(b[2]-az);return out;}; /**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */vec3.hermite=function(out,a,b,c,d,t){var factorTimes2=t*t,factor1=factorTimes2*(2*t-3)+1,factor2=factorTimes2*(t-2)+t,factor3=factorTimes2*(t-1),factor4=factorTimes2*(3-2*t);out[0]=a[0]*factor1+b[0]*factor2+c[0]*factor3+d[0]*factor4;out[1]=a[1]*factor1+b[1]*factor2+c[1]*factor3+d[1]*factor4;out[2]=a[2]*factor1+b[2]*factor2+c[2]*factor3+d[2]*factor4;return out;}; /**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */vec3.bezier=function(out,a,b,c,d,t){var inverseFactor=1-t,inverseFactorTimesTwo=inverseFactor*inverseFactor,factorTimes2=t*t,factor1=inverseFactorTimesTwo*inverseFactor,factor2=3*t*inverseFactorTimesTwo,factor3=3*factorTimes2*inverseFactor,factor4=factorTimes2*t;out[0]=a[0]*factor1+b[0]*factor2+c[0]*factor3+d[0]*factor4;out[1]=a[1]*factor1+b[1]*factor2+c[1]*factor3+d[1]*factor4;out[2]=a[2]*factor1+b[2]*factor2+c[2]*factor3+d[2]*factor4;return out;}; /**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */vec3.random=function(out,scale){scale=scale||1.0;var r=glMatrix.RANDOM()*2.0*Math.PI;var z=glMatrix.RANDOM()*2.0-1.0;var zScale=Math.sqrt(1.0-z*z)*scale;out[0]=Math.cos(r)*zScale;out[1]=Math.sin(r)*zScale;out[2]=z*scale;return out;}; /**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */vec3.transformMat4=function(out,a,m){var x=a[0],y=a[1],z=a[2],w=m[3]*x+m[7]*y+m[11]*z+m[15];w=w||1.0;out[0]=(m[0]*x+m[4]*y+m[8]*z+m[12])/w;out[1]=(m[1]*x+m[5]*y+m[9]*z+m[13])/w;out[2]=(m[2]*x+m[6]*y+m[10]*z+m[14])/w;return out;}; /**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */vec3.transformMat3=function(out,a,m){var x=a[0],y=a[1],z=a[2];out[0]=x*m[0]+y*m[3]+z*m[6];out[1]=x*m[1]+y*m[4]+z*m[7];out[2]=x*m[2]+y*m[5]+z*m[8];return out;}; /**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */vec3.transformQuat=function(out,a,q){ // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations
var x=a[0],y=a[1],z=a[2],qx=q[0],qy=q[1],qz=q[2],qw=q[3], // calculate quat * vec
ix=qw*x+qy*z-qz*y,iy=qw*y+qz*x-qx*z,iz=qw*z+qx*y-qy*x,iw=-qx*x-qy*y-qz*z; // calculate result * inverse quat
out[0]=ix*qw+iw*-qx+iy*-qz-iz*-qy;out[1]=iy*qw+iw*-qy+iz*-qx-ix*-qz;out[2]=iz*qw+iw*-qz+ix*-qy-iy*-qx;return out;}; /**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */vec3.rotateX=function(out,a,b,c){var p=[],r=[]; //Translate point to the origin
p[0]=a[0]-b[0];p[1]=a[1]-b[1];p[2]=a[2]-b[2]; //perform rotation
r[0]=p[0];r[1]=p[1]*Math.cos(c)-p[2]*Math.sin(c);r[2]=p[1]*Math.sin(c)+p[2]*Math.cos(c); //translate to correct position
out[0]=r[0]+b[0];out[1]=r[1]+b[1];out[2]=r[2]+b[2];return out;}; /**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */vec3.rotateY=function(out,a,b,c){var p=[],r=[]; //Translate point to the origin
p[0]=a[0]-b[0];p[1]=a[1]-b[1];p[2]=a[2]-b[2]; //perform rotation
r[0]=p[2]*Math.sin(c)+p[0]*Math.cos(c);r[1]=p[1];r[2]=p[2]*Math.cos(c)-p[0]*Math.sin(c); //translate to correct position
out[0]=r[0]+b[0];out[1]=r[1]+b[1];out[2]=r[2]+b[2];return out;}; /**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */vec3.rotateZ=function(out,a,b,c){var p=[],r=[]; //Translate point to the origin
p[0]=a[0]-b[0];p[1]=a[1]-b[1];p[2]=a[2]-b[2]; //perform rotation
r[0]=p[0]*Math.cos(c)-p[1]*Math.sin(c);r[1]=p[0]*Math.sin(c)+p[1]*Math.cos(c);r[2]=p[2]; //translate to correct position
out[0]=r[0]+b[0];out[1]=r[1]+b[1];out[2]=r[2]+b[2];return out;}; /**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */vec3.forEach=function(){var vec=vec3.create();return function(a,stride,offset,count,fn,arg){var i,l;if(!stride){stride=3;}if(!offset){offset=0;}if(count){l=Math.min(count*stride+offset,a.length);}else {l=a.length;}for(i=offset;i<l;i+=stride){vec[0]=a[i];vec[1]=a[i+1];vec[2]=a[i+2];fn(vec,vec,arg);a[i]=vec[0];a[i+1]=vec[1];a[i+2]=vec[2];}return a;};}(); /**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */vec3.angle=function(a,b){var tempA=vec3.fromValues(a[0],a[1],a[2]);var tempB=vec3.fromValues(b[0],b[1],b[2]);vec3.normalize(tempA,tempA);vec3.normalize(tempB,tempB);var cosine=vec3.dot(tempA,tempB);if(cosine>1.0){return 0;}else {return Math.acos(cosine);}}; /**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */vec3.str=function(a){return 'vec3('+a[0]+', '+a[1]+', '+a[2]+')';};module.exports=vec3;},{"./common.js":2}],10:[function(_dereq_,module,exports){ /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */var glMatrix=_dereq_("./common.js"); /**
 * @class 4 Dimensional Vector
 * @name vec4
 */var vec4={}; /**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */vec4.create=function(){var out=new glMatrix.ARRAY_TYPE(4);out[0]=0;out[1]=0;out[2]=0;out[3]=0;return out;}; /**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */vec4.clone=function(a){var out=new glMatrix.ARRAY_TYPE(4);out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];return out;}; /**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */vec4.fromValues=function(x,y,z,w){var out=new glMatrix.ARRAY_TYPE(4);out[0]=x;out[1]=y;out[2]=z;out[3]=w;return out;}; /**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */vec4.copy=function(out,a){out[0]=a[0];out[1]=a[1];out[2]=a[2];out[3]=a[3];return out;}; /**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */vec4.set=function(out,x,y,z,w){out[0]=x;out[1]=y;out[2]=z;out[3]=w;return out;}; /**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */vec4.add=function(out,a,b){out[0]=a[0]+b[0];out[1]=a[1]+b[1];out[2]=a[2]+b[2];out[3]=a[3]+b[3];return out;}; /**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */vec4.subtract=function(out,a,b){out[0]=a[0]-b[0];out[1]=a[1]-b[1];out[2]=a[2]-b[2];out[3]=a[3]-b[3];return out;}; /**
 * Alias for {@link vec4.subtract}
 * @function
 */vec4.sub=vec4.subtract; /**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */vec4.multiply=function(out,a,b){out[0]=a[0]*b[0];out[1]=a[1]*b[1];out[2]=a[2]*b[2];out[3]=a[3]*b[3];return out;}; /**
 * Alias for {@link vec4.multiply}
 * @function
 */vec4.mul=vec4.multiply; /**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */vec4.divide=function(out,a,b){out[0]=a[0]/b[0];out[1]=a[1]/b[1];out[2]=a[2]/b[2];out[3]=a[3]/b[3];return out;}; /**
 * Alias for {@link vec4.divide}
 * @function
 */vec4.div=vec4.divide; /**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */vec4.min=function(out,a,b){out[0]=Math.min(a[0],b[0]);out[1]=Math.min(a[1],b[1]);out[2]=Math.min(a[2],b[2]);out[3]=Math.min(a[3],b[3]);return out;}; /**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */vec4.max=function(out,a,b){out[0]=Math.max(a[0],b[0]);out[1]=Math.max(a[1],b[1]);out[2]=Math.max(a[2],b[2]);out[3]=Math.max(a[3],b[3]);return out;}; /**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */vec4.scale=function(out,a,b){out[0]=a[0]*b;out[1]=a[1]*b;out[2]=a[2]*b;out[3]=a[3]*b;return out;}; /**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */vec4.scaleAndAdd=function(out,a,b,scale){out[0]=a[0]+b[0]*scale;out[1]=a[1]+b[1]*scale;out[2]=a[2]+b[2]*scale;out[3]=a[3]+b[3]*scale;return out;}; /**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */vec4.distance=function(a,b){var x=b[0]-a[0],y=b[1]-a[1],z=b[2]-a[2],w=b[3]-a[3];return Math.sqrt(x*x+y*y+z*z+w*w);}; /**
 * Alias for {@link vec4.distance}
 * @function
 */vec4.dist=vec4.distance; /**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */vec4.squaredDistance=function(a,b){var x=b[0]-a[0],y=b[1]-a[1],z=b[2]-a[2],w=b[3]-a[3];return x*x+y*y+z*z+w*w;}; /**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */vec4.sqrDist=vec4.squaredDistance; /**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */vec4.length=function(a){var x=a[0],y=a[1],z=a[2],w=a[3];return Math.sqrt(x*x+y*y+z*z+w*w);}; /**
 * Alias for {@link vec4.length}
 * @function
 */vec4.len=vec4.length; /**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */vec4.squaredLength=function(a){var x=a[0],y=a[1],z=a[2],w=a[3];return x*x+y*y+z*z+w*w;}; /**
 * Alias for {@link vec4.squaredLength}
 * @function
 */vec4.sqrLen=vec4.squaredLength; /**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */vec4.negate=function(out,a){out[0]=-a[0];out[1]=-a[1];out[2]=-a[2];out[3]=-a[3];return out;}; /**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */vec4.inverse=function(out,a){out[0]=1.0/a[0];out[1]=1.0/a[1];out[2]=1.0/a[2];out[3]=1.0/a[3];return out;}; /**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */vec4.normalize=function(out,a){var x=a[0],y=a[1],z=a[2],w=a[3];var len=x*x+y*y+z*z+w*w;if(len>0){len=1/Math.sqrt(len);out[0]=x*len;out[1]=y*len;out[2]=z*len;out[3]=w*len;}return out;}; /**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */vec4.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3];}; /**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */vec4.lerp=function(out,a,b,t){var ax=a[0],ay=a[1],az=a[2],aw=a[3];out[0]=ax+t*(b[0]-ax);out[1]=ay+t*(b[1]-ay);out[2]=az+t*(b[2]-az);out[3]=aw+t*(b[3]-aw);return out;}; /**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */vec4.random=function(out,scale){scale=scale||1.0; //TODO: This is a pretty awful way of doing this. Find something better.
out[0]=glMatrix.RANDOM();out[1]=glMatrix.RANDOM();out[2]=glMatrix.RANDOM();out[3]=glMatrix.RANDOM();vec4.normalize(out,out);vec4.scale(out,out,scale);return out;}; /**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */vec4.transformMat4=function(out,a,m){var x=a[0],y=a[1],z=a[2],w=a[3];out[0]=m[0]*x+m[4]*y+m[8]*z+m[12]*w;out[1]=m[1]*x+m[5]*y+m[9]*z+m[13]*w;out[2]=m[2]*x+m[6]*y+m[10]*z+m[14]*w;out[3]=m[3]*x+m[7]*y+m[11]*z+m[15]*w;return out;}; /**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */vec4.transformQuat=function(out,a,q){var x=a[0],y=a[1],z=a[2],qx=q[0],qy=q[1],qz=q[2],qw=q[3], // calculate quat * vec
ix=qw*x+qy*z-qz*y,iy=qw*y+qz*x-qx*z,iz=qw*z+qx*y-qy*x,iw=-qx*x-qy*y-qz*z; // calculate result * inverse quat
out[0]=ix*qw+iw*-qx+iy*-qz-iz*-qy;out[1]=iy*qw+iw*-qy+iz*-qx-ix*-qz;out[2]=iz*qw+iw*-qz+ix*-qy-iy*-qx;out[3]=a[3];return out;}; /**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */vec4.forEach=function(){var vec=vec4.create();return function(a,stride,offset,count,fn,arg){var i,l;if(!stride){stride=4;}if(!offset){offset=0;}if(count){l=Math.min(count*stride+offset,a.length);}else {l=a.length;}for(i=offset;i<l;i+=stride){vec[0]=a[i];vec[1]=a[i+1];vec[2]=a[i+2];vec[3]=a[i+3];fn(vec,vec,arg);a[i]=vec[0];a[i+1]=vec[1];a[i+2]=vec[2];a[i+3]=vec[3];}return a;};}(); /**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */vec4.str=function(a){return 'vec4('+a[0]+', '+a[1]+', '+a[2]+', '+a[3]+')';};module.exports=vec4;},{"./common.js":2}],11:[function(_dereq_,module,exports){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}(); // alfrid.js
//	TOOLS
//	CAMERAS
//	LOADERS
//	HELPERS
var _glMatrix=_dereq_('gl-matrix');var _glMatrix2=_interopRequireDefault(_glMatrix);var _GLTool=_dereq_('./alfrid/GLTool');var _GLTool2=_interopRequireDefault(_GLTool);var _GLShader=_dereq_('./alfrid/GLShader');var _GLShader2=_interopRequireDefault(_GLShader);var _GLTexture=_dereq_('./alfrid/GLTexture');var _GLTexture2=_interopRequireDefault(_GLTexture);var _Mesh=_dereq_('./alfrid/Mesh');var _Mesh2=_interopRequireDefault(_Mesh);var _Geom=_dereq_('./alfrid/Geom');var _Geom2=_interopRequireDefault(_Geom);var _Batch=_dereq_('./alfrid/Batch');var _Batch2=_interopRequireDefault(_Batch);var _FrameBuffer=_dereq_('./alfrid/FrameBuffer');var _FrameBuffer2=_interopRequireDefault(_FrameBuffer);var _Scheduler=_dereq_('./alfrid/tools/Scheduler');var _Scheduler2=_interopRequireDefault(_Scheduler);var _EventDispatcher=_dereq_('./alfrid/tools/EventDispatcher');var _EventDispatcher2=_interopRequireDefault(_EventDispatcher);var _EaseNumber=_dereq_('./alfrid/tools/EaseNumber');var _EaseNumber2=_interopRequireDefault(_EaseNumber);var _OrbitalControl=_dereq_('./alfrid/tools/OrbitalControl');var _OrbitalControl2=_interopRequireDefault(_OrbitalControl);var _Camera=_dereq_('./alfrid/cameras/Camera');var _Camera2=_interopRequireDefault(_Camera);var _CameraOrtho=_dereq_('./alfrid/cameras/CameraOrtho');var _CameraOrtho2=_interopRequireDefault(_CameraOrtho);var _CameraPerspective=_dereq_('./alfrid/cameras/CameraPerspective');var _CameraPerspective2=_interopRequireDefault(_CameraPerspective);var _BinaryLoader=_dereq_('./alfrid/loaders/BinaryLoader');var _BinaryLoader2=_interopRequireDefault(_BinaryLoader);var _ObjLoader=_dereq_('./alfrid/loaders/ObjLoader');var _ObjLoader2=_interopRequireDefault(_ObjLoader);var _BatchCopy=_dereq_('./alfrid/helpers/BatchCopy');var _BatchCopy2=_interopRequireDefault(_BatchCopy);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var VERSION='1.0.0';var alfrid=function(){function alfrid(){_classCallCheck(this,alfrid);this.glm=_glMatrix2.default;this.GL=_GLTool2.default;this.GLTool=_GLTool2.default;this.GLShader=_GLShader2.default;this.GLTexture=_GLTexture2.default;this.Mesh=_Mesh2.default;this.Geom=_Geom2.default;this.Batch=_Batch2.default;this.FrameBuffer=_FrameBuffer2.default;this.Scheduler=_Scheduler2.default;this.EventDispatcher=_EventDispatcher2.default;this.EaseNumber=_EaseNumber2.default;this.Camera=_Camera2.default;this.CameraOrtho=_CameraOrtho2.default;this.CameraPerspective=_CameraPerspective2.default;this.OrbitalControl=_OrbitalControl2.default;this.BinaryLoader=_BinaryLoader2.default;this.ObjLoader=_ObjLoader2.default;this.BatchCopy=_BatchCopy2.default; //	NOT SUPER SURE I'VE DONE THIS IS A GOOD WAY
for(var s in _glMatrix2.default){if(_glMatrix2.default[s]){window[s]=_glMatrix2.default[s];}} //	TESTING CODES
}_createClass(alfrid,[{key:'log',value:function log(){if(navigator.userAgent.indexOf('Chrome')>-1){console.log('%clib alfrid : VERSION '+VERSION,'background: #193441; color: #FCFFF5');}else {console.log('lib alfrid : VERSION ',VERSION);}console.log('%cClasses : ','color: #193441');for(var s in this){if(this[s]){console.log('%c - '+s,'color: #3E606F');}}}}]);return alfrid;}();var b=new alfrid();module.exports=b;},{"./alfrid/Batch":12,"./alfrid/FrameBuffer":13,"./alfrid/GLShader":14,"./alfrid/GLTexture":15,"./alfrid/GLTool":16,"./alfrid/Geom":17,"./alfrid/Mesh":18,"./alfrid/cameras/Camera":19,"./alfrid/cameras/CameraOrtho":20,"./alfrid/cameras/CameraPerspective":21,"./alfrid/helpers/BatchCopy":22,"./alfrid/loaders/BinaryLoader":23,"./alfrid/loaders/ObjLoader":24,"./alfrid/tools/EaseNumber":25,"./alfrid/tools/EventDispatcher":26,"./alfrid/tools/OrbitalControl":27,"./alfrid/tools/Scheduler":28,"gl-matrix":1}],12:[function(_dereq_,module,exports){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}(); // Batch.js
Object.defineProperty(exports,"__esModule",{value:true});var _GLTool=_dereq_('./GLTool');var _GLTool2=_interopRequireDefault(_GLTool);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Batch=function(){function Batch(mMesh,mShader){_classCallCheck(this,Batch);this._mesh=mMesh;this._shader=mShader;} //	PUBLIC METHODS
_createClass(Batch,[{key:'draw',value:function draw(){this._shader.bind();_GLTool2.default.draw(this.mesh);} //	GETTER AND SETTER
},{key:'mesh',get:function get(){return this._mesh;}},{key:'shader',get:function get(){return this._shader;}}]);return Batch;}();exports.default=Batch;},{"./GLTool":16}],13:[function(_dereq_,module,exports){ // FrameBuffer.js
'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();Object.defineProperty(exports,"__esModule",{value:true});var _GLTool=_dereq_('./GLTool');var _GLTool2=_interopRequireDefault(_GLTool);var _GLTexture=_dereq_('./GLTexture');var _GLTexture2=_interopRequireDefault(_GLTexture);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var isPowerOfTwo=function isPowerOfTwo(x){return x!==0&&!(x&x-1);};var gl=undefined;var WEBGL_depth_texture=undefined;var FrameBuffer=function(){function FrameBuffer(mWidth,mHeight){var mParameters=arguments.length<=2||arguments[2]===undefined?{}:arguments[2];_classCallCheck(this,FrameBuffer);gl=_GLTool2.default.gl;WEBGL_depth_texture=_GLTool2.default.checkExtension('WEBGL_depth_texture');this.width=mWidth;this.height=mHeight;this.magFilter=mParameters.magFilter||gl.LINEAR;this.minFilter=mParameters.minFilter||gl.LINEAR;this.wrapS=mParameters.wrapS||gl.MIRRORED_REPEAT;this.wrapT=mParameters.wrapT||gl.MIRRORED_REPEAT;this.useDepth=mParameters.useDepth||true;this.useStencil=mParameters.useStencil||false;if(!isPowerOfTwo(this.width)||!isPowerOfTwo(this.height)){this.wrapS=this.wrapT=gl.CLAMP_TO_EDGE;if(this.minFilter===gl.LINEAR_MIPMAP_NEAREST){this.minFilter=gl.LINEAR;}}this._init();}_createClass(FrameBuffer,[{key:'_init',value:function _init(){this.texture=gl.createTexture();this.glTexture=new _GLTexture2.default(this.texture,true);this.depthTexture=gl.createTexture();this.glDepthTexture=new _GLTexture2.default(this.depthTexture,true);this.frameBuffer=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,this.frameBuffer); //	SETUP TEXTURE MIPMAP, WRAP
gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,this.magFilter);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,this.minFilter);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,this.wrapS);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,this.wrapT);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,this.width,this.height,0,gl.RGBA,gl.FLOAT,null);if(WEBGL_depth_texture){gl.bindTexture(gl.TEXTURE_2D,this.depthTexture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,this.magFilter);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,this.minFilter);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,this.wrapS);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,this.wrapT);gl.texImage2D(gl.TEXTURE_2D,0,gl.DEPTH_COMPONENT,this.width,this.height,0,gl.DEPTH_COMPONENT,gl.UNSIGNED_SHORT,null);} //	GET COLOUR
gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,this.texture,0); //	GET DEPTH
gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,this.depthTexture,0);if(this.minFilter===gl.LINEAR_MIPMAP_NEAREST){gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.generateMipmap(gl.TEXTURE_2D);} //	UNBIND
gl.bindTexture(gl.TEXTURE_2D,null);gl.bindRenderbuffer(gl.RENDERBUFFER,null);gl.bindFramebuffer(gl.FRAMEBUFFER,null);} //	PUBLIC METHODS
},{key:'bind',value:function bind(){_GLTool2.default.viewport(0,0,this.width,this.height);gl.bindFramebuffer(gl.FRAMEBUFFER,this.frameBuffer);}},{key:'unbind',value:function unbind(){gl.bindFramebuffer(gl.FRAMEBUFFER,null);} //	TEXTURES
},{key:'getTexture',value:function getTexture(){return this.glTexture;}},{key:'getDepthTexture',value:function getDepthTexture(){return this.glDepthTexture;} //	MIPMAP FILTER
},{key:'minFilter',value:function minFilter(mValue){if(mValue!==gl.LINEAR&&mValue!==gl.NEAREST&&mValue!==gl.LINEAR_MIPMAP_NEAREST){return this;}this.minFilter=mValue;return this;}},{key:'magFilter',value:function magFilter(mValue){if(mValue!==gl.LINEAR&&mValue!==gl.NEAREST&&mValue!==gl.LINEAR_MIPMAP_NEAREST){return this;}this.magFilter=mValue;return this;} //	WRAP
},{key:'wrapS',value:function wrapS(mValue){if(mValue!==gl.CLAMP_TO_EDGE&&mValue!==gl.REPEAT&&mValue!==gl.MIRRORED_REPEAT){return this;}this.wrapS=mValue;return this;}},{key:'wrapT',value:function wrapT(mValue){if(mValue!==gl.CLAMP_TO_EDGE&&mValue!==gl.REPEAT&&mValue!==gl.MIRRORED_REPEAT){return this;}this.wrapT=mValue;return this;}}]);return FrameBuffer;}();exports.default=FrameBuffer;},{"./GLTexture":15,"./GLTool":16}],14:[function(_dereq_,module,exports){ // GLShader.js
'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();Object.defineProperty(exports,"__esModule",{value:true});var _GLTool=_dereq_('./GLTool');var _GLTool2=_interopRequireDefault(_GLTool);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var addLineNumbers=function addLineNumbers(string){var lines=string.split('\n');for(var i=0;i<lines.length;i++){lines[i]=i+1+': '+lines[i];}return lines.join('\n');};var gl=undefined;var defaultVertexShader="#define GLSLIFY 1\n// basic.vert\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n    vTextureCoord = aTextureCoord;\n}";var defaultFragmentShader="#define GLSLIFY 1\n// basic.frag\n\n#define SHADER_NAME BASIC_FRAGMENT\n\nprecision highp float;\nvarying vec2 vTextureCoord;\nuniform float time;\n// uniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = vec4(vTextureCoord, sin(time) * .5 + .5, 1.0);\n}";var GLShader=function(){function GLShader(){var strVertexShader=arguments.length<=0||arguments[0]===undefined?defaultVertexShader:arguments[0];var strFragmentShader=arguments.length<=1||arguments[1]===undefined?defaultFragmentShader:arguments[1];_classCallCheck(this,GLShader);gl=_GLTool2.default.gl;this.parameters=[];this.uniformValues={};this.uniformTextures=[];if(!strVertexShader){strVertexShader=defaultVertexShader;}if(!strFragmentShader){strFragmentShader=defaultVertexShader;}var vsShader=this._createShaderProgram(strVertexShader,true);var fsShader=this._createShaderProgram(strFragmentShader,false);this._attachShaderProgram(vsShader,fsShader);}_createClass(GLShader,[{key:'bind',value:function bind(){gl.useProgram(this.shaderProgram);_GLTool2.default.useShader(this);this.uniformTextures=[];}},{key:'uniform',value:function uniform(mName,mType,mValue){var hasUniform=false;var oUniform=undefined;for(var i=0;i<this.parameters.length;i++){oUniform=this.parameters[i];if(oUniform.name===mName){oUniform.value=mValue;hasUniform=true;break;}}if(!hasUniform){this.shaderProgram[mName]=gl.getUniformLocation(this.shaderProgram,mName);this.parameters.push({name:mName,type:mType,value:mValue,uniformLoc:this.shaderProgram[mName]});}else {this.shaderProgram[mName]=oUniform.uniformLoc;}if(mType.indexOf('Matrix')===-1){gl[mType](this.shaderProgram[mName],mValue);}else {gl[mType](this.shaderProgram[mName],false,mValue);this.uniformValues[mName]=mValue;}}},{key:'_createShaderProgram',value:function _createShaderProgram(mShaderStr,isVertexShader){var shaderType=isVertexShader?_GLTool2.default.VERTEX_SHADER:_GLTool2.default.FRAGMENT_SHADER;var shader=gl.createShader(shaderType);gl.shaderSource(shader,mShaderStr);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){console.warn('Error in Shader : ',gl.getShaderInfoLog(shader));console.log(addLineNumbers(mShaderStr));return null;}return shader;}},{key:'_attachShaderProgram',value:function _attachShaderProgram(mVertexShader,mFragmentShader){this.shaderProgram=gl.createProgram();gl.attachShader(this.shaderProgram,mVertexShader);gl.attachShader(this.shaderProgram,mFragmentShader);gl.linkProgram(this.shaderProgram);}}]);return GLShader;}();exports.default=GLShader;},{"./GLTool":16}],15:[function(_dereq_,module,exports){ // GLTexture.js
'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();Object.defineProperty(exports,"__esModule",{value:true});var _GLTool=_dereq_('./GLTool');var _GLTool2=_interopRequireDefault(_GLTool);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var isPowerOfTwo=function isPowerOfTwo(x){return x!==0&&!(x&x-1);};var isSourcePowerOfTwo=function isSourcePowerOfTwo(obj){var w=obj.width||obj.videoWidth;var h=obj.height||obj.videoHeight;if(!w||!h){return false;}return isPowerOfTwo(w)&&isPowerOfTwo(h);};var gl=undefined;var GLTexture=function(){function GLTexture(mSource){var isTexture=arguments.length<=1||arguments[1]===undefined?false:arguments[1];var mParameters=arguments.length<=2||arguments[2]===undefined?{}:arguments[2];_classCallCheck(this,GLTexture);gl=_GLTool2.default.gl;if(isTexture){this.texture=mSource;}else {this._mSource=mSource;this.texture=gl.createTexture();this._isVideo=mSource.tagName==='VIDEO';this.magFilter=mParameters.magFilter||gl.LINEAR;this.minFilter=mParameters.minFilter||gl.LINEAR_MIPMAP_NEAREST;this.wrapS=mParameters.wrapS||gl.MIRRORED_REPEAT;this.wrapT=mParameters.wrapT||gl.MIRRORED_REPEAT;var width=mSource.width||mSource.videoWidth;if(width){if(!isSourcePowerOfTwo(mSource)){this.wrapS=this.wrapT=gl.CLAMP_TO_EDGE;if(this.minFilter===gl.LINEAR_MIPMAP_NEAREST){this.minFilter=gl.LINEAR;}}}else {this.wrapS=this.wrapT=gl.CLAMP_TO_EDGE;if(this.minFilter===gl.LINEAR_MIPMAP_NEAREST){this.minFilter=gl.LINEAR;}}gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);if(mSource.exposure){gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,mSource.shape[0],mSource.shape[1],0,gl.RGBA,gl.FLOAT,mSource.data);}else {gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,mSource);}gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,this.magFilter);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,this.minFilter);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,this.wrapS);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,this.wrapT);if(this.minFilter===gl.LINEAR_MIPMAP_NEAREST){gl.generateMipmap(gl.TEXTURE_2D);}gl.bindTexture(gl.TEXTURE_2D,null);}} //	MIPMAP FILTER
_createClass(GLTexture,[{key:'minFilter',value:function minFilter(mValue){if(mValue!==gl.LINEAR&&mValue!==gl.NEAREST&&mValue!==gl.LINEAR_MIPMAP_NEAREST){return this;}this.minFilter=mValue;return this;}},{key:'magFilter',value:function magFilter(mValue){if(mValue!==gl.LINEAR&&mValue!==gl.NEAREST&&mValue!==gl.LINEAR_MIPMAP_NEAREST){return this;}this.magFilter=mValue;return this;} //	WRAP
},{key:'wrapS',value:function wrapS(mValue){if(mValue!==gl.CLAMP_TO_EDGE&&mValue!==gl.REPEAT&&mValue!==gl.MIRRORED_REPEAT){return this;}this.wrapS=mValue;return this;}},{key:'wrapT',value:function wrapT(mValue){if(mValue!==gl.CLAMP_TO_EDGE&&mValue!==gl.REPEAT&&mValue!==gl.MIRRORED_REPEAT){return this;}this.wrapT=mValue;return this;} //	UPDATE TEXTURE
},{key:'updateTexture',value:function updateTexture(mSource){if(mSource){this._mSource=mSource;}gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,this._mSource);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,this.magFilter);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,this.minFilter);if(this.minFilter===gl.LINEAR_MIPMAP_NEAREST){gl.generateMipmap(gl.TEXTURE_2D);}gl.bindTexture(gl.TEXTURE_2D,null);}},{key:'bind',value:function bind(index){if(index===undefined){index=0;}if(!_GLTool2.default.shader){return;}gl.activeTexture(gl.TEXTURE0+index);gl.bindTexture(gl.TEXTURE_2D,this.texture);gl.uniform1i(_GLTool2.default.shader.uniformTextures[index],index);this._bindIndex=index;}}]);return GLTexture;}();exports.default=GLTexture;},{"./GLTool":16}],16:[function(_dereq_,module,exports){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}(); // GLTool.js
Object.defineProperty(exports,"__esModule",{value:true});var _glMatrix=_dereq_('gl-matrix');var _glMatrix2=_interopRequireDefault(_glMatrix);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var GLTool=function(){function GLTool(){_classCallCheck(this,GLTool);this.canvas;this._viewport=[0,0,0,0];this._enabledVertexAttribute=[];this.identityMatrix=_glMatrix2.default.mat4.create();this._normalMatrix=_glMatrix2.default.mat3.create();this._inverseViewMatrix=_glMatrix2.default.mat4.create();this._matrix=_glMatrix2.default.mat4.create();_glMatrix2.default.mat4.identity(this.identityMatrix,this.identityMatrix);} //	INITIALIZE
_createClass(GLTool,[{key:'init',value:function init(mCanvas){var mParameters=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];if(this.canvas!==undefined){this.destroy();}this.canvas=mCanvas;this.setSize(window.innerWidth,window.innerHeight);this.gl=this.canvas.getContext('webgl',mParameters)||this.canvas.getContext('experimental-webgl',mParameters); //	extensions
var extensions=['EXT_shader_texture_lod','EXT_shader_texture_lod','EXT_sRGB','EXT_frag_depth','OES_texture_float','OES_texture_half_float','OES_texture_float_linear','OES_texture_half_float_linear','OES_standard_derivatives','WEBGL_depth_texture'];this.extensions={};for(var i=0;i<extensions.length;i++){this.extensions[extensions[i]]=this.gl.getExtension(extensions[i]);} //	Copy gl Attributes
var gl=this.gl;this.VERTEX_SHADER=gl.VERTEX_SHADER;this.FRAGMENT_SHADER=gl.FRAGMENT_SHADER;this.COMPILE_STATUS=gl.COMPILE_STATUS;this.DEPTH_TEST=gl.DEPTH_TEST;this.CULL_FACE=gl.CULL_FACE;this.BLEND=gl.BLEND;this.POINTS=gl.POINTS;this.LINES=gl.LINES;this.TRIANGLES=gl.TRIANGLES;this.LINEAR=gl.LINEAR;this.NEAREST=gl.NEAREST;this.LINEAR_MIPMAP_NEAREST=gl.LINEAR_MIPMAP_NEAREST;this.MIRRORED_REPEAT=gl.MIRRORED_REPEAT;this.CLAMP_TO_EDGE=gl.CLAMP_TO_EDGE;this.enable(this.DEPTH_TEST);this.enable(this.CULL_FACE);this.enable(this.BLEND);} //	PUBLIC METHODS
},{key:'setViewport',value:function setViewport(x,y,w,h){var hasChanged=false;if(x!==this._viewport[0]){hasChanged=true;}if(y!==this._viewport[1]){hasChanged=true;}if(w!==this._viewport[2]){hasChanged=true;}if(h!==this._viewport[3]){hasChanged=true;}if(hasChanged){this.gl.viewport(x,y,w,h);this._viewport=[x,y,w,h];}}},{key:'clear',value:function clear(r,g,b,a){this.gl.clearColor(r,g,b,a);this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);}},{key:'setMatrices',value:function setMatrices(mCamera){this.camera=mCamera;this.rotate(this.identityMatrix);}},{key:'useShader',value:function useShader(mShader){this.shader=mShader;this.shaderProgram=this.shader.shaderProgram;}},{key:'rotate',value:function rotate(mRotation){_glMatrix2.default.mat4.copy(this._matrix,mRotation);_glMatrix2.default.mat4.multiply(this._matrix,this.camera.matrix,this._matrix);_glMatrix2.default.mat3.fromMat4(this._normalMatrix,this._matrix);_glMatrix2.default.mat3.invert(this._normalMatrix,this._normalMatrix);_glMatrix2.default.mat3.transpose(this._normalMatrix,this._normalMatrix);_glMatrix2.default.mat3.fromMat4(this._inverseViewMatrix,this._matrix);_glMatrix2.default.mat3.invert(this._inverseViewMatrix,this._inverseViewMatrix);}},{key:'draw',value:function draw(mMesh){function getAttribLoc(gl,shaderProgram,name){if(shaderProgram.cacheAttribLoc===undefined){shaderProgram.cacheAttribLoc={};}if(shaderProgram.cacheAttribLoc[name]===undefined){shaderProgram.cacheAttribLoc[name]=gl.getAttribLocation(shaderProgram,name);}return shaderProgram.cacheAttribLoc[name];} //	ATTRIBUTES
for(var i=0;i<mMesh.attributes.length;i++){var attribute=mMesh.attributes[i];this.gl.bindBuffer(this.gl.ARRAY_BUFFER,attribute.buffer);var attrPosition=getAttribLoc(this.gl,this.shaderProgram,attribute.name);this.gl.vertexAttribPointer(attrPosition,attribute.itemSize,this.gl.FLOAT,false,0,0);if(this._enabledVertexAttribute.indexOf(attrPosition)===-1){this.gl.enableVertexAttribArray(attrPosition);this._enabledVertexAttribute.push(attrPosition);}} //	BIND INDEX BUFFER
this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,mMesh.iBuffer); //	DEFAULT MATRICES
this.shader.uniform('uProjectionMatrix','uniformMatrix4fv',this.camera.projection);this.shader.uniform('uModelMatrix','uniformMatrix4fv',this.identityMatrix);this.shader.uniform('uViewMatrix','uniformMatrix4fv',this.camera.matrix);this.shader.uniform('uNormalMatrix','uniformMatrix3fv',this._normalMatrix);this.shader.uniform('uViewMatrixInverse','uniformMatrix4fv',this._inverseViewMatrix); //	DRAWING
if(mMesh.drawType===this.gl.POINTS){this.gl.drawArrays(mMesh.drawType,0,mMesh.vertexSize);}else {this.gl.drawElements(mMesh.drawType,mMesh.iBuffer.numItems,this.gl.UNSIGNED_SHORT,0);}}},{key:'setSize',value:function setSize(mWidth,mHeight){this._width=mWidth;this._height=mHeight;this.canvas.width=this._width;this.canvas.height=this._height;this._aspectRatio=this._width/this._height;}},{key:'showExtensions',value:function showExtensions(){console.log('Extensions : ',this.extensions);for(var ext in this.extensions){if(this.extensions[ext]){console.log(ext,':',this.extensions[ext]);}}}},{key:'checkExtension',value:function checkExtension(mExtension){return !!this.extensions[mExtension];}},{key:'getExtension',value:function getExtension(mExtension){return this.extensions[mExtension];} //	BLEND MODES
},{key:'enableAlphaBlending',value:function enableAlphaBlending(){this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA);}},{key:'enableAdditiveBlending',value:function enableAdditiveBlending(){this.gl.blendFunc(this.gl.ONE,this.gl.ONE);} //	GL NATIVE FUNCTIONS
},{key:'enable',value:function enable(mParameter){this.gl.enable(mParameter);}},{key:'disable',value:function disable(mParameter){this.gl.disable(mParameter);}},{key:'viewport',value:function viewport(x,y,w,h){this.setViewport(x,y,w,h);} //	GETTER AND SETTERS
},{key:'destroy', //	DESTROY
value:function destroy(){this.canvas=null;if(this.canvas.parentNode){try{this.canvas.parentNode.removeChild(this.canvas);}catch(e){console.log('Error : ',e);}}}},{key:'width',get:function get(){return this._width;}},{key:'height',get:function get(){return this._height;}},{key:'aspectRatio',get:function get(){return this._aspectRatio;}}]);return GLTool;}();var GL=new GLTool();exports.default=GL;},{"gl-matrix":1}],17:[function(_dereq_,module,exports){ // Geom.js
'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _Mesh=_dereq_('./Mesh');var _Mesh2=_interopRequireDefault(_Mesh);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var Geom={};Geom.plane=function(width,height,numSegments){var withNormals=arguments.length<=3||arguments[3]===undefined?false:arguments[3];var axis=arguments.length<=4||arguments[4]===undefined?'xy':arguments[4];var drawType=arguments.length<=5||arguments[5]===undefined?4:arguments[5];var positions=[];var coords=[];var indices=[];var normals=[];var gapX=width/numSegments;var gapY=height/numSegments;var gapUV=1/numSegments;var index=0;var sx=-width*0.5;var sy=-height*0.5;for(var i=0;i<numSegments;i++){for(var j=0;j<numSegments;j++){var tx=gapX*i+sx;var ty=gapY*j+sy;if(axis==='xz'){positions.push([tx,0,-ty+gapY]);positions.push([tx+gapX,0,-ty+gapY]);positions.push([tx+gapX,0,-ty]);positions.push([tx,0,-ty]);normals.push([0,1,0]);normals.push([0,1,0]);normals.push([0,1,0]);normals.push([0,1,0]);}else if(axis==='yz'){positions.push([0,tx,ty]);positions.push([0,tx+gapX,ty]);positions.push([0,tx+gapX,ty+gapY]);positions.push([0,tx,ty+gapY]);normals.push([1,0,0]);normals.push([1,0,0]);normals.push([1,0,0]);normals.push([1,0,0]);}else {positions.push([tx,ty,0]);positions.push([tx+gapX,ty,0]);positions.push([tx+gapX,ty+gapY,0]);positions.push([tx,ty+gapY,0]);normals.push([0,0,1]);normals.push([0,0,1]);normals.push([0,0,1]);normals.push([0,0,1]);}var u=i/numSegments;var v=j/numSegments;coords.push([u,v]);coords.push([u+gapUV,v]);coords.push([u+gapUV,v+gapUV]);coords.push([u,v+gapUV]);indices.push(index*4+0);indices.push(index*4+1);indices.push(index*4+2);indices.push(index*4+0);indices.push(index*4+2);indices.push(index*4+3);index++;}}var mesh=new _Mesh2.default(drawType);mesh.bufferVertex(positions);mesh.bufferTexCoords(coords);mesh.bufferIndices(indices);if(withNormals){mesh.bufferNormal(normals);}return mesh;};Geom.sphere=function(size,numSegments){var withNormals=arguments.length<=2||arguments[2]===undefined?false:arguments[2];var isInvert=arguments.length<=3||arguments[3]===undefined?false:arguments[3];var drawType=arguments.length<=4||arguments[4]===undefined?4:arguments[4];var positions=[];var coords=[];var indices=[];var normals=[];var index=0;var gapUV=1/numSegments;var getPosition=function getPosition(i,j){var isNormal=arguments.length<=2||arguments[2]===undefined?false:arguments[2]; //	rx : -90 ~ 90 , ry : 0 ~ 360
var rx=i/numSegments*Math.PI-Math.PI*0.5;var ry=j/numSegments*Math.PI*2;var r=isNormal?1:size;var pos=[];pos[1]=Math.sin(rx)*r;var t=Math.cos(rx)*r;pos[0]=Math.cos(ry)*t;pos[2]=Math.sin(ry)*t;var precision=10000;pos[0]=Math.floor(pos[0]*precision)/precision;pos[1]=Math.floor(pos[1]*precision)/precision;pos[2]=Math.floor(pos[2]*precision)/precision;return pos;};for(var i=0;i<numSegments;i++){for(var j=0;j<numSegments;j++){positions.push(getPosition(i,j));positions.push(getPosition(i+1,j));positions.push(getPosition(i+1,j+1));positions.push(getPosition(i,j+1));if(withNormals){normals.push(getPosition(i,j,true));normals.push(getPosition(i+1,j,true));normals.push(getPosition(i+1,j+1,true));normals.push(getPosition(i,j+1,true));}var u=j/numSegments;var v=i/numSegments;coords.push([1.0-u,v]);coords.push([1.0-u,v+gapUV]);coords.push([1.0-u-gapUV,v+gapUV]);coords.push([1.0-u-gapUV,v]);indices.push(index*4+0);indices.push(index*4+1);indices.push(index*4+2);indices.push(index*4+0);indices.push(index*4+2);indices.push(index*4+3);index++;}}if(isInvert){indices.reverse();}var mesh=new _Mesh2.default(drawType);mesh.bufferVertex(positions);mesh.bufferTexCoords(coords);mesh.bufferIndices(indices);if(withNormals){mesh.bufferNormal(normals);}return mesh;};Geom.cube=function(w,h,d){var withNormals=arguments.length<=3||arguments[3]===undefined?false:arguments[3];var drawType=arguments.length<=4||arguments[4]===undefined?4:arguments[4];h=h||w;d=d||w;var x=w/2;var y=h/2;var z=d/2;var positions=[];var coords=[];var indices=[];var normals=[];var count=0; // BACK
positions.push([-x,y,-z]);positions.push([x,y,-z]);positions.push([x,-y,-z]);positions.push([-x,-y,-z]);normals.push([0,0,-1]);normals.push([0,0,-1]);normals.push([0,0,-1]);normals.push([0,0,-1]);coords.push([0,0]);coords.push([1,0]);coords.push([1,1]);coords.push([0,1]);indices.push(count*4+0);indices.push(count*4+1);indices.push(count*4+2);indices.push(count*4+0);indices.push(count*4+2);indices.push(count*4+3);count++; // RIGHT
positions.push([x,y,-z]);positions.push([x,y,z]);positions.push([x,-y,z]);positions.push([x,-y,-z]);normals.push([1,0,0]);normals.push([1,0,0]);normals.push([1,0,0]);normals.push([1,0,0]);coords.push([0,0]);coords.push([1,0]);coords.push([1,1]);coords.push([0,1]);indices.push(count*4+0);indices.push(count*4+1);indices.push(count*4+2);indices.push(count*4+0);indices.push(count*4+2);indices.push(count*4+3);count++; // FRONT
positions.push([x,y,z]);positions.push([-x,y,z]);positions.push([-x,-y,z]);positions.push([x,-y,z]);normals.push([0,0,1]);normals.push([0,0,1]);normals.push([0,0,1]);normals.push([0,0,1]);coords.push([0,0]);coords.push([1,0]);coords.push([1,1]);coords.push([0,1]);indices.push(count*4+0);indices.push(count*4+1);indices.push(count*4+2);indices.push(count*4+0);indices.push(count*4+2);indices.push(count*4+3);count++; // LEFT
positions.push([-x,y,z]);positions.push([-x,y,-z]);positions.push([-x,-y,-z]);positions.push([-x,-y,z]);normals.push([-1,0,0]);normals.push([-1,0,0]);normals.push([-1,0,0]);normals.push([-1,0,0]);coords.push([0,0]);coords.push([1,0]);coords.push([1,1]);coords.push([0,1]);indices.push(count*4+0);indices.push(count*4+1);indices.push(count*4+2);indices.push(count*4+0);indices.push(count*4+2);indices.push(count*4+3);count++; // TOP
positions.push([-x,y,z]);positions.push([x,y,z]);positions.push([x,y,-z]);positions.push([-x,y,-z]);normals.push([0,1,0]);normals.push([0,1,0]);normals.push([0,1,0]);normals.push([0,1,0]);coords.push([0,0]);coords.push([1,0]);coords.push([1,1]);coords.push([0,1]);indices.push(count*4+0);indices.push(count*4+1);indices.push(count*4+2);indices.push(count*4+0);indices.push(count*4+2);indices.push(count*4+3);count++; // BOTTOM
positions.push([-x,-y,-z]);positions.push([x,-y,-z]);positions.push([x,-y,z]);positions.push([-x,-y,z]);normals.push([0,-1,0]);normals.push([0,-1,0]);normals.push([0,-1,0]);normals.push([0,-1,0]);coords.push([0,0]);coords.push([1,0]);coords.push([1,1]);coords.push([0,1]);indices.push(count*4+0);indices.push(count*4+1);indices.push(count*4+2);indices.push(count*4+0);indices.push(count*4+2);indices.push(count*4+3);count++;var mesh=new _Mesh2.default(drawType);mesh.bufferVertex(positions);mesh.bufferTexCoords(coords);mesh.bufferIndices(indices);if(withNormals){mesh.bufferNormal(normals);}return mesh;};Geom.skybox=function(size){var withNormals=arguments.length<=1||arguments[1]===undefined?false:arguments[1];var drawType=arguments.length<=2||arguments[2]===undefined?4:arguments[2];var positions=[];var coords=[];var indices=[];var normals=[];var count=0; // BACK
positions.push([size,size,-size]);positions.push([-size,size,-size]);positions.push([-size,-size,-size]);positions.push([size,-size,-size]);normals.push([0,0,-1]);normals.push([0,0,-1]);normals.push([0,0,-1]);normals.push([0,0,-1]);coords.push([0,0]);coords.push([1,0]);coords.push([1,1]);coords.push([0,1]);indices.push(count*4+0);indices.push(count*4+1);indices.push(count*4+2);indices.push(count*4+0);indices.push(count*4+2);indices.push(count*4+3);count++; // RIGHT
positions.push([size,-size,-size]);positions.push([size,-size,size]);positions.push([size,size,size]);positions.push([size,size,-size]);normals.push([1,0,0]);normals.push([1,0,0]);normals.push([1,0,0]);normals.push([1,0,0]);coords.push([0,0]);coords.push([1,0]);coords.push([1,1]);coords.push([0,1]);indices.push(count*4+0);indices.push(count*4+1);indices.push(count*4+2);indices.push(count*4+0);indices.push(count*4+2);indices.push(count*4+3);count++; // FRONT
positions.push([-size,size,size]);positions.push([size,size,size]);positions.push([size,-size,size]);positions.push([-size,-size,size]);normals.push([0,0,1]);normals.push([0,0,1]);normals.push([0,0,1]);normals.push([0,0,1]);coords.push([0,0]);coords.push([1,0]);coords.push([1,1]);coords.push([0,1]);indices.push(count*4+0);indices.push(count*4+1);indices.push(count*4+2);indices.push(count*4+0);indices.push(count*4+2);indices.push(count*4+3);count++; // LEFT
positions.push([-size,-size,size]);positions.push([-size,-size,-size]);positions.push([-size,size,-size]);positions.push([-size,size,size]);normals.push([-1,0,0]);normals.push([-1,0,0]);normals.push([-1,0,0]);normals.push([-1,0,0]);coords.push([0,0]);coords.push([1,0]);coords.push([1,1]);coords.push([0,1]);indices.push(count*4+0);indices.push(count*4+1);indices.push(count*4+2);indices.push(count*4+0);indices.push(count*4+2);indices.push(count*4+3);count++; // TOP
positions.push([size,size,size]);positions.push([-size,size,size]);positions.push([-size,size,-size]);positions.push([size,size,-size]);normals.push([0,1,0]);normals.push([0,1,0]);normals.push([0,1,0]);normals.push([0,1,0]);coords.push([0,0]);coords.push([1,0]);coords.push([1,1]);coords.push([0,1]);indices.push(count*4+0);indices.push(count*4+1);indices.push(count*4+2);indices.push(count*4+0);indices.push(count*4+2);indices.push(count*4+3);count++; // BOTTOM
positions.push([size,-size,-size]);positions.push([-size,-size,-size]);positions.push([-size,-size,size]);positions.push([size,-size,size]);normals.push([0,-1,0]);normals.push([0,-1,0]);normals.push([0,-1,0]);normals.push([0,-1,0]);coords.push([0,0]);coords.push([1,0]);coords.push([1,1]);coords.push([0,1]);indices.push(count*4+0);indices.push(count*4+1);indices.push(count*4+2);indices.push(count*4+0);indices.push(count*4+2);indices.push(count*4+3);var mesh=new _Mesh2.default(drawType);mesh.bufferVertex(positions);mesh.bufferTexCoords(coords);mesh.bufferIndices(indices);if(withNormals){mesh.bufferNormal(normals);}return mesh;};Geom.bigTriangle=function(){var indices=[2,1,0];var positions=[[-1,-1],[-1,4],[4,-1]];var mesh=new _Mesh2.default(); // mesh.bufferVertex(positions);
mesh.bufferData(positions,'aPosition',2);mesh.bufferIndices(indices);return mesh;};exports.default=Geom;},{"./Mesh":18}],18:[function(_dereq_,module,exports){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}(); // Mesh.js
Object.defineProperty(exports,"__esModule",{value:true});var _GLTool=_dereq_('./GLTool');var _GLTool2=_interopRequireDefault(_GLTool);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var gl=undefined;var Mesh=function(){function Mesh(){var mDrawType=arguments.length<=0||arguments[0]===undefined?_GLTool2.default.gl.TRIANGLES:arguments[0];_classCallCheck(this,Mesh);gl=_GLTool2.default.gl;this.drawType=mDrawType;this._attributes=[];}_createClass(Mesh,[{key:'bufferVertex',value:function bufferVertex(mArrayVertices){var isDynamic=arguments.length<=1||arguments[1]===undefined?false:arguments[1];this.bufferData(mArrayVertices,'aVertexPosition',3,isDynamic);}},{key:'bufferTexCoords',value:function bufferTexCoords(mArrayTexCoords){var isDynamic=arguments.length<=1||arguments[1]===undefined?false:arguments[1];this.bufferData(mArrayTexCoords,'aTextureCoord',2,isDynamic);}},{key:'bufferNormal',value:function bufferNormal(mNormals){var isDynamic=arguments.length<=1||arguments[1]===undefined?false:arguments[1];this.bufferData(mNormals,'aNormal',3,isDynamic);}},{key:'bufferIndices',value:function bufferIndices(mArrayIndices){var isDynamic=arguments.length<=1||arguments[1]===undefined?false:arguments[1];var drawType=isDynamic?gl.DYNAMIC_DRAW:gl.STATIC_DRAW;this._indices=mArrayIndices;this.iBuffer=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.iBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(mArrayIndices),drawType);this.iBuffer.itemSize=1;this.iBuffer.numItems=mArrayIndices.length;}},{key:'bufferData',value:function bufferData(mData,mName,mItemSize){var isDynamic=arguments.length<=3||arguments[3]===undefined?false:arguments[3];var index=-1,i=0;var drawType=isDynamic?gl.DYNAMIC_DRAW:gl.STATIC_DRAW;var bufferData=[];var buffer=undefined,dataArray=undefined; //	Check for existing attributes
for(i=0;i<this._attributes.length;i++){if(this._attributes[i].name===mName){this._attributes[i].data=mData;index=i;break;}} //	flatten buffer data		
for(i=0;i<mData.length;i++){for(var j=0;j<mData[i].length;j++){bufferData.push(mData[i][j]);}}if(index===-1){ //	attribute not exist yet, create new buffer
buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);dataArray=new Float32Array(bufferData);gl.bufferData(gl.ARRAY_BUFFER,dataArray,drawType);this._attributes.push({name:mName,data:mData,itemSize:mItemSize,buffer:buffer,dataArray:dataArray});}else { //	attribute existed, replace with new data
buffer=this._attributes[index].buffer;gl.bindBuffer(gl.ARRAY_BUFFER,buffer);dataArray=this._attributes[index].dataArray;for(i=0;i<bufferData.length;i++){dataArray[i]=bufferData[i];}gl.bufferData(gl.ARRAY_BUFFER,dataArray,drawType);}}},{key:'attributes',get:function get(){return this._attributes;}}]);return Mesh;}();exports.default=Mesh;},{"./GLTool":16}],19:[function(_dereq_,module,exports){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}(); // Camera.js
Object.defineProperty(exports,"__esModule",{value:true});var _glMatrix=_dereq_('gl-matrix');var _glMatrix2=_interopRequireDefault(_glMatrix);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Camera=function(){function Camera(){_classCallCheck(this,Camera); //	VIEW MATRIX
this._matrix=_glMatrix2.default.mat4.create(); //	PROJECTION MATRIX
this._projection=_glMatrix2.default.mat4.create(); //	POSITION OF CAMERA
this.position=_glMatrix2.default.vec3.create();}_createClass(Camera,[{key:'lookAt',value:function lookAt(aEye,aCenter,aUp){_glMatrix2.default.vec3.copy(this.position,aEye);_glMatrix2.default.mat4.identity(this._matrix);_glMatrix2.default.mat4.lookAt(this._matrix,aEye,aCenter,aUp);} //	GETTERS
},{key:'matrix',get:function get(){return this._matrix;}},{key:'projection',get:function get(){return this._projection;}}]);return Camera;}();exports.default=Camera;},{"gl-matrix":1}],20:[function(_dereq_,module,exports){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();Object.defineProperty(exports,"__esModule",{value:true});var _Camera2=_dereq_('./Camera');var _Camera3=_interopRequireDefault(_Camera2);var _glMatrix=_dereq_('gl-matrix');var _glMatrix2=_interopRequireDefault(_glMatrix);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;} // CameraOrtho.js
var CameraOrtho=function(_Camera){_inherits(CameraOrtho,_Camera);function CameraOrtho(){_classCallCheck(this,CameraOrtho);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(CameraOrtho).call(this));var eye=_glMatrix2.default.vec3.clone([0,0,5]);var center=_glMatrix2.default.vec3.create();var up=_glMatrix2.default.vec3.clone([0,-1,0]);_this.lookAt(eye,center,up);_this.ortho(1,-1,1,-1);return _this;}_createClass(CameraOrtho,[{key:'setBoundary',value:function setBoundary(left,right,top,bottom){this.ortho(left,right,top,bottom);}},{key:'ortho',value:function ortho(left,right,top,bottom){this.left=left;this.right=right;this.top=top;this.bottom=bottom;_glMatrix2.default.mat4.ortho(this._projection,left,right,top,bottom,0,10000);}}]);return CameraOrtho;}(_Camera3.default);exports.default=CameraOrtho;},{"./Camera":19,"gl-matrix":1}],21:[function(_dereq_,module,exports){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();Object.defineProperty(exports,"__esModule",{value:true});var _Camera2=_dereq_('./Camera');var _Camera3=_interopRequireDefault(_Camera2);var _glMatrix=_dereq_('gl-matrix');var _glMatrix2=_interopRequireDefault(_glMatrix);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;} // CameraPerspective.js
var CameraPerspective=function(_Camera){_inherits(CameraPerspective,_Camera);function CameraPerspective(){_classCallCheck(this,CameraPerspective);return _possibleConstructorReturn(this,Object.getPrototypeOf(CameraPerspective).call(this));}_createClass(CameraPerspective,[{key:'setPerspective',value:function setPerspective(mFov,mAspectRatio,mNear,mFar){this._fov=mFov;this._near=mNear;this._far=mFar;this._aspectRatio=mAspectRatio;_glMatrix2.default.mat4.perspective(this._projection,mFov,mAspectRatio,mNear,mFar);}},{key:'setAspectRatio',value:function setAspectRatio(mAspectRatio){this._aspectRatio=mAspectRatio;_glMatrix2.default.mat4.perspective(this.projection,this._fov,mAspectRatio,this._near,this._far);}}]);return CameraPerspective;}(_Camera3.default);exports.default=CameraPerspective;},{"./Camera":19,"gl-matrix":1}],22:[function(_dereq_,module,exports){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else {return get(parent,property,receiver);}}else if("value" in desc){return desc.value;}else {var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};Object.defineProperty(exports,"__esModule",{value:true});var _Geom=_dereq_('../Geom');var _Geom2=_interopRequireDefault(_Geom);var _GLShader=_dereq_('../GLShader');var _GLShader2=_interopRequireDefault(_GLShader);var _Batch2=_dereq_('../Batch');var _Batch3=_interopRequireDefault(_Batch2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;} // BatchCopy.js
var BatchCopy=function(_Batch){_inherits(BatchCopy,_Batch);function BatchCopy(){_classCallCheck(this,BatchCopy);var mesh=_Geom2.default.bigTriangle();var shader=new _GLShader2.default("#define GLSLIFY 1\n// bigTriangle.vert\n\n#define SHADER_NAME BIG_TRIANGLE_VERTEX\n\nprecision highp float;\nattribute vec2 aPosition;\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = vec4(aPosition, 0.0, 1.0);\n    vTextureCoord = aPosition * .5 + .5;\n}","#define GLSLIFY 1\n// copy.frag\n\n#define SHADER_NAME COPY_FRAGMENT\n\nprecision highp float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = texture2D(texture, vTextureCoord);\n}");var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(BatchCopy).call(this,mesh,shader));shader.bind();shader.uniform('texture','uniform1i',0);return _this;}_createClass(BatchCopy,[{key:'draw',value:function draw(texture){this.shader.bind();texture.bind(0);_get(Object.getPrototypeOf(BatchCopy.prototype),'draw',this).call(this);}}]);return BatchCopy;}(_Batch3.default);exports.default=BatchCopy;},{"../Batch":12,"../GLShader":14,"../Geom":17}],23:[function(_dereq_,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}} // BinaryLoader.js
var BinaryLoader=function BinaryLoader(){_classCallCheck(this,BinaryLoader);};exports.default=BinaryLoader;},{}],24:[function(_dereq_,module,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _BinaryLoader2=_dereq_('./BinaryLoader');var _BinaryLoader3=_interopRequireDefault(_BinaryLoader2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof(call))==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;} // ObjLoader.js
var ObjLoader=function(_BinaryLoader){_inherits(ObjLoader,_BinaryLoader);function ObjLoader(){_classCallCheck(this,ObjLoader);return _possibleConstructorReturn(this,Object.getPrototypeOf(ObjLoader).call(this));}return ObjLoader;}(_BinaryLoader3.default);exports.default=ObjLoader;},{"./BinaryLoader":23}],25:[function(_dereq_,module,exports){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}(); // EaseNumber.js
Object.defineProperty(exports,"__esModule",{value:true});var _Scheduler=_dereq_('./Scheduler');var _Scheduler2=_interopRequireDefault(_Scheduler);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var EaseNumber=function(){function EaseNumber(mValue){var _this=this;var mEasing=arguments.length<=1||arguments[1]===undefined?0.1:arguments[1];_classCallCheck(this,EaseNumber);this.easing=mEasing;this._value=mValue;this._targetValue=mValue;_Scheduler2.default.addEF(function(){return _this._update();});}_createClass(EaseNumber,[{key:'_update',value:function _update(){this._checkLimit();this._value+=(this._targetValue-this._value)*this.easing;}},{key:'setTo',value:function setTo(mValue){this._targetValue=this._value=mValue;}},{key:'add',value:function add(mAdd){this._targetValue+=mAdd;}},{key:'limit',value:function limit(mMin,mMax){if(mMin>mMax){this.limit(mMax,mMin);return;}this._min=mMin;this._max=mMax;this._checkLimit();}},{key:'_checkLimit',value:function _checkLimit(){if(this._min!==undefined&&this._targetValue<this._min){this._targetValue=this._min;}if(this._max!==undefined&&this._targetValue>this._max){this._targetValue=this._max;}} //	GETTERS / SETTERS
},{key:'value',set:function set(mValue){this._targetValue=mValue;},get:function get(){return this._value;}},{key:'targetValue',get:function get(){return this._targetValue;}}]);return EaseNumber;}();exports.default=EaseNumber;},{"./Scheduler":28}],26:[function(_dereq_,module,exports){'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();Object.defineProperty(exports,"__esModule",{value:true});function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}} // EventDispatcher.js
var supportsCustomEvents=true;try{var newTestCustomEvent=document.createEvent('CustomEvent');newTestCustomEvent=null;}catch(e){supportsCustomEvents=false;}var EventDispatcher=function(){function EventDispatcher(){_classCallCheck(this,EventDispatcher);}_createClass(EventDispatcher,[{key:'addEventListener',value:function addEventListener(aEventType,aFunction){if(this._eventListeners===null){this._eventListeners={};}if(!this._eventListeners[aEventType]){this._eventListeners[aEventType]=[];}this._eventListeners[aEventType].push(aFunction);return this;}},{key:'removeEventListener',value:function removeEventListener(aEventType,aFunction){if(this._eventListeners===null){this._eventListeners={};}var currentArray=this._eventListeners[aEventType];if(typeof currentArray==='undefined'){return this;}var currentArrayLength=currentArray.length;for(var i=0;i<currentArrayLength;i++){if(currentArray[i]===aFunction){currentArray.splice(i,1);i--;currentArrayLength--;}}return this;}},{key:'dispatchEvent',value:function dispatchEvent(aEvent){if(this._eventListeners===null){this._eventListeners={};}var eventType=aEvent.type;try{if(aEvent.target===null){aEvent.target=this;}aEvent.currentTarget=this;}catch(theError){var newEvent={'type':eventType,'detail':aEvent.detail,'dispatcher':this};return this.dispatchEvent(newEvent);}var currentEventListeners=this._eventListeners[eventType];if(currentEventListeners!==null&&currentEventListeners!==undefined){var currentArray=this._copyArray(currentEventListeners);var currentArrayLength=currentArray.length;for(var i=0;i<currentArrayLength;i++){var currentFunction=currentArray[i];currentFunction.call(this,aEvent);}}return this;}},{key:'dispatchCustomEvent',value:function dispatchCustomEvent(aEventType,aDetail){var newEvent=undefined;if(supportsCustomEvents){newEvent=document.createEvent('CustomEvent');newEvent.dispatcher=this;newEvent.initCustomEvent(aEventType,false,false,aDetail);}else {newEvent={'type':aEventType,'detail':aDetail,'dispatcher':this};}return this.dispatchEvent(newEvent);}},{key:'_destroy',value:function _destroy(){if(this._eventListeners!==null){for(var objectName in this._eventListeners){if(this._eventListeners.hasOwnProperty(objectName)){var currentArray=this._eventListeners[objectName];var currentArrayLength=currentArray.length;for(var i=0;i<currentArrayLength;i++){currentArray[i]=null;}delete this._eventListeners[objectName];}}this._eventListeners=null;}}},{key:'_copyArray',value:function _copyArray(aArray){var currentArray=new Array(aArray.length);var currentArrayLength=currentArray.length;for(var i=0;i<currentArrayLength;i++){currentArray[i]=aArray[i];}return currentArray;}}]);return EventDispatcher;}();exports.default=EventDispatcher;},{}],27:[function(_dereq_,module,exports){ // OrbitalControl.js
'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();Object.defineProperty(exports,"__esModule",{value:true});var _EaseNumber=_dereq_('./EaseNumber');var _EaseNumber2=_interopRequireDefault(_EaseNumber);var _Scheduler=_dereq_('./Scheduler');var _Scheduler2=_interopRequireDefault(_Scheduler);var _glMatrix=_dereq_('gl-matrix');var _glMatrix2=_interopRequireDefault(_glMatrix);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var getMouse=function getMouse(mEvent,mTarget){var o=mTarget||{};if(mEvent.touches){o.x=mEvent.touches[0].pageX;o.y=mEvent.touches[0].pageY;}else {o.x=mEvent.clientX;o.y=mEvent.clientY;}return o;};var OrbitalControl=function(){function OrbitalControl(mTarget){var _this=this;var mListenerTarget=arguments.length<=1||arguments[1]===undefined?window:arguments[1];var mRadius=arguments.length<=2||arguments[2]===undefined?500:arguments[2];_classCallCheck(this,OrbitalControl);this._target=mTarget;this._listenerTarget=mListenerTarget;this._mouse={};this._preMouse={};this.center=_glMatrix2.default.vec3.create();this._up=_glMatrix2.default.vec3.fromValues(0,1,0);this.radius=new _EaseNumber2.default(mRadius);this.position=_glMatrix2.default.vec3.fromValues(0,0,this.radius.value);this.positionOffset=_glMatrix2.default.vec3.create();this._rx=new _EaseNumber2.default(0);this._rx.limit(-Math.PI/2,Math.PI/2);this._ry=new _EaseNumber2.default(0);this._preRX=0;this._preRY=0;this._isLockZoom=false;this._isLockRotation=false;this._isInvert=false;this._listenerTarget.addEventListener('mousewheel',function(e){return _this._onWheel(e);});this._listenerTarget.addEventListener('DOMMouseScroll',function(e){return _this._onWheel(e);});this._listenerTarget.addEventListener('mousedown',function(e){return _this._onDown(e);});this._listenerTarget.addEventListener('touchstart',function(e){return _this._onDown(e);});this._listenerTarget.addEventListener('mousemove',function(e){return _this._onMove(e);});this._listenerTarget.addEventListener('touchmove',function(e){return _this._onMove(e);});window.addEventListener('touchend',function(){return _this._onUp();});window.addEventListener('mouseup',function(){return _this._onUp();});_Scheduler2.default.addEF(function(){return _this._loop();});} //	PUBLIC METHODS
_createClass(OrbitalControl,[{key:'lock',value:function lock(){var mValue=arguments.length<=0||arguments[0]===undefined?true:arguments[0];this._isLockZoom=mValue;this._isLockRotation=mValue;}},{key:'lockRotation',value:function lockRotation(){var mValue=arguments.length<=0||arguments[0]===undefined?true:arguments[0];this._isLockRotation=mValue;}},{key:'inverseControl',value:function inverseControl(){var isInvert=arguments.length<=0||arguments[0]===undefined?true:arguments[0];this._isInvert=isInvert;} //	EVENT HANDLERES
},{key:'_onDown',value:function _onDown(mEvent){if(this._isLockRotation){return;}this._isMouseDown=true;getMouse(mEvent,this._mouse);getMouse(mEvent,this._preMouse);this._preRX=this._rx.targetValue;this._preRY=this._ry.targetValue;}},{key:'_onMove',value:function _onMove(mEvent){if(this._isLockRotation){return;}getMouse(mEvent,this._mouse);if(mEvent.touches){mEvent.preventDefault();}if(this._isMouseDown){var diffX=-(this._mouse.x-this._preMouse.x);if(this._isInvert){diffX*=-1;}this._ry.value=this._preRY-diffX*0.01;var diffY=-(this._mouse.y-this._preMouse.y);if(this._isInvert){diffY*=-1;}this._rx.value=this._preRX-diffY*0.01;}}},{key:'_onUp',value:function _onUp(){if(this._isLockRotation){return;}this._isMouseDown=false;}},{key:'_onWheel',value:function _onWheel(mEvent){if(this._isLockZoom){return;}var w=mEvent.wheelDelta;var d=mEvent.detail;var value=0;if(d){if(w){value=w/d/40*d>0?1:-1; // Opera
}else {value=-d/3; // Firefox;         TODO: do not /3 for OS X
}}else {value=w/120;}this.radius.add(-value*5);} //	PRIVATE METHODS
},{key:'_loop',value:function _loop(){this._updatePosition();if(this._target){this._updateCamera();}}},{key:'_updatePosition',value:function _updatePosition(){this.position[1]=Math.sin(this._rx.value)*this.radius.value;var tr=Math.cos(this._rx.value)*this.radius.value;this.position[0]=Math.cos(this._ry.value+Math.PI*0.5)*tr;this.position[2]=Math.sin(this._ry.value+Math.PI*0.5)*tr;_glMatrix2.default.vec3.add(this.position,this.position,this.positionOffset);}},{key:'_updateCamera',value:function _updateCamera(){this._target.lookAt(this.position,this.center,this._up);}}]);return OrbitalControl;}();exports.default=OrbitalControl;},{"./EaseNumber":25,"./Scheduler":28,"gl-matrix":1}],28:[function(_dereq_,module,exports){ // Scheduler.js
'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();Object.defineProperty(exports,"__esModule",{value:true});function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}if(window.requestAnimFrame===undefined){window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};}();}var FRAMERATE=60;var Scheduler=function(){function Scheduler(){_classCallCheck(this,Scheduler);this._delayTasks=[];this._nextTasks=[];this._deferTasks=[];this._highTasks=[];this._usurpTask=[];this._enterframeTasks=[];this._idTable=0;this._loop();} //	PUBLIC METHODS
_createClass(Scheduler,[{key:'addEF',value:function addEF(func,params){params=params||[];var id=this._idTable;this._enterframeTasks[id]={func:func,params:params};this._idTable++;return id;}},{key:'removeEF',value:function removeEF(id){if(this._enterframeTasks[id]!==undefined){this._enterframeTasks[id]=null;}return -1;}},{key:'delay',value:function delay(func,params,_delay){var time=new Date().getTime();var t={func:func,params:params,delay:_delay,time:time};this._delayTasks.push(t);}},{key:'defer',value:function defer(func,params){var t={func:func,params:params};this._deferTasks.push(t);}},{key:'next',value:function next(func,params){var t={func:func,params:params};this._nextTasks.push(t);}},{key:'usurp',value:function usurp(func,params){var t={func:func,params:params};this._usurpTask.push(t);} //	PRIVATE METHODS
},{key:'_process',value:function _process(){var i=0,task=undefined,interval=undefined,current=undefined;for(i=0;i<this._enterframeTasks.length;i++){task=this._enterframeTasks[i];if(task!==null&&task!==undefined){ // task.func.apply(task.scope, task.params);
// console.log(task.func());
task.func(task.params);}}while(this._highTasks.length>0){task=this._highTasks.pop();task.func(task.params); // task.func.apply(task.scope, task.params);
}var startTime=new Date().getTime();for(i=0;i<this._delayTasks.length;i++){task=this._delayTasks[i];if(startTime-task.time>task.delay){ // task.func.apply(task.scope, task.params);
task.func(task.params);this._delayTasks.splice(i,1);}}startTime=new Date().getTime();interval=1000/FRAMERATE;while(this._deferTasks.length>0){task=this._deferTasks.shift();current=new Date().getTime();if(current-startTime<interval){ // task.func.apply(task.scope, task.params);
task.func(task.params);}else {this._deferTasks.unshift(task);break;}}startTime=new Date().getTime();interval=1000/FRAMERATE;while(this._usurpTask.length>0){task=this._usurpTask.shift();current=new Date().getTime();if(current-startTime<interval){ // task.func.apply(task.scope, task.params);
task.func(task.params);}else { // this._usurpTask.unshift(task);
break;}}this._highTasks=this._highTasks.concat(this._nextTasks);this._nextTasks=[];this._usurpTask=[];}},{key:'_loop',value:function _loop(){var _this=this;this._process();window.requestAnimFrame(function(){return _this._loop();});}}]);return Scheduler;}();var scheduler=new Scheduler();exports.default=scheduler;},{}]},{},[11])(11);}); 

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict';

var _alfrid = require('../../../../build/alfrid.js');

var _alfrid2 = _interopRequireDefault(_alfrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }



window.addEventListener('resize', function () {
	return resize();
});

var canvas = undefined,
    camera = undefined,
    batch = undefined,
    mesh = undefined,
    shader = undefined,
    GL = undefined,
    img = undefined,
    texture = undefined;

img = new Image();
img.addEventListener('load', function () {
	return _onImageLoaded();
});
img.src = 'assets/texture.jpg';

function _onImageLoaded() {
	console.log('Image Loaded');

	if (document.body) {
		_init();
	} else {
		window.addEventListener('load', function () {
			return _init();
		});
	}
}

function _init() {
	//	CREATE CANVAS
	canvas = document.createElement("canvas");
	canvas.className = 'Main-Canvas';
	document.body.appendChild(canvas);

	//	INIT GL TOOL
	_alfrid2.default.GL.init(canvas);

	GL = _alfrid2.default.GL;

	camera = new _alfrid2.default.CameraOrtho();

	mesh = _alfrid2.default.Geom.bigTriangle();

	shader = new _alfrid2.default.GLShader("#define GLSLIFY 1\n// basic.vert\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\nattribute vec2 aPosition;\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = vec4(aPosition, 0.0, 1.0);\n    vTextureCoord = aPosition * .5 + .5;\n}", "#define GLSLIFY 1\n// basic.frag\n\n#define SHADER_NAME BASIC_FRAGMENT\n\nprecision highp float;\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = texture2D(texture, vTextureCoord);\n}");

	texture = new _alfrid2.default.GLTexture(img);

	batch = new _alfrid2.default.Batch(mesh, shader);

	_alfrid2.default.Scheduler.addEF(function () {
		return _loop();
	});
}

function _loop() {
	GL.clear(0, 0, 0, 0);
	GL.setMatrices(camera);

	shader.bind();
	shader.uniform("texture", "uniform1i", 0);
	texture.bind(0);

	batch.draw();
}

},{"../../../../build/alfrid.js":1}]},{},[2]);

//# sourceMappingURL=bundle.js.map
