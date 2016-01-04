'use strict';

export default class Utils {
  static _isPowerOfTwo(x){
    var check = (x !== 0) && (!(x & (x - 1)));
    return check;
  }
  static isPowerOfTwo(obj){
    var w = obj.width || obj.videoWidth;
    var h = obj.height || obj.videoHeight;
    if(!w || !h) {return false;}
    return Utils._isPowerOfTwo(w) && Utils._isPowerOfTwo(h);
  }
  static addLineNumbers(string) {
    var lines = string.split('\n');
    for ( var i = 0; i < lines.length; i ++ ) {
      lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];
    }
    return lines.join('\n');
  }
  static get(url){
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = function() {
        if (req.status == 200) {
          resolve(req.response);
        }
        else {
          reject(Error(req.statusText));
        }
      };
      req.onerror = function() {
        reject(Error('Network Error'));
      };
      req.send();
    });
  }
  static equal(mV0, mV1) {
    return ( (mV0[0] === mV1[0]) && (mV0[1] === mV1[1]) && (mV0[2] === mV1[2]) );
  }
}