
import '../global.scss'
import alfrid, { GL } from '../../src/alfrid'
import debugCamera from './utils/debugCamera'

import vs from '../shaders/shadowMap.vert'
import fs from '../shaders/shadowMap.frag'

import vsES from '../shaders/shadowMap300es.vert'
import fsES from '../shaders/shadowMap300es.frag'

function init () {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)

  // INIT GL
  GL.init(canvas, { useWebgl2: true })
  // GL.init(canvas, { useWebgl2: false })
  GL.setSize(window.innerWidth, window.innerHeight)

  // cameras
  const camera = new alfrid.CameraPerspective()
  camera.setPerspective(Math.PI / 4, GL.aspectRatio, 1, 100)
  const orbControl = new alfrid.OrbitalControl(camera, window, 5)
  orbControl.rx.value = orbControl.ry.value = 0.3

  const cameraSide = new alfrid.CameraPerspective()
  cameraSide.setPerspective(Math.PI / 4, GL.aspectRatio, 3, 4.5)
  cameraSide.lookAt([0, 4, 1], [0, 0, 0])

  const biasMatrix = mat4.fromValues(
    0.5, 0.0, 0.0, 0.0,
    0.0, 0.5, 0.0, 0.0,
    0.0, 0.0, 0.5, 0.0,
    0.5, 0.5, 0.5, 1.0
  )
  const mtxShadow = mat4.create()
  mat4.mul(mtxShadow, cameraSide.projection, cameraSide.matrix)
  mat4.mul(mtxShadow, biasMatrix, mtxShadow)

  const mtxCube = mat4.create()
  const mtxFloor = mat4.create()
  mat4.translate(mtxCube, mtxCube, [0, 1, 0])

  // fbo
  const fboSize = 1024 * 2
  const fbo = new alfrid.FrameBuffer(fboSize, fboSize)

  // helpers
  const bAxis = new alfrid.BatchAxis()
  const bDots = new alfrid.BatchDotsPlane()
  const bCopy = new alfrid.BatchCopy()

  let s = 0.25
  const drawCube = new alfrid.Draw()
    .setMesh(alfrid.Geom.cube(s, s, s))
    .useProgram(null, alfrid.ShaderLibs.simpleColorFrag)
    .uniform('color', 'vec3', [1, 1, 0])
    .uniform('opacity', 'float', 1)

  s = 3
  const drawFloor = new alfrid.Draw()
    .setMesh(alfrid.Geom.plane(s, s, 1, 'xz'))
    // .useProgram(vs, fs)
    .useProgram(vsES, fsES)

  const render = () => {
    GL.clear(0, 0, 0, 1)

    let s = 0

    // render fo fbo
    fbo.bind()
    GL.clear(s, s, s, 1)
    GL.setMatrices(cameraSide)
    GL.rotate(mtxCube)
    drawCube.draw()
    fbo.unbind()

    GL.setMatrices(camera)
    bAxis.draw()
    bDots.draw()

    GL.rotate(mtxCube)
    drawCube.draw()
    GL.rotate(mtxFloor)
    drawFloor
      .uniform('uShadowMatrix', 'mat4', mtxShadow)
      .uniformTexture('textureDepth', fbo.depthTexture, 0)
      .draw()
    debugCamera(cameraSide)

    s = 300
    GL.viewport(0, 0, s, s / GL.aspectRatio)
    bCopy.draw(fbo.texture)

    GL.viewport(s, 0, s, s / GL.aspectRatio)
    bCopy.draw(fbo.depthTexture)
  }

  window.addEventListener('resize', () => {
    GL.setSize(window.innerWidth, window.innerHeight)
    camera.setAspectRatio(GL.aspectRatio)
    cameraSide.setAspectRatio(GL.aspectRatio)
  })

  alfrid.Scheduler.addEF(render)
}

init()
