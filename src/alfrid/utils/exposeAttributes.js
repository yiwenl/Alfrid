// exposeAttributes.js

import GL from '../GLTool'
import WebglConst from './WebglConst'

const exposeAttributes = function () {
  for (const s in WebglConst) {
    if (!GL[s]) {
      GL[s] = WebglConst[s]
    } else {
      if (s !== 'FLOAT') console.log('already exist : ', s)
    }
  }
}

export default exposeAttributes
