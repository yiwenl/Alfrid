// exposeAttributes.js

import GL from "../GLTool";
import WebglConst from "./WebglConst";
import WebglNumber from "./WebglNumber";

const exposeAttributes = function () {
  for (const s in WebglConst) {
    if (!GL[s]) {
      GL[s] = WebglConst[s];
    } else {
      if (s !== "FLOAT") console.log("already exist : ", s);
    }
  }

  if (GL.webgl2) {
    const check = /^[^a-z]*$/;
    for (const s in GL.gl) {
      if (check.test(s) && s.indexOf("FLOAT") === -1) {
        GL[s] = GL.gl[s];
        WebglConst[s] = GL.gl[s];
        WebglNumber[GL[s]] = s;
      }
    }
  }
};

export default exposeAttributes;
