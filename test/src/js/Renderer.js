let _idTable = 0
class Renderer {
  constructor () {
    this._id = `Renderer${_idTable++}`
  }

  get id () {	return this._id }
}

export default Renderer
