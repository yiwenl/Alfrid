// ViewObjModel.js
import alfrid, { GL } from '../alfrid';

class ViewObjModel extends alfrid.View {
	
	_init() {
		const strObj = getAsset('objModel');
		this.mesh = alfrid.ObjLoader.parse(strObj);
	}


	render() {
		this.shader.bind();
		GL.draw(this.mesh);
	}


}

export default ViewObjModel;