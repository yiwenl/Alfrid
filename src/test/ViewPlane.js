import alfrid, { GL } from '../alfrid';

class ViewPlane extends alfrid.View {
	
	constructor() {
		super(null, alfrid.ShaderLibs.simpleColorFrag);
	}


	_init() {
		const size = 1;
		this.mesh = alfrid.Geom.plane(size * 2, size, 1);
	}


	render() {
		this.shader.bind();
		this.shader.uniform('color', 'vec3', [1, 1, 1]);
		this.shader.uniform('opacity', 'float', 0.5);
		GL.draw(this.mesh);
	}

}

export default ViewPlane;