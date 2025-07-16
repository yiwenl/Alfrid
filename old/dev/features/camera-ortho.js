// camera-ortho.js
import '../global.scss'
import quickSetup from '../utils/quickSetup'
import alfrid, { GL } from 'src/alfrid'

let shader, mesh, cameraOrtho, ball

quickSetup(render).then((o) => init(o)).catch(err => {
  console.log('Error :', err)
})

function init (o) {
  console.log('Init', o)

  const w = GL.width / 2
  const h = GL.height / 2
  cameraOrtho = new alfrid.CameraOrtho()
  cameraOrtho.ortho(-w, w, h, -h, 0.1, 200)
  // cameraOrtho.lookAt([0, 0, 3], [0, 0, 0], [0, 1, 0]);

  shader = new alfrid.GLShader()
  mesh = alfrid.Geom.plane(200, 200, 1)
  ball = new alfrid.BatchBall()
}

function render () {
  GL.clear(0, 0, 0, 1)

  GL.setMatrices(cameraOrtho)
  shader.bind()
  GL.draw(mesh)

  const s = 10
  ball.draw([100, 100, 0], [s, s, s], [1, 1, 1])
  ball.draw([-100, 100, 0], [s, s, s], [1, 1, 1])
  ball.draw([0, -100, 0], [s, s, s], [1, 1, 1])
}
