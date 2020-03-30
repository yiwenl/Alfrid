
import '../global.scss'
import alfrid, { GL } from '../../src/alfrid'

function init () {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)

  // INIT GL
  GL.init(canvas, { useWebgl2: true })
  GL.setSize(window.innerWidth, window.innerHeight)

  const camera = new alfrid.CameraPerspective()
  camera.setPerspective(Math.PI / 2, GL.aspectRatio, 0.1, 100)
  const orbControl = new alfrid.OrbitalControl(camera, window, 5)
  orbControl.rx.value = orbControl.ry.value = 0.3

  // helpers
  const bAxis = new alfrid.BatchAxis()
  const bDots = new alfrid.BatchDotsPlane()

  const render = () => {
    GL.clear(0, 0, 0, 1)

    GL.setMatrices(camera)
    bAxis.draw()
    bDots.draw()
  }

  alfrid.Scheduler.addEF(render)
}

init()
