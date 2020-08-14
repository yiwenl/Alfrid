// SceneApp.js

import alfrid, { Scene, GL } from 'alfrid'
import Assets from './Assets'
import Config from './Config'
import { resize } from './utils'

import { GLFirst, init } from './Lib.js'

class SceneApp extends Scene {
  constructor () {
    super()
    GL.enableAlphaBlending()
    this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3
    this.orbitalControl.radius.value = 5

    this.resize()

    const second = init()
    console.log('GLTest', GLFirst)
    console.log('GLTest, second', second)
  }

  _initTextures () {
    console.log('init textures')
  }

  _initViews () {
    console.log('init views')

    this._bCopy = new alfrid.BatchCopy()
    this._bAxis = new alfrid.BatchAxis()
    this._bDots = new alfrid.BatchDotsPlane()
    this._bBall = new alfrid.BatchBall()
  }

  render () {
    GL.clear(0, 0, 0, 0)

    this._bAxis.draw()
    this._bDots.draw()
  }

  resize (w, h) {
    resize(w, h)
    this.camera.setAspectRatio(GL.aspectRatio)
  }
}

export default SceneApp
