(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};!function(t){if("object"==(typeof exports==="undefined"?"undefined":_typeof(exports))&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else {var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.alfrid=t();}}(function(){return function t(e,r,n){function i(u,o){if(!r[u]){if(!e[u]){var s="function"==typeof require&&require;if(!o&&s)return s(u,!0);if(a)return a(u,!0);var h=new Error("Cannot find module '"+u+"'");throw h.code="MODULE_NOT_FOUND",h;}var f=r[u]={exports:{}};e[u][0].call(f.exports,function(t){var r=e[u][1][t];return i(r?r:t);},f,f.exports,t,e,r,n);}return r[u].exports;}for(var a="function"==typeof require&&require,u=0;u<n.length;u++){i(n[u]);}return i;}({1:[function(t,e,r){r.glMatrix=t("./gl-matrix/common.js"),r.mat2=t("./gl-matrix/mat2.js"),r.mat2d=t("./gl-matrix/mat2d.js"),r.mat3=t("./gl-matrix/mat3.js"),r.mat4=t("./gl-matrix/mat4.js"),r.quat=t("./gl-matrix/quat.js"),r.vec2=t("./gl-matrix/vec2.js"),r.vec3=t("./gl-matrix/vec3.js"),r.vec4=t("./gl-matrix/vec4.js");},{"./gl-matrix/common.js":2,"./gl-matrix/mat2.js":3,"./gl-matrix/mat2d.js":4,"./gl-matrix/mat3.js":5,"./gl-matrix/mat4.js":6,"./gl-matrix/quat.js":7,"./gl-matrix/vec2.js":8,"./gl-matrix/vec3.js":9,"./gl-matrix/vec4.js":10}],2:[function(t,e,r){var n={};n.EPSILON=1e-6,n.ARRAY_TYPE="undefined"!=typeof Float32Array?Float32Array:Array,n.RANDOM=Math.random,n.setMatrixArrayType=function(t){GLMAT_ARRAY_TYPE=t;};var i=Math.PI/180;n.toRadian=function(t){return t*i;},e.exports=n;},{}],3:[function(t,e,r){var n=t("./common.js"),i={};i.create=function(){var t=new n.ARRAY_TYPE(4);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t;},i.clone=function(t){var e=new n.ARRAY_TYPE(4);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e;},i.copy=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t;},i.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t;},i.transpose=function(t,e){if(t===e){var r=e[1];t[1]=e[2],t[2]=r;}else t[0]=e[0],t[1]=e[2],t[2]=e[1],t[3]=e[3];return t;},i.invert=function(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],u=r*a-i*n;return u?(u=1/u,t[0]=a*u,t[1]=-n*u,t[2]=-i*u,t[3]=r*u,t):null;},i.adjoint=function(t,e){var r=e[0];return t[0]=e[3],t[1]=-e[1],t[2]=-e[2],t[3]=r,t;},i.determinant=function(t){return t[0]*t[3]-t[2]*t[1];},i.multiply=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=e[3],o=r[0],s=r[1],h=r[2],f=r[3];return t[0]=n*o+a*s,t[1]=i*o+u*s,t[2]=n*h+a*f,t[3]=i*h+u*f,t;},i.mul=i.multiply,i.rotate=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=e[3],o=Math.sin(r),s=Math.cos(r);return t[0]=n*s+a*o,t[1]=i*s+u*o,t[2]=n*-o+a*s,t[3]=i*-o+u*s,t;},i.scale=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=e[3],o=r[0],s=r[1];return t[0]=n*o,t[1]=i*o,t[2]=a*s,t[3]=u*s,t;},i.fromRotation=function(t,e){var r=Math.sin(e),n=Math.cos(e);return t[0]=n,t[1]=r,t[2]=-r,t[3]=n,t;},i.fromScaling=function(t,e){return t[0]=e[0],t[1]=0,t[2]=0,t[3]=e[1],t;},i.str=function(t){return "mat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")";},i.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2));},i.LDU=function(t,e,r,n){return t[2]=n[2]/n[0],r[0]=n[0],r[1]=n[1],r[3]=n[3]-t[2]*r[1],[t,e,r];},e.exports=i;},{"./common.js":2}],4:[function(t,e,r){var n=t("./common.js"),i={};i.create=function(){var t=new n.ARRAY_TYPE(6);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t;},i.clone=function(t){var e=new n.ARRAY_TYPE(6);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e;},i.copy=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t;},i.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t;},i.invert=function(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],u=e[4],o=e[5],s=r*a-n*i;return s?(s=1/s,t[0]=a*s,t[1]=-n*s,t[2]=-i*s,t[3]=r*s,t[4]=(i*o-a*u)*s,t[5]=(n*u-r*o)*s,t):null;},i.determinant=function(t){return t[0]*t[3]-t[1]*t[2];},i.multiply=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=e[3],o=e[4],s=e[5],h=r[0],f=r[1],l=r[2],c=r[3],d=r[4],p=r[5];return t[0]=n*h+a*f,t[1]=i*h+u*f,t[2]=n*l+a*c,t[3]=i*l+u*c,t[4]=n*d+a*p+o,t[5]=i*d+u*p+s,t;},i.mul=i.multiply,i.rotate=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=e[3],o=e[4],s=e[5],h=Math.sin(r),f=Math.cos(r);return t[0]=n*f+a*h,t[1]=i*f+u*h,t[2]=n*-h+a*f,t[3]=i*-h+u*f,t[4]=o,t[5]=s,t;},i.scale=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=e[3],o=e[4],s=e[5],h=r[0],f=r[1];return t[0]=n*h,t[1]=i*h,t[2]=a*f,t[3]=u*f,t[4]=o,t[5]=s,t;},i.translate=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=e[3],o=e[4],s=e[5],h=r[0],f=r[1];return t[0]=n,t[1]=i,t[2]=a,t[3]=u,t[4]=n*h+a*f+o,t[5]=i*h+u*f+s,t;},i.fromRotation=function(t,e){var r=Math.sin(e),n=Math.cos(e);return t[0]=n,t[1]=r,t[2]=-r,t[3]=n,t[4]=0,t[5]=0,t;},i.fromScaling=function(t,e){return t[0]=e[0],t[1]=0,t[2]=0,t[3]=e[1],t[4]=0,t[5]=0,t;},i.fromTranslation=function(t,e){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=e[0],t[5]=e[1],t;},i.str=function(t){return "mat2d("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+")";},i.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+1);},e.exports=i;},{"./common.js":2}],5:[function(t,e,r){var n=t("./common.js"),i={};i.create=function(){var t=new n.ARRAY_TYPE(9);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t;},i.fromMat4=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[4],t[4]=e[5],t[5]=e[6],t[6]=e[8],t[7]=e[9],t[8]=e[10],t;},i.clone=function(t){var e=new n.ARRAY_TYPE(9);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e;},i.copy=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t;},i.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t;},i.transpose=function(t,e){if(t===e){var r=e[1],n=e[2],i=e[5];t[1]=e[3],t[2]=e[6],t[3]=r,t[5]=e[7],t[6]=n,t[7]=i;}else t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8];return t;},i.invert=function(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],u=e[4],o=e[5],s=e[6],h=e[7],f=e[8],l=f*u-o*h,c=-f*a+o*s,d=h*a-u*s,p=r*l+n*c+i*d;return p?(p=1/p,t[0]=l*p,t[1]=(-f*n+i*h)*p,t[2]=(o*n-i*u)*p,t[3]=c*p,t[4]=(f*r-i*s)*p,t[5]=(-o*r+i*a)*p,t[6]=d*p,t[7]=(-h*r+n*s)*p,t[8]=(u*r-n*a)*p,t):null;},i.adjoint=function(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],u=e[4],o=e[5],s=e[6],h=e[7],f=e[8];return t[0]=u*f-o*h,t[1]=i*h-n*f,t[2]=n*o-i*u,t[3]=o*s-a*f,t[4]=r*f-i*s,t[5]=i*a-r*o,t[6]=a*h-u*s,t[7]=n*s-r*h,t[8]=r*u-n*a,t;},i.determinant=function(t){var e=t[0],r=t[1],n=t[2],i=t[3],a=t[4],u=t[5],o=t[6],s=t[7],h=t[8];return e*(h*a-u*s)+r*(-h*i+u*o)+n*(s*i-a*o);},i.multiply=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=e[3],o=e[4],s=e[5],h=e[6],f=e[7],l=e[8],c=r[0],d=r[1],p=r[2],v=r[3],m=r[4],_=r[5],g=r[6],E=r[7],T=r[8];return t[0]=c*n+d*u+p*h,t[1]=c*i+d*o+p*f,t[2]=c*a+d*s+p*l,t[3]=v*n+m*u+_*h,t[4]=v*i+m*o+_*f,t[5]=v*a+m*s+_*l,t[6]=g*n+E*u+T*h,t[7]=g*i+E*o+T*f,t[8]=g*a+E*s+T*l,t;},i.mul=i.multiply,i.translate=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=e[3],o=e[4],s=e[5],h=e[6],f=e[7],l=e[8],c=r[0],d=r[1];return t[0]=n,t[1]=i,t[2]=a,t[3]=u,t[4]=o,t[5]=s,t[6]=c*n+d*u+h,t[7]=c*i+d*o+f,t[8]=c*a+d*s+l,t;},i.rotate=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=e[3],o=e[4],s=e[5],h=e[6],f=e[7],l=e[8],c=Math.sin(r),d=Math.cos(r);return t[0]=d*n+c*u,t[1]=d*i+c*o,t[2]=d*a+c*s,t[3]=d*u-c*n,t[4]=d*o-c*i,t[5]=d*s-c*a,t[6]=h,t[7]=f,t[8]=l,t;},i.scale=function(t,e,r){var n=r[0],i=r[1];return t[0]=n*e[0],t[1]=n*e[1],t[2]=n*e[2],t[3]=i*e[3],t[4]=i*e[4],t[5]=i*e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t;},i.fromTranslation=function(t,e){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=e[0],t[7]=e[1],t[8]=1,t;},i.fromRotation=function(t,e){var r=Math.sin(e),n=Math.cos(e);return t[0]=n,t[1]=r,t[2]=0,t[3]=-r,t[4]=n,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t;},i.fromScaling=function(t,e){return t[0]=e[0],t[1]=0,t[2]=0,t[3]=0,t[4]=e[1],t[5]=0,t[6]=0,t[7]=0,t[8]=1,t;},i.fromMat2d=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=0,t[3]=e[2],t[4]=e[3],t[5]=0,t[6]=e[4],t[7]=e[5],t[8]=1,t;},i.fromQuat=function(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],u=r+r,o=n+n,s=i+i,h=r*u,f=n*u,l=n*o,c=i*u,d=i*o,p=i*s,v=a*u,m=a*o,_=a*s;return t[0]=1-l-p,t[3]=f-_,t[6]=c+m,t[1]=f+_,t[4]=1-h-p,t[7]=d-v,t[2]=c-m,t[5]=d+v,t[8]=1-h-l,t;},i.normalFromMat4=function(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],u=e[4],o=e[5],s=e[6],h=e[7],f=e[8],l=e[9],c=e[10],d=e[11],p=e[12],v=e[13],m=e[14],_=e[15],g=r*o-n*u,E=r*s-i*u,T=r*h-a*u,M=n*s-i*o,y=n*h-a*o,b=i*h-a*s,R=f*v-l*p,w=f*m-c*p,x=f*_-d*p,A=l*m-c*v,P=l*_-d*v,L=c*_-d*m,k=g*L-E*P+T*A+M*x-y*w+b*R;return k?(k=1/k,t[0]=(o*L-s*P+h*A)*k,t[1]=(s*x-u*L-h*w)*k,t[2]=(u*P-o*x+h*R)*k,t[3]=(i*P-n*L-a*A)*k,t[4]=(r*L-i*x+a*w)*k,t[5]=(n*x-r*P-a*R)*k,t[6]=(v*b-m*y+_*M)*k,t[7]=(m*T-p*b-_*E)*k,t[8]=(p*y-v*T+_*g)*k,t):null;},i.str=function(t){return "mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")";},i.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2));},e.exports=i;},{"./common.js":2}],6:[function(t,e,r){var n=t("./common.js"),i={};i.create=function(){var t=new n.ARRAY_TYPE(16);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t;},i.clone=function(t){var e=new n.ARRAY_TYPE(16);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e;},i.copy=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t;},i.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t;},i.transpose=function(t,e){if(t===e){var r=e[1],n=e[2],i=e[3],a=e[6],u=e[7],o=e[11];t[1]=e[4],t[2]=e[8],t[3]=e[12],t[4]=r,t[6]=e[9],t[7]=e[13],t[8]=n,t[9]=a,t[11]=e[14],t[12]=i,t[13]=u,t[14]=o;}else t[0]=e[0],t[1]=e[4],t[2]=e[8],t[3]=e[12],t[4]=e[1],t[5]=e[5],t[6]=e[9],t[7]=e[13],t[8]=e[2],t[9]=e[6],t[10]=e[10],t[11]=e[14],t[12]=e[3],t[13]=e[7],t[14]=e[11],t[15]=e[15];return t;},i.invert=function(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],u=e[4],o=e[5],s=e[6],h=e[7],f=e[8],l=e[9],c=e[10],d=e[11],p=e[12],v=e[13],m=e[14],_=e[15],g=r*o-n*u,E=r*s-i*u,T=r*h-a*u,M=n*s-i*o,y=n*h-a*o,b=i*h-a*s,R=f*v-l*p,w=f*m-c*p,x=f*_-d*p,A=l*m-c*v,P=l*_-d*v,L=c*_-d*m,k=g*L-E*P+T*A+M*x-y*w+b*R;return k?(k=1/k,t[0]=(o*L-s*P+h*A)*k,t[1]=(i*P-n*L-a*A)*k,t[2]=(v*b-m*y+_*M)*k,t[3]=(c*y-l*b-d*M)*k,t[4]=(s*x-u*L-h*w)*k,t[5]=(r*L-i*x+a*w)*k,t[6]=(m*T-p*b-_*E)*k,t[7]=(f*b-c*T+d*E)*k,t[8]=(u*P-o*x+h*R)*k,t[9]=(n*x-r*P-a*R)*k,t[10]=(p*y-v*T+_*g)*k,t[11]=(l*T-f*y-d*g)*k,t[12]=(o*w-u*A-s*R)*k,t[13]=(r*A-n*w+i*R)*k,t[14]=(v*E-p*M-m*g)*k,t[15]=(f*M-l*E+c*g)*k,t):null;},i.adjoint=function(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],u=e[4],o=e[5],s=e[6],h=e[7],f=e[8],l=e[9],c=e[10],d=e[11],p=e[12],v=e[13],m=e[14],_=e[15];return t[0]=o*(c*_-d*m)-l*(s*_-h*m)+v*(s*d-h*c),t[1]=-(n*(c*_-d*m)-l*(i*_-a*m)+v*(i*d-a*c)),t[2]=n*(s*_-h*m)-o*(i*_-a*m)+v*(i*h-a*s),t[3]=-(n*(s*d-h*c)-o*(i*d-a*c)+l*(i*h-a*s)),t[4]=-(u*(c*_-d*m)-f*(s*_-h*m)+p*(s*d-h*c)),t[5]=r*(c*_-d*m)-f*(i*_-a*m)+p*(i*d-a*c),t[6]=-(r*(s*_-h*m)-u*(i*_-a*m)+p*(i*h-a*s)),t[7]=r*(s*d-h*c)-u*(i*d-a*c)+f*(i*h-a*s),t[8]=u*(l*_-d*v)-f*(o*_-h*v)+p*(o*d-h*l),t[9]=-(r*(l*_-d*v)-f*(n*_-a*v)+p*(n*d-a*l)),t[10]=r*(o*_-h*v)-u*(n*_-a*v)+p*(n*h-a*o),t[11]=-(r*(o*d-h*l)-u*(n*d-a*l)+f*(n*h-a*o)),t[12]=-(u*(l*m-c*v)-f*(o*m-s*v)+p*(o*c-s*l)),t[13]=r*(l*m-c*v)-f*(n*m-i*v)+p*(n*c-i*l),t[14]=-(r*(o*m-s*v)-u*(n*m-i*v)+p*(n*s-i*o)),t[15]=r*(o*c-s*l)-u*(n*c-i*l)+f*(n*s-i*o),t;},i.determinant=function(t){var e=t[0],r=t[1],n=t[2],i=t[3],a=t[4],u=t[5],o=t[6],s=t[7],h=t[8],f=t[9],l=t[10],c=t[11],d=t[12],p=t[13],v=t[14],m=t[15],_=e*u-r*a,g=e*o-n*a,E=e*s-i*a,T=r*o-n*u,M=r*s-i*u,y=n*s-i*o,b=h*p-f*d,R=h*v-l*d,w=h*m-c*d,x=f*v-l*p,A=f*m-c*p,P=l*m-c*v;return _*P-g*A+E*x+T*w-M*R+y*b;},i.multiply=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=e[3],o=e[4],s=e[5],h=e[6],f=e[7],l=e[8],c=e[9],d=e[10],p=e[11],v=e[12],m=e[13],_=e[14],g=e[15],E=r[0],T=r[1],M=r[2],y=r[3];return t[0]=E*n+T*o+M*l+y*v,t[1]=E*i+T*s+M*c+y*m,t[2]=E*a+T*h+M*d+y*_,t[3]=E*u+T*f+M*p+y*g,E=r[4],T=r[5],M=r[6],y=r[7],t[4]=E*n+T*o+M*l+y*v,t[5]=E*i+T*s+M*c+y*m,t[6]=E*a+T*h+M*d+y*_,t[7]=E*u+T*f+M*p+y*g,E=r[8],T=r[9],M=r[10],y=r[11],t[8]=E*n+T*o+M*l+y*v,t[9]=E*i+T*s+M*c+y*m,t[10]=E*a+T*h+M*d+y*_,t[11]=E*u+T*f+M*p+y*g,E=r[12],T=r[13],M=r[14],y=r[15],t[12]=E*n+T*o+M*l+y*v,t[13]=E*i+T*s+M*c+y*m,t[14]=E*a+T*h+M*d+y*_,t[15]=E*u+T*f+M*p+y*g,t;},i.mul=i.multiply,i.translate=function(t,e,r){var n,i,a,u,o,s,h,f,l,c,d,p,v=r[0],m=r[1],_=r[2];return e===t?(t[12]=e[0]*v+e[4]*m+e[8]*_+e[12],t[13]=e[1]*v+e[5]*m+e[9]*_+e[13],t[14]=e[2]*v+e[6]*m+e[10]*_+e[14],t[15]=e[3]*v+e[7]*m+e[11]*_+e[15]):(n=e[0],i=e[1],a=e[2],u=e[3],o=e[4],s=e[5],h=e[6],f=e[7],l=e[8],c=e[9],d=e[10],p=e[11],t[0]=n,t[1]=i,t[2]=a,t[3]=u,t[4]=o,t[5]=s,t[6]=h,t[7]=f,t[8]=l,t[9]=c,t[10]=d,t[11]=p,t[12]=n*v+o*m+l*_+e[12],t[13]=i*v+s*m+c*_+e[13],t[14]=a*v+h*m+d*_+e[14],t[15]=u*v+f*m+p*_+e[15]),t;},i.scale=function(t,e,r){var n=r[0],i=r[1],a=r[2];return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t[3]=e[3]*n,t[4]=e[4]*i,t[5]=e[5]*i,t[6]=e[6]*i,t[7]=e[7]*i,t[8]=e[8]*a,t[9]=e[9]*a,t[10]=e[10]*a,t[11]=e[11]*a,t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t;},i.rotate=function(t,e,r,i){var a,u,o,s,h,f,l,c,d,p,v,m,_,g,E,T,M,y,b,R,w,x,A,P,L=i[0],k=i[1],O=i[2],S=Math.sqrt(L*L+k*k+O*O);return Math.abs(S)<n.EPSILON?null:(S=1/S,L*=S,k*=S,O*=S,a=Math.sin(r),u=Math.cos(r),o=1-u,s=e[0],h=e[1],f=e[2],l=e[3],c=e[4],d=e[5],p=e[6],v=e[7],m=e[8],_=e[9],g=e[10],E=e[11],T=L*L*o+u,M=k*L*o+O*a,y=O*L*o-k*a,b=L*k*o-O*a,R=k*k*o+u,w=O*k*o+L*a,x=L*O*o+k*a,A=k*O*o-L*a,P=O*O*o+u,t[0]=s*T+c*M+m*y,t[1]=h*T+d*M+_*y,t[2]=f*T+p*M+g*y,t[3]=l*T+v*M+E*y,t[4]=s*b+c*R+m*w,t[5]=h*b+d*R+_*w,t[6]=f*b+p*R+g*w,t[7]=l*b+v*R+E*w,t[8]=s*x+c*A+m*P,t[9]=h*x+d*A+_*P,t[10]=f*x+p*A+g*P,t[11]=l*x+v*A+E*P,e!==t&&(t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t);},i.rotateX=function(t,e,r){var n=Math.sin(r),i=Math.cos(r),a=e[4],u=e[5],o=e[6],s=e[7],h=e[8],f=e[9],l=e[10],c=e[11];return e!==t&&(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[4]=a*i+h*n,t[5]=u*i+f*n,t[6]=o*i+l*n,t[7]=s*i+c*n,t[8]=h*i-a*n,t[9]=f*i-u*n,t[10]=l*i-o*n,t[11]=c*i-s*n,t;},i.rotateY=function(t,e,r){var n=Math.sin(r),i=Math.cos(r),a=e[0],u=e[1],o=e[2],s=e[3],h=e[8],f=e[9],l=e[10],c=e[11];return e!==t&&(t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=a*i-h*n,t[1]=u*i-f*n,t[2]=o*i-l*n,t[3]=s*i-c*n,t[8]=a*n+h*i,t[9]=u*n+f*i,t[10]=o*n+l*i,t[11]=s*n+c*i,t;},i.rotateZ=function(t,e,r){var n=Math.sin(r),i=Math.cos(r),a=e[0],u=e[1],o=e[2],s=e[3],h=e[4],f=e[5],l=e[6],c=e[7];return e!==t&&(t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=a*i+h*n,t[1]=u*i+f*n,t[2]=o*i+l*n,t[3]=s*i+c*n,t[4]=h*i-a*n,t[5]=f*i-u*n,t[6]=l*i-o*n,t[7]=c*i-s*n,t;},i.fromTranslation=function(t,e){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=e[0],t[13]=e[1],t[14]=e[2],t[15]=1,t;},i.fromScaling=function(t,e){return t[0]=e[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=e[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=e[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t;},i.fromRotation=function(t,e,r){var i,a,u,o=r[0],s=r[1],h=r[2],f=Math.sqrt(o*o+s*s+h*h);return Math.abs(f)<n.EPSILON?null:(f=1/f,o*=f,s*=f,h*=f,i=Math.sin(e),a=Math.cos(e),u=1-a,t[0]=o*o*u+a,t[1]=s*o*u+h*i,t[2]=h*o*u-s*i,t[3]=0,t[4]=o*s*u-h*i,t[5]=s*s*u+a,t[6]=h*s*u+o*i,t[7]=0,t[8]=o*h*u+s*i,t[9]=s*h*u-o*i,t[10]=h*h*u+a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t);},i.fromXRotation=function(t,e){var r=Math.sin(e),n=Math.cos(e);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n,t[6]=r,t[7]=0,t[8]=0,t[9]=-r,t[10]=n,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t;},i.fromYRotation=function(t,e){var r=Math.sin(e),n=Math.cos(e);return t[0]=n,t[1]=0,t[2]=-r,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=r,t[9]=0,t[10]=n,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t;},i.fromZRotation=function(t,e){var r=Math.sin(e),n=Math.cos(e);return t[0]=n,t[1]=r,t[2]=0,t[3]=0,t[4]=-r,t[5]=n,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t;},i.fromRotationTranslation=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=e[3],o=n+n,s=i+i,h=a+a,f=n*o,l=n*s,c=n*h,d=i*s,p=i*h,v=a*h,m=u*o,_=u*s,g=u*h;return t[0]=1-(d+v),t[1]=l+g,t[2]=c-_,t[3]=0,t[4]=l-g,t[5]=1-(f+v),t[6]=p+m,t[7]=0,t[8]=c+_,t[9]=p-m,t[10]=1-(f+d),t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t;},i.fromRotationTranslationScale=function(t,e,r,n){var i=e[0],a=e[1],u=e[2],o=e[3],s=i+i,h=a+a,f=u+u,l=i*s,c=i*h,d=i*f,p=a*h,v=a*f,m=u*f,_=o*s,g=o*h,E=o*f,T=n[0],M=n[1],y=n[2];return t[0]=(1-(p+m))*T,t[1]=(c+E)*T,t[2]=(d-g)*T,t[3]=0,t[4]=(c-E)*M,t[5]=(1-(l+m))*M,t[6]=(v+_)*M,t[7]=0,t[8]=(d+g)*y,t[9]=(v-_)*y,t[10]=(1-(l+p))*y,t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t;},i.fromRotationTranslationScaleOrigin=function(t,e,r,n,i){var a=e[0],u=e[1],o=e[2],s=e[3],h=a+a,f=u+u,l=o+o,c=a*h,d=a*f,p=a*l,v=u*f,m=u*l,_=o*l,g=s*h,E=s*f,T=s*l,M=n[0],y=n[1],b=n[2],R=i[0],w=i[1],x=i[2];return t[0]=(1-(v+_))*M,t[1]=(d+T)*M,t[2]=(p-E)*M,t[3]=0,t[4]=(d-T)*y,t[5]=(1-(c+_))*y,t[6]=(m+g)*y,t[7]=0,t[8]=(p+E)*b,t[9]=(m-g)*b,t[10]=(1-(c+v))*b,t[11]=0,t[12]=r[0]+R-(t[0]*R+t[4]*w+t[8]*x),t[13]=r[1]+w-(t[1]*R+t[5]*w+t[9]*x),t[14]=r[2]+x-(t[2]*R+t[6]*w+t[10]*x),t[15]=1,t;},i.fromQuat=function(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],u=r+r,o=n+n,s=i+i,h=r*u,f=n*u,l=n*o,c=i*u,d=i*o,p=i*s,v=a*u,m=a*o,_=a*s;return t[0]=1-l-p,t[1]=f+_,t[2]=c-m,t[3]=0,t[4]=f-_,t[5]=1-h-p,t[6]=d+v,t[7]=0,t[8]=c+m,t[9]=d-v,t[10]=1-h-l,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t;},i.frustum=function(t,e,r,n,i,a,u){var o=1/(r-e),s=1/(i-n),h=1/(a-u);return t[0]=2*a*o,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*a*s,t[6]=0,t[7]=0,t[8]=(r+e)*o,t[9]=(i+n)*s,t[10]=(u+a)*h,t[11]=-1,t[12]=0,t[13]=0,t[14]=u*a*2*h,t[15]=0,t;},i.perspective=function(t,e,r,n,i){var a=1/Math.tan(e/2),u=1/(n-i);return t[0]=a/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(i+n)*u,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*i*n*u,t[15]=0,t;},i.perspectiveFromFieldOfView=function(t,e,r,n){var i=Math.tan(e.upDegrees*Math.PI/180),a=Math.tan(e.downDegrees*Math.PI/180),u=Math.tan(e.leftDegrees*Math.PI/180),o=Math.tan(e.rightDegrees*Math.PI/180),s=2/(u+o),h=2/(i+a);return t[0]=s,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=h,t[6]=0,t[7]=0,t[8]=-((u-o)*s*.5),t[9]=(i-a)*h*.5,t[10]=n/(r-n),t[11]=-1,t[12]=0,t[13]=0,t[14]=n*r/(r-n),t[15]=0,t;},i.ortho=function(t,e,r,n,i,a,u){var o=1/(e-r),s=1/(n-i),h=1/(a-u);return t[0]=-2*o,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*s,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*h,t[11]=0,t[12]=(e+r)*o,t[13]=(i+n)*s,t[14]=(u+a)*h,t[15]=1,t;},i.lookAt=function(t,e,r,a){var u,o,s,h,f,l,c,d,p,v,m=e[0],_=e[1],g=e[2],E=a[0],T=a[1],M=a[2],y=r[0],b=r[1],R=r[2];return Math.abs(m-y)<n.EPSILON&&Math.abs(_-b)<n.EPSILON&&Math.abs(g-R)<n.EPSILON?i.identity(t):(c=m-y,d=_-b,p=g-R,v=1/Math.sqrt(c*c+d*d+p*p),c*=v,d*=v,p*=v,u=T*p-M*d,o=M*c-E*p,s=E*d-T*c,v=Math.sqrt(u*u+o*o+s*s),v?(v=1/v,u*=v,o*=v,s*=v):(u=0,o=0,s=0),h=d*s-p*o,f=p*u-c*s,l=c*o-d*u,v=Math.sqrt(h*h+f*f+l*l),v?(v=1/v,h*=v,f*=v,l*=v):(h=0,f=0,l=0),t[0]=u,t[1]=h,t[2]=c,t[3]=0,t[4]=o,t[5]=f,t[6]=d,t[7]=0,t[8]=s,t[9]=l,t[10]=p,t[11]=0,t[12]=-(u*m+o*_+s*g),t[13]=-(h*m+f*_+l*g),t[14]=-(c*m+d*_+p*g),t[15]=1,t);},i.str=function(t){return "mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")";},i.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2)+Math.pow(t[9],2)+Math.pow(t[10],2)+Math.pow(t[11],2)+Math.pow(t[12],2)+Math.pow(t[13],2)+Math.pow(t[14],2)+Math.pow(t[15],2));},e.exports=i;},{"./common.js":2}],7:[function(t,e,r){var n=t("./common.js"),i=t("./mat3.js"),a=t("./vec3.js"),u=t("./vec4.js"),o={};o.create=function(){var t=new n.ARRAY_TYPE(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t;},o.rotationTo=function(){var t=a.create(),e=a.fromValues(1,0,0),r=a.fromValues(0,1,0);return function(n,i,u){var s=a.dot(i,u);return -.999999>s?(a.cross(t,e,i),a.length(t)<1e-6&&a.cross(t,r,i),a.normalize(t,t),o.setAxisAngle(n,t,Math.PI),n):s>.999999?(n[0]=0,n[1]=0,n[2]=0,n[3]=1,n):(a.cross(t,i,u),n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=1+s,o.normalize(n,n));};}(),o.setAxes=function(){var t=i.create();return function(e,r,n,i){return t[0]=n[0],t[3]=n[1],t[6]=n[2],t[1]=i[0],t[4]=i[1],t[7]=i[2],t[2]=-r[0],t[5]=-r[1],t[8]=-r[2],o.normalize(e,o.fromMat3(e,t));};}(),o.clone=u.clone,o.fromValues=u.fromValues,o.copy=u.copy,o.set=u.set,o.identity=function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t;},o.setAxisAngle=function(t,e,r){r=.5*r;var n=Math.sin(r);return t[0]=n*e[0],t[1]=n*e[1],t[2]=n*e[2],t[3]=Math.cos(r),t;},o.add=u.add,o.multiply=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=e[3],o=r[0],s=r[1],h=r[2],f=r[3];return t[0]=n*f+u*o+i*h-a*s,t[1]=i*f+u*s+a*o-n*h,t[2]=a*f+u*h+n*s-i*o,t[3]=u*f-n*o-i*s-a*h,t;},o.mul=o.multiply,o.scale=u.scale,o.rotateX=function(t,e,r){r*=.5;var n=e[0],i=e[1],a=e[2],u=e[3],o=Math.sin(r),s=Math.cos(r);return t[0]=n*s+u*o,t[1]=i*s+a*o,t[2]=a*s-i*o,t[3]=u*s-n*o,t;},o.rotateY=function(t,e,r){r*=.5;var n=e[0],i=e[1],a=e[2],u=e[3],o=Math.sin(r),s=Math.cos(r);return t[0]=n*s-a*o,t[1]=i*s+u*o,t[2]=a*s+n*o,t[3]=u*s-i*o,t;},o.rotateZ=function(t,e,r){r*=.5;var n=e[0],i=e[1],a=e[2],u=e[3],o=Math.sin(r),s=Math.cos(r);return t[0]=n*s+i*o,t[1]=i*s-n*o,t[2]=a*s+u*o,t[3]=u*s-a*o,t;},o.calculateW=function(t,e){var r=e[0],n=e[1],i=e[2];return t[0]=r,t[1]=n,t[2]=i,t[3]=Math.sqrt(Math.abs(1-r*r-n*n-i*i)),t;},o.dot=u.dot,o.lerp=u.lerp,o.slerp=function(t,e,r,n){var i,a,u,o,s,h=e[0],f=e[1],l=e[2],c=e[3],d=r[0],p=r[1],v=r[2],m=r[3];return a=h*d+f*p+l*v+c*m,0>a&&(a=-a,d=-d,p=-p,v=-v,m=-m),1-a>1e-6?(i=Math.acos(a),u=Math.sin(i),o=Math.sin((1-n)*i)/u,s=Math.sin(n*i)/u):(o=1-n,s=n),t[0]=o*h+s*d,t[1]=o*f+s*p,t[2]=o*l+s*v,t[3]=o*c+s*m,t;},o.sqlerp=function(){var t=o.create(),e=o.create();return function(r,n,i,a,u,s){return o.slerp(t,n,u,s),o.slerp(e,i,a,s),o.slerp(r,t,e,2*s*(1-s)),r;};}(),o.invert=function(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],u=r*r+n*n+i*i+a*a,o=u?1/u:0;return t[0]=-r*o,t[1]=-n*o,t[2]=-i*o,t[3]=a*o,t;},o.conjugate=function(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=e[3],t;},o.length=u.length,o.len=o.length,o.squaredLength=u.squaredLength,o.sqrLen=o.squaredLength,o.normalize=u.normalize,o.fromMat3=function(t,e){var r,n=e[0]+e[4]+e[8];if(n>0)r=Math.sqrt(n+1),t[3]=.5*r,r=.5/r,t[0]=(e[5]-e[7])*r,t[1]=(e[6]-e[2])*r,t[2]=(e[1]-e[3])*r;else {var i=0;e[4]>e[0]&&(i=1),e[8]>e[3*i+i]&&(i=2);var a=(i+1)%3,u=(i+2)%3;r=Math.sqrt(e[3*i+i]-e[3*a+a]-e[3*u+u]+1),t[i]=.5*r,r=.5/r,t[3]=(e[3*a+u]-e[3*u+a])*r,t[a]=(e[3*a+i]+e[3*i+a])*r,t[u]=(e[3*u+i]+e[3*i+u])*r;}return t;},o.str=function(t){return "quat("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")";},e.exports=o;},{"./common.js":2,"./mat3.js":5,"./vec3.js":9,"./vec4.js":10}],8:[function(t,e,r){var n=t("./common.js"),i={};i.create=function(){var t=new n.ARRAY_TYPE(2);return t[0]=0,t[1]=0,t;},i.clone=function(t){var e=new n.ARRAY_TYPE(2);return e[0]=t[0],e[1]=t[1],e;},i.fromValues=function(t,e){var r=new n.ARRAY_TYPE(2);return r[0]=t,r[1]=e,r;},i.copy=function(t,e){return t[0]=e[0],t[1]=e[1],t;},i.set=function(t,e,r){return t[0]=e,t[1]=r,t;},i.add=function(t,e,r){return t[0]=e[0]+r[0],t[1]=e[1]+r[1],t;},i.subtract=function(t,e,r){return t[0]=e[0]-r[0],t[1]=e[1]-r[1],t;},i.sub=i.subtract,i.multiply=function(t,e,r){return t[0]=e[0]*r[0],t[1]=e[1]*r[1],t;},i.mul=i.multiply,i.divide=function(t,e,r){return t[0]=e[0]/r[0],t[1]=e[1]/r[1],t;},i.div=i.divide,i.min=function(t,e,r){return t[0]=Math.min(e[0],r[0]),t[1]=Math.min(e[1],r[1]),t;},i.max=function(t,e,r){return t[0]=Math.max(e[0],r[0]),t[1]=Math.max(e[1],r[1]),t;},i.scale=function(t,e,r){return t[0]=e[0]*r,t[1]=e[1]*r,t;},i.scaleAndAdd=function(t,e,r,n){return t[0]=e[0]+r[0]*n,t[1]=e[1]+r[1]*n,t;},i.distance=function(t,e){var r=e[0]-t[0],n=e[1]-t[1];return Math.sqrt(r*r+n*n);},i.dist=i.distance,i.squaredDistance=function(t,e){var r=e[0]-t[0],n=e[1]-t[1];return r*r+n*n;},i.sqrDist=i.squaredDistance,i.length=function(t){var e=t[0],r=t[1];return Math.sqrt(e*e+r*r);},i.len=i.length,i.squaredLength=function(t){var e=t[0],r=t[1];return e*e+r*r;},i.sqrLen=i.squaredLength,i.negate=function(t,e){return t[0]=-e[0],t[1]=-e[1],t;},i.inverse=function(t,e){return t[0]=1/e[0],t[1]=1/e[1],t;},i.normalize=function(t,e){var r=e[0],n=e[1],i=r*r+n*n;return i>0&&(i=1/Math.sqrt(i),t[0]=e[0]*i,t[1]=e[1]*i),t;},i.dot=function(t,e){return t[0]*e[0]+t[1]*e[1];},i.cross=function(t,e,r){var n=e[0]*r[1]-e[1]*r[0];return t[0]=t[1]=0,t[2]=n,t;},i.lerp=function(t,e,r,n){var i=e[0],a=e[1];return t[0]=i+n*(r[0]-i),t[1]=a+n*(r[1]-a),t;},i.random=function(t,e){e=e||1;var r=2*n.RANDOM()*Math.PI;return t[0]=Math.cos(r)*e,t[1]=Math.sin(r)*e,t;},i.transformMat2=function(t,e,r){var n=e[0],i=e[1];return t[0]=r[0]*n+r[2]*i,t[1]=r[1]*n+r[3]*i,t;},i.transformMat2d=function(t,e,r){var n=e[0],i=e[1];return t[0]=r[0]*n+r[2]*i+r[4],t[1]=r[1]*n+r[3]*i+r[5],t;},i.transformMat3=function(t,e,r){var n=e[0],i=e[1];return t[0]=r[0]*n+r[3]*i+r[6],t[1]=r[1]*n+r[4]*i+r[7],t;},i.transformMat4=function(t,e,r){var n=e[0],i=e[1];return t[0]=r[0]*n+r[4]*i+r[12],t[1]=r[1]*n+r[5]*i+r[13],t;},i.forEach=function(){var t=i.create();return function(e,r,n,i,a,u){var o,s;for(r||(r=2),n||(n=0),s=i?Math.min(i*r+n,e.length):e.length,o=n;s>o;o+=r){t[0]=e[o],t[1]=e[o+1],a(t,t,u),e[o]=t[0],e[o+1]=t[1];}return e;};}(),i.str=function(t){return "vec2("+t[0]+", "+t[1]+")";},e.exports=i;},{"./common.js":2}],9:[function(t,e,r){var n=t("./common.js"),i={};i.create=function(){var t=new n.ARRAY_TYPE(3);return t[0]=0,t[1]=0,t[2]=0,t;},i.clone=function(t){var e=new n.ARRAY_TYPE(3);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e;},i.fromValues=function(t,e,r){var i=new n.ARRAY_TYPE(3);return i[0]=t,i[1]=e,i[2]=r,i;},i.copy=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t;},i.set=function(t,e,r,n){return t[0]=e,t[1]=r,t[2]=n,t;},i.add=function(t,e,r){return t[0]=e[0]+r[0],t[1]=e[1]+r[1],t[2]=e[2]+r[2],t;},i.subtract=function(t,e,r){return t[0]=e[0]-r[0],t[1]=e[1]-r[1],t[2]=e[2]-r[2],t;},i.sub=i.subtract,i.multiply=function(t,e,r){return t[0]=e[0]*r[0],t[1]=e[1]*r[1],t[2]=e[2]*r[2],t;},i.mul=i.multiply,i.divide=function(t,e,r){return t[0]=e[0]/r[0],t[1]=e[1]/r[1],t[2]=e[2]/r[2],t;},i.div=i.divide,i.min=function(t,e,r){return t[0]=Math.min(e[0],r[0]),t[1]=Math.min(e[1],r[1]),t[2]=Math.min(e[2],r[2]),t;},i.max=function(t,e,r){return t[0]=Math.max(e[0],r[0]),t[1]=Math.max(e[1],r[1]),t[2]=Math.max(e[2],r[2]),t;},i.scale=function(t,e,r){return t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t;},i.scaleAndAdd=function(t,e,r,n){return t[0]=e[0]+r[0]*n,t[1]=e[1]+r[1]*n,t[2]=e[2]+r[2]*n,t;},i.distance=function(t,e){var r=e[0]-t[0],n=e[1]-t[1],i=e[2]-t[2];return Math.sqrt(r*r+n*n+i*i);},i.dist=i.distance,i.squaredDistance=function(t,e){var r=e[0]-t[0],n=e[1]-t[1],i=e[2]-t[2];return r*r+n*n+i*i;},i.sqrDist=i.squaredDistance,i.length=function(t){var e=t[0],r=t[1],n=t[2];return Math.sqrt(e*e+r*r+n*n);},i.len=i.length,i.squaredLength=function(t){var e=t[0],r=t[1],n=t[2];return e*e+r*r+n*n;},i.sqrLen=i.squaredLength,i.negate=function(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t;},i.inverse=function(t,e){return t[0]=1/e[0],t[1]=1/e[1],t[2]=1/e[2],t;},i.normalize=function(t,e){var r=e[0],n=e[1],i=e[2],a=r*r+n*n+i*i;return a>0&&(a=1/Math.sqrt(a),t[0]=e[0]*a,t[1]=e[1]*a,t[2]=e[2]*a),t;},i.dot=function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2];},i.cross=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=r[0],o=r[1],s=r[2];return t[0]=i*s-a*o,t[1]=a*u-n*s,t[2]=n*o-i*u,t;},i.lerp=function(t,e,r,n){var i=e[0],a=e[1],u=e[2];return t[0]=i+n*(r[0]-i),t[1]=a+n*(r[1]-a),t[2]=u+n*(r[2]-u),t;},i.hermite=function(t,e,r,n,i,a){var u=a*a,o=u*(2*a-3)+1,s=u*(a-2)+a,h=u*(a-1),f=u*(3-2*a);return t[0]=e[0]*o+r[0]*s+n[0]*h+i[0]*f,t[1]=e[1]*o+r[1]*s+n[1]*h+i[1]*f,t[2]=e[2]*o+r[2]*s+n[2]*h+i[2]*f,t;},i.bezier=function(t,e,r,n,i,a){var u=1-a,o=u*u,s=a*a,h=o*u,f=3*a*o,l=3*s*u,c=s*a;return t[0]=e[0]*h+r[0]*f+n[0]*l+i[0]*c,t[1]=e[1]*h+r[1]*f+n[1]*l+i[1]*c,t[2]=e[2]*h+r[2]*f+n[2]*l+i[2]*c,t;},i.random=function(t,e){e=e||1;var r=2*n.RANDOM()*Math.PI,i=2*n.RANDOM()-1,a=Math.sqrt(1-i*i)*e;return t[0]=Math.cos(r)*a,t[1]=Math.sin(r)*a,t[2]=i*e,t;},i.transformMat4=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=r[3]*n+r[7]*i+r[11]*a+r[15];return u=u||1,t[0]=(r[0]*n+r[4]*i+r[8]*a+r[12])/u,t[1]=(r[1]*n+r[5]*i+r[9]*a+r[13])/u,t[2]=(r[2]*n+r[6]*i+r[10]*a+r[14])/u,t;},i.transformMat3=function(t,e,r){var n=e[0],i=e[1],a=e[2];return t[0]=n*r[0]+i*r[3]+a*r[6],t[1]=n*r[1]+i*r[4]+a*r[7],t[2]=n*r[2]+i*r[5]+a*r[8],t;},i.transformQuat=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=r[0],o=r[1],s=r[2],h=r[3],f=h*n+o*a-s*i,l=h*i+s*n-u*a,c=h*a+u*i-o*n,d=-u*n-o*i-s*a;return t[0]=f*h+d*-u+l*-s-c*-o,t[1]=l*h+d*-o+c*-u-f*-s,t[2]=c*h+d*-s+f*-o-l*-u,t;},i.rotateX=function(t,e,r,n){var i=[],a=[];return i[0]=e[0]-r[0],i[1]=e[1]-r[1],i[2]=e[2]-r[2],a[0]=i[0],a[1]=i[1]*Math.cos(n)-i[2]*Math.sin(n),a[2]=i[1]*Math.sin(n)+i[2]*Math.cos(n),t[0]=a[0]+r[0],t[1]=a[1]+r[1],t[2]=a[2]+r[2],t;},i.rotateY=function(t,e,r,n){var i=[],a=[];return i[0]=e[0]-r[0],i[1]=e[1]-r[1],i[2]=e[2]-r[2],a[0]=i[2]*Math.sin(n)+i[0]*Math.cos(n),a[1]=i[1],a[2]=i[2]*Math.cos(n)-i[0]*Math.sin(n),t[0]=a[0]+r[0],t[1]=a[1]+r[1],t[2]=a[2]+r[2],t;},i.rotateZ=function(t,e,r,n){var i=[],a=[];return i[0]=e[0]-r[0],i[1]=e[1]-r[1],i[2]=e[2]-r[2],a[0]=i[0]*Math.cos(n)-i[1]*Math.sin(n),a[1]=i[0]*Math.sin(n)+i[1]*Math.cos(n),a[2]=i[2],t[0]=a[0]+r[0],t[1]=a[1]+r[1],t[2]=a[2]+r[2],t;},i.forEach=function(){var t=i.create();return function(e,r,n,i,a,u){var o,s;for(r||(r=3),n||(n=0),s=i?Math.min(i*r+n,e.length):e.length,o=n;s>o;o+=r){t[0]=e[o],t[1]=e[o+1],t[2]=e[o+2],a(t,t,u),e[o]=t[0],e[o+1]=t[1],e[o+2]=t[2];}return e;};}(),i.angle=function(t,e){var r=i.fromValues(t[0],t[1],t[2]),n=i.fromValues(e[0],e[1],e[2]);i.normalize(r,r),i.normalize(n,n);var a=i.dot(r,n);return a>1?0:Math.acos(a);},i.str=function(t){return "vec3("+t[0]+", "+t[1]+", "+t[2]+")";},e.exports=i;},{"./common.js":2}],10:[function(t,e,r){var n=t("./common.js"),i={};i.create=function(){var t=new n.ARRAY_TYPE(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t;},i.clone=function(t){var e=new n.ARRAY_TYPE(4);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e;},i.fromValues=function(t,e,r,i){var a=new n.ARRAY_TYPE(4);return a[0]=t,a[1]=e,a[2]=r,a[3]=i,a;},i.copy=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t;},i.set=function(t,e,r,n,i){return t[0]=e,t[1]=r,t[2]=n,t[3]=i,t;},i.add=function(t,e,r){return t[0]=e[0]+r[0],t[1]=e[1]+r[1],t[2]=e[2]+r[2],t[3]=e[3]+r[3],t;},i.subtract=function(t,e,r){return t[0]=e[0]-r[0],t[1]=e[1]-r[1],t[2]=e[2]-r[2],t[3]=e[3]-r[3],t;},i.sub=i.subtract,i.multiply=function(t,e,r){return t[0]=e[0]*r[0],t[1]=e[1]*r[1],t[2]=e[2]*r[2],t[3]=e[3]*r[3],t;},i.mul=i.multiply,i.divide=function(t,e,r){return t[0]=e[0]/r[0],t[1]=e[1]/r[1],t[2]=e[2]/r[2],t[3]=e[3]/r[3],t;},i.div=i.divide,i.min=function(t,e,r){return t[0]=Math.min(e[0],r[0]),t[1]=Math.min(e[1],r[1]),t[2]=Math.min(e[2],r[2]),t[3]=Math.min(e[3],r[3]),t;},i.max=function(t,e,r){return t[0]=Math.max(e[0],r[0]),t[1]=Math.max(e[1],r[1]),t[2]=Math.max(e[2],r[2]),t[3]=Math.max(e[3],r[3]),t;},i.scale=function(t,e,r){return t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t[3]=e[3]*r,t;},i.scaleAndAdd=function(t,e,r,n){return t[0]=e[0]+r[0]*n,t[1]=e[1]+r[1]*n,t[2]=e[2]+r[2]*n,t[3]=e[3]+r[3]*n,t;},i.distance=function(t,e){var r=e[0]-t[0],n=e[1]-t[1],i=e[2]-t[2],a=e[3]-t[3];return Math.sqrt(r*r+n*n+i*i+a*a);},i.dist=i.distance,i.squaredDistance=function(t,e){var r=e[0]-t[0],n=e[1]-t[1],i=e[2]-t[2],a=e[3]-t[3];return r*r+n*n+i*i+a*a;},i.sqrDist=i.squaredDistance,i.length=function(t){var e=t[0],r=t[1],n=t[2],i=t[3];return Math.sqrt(e*e+r*r+n*n+i*i);},i.len=i.length,i.squaredLength=function(t){var e=t[0],r=t[1],n=t[2],i=t[3];return e*e+r*r+n*n+i*i;},i.sqrLen=i.squaredLength,i.negate=function(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=-e[3],t;},i.inverse=function(t,e){return t[0]=1/e[0],t[1]=1/e[1],t[2]=1/e[2],t[3]=1/e[3],t;},i.normalize=function(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],u=r*r+n*n+i*i+a*a;return u>0&&(u=1/Math.sqrt(u),t[0]=r*u,t[1]=n*u,t[2]=i*u,t[3]=a*u),t;},i.dot=function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3];},i.lerp=function(t,e,r,n){var i=e[0],a=e[1],u=e[2],o=e[3];return t[0]=i+n*(r[0]-i),t[1]=a+n*(r[1]-a),t[2]=u+n*(r[2]-u),t[3]=o+n*(r[3]-o),t;},i.random=function(t,e){return e=e||1,t[0]=n.RANDOM(),t[1]=n.RANDOM(),t[2]=n.RANDOM(),t[3]=n.RANDOM(),i.normalize(t,t),i.scale(t,t,e),t;},i.transformMat4=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=e[3];return t[0]=r[0]*n+r[4]*i+r[8]*a+r[12]*u,t[1]=r[1]*n+r[5]*i+r[9]*a+r[13]*u,t[2]=r[2]*n+r[6]*i+r[10]*a+r[14]*u,t[3]=r[3]*n+r[7]*i+r[11]*a+r[15]*u,t;},i.transformQuat=function(t,e,r){var n=e[0],i=e[1],a=e[2],u=r[0],o=r[1],s=r[2],h=r[3],f=h*n+o*a-s*i,l=h*i+s*n-u*a,c=h*a+u*i-o*n,d=-u*n-o*i-s*a;return t[0]=f*h+d*-u+l*-s-c*-o,t[1]=l*h+d*-o+c*-u-f*-s,t[2]=c*h+d*-s+f*-o-l*-u,t[3]=e[3],t;},i.forEach=function(){var t=i.create();return function(e,r,n,i,a,u){var o,s;for(r||(r=4),n||(n=0),s=i?Math.min(i*r+n,e.length):e.length,o=n;s>o;o+=r){t[0]=e[o],t[1]=e[o+1],t[2]=e[o+2],t[3]=e[o+3],a(t,t,u),e[o]=t[0],e[o+1]=t[1],e[o+2]=t[2],e[o+3]=t[3];}return e;};}(),i.str=function(t){return "vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")";},e.exports=i;},{"./common.js":2}],11:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}(),u=t("gl-matrix"),o=n(u),s=t("./alfrid/GLTool"),h=n(s),f=t("./alfrid/GLShader"),l=n(f),c=t("./alfrid/GLTexture"),d=n(c),p=t("./alfrid/GLCubeTexture"),v=n(p),m=t("./alfrid/Mesh"),_=n(m),g=t("./alfrid/Geom"),E=n(g),T=t("./alfrid/Batch"),M=n(T),y=t("./alfrid/FrameBuffer"),b=n(y),R=t("./alfrid/tools/Scheduler"),w=n(R),x=t("./alfrid/tools/EventDispatcher"),A=n(x),P=t("./alfrid/tools/EaseNumber"),L=n(P),k=t("./alfrid/tools/OrbitalControl"),O=n(k),S=t("./alfrid/tools/QuatRotation"),I=n(S),D=t("./alfrid/cameras/Camera"),F=n(D),C=t("./alfrid/cameras/CameraOrtho"),N=n(C),j=t("./alfrid/cameras/CameraPerspective"),U=n(j),G=t("./alfrid/loaders/BinaryLoader"),B=n(G),X=t("./alfrid/loaders/ObjLoader"),V=n(X),Y=t("./alfrid/loaders/HDRLoader"),q=n(Y),H=t("./alfrid/helpers/BatchCopy"),z=n(H),W=t("./alfrid/helpers/BatchAxis"),Z=n(W),Q=t("./alfrid/helpers/BatchDotsPlane"),K=n(Q),J=t("./alfrid/helpers/Scene"),$=n(J),tt=t("./alfrid/helpers/View"),et=n(tt),rt=t("./alfrid/tools/ShaderLibs"),nt=n(rt),it="1.0.0",at=function(){function t(){i(this,t),this.glm=o["default"],this.GL=h["default"],this.GLTool=h["default"],this.GLShader=l["default"],this.GLTexture=d["default"],this.GLCubeTexture=v["default"],this.Mesh=_["default"],this.Geom=E["default"],this.Batch=M["default"],this.FrameBuffer=b["default"],this.Scheduler=w["default"],this.EventDispatcher=A["default"],this.EaseNumber=L["default"],this.Camera=F["default"],this.CameraOrtho=N["default"],this.CameraPerspective=U["default"],this.OrbitalControl=O["default"],this.QuatRotation=I["default"],this.BinaryLoader=B["default"],this.ObjLoader=V["default"],this.HDRLoader=q["default"],this.BatchCopy=z["default"],this.BatchAxis=Z["default"],this.BatchDotsPlane=K["default"],this.Scene=$["default"],this.View=et["default"],this.ShaderLibs=nt["default"];for(var e in o["default"]){o["default"][e]&&(window[e]=o["default"][e]);}}return a(t,[{key:"log",value:function value(){navigator.userAgent.indexOf("Chrome")>-1?console.log("%clib alfrid : VERSION "+it,"background: #193441; color: #FCFFF5"):console.log("lib alfrid : VERSION ",it),console.log("%cClasses : ","color: #193441");for(var t in this){this[t]&&console.log("%c - "+t,"color: #3E606F");}}}]),t;}(),ut=new at();e.exports=ut;},{"./alfrid/Batch":12,"./alfrid/FrameBuffer":13,"./alfrid/GLCubeTexture":14,"./alfrid/GLShader":15,"./alfrid/GLTexture":16,"./alfrid/GLTool":17,"./alfrid/Geom":18,"./alfrid/Mesh":19,"./alfrid/cameras/Camera":20,"./alfrid/cameras/CameraOrtho":21,"./alfrid/cameras/CameraPerspective":22,"./alfrid/helpers/BatchAxis":23,"./alfrid/helpers/BatchCopy":24,"./alfrid/helpers/BatchDotsPlane":25,"./alfrid/helpers/Scene":26,"./alfrid/helpers/View":27,"./alfrid/loaders/BinaryLoader":28,"./alfrid/loaders/HDRLoader":29,"./alfrid/loaders/ObjLoader":30,"./alfrid/tools/EaseNumber":31,"./alfrid/tools/EventDispatcher":32,"./alfrid/tools/OrbitalControl":34,"./alfrid/tools/QuatRotation":35,"./alfrid/tools/Scheduler":36,"./alfrid/tools/ShaderLibs":37,"gl-matrix":1}],12:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var u=t("./GLTool"),o=n(u),s=function(){function t(e,r){i(this,t),this._mesh=e,this._shader=r;}return a(t,[{key:"draw",value:function value(){this._shader.bind(),o["default"].draw(this.mesh);}},{key:"mesh",get:function get(){return this._mesh;}},{key:"shader",get:function get(){return this._shader;}}]),t;}();r["default"]=s;},{"./GLTool":17}],13:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var u=t("./GLTool"),o=n(u),s=t("./GLTexture"),h=n(s),f=function f(t){return 0!==t&&!(t&t-1);},l=void 0,c=void 0,d=function(){function t(e,r){var n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];i(this,t),l=o["default"].gl,c=o["default"].checkExtension("WEBGL_depth_texture"),this.width=e,this.height=r,console.log("Framebuffer size : ",this.width,e),this.magFilter=n.magFilter||l.LINEAR,this.minFilter=n.minFilter||l.LINEAR,this.wrapS=n.wrapS||l.CLAMP_TO_EDGE,this.wrapT=n.wrapT||l.CLAMP_TO_EDGE,this.useDepth=n.useDepth||!0,this.useStencil=n.useStencil||!1,f(this.width)&&f(this.height)||(this.wrapS=this.wrapT=l.CLAMP_TO_EDGE,this.minFilter===l.LINEAR_MIPMAP_NEAREST&&(this.minFilter=l.LINEAR)),this._init();}return a(t,[{key:"_init",value:function value(){this.texture=l.createTexture(),this.glTexture=new h["default"](this.texture,!0),this.depthTexture=l.createTexture(),this.glDepthTexture=new h["default"](this.depthTexture,!0),this.frameBuffer=l.createFramebuffer(),l.bindFramebuffer(l.FRAMEBUFFER,this.frameBuffer),l.bindTexture(l.TEXTURE_2D,this.texture),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MAG_FILTER,this.magFilter),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,this.minFilter),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,this.wrapS),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,this.wrapT),l.texImage2D(l.TEXTURE_2D,0,l.RGBA,this.width,this.height,0,l.RGBA,l.FLOAT,null),c&&(l.bindTexture(l.TEXTURE_2D,this.depthTexture),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MAG_FILTER,this.magFilter),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,this.minFilter),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,this.wrapS),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,this.wrapT),l.texImage2D(l.TEXTURE_2D,0,l.DEPTH_COMPONENT,this.width,this.height,0,l.DEPTH_COMPONENT,l.UNSIGNED_SHORT,null)),l.framebufferTexture2D(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,this.texture,0),l.framebufferTexture2D(l.FRAMEBUFFER,l.DEPTH_ATTACHMENT,l.TEXTURE_2D,this.depthTexture,0),this.minFilter===l.LINEAR_MIPMAP_NEAREST&&(l.bindTexture(l.TEXTURE_2D,this.texture),l.generateMipmap(l.TEXTURE_2D)),l.bindTexture(l.TEXTURE_2D,null),l.bindRenderbuffer(l.RENDERBUFFER,null),l.bindFramebuffer(l.FRAMEBUFFER,null);}},{key:"bind",value:function value(){o["default"].viewport(0,0,this.width,this.height),l.bindFramebuffer(l.FRAMEBUFFER,this.frameBuffer);}},{key:"unbind",value:function value(){l.bindFramebuffer(l.FRAMEBUFFER,null);}},{key:"getTexture",value:function value(){return this.glTexture;}},{key:"getDepthTexture",value:function value(){return this.glDepthTexture;}},{key:"minFilter",value:function value(t){return t!==l.LINEAR&&t!==l.NEAREST&&t!==l.LINEAR_MIPMAP_NEAREST?this:(this.minFilter=t,this);}},{key:"magFilter",value:function value(t){return t!==l.LINEAR&&t!==l.NEAREST&&t!==l.LINEAR_MIPMAP_NEAREST?this:(this.magFilter=t,this);}},{key:"wrapS",value:function value(t){return t!==l.CLAMP_TO_EDGE&&t!==l.REPEAT&&t!==l.MIRRORED_REPEAT?this:(this.wrapS=t,this);}},{key:"wrapT",value:function value(t){return t!==l.CLAMP_TO_EDGE&&t!==l.REPEAT&&t!==l.MIRRORED_REPEAT?this:(this.wrapT=t,this);}}]),t;}();r["default"]=d;},{"./GLTexture":16,"./GLTool":17}],14:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var u=t("./GLTool"),o=n(u),s=void 0,h=function(){function t(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];i(this,t),s=o["default"].gl,this.texture=s.createTexture(),this.magFilter=r.magFilter||s.LINEAR,this.minFilter=r.minFilter||s.LINEAR_MIPMAP_NEAREST,this.wrapS=r.wrapS||s.MIRRORED_REPEAT,this.wrapT=r.wrapT||s.MIRRORED_REPEAT,s.bindTexture(s.TEXTURE_CUBE_MAP,this.texture);for(var n=[s.TEXTURE_CUBE_MAP_POSITIVE_X,s.TEXTURE_CUBE_MAP_NEGATIVE_X,s.TEXTURE_CUBE_MAP_POSITIVE_Y,s.TEXTURE_CUBE_MAP_NEGATIVE_Y,s.TEXTURE_CUBE_MAP_POSITIVE_Z,s.TEXTURE_CUBE_MAP_NEGATIVE_Z],a=0;6>a;a++){s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),e[a].exposure?s.texImage2D(n[a],0,s.RGBA,e[a].shape[0],e[a].shape[1],0,s.RGBA,s.FLOAT,e[a].data):s.texImage2D(n[a],0,s.RGBA,s.RGBA,s.UNSIGNED_BYTE,e[a]),s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_WRAP_S,this.wrapS),s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_WRAP_T,this.wrapT),s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAG_FILTER,this.magFilter),s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MIN_FILTER,this.minFilter);}s.generateMipmap(s.TEXTURE_CUBE_MAP),s.bindTexture(s.TEXTURE_CUBE_MAP,null);}return a(t,[{key:"bind",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?0:arguments[0];o["default"].shader&&(s.activeTexture(s.TEXTURE0+t),s.bindTexture(s.TEXTURE_CUBE_MAP,this.texture),s.uniform1i(o["default"].shader.uniformTextures[t],t),this._bindIndex=t);}},{key:"unbind",value:function value(){s.bindTexture(s.TEXTURE_CUBE_MAP,null);}}]),t;}();r["default"]=h;},{"./GLTool":17}],15:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var u=t("./GLTool"),o=n(u),s=function s(t){for(var e=t.split("\n"),r=0;r<e.length;r++){e[r]=r+1+": "+e[r];}return e.join("\n");},h=void 0,f="#define GLSLIFY 1\n// basic.vert\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n    vTextureCoord = aTextureCoord;\n}",l="#define GLSLIFY 1\n// basic.frag\n\n#define SHADER_NAME BASIC_FRAGMENT\n\nprecision highp float;\nvarying vec2 vTextureCoord;\nuniform float time;\n// uniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = vec4(vTextureCoord, sin(time) * .5 + .5, 1.0);\n}",c=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?f:arguments[0],r=arguments.length<=1||void 0===arguments[1]?l:arguments[1];i(this,t),h=o["default"].gl,this.parameters=[],this.uniformValues={},this.uniformTextures=[],e||(e=f),r||(r=f);var n=this._createShaderProgram(e,!0),a=this._createShaderProgram(r,!1);this._attachShaderProgram(n,a);}return a(t,[{key:"bind",value:function value(){h.useProgram(this.shaderProgram),o["default"].useShader(this),this.uniformTextures=[];}},{key:"uniform",value:function value(t,e,r){for(var n=!1,i=void 0,a=0;a<this.parameters.length;a++){if(i=this.parameters[a],i.name===t){i.value=r,n=!0;break;}}n?this.shaderProgram[t]=i.uniformLoc:(this.shaderProgram[t]=h.getUniformLocation(this.shaderProgram,t),this.parameters.push({name:t,type:e,value:r,uniformLoc:this.shaderProgram[t]})),-1===e.indexOf("Matrix")?h[e](this.shaderProgram[t],r):(h[e](this.shaderProgram[t],!1,r),this.uniformValues[t]=r);}},{key:"_createShaderProgram",value:function value(t,e){var r=e?o["default"].VERTEX_SHADER:o["default"].FRAGMENT_SHADER,n=h.createShader(r);return h.shaderSource(n,t),h.compileShader(n),h.getShaderParameter(n,h.COMPILE_STATUS)?n:(console.warn("Error in Shader : ",h.getShaderInfoLog(n)),console.log(s(t)),null);}},{key:"_attachShaderProgram",value:function value(t,e){this.shaderProgram=h.createProgram(),h.attachShader(this.shaderProgram,t),h.attachShader(this.shaderProgram,e),h.linkProgram(this.shaderProgram);}}]),t;}();r["default"]=c;},{"./GLTool":17}],16:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var u=t("./GLTool"),o=n(u),s=function s(t){return 0!==t&&!(t&t-1);},h=function h(t){var e=t.width||t.videoWidth,r=t.height||t.videoHeight;return e&&r?s(e)&&s(r):!1;},f=void 0,l=function(){function t(e){var r=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];if(i(this,t),f=o["default"].gl,r)this.texture=e;else {this._mSource=e,this.texture=f.createTexture(),this._isVideo="VIDEO"===e.tagName,this.magFilter=n.magFilter||f.LINEAR,this.minFilter=n.minFilter||f.LINEAR_MIPMAP_NEAREST,this.wrapS=n.wrapS||f.MIRRORED_REPEAT,this.wrapT=n.wrapT||f.MIRRORED_REPEAT;var a=e.width||e.videoWidth;a?h(e)||(this.wrapS=this.wrapT=f.CLAMP_TO_EDGE,this.minFilter===f.LINEAR_MIPMAP_NEAREST&&(this.minFilter=f.LINEAR)):(this.wrapS=this.wrapT=f.CLAMP_TO_EDGE,this.minFilter===f.LINEAR_MIPMAP_NEAREST&&(this.minFilter=f.LINEAR)),f.bindTexture(f.TEXTURE_2D,this.texture),f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL,!0),e.exposure?f.texImage2D(f.TEXTURE_2D,0,f.RGBA,e.shape[0],e.shape[1],0,f.RGBA,f.FLOAT,e.data):f.texImage2D(f.TEXTURE_2D,0,f.RGBA,f.RGBA,f.UNSIGNED_BYTE,e),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MAG_FILTER,this.magFilter),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MIN_FILTER,this.minFilter),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_S,this.wrapS),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_WRAP_T,this.wrapT),this.minFilter===f.LINEAR_MIPMAP_NEAREST&&f.generateMipmap(f.TEXTURE_2D),f.bindTexture(f.TEXTURE_2D,null);}}return a(t,[{key:"minFilter",value:function value(t){return t!==f.LINEAR&&t!==f.NEAREST&&t!==f.LINEAR_MIPMAP_NEAREST?this:(this.minFilter=t,this);}},{key:"magFilter",value:function value(t){return t!==f.LINEAR&&t!==f.NEAREST&&t!==f.LINEAR_MIPMAP_NEAREST?this:(this.magFilter=t,this);}},{key:"wrapS",value:function value(t){return t!==f.CLAMP_TO_EDGE&&t!==f.REPEAT&&t!==f.MIRRORED_REPEAT?this:(this.wrapS=t,this);}},{key:"wrapT",value:function value(t){return t!==f.CLAMP_TO_EDGE&&t!==f.REPEAT&&t!==f.MIRRORED_REPEAT?this:(this.wrapT=t,this);}},{key:"updateTexture",value:function value(t){t&&(this._mSource=t),f.bindTexture(f.TEXTURE_2D,this.texture),f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL,!0),f.texImage2D(f.TEXTURE_2D,0,f.RGBA,f.RGBA,f.UNSIGNED_BYTE,this._mSource),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MAG_FILTER,this.magFilter),f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MIN_FILTER,this.minFilter),this.minFilter===f.LINEAR_MIPMAP_NEAREST&&f.generateMipmap(f.TEXTURE_2D),f.bindTexture(f.TEXTURE_2D,null);}},{key:"bind",value:function value(t){void 0===t&&(t=0),o["default"].shader&&(f.activeTexture(f.TEXTURE0+t),f.bindTexture(f.TEXTURE_2D,this.texture),f.uniform1i(o["default"].shader.uniformTextures[t],t),this._bindIndex=t);}}]),t;}();r["default"]=l;},{"./GLTool":17}],17:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var u=t("gl-matrix"),o=n(u),s=function(){function t(){i(this,t),this.canvas,this._viewport=[0,0,0,0],this._enabledVertexAttribute=[],this.identityMatrix=o["default"].mat4.create(),this._normalMatrix=o["default"].mat3.create(),this._inverseModelViewMatrix=o["default"].mat3.create(),this._modelMatrix=o["default"].mat4.create(),this._matrix=o["default"].mat4.create(),o["default"].mat4.identity(this.identityMatrix,this.identityMatrix);}return a(t,[{key:"init",value:function value(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];void 0!==this.canvas&&this.destroy(),this.canvas=t,this.setSize(window.innerWidth,window.innerHeight),this.gl=this.canvas.getContext("webgl",e)||this.canvas.getContext("experimental-webgl",e);var r=["EXT_shader_texture_lod","EXT_shader_texture_lod","EXT_sRGB","EXT_frag_depth","OES_texture_float","OES_texture_half_float","OES_texture_float_linear","OES_texture_half_float_linear","OES_standard_derivatives","WEBGL_depth_texture"];this.extensions={};for(var n=0;n<r.length;n++){this.extensions[r[n]]=this.gl.getExtension(r[n]);}var i=this.gl;this.VERTEX_SHADER=i.VERTEX_SHADER,this.FRAGMENT_SHADER=i.FRAGMENT_SHADER,this.COMPILE_STATUS=i.COMPILE_STATUS,this.DEPTH_TEST=i.DEPTH_TEST,this.CULL_FACE=i.CULL_FACE,this.BLEND=i.BLEND,this.POINTS=i.POINTS,this.LINES=i.LINES,this.TRIANGLES=i.TRIANGLES,this.LINEAR=i.LINEAR,this.NEAREST=i.NEAREST,this.LINEAR_MIPMAP_NEAREST=i.LINEAR_MIPMAP_NEAREST,this.MIRRORED_REPEAT=i.MIRRORED_REPEAT,this.CLAMP_TO_EDGE=i.CLAMP_TO_EDGE,this.enable(this.DEPTH_TEST),this.enable(this.CULL_FACE),this.enable(this.BLEND);}},{key:"setViewport",value:function value(t,e,r,n){var i=!1;t!==this._viewport[0]&&(i=!0),e!==this._viewport[1]&&(i=!0),r!==this._viewport[2]&&(i=!0),n!==this._viewport[3]&&(i=!0),i&&(this.gl.viewport(t,e,r,n),this._viewport=[t,e,r,n]);}},{key:"clear",value:function value(t,e,r,n){this.gl.clearColor(t,e,r,n),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);}},{key:"setMatrices",value:function value(t){this.camera=t,this.rotate(this.identityMatrix);}},{key:"useShader",value:function value(t){this.shader=t,this.shaderProgram=this.shader.shaderProgram;}},{key:"rotate",value:function value(t){o["default"].mat4.copy(this._modelMatrix,t),o["default"].mat4.multiply(this._matrix,this.camera.matrix,this._modelMatrix),o["default"].mat3.fromMat4(this._normalMatrix,this._matrix),o["default"].mat3.invert(this._normalMatrix,this._normalMatrix),o["default"].mat3.transpose(this._normalMatrix,this._normalMatrix),o["default"].mat3.fromMat4(this._inverseModelViewMatrix,this._matrix),o["default"].mat3.invert(this._inverseModelViewMatrix,this._inverseModelViewMatrix);}},{key:"draw",value:function value(t){function e(t,e,r){return void 0===e.cacheAttribLoc&&(e.cacheAttribLoc={}),void 0===e.cacheAttribLoc[r]&&(e.cacheAttribLoc[r]=t.getAttribLocation(e,r)),e.cacheAttribLoc[r];}for(var r=0;r<t.attributes.length;r++){var n=t.attributes[r];this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n.buffer);var i=e(this.gl,this.shaderProgram,n.name);this.gl.vertexAttribPointer(i,n.itemSize,this.gl.FLOAT,!1,0,0),-1===this._enabledVertexAttribute.indexOf(i)&&(this.gl.enableVertexAttribArray(i),this._enabledVertexAttribute.push(i));}this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,t.iBuffer),this.shader.uniform("uProjectionMatrix","uniformMatrix4fv",this.camera.projection),this.shader.uniform("uModelMatrix","uniformMatrix4fv",this._modelMatrix),this.shader.uniform("uViewMatrix","uniformMatrix4fv",this.camera.matrix),this.shader.uniform("uNormalMatrix","uniformMatrix3fv",this._normalMatrix),this.shader.uniform("uModelViewMatrixInverse","uniformMatrix3fv",this._inverseModelViewMatrix),t.drawType===this.gl.POINTS?this.gl.drawArrays(t.drawType,0,t.vertexSize):this.gl.drawElements(t.drawType,t.iBuffer.numItems,this.gl.UNSIGNED_SHORT,0);}},{key:"setSize",value:function value(t,e){this._width=t,this._height=e,this.canvas.width=this._width,this.canvas.height=this._height,this._aspectRatio=this._width/this._height,this.gl&&this.viewport(0,0,this._width,this._height);}},{key:"showExtensions",value:function value(){console.log("Extensions : ",this.extensions);for(var t in this.extensions){this.extensions[t]&&console.log(t,":",this.extensions[t]);}}},{key:"checkExtension",value:function value(t){return !!this.extensions[t];}},{key:"getExtension",value:function value(t){return this.extensions[t];}},{key:"enableAlphaBlending",value:function value(){this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA);}},{key:"enableAdditiveBlending",value:function value(){this.gl.blendFunc(this.gl.ONE,this.gl.ONE);}},{key:"enable",value:function value(t){this.gl.enable(t);}},{key:"disable",value:function value(t){this.gl.disable(t);}},{key:"viewport",value:function value(t,e,r,n){this.setViewport(t,e,r,n);}},{key:"destroy",value:function value(){if(this.canvas=null,this.canvas.parentNode)try{this.canvas.parentNode.removeChild(this.canvas);}catch(t){console.log("Error : ",t);}}},{key:"width",get:function get(){return this._width;}},{key:"height",get:function get(){return this._height;}},{key:"aspectRatio",get:function get(){return this._aspectRatio;}}]),t;}(),h=new s();r["default"]=h;},{"gl-matrix":1}],18:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}Object.defineProperty(r,"__esModule",{value:!0});var i=t("./Mesh"),a=n(i),u={};u.plane=function(t,e,r){var n=arguments.length<=3||void 0===arguments[3]?!1:arguments[3],i=arguments.length<=4||void 0===arguments[4]?"xy":arguments[4],u=arguments.length<=5||void 0===arguments[5]?4:arguments[5],o=[],s=[],h=[],f=[],l=t/r,c=e/r,d=1/r,p=0,v=.5*-t,m=.5*-e;console.log(l,v);for(var _=0;r>_;_++){for(var g=0;r>g;g++){var E=l*_+v,T=c*g+m;"xz"===i?(o.push([E,0,-T+c]),o.push([E+l,0,-T+c]),o.push([E+l,0,-T]),o.push([E,0,-T]),f.push([0,1,0]),f.push([0,1,0]),f.push([0,1,0]),f.push([0,1,0])):"yz"===i?(o.push([0,E,T]),o.push([0,E+l,T]),o.push([0,E+l,T+c]),o.push([0,E,T+c]),f.push([1,0,0]),f.push([1,0,0]),f.push([1,0,0]),f.push([1,0,0])):(o.push([E,T,0]),o.push([E+l,T,0]),o.push([E+l,T+c,0]),o.push([E,T+c,0]),f.push([0,0,1]),f.push([0,0,1]),f.push([0,0,1]),f.push([0,0,1]));var M=_/r,y=g/r;s.push([M,y]),s.push([M+d,y]),s.push([M+d,y+d]),s.push([M,y+d]),h.push(4*p+0),h.push(4*p+1),h.push(4*p+2),h.push(4*p+0),h.push(4*p+2),h.push(4*p+3),p++;}}var b=new a["default"](u);return b.bufferVertex(o),b.bufferTexCoords(s),b.bufferIndices(h),n&&b.bufferNormal(f),b;},u.sphere=function(t,e){for(var r=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],n=arguments.length<=3||void 0===arguments[3]?!1:arguments[3],i=arguments.length<=4||void 0===arguments[4]?4:arguments[4],u=[],o=[],s=[],h=[],f=0,l=1/e,c=function c(r,n){var i=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],a=r/e*Math.PI-.5*Math.PI,u=n/e*Math.PI*2,o=i?1:t,s=[];s[1]=Math.sin(a)*o;var h=Math.cos(a)*o;s[0]=Math.cos(u)*h,s[2]=Math.sin(u)*h;var f=1e4;return s[0]=Math.floor(s[0]*f)/f,s[1]=Math.floor(s[1]*f)/f,s[2]=Math.floor(s[2]*f)/f,s;},d=0;e>d;d++){for(var p=0;e>p;p++){u.push(c(d,p)),u.push(c(d+1,p)),u.push(c(d+1,p+1)),u.push(c(d,p+1)),r&&(h.push(c(d,p,!0)),h.push(c(d+1,p,!0)),h.push(c(d+1,p+1,!0)),h.push(c(d,p+1,!0)));var v=p/e,m=d/e;o.push([1-v,m]),o.push([1-v,m+l]),o.push([1-v-l,m+l]),o.push([1-v-l,m]),s.push(4*f+0),s.push(4*f+1),s.push(4*f+2),s.push(4*f+0),s.push(4*f+2),s.push(4*f+3),f++;}}n&&s.reverse();var _=new a["default"](i);return _.bufferVertex(u),_.bufferTexCoords(o),_.bufferIndices(s),r&&_.bufferNormal(h),_;},u.cube=function(t,e,r){var n=arguments.length<=3||void 0===arguments[3]?!1:arguments[3],i=arguments.length<=4||void 0===arguments[4]?4:arguments[4];e=e||t,r=r||t;var u=t/2,o=e/2,s=r/2,h=[],f=[],l=[],c=[],d=0;h.push([-u,o,-s]),h.push([u,o,-s]),h.push([u,-o,-s]),h.push([-u,-o,-s]),c.push([0,0,-1]),c.push([0,0,-1]),c.push([0,0,-1]),c.push([0,0,-1]),f.push([0,0]),f.push([1,0]),f.push([1,1]),f.push([0,1]),l.push(4*d+0),l.push(4*d+1),l.push(4*d+2),l.push(4*d+0),l.push(4*d+2),l.push(4*d+3),d++,h.push([u,o,-s]),h.push([u,o,s]),h.push([u,-o,s]),h.push([u,-o,-s]),c.push([1,0,0]),c.push([1,0,0]),c.push([1,0,0]),c.push([1,0,0]),f.push([0,0]),f.push([1,0]),f.push([1,1]),f.push([0,1]),l.push(4*d+0),l.push(4*d+1),l.push(4*d+2),l.push(4*d+0),l.push(4*d+2),l.push(4*d+3),d++,h.push([u,o,s]),h.push([-u,o,s]),h.push([-u,-o,s]),h.push([u,-o,s]),c.push([0,0,1]),c.push([0,0,1]),c.push([0,0,1]),c.push([0,0,1]),f.push([0,0]),f.push([1,0]),f.push([1,1]),f.push([0,1]),l.push(4*d+0),l.push(4*d+1),l.push(4*d+2),l.push(4*d+0),l.push(4*d+2),l.push(4*d+3),d++,h.push([-u,o,s]),h.push([-u,o,-s]),h.push([-u,-o,-s]),h.push([-u,-o,s]),c.push([-1,0,0]),c.push([-1,0,0]),c.push([-1,0,0]),c.push([-1,0,0]),f.push([0,0]),f.push([1,0]),f.push([1,1]),f.push([0,1]),l.push(4*d+0),l.push(4*d+1),l.push(4*d+2),l.push(4*d+0),l.push(4*d+2),l.push(4*d+3),d++,h.push([-u,o,s]),h.push([u,o,s]),h.push([u,o,-s]),h.push([-u,o,-s]),c.push([0,1,0]),c.push([0,1,0]),c.push([0,1,0]),c.push([0,1,0]),f.push([0,0]),f.push([1,0]),f.push([1,1]),f.push([0,1]),l.push(4*d+0),l.push(4*d+1),l.push(4*d+2),l.push(4*d+0),l.push(4*d+2),l.push(4*d+3),d++,h.push([-u,-o,-s]),h.push([u,-o,-s]),h.push([u,-o,s]),h.push([-u,-o,s]),c.push([0,-1,0]),c.push([0,-1,0]),c.push([0,-1,0]),c.push([0,-1,0]),f.push([0,0]),f.push([1,0]),f.push([1,1]),f.push([0,1]),l.push(4*d+0),l.push(4*d+1),l.push(4*d+2),l.push(4*d+0),l.push(4*d+2),l.push(4*d+3),d++;var p=new a["default"](i);return p.bufferVertex(h),p.bufferTexCoords(f),p.bufferIndices(l),n&&p.bufferNormal(c),p;},u.skybox=function(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],r=arguments.length<=2||void 0===arguments[2]?4:arguments[2],n=[],i=[],u=[],o=[],s=0;n.push([t,t,-t]),n.push([-t,t,-t]),n.push([-t,-t,-t]),n.push([t,-t,-t]),o.push([0,0,-1]),o.push([0,0,-1]),o.push([0,0,-1]),o.push([0,0,-1]),i.push([0,0]),i.push([1,0]),i.push([1,1]),i.push([0,1]),u.push(4*s+0),u.push(4*s+1),u.push(4*s+2),u.push(4*s+0),u.push(4*s+2),u.push(4*s+3),s++,n.push([t,-t,-t]),n.push([t,-t,t]),n.push([t,t,t]),n.push([t,t,-t]),o.push([1,0,0]),o.push([1,0,0]),o.push([1,0,0]),o.push([1,0,0]),i.push([0,0]),i.push([1,0]),i.push([1,1]),i.push([0,1]),u.push(4*s+0),u.push(4*s+1),u.push(4*s+2),u.push(4*s+0),u.push(4*s+2),u.push(4*s+3),s++,n.push([-t,t,t]),n.push([t,t,t]),n.push([t,-t,t]),n.push([-t,-t,t]),o.push([0,0,1]),o.push([0,0,1]),o.push([0,0,1]),o.push([0,0,1]),i.push([0,0]),i.push([1,0]),i.push([1,1]),i.push([0,1]),u.push(4*s+0),u.push(4*s+1),u.push(4*s+2),u.push(4*s+0),u.push(4*s+2),u.push(4*s+3),s++,n.push([-t,-t,t]),n.push([-t,-t,-t]),n.push([-t,t,-t]),n.push([-t,t,t]),o.push([-1,0,0]),o.push([-1,0,0]),o.push([-1,0,0]),o.push([-1,0,0]),i.push([0,0]),i.push([1,0]),i.push([1,1]),i.push([0,1]),u.push(4*s+0),u.push(4*s+1),u.push(4*s+2),u.push(4*s+0),u.push(4*s+2),u.push(4*s+3),s++,n.push([t,t,t]),n.push([-t,t,t]),n.push([-t,t,-t]),n.push([t,t,-t]),o.push([0,1,0]),o.push([0,1,0]),o.push([0,1,0]),o.push([0,1,0]),i.push([0,0]),i.push([1,0]),i.push([1,1]),i.push([0,1]),u.push(4*s+0),u.push(4*s+1),u.push(4*s+2),u.push(4*s+0),u.push(4*s+2),u.push(4*s+3),s++,n.push([t,-t,-t]),n.push([-t,-t,-t]),n.push([-t,-t,t]),n.push([t,-t,t]),o.push([0,-1,0]),o.push([0,-1,0]),o.push([0,-1,0]),o.push([0,-1,0]),i.push([0,0]),i.push([1,0]),i.push([1,1]),i.push([0,1]),u.push(4*s+0),u.push(4*s+1),u.push(4*s+2),u.push(4*s+0),u.push(4*s+2),u.push(4*s+3);var h=new a["default"](r);return h.bufferVertex(n),h.bufferTexCoords(i),h.bufferIndices(u),e&&h.bufferNormal(o),h;},u.bigTriangle=function(){var t=[2,1,0],e=[[-1,-1],[-1,4],[4,-1]],r=new a["default"]();return r.bufferData(e,"aPosition",2),r.bufferIndices(t),r;},r["default"]=u;},{"./Mesh":19}],19:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var u=t("./GLTool"),o=n(u),s=void 0,h=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?o["default"].gl.TRIANGLES:arguments[0];i(this,t),s=o["default"].gl,this.drawType=e,this._attributes=[],this._vertexSize=0;}return a(t,[{key:"bufferVertex",value:function value(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];this._vertexSize=t.length,this.bufferData(t,"aVertexPosition",3,e);}},{key:"bufferTexCoords",value:function value(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];this.bufferData(t,"aTextureCoord",2,e);}},{key:"bufferNormal",value:function value(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];this.bufferData(t,"aNormal",3,e);}},{key:"bufferIndices",value:function value(t){var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],r=e?s.DYNAMIC_DRAW:s.STATIC_DRAW;this._indices=t,this.iBuffer=s.createBuffer(),s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,this.iBuffer),s.bufferData(s.ELEMENT_ARRAY_BUFFER,new Uint16Array(t),r),this.iBuffer.itemSize=1,this.iBuffer.numItems=t.length;}},{key:"bufferData",value:function e(t,r,n){var i=arguments.length<=3||void 0===arguments[3]?!1:arguments[3],a=-1,u=0,o=i?s.DYNAMIC_DRAW:s.STATIC_DRAW,e=[],h=void 0,f=void 0;for(u=0;u<this._attributes.length;u++){if(this._attributes[u].name===r){this._attributes[u].data=t,a=u;break;}}for(u=0;u<t.length;u++){for(var l=0;l<t[u].length;l++){e.push(t[u][l]);}}if(-1===a)h=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,h),f=new Float32Array(e),s.bufferData(s.ARRAY_BUFFER,f,o),this._attributes.push({name:r,data:t,itemSize:n,buffer:h,dataArray:f});else {for(h=this._attributes[a].buffer,s.bindBuffer(s.ARRAY_BUFFER,h),f=this._attributes[a].dataArray,u=0;u<e.length;u++){f[u]=e[u];}s.bufferData(s.ARRAY_BUFFER,f,o);}}},{key:"attributes",get:function get(){return this._attributes;}},{key:"vertexSize",get:function get(){return this._vertexSize;}}]),t;}();r["default"]=h;},{"./GLTool":17}],20:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var u=t("gl-matrix"),o=n(u),s=function(){function t(){i(this,t),this._matrix=o["default"].mat4.create(),this._projection=o["default"].mat4.create(),this.position=o["default"].vec3.create();}return a(t,[{key:"lookAt",value:function value(t,e,r){o["default"].vec3.copy(this.position,t),o["default"].mat4.identity(this._matrix),o["default"].mat4.lookAt(this._matrix,t,e,r);}},{key:"matrix",get:function get(){return this._matrix;}},{key:"viewMatrix",get:function get(){return this._matrix;}},{key:"projection",get:function get(){return this._projection;}},{key:"projectionMatrix",get:function get(){return this._projection;}}]),t;}();r["default"]=s;},{"gl-matrix":1}],21:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=(typeof e==="undefined"?"undefined":_typeof(e))&&"function"!=typeof e?t:e;}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+(typeof e==="undefined"?"undefined":_typeof(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var s=t("./Camera"),h=n(s),f=t("gl-matrix"),l=n(f),c=function(t){function e(){i(this,e);var t=a(this,Object.getPrototypeOf(e).call(this)),r=l["default"].vec3.clone([0,0,5]),n=l["default"].vec3.create(),u=l["default"].vec3.clone([0,-1,0]);return t.lookAt(r,n,u),t.ortho(1,-1,1,-1),t;}return u(e,t),o(e,[{key:"setBoundary",value:function value(t,e,r,n){this.ortho(t,e,r,n);}},{key:"ortho",value:function value(t,e,r,n){this.left=t,this.right=e,this.top=r,this.bottom=n,l["default"].mat4.ortho(this._projection,t,e,r,n,0,1e4);}}]),e;}(h["default"]);r["default"]=c;},{"./Camera":20,"gl-matrix":1}],22:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=(typeof e==="undefined"?"undefined":_typeof(e))&&"function"!=typeof e?t:e;}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+(typeof e==="undefined"?"undefined":_typeof(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var s=t("./Camera"),h=n(s),f=t("gl-matrix"),l=n(f),c=function(t){function e(){return i(this,e),a(this,Object.getPrototypeOf(e).call(this));}return u(e,t),o(e,[{key:"setPerspective",value:function value(t,e,r,n){this._fov=t,this._near=r,this._far=n,this._aspectRatio=e,l["default"].mat4.perspective(this._projection,t,e,r,n);}},{key:"setAspectRatio",value:function value(t){this._aspectRatio=t,l["default"].mat4.perspective(this.projection,this._fov,t,this._near,this._far);}}]),e;}(h["default"]);r["default"]=c;},{"./Camera":20,"gl-matrix":1}],23:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=(typeof e==="undefined"?"undefined":_typeof(e))&&"function"!=typeof e?t:e;}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+(typeof e==="undefined"?"undefined":_typeof(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}Object.defineProperty(r,"__esModule",{value:!0});var o=t("../GLTool"),s=n(o),h=t("../Mesh"),f=n(h),l=t("../GLShader"),c=n(l),d=t("../Batch"),p=n(d),v=function(t){function e(){i(this,e);var t=[],r=[],n=[0,1,2,3,4,5],u=9999;t.push([-u,0,0]),t.push([u,0,0]),t.push([0,-u,0]),t.push([0,u,0]),t.push([0,0,-u]),t.push([0,0,u]),r.push([1,0,0]),r.push([1,0,0]),r.push([0,1,0]),r.push([0,1,0]),r.push([0,0,1]),r.push([0,0,1]);var o=new f["default"](s["default"].LINES);o.bufferVertex(t),o.bufferIndices(n),o.bufferData(r,"aColor",3);var h=new c["default"]("#define GLSLIFY 1\n// axis.vert\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec3 aColor;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec3 vColor;\n\nvoid main(void) {\n    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n    vColor = aColor;\n}","#define GLSLIFY 1\n// axis.frag\n\n#define SHADER_NAME SIMPLE_TEXTURE\n\nprecision highp float;\nvarying vec3 vColor;\n\nvoid main(void) {\n    gl_FragColor = vec4(vColor, 1.0);\n}");return a(this,Object.getPrototypeOf(e).call(this,o,h));}return u(e,t),e;}(p["default"]);r["default"]=v;},{"../Batch":12,"../GLShader":15,"../GLTool":17,"../Mesh":19}],24:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=(typeof e==="undefined"?"undefined":_typeof(e))&&"function"!=typeof e?t:e;}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+(typeof e==="undefined"?"undefined":_typeof(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}(),s=function m(t,e,r){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,e);if(void 0===n){var i=Object.getPrototypeOf(t);return null===i?void 0:m(i,e,r);}if("value" in n)return n.value;var a=n.get;if(void 0!==a)return a.call(r);};Object.defineProperty(r,"__esModule",{value:!0});var h=t("../Geom"),f=n(h),l=t("../GLShader"),c=n(l),d=t("../Batch"),p=n(d),v=function(t){function e(){i(this,e);var t=f["default"].bigTriangle(),r=new c["default"]("#define GLSLIFY 1\n// bigTriangle.vert\n\n#define SHADER_NAME BIG_TRIANGLE_VERTEX\n\nprecision highp float;\nattribute vec2 aPosition;\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = vec4(aPosition, 0.0, 1.0);\n    vTextureCoord = aPosition * .5 + .5;\n}","#define GLSLIFY 1\n// copy.frag\n\n#define SHADER_NAME COPY_FRAGMENT\n\nprecision highp float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = texture2D(texture, vTextureCoord);\n}"),n=a(this,Object.getPrototypeOf(e).call(this,t,r));return r.bind(),r.uniform("texture","uniform1i",0),n;}return u(e,t),o(e,[{key:"draw",value:function value(t){this.shader.bind(),t.bind(0),s(Object.getPrototypeOf(e.prototype),"draw",this).call(this);}}]),e;}(p["default"]);r["default"]=v;},{"../Batch":12,"../GLShader":15,"../Geom":18}],25:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=(typeof e==="undefined"?"undefined":_typeof(e))&&"function"!=typeof e?t:e;}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+(typeof e==="undefined"?"undefined":_typeof(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}(),s=function g(t,e,r){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,e);if(void 0===n){var i=Object.getPrototypeOf(t);return null===i?void 0:g(i,e,r);}if("value" in n)return n.value;var a=n.get;if(void 0!==a)return a.call(r);};Object.defineProperty(r,"__esModule",{value:!0});var h=t("../GLTool"),f=n(h),l=t("../Mesh"),c=n(l),d=t("../GLShader"),p=n(d),v=t("../Batch"),m=n(v),_=function(t){function e(){i(this,e);var t=[],r=[],n=0,u=100,o=50,s=o/u,h=void 0,l=void 0;for(h=-o/2;o>h;h+=s){for(l=-o/2;o>l;l+=s){t.push([h,l,0]),r.push(n),n++,t.push([h,0,l]),r.push(n),n++;}}var d=new c["default"](f["default"].POINTS);d.bufferVertex(t),d.bufferIndices(r);var v=new p["default"]("#define GLSLIFY 1\n// basic.vert\n\n#define SHADER_NAME DOTS_PLANE_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvoid main(void) {\n    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n}","#define GLSLIFY 1\n// simpleColor.frag\n\n#define SHADER_NAME SIMPLE_COLOR\n\nprecision highp float;\n\nuniform vec3 color;\nuniform float opacity;\n\nvoid main(void) {\n    gl_FragColor = vec4(color, opacity);\n}"),m=a(this,Object.getPrototypeOf(e).call(this,d,v));return m.color=[1,1,1],m.opacity=.5,m;}return u(e,t),o(e,[{key:"draw",value:function value(){this.shader.bind(),this.shader.uniform("color","uniform3fv",this.color),this.shader.uniform("opacity","uniform1f",this.opacity),s(Object.getPrototypeOf(e.prototype),"draw",this).call(this);}}]),e;}(m["default"]);r["default"]=_;},{"../Batch":12,"../GLShader":15,"../GLTool":17,"../Mesh":19}],26:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var u=t("../GLTool"),o=n(u),s=t("../tools/Scheduler"),h=n(s),f=t("../cameras/CameraPerspective"),l=n(f),c=t("../cameras/CameraOrtho"),d=n(c),p=t("../tools/OrbitalControl"),v=n(p),m=function(){function t(){var e=this;i(this,t),this._init(),this._initTextures(),this._initViews(),this._efIndex=h["default"].addEF(function(){return e._loop();}),window.addEventListener("resize",function(){return e.resize();});}return a(t,[{key:"render",value:function value(){}},{key:"stop",value:function value(){-1!==this._efIndex&&(this._efIndex=h["default"].removeEF(this._efIndex));}},{key:"start",value:function value(){var t=this;-1===this._efIndex&&(this._efIndex=h["default"].addEF(function(){return t._loop();}));}},{key:"resize",value:function value(){o["default"].setSize(window.innerWidth,window.innerHeight),this.camera.setAspectRatio(o["default"].aspectRatio);}},{key:"_initTextures",value:function value(){}},{key:"_initViews",value:function value(){}},{key:"_init",value:function value(){this.camera=new l["default"](),this.camera.setPerspective(45*Math.PI/180,o["default"].aspectRatio,.1,100);var t=new v["default"](this.camera,window,15);t.radius.value=10,this.cameraOrtho=new d["default"]();}},{key:"_loop",value:function value(){o["default"].viewport(0,0,o["default"].width,o["default"].height),o["default"].setMatrices(this.camera),this.render();}}]),t;}();r["default"]=m;},{"../GLTool":17,"../cameras/CameraOrtho":21,"../cameras/CameraPerspective":22,"../tools/OrbitalControl":34,"../tools/Scheduler":36}],27:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var u=t("../GLShader"),o=n(u),s=function(){function t(e,r){i(this,t),this.shader=new o["default"](e,r),this._init();}return a(t,[{key:"_init",value:function value(){}},{key:"render",value:function value(){}}]),t;}();r["default"]=s;},{"../GLShader":15}],28:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var i=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var a=function(){function t(){var e=this,r=arguments.length<=0||void 0===arguments[0]?!1:arguments[0];n(this,t),this._req=new XMLHttpRequest(),this._req.addEventListener("load",function(t){return e._onLoaded(t);}),this._req.addEventListener("progress",function(t){return e._onProgress(t);}),r&&(this._req.responseType="arraybuffer");}return i(t,[{key:"load",value:function value(t,e){console.log("Loading : ",t),this._callback=e,this._req.open("GET",t),this._req.send();}},{key:"_onLoaded",value:function value(){this._callback(this._req.response);}},{key:"_onProgress",value:function value(){}}]),t;}();r["default"]=a;},{}],29:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=(typeof e==="undefined"?"undefined":_typeof(e))&&"function"!=typeof e?t:e;}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+(typeof e==="undefined"?"undefined":_typeof(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var s=t("./BinaryLoader"),h=n(s),f=t("../tools/HDRParser"),l=n(f),c=function(t){function e(){return i(this,e),a(this,Object.getPrototypeOf(e).call(this,!0));}return u(e,t),o(e,[{key:"parse",value:function value(t){return (0,l["default"])(t);}},{key:"_onLoaded",value:function value(){var t=this.parse(this._req.response);this._callback&&this._callback(t);}}]),e;}(h["default"]);c.parse=function(t){return (0,l["default"])(t);},r["default"]=c;},{"../tools/HDRParser":33,"./BinaryLoader":28}],30:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e||"object"!=(typeof e==="undefined"?"undefined":_typeof(e))&&"function"!=typeof e?t:e;}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+(typeof e==="undefined"?"undefined":_typeof(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e);}var o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}(),s=function p(t,e,r){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,e);if(void 0===n){var i=Object.getPrototypeOf(t);return null===i?void 0:p(i,e,r);}if("value" in n)return n.value;var a=n.get;if(void 0!==a)return a.call(r);};Object.defineProperty(r,"__esModule",{value:!0});var h=t("./BinaryLoader"),f=n(h),l=t("../Mesh"),c=n(l),d=function(t){function e(){return i(this,e),a(this,Object.getPrototypeOf(e).call(this));}return u(e,t),o(e,[{key:"load",value:function value(t,r){var n=arguments.length<=2||void 0===arguments[2]?!0:arguments[2],i=arguments.length<=3||void 0===arguments[3]?4:arguments[3];this._ignoreNormals=n,this._drawType=i,s(Object.getPrototypeOf(e.prototype),"load",this).call(this,t,r);}},{key:"_onLoaded",value:function value(){this._parseObj(this._req.response);}},{key:"_parseObj",value:function value(t){function e(t){var e=parseInt(t);return 3*(e>=0?e-1:e+c.length/3);}function r(t){var e=parseInt(t);return 3*(e>=0?e-1:e+d.length/3);}function n(t){var e=parseInt(t);return 2*(e>=0?e-1:e+p.length/2);}function i(t,e,r){h.push([c[t],c[t+1],c[t+2]]),h.push([c[e],c[e+1],c[e+2]]),h.push([c[r],c[r+1],c[r+2]]),v.push(3*m+0),v.push(3*m+1),v.push(3*m+2),m++;}function a(t,e,r){f.push([p[t],p[t+1]]),f.push([p[e],p[e+1]]),f.push([p[r],p[r+1]]);}function u(t,e,r){l.push([d[t],d[t+1],d[t+2]]),l.push([d[e],d[e+1],d[e+2]]),l.push([d[r],d[r+1],d[r+2]]);}function o(t,o,s,h,f,l,c,d,p,v,m,_){var g=e(t),E=e(o),T=e(s),M=void 0;void 0===h?i(g,E,T):(M=e(h),i(g,E,M),i(E,T,M)),void 0!==f&&(g=n(f),E=n(l),T=n(c),void 0===h?a(g,E,T):(M=n(d),a(g,E,M),a(E,T,M))),void 0!==p&&(g=r(p),E=r(v),T=r(m),void 0===h?u(g,E,T):(M=r(_),u(g,E,M),u(E,T,M)));}for(var s=t.split("\n"),h=[],f=[],l=[],c=[],d=[],p=[],v=[],m=0,_=void 0,g=/v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,E=/vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,T=/vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,M=/f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/,y=/f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/,b=/f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/,R=/f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/,w=0;w<s.length;w++){var x=s[w];x=x.trim(),0!==x.length&&"#"!==x.charAt(0)&&(null!==(_=g.exec(x))?c.push(parseFloat(_[1]),parseFloat(_[2]),parseFloat(_[3])):null!==(_=E.exec(x))?d.push(parseFloat(_[1]),parseFloat(_[2]),parseFloat(_[3])):null!==(_=T.exec(x))?p.push(parseFloat(_[1]),parseFloat(_[2])):null!==(_=M.exec(x))?o(_[1],_[2],_[3],_[4]):null!==(_=y.exec(x))?o(_[2],_[5],_[8],_[11],_[3],_[6],_[9],_[12]):null!==(_=b.exec(x))?o(_[2],_[6],_[10],_[14],_[3],_[7],_[11],_[15],_[4],_[8],_[12],_[16]):null!==(_=R.exec(x))&&o(_[2],_[5],_[8],_[11],void 0,void 0,void 0,void 0,_[3],_[6],_[9],_[12]));}this._generateMeshes({positions:h,coords:f,normals:l,indices:v});}},{key:"_generateMeshes",value:function value(t){var e=new c["default"](this._drawType);e.bufferVertex(t.positions),e.bufferTexCoords(t.coords),e.bufferIndices(t.indices),this._ignoreNormals||e.bufferNormal(t.normals),this._callback&&this._callback(e,t);}}]),e;}(f["default"]);r["default"]=d;},{"../Mesh":19,"./BinaryLoader":28}],31:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var u=t("./Scheduler"),o=n(u),s=function(){function t(e){var r=this,n=arguments.length<=1||void 0===arguments[1]?.1:arguments[1];i(this,t),this.easing=n,this._value=e,this._targetValue=e,o["default"].addEF(function(){return r._update();});}return a(t,[{key:"_update",value:function value(){this._checkLimit(),this._value+=(this._targetValue-this._value)*this.easing;}},{key:"setTo",value:function value(t){this._targetValue=this._value=t;}},{key:"add",value:function value(t){this._targetValue+=t;}},{key:"limit",value:function value(t,e){return t>e?void this.limit(e,t):(this._min=t,this._max=e,void this._checkLimit());}},{key:"_checkLimit",value:function value(){void 0!==this._min&&this._targetValue<this._min&&(this._targetValue=this._min),void 0!==this._max&&this._targetValue>this._max&&(this._targetValue=this._max);}},{key:"value",set:function set(t){this._targetValue=t;},get:function get(){return this._value;}},{key:"targetValue",get:function get(){return this._targetValue;}}]),t;}();r["default"]=s;},{"./Scheduler":36}],32:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var i=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var a=!0;try{var u=document.createEvent("CustomEvent");u=null;}catch(o){a=!1;}var s=function(){function t(){n(this,t);}return i(t,[{key:"addEventListener",value:function value(t,e){return null===this._eventListeners&&(this._eventListeners={}),this._eventListeners[t]||(this._eventListeners[t]=[]),this._eventListeners[t].push(e),this;}},{key:"removeEventListener",value:function value(t,e){null===this._eventListeners&&(this._eventListeners={});var r=this._eventListeners[t];if("undefined"==typeof r)return this;for(var n=r.length,i=0;n>i;i++){r[i]===e&&(r.splice(i,1),i--,n--);}return this;}},{key:"dispatchEvent",value:function value(t){null===this._eventListeners&&(this._eventListeners={});var e=t.type;try{null===t.target&&(t.target=this),t.currentTarget=this;}catch(r){var n={type:e,detail:t.detail,dispatcher:this};return this.dispatchEvent(n);}var i=this._eventListeners[e];if(null!==i&&void 0!==i)for(var a=this._copyArray(i),u=a.length,o=0;u>o;o++){var s=a[o];s.call(this,t);}return this;}},{key:"dispatchCustomEvent",value:function value(t,e){var r=void 0;return a?(r=document.createEvent("CustomEvent"),r.dispatcher=this,r.initCustomEvent(t,!1,!1,e)):r={type:t,detail:e,dispatcher:this},this.dispatchEvent(r);}},{key:"_destroy",value:function value(){if(null!==this._eventListeners){for(var t in this._eventListeners){if(this._eventListeners.hasOwnProperty(t)){for(var e=this._eventListeners[t],r=e.length,n=0;r>n;n++){e[n]=null;}delete this._eventListeners[t];}}this._eventListeners=null;}}},{key:"_copyArray",value:function value(t){for(var e=new Array(t.length),r=e.length,n=0;r>n;n++){e[n]=t[n];}return e;}}]),t;}();r["default"]=s;},{}],33:[function(t,e,r){"use strict";function n(t,e,r,n,i,a){function u(e){var r=0;do {e[r++]=t[n];}while(++n<v&&r<e.length);return r;}function o(e,r,i){var a=0;do {e[r+a++]=t[n];}while(++n<v&&i>a);return a;}function s(t,e,r,n){var i=4*n,a=o(e,r,i);if(i>a)throw new Error("Error reading raw pixels: got "+a+" bytes, expected "+i);}for(var h=new Array(4),f=null,l=void 0,c=void 0,d=void 0,p=new Array(2),v=t.length;a>0;){if(u(h)<h.length)throw new Error("Error reading bytes: expected "+h.length);if(2!==h[0]||2!==h[1]||0!==(128&h[2]))return e[r++]=h[0],e[r++]=h[1],e[r++]=h[2],e[r++]=h[3],void s(t,e,r,i*a-1);if(((255&h[2])<<8|255&h[3])!==i)throw new Error("Wrong scanline width "+((255&h[2])<<8|255&h[3])+", expected "+i);null===f&&(f=new Array(4*i)),l=0;for(var m=0;4>m;m++){for(c=(m+1)*i;c>l;){if(u(p)<p.length)throw new Error("Error reading 2-byte buffer");if((255&p[0])>128){if(d=(255&p[0])-128,0===d||d>c-l)throw new Error("Bad scanline data");for(;d-->0;){f[l++]=p[1];}}else {if(d=255&p[0],0===d||d>c-l)throw new Error("Bad scanline data");if(f[l++]=p[1],--d>0){if(o(f,l,d)<d)throw new Error("Error reading non-run data");l+=d;}}}}for(var m=0;i>m;m++){e[r+0]=f[m],e[r+1]=f[m+i],e[r+2]=f[m+2*i],e[r+3]=f[m+3*i],r+=4;}a--;}}function i(t){function e(){var e="";do {var n=t[r];if(n===f){++r;break;}e+=String.fromCharCode(n);}while(++r<i);return e;}t instanceof ArrayBuffer&&(t=new Uint8Array(t));for(var r=0,i=t.length,f=10,l=0,c=0,d=1,p=1,v=!1,m=0;20>m;m++){var _=e(),g=void 0;if(g=_.match(a));else if(g=_.match(s))v=!0;else if(g=_.match(o))d=Number(g[1]);else if(g=_.match(u));else if(g=_.match(h)){c=Number(g[1]),l=Number(g[2]);break;}}if(!v)throw new Error("File is not run length encoded!");var E=new Uint8Array(l*c*4),T=l,M=c;n(t,E,0,r,T,M);for(var y=new Float32Array(l*c*4),b=0;b<E.length;b+=4){var R=E[b+0]/255,w=E[b+1]/255,x=E[b+2]/255,A=E[b+3],P=Math.pow(2,A-128);R*=P,w*=P,x*=P;var L=b;y[L+0]=R,y[L+1]=w,y[L+2]=x,y[L+3]=1;}return {shape:[l,c],exposure:d,gamma:p,data:y};}Object.defineProperty(r,"__esModule",{value:!0});var a="#\\?RADIANCE",u="#.*",o="EXPOSURE=\\s*([0-9]*[.][0-9]*)",s="FORMAT=32-bit_rle_rgbe",h="-Y ([0-9]+) \\+X ([0-9]+)";r["default"]=i;},{}],34:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var u=t("./EaseNumber"),o=n(u),s=t("./Scheduler"),h=n(s),f=t("gl-matrix"),l=n(f),c=function c(t,e){var r=e||{};return t.touches?(r.x=t.touches[0].pageX,r.y=t.touches[0].pageY):(r.x=t.clientX,r.y=t.clientY),r;},d=function(){function t(e){var r=this,n=arguments.length<=1||void 0===arguments[1]?window:arguments[1],a=arguments.length<=2||void 0===arguments[2]?500:arguments[2];i(this,t),this._target=e,this._listenerTarget=n,this._mouse={},this._preMouse={},this.center=l["default"].vec3.create(),this._up=l["default"].vec3.fromValues(0,1,0),this.radius=new o["default"](a),this.position=l["default"].vec3.fromValues(0,0,this.radius.value),this.positionOffset=l["default"].vec3.create(),this._rx=new o["default"](0),this._rx.limit(-Math.PI/2,Math.PI/2),this._ry=new o["default"](0),this._preRX=0,this._preRY=0,this._isLockZoom=!1,this._isLockRotation=!1,this._isInvert=!1,this._listenerTarget.addEventListener("mousewheel",function(t){return r._onWheel(t);}),this._listenerTarget.addEventListener("DOMMouseScroll",function(t){return r._onWheel(t);}),this._listenerTarget.addEventListener("mousedown",function(t){return r._onDown(t);}),this._listenerTarget.addEventListener("touchstart",function(t){return r._onDown(t);}),this._listenerTarget.addEventListener("mousemove",function(t){return r._onMove(t);}),this._listenerTarget.addEventListener("touchmove",function(t){return r._onMove(t);}),window.addEventListener("touchend",function(){return r._onUp();}),window.addEventListener("mouseup",function(){return r._onUp();}),h["default"].addEF(function(){return r._loop();});}return a(t,[{key:"lock",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this._isLockZoom=t,this._isLockRotation=t;}},{key:"lockZoom",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this._isLockZoom=t;}},{key:"lockRotation",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this._isLockRotation=t;}},{key:"inverseControl",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this._isInvert=t;}},{key:"_onDown",value:function value(t){this._isLockRotation||(this._isMouseDown=!0,c(t,this._mouse),c(t,this._preMouse),this._preRX=this._rx.targetValue,this._preRY=this._ry.targetValue);}},{key:"_onMove",value:function value(t){if(!this._isLockRotation&&(c(t,this._mouse),t.touches&&t.preventDefault(),this._isMouseDown)){var e=-(this._mouse.x-this._preMouse.x);this._isInvert&&(e*=-1),this._ry.value=this._preRY-.01*e;var r=-(this._mouse.y-this._preMouse.y);this._isInvert&&(r*=-1),this._rx.value=this._preRX-.01*r;}}},{key:"_onUp",value:function value(){this._isLockRotation||(this._isMouseDown=!1);}},{key:"_onWheel",value:function value(t){if(!this._isLockZoom){var e=t.wheelDelta,r=t.detail,n=0;n=r?e?e/r/40*r>0?1:-1:-r/3:e/120,this.radius.add(2*-n);}}},{key:"_loop",value:function value(){this._updatePosition(),this._target&&this._updateCamera();}},{key:"_updatePosition",value:function value(){this.position[1]=Math.sin(this._rx.value)*this.radius.value;var t=Math.cos(this._rx.value)*this.radius.value;this.position[0]=Math.cos(this._ry.value+.5*Math.PI)*t,this.position[2]=Math.sin(this._ry.value+.5*Math.PI)*t,l["default"].vec3.add(this.position,this.position,this.positionOffset);}},{key:"_updateCamera",value:function value(){this._target.lookAt(this.position,this.center,this._up);}}]),t;}();r["default"]=d;},{"./EaseNumber":31,"./Scheduler":36,"gl-matrix":1}],35:[function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t};}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0});var u=t("gl-matrix"),o=n(u),s=t("./EaseNumber"),h=n(s),f=t("./Scheduler"),l=n(f),c=function c(t,e){var r=e||{};return t.touches?(r.x=t.touches[0].pageX,r.y=t.touches[0].pageY):(r.x=t.clientX,r.y=t.clientY),r;},d=function(){function t(e){var r=this,n=arguments.length<=1||void 0===arguments[1]?window:arguments[1],a=arguments.length<=2||void 0===arguments[2]?.1:arguments[2];i(this,t),this._target=e,this._listenerTarget=n,this.matrix=o["default"].mat4.create(),this.m=o["default"].mat4.create(),this._vZaxis=o["default"].vec3.clone([0,0,0]),this._zAxis=o["default"].vec3.clone([0,0,1]),this.preMouse={x:0,y:0},this.mouse={x:0,y:0},this._isMouseDown=!1,this._rotation=o["default"].quat.create(),this.tempRotation=o["default"].quat.create(),this._rotateZMargin=0,this._offset=.004,this._slerp=-1,this._isLocked=!1,this._diffX=new h["default"](0,a),this._diffY=new h["default"](0,a),this._listenerTarget.addEventListener("mousedown",function(t){return r._onDown(t);}),this._listenerTarget.addEventListener("touchstart",function(t){return r._onDown(t);}),this._listenerTarget.addEventListener("mousemove",function(t){return r._onMove(t);}),this._listenerTarget.addEventListener("touchmove",function(t){return r._onMove(t);}),window.addEventListener("touchend",function(){return r._onUp();}),window.addEventListener("mouseup",function(){return r._onUp();}),l["default"].addEF(function(){return r._loop();});}return a(t,[{key:"inverseControl",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this._isInvert=t;}},{key:"lock",value:function value(){var t=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this._isLocked=t;}},{key:"setCameraPos",value:function value(t){var e=arguments.length<=1||void 0===arguments[1]?.1:arguments[1];if(this.easing=e,!(this._slerp>0)){var r=o["default"].quat.clone(this._rotation);this._updateRotation(r),this._rotation=o["default"].quat.clone(r),this._currDiffX=this.diffX=0,this._currDiffY=this.diffY=0,this._isMouseDown=!1,this._isRotateZ=0,this._targetQuat=o["default"].quat.clone(t),this._slerp=1;}}},{key:"resetQuat",value:function value(){this._rotation=o["default"].quat.clone([0,0,1,0]),this.tempRotation=o["default"].quat.clone([0,0,0,0]),this._targetQuat=void 0,this._slerp=-1;}},{key:"_onDown",value:function value(t){if(!this._isLocked){var e=c(t),r=o["default"].quat.clone(this._rotation);this._updateRotation(r),this._rotation=r,this._isMouseDown=!0,this._isRotateZ=0,this.preMouse={x:e.x,y:e.y},e.y<this._rotateZMargin||e.y>window.innerHeight-this._rotateZMargin?this._isRotateZ=1:(e.x<this._rotateZMargin||e.x>window.innerWidth-this._rotateZMargin)&&(this._isRotateZ=2),this._diffX.setTo(0),this._diffY.setTo(0);}}},{key:"_onMove",value:function value(t){this._isLocked||c(t,this.mouse);}},{key:"_onUp",value:function value(){this._isLocked||(this._isMouseDown=!1);}},{key:"_updateRotation",value:function value(t){this._isMouseDown&&!this._isLocked&&(this._diffX.value=-(this.mouse.x-this.preMouse.x),this._diffY.value=this.mouse.y-this.preMouse.y,this._isInvert&&(this._diffX.value=-this._diffX.targetValue,this._diffY.value=-this._diffY.targetValue));var e=void 0,r=void 0;if(this._isRotateZ>0)1===this._isRotateZ?(e=-this._diffX.value*this._offset,e*=this.preMouse.y<this._rotateZMargin?-1:1,r=o["default"].quat.clone([0,0,Math.sin(e),Math.cos(e)]),o["default"].quat.multiply(r,t,r)):(e=-this._diffY.value*this._offset,e*=this.preMouse.x<this._rotateZMargin?1:-1,r=o["default"].quat.clone([0,0,Math.sin(e),Math.cos(e)]),o["default"].quat.multiply(r,t,r));else {var n=o["default"].vec3.clone([this._diffX.value,this._diffY.value,0]),i=o["default"].vec3.create();o["default"].vec3.cross(i,n,this._zAxis),o["default"].vec3.normalize(i,i),e=o["default"].vec3.length(n)*this._offset,r=o["default"].quat.clone([Math.sin(e)*i[0],Math.sin(e)*i[1],Math.sin(e)*i[2],Math.cos(e)]),o["default"].quat.multiply(t,r,t);}}},{key:"_loop",value:function value(){o["default"].mat4.identity(this.m),void 0===this._targetQuat?(o["default"].quat.set(this.tempRotation,this._rotation[0],this._rotation[1],this._rotation[2],this._rotation[3]),this._updateRotation(this.tempRotation)):(this._slerp+=.1*(0-this._slerp),this._slerp<.001?(o["default"].quat.set(this._rotation,this._targetQuat[0],this._targetQuat[1],this._targetQuat[2],this._targetQuat[3]),this._targetQuat=void 0,this._slerp=-1):(o["default"].quat.set(this.tempRotation,0,0,0,0),o["default"].quat.slerp(this.tempRotation,this._targetQuat,this._rotation,this._slerp))),o["default"].vec3.transformQuat(this._vZaxis,this._vZaxis,this.tempRotation),o["default"].mat4.fromQuat(this.matrix,this.tempRotation);}},{key:"easing",set:function set(t){this._diffX.easing=t,this._diffY.easing=t;},get:function get(){return this._diffX.easing;}}]),t;}();r["default"]=d;},{"./EaseNumber":31,"./Scheduler":36,"gl-matrix":1}],36:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function");}var i=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value" in n&&(n.writable=!0),Object.defineProperty(t,n.key,n);}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e;};}();Object.defineProperty(r,"__esModule",{value:!0}),void 0===window.requestAnimFrame&&(window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60);};}());var a=60,u=function(){function t(){n(this,t),this._delayTasks=[],this._nextTasks=[],this._deferTasks=[],this._highTasks=[],this._usurpTask=[],this._enterframeTasks=[],this._idTable=0,this._loop();}return i(t,[{key:"addEF",value:function value(t,e){e=e||[];var r=this._idTable;return this._enterframeTasks[r]={func:t,params:e},this._idTable++,r;}},{key:"removeEF",value:function value(t){return void 0!==this._enterframeTasks[t]&&(this._enterframeTasks[t]=null),-1;}},{key:"delay",value:function value(t,e,r){var n=new Date().getTime(),i={func:t,params:e,delay:r,time:n};this._delayTasks.push(i);}},{key:"defer",value:function value(t,e){var r={func:t,params:e};this._deferTasks.push(r);}},{key:"next",value:function value(t,e){var r={func:t,params:e};this._nextTasks.push(r);}},{key:"usurp",value:function value(t,e){var r={func:t,params:e};this._usurpTask.push(r);}},{key:"_process",value:function value(){var t=0,e=void 0,r=void 0,n=void 0;for(t=0;t<this._enterframeTasks.length;t++){e=this._enterframeTasks[t],null!==e&&void 0!==e&&e.func(e.params);}for(;this._highTasks.length>0;){e=this._highTasks.pop(),e.func(e.params);}var i=new Date().getTime();for(t=0;t<this._delayTasks.length;t++){e=this._delayTasks[t],i-e.time>e.delay&&(e.func(e.params),this._delayTasks.splice(t,1));}for(i=new Date().getTime(),r=1e3/a;this._deferTasks.length>0;){if(e=this._deferTasks.shift(),n=new Date().getTime(),!(r>n-i)){this._deferTasks.unshift(e);break;}e.func(e.params);}for(i=new Date().getTime(),r=1e3/a;this._usurpTask.length>0&&(e=this._usurpTask.shift(),n=new Date().getTime(),r>n-i);){e.func(e.params);}this._highTasks=this._highTasks.concat(this._nextTasks),this._nextTasks=[],this._usurpTask=[];}},{key:"_loop",value:function value(){var t=this;this._process(),window.requestAnimFrame(function(){return t._loop();});}}]),t;}(),o=new u();r["default"]=o;},{}],37:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={simpleColorFrag:"#define GLSLIFY 1\n// simpleColor.frag\n\n#define SHADER_NAME SIMPLE_COLOR\n\nprecision highp float;\n\nuniform vec3 color;\nuniform float opacity;\n\nvoid main(void) {\n    gl_FragColor = vec4(color, opacity);\n}",bigTriangleVert:"#define GLSLIFY 1\n// bigTriangle.vert\n\n#define SHADER_NAME BIG_TRIANGLE_VERTEX\n\nprecision highp float;\nattribute vec2 aPosition;\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = vec4(aPosition, 0.0, 1.0);\n    vTextureCoord = aPosition * .5 + .5;\n}",generalVert:"#define GLSLIFY 1\n// general.vert\n\n#define SHADER_NAME GENERAL_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nuniform vec3 position;\nuniform vec3 scale;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n	vec3 pos      = aVertexPosition * scale;\n	pos           += position;\n	gl_Position   = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(pos, 1.0);\n	vTextureCoord = aTextureCoord;\n}",generalNormalVert:"#define GLSLIFY 1\n// generalWithNormal.vert\n\n#define SHADER_NAME GENERAL_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec3 aNormal;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat3 uNormalMatrix;\n\nuniform vec3 position;\nuniform vec3 scale;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\n\nvoid main(void) {\n	vec3 pos      = aVertexPosition * scale;\n	pos           += position;\n	gl_Position   = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(pos, 1.0);\n	\n	vTextureCoord = aTextureCoord;\n	vNormal       = normalize(uNormalMatrix * aNormal);\n}"};r["default"]=n;},{}]},{},[11])(11);}); 

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict';

module.exports = (function() {
    try {
        return !!new Blob();
    } catch (e) {
        return false;
    }
}());

},{}],3:[function(require,module,exports){
'use strict';

var EventEmitter = require('events').EventEmitter;

function Emitter() {
    EventEmitter.call(this);
    this.setMaxListeners(20);
}

Emitter.prototype = Object.create(EventEmitter.prototype);
Emitter.prototype.constructor = Emitter;

Emitter.prototype.off = function(type, listener) {
    if (listener) {
        return this.removeListener(type, listener);
    }
    if (type) {
        return this.removeAllListeners(type);
    }
    return this.removeAllListeners();
};

module.exports = Emitter;

},{"events":11}],4:[function(require,module,exports){
'use strict';

var Emitter = require('./emitter.js');
var createLoader = require('./loader');
var autoId = 0;

module.exports = function createGroup(config) {
    var group;
    var map = {};
    var assets = [];
    var queue = [];
    var numLoaded = 0;
    var numTotal = 0;
    var loaders = {};

    var add = function(options) {
        // console.debug('add', options);
        if (Array.isArray(options)) {
            options.forEach(add);
            return group;
        }
        var isGroup = !!options.assets && Array.isArray(options.assets);
        // console.debug('isGroup', isGroup);
        var loader;
        if (isGroup) {
            loader = createGroup(configure(options, config));
        } else {
            loader = createLoader(configure(options, config));
        }
        loader.once('destroy', destroyHandler);
        queue.push(loader);
        loaders[loader.id] = loader;
        return group;
    };

    var get = function(id) {
        if (!arguments.length) {
            return assets;
        }
        return map[id];
    };

    var find = function(id) {
        if (get(id)) {
            return get(id);
        }
        var found = null;
        // assets.filter(function(asset) {
        //     return asset.type === 'group';
        // }).map(function(asset) {
        //     return loaders[asset.id];
        // }).some(function(loader) {
        //     found = loader.find(id);
        //     return !!found;
        // });
        Object.keys(loaders).some(function(key) {
            found = loaders[key].find && loaders[key].find(id);
            return !!found;
        });
        return found;
    };

    var getExtension = function(url) {
        return url && url.split('?')[0].split('.').pop().toLowerCase();
    };

    var configure = function(options, defaults) {
        if (typeof options === 'string') {
            var url = options;
            options = {
                url: url
            };
        }

        if (options.isTouchLocked === undefined) {
            options.isTouchLocked = defaults.isTouchLocked;
        }

        if (options.blob === undefined) {
            options.blob = defaults.blob;
        }

        if (options.basePath === undefined) {
            options.basePath = defaults.basePath;
        }

        options.id = options.id || options.url || String(++autoId);
        options.type = options.type || getExtension(options.url);
        options.crossOrigin = options.crossOrigin || defaults.crossOrigin;
        options.webAudioContext = options.webAudioContext || defaults.webAudioContext;
        options.log = defaults.log;

        return options;
    };

    var start = function() {
        numTotal = queue.length;

        queue.forEach(function(loader) {
            loader
                .on('progress', progressHandler)
                .once('complete', completeHandler)
                .once('error', errorHandler)
                .start();
        });

        queue = [];

        return group;
    };

    var progressHandler = function(progress) {
        var loaded = numLoaded + progress;
        group.emit('progress', loaded / numTotal);
    };

    var completeHandler = function(asset, id, type) {
        if (Array.isArray(asset)) {
            asset = { id: id, file: asset, type: type };
        }
        numLoaded++;
        group.emit('progress', numLoaded / numTotal);
        map[asset.id] = asset.file;
        assets.push(asset);
        group.emit('childcomplete', asset);
        checkComplete();
    };

    var errorHandler = function(err) {
        numTotal--;
        if (group.listeners('error').length) {
            group.emit('error', err);
        } else {
            console.error(err);
        }
        checkComplete();
    };

    var destroyHandler = function(id) {
        loaders[id] = null;
        delete loaders[id];

        map[id] = null;
        delete map[id];

        assets.some(function(asset, i) {
            if (asset.id === id) {
                assets.splice(i, 1);
                return true;
            }
        });
    };

    var checkComplete = function() {
        if (numLoaded >= numTotal) {
            group.emit('complete', assets, config.id, 'group');
        }
    };

    var destroy = function() {
        while (queue.length) {
            queue.pop().destroy();
        }
        group.off('error');
        group.off('progress');
        group.off('complete');
        assets = [];
        map = {};
        config.webAudioContext = null;
        numTotal = 0;
        numLoaded = 0;

        Object.keys(loaders).forEach(function(key) {
            loaders[key].destroy();
        });
        loaders = {};

        group.emit('destroy', group.id);

        return group;
    };

    // emits: progress, error, complete, destroy

    group = Object.create(Emitter.prototype, {
        _events: {
            value: {}
        },
        id: {
            get: function() {
                return config.id;
            }
        },
        add: {
            value: add
        },
        start: {
            value: start
        },
        get: {
            value: get
        },
        find: {
            value: find
        },
        getLoader: {
            value: function(id) {
                return loaders[id];
            }
        },
        loaded: {
            get: function() {
                return numLoaded >= numTotal;
            }
        },
        file: {
            get: function() {
                return assets;
            }
        },
        destroy: {
            value: destroy
        }
    });

    config = configure(config || {}, {
        basePath: '',
        blob: false,
        touchLocked: false,
        crossOrigin: null,
        webAudioContext: null,
        log: false
    });

    if (Array.isArray(config.assets)) {
        add(config.assets);
    }

    return Object.freeze(group);
};

},{"./emitter.js":3,"./loader":6}],5:[function(require,module,exports){
'use strict';

var assetsLoader = require('./group');
assetsLoader.stats = require('./stats');

module.exports = assetsLoader;

},{"./group":4,"./stats":7}],6:[function(require,module,exports){
'use strict';

var Emitter = require('./emitter.js');
var browserHasBlob = require('./browser-has-blob.js');
var stats = require('./stats');

module.exports = function(options) {
    var id = options.id;
    var basePath = options.basePath || '';
    var url = options.url;
    var type = options.type;
    var crossOrigin = options.crossOrigin;
    var isTouchLocked = options.isTouchLocked;
    var blob = options.blob && browserHasBlob;
    var webAudioContext = options.webAudioContext;
    var log = options.log;

    var loader;
    var loadHandler;
    var request;
    var startTime;
    var timeout;
    var file;

    var start = function() {
        startTime = Date.now();

        switch (type) {
            case 'json':
                loadJSON();
                break;
            case 'jpg':
            case 'png':
            case 'gif':
            case 'webp':
                loadImage();
                break;
            case 'mp3':
            case 'ogg':
            case 'opus':
            case 'wav':
            case 'm4a':
                loadAudio();
                break;
            case 'ogv':
            case 'mp4':
            case 'webm':
            case 'hls':
                loadVideo();
                break;
            case 'bin':
            case 'binary':
                loadXHR('arraybuffer');
                break;
            case 'txt':
            case 'text':
                loadXHR('text');
                break;
            default:
                throw 'AssetsLoader ERROR: Unknown type for file with URL: ' + basePath + url + ' (' + type + ')';
        }
    };

    var dispatchComplete = function(data) {
        if (!data) {
            return;
        }
        file = {id: id, file: data, type: type};
        loader.emit('progress', 1);
        loader.emit('complete', file, id, type);
        removeListeners();
    };

    var loadXHR = function(responseType, customLoadHandler) {
        loadHandler = customLoadHandler || completeHandler;

        request = new XMLHttpRequest();
        request.open('GET', basePath + url, true);
        request.responseType = responseType;
        request.addEventListener('progress', progressHandler);
        request.addEventListener('load', loadHandler);
        request.addEventListener('error', errorHandler);
        request.send();
    };

    var progressHandler = function(event) {
        if (event.lengthComputable) {
            loader.emit('progress', event.loaded / event.total);
        }
    };

    var completeHandler = function() {
        if (success()) {
            dispatchComplete(request.response);
        }
    };

    var success = function() {
        if (request && request.status < 400) {
            stats.update(request, startTime, url, log);
            return true;
        }
        errorHandler(request && request.statusText);
        return false;
    };

    // json

    var loadJSON = function() {
        loadXHR('json', function() {
            if (success()) {
                var data = request.response;
                if (typeof data === 'string') {
                    data = JSON.parse(data);
                }
                dispatchComplete(data);
            }
        });
    };

    // image

    var loadImage = function() {
        if (blob) {
            loadImageBlob();
        } else {
            loadImageElement();
        }
    };

    var loadImageElement = function() {
        request = new Image();
        if (crossOrigin) {
            request.crossOrigin = 'anonymous';
        }
        request.addEventListener('error', errorHandler, false);
        request.addEventListener('load', elementLoadHandler, false);
        request.src = basePath + url;
    };

    var elementLoadHandler = function() {
        window.clearTimeout(timeout);
        dispatchComplete(request);
    };

    var loadImageBlob = function() {
        loadXHR('blob', function() {
            if (success()) {
                request = new Image();
                request.addEventListener('error', errorHandler, false);
                request.addEventListener('load', imageBlobHandler, false);
                request.src = window.URL.createObjectURL(request.response);
            }
        });
    };

    var imageBlobHandler = function() {
        window.URL.revokeObjectURL(request.src);
        dispatchComplete(request);
    };

    // audio

    var loadAudio = function() {
        if (webAudioContext) {
            loadAudioBuffer();
        } else {
            loadMediaElement('audio');
        }
    };

    // video

    var loadVideo = function() {
        if (blob) {
            loadXHR('blob');
        } else {
            loadMediaElement('video');
        }
    };

    // audio buffer

    var loadAudioBuffer = function() {
        loadXHR('arraybuffer', function() {
            if (success()) {
                webAudioContext.decodeAudioData(
                    request.response,
                    function(buffer) {
                        request = null;
                        dispatchComplete(buffer);
                    },
                    function(e) {
                        errorHandler(e);
                    }
                );
            }
        });
    };

    // media element

    var loadMediaElement = function(tagName) {
        request = document.createElement(tagName);

        if (!isTouchLocked) {
            // timeout because sometimes canplaythrough doesn't fire
            window.clearTimeout(timeout);
            timeout = window.setTimeout(elementLoadHandler, 2000);
            request.addEventListener('canplaythrough', elementLoadHandler, false);
        }

        request.addEventListener('error', errorHandler, false);
        request.preload = 'auto';
        request.src = basePath + url;
        request.load();

        if (isTouchLocked) {
            dispatchComplete(request);
        }
    };

    // error

    var errorHandler = function(err) {
        window.clearTimeout(timeout);

        var message = err;

        if (request && request.tagName && request.error) {
            var ERROR_STATE = ['', 'ABORTED', 'NETWORK', 'DECODE', 'SRC_NOT_SUPPORTED'];
            message = 'MediaError: ' + ERROR_STATE[request.error.code] + ' ' + request.src;
        } else if (request && request.statusText) {
            message = request.statusText;
        } else if (err && err.message) {
            message = err.message;
        } else if (err && err.type) {
            message = err.type;
        }

        loader.emit('error', 'Error loading "' + basePath + url + '" ' + message);

        destroy();
    };

    // clean up

    var removeListeners = function() {
        loader.off('error');
        loader.off('progress');
        loader.off('complete');

        if (request) {
            request.removeEventListener('progress', progressHandler);
            request.removeEventListener('load', loadHandler);
            request.removeEventListener('error', errorHandler);
            request.removeEventListener('load', elementLoadHandler);
            request.removeEventListener('canplaythrough', elementLoadHandler);
            request.removeEventListener('load', imageBlobHandler);
        }
    };

    var destroy = function() {
        removeListeners();

        if (request && request.abort && request.readyState < 4) {
            request.abort();
        }

        request = null;
        webAudioContext = null;
        file = null;

        window.clearTimeout(timeout);

        loader.emit('destroy', id);
    };

    // emits: progress, error, complete

    loader = Object.create(Emitter.prototype, {
        _events: {
            value: {}
        },
        id: {
            value: options.id
        },
        start: {
            value: start
        },
        loaded: {
            get: function() {
                return !!file;
            }
        },
        file: {
            get: function() {
                return file;
            }
        },
        destroy: {
            value: destroy
        }
    });

    return Object.freeze(loader);
};

},{"./browser-has-blob.js":2,"./emitter.js":3,"./stats":7}],7:[function(require,module,exports){
'use strict';

module.exports = {
    mbs: 0,
    secs: 0,
    update: function(request, startTime, url, log) {
        var length;
        var headers = request.getAllResponseHeaders();
        if (headers) {
            var match = headers.match(/content-length: (\d+)/i);
            if (match && match.length) {
                length = match[1];
            }
        }
        // var length = request.getResponseHeader('Content-Length');
        if (length) {
            length = parseInt(length, 10);
            var mbs = length / 1024 / 1024;
            var secs = (Date.now() - startTime) / 1000;
            this.secs += secs;
            this.mbs += mbs;
            if (log) {
                this.log(url, mbs, secs);
            }
        } else if(log) {
            console.warn.call(console, 'Can\'t get Content-Length:', url);
        }
    },
    log: function(url, mbs, secs) {
        if (url) {
            var file = 'File loaded: ' +
                url.substr(url.lastIndexOf('/') + 1) +
                ' size:' + mbs.toFixed(2) + 'mb' +
                ' time:' + secs.toFixed(2) + 's' +
                ' speed:' + (mbs / secs).toFixed(2) + 'mbps';

            console.log.call(console, file);
        }
        var total = 'Total loaded: ' + this.mbs.toFixed(2) + 'mb' +
            ' time:' + this.secs.toFixed(2) + 's' +
            ' speed:' + this.getMbps().toFixed(2) + 'mbps';
        console.log.call(console, total);
    },
    getMbps: function() {
        return this.mbs / this.secs;
    }
};

},{}],8:[function(require,module,exports){
module.exports = require('./vendor/dat.gui')
module.exports.color = require('./vendor/dat.color')
},{"./vendor/dat.color":9,"./vendor/dat.gui":10}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _alfridMin = require('../../../../build/alfrid.min.js');

var _alfridMin2 = _interopRequireDefault(_alfridMin);

var _ViewCube = require('./ViewCube');

var _ViewCube2 = _interopRequireDefault(_ViewCube);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // SceneApp.js



var GL = undefined;

var SceneApp = function (_alfrid$Scene) {
	_inherits(SceneApp, _alfrid$Scene);

	function SceneApp() {
		_classCallCheck(this, SceneApp);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SceneApp).call(this));

		GL = _alfridMin2.default.GL;
		var fov = 60;
		_this.camera.setPerspective(fov * Math.PI / 180, GL.aspectRatio, 0.1, 100);

		_this.cameraCubemap = new _alfridMin2.default.CameraPerspective();
		_this.cameraCubemap.setPerspective(fov * Math.PI / 180, GL.aspectRatio, 0.1, 100);
		var orbitalControl = new _alfridMin2.default.OrbitalControl(_this.cameraCubemap, window, 15);
		orbitalControl.lockZoom(true);
		orbitalControl.radius.value = .1;
		return _this;
	}

	_createClass(SceneApp, [{
		key: '_initTextures',
		value: function _initTextures() {
			function getAsset(id) {
				for (var i = 0; i < assets.length; i++) {
					if (id === assets[i].id) {
						return assets[i].file;
					}
				}
			}

			var irr_posx = _alfridMin2.default.HDRLoader.parse(getAsset('irr_posx'));
			var irr_negx = _alfridMin2.default.HDRLoader.parse(getAsset('irr_negx'));
			var irr_posy = _alfridMin2.default.HDRLoader.parse(getAsset('irr_posy'));
			var irr_negy = _alfridMin2.default.HDRLoader.parse(getAsset('irr_negy'));
			var irr_posz = _alfridMin2.default.HDRLoader.parse(getAsset('irr_posz'));
			var irr_negz = _alfridMin2.default.HDRLoader.parse(getAsset('irr_negz'));

			this._textureIrr = new _alfridMin2.default.GLCubeTexture([irr_posx, irr_negx, irr_posy, irr_negy, irr_posz, irr_negz]);

			var rad_posx = _alfridMin2.default.HDRLoader.parse(getAsset('rad_posx'));
			var rad_negx = _alfridMin2.default.HDRLoader.parse(getAsset('rad_negx'));
			var rad_posy = _alfridMin2.default.HDRLoader.parse(getAsset('rad_posy'));
			var rad_negy = _alfridMin2.default.HDRLoader.parse(getAsset('rad_negy'));
			var rad_posz = _alfridMin2.default.HDRLoader.parse(getAsset('rad_posz'));
			var rad_negz = _alfridMin2.default.HDRLoader.parse(getAsset('rad_negz'));

			this._textureRad = new _alfridMin2.default.GLCubeTexture([rad_posx, rad_negx, rad_posy, rad_negy, rad_posz, rad_negz]);
		}
	}, {
		key: '_initViews',
		value: function _initViews() {
			var _this2 = this;

			this._vCube = new _ViewCube2.default();
			this._bAxis = new _alfridMin2.default.BatchAxis();
			this._bDotsPlane = new _alfridMin2.default.BatchDotsPlane();
			this._bCopy = new _alfridMin2.default.BatchCopy();

			this.mesh = _alfridMin2.default.Geom.skybox(15);
			this.shader = new _alfridMin2.default.GLShader("#define GLSLIFY 1\n// basic.vert\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vVertex;\nvarying vec3 vCameraDir;\n\nvoid main(void) {\n\tgl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n\tvTextureCoord = aTextureCoord;\n\t\n\tvVertex = aVertexPosition;\n}", "#define GLSLIFY 1\n// basic.frag\n\n#define SHADER_NAME BASIC_FRAGMENT\n\nprecision highp float;\n\nuniform samplerCube texture;\nuniform float\t\tuExposure;\nuniform float\t\tuGamma;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vVertex;\n\n// Filmic tonemapping from\n// http://filmicgames.com/archives/75\n\nconst float A = 0.15;\nconst float B = 0.50;\nconst float C = 0.10;\nconst float D = 0.20;\nconst float E = 0.02;\nconst float F = 0.30;\n\nvec3 Uncharted2Tonemap( vec3 x )\n{\n\treturn ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;\n}\n\nvoid main(void) {\n\tvec3 color   \t\t= textureCube(texture, vVertex).rgb;\n\n\tcolor\t\t\t\t= Uncharted2Tonemap( color * uExposure );\n\t// white balance\n\tcolor\t\t\t\t= color * ( 1.0 / Uncharted2Tonemap( vec3( 20.0 ) ) );\n\t\n\t// gamma correction\n\tcolor\t\t\t\t= pow( color, vec3( 1.0 / uGamma ) );\n\n\tgl_FragColor = vec4(color, 1.0);\n}");

			// this.meshSphere       = alfrid.Geom.sphere(1.5, 48, true);
			// this.shaderReflection = new alfrid.GLShader(glslify('../shaders/reflection.vert'), glslify('../shaders/reflection.frag'));
			this.shaderReflection = new _alfridMin2.default.GLShader("#define GLSLIFY 1\n// reflection.vert\n\n#define SHADER_NAME REFLECTION_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec3 aNormal;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat3 uNormalMatrix;\nuniform mat3 uModelViewMatrixInverse;\n\nvarying vec2 vTextureCoord;\n\nvarying vec3 vNormal;\nvarying vec3 vPosition;\nvarying vec3 vWsPosition;\nvarying vec3 vEyePosition;\nvarying vec3 vWsNormal;\n\nvarying vec3 vNormalWorldSpace;\nvarying vec3 vEyeDirWorldSpace;\n\nvoid main(void) {\n\tvec3 position \t\t\t= aVertexPosition * 8.0;\n\tvec4 worldSpacePosition\t= uModelMatrix * vec4(position, 1.0);\n    vec4 viewSpacePosition\t= uViewMatrix * worldSpacePosition;\n\t\n    vNormal\t\t\t\t\t= uNormalMatrix * aNormal;\n    vPosition\t\t\t\t= viewSpacePosition.xyz;\n\tvWsPosition\t\t\t\t= worldSpacePosition.xyz;\n\t\n\tvec4 eyeDirViewSpace\t= viewSpacePosition - vec4( 0, 0, 0, 1 );\n\tvEyePosition\t\t\t= -vec3( uModelViewMatrixInverse * eyeDirViewSpace.xyz );\n\tvWsNormal\t\t\t\t= normalize( uModelViewMatrixInverse * vNormal );\n\t\n    gl_Position\t\t\t\t= uProjectionMatrix * viewSpacePosition;\n\n\tvTextureCoord\t\t\t= aTextureCoord;\n\n\t//\ttest code\n\t// vec4 eyeDirViewSpace   = viewSpacePosition - vec4( 0, 0, 0, 1 );\n\tvEyeDirWorldSpace      = vec3( uModelViewMatrixInverse * eyeDirViewSpace.rgb );\n\tvec3 normalViewSpace   = uNormalMatrix * aNormal;\n\tvNormalWorldSpace      = normalize( vec3( vec4( normalViewSpace, 0 ) * uViewMatrix ) );\t\t\n}\n", "// pbr.frag\n\n#extension GL_EXT_shader_texture_lod : enable\n#define GLSLIFY 1\n\nprecision highp float;\n\nuniform samplerCube uRadianceMap;\nuniform samplerCube uIrradianceMap;\n\nuniform vec3\t\tuBaseColor;\nuniform float\t\tuRoughness;\nuniform float\t\tuRoughness4;\nuniform float\t\tuMetallic;\nuniform float\t\tuSpecular;\n\nuniform float\t\tuExposure;\nuniform float\t\tuGamma;\n\nvarying vec3        vNormal;\nvarying vec3        vPosition;\nvarying vec3\t\tvEyePosition;\nvarying vec3\t\tvWsNormal;\nvarying vec3\t\tvWsPosition;\n\nvarying vec3 vNormalWorldSpace;\nvarying vec3 vEyeDirWorldSpace;\n\n#define saturate(x) clamp(x, 0.0, 1.0)\n#define PI 3.1415926535897932384626433832795\n\n// Filmic tonemapping from\n// http://filmicgames.com/archives/75\n\nconst float A = 0.15;\nconst float B = 0.50;\nconst float C = 0.10;\nconst float D = 0.20;\nconst float E = 0.02;\nconst float F = 0.30;\n\nvec3 Uncharted2Tonemap( vec3 x )\n{\n\treturn ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;\n}\n\n// https://www.unrealengine.com/blog/physically-based-shading-on-mobile\nvec3 EnvBRDFApprox( vec3 SpecularColor, float Roughness, float NoV )\n{\n\tconst vec4 c0 = vec4( -1, -0.0275, -0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, -0.04 );\n\tvec4 r = Roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( -9.28 * NoV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn SpecularColor * AB.x + AB.y;\n}\n\n// http://the-witness.net/news/2012/02/seamless-cube-map-filtering/\nvec3 fix_cube_lookup( vec3 v, float cube_size, float lod ) {\n\tfloat M = max(max(abs(v.x), abs(v.y)), abs(v.z));\n\tfloat scale = 1.0 - exp2(lod) / cube_size;\n\tif (abs(v.x) != M) v.x *= scale;\n\tif (abs(v.y) != M) v.y *= scale;\n\tif (abs(v.z) != M) v.z *= scale;\n\treturn v;\n}\n\nvec3 correctGamma(vec3 color, float g) {\n\treturn pow(color, vec3(1.0/g));\n}\n\nvoid main() {\n\t\n\tvec3 N \t\t\t\t= normalize( vWsNormal );\n\tvec3 V \t\t\t\t= normalize( vEyePosition );\n\t\n\t// deduce the diffuse and specular color from the baseColor and how metallic the material is\n\tvec3 diffuseColor\t= uBaseColor - uBaseColor * uMetallic;\n\tvec3 specularColor\t= mix( vec3( 0.08 * uSpecular ), uBaseColor, uMetallic );\n\t\n\tvec3 color;\n\t\n\t// sample the pre-filtered cubemap at the corresponding mipmap level\n\tfloat numMips\t\t= 6.0;\n\tfloat mip\t\t\t= numMips - 1.0 + log2(uRoughness);\n\tvec3 lookup\t\t\t= -reflect( V, N );\n\tlookup\t\t\t\t= fix_cube_lookup( lookup, 512.0, mip );\n\tvec3 radiance\t\t= pow( textureCubeLodEXT( uRadianceMap, lookup, mip ).rgb, vec3( 2.2 ) );\n\tvec3 irradiance\t\t= pow( textureCube( uIrradianceMap, N ).rgb, vec3( 1 ) );\n\t\n\t// get the approximate reflectance\n\tfloat NoV\t\t\t= saturate( dot( N, V ) );\n\tvec3 reflectance\t= EnvBRDFApprox( specularColor, uRoughness4, NoV );\n\t\n\t// combine the specular IBL and the BRDF\n    vec3 diffuse  \t\t= diffuseColor * irradiance;\n    vec3 specular \t\t= radiance * reflectance;\n\tcolor\t\t\t\t= diffuse + specular;\n\t\n\n\t\n\n\t// color = irradiance;\n\n\t// apply the tone-mapping\n\tcolor\t\t\t\t= Uncharted2Tonemap( color * uExposure );\n\t// white balance\n\tcolor\t\t\t\t= color * ( 1.0 / Uncharted2Tonemap( vec3( 20.0 ) ) );\n\t\n\t// gamma correction\n\tcolor\t\t\t\t= pow( color, vec3( 1.0 / uGamma ) );\n\n\t// output the fragment color\n    gl_FragColor\t\t= vec4( color, 1.0 );\n\n}");

			this._objLoader = new _alfridMin2.default.ObjLoader();
			this._objLoader.load('./assets/mask.obj', function (mesh) {
				return _this2._onObjLoaded(mesh);
			}, false);
		}
	}, {
		key: '_onObjLoaded',
		value: function _onObjLoaded(mesh) {
			this.meshMask = mesh;
		}
	}, {
		key: 'render',
		value: function render() {
			params.roughness = params.offset;
			params.metallic = 1.0 - params.roughness;
			params.specular = (1.0 - params.roughness) * .9 + .1;
			if (!this.meshMask) {
				return;
			}

			GL.setMatrices(this.cameraCubemap);

			// 	SKYBOX
			this.shader.bind();
			this.shader.uniform("texture", "uniform1i", 0);
			this.shader.uniform("uExposure", "uniform1f", params.exposure);
			this.shader.uniform("uGamma", "uniform1f", params.gamma);
			this._textureRad.bind(0);
			GL.draw(this.mesh);

			GL.setMatrices(this.camera);
			// this._bAxis.draw();
			// this._bDotsPlane.draw();

			//	SPHERE
			this.shaderReflection.bind();
			this.shaderReflection.uniform("uRadianceMap", "uniform1i", 0);
			this.shaderReflection.uniform("uIrradianceMap", "uniform1i", 1);
			this._textureRad.bind(0);
			this._textureIrr.bind(1);

			var roughness4 = Math.pow(params.roughness, 4.0);
			this.shaderReflection.uniform("uBaseColor", "uniform3fv", [1, 1, 1]);
			this.shaderReflection.uniform("uRoughness", "uniform1f", params.roughness);
			this.shaderReflection.uniform("uRoughness4", "uniform1f", roughness4);
			this.shaderReflection.uniform("uMetallic", "uniform1f", params.metallic);
			this.shaderReflection.uniform("uSpecular", "uniform1f", params.specular);

			this.shaderReflection.uniform("uExposure", "uniform1f", params.exposure);
			this.shaderReflection.uniform("uGamma", "uniform1f", params.gamma);

			GL.draw(this.meshMask);
		}
	}]);

	return SceneApp;
}(_alfridMin2.default.Scene);

exports.default = SceneApp;

},{"../../../../build/alfrid.min.js":1,"./ViewCube":13}],13:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _alfridMin = require('../../../../build/alfrid.min.js');

var _alfridMin2 = _interopRequireDefault(_alfridMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ViewCube.js

var GL = _alfridMin2.default.GL;


var ViewCube = function (_alfrid$View) {
	_inherits(ViewCube, _alfrid$View);

	function ViewCube() {
		_classCallCheck(this, ViewCube);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ViewCube).call(this, _alfridMin2.default.ShaderLibs.generalNormalVert, "#define GLSLIFY 1\n// basic.frag\n\n#define SHADER_NAME BASIC_FRAGMENT\n\nprecision highp float;\nuniform sampler2D texture;\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\n\nconst vec3 light = vec3(1.0, 1.0, 1.0);\n\nfloat diffuse(vec3 N, vec3 L) {\n\treturn max(dot(N, normalize(L)), 0.0);\n}\n\nvoid main(void) {\n\tvec4 color = texture2D(texture, vTextureCoord);\n    float _diffuse = mix(diffuse(vNormal, light), 1.0, .2);\n    gl_FragColor = color * _diffuse;;\n}"));

		_this.time = 0;
		return _this;
	}

	_createClass(ViewCube, [{
		key: '_init',
		value: function _init() {
			var size = 1;
			this.mesh = _alfridMin2.default.Geom.cube(size, size, size, true);
		}
	}, {
		key: 'render',
		value: function render(texture) {
			this.time += .02;
			var scale = (Math.cos(this.time) * .5 + .5) * .9 + 1.0;
			this.shader.bind();
			this.shader.uniform("texture", "uniform1i", 0);
			texture.bind(0);
			this.shader.uniform("scale", "uniform3fv", [scale, scale, scale]);
			GL.draw(this.mesh);
		}
	}]);

	return ViewCube;
}(_alfridMin2.default.View);

exports.default = ViewCube;

},{"../../../../build/alfrid.min.js":1}],14:[function(require,module,exports){
'use strict';

var _alfridMin = require('../../../../build/alfrid.min.js');

var _alfridMin2 = _interopRequireDefault(_alfridMin);

var _SceneApp = require('./SceneApp');

var _SceneApp2 = _interopRequireDefault(_SceneApp);

var _assetsLoader = require('assets-loader');

var _assetsLoader2 = _interopRequireDefault(_assetsLoader);

var _datGui = require('dat-gui');

var _datGui2 = _interopRequireDefault(_datGui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }



window.alfrid = _alfridMin2.default;

window.params = {
	metallic: 1,
	roughness: 0,
	specular: 1,
	offset: 0,

	gamma: 2.2,
	exposure: 5
};

var assets = [{ id: 'irr_posx', url: 'assets/irr_posx.hdr', type: 'binary' }, { id: 'irr_posy', url: 'assets/irr_posy.hdr', type: 'binary' }, { id: 'irr_posz', url: 'assets/irr_posz.hdr', type: 'binary' }, { id: 'irr_negx', url: 'assets/irr_negx.hdr', type: 'binary' }, { id: 'irr_negy', url: 'assets/irr_negy.hdr', type: 'binary' }, { id: 'irr_negz', url: 'assets/irr_negz.hdr', type: 'binary' }, { id: 'rad_posx', url: 'assets/rad_posx.hdr', type: 'binary' }, { id: 'rad_posy', url: 'assets/rad_posy.hdr', type: 'binary' }, { id: 'rad_posz', url: 'assets/rad_posz.hdr', type: 'binary' }, { id: 'rad_negx', url: 'assets/rad_negx.hdr', type: 'binary' }, { id: 'rad_negy', url: 'assets/rad_negy.hdr', type: 'binary' }, { id: 'rad_negz', url: 'assets/rad_negz.hdr', type: 'binary' }];
var loader = new _assetsLoader2.default({
	assets: assets
}).on('error', function (error) {
	console.error(error);
}).on('progress', function (p) {
	// console.log('Progress : ', p);
}).on('complete', _onImageLoaded).start();

function _onImageLoaded(o) {
	window.assets = o;

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
	var canvas = document.createElement("canvas");
	canvas.className = 'Main-Canvas';
	document.body.appendChild(canvas);

	//	INIT GL TOOL
	_alfridMin2.default.GL.init(canvas);

	//	INIT SCENE
	var scene = new _SceneApp2.default();

	var gui = new _datGui2.default.GUI({ width: 300 });
	gui.add(params, 'offset', 0, 1).listen();
	// gui.add(params, 'metallic', 0, 1).listen();
	// gui.add(params, 'roughness', 0, 1).listen();
	// gui.add(params, 'specular', 0.15, 1).listen();
	gui.add(params, 'gamma', 1, 10);
	gui.add(params, 'exposure', 1, 30);
}

},{"../../../../build/alfrid.min.js":1,"./SceneApp":12,"assets-loader":5,"dat-gui":8}]},{},[14]);

//# sourceMappingURL=bundle.js.map
