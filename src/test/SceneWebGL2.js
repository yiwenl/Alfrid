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
	}

	_initViews() {
		this.shader = new alfrid.GLShader(vsMRT, fsMRT);
		// this.shader = new alfrid.GLShader(vsInstanced, fsMRTES1);
		this.mesh = alfrid.Geom.sphere(.5, 24);
		this._bAxis = new alfrid.BatchAxis();
		this._bDots = new alfrid.BatchDotsPlane();
		this._bCopy = new alfrid.BatchCopy();

		this.positionOffset = [[0, 0, 0], [0, 0, -2], [0, 0, 2]];
		this.mesh.bufferInstance(this.positionOffset, 'aPosOffset');

	}

	_initTextures() {
		console.log('Float : ', GL.FLOAT);
		console.log('Half float : ', GL.HALF_FLOAT);

		this._fbo = new alfrid.FrameBuffer(GL.width, GL.height, {}, true);
	}


	render() {
		this._fbo.bind();
		GL.clear(0, 0, 0, 0);
		this._bAxis.draw();
		this._bDots.draw();

		this.shader.bind();
		GL.draw(this.mesh);

		this._fbo.unbind();


		GL.clear(0, 0, 0, 0);
		this._bCopy.draw(this._fbo.getTexture());

		GL.disable(GL.DEPTH_TEST);
		const size = GL.width/4;
		for(let i=0; i<4; i++) {
			GL.viewport(size*i, 0, size, size/GL.aspectRatio);
			this._bCopy.draw(this._fbo.getTexture(i));
		}
		GL.enable(GL.DEPTH_TEST);
	}
}


export default SceneWebGL2;