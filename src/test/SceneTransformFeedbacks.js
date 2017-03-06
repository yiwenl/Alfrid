// SceneTransformFeedbacks.js

import alfrid, { GL } from '../alfrid';

import vsEmit from './shaders/transform/emit.vert';
import fsEmit from './shaders/transform/emit.frag';
import vsDraw from './shaders/transform/draw.vert';
import fsDraw from './shaders/transform/draw.frag';

const random = function (min, max) { return min + Math.random() * (max - min);	};

let gl;
const t = 256;
const NUM_PARTICLES = t * t;

console.debug('Num Particles :', NUM_PARTICLES);

class SceneTransformFeedbacks extends alfrid.Scene {
	constructor() {
		super();
		gl = GL.gl;
		this.time = 0;
		this.currentSourceIdx = 0;
		this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3;


		this._initParticles();
	}


	_initParticles() {
		const range = 2;
		this.transformFeedbackObj = new alfrid.TransformFeedbackObject(vsEmit, fsEmit);

		const positions = [];
		const velocities = [];
		const extras = [];
		const indices = [];

		for(let i=0; i<NUM_PARTICLES; i++) {
			const pos = [random(-range, range), random(-range, range), random(-range, range)];
			const vel = [0, 0, 0];

			positions.push(pos);
			velocities.push(vel);
			extras.push([random(.5, 2), Math.random() * 255, random(.1, .2)]);
			indices.push(i);
		}

		this.transformFeedbackObj.bufferData(positions, 'a_position', 'v_position');
		this.transformFeedbackObj.bufferData(velocities, 'a_velocity', 'v_velocity');
		this.transformFeedbackObj.bufferData(extras, 'a_extra', 'v_extra');
		this.transformFeedbackObj.bufferIndex(indices);

		console.log(positions.length, extras.length);
		this.shaderDraw = new alfrid.GLShader(vsDraw, fsDraw);
		this.shader = this.shaderDraw;

		//	TRANSFORM FEEDBACK
		this.transformFeedback = gl.createTransformFeedback();
	}

	_initViews() {
		this._bAxis = new alfrid.BatchAxis();
		this._bDots = new alfrid.BatchDotsPlane();
	}
	render() {
		this.time += 0.01;
		// this.emitParticles();
		this.transformFeedbackObj.render();

		GL.clear();
		// this._bAxis.draw();
		// this._bDots.draw();

		// this.setupVertexAttributes(this.particleVBOs[this.currentSourceIdx]);

		this.shaderDraw.bind();
		this.transformFeedbackObj.meshCurrent.bind();
		this.shaderDraw.uniform('uViewMatrix', 'mat4', this.camera.viewMatrix);
		this.shaderDraw.uniform('uProjectionMatrix', 'mat4', this.camera.projectionMatrix);
		this.shaderDraw.uniform('uViewport', 'vec2', [GL.width, GL.height]);

		gl.drawArrays(gl.POINTS, 0, NUM_PARTICLES);

		
		
	}
}


export default SceneTransformFeedbacks;