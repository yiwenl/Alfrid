// SceneWebGL2.js

import alfrid, { GL, EffectComposer, Pass, PassBlur, PassFxaa, ColladaParser } from '../alfrid';

import vsInstanced from './shaders/testInstance.vert';
import fsMRT from './shaders/mrt.frag';
import fsMRTES1 from './shaders/mrtes1.frag';
import vsMRT from './shaders/mrt.vert';
import fsTextureTest from './shaders/textureTest.frag';
import vsDae from './shaders/dae.vert';
import fsDae from './shaders/dae.frag';

//	post
import fsGrey from './shaders/greyscale.frag';

class SceneWebGL2 extends alfrid.Scene {

	constructor() {
		super();
		this.time = 0;
		this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3;
		this.camera.setPerspective(Math.PI/3, GL.aspectRatio, 0.2, 20);
	}

	_initViews() {
		if(GL.webgl2) {
			this.shader = new alfrid.GLShader(vsMRT, fsMRT);
		} else {
			this.shader = new alfrid.GLShader(vsInstanced, fsMRTES1);	
		}
		
		this.mesh = alfrid.Geom.sphere(.5, 24);
		this._bAxis = new alfrid.BatchAxis();
		this._bDots = new alfrid.BatchDotsPlane();
		this._bCopy = new alfrid.BatchCopy();
		this._bFxaa = new alfrid.BatchFXAA();

		this.positionOffset = [[0, 0, 0], [0, 0, -2], [0, 0, 2]];
		this.mesh.bufferInstance(this.positionOffset, 'aPosOffset');

		const planeSize = 20;
		this.meshPlane = alfrid.Geom.plane(planeSize, planeSize, 1, 'xz');
		this.shaderTexture = new alfrid.GLShader(alfrid.ShaderLibs.generalVert, fsTextureTest);
		this.shaderTexture.bind();
		this.shaderTexture.uniform('position', 'vec3', [0, -1, 0]);
		this.shaderTexture.uniform('scale', 'vec3', [1, 1, 1]);


		const s = 0.005;
		this._mtxScale = mat4.create();
		mat4.scale(this._mtxScale, this._mtxScale, vec3.fromValues(s, s, s));

		/*
		const oBoat = assets.find((o)=>o.id === 'objBoat').file;
		this.boat = ColladaParser.parse(oBoat);
		*/	

		this.boat = [];
		ColladaParser.load('assets/obj/boatTest.dae', (o)=> {
			console.log('Loaded :', o);
			this.boat = o;
			this.boat.forEach((o)=> {
				mat4.multiply(o.modelMatrix, this._mtxScale, o.modelMatrix);
			});

		});
		this.shaderDae = new alfrid.GLShader(vsDae, fsDae);
		

		this.boat.forEach((o)=> {
			mat4.multiply(o.modelMatrix, this._mtxScale, o.modelMatrix);
		});


		this._modelMatrix = mat4.create();

		this._composer = new EffectComposer(GL.width, GL.height);
		const passGrey = new Pass(fsGrey);
		// this._composer.addPass(passGrey);
		// const passBlur = new PassBlur();
		// this._composer.addPass(passBlur);
		this._composer.addPass(new PassFxaa());

	}

	_initTextures() {
		this._fbo = new alfrid.FrameBuffer(GL.width, GL.height, {}, true);
		if(GL.webgl2) {
			this._fboMultiSample = new alfrid.MultisampleFrameBuffer(GL.width, GL.height, { numSample:8 }, true);	
		}
		
		// console.log('Assets:', assets);

		const img = assets.find((asset) => asset.id === 'aoTree').file;
		console.log('Image :', img);
		this.texture = new alfrid.GLTexture(img);	
		window.testTexture = this.texture;

		const wrapModes = ['MIRRORED_REPEAT', 'CLAMP_TO_EDGE', 'REPEAT'];
		const mipMapModes = ['NEAREST', 'LINEAR', 'LINEAR_MIPMAP_NEAREST', 'NEAREST_MIPMAP_LINEAR', 'LINEAR_MIPMAP_LINEAR', 'NEAREST_MIPMAP_NEAREST'];
		const o = {
			wrapS:wrapModes[0],
			wrapT:wrapModes[0],
			minFilter:mipMapModes[0],
			magFilter:mipMapModes[0],
			premultiplyAlpha:true
		};

		gui.add(o, 'wrapS', wrapModes).onFinishChange(()=> {
			this.texture.wrapS = GL[o.wrapS];
		});

		gui.add(o, 'wrapT', wrapModes).onFinishChange(()=> {
			this.texture.wrapT = GL[o.wrapT];
		});

		gui.add(o, 'minFilter', mipMapModes).onFinishChange(()=> {
			console.log(o.minFilter, GL[o.minFilter]);
			this.texture.minFilter = GL[o.minFilter];
		});

		gui.add(o, 'magFilter', mipMapModes).onFinishChange(()=> {
			this.texture.magFilter = GL[o.magFilter];
		});

		gui.add(o, 'premultiplyAlpha').onFinishChange(()=> {
			this.texture.premultiplyAlpha = o.premultiplyAlpha;
		});
	}


	render() {
		if(GL.webgl2) {
			this._fboMultiSample.bind();
			GL.clear(0, 0, 0, 0);
			this.drawScene();
			this._fboMultiSample.unbind();
		}

		this._fbo.bind();
		GL.clear(0, 0, 0, 0);
		this.drawScene();
		this._fbo.unbind();

		GL.clear(0, 0, 0, 0);

		const width = GL.width/2;
		const height = width / GL.aspectRatio;

		GL.disable(GL.DEPTH_TEST);
		this._bCopy.draw(this._fboMultiSample.getTexture());

		GL.viewport(0, 0, width, height);
		this._bCopy.draw(this._fbo.getDepthTexture());

		if(GL.webgl2) {
			GL.clear(0, 0, 0, 0);
			GL.viewport(0, 0, width, height);
			this._bCopy.draw(this._fbo.getTexture());
			GL.viewport(width, 0, width, height);
			this._bCopy.draw(this._fboMultiSample.getTexture());
		} else {
			GL.viewport(width, 0, width, height);
			this._bCopy.draw(this._fbo.getTexture());			
			// this._bFxaa.draw(this._fbo.getTexture());
		}

		GL.viewport(0, 0, GL.width, GL.height);
		// this._bFxaa.draw(this._fbo.getTexture());
		// this._bCopy.draw(this._fbo.getTexture());

		// this._bCopy.draw(this.texture);

		// this.shaderTexture.bind();
		// this.shaderTexture.uniform('texture', 'uniform1i', 0);
		// this.texture.bind(0);
		// GL.draw(this.meshPlane);

		// this._composer.render(this._fboMultiSample.getTexture());
		this._composer.render(this._fbo.getTexture());
		this._bCopy.draw(this._composer.getTexture());

		GL.enable(GL.DEPTH_TEST);

/*
		GL.disable(GL.DEPTH_TEST);
		const size = GL.width/4;
		for(let i=0; i<4; i++) {
			GL.viewport(size*i, 0, size, size/GL.aspectRatio);
			this._bCopy.draw(this._fbo.getTexture(i));
		}

		if(!GL.webgl2) {
			GL.viewport(0, size/GL.aspectRatio, size, size/GL.aspectRatio);
			this._bCopy.draw(this._fbo.getDepthTexture());	
		}
		
		GL.enable(GL.DEPTH_TEST);

*/		
	}

	drawScene() {
		GL.rotate(this._modelMatrix);
		this._bAxis.draw();
		this._bDots.draw();

		this.shader.bind();
		GL.draw(this.mesh);

		GL.disable(GL.CULL_FACE);
		this.shaderDae.bind();
		this.boat.forEach((o, i)=> {
			GL.rotate(o.modelMatrix);
			GL.draw(o.glMesh);
		});

		GL.enable(GL.CULL_FACE);
	}


	getTexture(mIndex = 0) {
		return this._textures[mIndex];
	}
}


export default SceneWebGL2;