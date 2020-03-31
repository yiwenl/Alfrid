import '../global.scss'
import alfrid, { GL } from '../../src/alfrid'

import vsSave from '../shaders/save.vert'
import fsSave from '../shaders/save.frag'

import vsRender from '../shaders/render.vert'
import fsRender from '../shaders/render.frag'

const size = 256

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
  const orbControl = new alfrid.OrbitalControl(camera, window, 5)
  orbControl.rx.value = orbControl.ry.value = 0.3

  // fbo
  const fbo = new alfrid.FrameBuffer(size, size, {
    type: GL.FLOAT,
    minFilter: GL.NEAREST,
    magFilter: GL.NEAREST
  }, 2)
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
    .bindFrameBuffer(fbo)
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

  const drawRender = new alfrid.Draw()
    .setMesh(meshRender())
    .useProgram(vsRender, fsRender)

  const s = 0.25
  const drawCube = new alfrid.Draw()
    .setMesh(alfrid.Geom.cube(s, s, s))
    .useProgram(null, alfrid.ShaderLibs.simpleColorFrag)
    .uniform('color', 'vec3', [1, 1, 0])
    .uniform('opacity', 'float', 1)

  const render = () => {
    GL.viewport(0, 0, GL.width, GL.height)

    GL.clear(0, 0, 0, 1)
    GL.setMatrices(camera)
    bAxis.draw()
    bDots.draw()

    // drawCube.draw()
    drawRender
      .uniformTexture('texturePos', fbo.getTexture(0), 0)
      .uniformTexture('textureColor', fbo.getTexture(1), 1)
      .uniform('uViewport', 'vec2', [GL.width, GL.height])
      .draw()

    const s = 300
    GL.viewport(0, 0, s, s)
    bCopy.draw(fbo.getTexture(0))
    GL.viewport(s, 0, s, s)
    bCopy.draw(fbo.getTexture(1))
  }

  window.addEventListener('resize', () => {
    GL.setSize(window.innerWidth, window.innerHeight)
    camera.setAspectRatio(GL.aspectRatio)
  })

  alfrid.Scheduler.addEF(render)
}

init()
