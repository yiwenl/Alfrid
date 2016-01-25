(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

!function (t) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    var e;e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.alfrid = t();
  }
}(function () {
  return function t(e, r, n) {
    function i(u, s) {
      if (!r[u]) {
        if (!e[u]) {
          var o = "function" == typeof require && require;if (!s && o) return o(u, !0);if (a) return a(u, !0);var h = new Error("Cannot find module '" + u + "'");throw h.code = "MODULE_NOT_FOUND", h;
        }var f = r[u] = { exports: {} };e[u][0].call(f.exports, function (t) {
          var r = e[u][1][t];return i(r ? r : t);
        }, f, f.exports, t, e, r, n);
      }return r[u].exports;
    }for (var a = "function" == typeof require && require, u = 0; u < n.length; u++) {
      i(n[u]);
    }return i;
  }({ 1: [function (t, e, r) {
      r.glMatrix = t("./gl-matrix/common.js"), r.mat2 = t("./gl-matrix/mat2.js"), r.mat2d = t("./gl-matrix/mat2d.js"), r.mat3 = t("./gl-matrix/mat3.js"), r.mat4 = t("./gl-matrix/mat4.js"), r.quat = t("./gl-matrix/quat.js"), r.vec2 = t("./gl-matrix/vec2.js"), r.vec3 = t("./gl-matrix/vec3.js"), r.vec4 = t("./gl-matrix/vec4.js");
    }, { "./gl-matrix/common.js": 2, "./gl-matrix/mat2.js": 3, "./gl-matrix/mat2d.js": 4, "./gl-matrix/mat3.js": 5, "./gl-matrix/mat4.js": 6, "./gl-matrix/quat.js": 7, "./gl-matrix/vec2.js": 8, "./gl-matrix/vec3.js": 9, "./gl-matrix/vec4.js": 10 }], 2: [function (t, e, r) {
      var n = {};n.EPSILON = 1e-6, n.ARRAY_TYPE = "undefined" != typeof Float32Array ? Float32Array : Array, n.RANDOM = Math.random, n.setMatrixArrayType = function (t) {
        GLMAT_ARRAY_TYPE = t;
      };var i = Math.PI / 180;n.toRadian = function (t) {
        return t * i;
      }, e.exports = n;
    }, {}], 3: [function (t, e, r) {
      var n = t("./common.js"),
          i = {};i.create = function () {
        var t = new n.ARRAY_TYPE(4);return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t;
      }, i.clone = function (t) {
        var e = new n.ARRAY_TYPE(4);return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
      }, i.copy = function (t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
      }, i.identity = function (t) {
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t;
      }, i.transpose = function (t, e) {
        if (t === e) {
          var r = e[1];t[1] = e[2], t[2] = r;
        } else t[0] = e[0], t[1] = e[2], t[2] = e[1], t[3] = e[3];return t;
      }, i.invert = function (t, e) {
        var r = e[0],
            n = e[1],
            i = e[2],
            a = e[3],
            u = r * a - i * n;return u ? (u = 1 / u, t[0] = a * u, t[1] = -n * u, t[2] = -i * u, t[3] = r * u, t) : null;
      }, i.adjoint = function (t, e) {
        var r = e[0];return t[0] = e[3], t[1] = -e[1], t[2] = -e[2], t[3] = r, t;
      }, i.determinant = function (t) {
        return t[0] * t[3] - t[2] * t[1];
      }, i.multiply = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = r[0],
            o = r[1],
            h = r[2],
            f = r[3];return t[0] = n * s + a * o, t[1] = i * s + u * o, t[2] = n * h + a * f, t[3] = i * h + u * f, t;
      }, i.mul = i.multiply, i.rotate = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = Math.sin(r),
            o = Math.cos(r);return t[0] = n * o + a * s, t[1] = i * o + u * s, t[2] = n * -s + a * o, t[3] = i * -s + u * o, t;
      }, i.scale = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = r[0],
            o = r[1];return t[0] = n * s, t[1] = i * s, t[2] = a * o, t[3] = u * o, t;
      }, i.fromRotation = function (t, e) {
        var r = Math.sin(e),
            n = Math.cos(e);return t[0] = n, t[1] = r, t[2] = -r, t[3] = n, t;
      }, i.fromScaling = function (t, e) {
        return t[0] = e[0], t[1] = 0, t[2] = 0, t[3] = e[1], t;
      }, i.str = function (t) {
        return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
      }, i.frob = function (t) {
        return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2));
      }, i.LDU = function (t, e, r, n) {
        return t[2] = n[2] / n[0], r[0] = n[0], r[1] = n[1], r[3] = n[3] - t[2] * r[1], [t, e, r];
      }, e.exports = i;
    }, { "./common.js": 2 }], 4: [function (t, e, r) {
      var n = t("./common.js"),
          i = {};i.create = function () {
        var t = new n.ARRAY_TYPE(6);return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
      }, i.clone = function (t) {
        var e = new n.ARRAY_TYPE(6);return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e;
      }, i.copy = function (t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t;
      }, i.identity = function (t) {
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
      }, i.invert = function (t, e) {
        var r = e[0],
            n = e[1],
            i = e[2],
            a = e[3],
            u = e[4],
            s = e[5],
            o = r * a - n * i;return o ? (o = 1 / o, t[0] = a * o, t[1] = -n * o, t[2] = -i * o, t[3] = r * o, t[4] = (i * s - a * u) * o, t[5] = (n * u - r * s) * o, t) : null;
      }, i.determinant = function (t) {
        return t[0] * t[3] - t[1] * t[2];
      }, i.multiply = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = e[4],
            o = e[5],
            h = r[0],
            f = r[1],
            l = r[2],
            c = r[3],
            p = r[4],
            d = r[5];return t[0] = n * h + a * f, t[1] = i * h + u * f, t[2] = n * l + a * c, t[3] = i * l + u * c, t[4] = n * p + a * d + s, t[5] = i * p + u * d + o, t;
      }, i.mul = i.multiply, i.rotate = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = e[4],
            o = e[5],
            h = Math.sin(r),
            f = Math.cos(r);return t[0] = n * f + a * h, t[1] = i * f + u * h, t[2] = n * -h + a * f, t[3] = i * -h + u * f, t[4] = s, t[5] = o, t;
      }, i.scale = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = e[4],
            o = e[5],
            h = r[0],
            f = r[1];return t[0] = n * h, t[1] = i * h, t[2] = a * f, t[3] = u * f, t[4] = s, t[5] = o, t;
      }, i.translate = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = e[4],
            o = e[5],
            h = r[0],
            f = r[1];return t[0] = n, t[1] = i, t[2] = a, t[3] = u, t[4] = n * h + a * f + s, t[5] = i * h + u * f + o, t;
      }, i.fromRotation = function (t, e) {
        var r = Math.sin(e),
            n = Math.cos(e);return t[0] = n, t[1] = r, t[2] = -r, t[3] = n, t[4] = 0, t[5] = 0, t;
      }, i.fromScaling = function (t, e) {
        return t[0] = e[0], t[1] = 0, t[2] = 0, t[3] = e[1], t[4] = 0, t[5] = 0, t;
      }, i.fromTranslation = function (t, e) {
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = e[0], t[5] = e[1], t;
      }, i.str = function (t) {
        return "mat2d(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ")";
      }, i.frob = function (t) {
        return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + 1);
      }, e.exports = i;
    }, { "./common.js": 2 }], 5: [function (t, e, r) {
      var n = t("./common.js"),
          i = {};i.create = function () {
        var t = new n.ARRAY_TYPE(9);return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
      }, i.fromMat4 = function (t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[4], t[4] = e[5], t[5] = e[6], t[6] = e[8], t[7] = e[9], t[8] = e[10], t;
      }, i.clone = function (t) {
        var e = new n.ARRAY_TYPE(9);return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e;
      }, i.copy = function (t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t;
      }, i.identity = function (t) {
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
      }, i.transpose = function (t, e) {
        if (t === e) {
          var r = e[1],
              n = e[2],
              i = e[5];t[1] = e[3], t[2] = e[6], t[3] = r, t[5] = e[7], t[6] = n, t[7] = i;
        } else t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8];return t;
      }, i.invert = function (t, e) {
        var r = e[0],
            n = e[1],
            i = e[2],
            a = e[3],
            u = e[4],
            s = e[5],
            o = e[6],
            h = e[7],
            f = e[8],
            l = f * u - s * h,
            c = -f * a + s * o,
            p = h * a - u * o,
            d = r * l + n * c + i * p;return d ? (d = 1 / d, t[0] = l * d, t[1] = (-f * n + i * h) * d, t[2] = (s * n - i * u) * d, t[3] = c * d, t[4] = (f * r - i * o) * d, t[5] = (-s * r + i * a) * d, t[6] = p * d, t[7] = (-h * r + n * o) * d, t[8] = (u * r - n * a) * d, t) : null;
      }, i.adjoint = function (t, e) {
        var r = e[0],
            n = e[1],
            i = e[2],
            a = e[3],
            u = e[4],
            s = e[5],
            o = e[6],
            h = e[7],
            f = e[8];return t[0] = u * f - s * h, t[1] = i * h - n * f, t[2] = n * s - i * u, t[3] = s * o - a * f, t[4] = r * f - i * o, t[5] = i * a - r * s, t[6] = a * h - u * o, t[7] = n * o - r * h, t[8] = r * u - n * a, t;
      }, i.determinant = function (t) {
        var e = t[0],
            r = t[1],
            n = t[2],
            i = t[3],
            a = t[4],
            u = t[5],
            s = t[6],
            o = t[7],
            h = t[8];return e * (h * a - u * o) + r * (-h * i + u * s) + n * (o * i - a * s);
      }, i.multiply = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = e[4],
            o = e[5],
            h = e[6],
            f = e[7],
            l = e[8],
            c = r[0],
            p = r[1],
            d = r[2],
            m = r[3],
            v = r[4],
            _ = r[5],
            g = r[6],
            E = r[7],
            T = r[8];return t[0] = c * n + p * u + d * h, t[1] = c * i + p * s + d * f, t[2] = c * a + p * o + d * l, t[3] = m * n + v * u + _ * h, t[4] = m * i + v * s + _ * f, t[5] = m * a + v * o + _ * l, t[6] = g * n + E * u + T * h, t[7] = g * i + E * s + T * f, t[8] = g * a + E * o + T * l, t;
      }, i.mul = i.multiply, i.translate = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = e[4],
            o = e[5],
            h = e[6],
            f = e[7],
            l = e[8],
            c = r[0],
            p = r[1];return t[0] = n, t[1] = i, t[2] = a, t[3] = u, t[4] = s, t[5] = o, t[6] = c * n + p * u + h, t[7] = c * i + p * s + f, t[8] = c * a + p * o + l, t;
      }, i.rotate = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = e[4],
            o = e[5],
            h = e[6],
            f = e[7],
            l = e[8],
            c = Math.sin(r),
            p = Math.cos(r);return t[0] = p * n + c * u, t[1] = p * i + c * s, t[2] = p * a + c * o, t[3] = p * u - c * n, t[4] = p * s - c * i, t[5] = p * o - c * a, t[6] = h, t[7] = f, t[8] = l, t;
      }, i.scale = function (t, e, r) {
        var n = r[0],
            i = r[1];return t[0] = n * e[0], t[1] = n * e[1], t[2] = n * e[2], t[3] = i * e[3], t[4] = i * e[4], t[5] = i * e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t;
      }, i.fromTranslation = function (t, e) {
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = e[0], t[7] = e[1], t[8] = 1, t;
      }, i.fromRotation = function (t, e) {
        var r = Math.sin(e),
            n = Math.cos(e);return t[0] = n, t[1] = r, t[2] = 0, t[3] = -r, t[4] = n, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
      }, i.fromScaling = function (t, e) {
        return t[0] = e[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = e[1], t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
      }, i.fromMat2d = function (t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = 0, t[3] = e[2], t[4] = e[3], t[5] = 0, t[6] = e[4], t[7] = e[5], t[8] = 1, t;
      }, i.fromQuat = function (t, e) {
        var r = e[0],
            n = e[1],
            i = e[2],
            a = e[3],
            u = r + r,
            s = n + n,
            o = i + i,
            h = r * u,
            f = n * u,
            l = n * s,
            c = i * u,
            p = i * s,
            d = i * o,
            m = a * u,
            v = a * s,
            _ = a * o;return t[0] = 1 - l - d, t[3] = f - _, t[6] = c + v, t[1] = f + _, t[4] = 1 - h - d, t[7] = p - m, t[2] = c - v, t[5] = p + m, t[8] = 1 - h - l, t;
      }, i.normalFromMat4 = function (t, e) {
        var r = e[0],
            n = e[1],
            i = e[2],
            a = e[3],
            u = e[4],
            s = e[5],
            o = e[6],
            h = e[7],
            f = e[8],
            l = e[9],
            c = e[10],
            p = e[11],
            d = e[12],
            m = e[13],
            v = e[14],
            _ = e[15],
            g = r * s - n * u,
            E = r * o - i * u,
            T = r * h - a * u,
            M = n * o - i * s,
            y = n * h - a * s,
            R = i * h - a * o,
            b = f * m - l * d,
            w = f * v - c * d,
            A = f * _ - p * d,
            x = l * v - c * m,
            P = l * _ - p * m,
            L = c * _ - p * v,
            k = g * L - E * P + T * x + M * A - y * w + R * b;return k ? (k = 1 / k, t[0] = (s * L - o * P + h * x) * k, t[1] = (o * A - u * L - h * w) * k, t[2] = (u * P - s * A + h * b) * k, t[3] = (i * P - n * L - a * x) * k, t[4] = (r * L - i * A + a * w) * k, t[5] = (n * A - r * P - a * b) * k, t[6] = (m * R - v * y + _ * M) * k, t[7] = (v * T - d * R - _ * E) * k, t[8] = (d * y - m * T + _ * g) * k, t) : null;
      }, i.str = function (t) {
        return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")";
      }, i.frob = function (t) {
        return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2));
      }, e.exports = i;
    }, { "./common.js": 2 }], 6: [function (t, e, r) {
      var n = t("./common.js"),
          i = {};i.create = function () {
        var t = new n.ARRAY_TYPE(16);return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
      }, i.clone = function (t) {
        var e = new n.ARRAY_TYPE(16);return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e;
      }, i.copy = function (t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t;
      }, i.identity = function (t) {
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
      }, i.transpose = function (t, e) {
        if (t === e) {
          var r = e[1],
              n = e[2],
              i = e[3],
              a = e[6],
              u = e[7],
              s = e[11];t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = r, t[6] = e[9], t[7] = e[13], t[8] = n, t[9] = a, t[11] = e[14], t[12] = i, t[13] = u, t[14] = s;
        } else t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = e[1], t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = e[2], t[9] = e[6], t[10] = e[10], t[11] = e[14], t[12] = e[3], t[13] = e[7], t[14] = e[11], t[15] = e[15];return t;
      }, i.invert = function (t, e) {
        var r = e[0],
            n = e[1],
            i = e[2],
            a = e[3],
            u = e[4],
            s = e[5],
            o = e[6],
            h = e[7],
            f = e[8],
            l = e[9],
            c = e[10],
            p = e[11],
            d = e[12],
            m = e[13],
            v = e[14],
            _ = e[15],
            g = r * s - n * u,
            E = r * o - i * u,
            T = r * h - a * u,
            M = n * o - i * s,
            y = n * h - a * s,
            R = i * h - a * o,
            b = f * m - l * d,
            w = f * v - c * d,
            A = f * _ - p * d,
            x = l * v - c * m,
            P = l * _ - p * m,
            L = c * _ - p * v,
            k = g * L - E * P + T * x + M * A - y * w + R * b;return k ? (k = 1 / k, t[0] = (s * L - o * P + h * x) * k, t[1] = (i * P - n * L - a * x) * k, t[2] = (m * R - v * y + _ * M) * k, t[3] = (c * y - l * R - p * M) * k, t[4] = (o * A - u * L - h * w) * k, t[5] = (r * L - i * A + a * w) * k, t[6] = (v * T - d * R - _ * E) * k, t[7] = (f * R - c * T + p * E) * k, t[8] = (u * P - s * A + h * b) * k, t[9] = (n * A - r * P - a * b) * k, t[10] = (d * y - m * T + _ * g) * k, t[11] = (l * T - f * y - p * g) * k, t[12] = (s * w - u * x - o * b) * k, t[13] = (r * x - n * w + i * b) * k, t[14] = (m * E - d * M - v * g) * k, t[15] = (f * M - l * E + c * g) * k, t) : null;
      }, i.adjoint = function (t, e) {
        var r = e[0],
            n = e[1],
            i = e[2],
            a = e[3],
            u = e[4],
            s = e[5],
            o = e[6],
            h = e[7],
            f = e[8],
            l = e[9],
            c = e[10],
            p = e[11],
            d = e[12],
            m = e[13],
            v = e[14],
            _ = e[15];return t[0] = s * (c * _ - p * v) - l * (o * _ - h * v) + m * (o * p - h * c), t[1] = -(n * (c * _ - p * v) - l * (i * _ - a * v) + m * (i * p - a * c)), t[2] = n * (o * _ - h * v) - s * (i * _ - a * v) + m * (i * h - a * o), t[3] = -(n * (o * p - h * c) - s * (i * p - a * c) + l * (i * h - a * o)), t[4] = -(u * (c * _ - p * v) - f * (o * _ - h * v) + d * (o * p - h * c)), t[5] = r * (c * _ - p * v) - f * (i * _ - a * v) + d * (i * p - a * c), t[6] = -(r * (o * _ - h * v) - u * (i * _ - a * v) + d * (i * h - a * o)), t[7] = r * (o * p - h * c) - u * (i * p - a * c) + f * (i * h - a * o), t[8] = u * (l * _ - p * m) - f * (s * _ - h * m) + d * (s * p - h * l), t[9] = -(r * (l * _ - p * m) - f * (n * _ - a * m) + d * (n * p - a * l)), t[10] = r * (s * _ - h * m) - u * (n * _ - a * m) + d * (n * h - a * s), t[11] = -(r * (s * p - h * l) - u * (n * p - a * l) + f * (n * h - a * s)), t[12] = -(u * (l * v - c * m) - f * (s * v - o * m) + d * (s * c - o * l)), t[13] = r * (l * v - c * m) - f * (n * v - i * m) + d * (n * c - i * l), t[14] = -(r * (s * v - o * m) - u * (n * v - i * m) + d * (n * o - i * s)), t[15] = r * (s * c - o * l) - u * (n * c - i * l) + f * (n * o - i * s), t;
      }, i.determinant = function (t) {
        var e = t[0],
            r = t[1],
            n = t[2],
            i = t[3],
            a = t[4],
            u = t[5],
            s = t[6],
            o = t[7],
            h = t[8],
            f = t[9],
            l = t[10],
            c = t[11],
            p = t[12],
            d = t[13],
            m = t[14],
            v = t[15],
            _ = e * u - r * a,
            g = e * s - n * a,
            E = e * o - i * a,
            T = r * s - n * u,
            M = r * o - i * u,
            y = n * o - i * s,
            R = h * d - f * p,
            b = h * m - l * p,
            w = h * v - c * p,
            A = f * m - l * d,
            x = f * v - c * d,
            P = l * v - c * m;return _ * P - g * x + E * A + T * w - M * b + y * R;
      }, i.multiply = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = e[4],
            o = e[5],
            h = e[6],
            f = e[7],
            l = e[8],
            c = e[9],
            p = e[10],
            d = e[11],
            m = e[12],
            v = e[13],
            _ = e[14],
            g = e[15],
            E = r[0],
            T = r[1],
            M = r[2],
            y = r[3];return t[0] = E * n + T * s + M * l + y * m, t[1] = E * i + T * o + M * c + y * v, t[2] = E * a + T * h + M * p + y * _, t[3] = E * u + T * f + M * d + y * g, E = r[4], T = r[5], M = r[6], y = r[7], t[4] = E * n + T * s + M * l + y * m, t[5] = E * i + T * o + M * c + y * v, t[6] = E * a + T * h + M * p + y * _, t[7] = E * u + T * f + M * d + y * g, E = r[8], T = r[9], M = r[10], y = r[11], t[8] = E * n + T * s + M * l + y * m, t[9] = E * i + T * o + M * c + y * v, t[10] = E * a + T * h + M * p + y * _, t[11] = E * u + T * f + M * d + y * g, E = r[12], T = r[13], M = r[14], y = r[15], t[12] = E * n + T * s + M * l + y * m, t[13] = E * i + T * o + M * c + y * v, t[14] = E * a + T * h + M * p + y * _, t[15] = E * u + T * f + M * d + y * g, t;
      }, i.mul = i.multiply, i.translate = function (t, e, r) {
        var n,
            i,
            a,
            u,
            s,
            o,
            h,
            f,
            l,
            c,
            p,
            d,
            m = r[0],
            v = r[1],
            _ = r[2];return e === t ? (t[12] = e[0] * m + e[4] * v + e[8] * _ + e[12], t[13] = e[1] * m + e[5] * v + e[9] * _ + e[13], t[14] = e[2] * m + e[6] * v + e[10] * _ + e[14], t[15] = e[3] * m + e[7] * v + e[11] * _ + e[15]) : (n = e[0], i = e[1], a = e[2], u = e[3], s = e[4], o = e[5], h = e[6], f = e[7], l = e[8], c = e[9], p = e[10], d = e[11], t[0] = n, t[1] = i, t[2] = a, t[3] = u, t[4] = s, t[5] = o, t[6] = h, t[7] = f, t[8] = l, t[9] = c, t[10] = p, t[11] = d, t[12] = n * m + s * v + l * _ + e[12], t[13] = i * m + o * v + c * _ + e[13], t[14] = a * m + h * v + p * _ + e[14], t[15] = u * m + f * v + d * _ + e[15]), t;
      }, i.scale = function (t, e, r) {
        var n = r[0],
            i = r[1],
            a = r[2];return t[0] = e[0] * n, t[1] = e[1] * n, t[2] = e[2] * n, t[3] = e[3] * n, t[4] = e[4] * i, t[5] = e[5] * i, t[6] = e[6] * i, t[7] = e[7] * i, t[8] = e[8] * a, t[9] = e[9] * a, t[10] = e[10] * a, t[11] = e[11] * a, t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t;
      }, i.rotate = function (t, e, r, i) {
        var a,
            u,
            s,
            o,
            h,
            f,
            l,
            c,
            p,
            d,
            m,
            v,
            _,
            g,
            E,
            T,
            M,
            y,
            R,
            b,
            w,
            A,
            x,
            P,
            L = i[0],
            k = i[1],
            O = i[2],
            D = Math.sqrt(L * L + k * k + O * O);return Math.abs(D) < n.EPSILON ? null : (D = 1 / D, L *= D, k *= D, O *= D, a = Math.sin(r), u = Math.cos(r), s = 1 - u, o = e[0], h = e[1], f = e[2], l = e[3], c = e[4], p = e[5], d = e[6], m = e[7], v = e[8], _ = e[9], g = e[10], E = e[11], T = L * L * s + u, M = k * L * s + O * a, y = O * L * s - k * a, R = L * k * s - O * a, b = k * k * s + u, w = O * k * s + L * a, A = L * O * s + k * a, x = k * O * s - L * a, P = O * O * s + u, t[0] = o * T + c * M + v * y, t[1] = h * T + p * M + _ * y, t[2] = f * T + d * M + g * y, t[3] = l * T + m * M + E * y, t[4] = o * R + c * b + v * w, t[5] = h * R + p * b + _ * w, t[6] = f * R + d * b + g * w, t[7] = l * R + m * b + E * w, t[8] = o * A + c * x + v * P, t[9] = h * A + p * x + _ * P, t[10] = f * A + d * x + g * P, t[11] = l * A + m * x + E * P, e !== t && (t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t);
      }, i.rotateX = function (t, e, r) {
        var n = Math.sin(r),
            i = Math.cos(r),
            a = e[4],
            u = e[5],
            s = e[6],
            o = e[7],
            h = e[8],
            f = e[9],
            l = e[10],
            c = e[11];return e !== t && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[4] = a * i + h * n, t[5] = u * i + f * n, t[6] = s * i + l * n, t[7] = o * i + c * n, t[8] = h * i - a * n, t[9] = f * i - u * n, t[10] = l * i - s * n, t[11] = c * i - o * n, t;
      }, i.rotateY = function (t, e, r) {
        var n = Math.sin(r),
            i = Math.cos(r),
            a = e[0],
            u = e[1],
            s = e[2],
            o = e[3],
            h = e[8],
            f = e[9],
            l = e[10],
            c = e[11];return e !== t && (t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[0] = a * i - h * n, t[1] = u * i - f * n, t[2] = s * i - l * n, t[3] = o * i - c * n, t[8] = a * n + h * i, t[9] = u * n + f * i, t[10] = s * n + l * i, t[11] = o * n + c * i, t;
      }, i.rotateZ = function (t, e, r) {
        var n = Math.sin(r),
            i = Math.cos(r),
            a = e[0],
            u = e[1],
            s = e[2],
            o = e[3],
            h = e[4],
            f = e[5],
            l = e[6],
            c = e[7];return e !== t && (t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[0] = a * i + h * n, t[1] = u * i + f * n, t[2] = s * i + l * n, t[3] = o * i + c * n, t[4] = h * i - a * n, t[5] = f * i - u * n, t[6] = l * i - s * n, t[7] = c * i - o * n, t;
      }, i.fromTranslation = function (t, e) {
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = e[0], t[13] = e[1], t[14] = e[2], t[15] = 1, t;
      }, i.fromScaling = function (t, e) {
        return t[0] = e[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e[1], t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e[2], t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
      }, i.fromRotation = function (t, e, r) {
        var i,
            a,
            u,
            s = r[0],
            o = r[1],
            h = r[2],
            f = Math.sqrt(s * s + o * o + h * h);return Math.abs(f) < n.EPSILON ? null : (f = 1 / f, s *= f, o *= f, h *= f, i = Math.sin(e), a = Math.cos(e), u = 1 - a, t[0] = s * s * u + a, t[1] = o * s * u + h * i, t[2] = h * s * u - o * i, t[3] = 0, t[4] = s * o * u - h * i, t[5] = o * o * u + a, t[6] = h * o * u + s * i, t[7] = 0, t[8] = s * h * u + o * i, t[9] = o * h * u - s * i, t[10] = h * h * u + a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t);
      }, i.fromXRotation = function (t, e) {
        var r = Math.sin(e),
            n = Math.cos(e);return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = n, t[6] = r, t[7] = 0, t[8] = 0, t[9] = -r, t[10] = n, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
      }, i.fromYRotation = function (t, e) {
        var r = Math.sin(e),
            n = Math.cos(e);return t[0] = n, t[1] = 0, t[2] = -r, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = r, t[9] = 0, t[10] = n, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
      }, i.fromZRotation = function (t, e) {
        var r = Math.sin(e),
            n = Math.cos(e);return t[0] = n, t[1] = r, t[2] = 0, t[3] = 0, t[4] = -r, t[5] = n, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
      }, i.fromRotationTranslation = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = n + n,
            o = i + i,
            h = a + a,
            f = n * s,
            l = n * o,
            c = n * h,
            p = i * o,
            d = i * h,
            m = a * h,
            v = u * s,
            _ = u * o,
            g = u * h;return t[0] = 1 - (p + m), t[1] = l + g, t[2] = c - _, t[3] = 0, t[4] = l - g, t[5] = 1 - (f + m), t[6] = d + v, t[7] = 0, t[8] = c + _, t[9] = d - v, t[10] = 1 - (f + p), t[11] = 0, t[12] = r[0], t[13] = r[1], t[14] = r[2], t[15] = 1, t;
      }, i.fromRotationTranslationScale = function (t, e, r, n) {
        var i = e[0],
            a = e[1],
            u = e[2],
            s = e[3],
            o = i + i,
            h = a + a,
            f = u + u,
            l = i * o,
            c = i * h,
            p = i * f,
            d = a * h,
            m = a * f,
            v = u * f,
            _ = s * o,
            g = s * h,
            E = s * f,
            T = n[0],
            M = n[1],
            y = n[2];return t[0] = (1 - (d + v)) * T, t[1] = (c + E) * T, t[2] = (p - g) * T, t[3] = 0, t[4] = (c - E) * M, t[5] = (1 - (l + v)) * M, t[6] = (m + _) * M, t[7] = 0, t[8] = (p + g) * y, t[9] = (m - _) * y, t[10] = (1 - (l + d)) * y, t[11] = 0, t[12] = r[0], t[13] = r[1], t[14] = r[2], t[15] = 1, t;
      }, i.fromRotationTranslationScaleOrigin = function (t, e, r, n, i) {
        var a = e[0],
            u = e[1],
            s = e[2],
            o = e[3],
            h = a + a,
            f = u + u,
            l = s + s,
            c = a * h,
            p = a * f,
            d = a * l,
            m = u * f,
            v = u * l,
            _ = s * l,
            g = o * h,
            E = o * f,
            T = o * l,
            M = n[0],
            y = n[1],
            R = n[2],
            b = i[0],
            w = i[1],
            A = i[2];return t[0] = (1 - (m + _)) * M, t[1] = (p + T) * M, t[2] = (d - E) * M, t[3] = 0, t[4] = (p - T) * y, t[5] = (1 - (c + _)) * y, t[6] = (v + g) * y, t[7] = 0, t[8] = (d + E) * R, t[9] = (v - g) * R, t[10] = (1 - (c + m)) * R, t[11] = 0, t[12] = r[0] + b - (t[0] * b + t[4] * w + t[8] * A), t[13] = r[1] + w - (t[1] * b + t[5] * w + t[9] * A), t[14] = r[2] + A - (t[2] * b + t[6] * w + t[10] * A), t[15] = 1, t;
      }, i.fromQuat = function (t, e) {
        var r = e[0],
            n = e[1],
            i = e[2],
            a = e[3],
            u = r + r,
            s = n + n,
            o = i + i,
            h = r * u,
            f = n * u,
            l = n * s,
            c = i * u,
            p = i * s,
            d = i * o,
            m = a * u,
            v = a * s,
            _ = a * o;return t[0] = 1 - l - d, t[1] = f + _, t[2] = c - v, t[3] = 0, t[4] = f - _, t[5] = 1 - h - d, t[6] = p + m, t[7] = 0, t[8] = c + v, t[9] = p - m, t[10] = 1 - h - l, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
      }, i.frustum = function (t, e, r, n, i, a, u) {
        var s = 1 / (r - e),
            o = 1 / (i - n),
            h = 1 / (a - u);return t[0] = 2 * a * s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 2 * a * o, t[6] = 0, t[7] = 0, t[8] = (r + e) * s, t[9] = (i + n) * o, t[10] = (u + a) * h, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = u * a * 2 * h, t[15] = 0, t;
      }, i.perspective = function (t, e, r, n, i) {
        var a = 1 / Math.tan(e / 2),
            u = 1 / (n - i);return t[0] = a / r, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = a, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = (i + n) * u, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = 2 * i * n * u, t[15] = 0, t;
      }, i.perspectiveFromFieldOfView = function (t, e, r, n) {
        var i = Math.tan(e.upDegrees * Math.PI / 180),
            a = Math.tan(e.downDegrees * Math.PI / 180),
            u = Math.tan(e.leftDegrees * Math.PI / 180),
            s = Math.tan(e.rightDegrees * Math.PI / 180),
            o = 2 / (u + s),
            h = 2 / (i + a);return t[0] = o, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = h, t[6] = 0, t[7] = 0, t[8] = -((u - s) * o * .5), t[9] = (i - a) * h * .5, t[10] = n / (r - n), t[11] = -1, t[12] = 0, t[13] = 0, t[14] = n * r / (r - n), t[15] = 0, t;
      }, i.ortho = function (t, e, r, n, i, a, u) {
        var s = 1 / (e - r),
            o = 1 / (n - i),
            h = 1 / (a - u);return t[0] = -2 * s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * o, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * h, t[11] = 0, t[12] = (e + r) * s, t[13] = (i + n) * o, t[14] = (u + a) * h, t[15] = 1, t;
      }, i.lookAt = function (t, e, r, a) {
        var u,
            s,
            o,
            h,
            f,
            l,
            c,
            p,
            d,
            m,
            v = e[0],
            _ = e[1],
            g = e[2],
            E = a[0],
            T = a[1],
            M = a[2],
            y = r[0],
            R = r[1],
            b = r[2];return Math.abs(v - y) < n.EPSILON && Math.abs(_ - R) < n.EPSILON && Math.abs(g - b) < n.EPSILON ? i.identity(t) : (c = v - y, p = _ - R, d = g - b, m = 1 / Math.sqrt(c * c + p * p + d * d), c *= m, p *= m, d *= m, u = T * d - M * p, s = M * c - E * d, o = E * p - T * c, m = Math.sqrt(u * u + s * s + o * o), m ? (m = 1 / m, u *= m, s *= m, o *= m) : (u = 0, s = 0, o = 0), h = p * o - d * s, f = d * u - c * o, l = c * s - p * u, m = Math.sqrt(h * h + f * f + l * l), m ? (m = 1 / m, h *= m, f *= m, l *= m) : (h = 0, f = 0, l = 0), t[0] = u, t[1] = h, t[2] = c, t[3] = 0, t[4] = s, t[5] = f, t[6] = p, t[7] = 0, t[8] = o, t[9] = l, t[10] = d, t[11] = 0, t[12] = -(u * v + s * _ + o * g), t[13] = -(h * v + f * _ + l * g), t[14] = -(c * v + p * _ + d * g), t[15] = 1, t);
      }, i.str = function (t) {
        return "mat4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + ")";
      }, i.frob = function (t) {
        return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2) + Math.pow(t[9], 2) + Math.pow(t[10], 2) + Math.pow(t[11], 2) + Math.pow(t[12], 2) + Math.pow(t[13], 2) + Math.pow(t[14], 2) + Math.pow(t[15], 2));
      }, e.exports = i;
    }, { "./common.js": 2 }], 7: [function (t, e, r) {
      var n = t("./common.js"),
          i = t("./mat3.js"),
          a = t("./vec3.js"),
          u = t("./vec4.js"),
          s = {};s.create = function () {
        var t = new n.ARRAY_TYPE(4);return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t;
      }, s.rotationTo = function () {
        var t = a.create(),
            e = a.fromValues(1, 0, 0),
            r = a.fromValues(0, 1, 0);return function (n, i, u) {
          var o = a.dot(i, u);return -.999999 > o ? (a.cross(t, e, i), a.length(t) < 1e-6 && a.cross(t, r, i), a.normalize(t, t), s.setAxisAngle(n, t, Math.PI), n) : o > .999999 ? (n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n) : (a.cross(t, i, u), n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = 1 + o, s.normalize(n, n));
        };
      }(), s.setAxes = function () {
        var t = i.create();return function (e, r, n, i) {
          return t[0] = n[0], t[3] = n[1], t[6] = n[2], t[1] = i[0], t[4] = i[1], t[7] = i[2], t[2] = -r[0], t[5] = -r[1], t[8] = -r[2], s.normalize(e, s.fromMat3(e, t));
        };
      }(), s.clone = u.clone, s.fromValues = u.fromValues, s.copy = u.copy, s.set = u.set, s.identity = function (t) {
        return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t;
      }, s.setAxisAngle = function (t, e, r) {
        r = .5 * r;var n = Math.sin(r);return t[0] = n * e[0], t[1] = n * e[1], t[2] = n * e[2], t[3] = Math.cos(r), t;
      }, s.add = u.add, s.multiply = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = r[0],
            o = r[1],
            h = r[2],
            f = r[3];return t[0] = n * f + u * s + i * h - a * o, t[1] = i * f + u * o + a * s - n * h, t[2] = a * f + u * h + n * o - i * s, t[3] = u * f - n * s - i * o - a * h, t;
      }, s.mul = s.multiply, s.scale = u.scale, s.rotateX = function (t, e, r) {
        r *= .5;var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = Math.sin(r),
            o = Math.cos(r);return t[0] = n * o + u * s, t[1] = i * o + a * s, t[2] = a * o - i * s, t[3] = u * o - n * s, t;
      }, s.rotateY = function (t, e, r) {
        r *= .5;var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = Math.sin(r),
            o = Math.cos(r);return t[0] = n * o - a * s, t[1] = i * o + u * s, t[2] = a * o + n * s, t[3] = u * o - i * s, t;
      }, s.rotateZ = function (t, e, r) {
        r *= .5;var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3],
            s = Math.sin(r),
            o = Math.cos(r);return t[0] = n * o + i * s, t[1] = i * o - n * s, t[2] = a * o + u * s, t[3] = u * o - a * s, t;
      }, s.calculateW = function (t, e) {
        var r = e[0],
            n = e[1],
            i = e[2];return t[0] = r, t[1] = n, t[2] = i, t[3] = Math.sqrt(Math.abs(1 - r * r - n * n - i * i)), t;
      }, s.dot = u.dot, s.lerp = u.lerp, s.slerp = function (t, e, r, n) {
        var i,
            a,
            u,
            s,
            o,
            h = e[0],
            f = e[1],
            l = e[2],
            c = e[3],
            p = r[0],
            d = r[1],
            m = r[2],
            v = r[3];return a = h * p + f * d + l * m + c * v, 0 > a && (a = -a, p = -p, d = -d, m = -m, v = -v), 1 - a > 1e-6 ? (i = Math.acos(a), u = Math.sin(i), s = Math.sin((1 - n) * i) / u, o = Math.sin(n * i) / u) : (s = 1 - n, o = n), t[0] = s * h + o * p, t[1] = s * f + o * d, t[2] = s * l + o * m, t[3] = s * c + o * v, t;
      }, s.sqlerp = function () {
        var t = s.create(),
            e = s.create();return function (r, n, i, a, u, o) {
          return s.slerp(t, n, u, o), s.slerp(e, i, a, o), s.slerp(r, t, e, 2 * o * (1 - o)), r;
        };
      }(), s.invert = function (t, e) {
        var r = e[0],
            n = e[1],
            i = e[2],
            a = e[3],
            u = r * r + n * n + i * i + a * a,
            s = u ? 1 / u : 0;return t[0] = -r * s, t[1] = -n * s, t[2] = -i * s, t[3] = a * s, t;
      }, s.conjugate = function (t, e) {
        return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = e[3], t;
      }, s.length = u.length, s.len = s.length, s.squaredLength = u.squaredLength, s.sqrLen = s.squaredLength, s.normalize = u.normalize, s.fromMat3 = function (t, e) {
        var r,
            n = e[0] + e[4] + e[8];if (n > 0) r = Math.sqrt(n + 1), t[3] = .5 * r, r = .5 / r, t[0] = (e[5] - e[7]) * r, t[1] = (e[6] - e[2]) * r, t[2] = (e[1] - e[3]) * r;else {
          var i = 0;e[4] > e[0] && (i = 1), e[8] > e[3 * i + i] && (i = 2);var a = (i + 1) % 3,
              u = (i + 2) % 3;r = Math.sqrt(e[3 * i + i] - e[3 * a + a] - e[3 * u + u] + 1), t[i] = .5 * r, r = .5 / r, t[3] = (e[3 * a + u] - e[3 * u + a]) * r, t[a] = (e[3 * a + i] + e[3 * i + a]) * r, t[u] = (e[3 * u + i] + e[3 * i + u]) * r;
        }return t;
      }, s.str = function (t) {
        return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
      }, e.exports = s;
    }, { "./common.js": 2, "./mat3.js": 5, "./vec3.js": 9, "./vec4.js": 10 }], 8: [function (t, e, r) {
      var n = t("./common.js"),
          i = {};i.create = function () {
        var t = new n.ARRAY_TYPE(2);return t[0] = 0, t[1] = 0, t;
      }, i.clone = function (t) {
        var e = new n.ARRAY_TYPE(2);return e[0] = t[0], e[1] = t[1], e;
      }, i.fromValues = function (t, e) {
        var r = new n.ARRAY_TYPE(2);return r[0] = t, r[1] = e, r;
      }, i.copy = function (t, e) {
        return t[0] = e[0], t[1] = e[1], t;
      }, i.set = function (t, e, r) {
        return t[0] = e, t[1] = r, t;
      }, i.add = function (t, e, r) {
        return t[0] = e[0] + r[0], t[1] = e[1] + r[1], t;
      }, i.subtract = function (t, e, r) {
        return t[0] = e[0] - r[0], t[1] = e[1] - r[1], t;
      }, i.sub = i.subtract, i.multiply = function (t, e, r) {
        return t[0] = e[0] * r[0], t[1] = e[1] * r[1], t;
      }, i.mul = i.multiply, i.divide = function (t, e, r) {
        return t[0] = e[0] / r[0], t[1] = e[1] / r[1], t;
      }, i.div = i.divide, i.min = function (t, e, r) {
        return t[0] = Math.min(e[0], r[0]), t[1] = Math.min(e[1], r[1]), t;
      }, i.max = function (t, e, r) {
        return t[0] = Math.max(e[0], r[0]), t[1] = Math.max(e[1], r[1]), t;
      }, i.scale = function (t, e, r) {
        return t[0] = e[0] * r, t[1] = e[1] * r, t;
      }, i.scaleAndAdd = function (t, e, r, n) {
        return t[0] = e[0] + r[0] * n, t[1] = e[1] + r[1] * n, t;
      }, i.distance = function (t, e) {
        var r = e[0] - t[0],
            n = e[1] - t[1];return Math.sqrt(r * r + n * n);
      }, i.dist = i.distance, i.squaredDistance = function (t, e) {
        var r = e[0] - t[0],
            n = e[1] - t[1];return r * r + n * n;
      }, i.sqrDist = i.squaredDistance, i.length = function (t) {
        var e = t[0],
            r = t[1];return Math.sqrt(e * e + r * r);
      }, i.len = i.length, i.squaredLength = function (t) {
        var e = t[0],
            r = t[1];return e * e + r * r;
      }, i.sqrLen = i.squaredLength, i.negate = function (t, e) {
        return t[0] = -e[0], t[1] = -e[1], t;
      }, i.inverse = function (t, e) {
        return t[0] = 1 / e[0], t[1] = 1 / e[1], t;
      }, i.normalize = function (t, e) {
        var r = e[0],
            n = e[1],
            i = r * r + n * n;return i > 0 && (i = 1 / Math.sqrt(i), t[0] = e[0] * i, t[1] = e[1] * i), t;
      }, i.dot = function (t, e) {
        return t[0] * e[0] + t[1] * e[1];
      }, i.cross = function (t, e, r) {
        var n = e[0] * r[1] - e[1] * r[0];return t[0] = t[1] = 0, t[2] = n, t;
      }, i.lerp = function (t, e, r, n) {
        var i = e[0],
            a = e[1];return t[0] = i + n * (r[0] - i), t[1] = a + n * (r[1] - a), t;
      }, i.random = function (t, e) {
        e = e || 1;var r = 2 * n.RANDOM() * Math.PI;return t[0] = Math.cos(r) * e, t[1] = Math.sin(r) * e, t;
      }, i.transformMat2 = function (t, e, r) {
        var n = e[0],
            i = e[1];return t[0] = r[0] * n + r[2] * i, t[1] = r[1] * n + r[3] * i, t;
      }, i.transformMat2d = function (t, e, r) {
        var n = e[0],
            i = e[1];return t[0] = r[0] * n + r[2] * i + r[4], t[1] = r[1] * n + r[3] * i + r[5], t;
      }, i.transformMat3 = function (t, e, r) {
        var n = e[0],
            i = e[1];return t[0] = r[0] * n + r[3] * i + r[6], t[1] = r[1] * n + r[4] * i + r[7], t;
      }, i.transformMat4 = function (t, e, r) {
        var n = e[0],
            i = e[1];return t[0] = r[0] * n + r[4] * i + r[12], t[1] = r[1] * n + r[5] * i + r[13], t;
      }, i.forEach = function () {
        var t = i.create();return function (e, r, n, i, a, u) {
          var s, o;for (r || (r = 2), n || (n = 0), o = i ? Math.min(i * r + n, e.length) : e.length, s = n; o > s; s += r) {
            t[0] = e[s], t[1] = e[s + 1], a(t, t, u), e[s] = t[0], e[s + 1] = t[1];
          }return e;
        };
      }(), i.str = function (t) {
        return "vec2(" + t[0] + ", " + t[1] + ")";
      }, e.exports = i;
    }, { "./common.js": 2 }], 9: [function (t, e, r) {
      var n = t("./common.js"),
          i = {};i.create = function () {
        var t = new n.ARRAY_TYPE(3);return t[0] = 0, t[1] = 0, t[2] = 0, t;
      }, i.clone = function (t) {
        var e = new n.ARRAY_TYPE(3);return e[0] = t[0], e[1] = t[1], e[2] = t[2], e;
      }, i.fromValues = function (t, e, r) {
        var i = new n.ARRAY_TYPE(3);return i[0] = t, i[1] = e, i[2] = r, i;
      }, i.copy = function (t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t;
      }, i.set = function (t, e, r, n) {
        return t[0] = e, t[1] = r, t[2] = n, t;
      }, i.add = function (t, e, r) {
        return t[0] = e[0] + r[0], t[1] = e[1] + r[1], t[2] = e[2] + r[2], t;
      }, i.subtract = function (t, e, r) {
        return t[0] = e[0] - r[0], t[1] = e[1] - r[1], t[2] = e[2] - r[2], t;
      }, i.sub = i.subtract, i.multiply = function (t, e, r) {
        return t[0] = e[0] * r[0], t[1] = e[1] * r[1], t[2] = e[2] * r[2], t;
      }, i.mul = i.multiply, i.divide = function (t, e, r) {
        return t[0] = e[0] / r[0], t[1] = e[1] / r[1], t[2] = e[2] / r[2], t;
      }, i.div = i.divide, i.min = function (t, e, r) {
        return t[0] = Math.min(e[0], r[0]), t[1] = Math.min(e[1], r[1]), t[2] = Math.min(e[2], r[2]), t;
      }, i.max = function (t, e, r) {
        return t[0] = Math.max(e[0], r[0]), t[1] = Math.max(e[1], r[1]), t[2] = Math.max(e[2], r[2]), t;
      }, i.scale = function (t, e, r) {
        return t[0] = e[0] * r, t[1] = e[1] * r, t[2] = e[2] * r, t;
      }, i.scaleAndAdd = function (t, e, r, n) {
        return t[0] = e[0] + r[0] * n, t[1] = e[1] + r[1] * n, t[2] = e[2] + r[2] * n, t;
      }, i.distance = function (t, e) {
        var r = e[0] - t[0],
            n = e[1] - t[1],
            i = e[2] - t[2];return Math.sqrt(r * r + n * n + i * i);
      }, i.dist = i.distance, i.squaredDistance = function (t, e) {
        var r = e[0] - t[0],
            n = e[1] - t[1],
            i = e[2] - t[2];return r * r + n * n + i * i;
      }, i.sqrDist = i.squaredDistance, i.length = function (t) {
        var e = t[0],
            r = t[1],
            n = t[2];return Math.sqrt(e * e + r * r + n * n);
      }, i.len = i.length, i.squaredLength = function (t) {
        var e = t[0],
            r = t[1],
            n = t[2];return e * e + r * r + n * n;
      }, i.sqrLen = i.squaredLength, i.negate = function (t, e) {
        return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t;
      }, i.inverse = function (t, e) {
        return t[0] = 1 / e[0], t[1] = 1 / e[1], t[2] = 1 / e[2], t;
      }, i.normalize = function (t, e) {
        var r = e[0],
            n = e[1],
            i = e[2],
            a = r * r + n * n + i * i;return a > 0 && (a = 1 / Math.sqrt(a), t[0] = e[0] * a, t[1] = e[1] * a, t[2] = e[2] * a), t;
      }, i.dot = function (t, e) {
        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
      }, i.cross = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = r[0],
            s = r[1],
            o = r[2];return t[0] = i * o - a * s, t[1] = a * u - n * o, t[2] = n * s - i * u, t;
      }, i.lerp = function (t, e, r, n) {
        var i = e[0],
            a = e[1],
            u = e[2];return t[0] = i + n * (r[0] - i), t[1] = a + n * (r[1] - a), t[2] = u + n * (r[2] - u), t;
      }, i.hermite = function (t, e, r, n, i, a) {
        var u = a * a,
            s = u * (2 * a - 3) + 1,
            o = u * (a - 2) + a,
            h = u * (a - 1),
            f = u * (3 - 2 * a);return t[0] = e[0] * s + r[0] * o + n[0] * h + i[0] * f, t[1] = e[1] * s + r[1] * o + n[1] * h + i[1] * f, t[2] = e[2] * s + r[2] * o + n[2] * h + i[2] * f, t;
      }, i.bezier = function (t, e, r, n, i, a) {
        var u = 1 - a,
            s = u * u,
            o = a * a,
            h = s * u,
            f = 3 * a * s,
            l = 3 * o * u,
            c = o * a;return t[0] = e[0] * h + r[0] * f + n[0] * l + i[0] * c, t[1] = e[1] * h + r[1] * f + n[1] * l + i[1] * c, t[2] = e[2] * h + r[2] * f + n[2] * l + i[2] * c, t;
      }, i.random = function (t, e) {
        e = e || 1;var r = 2 * n.RANDOM() * Math.PI,
            i = 2 * n.RANDOM() - 1,
            a = Math.sqrt(1 - i * i) * e;return t[0] = Math.cos(r) * a, t[1] = Math.sin(r) * a, t[2] = i * e, t;
      }, i.transformMat4 = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = r[3] * n + r[7] * i + r[11] * a + r[15];return u = u || 1, t[0] = (r[0] * n + r[4] * i + r[8] * a + r[12]) / u, t[1] = (r[1] * n + r[5] * i + r[9] * a + r[13]) / u, t[2] = (r[2] * n + r[6] * i + r[10] * a + r[14]) / u, t;
      }, i.transformMat3 = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2];return t[0] = n * r[0] + i * r[3] + a * r[6], t[1] = n * r[1] + i * r[4] + a * r[7], t[2] = n * r[2] + i * r[5] + a * r[8], t;
      }, i.transformQuat = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = r[0],
            s = r[1],
            o = r[2],
            h = r[3],
            f = h * n + s * a - o * i,
            l = h * i + o * n - u * a,
            c = h * a + u * i - s * n,
            p = -u * n - s * i - o * a;return t[0] = f * h + p * -u + l * -o - c * -s, t[1] = l * h + p * -s + c * -u - f * -o, t[2] = c * h + p * -o + f * -s - l * -u, t;
      }, i.rotateX = function (t, e, r, n) {
        var i = [],
            a = [];return i[0] = e[0] - r[0], i[1] = e[1] - r[1], i[2] = e[2] - r[2], a[0] = i[0], a[1] = i[1] * Math.cos(n) - i[2] * Math.sin(n), a[2] = i[1] * Math.sin(n) + i[2] * Math.cos(n), t[0] = a[0] + r[0], t[1] = a[1] + r[1], t[2] = a[2] + r[2], t;
      }, i.rotateY = function (t, e, r, n) {
        var i = [],
            a = [];return i[0] = e[0] - r[0], i[1] = e[1] - r[1], i[2] = e[2] - r[2], a[0] = i[2] * Math.sin(n) + i[0] * Math.cos(n), a[1] = i[1], a[2] = i[2] * Math.cos(n) - i[0] * Math.sin(n), t[0] = a[0] + r[0], t[1] = a[1] + r[1], t[2] = a[2] + r[2], t;
      }, i.rotateZ = function (t, e, r, n) {
        var i = [],
            a = [];return i[0] = e[0] - r[0], i[1] = e[1] - r[1], i[2] = e[2] - r[2], a[0] = i[0] * Math.cos(n) - i[1] * Math.sin(n), a[1] = i[0] * Math.sin(n) + i[1] * Math.cos(n), a[2] = i[2], t[0] = a[0] + r[0], t[1] = a[1] + r[1], t[2] = a[2] + r[2], t;
      }, i.forEach = function () {
        var t = i.create();return function (e, r, n, i, a, u) {
          var s, o;for (r || (r = 3), n || (n = 0), o = i ? Math.min(i * r + n, e.length) : e.length, s = n; o > s; s += r) {
            t[0] = e[s], t[1] = e[s + 1], t[2] = e[s + 2], a(t, t, u), e[s] = t[0], e[s + 1] = t[1], e[s + 2] = t[2];
          }return e;
        };
      }(), i.angle = function (t, e) {
        var r = i.fromValues(t[0], t[1], t[2]),
            n = i.fromValues(e[0], e[1], e[2]);i.normalize(r, r), i.normalize(n, n);var a = i.dot(r, n);return a > 1 ? 0 : Math.acos(a);
      }, i.str = function (t) {
        return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
      }, e.exports = i;
    }, { "./common.js": 2 }], 10: [function (t, e, r) {
      var n = t("./common.js"),
          i = {};i.create = function () {
        var t = new n.ARRAY_TYPE(4);return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t;
      }, i.clone = function (t) {
        var e = new n.ARRAY_TYPE(4);return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
      }, i.fromValues = function (t, e, r, i) {
        var a = new n.ARRAY_TYPE(4);return a[0] = t, a[1] = e, a[2] = r, a[3] = i, a;
      }, i.copy = function (t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
      }, i.set = function (t, e, r, n, i) {
        return t[0] = e, t[1] = r, t[2] = n, t[3] = i, t;
      }, i.add = function (t, e, r) {
        return t[0] = e[0] + r[0], t[1] = e[1] + r[1], t[2] = e[2] + r[2], t[3] = e[3] + r[3], t;
      }, i.subtract = function (t, e, r) {
        return t[0] = e[0] - r[0], t[1] = e[1] - r[1], t[2] = e[2] - r[2], t[3] = e[3] - r[3], t;
      }, i.sub = i.subtract, i.multiply = function (t, e, r) {
        return t[0] = e[0] * r[0], t[1] = e[1] * r[1], t[2] = e[2] * r[2], t[3] = e[3] * r[3], t;
      }, i.mul = i.multiply, i.divide = function (t, e, r) {
        return t[0] = e[0] / r[0], t[1] = e[1] / r[1], t[2] = e[2] / r[2], t[3] = e[3] / r[3], t;
      }, i.div = i.divide, i.min = function (t, e, r) {
        return t[0] = Math.min(e[0], r[0]), t[1] = Math.min(e[1], r[1]), t[2] = Math.min(e[2], r[2]), t[3] = Math.min(e[3], r[3]), t;
      }, i.max = function (t, e, r) {
        return t[0] = Math.max(e[0], r[0]), t[1] = Math.max(e[1], r[1]), t[2] = Math.max(e[2], r[2]), t[3] = Math.max(e[3], r[3]), t;
      }, i.scale = function (t, e, r) {
        return t[0] = e[0] * r, t[1] = e[1] * r, t[2] = e[2] * r, t[3] = e[3] * r, t;
      }, i.scaleAndAdd = function (t, e, r, n) {
        return t[0] = e[0] + r[0] * n, t[1] = e[1] + r[1] * n, t[2] = e[2] + r[2] * n, t[3] = e[3] + r[3] * n, t;
      }, i.distance = function (t, e) {
        var r = e[0] - t[0],
            n = e[1] - t[1],
            i = e[2] - t[2],
            a = e[3] - t[3];return Math.sqrt(r * r + n * n + i * i + a * a);
      }, i.dist = i.distance, i.squaredDistance = function (t, e) {
        var r = e[0] - t[0],
            n = e[1] - t[1],
            i = e[2] - t[2],
            a = e[3] - t[3];return r * r + n * n + i * i + a * a;
      }, i.sqrDist = i.squaredDistance, i.length = function (t) {
        var e = t[0],
            r = t[1],
            n = t[2],
            i = t[3];return Math.sqrt(e * e + r * r + n * n + i * i);
      }, i.len = i.length, i.squaredLength = function (t) {
        var e = t[0],
            r = t[1],
            n = t[2],
            i = t[3];
        return e * e + r * r + n * n + i * i;
      }, i.sqrLen = i.squaredLength, i.negate = function (t, e) {
        return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t;
      }, i.inverse = function (t, e) {
        return t[0] = 1 / e[0], t[1] = 1 / e[1], t[2] = 1 / e[2], t[3] = 1 / e[3], t;
      }, i.normalize = function (t, e) {
        var r = e[0],
            n = e[1],
            i = e[2],
            a = e[3],
            u = r * r + n * n + i * i + a * a;return u > 0 && (u = 1 / Math.sqrt(u), t[0] = r * u, t[1] = n * u, t[2] = i * u, t[3] = a * u), t;
      }, i.dot = function (t, e) {
        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3];
      }, i.lerp = function (t, e, r, n) {
        var i = e[0],
            a = e[1],
            u = e[2],
            s = e[3];return t[0] = i + n * (r[0] - i), t[1] = a + n * (r[1] - a), t[2] = u + n * (r[2] - u), t[3] = s + n * (r[3] - s), t;
      }, i.random = function (t, e) {
        return e = e || 1, t[0] = n.RANDOM(), t[1] = n.RANDOM(), t[2] = n.RANDOM(), t[3] = n.RANDOM(), i.normalize(t, t), i.scale(t, t, e), t;
      }, i.transformMat4 = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = e[3];return t[0] = r[0] * n + r[4] * i + r[8] * a + r[12] * u, t[1] = r[1] * n + r[5] * i + r[9] * a + r[13] * u, t[2] = r[2] * n + r[6] * i + r[10] * a + r[14] * u, t[3] = r[3] * n + r[7] * i + r[11] * a + r[15] * u, t;
      }, i.transformQuat = function (t, e, r) {
        var n = e[0],
            i = e[1],
            a = e[2],
            u = r[0],
            s = r[1],
            o = r[2],
            h = r[3],
            f = h * n + s * a - o * i,
            l = h * i + o * n - u * a,
            c = h * a + u * i - s * n,
            p = -u * n - s * i - o * a;return t[0] = f * h + p * -u + l * -o - c * -s, t[1] = l * h + p * -s + c * -u - f * -o, t[2] = c * h + p * -o + f * -s - l * -u, t[3] = e[3], t;
      }, i.forEach = function () {
        var t = i.create();return function (e, r, n, i, a, u) {
          var s, o;for (r || (r = 4), n || (n = 0), o = i ? Math.min(i * r + n, e.length) : e.length, s = n; o > s; s += r) {
            t[0] = e[s], t[1] = e[s + 1], t[2] = e[s + 2], t[3] = e[s + 3], a(t, t, u), e[s] = t[0], e[s + 1] = t[1], e[s + 2] = t[2], e[s + 3] = t[3];
          }return e;
        };
      }(), i.str = function (t) {
        return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
      }, e.exports = i;
    }, { "./common.js": 2 }], 11: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }var a = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }(),
          u = t("gl-matrix"),
          s = n(u),
          o = t("./alfrid/GLTool"),
          h = n(o),
          f = t("./alfrid/GLShader"),
          l = n(f),
          c = t("./alfrid/GLTexture"),
          p = n(c),
          d = t("./alfrid/Mesh"),
          m = n(d),
          v = t("./alfrid/Geom"),
          _ = n(v),
          g = t("./alfrid/Batch"),
          E = n(g),
          T = t("./alfrid/FrameBuffer"),
          M = n(T),
          y = t("./alfrid/tools/Scheduler"),
          R = n(y),
          b = t("./alfrid/tools/EventDispatcher"),
          w = n(b),
          A = t("./alfrid/tools/EaseNumber"),
          x = n(A),
          P = t("./alfrid/tools/OrbitalControl"),
          L = n(P),
          k = t("./alfrid/cameras/Camera"),
          O = n(k),
          D = t("./alfrid/cameras/CameraOrtho"),
          S = n(D),
          F = t("./alfrid/cameras/CameraPerspective"),
          I = n(F),
          N = t("./alfrid/loaders/BinaryLoader"),
          j = n(N),
          C = t("./alfrid/loaders/ObjLoader"),
          U = n(C),
          B = t("./alfrid/helpers/BatchCopy"),
          G = n(B),
          Y = "1.0.0",
          X = function () {
        function t() {
          i(this, t), this.glm = s["default"], this.GL = h["default"], this.GLTool = h["default"], this.GLShader = l["default"], this.GLTexture = p["default"], this.Mesh = m["default"], this.Geom = _["default"], this.Batch = E["default"], this.FrameBuffer = M["default"], this.Scheduler = R["default"], this.EventDispatcher = w["default"], this.EaseNumber = x["default"], this.Camera = O["default"], this.CameraOrtho = S["default"], this.CameraPerspective = I["default"], this.OrbitalControl = L["default"], this.BinaryLoader = j["default"], this.ObjLoader = U["default"], this.BatchCopy = G["default"];for (var e in s["default"]) {
            s["default"][e] && (window[e] = s["default"][e]);
          }
        }return a(t, [{ key: "log", value: function value() {
            navigator.userAgent.indexOf("Chrome") > -1 ? console.log("%clib alfrid : VERSION " + Y, "background: #193441; color: #FCFFF5") : console.log("lib alfrid : VERSION ", Y), console.log("%cClasses : ", "color: #193441");for (var t in this) {
              this[t] && console.log("%c - " + t, "color: #3E606F");
            }
          } }]), t;
      }(),
          q = new X();e.exports = q;
    }, { "./alfrid/Batch": 12, "./alfrid/FrameBuffer": 13, "./alfrid/GLShader": 14, "./alfrid/GLTexture": 15, "./alfrid/GLTool": 16, "./alfrid/Geom": 17, "./alfrid/Mesh": 18, "./alfrid/cameras/Camera": 19, "./alfrid/cameras/CameraOrtho": 20, "./alfrid/cameras/CameraPerspective": 21, "./alfrid/helpers/BatchCopy": 22, "./alfrid/loaders/BinaryLoader": 23, "./alfrid/loaders/ObjLoader": 24, "./alfrid/tools/EaseNumber": 25, "./alfrid/tools/EventDispatcher": 26, "./alfrid/tools/OrbitalControl": 27, "./alfrid/tools/Scheduler": 28, "gl-matrix": 1 }], 12: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }var a = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }();Object.defineProperty(r, "__esModule", { value: !0 });var u = t("./GLTool"),
          s = n(u),
          o = function () {
        function t(e, r) {
          i(this, t), this._mesh = e, this._shader = r;
        }return a(t, [{ key: "draw", value: function value() {
            this._shader.bind(), s["default"].draw(this.mesh);
          } }, { key: "mesh", get: function get() {
            return this._mesh;
          } }, { key: "shader", get: function get() {
            return this._shader;
          } }]), t;
      }();r["default"] = o;
    }, { "./GLTool": 16 }], 13: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }var a = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }();Object.defineProperty(r, "__esModule", { value: !0 });var u = t("./GLTool"),
          s = n(u),
          o = t("./GLTexture"),
          h = n(o),
          f = function f(t) {
        return 0 !== t && !(t & t - 1);
      },
          l = void 0,
          c = void 0,
          p = function () {
        function t(e, r) {
          var n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2];i(this, t), l = s["default"].gl, c = s["default"].checkExtension("WEBGL_depth_texture"), this.width = e, this.height = r, this.magFilter = n.magFilter || l.LINEAR, this.minFilter = n.minFilter || l.LINEAR, this.wrapS = n.wrapS || l.MIRRORED_REPEAT, this.wrapT = n.wrapT || l.MIRRORED_REPEAT, this.useDepth = n.useDepth || !0, this.useStencil = n.useStencil || !1, f(this.width) && f(this.height) || (this.wrapS = this.wrapT = l.CLAMP_TO_EDGE, this.minFilter === l.LINEAR_MIPMAP_NEAREST && (this.minFilter = l.LINEAR)), this._init();
        }return a(t, [{ key: "_init", value: function value() {
            this.texture = l.createTexture(), this.glTexture = new h["default"](this.texture, !0), this.depthTexture = l.createTexture(), this.glDepthTexture = new h["default"](this.depthTexture, !0), this.frameBuffer = l.createFramebuffer(), l.bindFramebuffer(l.FRAMEBUFFER, this.frameBuffer), l.bindTexture(l.TEXTURE_2D, this.texture), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, this.magFilter), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, this.minFilter), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, this.wrapS), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, this.wrapT), l.texImage2D(l.TEXTURE_2D, 0, l.RGBA, this.width, this.height, 0, l.RGBA, l.FLOAT, null), c && (l.bindTexture(l.TEXTURE_2D, this.depthTexture), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, this.magFilter), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, this.minFilter), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, this.wrapS), l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, this.wrapT), l.texImage2D(l.TEXTURE_2D, 0, l.DEPTH_COMPONENT, this.width, this.height, 0, l.DEPTH_COMPONENT, l.UNSIGNED_SHORT, null)), l.framebufferTexture2D(l.FRAMEBUFFER, l.COLOR_ATTACHMENT0, l.TEXTURE_2D, this.texture, 0), l.framebufferTexture2D(l.FRAMEBUFFER, l.DEPTH_ATTACHMENT, l.TEXTURE_2D, this.depthTexture, 0), this.minFilter === l.LINEAR_MIPMAP_NEAREST && (l.bindTexture(l.TEXTURE_2D, this.texture), l.generateMipmap(l.TEXTURE_2D)), l.bindTexture(l.TEXTURE_2D, null), l.bindRenderbuffer(l.RENDERBUFFER, null), l.bindFramebuffer(l.FRAMEBUFFER, null);
          } }, { key: "bind", value: function value() {
            s["default"].viewport(0, 0, this.width, this.height), l.bindFramebuffer(l.FRAMEBUFFER, this.frameBuffer);
          } }, { key: "unbind", value: function value() {
            l.bindFramebuffer(l.FRAMEBUFFER, null);
          } }, { key: "getTexture", value: function value() {
            return this.glTexture;
          } }, { key: "getDepthTexture", value: function value() {
            return this.glDepthTexture;
          } }, { key: "minFilter", value: function value(t) {
            return t !== l.LINEAR && t !== l.NEAREST && t !== l.LINEAR_MIPMAP_NEAREST ? this : (this.minFilter = t, this);
          } }, { key: "magFilter", value: function value(t) {
            return t !== l.LINEAR && t !== l.NEAREST && t !== l.LINEAR_MIPMAP_NEAREST ? this : (this.magFilter = t, this);
          } }, { key: "wrapS", value: function value(t) {
            return t !== l.CLAMP_TO_EDGE && t !== l.REPEAT && t !== l.MIRRORED_REPEAT ? this : (this.wrapS = t, this);
          } }, { key: "wrapT", value: function value(t) {
            return t !== l.CLAMP_TO_EDGE && t !== l.REPEAT && t !== l.MIRRORED_REPEAT ? this : (this.wrapT = t, this);
          } }]), t;
      }();r["default"] = p;
    }, { "./GLTexture": 15, "./GLTool": 16 }], 14: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }var a = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }();Object.defineProperty(r, "__esModule", { value: !0 });var u = t("./GLTool"),
          s = n(u),
          o = function o(t) {
        for (var e = t.split("\n"), r = 0; r < e.length; r++) {
          e[r] = r + 1 + ": " + e[r];
        }return e.join("\n");
      },
          h = void 0,
          f = "#define GLSLIFY 1\n// basic.vert\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n    vTextureCoord = aTextureCoord;\n}",
          l = "#define GLSLIFY 1\n// basic.frag\n\n#define SHADER_NAME BASIC_FRAGMENT\n\nprecision highp float;\nvarying vec2 vTextureCoord;\nuniform float time;\n// uniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = vec4(vTextureCoord, sin(time) * .5 + .5, 1.0);\n}",
          c = function () {
        function t() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? f : arguments[0],
              r = arguments.length <= 1 || void 0 === arguments[1] ? l : arguments[1];i(this, t), h = s["default"].gl, this.parameters = [], this.uniformValues = {}, this.uniformTextures = [], e || (e = f), r || (r = f);var n = this._createShaderProgram(e, !0),
              a = this._createShaderProgram(r, !1);this._attachShaderProgram(n, a);
        }return a(t, [{ key: "bind", value: function value() {
            h.useProgram(this.shaderProgram), s["default"].useShader(this), this.uniformTextures = [];
          } }, { key: "uniform", value: function value(t, e, r) {
            for (var n = !1, i = void 0, a = 0; a < this.parameters.length; a++) {
              if (i = this.parameters[a], i.name === t) {
                i.value = r, n = !0;break;
              }
            }n ? this.shaderProgram[t] = i.uniformLoc : (this.shaderProgram[t] = h.getUniformLocation(this.shaderProgram, t), this.parameters.push({ name: t, type: e, value: r, uniformLoc: this.shaderProgram[t] })), -1 === e.indexOf("Matrix") ? h[e](this.shaderProgram[t], r) : (h[e](this.shaderProgram[t], !1, r), this.uniformValues[t] = r);
          } }, { key: "_createShaderProgram", value: function value(t, e) {
            var r = e ? s["default"].VERTEX_SHADER : s["default"].FRAGMENT_SHADER,
                n = h.createShader(r);return h.shaderSource(n, t), h.compileShader(n), h.getShaderParameter(n, h.COMPILE_STATUS) ? n : (console.warn("Error in Shader : ", h.getShaderInfoLog(n)), console.log(o(t)), null);
          } }, { key: "_attachShaderProgram", value: function value(t, e) {
            this.shaderProgram = h.createProgram(), h.attachShader(this.shaderProgram, t), h.attachShader(this.shaderProgram, e), h.linkProgram(this.shaderProgram);
          } }]), t;
      }();r["default"] = c;
    }, { "./GLTool": 16 }], 15: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }var a = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }();Object.defineProperty(r, "__esModule", { value: !0 });var u = t("./GLTool"),
          s = n(u),
          o = function o(t) {
        return 0 !== t && !(t & t - 1);
      },
          h = function h(t) {
        var e = t.width || t.videoWidth,
            r = t.height || t.videoHeight;return e && r ? o(e) && o(r) : !1;
      },
          f = void 0,
          l = function () {
        function t(e) {
          var r = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
              n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2];if (i(this, t), f = s["default"].gl, r) this.texture = e;else {
            this._mSource = e, this.texture = f.createTexture(), this._isVideo = "VIDEO" === e.tagName, this.magFilter = n.magFilter || f.LINEAR, this.minFilter = n.minFilter || f.LINEAR_MIPMAP_NEAREST, this.wrapS = n.wrapS || f.MIRRORED_REPEAT, this.wrapT = n.wrapT || f.MIRRORED_REPEAT;var a = e.width || e.videoWidth;a ? h(e) || (this.wrapS = this.wrapT = f.CLAMP_TO_EDGE, this.minFilter === f.LINEAR_MIPMAP_NEAREST && (this.minFilter = f.LINEAR)) : (this.wrapS = this.wrapT = f.CLAMP_TO_EDGE, this.minFilter === f.LINEAR_MIPMAP_NEAREST && (this.minFilter = f.LINEAR)), f.bindTexture(f.TEXTURE_2D, this.texture), f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, !0), e.exposure ? f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, e.shape[0], e.shape[1], 0, f.RGBA, f.FLOAT, e.data) : f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, f.RGBA, f.UNSIGNED_BYTE, e), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, this.magFilter), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, this.minFilter), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, this.wrapS), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, this.wrapT), this.minFilter === f.LINEAR_MIPMAP_NEAREST && f.generateMipmap(f.TEXTURE_2D), f.bindTexture(f.TEXTURE_2D, null);
          }
        }return a(t, [{ key: "minFilter", value: function value(t) {
            return t !== f.LINEAR && t !== f.NEAREST && t !== f.LINEAR_MIPMAP_NEAREST ? this : (this.minFilter = t, this);
          } }, { key: "magFilter", value: function value(t) {
            return t !== f.LINEAR && t !== f.NEAREST && t !== f.LINEAR_MIPMAP_NEAREST ? this : (this.magFilter = t, this);
          } }, { key: "wrapS", value: function value(t) {
            return t !== f.CLAMP_TO_EDGE && t !== f.REPEAT && t !== f.MIRRORED_REPEAT ? this : (this.wrapS = t, this);
          } }, { key: "wrapT", value: function value(t) {
            return t !== f.CLAMP_TO_EDGE && t !== f.REPEAT && t !== f.MIRRORED_REPEAT ? this : (this.wrapT = t, this);
          } }, { key: "updateTexture", value: function value(t) {
            t && (this._mSource = t), f.bindTexture(f.TEXTURE_2D, this.texture), f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, !0), f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, f.RGBA, f.UNSIGNED_BYTE, this._mSource), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, this.magFilter), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, this.minFilter), this.minFilter === f.LINEAR_MIPMAP_NEAREST && f.generateMipmap(f.TEXTURE_2D), f.bindTexture(f.TEXTURE_2D, null);
          } }, { key: "bind", value: function value(t) {
            void 0 === t && (t = 0), s["default"].shader && (f.activeTexture(f.TEXTURE0 + t), f.bindTexture(f.TEXTURE_2D, this.texture), f.uniform1i(s["default"].shader.uniformTextures[t], t), this._bindIndex = t);
          } }]), t;
      }();r["default"] = l;
    }, { "./GLTool": 16 }], 16: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }var a = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }();Object.defineProperty(r, "__esModule", { value: !0 });var u = t("gl-matrix"),
          s = n(u),
          o = function () {
        function t() {
          i(this, t), this.canvas, this._viewport = [0, 0, 0, 0], this._enabledVertexAttribute = [], this.identityMatrix = s["default"].mat4.create(), this._normalMatrix = s["default"].mat3.create(), this._inverseViewMatrix = s["default"].mat4.create(), this._matrix = s["default"].mat4.create(), s["default"].mat4.identity(this.identityMatrix, this.identityMatrix);
        }return a(t, [{ key: "init", value: function value(t) {
            var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];void 0 !== this.canvas && this.destroy(), this.canvas = t, this.setSize(window.innerWidth, window.innerHeight), this.gl = this.canvas.getContext("webgl", e) || this.canvas.getContext("experimental-webgl", e);var r = ["EXT_shader_texture_lod", "EXT_shader_texture_lod", "EXT_sRGB", "EXT_frag_depth", "OES_texture_float", "OES_texture_half_float", "OES_texture_float_linear", "OES_texture_half_float_linear", "OES_standard_derivatives", "WEBGL_depth_texture"];this.extensions = {};for (var n = 0; n < r.length; n++) {
              this.extensions[r[n]] = this.gl.getExtension(r[n]);
            }var i = this.gl;this.VERTEX_SHADER = i.VERTEX_SHADER, this.FRAGMENT_SHADER = i.FRAGMENT_SHADER, this.COMPILE_STATUS = i.COMPILE_STATUS, this.DEPTH_TEST = i.DEPTH_TEST, this.CULL_FACE = i.CULL_FACE, this.BLEND = i.BLEND, this.POINTS = i.POINTS, this.LINES = i.LINES, this.TRIANGLES = i.TRIANGLES, this.LINEAR = i.LINEAR, this.NEAREST = i.NEAREST, this.LINEAR_MIPMAP_NEAREST = i.LINEAR_MIPMAP_NEAREST, this.MIRRORED_REPEAT = i.MIRRORED_REPEAT, this.CLAMP_TO_EDGE = i.CLAMP_TO_EDGE, this.enable(this.DEPTH_TEST), this.enable(this.CULL_FACE), this.enable(this.BLEND);
          } }, { key: "setViewport", value: function value(t, e, r, n) {
            var i = !1;t !== this._viewport[0] && (i = !0), e !== this._viewport[1] && (i = !0), r !== this._viewport[2] && (i = !0), n !== this._viewport[3] && (i = !0), i && (this.gl.viewport(t, e, r, n), this._viewport = [t, e, r, n]);
          } }, { key: "clear", value: function value(t, e, r, n) {
            this.gl.clearColor(t, e, r, n), this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
          } }, { key: "setMatrices", value: function value(t) {
            this.camera = t, this.rotate(this.identityMatrix);
          } }, { key: "useShader", value: function value(t) {
            this.shader = t, this.shaderProgram = this.shader.shaderProgram;
          } }, { key: "rotate", value: function value(t) {
            s["default"].mat4.copy(this._matrix, t), s["default"].mat4.multiply(this._matrix, this.camera.matrix, this._matrix), s["default"].mat3.fromMat4(this._normalMatrix, this._matrix), s["default"].mat3.invert(this._normalMatrix, this._normalMatrix), s["default"].mat3.transpose(this._normalMatrix, this._normalMatrix), s["default"].mat3.fromMat4(this._inverseViewMatrix, this._matrix), s["default"].mat3.invert(this._inverseViewMatrix, this._inverseViewMatrix);
          } }, { key: "draw", value: function value(t) {
            function e(t, e, r) {
              return void 0 === e.cacheAttribLoc && (e.cacheAttribLoc = {}), void 0 === e.cacheAttribLoc[r] && (e.cacheAttribLoc[r] = t.getAttribLocation(e, r)), e.cacheAttribLoc[r];
            }for (var r = 0; r < t.attributes.length; r++) {
              var n = t.attributes[r];this.gl.bindBuffer(this.gl.ARRAY_BUFFER, n.buffer);var i = e(this.gl, this.shaderProgram, n.name);this.gl.vertexAttribPointer(i, n.itemSize, this.gl.FLOAT, !1, 0, 0), -1 === this._enabledVertexAttribute.indexOf(i) && (this.gl.enableVertexAttribArray(i), this._enabledVertexAttribute.push(i));
            }this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, t.iBuffer), this.shader.uniform("uProjectionMatrix", "uniformMatrix4fv", this.camera.projection), this.shader.uniform("uModelMatrix", "uniformMatrix4fv", this.identityMatrix), this.shader.uniform("uViewMatrix", "uniformMatrix4fv", this.camera.matrix), this.shader.uniform("uNormalMatrix", "uniformMatrix3fv", this._normalMatrix), this.shader.uniform("uViewMatrixInverse", "uniformMatrix4fv", this._inverseViewMatrix), t.drawType === this.gl.POINTS ? this.gl.drawArrays(t.drawType, 0, t.vertexSize) : this.gl.drawElements(t.drawType, t.iBuffer.numItems, this.gl.UNSIGNED_SHORT, 0);
          } }, { key: "setSize", value: function value(t, e) {
            this._width = t, this._height = e, this.canvas.width = this._width, this.canvas.height = this._height, this._aspectRatio = this._width / this._height;
          } }, { key: "showExtensions", value: function value() {
            console.log("Extensions : ", this.extensions);for (var t in this.extensions) {
              this.extensions[t] && console.log(t, ":", this.extensions[t]);
            }
          } }, { key: "checkExtension", value: function value(t) {
            return !!this.extensions[t];
          } }, { key: "getExtension", value: function value(t) {
            return this.extensions[t];
          } }, { key: "enableAlphaBlending", value: function value() {
            this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
          } }, { key: "enableAdditiveBlending", value: function value() {
            this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
          } }, { key: "enable", value: function value(t) {
            this.gl.enable(t);
          } }, { key: "disable", value: function value(t) {
            this.gl.disable(t);
          } }, { key: "viewport", value: function value(t, e, r, n) {
            this.setViewport(t, e, r, n);
          } }, { key: "destroy", value: function value() {
            if (this.canvas = null, this.canvas.parentNode) try {
              this.canvas.parentNode.removeChild(this.canvas);
            } catch (t) {
              console.log("Error : ", t);
            }
          } }, { key: "width", get: function get() {
            return this._width;
          } }, { key: "height", get: function get() {
            return this._height;
          } }, { key: "aspectRatio", get: function get() {
            return this._aspectRatio;
          } }]), t;
      }(),
          h = new o();r["default"] = h;
    }, { "gl-matrix": 1 }], 17: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }Object.defineProperty(r, "__esModule", { value: !0 });var i = t("./Mesh"),
          a = n(i),
          u = {};u.plane = function (t, e, r) {
        for (var n = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3], i = arguments.length <= 4 || void 0 === arguments[4] ? "xy" : arguments[4], u = arguments.length <= 5 || void 0 === arguments[5] ? 4 : arguments[5], s = [], o = [], h = [], f = [], l = t / r, c = e / r, p = 1 / r, d = 0, m = .5 * -t, v = .5 * -e, _ = 0; r > _; _++) {
          for (var g = 0; r > g; g++) {
            var E = l * _ + m,
                T = c * g + v;"xz" === i ? (s.push([E, 0, -T + c]), s.push([E + l, 0, -T + c]), s.push([E + l, 0, -T]), s.push([E, 0, -T]), f.push([0, 1, 0]), f.push([0, 1, 0]), f.push([0, 1, 0]), f.push([0, 1, 0])) : "yz" === i ? (s.push([0, E, T]), s.push([0, E + l, T]), s.push([0, E + l, T + c]), s.push([0, E, T + c]), f.push([1, 0, 0]), f.push([1, 0, 0]), f.push([1, 0, 0]), f.push([1, 0, 0])) : (s.push([E, T, 0]), s.push([E + l, T, 0]), s.push([E + l, T + c, 0]), s.push([E, T + c, 0]), f.push([0, 0, 1]), f.push([0, 0, 1]), f.push([0, 0, 1]), f.push([0, 0, 1]));var M = _ / r,
                y = g / r;o.push([M, y]), o.push([M + p, y]), o.push([M + p, y + p]), o.push([M, y + p]), h.push(4 * d + 0), h.push(4 * d + 1), h.push(4 * d + 2), h.push(4 * d + 0), h.push(4 * d + 2), h.push(4 * d + 3), d++;
          }
        }var R = new a["default"](u);return R.bufferVertex(s), R.bufferTexCoords(o), R.bufferIndices(h), n && R.bufferNormal(f), R;
      }, u.sphere = function (t, e) {
        for (var r = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2], n = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3], i = arguments.length <= 4 || void 0 === arguments[4] ? 4 : arguments[4], u = [], s = [], o = [], h = [], f = 0, l = 1 / e, c = function c(r, n) {
          var i = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2],
              a = r / e * Math.PI - .5 * Math.PI,
              u = n / e * Math.PI * 2,
              s = i ? 1 : t,
              o = [];o[1] = Math.sin(a) * s;var h = Math.cos(a) * s;o[0] = Math.cos(u) * h, o[2] = Math.sin(u) * h;var f = 1e4;return o[0] = Math.floor(o[0] * f) / f, o[1] = Math.floor(o[1] * f) / f, o[2] = Math.floor(o[2] * f) / f, o;
        }, p = 0; e > p; p++) {
          for (var d = 0; e > d; d++) {
            u.push(c(p, d)), u.push(c(p + 1, d)), u.push(c(p + 1, d + 1)), u.push(c(p, d + 1)), r && (h.push(c(p, d, !0)), h.push(c(p + 1, d, !0)), h.push(c(p + 1, d + 1, !0)), h.push(c(p, d + 1, !0)));var m = d / e,
                v = p / e;s.push([1 - m, v]), s.push([1 - m, v + l]), s.push([1 - m - l, v + l]), s.push([1 - m - l, v]), o.push(4 * f + 0), o.push(4 * f + 1), o.push(4 * f + 2), o.push(4 * f + 0), o.push(4 * f + 2), o.push(4 * f + 3), f++;
          }
        }n && o.reverse();var _ = new a["default"](i);return _.bufferVertex(u), _.bufferTexCoords(s), _.bufferIndices(o), r && _.bufferNormal(h), _;
      }, u.cube = function (t, e, r) {
        var n = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3],
            i = arguments.length <= 4 || void 0 === arguments[4] ? 4 : arguments[4];e = e || t, r = r || t;var u = t / 2,
            s = e / 2,
            o = r / 2,
            h = [],
            f = [],
            l = [],
            c = [],
            p = 0;h.push([-u, s, -o]), h.push([u, s, -o]), h.push([u, -s, -o]), h.push([-u, -s, -o]), c.push([0, 0, -1]), c.push([0, 0, -1]), c.push([0, 0, -1]), c.push([0, 0, -1]), f.push([0, 0]), f.push([1, 0]), f.push([1, 1]), f.push([0, 1]), l.push(4 * p + 0), l.push(4 * p + 1), l.push(4 * p + 2), l.push(4 * p + 0), l.push(4 * p + 2), l.push(4 * p + 3), p++, h.push([u, s, -o]), h.push([u, s, o]), h.push([u, -s, o]), h.push([u, -s, -o]), c.push([1, 0, 0]), c.push([1, 0, 0]), c.push([1, 0, 0]), c.push([1, 0, 0]), f.push([0, 0]), f.push([1, 0]), f.push([1, 1]), f.push([0, 1]), l.push(4 * p + 0), l.push(4 * p + 1), l.push(4 * p + 2), l.push(4 * p + 0), l.push(4 * p + 2), l.push(4 * p + 3), p++, h.push([u, s, o]), h.push([-u, s, o]), h.push([-u, -s, o]), h.push([u, -s, o]), c.push([0, 0, 1]), c.push([0, 0, 1]), c.push([0, 0, 1]), c.push([0, 0, 1]), f.push([0, 0]), f.push([1, 0]), f.push([1, 1]), f.push([0, 1]), l.push(4 * p + 0), l.push(4 * p + 1), l.push(4 * p + 2), l.push(4 * p + 0), l.push(4 * p + 2), l.push(4 * p + 3), p++, h.push([-u, s, o]), h.push([-u, s, -o]), h.push([-u, -s, -o]), h.push([-u, -s, o]), c.push([-1, 0, 0]), c.push([-1, 0, 0]), c.push([-1, 0, 0]), c.push([-1, 0, 0]), f.push([0, 0]), f.push([1, 0]), f.push([1, 1]), f.push([0, 1]), l.push(4 * p + 0), l.push(4 * p + 1), l.push(4 * p + 2), l.push(4 * p + 0), l.push(4 * p + 2), l.push(4 * p + 3), p++, h.push([-u, s, o]), h.push([u, s, o]), h.push([u, s, -o]), h.push([-u, s, -o]), c.push([0, 1, 0]), c.push([0, 1, 0]), c.push([0, 1, 0]), c.push([0, 1, 0]), f.push([0, 0]), f.push([1, 0]), f.push([1, 1]), f.push([0, 1]), l.push(4 * p + 0), l.push(4 * p + 1), l.push(4 * p + 2), l.push(4 * p + 0), l.push(4 * p + 2), l.push(4 * p + 3), p++, h.push([-u, -s, -o]), h.push([u, -s, -o]), h.push([u, -s, o]), h.push([-u, -s, o]), c.push([0, -1, 0]), c.push([0, -1, 0]), c.push([0, -1, 0]), c.push([0, -1, 0]), f.push([0, 0]), f.push([1, 0]), f.push([1, 1]), f.push([0, 1]), l.push(4 * p + 0), l.push(4 * p + 1), l.push(4 * p + 2), l.push(4 * p + 0), l.push(4 * p + 2), l.push(4 * p + 3), p++;var d = new a["default"](i);return d.bufferVertex(h), d.bufferTexCoords(f), d.bufferIndices(l), n && d.bufferNormal(c), d;
      }, u.skybox = function (t) {
        var e = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
            r = arguments.length <= 2 || void 0 === arguments[2] ? 4 : arguments[2],
            n = [],
            i = [],
            u = [],
            s = [],
            o = 0;n.push([t, t, -t]), n.push([-t, t, -t]), n.push([-t, -t, -t]), n.push([t, -t, -t]), s.push([0, 0, -1]), s.push([0, 0, -1]), s.push([0, 0, -1]), s.push([0, 0, -1]), i.push([0, 0]), i.push([1, 0]), i.push([1, 1]), i.push([0, 1]), u.push(4 * o + 0), u.push(4 * o + 1), u.push(4 * o + 2), u.push(4 * o + 0), u.push(4 * o + 2), u.push(4 * o + 3), o++, n.push([t, -t, -t]), n.push([t, -t, t]), n.push([t, t, t]), n.push([t, t, -t]), s.push([1, 0, 0]), s.push([1, 0, 0]), s.push([1, 0, 0]), s.push([1, 0, 0]), i.push([0, 0]), i.push([1, 0]), i.push([1, 1]), i.push([0, 1]), u.push(4 * o + 0), u.push(4 * o + 1), u.push(4 * o + 2), u.push(4 * o + 0), u.push(4 * o + 2), u.push(4 * o + 3), o++, n.push([-t, t, t]), n.push([t, t, t]), n.push([t, -t, t]), n.push([-t, -t, t]), s.push([0, 0, 1]), s.push([0, 0, 1]), s.push([0, 0, 1]), s.push([0, 0, 1]), i.push([0, 0]), i.push([1, 0]), i.push([1, 1]), i.push([0, 1]), u.push(4 * o + 0), u.push(4 * o + 1), u.push(4 * o + 2), u.push(4 * o + 0), u.push(4 * o + 2), u.push(4 * o + 3), o++, n.push([-t, -t, t]), n.push([-t, -t, -t]), n.push([-t, t, -t]), n.push([-t, t, t]), s.push([-1, 0, 0]), s.push([-1, 0, 0]), s.push([-1, 0, 0]), s.push([-1, 0, 0]), i.push([0, 0]), i.push([1, 0]), i.push([1, 1]), i.push([0, 1]), u.push(4 * o + 0), u.push(4 * o + 1), u.push(4 * o + 2), u.push(4 * o + 0), u.push(4 * o + 2), u.push(4 * o + 3), o++, n.push([t, t, t]), n.push([-t, t, t]), n.push([-t, t, -t]), n.push([t, t, -t]), s.push([0, 1, 0]), s.push([0, 1, 0]), s.push([0, 1, 0]), s.push([0, 1, 0]), i.push([0, 0]), i.push([1, 0]), i.push([1, 1]), i.push([0, 1]), u.push(4 * o + 0), u.push(4 * o + 1), u.push(4 * o + 2), u.push(4 * o + 0), u.push(4 * o + 2), u.push(4 * o + 3), o++, n.push([t, -t, -t]), n.push([-t, -t, -t]), n.push([-t, -t, t]), n.push([t, -t, t]), s.push([0, -1, 0]), s.push([0, -1, 0]), s.push([0, -1, 0]), s.push([0, -1, 0]), i.push([0, 0]), i.push([1, 0]), i.push([1, 1]), i.push([0, 1]), u.push(4 * o + 0), u.push(4 * o + 1), u.push(4 * o + 2), u.push(4 * o + 0), u.push(4 * o + 2), u.push(4 * o + 3);var h = new a["default"](r);return h.bufferVertex(n), h.bufferTexCoords(i), h.bufferIndices(u), e && h.bufferNormal(s), h;
      }, r["default"] = u;
    }, { "./Mesh": 18 }], 18: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }var a = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }();Object.defineProperty(r, "__esModule", { value: !0 });var u = t("./GLTool"),
          s = n(u),
          o = void 0,
          h = function () {
        function t() {
          var e = arguments.length <= 0 || void 0 === arguments[0] ? s["default"].gl.TRIANGLES : arguments[0];i(this, t), o = s["default"].gl, this.drawType = e, this._attributes = [];
        }return a(t, [{ key: "bufferVertex", value: function value(t) {
            var e = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1];this.bufferData(t, "aVertexPosition", 3, e);
          } }, { key: "bufferTexCoords", value: function value(t) {
            var e = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1];this.bufferData(t, "aTextureCoord", 2, e);
          } }, { key: "bufferNormal", value: function value(t) {
            var e = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1];this.bufferData(t, "aNormal", 3, e);
          } }, { key: "bufferIndices", value: function value(t) {
            var e = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
                r = e ? o.DYNAMIC_DRAW : o.STATIC_DRAW;this._indices = t, this.iBuffer = o.createBuffer(), o.bindBuffer(o.ELEMENT_ARRAY_BUFFER, this.iBuffer), o.bufferData(o.ELEMENT_ARRAY_BUFFER, new Uint16Array(t), r), this.iBuffer.itemSize = 1, this.iBuffer.numItems = t.length;
          } }, { key: "bufferData", value: function e(t, r, n) {
            var i = arguments.length <= 3 || void 0 === arguments[3] ? !1 : arguments[3],
                a = -1,
                u = 0,
                s = i ? o.DYNAMIC_DRAW : o.STATIC_DRAW,
                e = [],
                h = void 0,
                f = void 0;for (u = 0; u < this._attributes.length; u++) {
              if (this._attributes[u].name === r) {
                this._attributes[u].data = t, a = u;break;
              }
            }for (u = 0; u < t.length; u++) {
              for (var l = 0; l < t[u].length; l++) {
                e.push(t[u][l]);
              }
            }if (-1 === a) h = o.createBuffer(), o.bindBuffer(o.ARRAY_BUFFER, h), f = new Float32Array(e), o.bufferData(o.ARRAY_BUFFER, f, s), this._attributes.push({ name: r, data: t, itemSize: n, buffer: h, dataArray: f });else {
              for (h = this._attributes[a].buffer, o.bindBuffer(o.ARRAY_BUFFER, h), f = this._attributes[a].dataArray, u = 0; u < e.length; u++) {
                f[u] = e[u];
              }o.bufferData(o.ARRAY_BUFFER, f, s);
            }
          } }, { key: "attributes", get: function get() {
            return this._attributes;
          } }]), t;
      }();r["default"] = h;
    }, { "./GLTool": 16 }], 19: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }var a = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }();Object.defineProperty(r, "__esModule", { value: !0 });var u = t("gl-matrix"),
          s = n(u),
          o = function () {
        function t() {
          i(this, t), this._matrix = s["default"].mat4.create(), this._projection = s["default"].mat4.create(), this.position = s["default"].vec3.create();
        }return a(t, [{ key: "lookAt", value: function value(t, e, r) {
            s["default"].vec3.copy(this.position, t), s["default"].mat4.identity(this._matrix), s["default"].mat4.lookAt(this._matrix, t, e, r);
          } }, { key: "matrix", get: function get() {
            return this._matrix;
          } }, { key: "projection", get: function get() {
            return this._projection;
          } }]), t;
      }();r["default"] = o;
    }, { "gl-matrix": 1 }], 20: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }function a(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? t : e;
      }function u(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }var s = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }();Object.defineProperty(r, "__esModule", { value: !0 });var o = t("./Camera"),
          h = n(o),
          f = t("gl-matrix"),
          l = n(f),
          c = function (t) {
        function e() {
          i(this, e);var t = a(this, Object.getPrototypeOf(e).call(this)),
              r = l["default"].vec3.clone([0, 0, 5]),
              n = l["default"].vec3.create(),
              u = l["default"].vec3.clone([0, -1, 0]);return t.lookAt(r, n, u), t.ortho(1, -1, 1, -1), t;
        }return u(e, t), s(e, [{ key: "setBoundary", value: function value(t, e, r, n) {
            this.ortho(t, e, r, n);
          } }, { key: "ortho", value: function value(t, e, r, n) {
            this.left = t, this.right = e, this.top = r, this.bottom = n, l["default"].mat4.ortho(this._projection, t, e, r, n, 0, 1e4);
          } }]), e;
      }(h["default"]);r["default"] = c;
    }, { "./Camera": 19, "gl-matrix": 1 }], 21: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }function a(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? t : e;
      }function u(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }var s = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }();Object.defineProperty(r, "__esModule", { value: !0 });var o = t("./Camera"),
          h = n(o),
          f = t("gl-matrix"),
          l = n(f),
          c = function (t) {
        function e() {
          return i(this, e), a(this, Object.getPrototypeOf(e).call(this));
        }return u(e, t), s(e, [{ key: "setPerspective", value: function value(t, e, r, n) {
            this._fov = t, this._near = r, this._far = n, this._aspectRatio = e, l["default"].mat4.perspective(this._projection, t, e, r, n);
          } }, { key: "setAspectRatio", value: function value(t) {
            this._aspectRatio = t, l["default"].mat4.perspective(this.projection, this._fov, t, this._near, this._far);
          } }]), e;
      }(h["default"]);r["default"] = c;
    }, { "./Camera": 19, "gl-matrix": 1 }], 22: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }function a(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? t : e;
      }function u(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }var s = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }(),
          o = function v(t, e, r) {
        null === t && (t = Function.prototype);var n = Object.getOwnPropertyDescriptor(t, e);if (void 0 === n) {
          var i = Object.getPrototypeOf(t);return null === i ? void 0 : v(i, e, r);
        }if ("value" in n) return n.value;var a = n.get;if (void 0 !== a) return a.call(r);
      };Object.defineProperty(r, "__esModule", { value: !0 });var h = t("../Geom"),
          f = n(h),
          l = t("../GLShader"),
          c = n(l),
          p = t("../Batch"),
          d = n(p),
          m = function (t) {
        function e() {
          i(this, e);var t = f["default"].plane(2, 2, 1),
              r = new c["default"](null, "#define GLSLIFY 1\n// copy.frag\n\n#define SHADER_NAME COPY_FRAGMENT\n\nprecision highp float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = texture2D(texture, vTextureCoord);\n}"),
              n = a(this, Object.getPrototypeOf(e).call(this, t, r));return r.bind(), r.uniform("texture", "uniform1i", 0), n;
        }return u(e, t), s(e, [{ key: "draw", value: function value(t) {
            this.shader.bind(), t.bind(0), o(Object.getPrototypeOf(e.prototype), "draw", this).call(this);
          } }]), e;
      }(d["default"]);r["default"] = m;
    }, { "../Batch": 12, "../GLShader": 14, "../Geom": 17 }], 23: [function (t, e, r) {
      "use strict";
      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }Object.defineProperty(r, "__esModule", { value: !0 });var i = function a() {
        n(this, a);
      };r["default"] = i;
    }, {}], 24: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }function a(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? t : e;
      }function u(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
      }Object.defineProperty(r, "__esModule", { value: !0 });var s = t("./BinaryLoader"),
          o = n(s),
          h = function (t) {
        function e() {
          return i(this, e), a(this, Object.getPrototypeOf(e).call(this));
        }return u(e, t), e;
      }(o["default"]);r["default"] = h;
    }, { "./BinaryLoader": 23 }], 25: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }var a = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }();Object.defineProperty(r, "__esModule", { value: !0 });var u = t("./Scheduler"),
          s = n(u),
          o = function () {
        function t(e) {
          var r = this,
              n = arguments.length <= 1 || void 0 === arguments[1] ? .1 : arguments[1];i(this, t), this.easing = n, this._value = e, this._targetValue = e, s["default"].addEF(function () {
            return r._update();
          });
        }return a(t, [{ key: "_update", value: function value() {
            this._checkLimit(), this._value += (this._targetValue - this._value) * this.easing;
          } }, { key: "setTo", value: function value(t) {
            this._targetValue = this._value = t;
          } }, { key: "add", value: function value(t) {
            this._targetValue += t;
          } }, { key: "limit", value: function value(t, e) {
            return t > e ? void this.limit(e, t) : (this._min = t, this._max = e, void this._checkLimit());
          } }, { key: "_checkLimit", value: function value() {
            void 0 !== this._min && this._targetValue < this._min && (this._targetValue = this._min), void 0 !== this._max && this._targetValue > this._max && (this._targetValue = this._max);
          } }, { key: "value", set: function set(t) {
            this._targetValue = t;
          }, get: function get() {
            return this._value;
          } }, { key: "targetValue", get: function get() {
            return this._targetValue;
          } }]), t;
      }();r["default"] = o;
    }, { "./Scheduler": 28 }], 26: [function (t, e, r) {
      "use strict";
      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }var i = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }();Object.defineProperty(r, "__esModule", { value: !0 });var a = !0;try {
        var u = document.createEvent("CustomEvent");u = null;
      } catch (s) {
        a = !1;
      }var o = function () {
        function t() {
          n(this, t);
        }return i(t, [{ key: "addEventListener", value: function value(t, e) {
            return null === this._eventListeners && (this._eventListeners = {}), this._eventListeners[t] || (this._eventListeners[t] = []), this._eventListeners[t].push(e), this;
          } }, { key: "removeEventListener", value: function value(t, e) {
            null === this._eventListeners && (this._eventListeners = {});var r = this._eventListeners[t];if ("undefined" == typeof r) return this;for (var n = r.length, i = 0; n > i; i++) {
              r[i] === e && (r.splice(i, 1), i--, n--);
            }return this;
          } }, { key: "dispatchEvent", value: function value(t) {
            null === this._eventListeners && (this._eventListeners = {});var e = t.type;try {
              null === t.target && (t.target = this), t.currentTarget = this;
            } catch (r) {
              var n = { type: e, detail: t.detail, dispatcher: this };return this.dispatchEvent(n);
            }var i = this._eventListeners[e];if (null !== i && void 0 !== i) for (var a = this._copyArray(i), u = a.length, s = 0; u > s; s++) {
              var o = a[s];o.call(this, t);
            }return this;
          } }, { key: "dispatchCustomEvent", value: function value(t, e) {
            var r = void 0;return a ? (r = document.createEvent("CustomEvent"), r.dispatcher = this, r.initCustomEvent(t, !1, !1, e)) : r = { type: t, detail: e, dispatcher: this }, this.dispatchEvent(r);
          } }, { key: "_destroy", value: function value() {
            if (null !== this._eventListeners) {
              for (var t in this._eventListeners) {
                if (this._eventListeners.hasOwnProperty(t)) {
                  for (var e = this._eventListeners[t], r = e.length, n = 0; r > n; n++) {
                    e[n] = null;
                  }delete this._eventListeners[t];
                }
              }this._eventListeners = null;
            }
          } }, { key: "_copyArray", value: function value(t) {
            for (var e = new Array(t.length), r = e.length, n = 0; r > n; n++) {
              e[n] = t[n];
            }return e;
          } }]), t;
      }();r["default"] = o;
    }, {}], 27: [function (t, e, r) {
      "use strict";
      function n(t) {
        return t && t.__esModule ? t : { "default": t };
      }function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }var a = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }();Object.defineProperty(r, "__esModule", { value: !0 });var u = t("./EaseNumber"),
          s = n(u),
          o = t("./Scheduler"),
          h = n(o),
          f = t("gl-matrix"),
          l = n(f),
          c = function c(t, e) {
        var r = e || {};return t.touches ? (r.x = t.touches[0].pageX, r.y = t.touches[0].pageY) : (r.x = t.clientX, r.y = t.clientY), r;
      },
          p = function () {
        function t(e) {
          var r = this,
              n = arguments.length <= 1 || void 0 === arguments[1] ? window : arguments[1],
              a = arguments.length <= 2 || void 0 === arguments[2] ? 500 : arguments[2];i(this, t), this._target = e, this._listenerTarget = n, this._mouse = {}, this._preMouse = {}, this.center = l["default"].vec3.create(), this._up = l["default"].vec3.fromValues(0, 1, 0), this.radius = new s["default"](a), this.position = l["default"].vec3.fromValues(0, 0, this.radius.value), this.positionOffset = l["default"].vec3.create(), this._rx = new s["default"](0), this._rx.limit(-Math.PI / 2, Math.PI / 2), this._ry = new s["default"](0), this._preRX = 0, this._preRY = 0, this._isLockZoom = !1, this._isLockRotation = !1, this._isInvert = !1, this._listenerTarget.addEventListener("mousewheel", function (t) {
            return r._onWheel(t);
          }), this._listenerTarget.addEventListener("DOMMouseScroll", function (t) {
            return r._onWheel(t);
          }), this._listenerTarget.addEventListener("mousedown", function (t) {
            return r._onDown(t);
          }), this._listenerTarget.addEventListener("touchstart", function (t) {
            return r._onDown(t);
          }), this._listenerTarget.addEventListener("mousemove", function (t) {
            return r._onMove(t);
          }), this._listenerTarget.addEventListener("touchmove", function (t) {
            return r._onMove(t);
          }), window.addEventListener("touchend", function () {
            return r._onUp();
          }), window.addEventListener("mouseup", function () {
            return r._onUp();
          }), h["default"].addEF(function () {
            return r._loop();
          });
        }return a(t, [{ key: "lock", value: function value() {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? !0 : arguments[0];this._isLockZoom = t, this._isLockRotation = t;
          } }, { key: "lockRotation", value: function value() {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? !0 : arguments[0];this._isLockRotation = t;
          } }, { key: "inverseControl", value: function value() {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? !0 : arguments[0];this._isInvert = t;
          } }, { key: "_onDown", value: function value(t) {
            this._isLockRotation || (this._isMouseDown = !0, c(t, this._mouse), c(t, this._preMouse), this._preRX = this._rx.targetValue, this._preRY = this._ry.targetValue);
          } }, { key: "_onMove", value: function value(t) {
            if (!this._isLockRotation && (c(t, this._mouse), t.touches && t.preventDefault(), this._isMouseDown)) {
              var e = -(this._mouse.x - this._preMouse.x);this._isInvert && (e *= -1), this._ry.value = this._preRY - .01 * e;var r = -(this._mouse.y - this._preMouse.y);this._isInvert && (r *= -1), this._rx.value = this._preRX - .01 * r;
            }
          } }, { key: "_onUp", value: function value() {
            this._isLockRotation || (this._isMouseDown = !1);
          } }, { key: "_onWheel", value: function value(t) {
            if (!this._isLockZoom) {
              var e = t.wheelDelta,
                  r = t.detail,
                  n = 0;n = r ? e ? e / r / 40 * r > 0 ? 1 : -1 : -r / 3 : e / 120, this.radius.add(5 * -n);
            }
          } }, { key: "_loop", value: function value() {
            this._updatePosition(), this._target && this._updateCamera();
          } }, { key: "_updatePosition", value: function value() {
            this.position[1] = Math.sin(this._rx.value) * this.radius.value;var t = Math.cos(this._rx.value) * this.radius.value;this.position[0] = Math.cos(this._ry.value + .5 * Math.PI) * t, this.position[2] = Math.sin(this._ry.value + .5 * Math.PI) * t, l["default"].vec3.add(this.position, this.position, this.positionOffset);
          } }, { key: "_updateCamera", value: function value() {
            this._target.lookAt(this.position, this.center, this._up);
          } }]), t;
      }();r["default"] = p;
    }, { "./EaseNumber": 25, "./Scheduler": 28, "gl-matrix": 1 }], 28: [function (t, e, r) {
      "use strict";
      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }var i = function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }return function (e, r, n) {
          return r && t(e.prototype, r), n && t(e, n), e;
        };
      }();Object.defineProperty(r, "__esModule", { value: !0 }), void 0 === window.requestAnimFrame && (window.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
          window.setTimeout(t, 1e3 / 60);
        };
      }());var a = 60,
          u = function () {
        function t() {
          n(this, t), this._delayTasks = [], this._nextTasks = [], this._deferTasks = [], this._highTasks = [], this._usurpTask = [], this._enterframeTasks = [], this._idTable = 0, this._loop();
        }return i(t, [{ key: "addEF", value: function value(t, e) {
            e = e || [];var r = this._idTable;return this._enterframeTasks[r] = { func: t, params: e }, this._idTable++, r;
          } }, { key: "removeEF", value: function value(t) {
            return void 0 !== this._enterframeTasks[t] && (this._enterframeTasks[t] = null), -1;
          } }, { key: "delay", value: function value(t, e, r) {
            var n = new Date().getTime(),
                i = { func: t, params: e, delay: r, time: n };this._delayTasks.push(i);
          } }, { key: "defer", value: function value(t, e) {
            var r = { func: t, params: e };this._deferTasks.push(r);
          } }, { key: "next", value: function value(t, e) {
            var r = { func: t, params: e };this._nextTasks.push(r);
          } }, { key: "usurp", value: function value(t, e) {
            var r = { func: t, params: e };this._usurpTask.push(r);
          } }, { key: "_process", value: function value() {
            var t = 0,
                e = void 0,
                r = void 0,
                n = void 0;for (t = 0; t < this._enterframeTasks.length; t++) {
              e = this._enterframeTasks[t], null !== e && void 0 !== e && e.func(e.params);
            }for (; this._highTasks.length > 0;) {
              e = this._highTasks.pop(), e.func(e.params);
            }var i = new Date().getTime();for (t = 0; t < this._delayTasks.length; t++) {
              e = this._delayTasks[t], i - e.time > e.delay && (e.func(e.params), this._delayTasks.splice(t, 1));
            }for (i = new Date().getTime(), r = 1e3 / a; this._deferTasks.length > 0;) {
              if (e = this._deferTasks.shift(), n = new Date().getTime(), !(r > n - i)) {
                this._deferTasks.unshift(e);break;
              }e.func(e.params);
            }for (i = new Date().getTime(), r = 1e3 / a; this._usurpTask.length > 0 && (e = this._usurpTask.shift(), n = new Date().getTime(), r > n - i);) {
              e.func(e.params);
            }this._highTasks = this._highTasks.concat(this._nextTasks), this._nextTasks = [], this._usurpTask = [];
          } }, { key: "_loop", value: function value() {
            var t = this;this._process(), window.requestAnimFrame(function () {
              return t._loop();
            });
          } }]), t;
      }(),
          s = new u();r["default"] = s;
    }, {}] }, {}, [11])(11);
});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict';

var _alfridMin = require('../../../../build/alfrid.min.js');

var _alfridMin2 = _interopRequireDefault(_alfridMin);

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
	_alfridMin2.default.GL.init(canvas);
	GL = _alfridMin2.default.GL;

	//	CREATE CAMERA
	camera = new _alfridMin2.default.CameraPerspective();
	camera.setPerspective(45 * Math.PI / 180, GL.aspectRatio, 1, 1000);

	//	ORBIAL CAMERA CONTROL
	var orbitalControl = new _alfridMin2.default.OrbitalControl(camera, window, 15);
	orbitalControl.radius.value = 10;

	//	CREATE MESH
	mesh = _alfridMin2.default.Geom.cube(1, 1, 1, true);

	//	CREATE TEXTURE
	texture = new _alfridMin2.default.GLTexture(img);

	//	CREATE SHADER
	shader = new _alfridMin2.default.GLShader("#define GLSLIFY 1\n// basic.vert\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec3 aNormal;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\nuniform mat3 uNormalMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\n\nvoid main(void) {\n    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vNormal = normalize(uNormalMatrix * aNormal);\n}", "#define GLSLIFY 1\n// basic.frag\n\n#define SHADER_NAME BASIC_FRAGMENT\n\nprecision highp float;\nuniform sampler2D texture;\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\n\nconst vec3 light = vec3(1.0, 1.0, 1.0);\n\nfloat diffuse(vec3 N, vec3 L) {\n\treturn max(dot(N, normalize(L)), 0.0);\n}\n\nvoid main(void) {\n\tvec4 color = texture2D(texture, vTextureCoord);\n    float _diffuse = mix(diffuse(vNormal, light), 1.0, .2);\n    gl_FragColor = color * _diffuse;;\n}");

	//	CREATE BATCH
	batch = new _alfridMin2.default.Batch(mesh, shader);

	//	LOOPING
	_alfridMin2.default.Scheduler.addEF(function () {
		return _loop();
	});
}

function _loop() {
	GL.clear(0, 0, 0, 0);
	GL.setMatrices(camera);

	shader.bind();
	shader.uniform('texture', 'uniform1i', 0);
	texture.bind(0);

	batch.draw();
}

function resize() {
	console.log('resize');
	GL.setSize(window.innerWidth, window.innerHeight);
	camera.setAspectRatio(GL.aspectRatio);
}

},{"../../../../build/alfrid.min.js":1}]},{},[2]);

//# sourceMappingURL=bundle.js.map
