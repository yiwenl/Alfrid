// SceneApp.js
import alfrid from '../../../../build/alfrid.js';
import ViewCube from './ViewCube';
var glslify = require("glslify");

let GL = alfrid.GL;

class SceneApp extends alfrid.Scene {
	constructor() {
		super();
		let fov = 60;
		this.camera.setPerspective(fov*Math.PI/180, GL.aspectRatio, 0.1, 100);

		this.cameraCubemap = new alfrid.CameraPerspective();
		this.cameraCubemap.setPerspective(fov*Math.PI/180, GL.aspectRatio, 0.1, 100);		
		let orbitalControl = new alfrid.OrbitalControl(this.cameraCubemap, window, 15);
		orbitalControl.lockZoom(true);
		orbitalControl.radius.value = .1;
	}


	_initTextures() {
		function getAsset(id) {
			for(var i=0; i<assets.length; i++) {
				if(id === assets[i].id) {
					return assets[i].file;
				}
			}
		}

		let irr_posx = alfrid.HDRLoader.parse(getAsset('irr_posx'))
		let irr_negx = alfrid.HDRLoader.parse(getAsset('irr_negx'))
		let irr_posy = alfrid.HDRLoader.parse(getAsset('irr_posy'))
		let irr_negy = alfrid.HDRLoader.parse(getAsset('irr_negy'))
		let irr_posz = alfrid.HDRLoader.parse(getAsset('irr_posz'))
		let irr_negz = alfrid.HDRLoader.parse(getAsset('irr_negz'))

		this._textureIrr = new alfrid.GLCubeTexture([irr_posx, irr_negx, irr_posy, irr_negy, irr_posz, irr_negz]);

		let rad_posx = alfrid.HDRLoader.parse(getAsset('rad_posx'))
		let rad_negx = alfrid.HDRLoader.parse(getAsset('rad_negx'))
		let rad_posy = alfrid.HDRLoader.parse(getAsset('rad_posy'))
		let rad_negy = alfrid.HDRLoader.parse(getAsset('rad_negy'))
		let rad_posz = alfrid.HDRLoader.parse(getAsset('rad_posz'))
		let rad_negz = alfrid.HDRLoader.parse(getAsset('rad_negz'))

		this._textureRad = new alfrid.GLCubeTexture([rad_posx, rad_negx, rad_posy, rad_negy, rad_posz, rad_negz]);
	}
	

	_initViews() {
		this._vCube           = new ViewCube();
		this._bAxis           = new alfrid.BatchAxis();
		this._bDotsPlane      = new alfrid.BatchDotsPlane();
		this._bCopy           = new alfrid.BatchCopy();
		
		
		this.mesh             = alfrid.Geom.skybox(15);
		this.shader           = new alfrid.GLShader(glslify('../shaders/skybox.vert'), glslify('../shaders/skybox.frag'));
		
		
		// this.meshSphere       = alfrid.Geom.sphere(1.5, 48, true);
		// this.shaderReflection = new alfrid.GLShader(glslify('../shaders/reflection.vert'), glslify('../shaders/reflection.frag'));
		this.shaderReflection = new alfrid.GLShader(glslify('../shaders/pbr.vert'), glslify('../shaders/pbr.frag'));


		this._objLoader 	  = new alfrid.ObjLoader();
<<<<<<< HEAD
		this._objLoader.load('./assets/maskHigh.obj', (mesh)=>this._onObjLoaded(mesh), false);
=======
		this._objLoader.load('./assets/tree.obj', (mesh)=>this._onObjLoaded(mesh), false );
>>>>>>> feature/example-self-shading-particles
	}


	_onObjLoaded(mesh) {
		this.meshMask = mesh;
	}


	render() {
		params.roughness = params.offset;
		params.metallic = 1.0 - params.roughness;
		params.specular = (1.0 - params.roughness) * .9 + .1;
		if(!this.meshMask) {
			return;
		}

		if(document.body.classList.contains('isLoading')) {
			document.body.classList.remove('isLoading');
		}
		

		GL.setMatrices(this.cameraCubemap);

		// 	SKYBOX
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		this.shader.uniform("uExposure", "uniform1f", params.exposure);
		this.shader.uniform("uGamma", "uniform1f", params.gamma);
		this._textureRad.bind(0);
		GL.draw(this.mesh);


		GL.setMatrices(this.camera);
		// this._bAxis.draw();
		// this._bDotsPlane.draw();


		//	SPHERE
		this.shaderReflection.bind();
		this.shaderReflection.uniform("uRadianceMap", "uniform1i", 0);
		this.shaderReflection.uniform("uIrradianceMap", "uniform1i", 1);
		this._textureRad.bind(0);
		this._textureIrr.bind(1);

		let roughness4 = Math.pow(params.roughness, 4.0);
		this.shaderReflection.uniform("uBaseColor", "uniform3fv", [1, 1, 1]);
		this.shaderReflection.uniform("uRoughness", "uniform1f", params.roughness);
		this.shaderReflection.uniform("uRoughness4", "uniform1f", roughness4);
		this.shaderReflection.uniform("uMetallic", "uniform1f", params.metallic);
		this.shaderReflection.uniform("uSpecular", "uniform1f", params.specular);

		this.shaderReflection.uniform("uExposure", "uniform1f", params.exposure);
		this.shaderReflection.uniform("uGamma", "uniform1f", params.gamma);

		if(this.meshMask.length) {
			// console.log(this.meshMask.length);
			for(let i=0; i<this.meshMask.length; i++) {
				GL.draw(this.meshMask[i]);		
			}
			
		} else {
			GL.draw(this.meshMask);	
		}
		


	}
}


export default SceneApp;