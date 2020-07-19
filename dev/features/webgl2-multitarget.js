import '../global.scss'
import alfrid, { GL } from '../../src/alfrid'
import debugCamera from './utils/debugCamera'

import vsSave from '../shaders/save.vert'
import fsSave from '../shaders/save.frag'

import vsRender from '../shaders/render.vert'
import fsRender from '../shaders/render.frag'
import fsDepth from '../shaders/depth.frag'

import vsPass from '../shaders/pass.vert'
import fsSim from '../shaders/sim.frag'

import vsFloor from '../shaders/floor.vert'
import fsFloor from '../shaders/floor.frag'

const size = 256
const shadowMapScale = 4

const random = (a, b) => {
  return a + Math.random() * (b - a)
}

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
  const orbControl = new alfrid.OrbitalControl(camera, window, 10)
  orbControl.rx.value = orbControl.ry.value = 0.3

  const cameraLight = new alfrid.CameraOrtho()
  const s = 4
  cameraLight.ortho(-s, s, s, -s, 1, 8)
  cameraLight.lookAt([0, 4, 1], [0, 0, 0])

  const biasMatrix = mat4.fromValues(
    0.5, 0.0, 0.0, 0.0,
    0.0, 0.5, 0.0, 0.0,
    0.0, 0.0, 0.5, 0.0,
    0.5, 0.5, 0.5, 1.0
  )
  const mtxShadow = mat4.create()
  mat4.mul(mtxShadow, cameraLight.projection, cameraLight.matrix)
  mat4.mul(mtxShadow, biasMatrix, mtxShadow)

  // fbo
  const fbo = new alfrid.FboPingPong(size, size, {
    type: GL.FLOAT,
    minFilter: GL.NEAREST,
    magFilter: GL.NEAREST
  }, 3)

  const fboShadow = new alfrid.FrameBuffer(1024 * shadowMapScale, 1024 * shadowMapScale)
  // const fbo = new alfrid.FrameBuffer(size, size)

  // draw calls
  const bAxis = new alfrid.BatchAxis()
  const bDots = new alfrid.BatchDotsPlane()
  const bCopy = new alfrid.BatchCopy()

  const meshSave = () => {
    const mesh = new alfrid.Mesh(GL.POINTS)
    const positions = []
    const normals = []
    const uvs = []
    const indices = []
    let index = 0
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        positions.push([random(-1, 1), random(-1, 1), random(-1, 1)])
        uvs.push([i / size * 2 - 1, j / size * 2 - 1])
        normals.push([Math.random(), Math.random(), Math.random()])
        indices.push(index)
        index++
      }
    }
    mesh.bufferVertex(positions)
    mesh.bufferNormal(normals)
    mesh.bufferTexCoord(uvs)
    mesh.bufferIndex(indices)
    return mesh
  }

  new alfrid.Draw()
    .setMesh(meshSave())
    .useProgram(vsSave, fsSave)
    .bindFrameBuffer(fbo.read)
    .draw()
    .bindFrameBuffer(fbo.write)
    .draw()

  const meshRender = () => {
    const positions = []
    const indices = []
    let index = 0

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        positions.push([i / size, j / size, 0])
        indices.push(index)
        index++
      }
    }
    const mesh = new alfrid.Mesh(GL.POINTS)
    mesh.bufferVertex(positions)
    mesh.bufferIndex(indices)
    return mesh
  }

  const drawSim = new alfrid.Draw()
    .setMesh(alfrid.Geom.bigTriangle())
    .useProgram(vsPass, fsSim)
    .setClearColor(0, 0, 0, 1)

  const mesh = meshRender()

  const drawRender = new alfrid.Draw()
    .setMesh(mesh)
    .useProgram(vsRender, fsRender)

  const drawDepth = new alfrid.Draw()
    .setMesh(mesh)
    .useProgram(vsRender, fsDepth)

  const drawFloor = new alfrid.Draw()
    .setMesh(alfrid.Geom.plane(10, 10, 1, 'xz'))
    .useProgram(vsFloor, fsFloor)

  const mtxFloor = mat4.create()
  mat4.translate(mtxFloor, mtxFloor, vec3.fromValues(0, -3, 0))

  const seed = Math.random() * 0xFF

  const render = () => {
    GL.viewport(0, 0, GL.width, GL.height)

    drawSim
      .bindFrameBuffer(fbo.write)
      .uniformTexture('texturePos', fbo.read.getTexture(0), 0)
      .uniformTexture('textureVel', fbo.read.getTexture(1), 1)
      .uniformTexture('textureExtra', fbo.read.getTexture(2), 2)
      .uniform('uTime', 'float', alfrid.Scheduler.deltaTime + seed)
      .draw()
    fbo.swap()

    // update shadow map
    fboShadow.bind()
    GL.clear(1, 0, 0, 1)
    GL.setMatrices(cameraLight)
    drawDepth
      .uniformTexture('texturePos', fbo.read.getTexture(0), 0)
      .uniformTexture('textureExtra', fbo.read.getTexture(2), 1)
      .uniform('uViewport', 'vec2', [GL.width * shadowMapScale, GL.height * shadowMapScale])
      .uniform('uShadowMatrix', 'mat4', mtxShadow)
      .draw()

    fboShadow.unbind()

    GL.clear(0, 0, 0, 1)
    GL.setMatrices(camera)
    bAxis.draw()
    bDots.draw()

    // drawCube.draw()
    drawRender
      .uniformTexture('texturePos', fbo.read.getTexture(0), 0)
      .uniformTexture('textureExtra', fbo.read.getTexture(2), 1)
      .uniform('uViewport', 'vec2', [GL.width, GL.height])
      .uniform('uShadowMatrix', 'mat4', mtxShadow)
      .uniformTexture('textureDepth', fboShadow.depthTexture, 2)
      .draw()

    GL.rotate(mtxFloor)
    drawFloor
      .uniform('uShadowMatrix', 'mat4', mtxShadow)
      .uniformTexture('textureDepth', fboShadow.depthTexture, 2)
      .draw()

    GL.rotate(mat4.create())

    debugCamera(cameraLight)

    const s = Math.min(256, GL.width / 4)
    GL.viewport(0, 0, s, s)
    bCopy.draw(fbo.read.getTexture(0))
    GL.viewport(s, 0, s, s)
    bCopy.draw(fbo.read.getTexture(2))
    GL.viewport(s * 2, 0, s, s)
    bCopy.draw(fboShadow.depthTexture)
    GL.viewport(s * 3, 0, s, s)
    bCopy.draw(fboShadow.texture)
  }

  window.addEventListener('resize', () => {
    GL.setSize(window.innerWidth, window.innerHeight)
    camera.setAspectRatio(GL.aspectRatio)
  })

  alfrid.Scheduler.addEF(render)
}

init()
