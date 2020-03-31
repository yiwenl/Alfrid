import '../global.scss'
import alfrid, { GL } from '../../src/alfrid'

import vsSave from '../shaders/save.vert'

const size = 256

function init () {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)

  // INIT GL
  // GL.init(canvas, { useWebgl2: true })
  GL.init(canvas, { useWebgl2: false })
  GL.setSize(window.innerWidth, window.innerHeight)

  // cameras
  const camera = new alfrid.CameraPerspective()
  camera.setPerspective(Math.PI / 4, GL.aspectRatio, 1, 100)
  const orbControl = new alfrid.OrbitalControl(camera, window, 5)
  orbControl.rx.value = orbControl.ry.value = 0.3

  // fbo
  const fbo = new alfrid.FrameBuffer(size, size, {
    type: GL.FLOAT,
    minFilter: GL.NEAREST,
    magFilter: GL.NEAREST
  }, 1)
  // const fbo = new alfrid.FrameBuffer(size, size)

  // draw calls
  const bAxis = new alfrid.BatchAxis()
  const bDots = new alfrid.BatchDotsPlane()

  const s = 0.25
  const drawCube = new alfrid.Draw()
    .setMesh(alfrid.Geom.cube(s, s, s))
    .useProgram(null, alfrid.ShaderLibs.simpleColorFrag)
    .uniform('color', 'vec3', [1, 1, 0])
    .uniform('opacity', 'float', 1)

  const render = () => {
    GL.clear(0, 0, 0, 1)

    GL.setMatrices(camera)
    bAxis.draw()
    bDots.draw()

    drawCube.draw()
  }

  window.addEventListener('resize', () => {
    GL.setSize(window.innerWidth, window.innerHeight)
    camera.setAspectRatio(GL.aspectRatio)
  })

  alfrid.Scheduler.addEF(render)
}

init()
