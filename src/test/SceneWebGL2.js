// SceneWebGL2.js


import alfrid, { GL } from '../alfrid';

import vsInstanced from './shaders/testInstance.vert';
import fsMRT from './shaders/mrt.frag';
import fsMRTES1 from './shaders/mrtes1.frag';
import vsMRT from './shaders/mrt.vert';

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

		this.positionOffset = [[0, 0, 0], [0, 0, -2], [0, 0, 2]];
		this.mesh.bufferInstance(this.positionOffset, 'aPosOffset');

	}

	_initTextures() {
		this._fbo = new alfrid.FrameBuffer(GL.width, GL.height, {}, true);
		if(GL.webgl2) {
			this._fboMultiSample = new alfrid.MultisampleFrameBuffer(GL.width, GL.height, { numSample:8 }, true);	
		}
		
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
			GL.viewport(width, 0, width, height);
			this._bCopy.draw(this._fboMultiSample.getTexture());
		} else {
			GL.viewport(width, 0, width, height);
			this._bCopy.draw(this._fbo.getTexture());			
		}

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
		this._bAxis.draw();
		this._bDots.draw();

		this.shader.bind();
		GL.draw(this.mesh);
	}


	getTexture(mIndex = 0) {
		return this._textures[mIndex];
	}
}


export default SceneWebGL2;