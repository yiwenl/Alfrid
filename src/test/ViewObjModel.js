// ViewObjModel.js
import alfrid, { GL } from '../alfrid';

class ViewObjModel extends alfrid.View {

	constructor() {
		super(alfrid.ShaderLibs.pbrVert, alfrid.ShaderLibs.pbrColorFrag);
	}
	
	_init() {
		const strObj = getAsset('objModel');
		this.mesh = alfrid.ObjLoader.parse(strObj);

		this.roughness = .9;
		this.specular = 0;
		this.metallic = 0;
		this.baseColor = [1, 1, 1];
	}


	render(textureRad, textureIrr, textureAO) {
		this.shader.bind();

		this.shader.uniform('uAoMap', 'uniform1i', 0);
		this.shader.uniform('uRadianceMap', 'uniform1i', 1);
		this.shader.uniform('uIrradianceMap', 'uniform1i', 2);
		textureAO.bind(0);
		textureRad.bind(1);
		textureIrr.bind(2);

		this.shader.uniform('uPosition', 'vec3', [0, 0, 0]);
		this.shader.uniform('uScale', 'vec3', [1, 1, 1]);

		this.shader.uniform('uBaseColor', 'uniform3fv', this.baseColor);
		this.shader.uniform('uRoughness', 'uniform1f', this.roughness);
		this.shader.uniform('uMetallic', 'uniform1f', this.metallic);
		this.shader.uniform('uSpecular', 'uniform1f', this.specular);

		this.shader.uniform('uExposure', 'uniform1f', 5);
		this.shader.uniform('uGamma', 'uniform1f', 2.2);

		GL.draw(this.mesh);
	}


}

export default ViewObjModel;