// SceneTransformFeedbacks.js

import alfrid, { GL } from '../alfrid';

import vsEmit from './shaders/transform/emit.vert';
import fsEmit from './shaders/transform/emit.frag';
import vsDraw from './shaders/transform/draw.vert';
import fsDraw from './shaders/transform/draw.frag';

const random = function (min, max) { return min + Math.random() * (max - min);	};

let gl;
const t = 300;
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

		for(let i=0; i<NUM_PARTICLES; i++) {
			const pos = [random(-range, range), random(-range, range), random(-range, range)];
			const vel = [0, 0, 0];

			positions.push(pos);
			velocities.push(vel);
		}

		this.transformFeedbackObj.bufferData(positions, 'a_position', 'v_position');
		this.transformFeedbackObj.bufferData(velocities, 'a_velocity', 'v_velocity');


		this.particlePositions = new Float32Array(NUM_PARTICLES * 3);
		this.particleVelocities = new Float32Array(NUM_PARTICLES * 3);
		this.particleIDs = new Float32Array(NUM_PARTICLES);
		

		for(let i=0; i<NUM_PARTICLES; i++) {
			this.particlePositions[i * 3] = random(-range, range);
			this.particlePositions[i * 3 + 1] = random(-range, range);
			this.particlePositions[i * 3 + 2] = random(-range, range);

			this.particleVelocities[i * 3] = 0;
			this.particleVelocities[i * 3 + 1] = 0;
			this.particleVelocities[i * 3 + 2] = 0;

			this.particleIDs[i] = i;
		}


		console.log(this.particlePositions.length, this.particleVelocities.length);
		this.particleVBOs = [];
		this.particleVAOs = [];

		for(let i=0; i<3; i++) {
			this.particleVBOs[i] = [];
			for(let j=0; j<3; j++) {
				this.particleVBOs[i][j] = gl.createBuffer();
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, this.particleVBOs[i][0]);
			gl.bufferData(gl.ARRAY_BUFFER, this.particlePositions, gl.STREAM_COPY);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.particleVBOs[i][1]);
			gl.bufferData(gl.ARRAY_BUFFER, this.particleVelocities, gl.STREAM_COPY);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.particleVBOs[i][2]);
			gl.bufferData(gl.ARRAY_BUFFER, this.particleIDs, gl.STATIC_READ);

			this.particleVAOs[i] = gl.createVertexArray();
		}


		//	INIT SHADERS
		this.shaderEmit = new alfrid.GLShader(vsEmit, fsEmit, ['v_position', 'v_velocity']);
		this.shaderDraw = new alfrid.GLShader(vsDraw, fsDraw);
		this.shader = this.shaderDraw;


		//	TRANSFORM FEEDBACK
		this.transformFeedback = gl.createTransformFeedback();
	}

	_initViews() {
		this._bAxis = new alfrid.BatchAxis();
		this._bDots = new alfrid.BatchDotsPlane();
	}


	setupVertexAttributes(vaoId, vboArray) {
		gl.bindVertexArray(vaoId);
		gl.bindBuffer(gl.ARRAY_BUFFER, vboArray[0]);
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, vboArray[1]);
		gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, vboArray[2]);
		gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 0, 0);

		gl.enableVertexAttribArray(0);
		gl.enableVertexAttribArray(1);
		gl.enableVertexAttribArray(2);
	}


	emitParticles() {
		const sourceVBO = this.particleVBOs[this.currentSourceIdx];
		const sourceVAO = this.particleVAOs[this.currentSourceIdx];
		const destinationVBO = this.particleVBOs[(this.currentSourceIdx + 1) % 2];

		
		this.shaderEmit.bind();
		this.shaderEmit.uniform('time', 'float', this.time);
		this.setupVertexAttributes(sourceVAO, sourceVBO);

		gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.transformFeedback);
		gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, destinationVBO[0]);
		gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 1, destinationVBO[1]);

		gl.enable(gl.RASTERIZER_DISCARD);
		// Emit particles using transform feedback
		gl.beginTransformFeedback(gl.POINTS);
		gl.drawArrays(gl.POINTS, 0, NUM_PARTICLES);
		gl.endTransformFeedback();

		gl.disable(gl.RASTERIZER_DISCARD);
		gl.useProgram(null);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null);
		gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 1, null);
		gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);

		this.currentSourceIdx = (this.currentSourceIdx + 1) % 2;
	}

	render() {
		this.time += 0.01;
		this.emitParticles();

		GL.clear();
		this._bAxis.draw();
		this._bDots.draw();

		this.setupVertexAttributes(this.particleVAOs[this.currentSourceIdx], this.particleVBOs[this.currentSourceIdx]);

		this.shaderDraw.bind();
		this.shaderDraw.uniform('uViewMatrix', 'mat4', this.camera.viewMatrix);
		this.shaderDraw.uniform('uProjectionMatrix', 'mat4', this.camera.projectionMatrix);
		this.shaderDraw.uniform('uViewport', 'vec2', [GL.width, GL.height]);

		gl.drawArrays(gl.POINTS, 0, NUM_PARTICLES);

		this.transformFeedbackObj.render();
		
	}
}


export default SceneTransformFeedbacks;