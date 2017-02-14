// SceneTransformFeedbacks.js

import alfrid, { GL } from '../alfrid';

import vsEmit from './shaders/transform/emit.vert';
import fsEmit from './shaders/transform/emit.frag';
import vsDraw from './shaders/transform/draw.vert';
import fsDraw from './shaders/transform/draw.frag';

console.log(vsDraw);
console.log(fsDraw);

let gl;
const NUM_PARTICLES = 1000;

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
		

		this.particlePositions = new Float32Array(NUM_PARTICLES * 2);
		this.particleIDs = new Float32Array(NUM_PARTICLES);

		for(let i=0; i<NUM_PARTICLES; i++) {
			this.particlePositions[i * 2] = Math.random() - 0.5;
			this.particlePositions[i * 2 + 1] = 0;
			this.particleIDs[i] = i;
		}


		this.particleVBOs = [];
		this.particleVAOs = [];

		for(let i=0; i<2; i++) {
			this.particleVBOs[i] = [];
			for(let j=0; j<2; j++) {
				this.particleVBOs[i][j] = gl.createBuffer();
			}

			gl.bindBuffer(gl.ARRAY_BUFFER, this.particleVBOs[i][0]);
			gl.bufferData(gl.ARRAY_BUFFER, this.particlePositions, gl.STREAM_COPY);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.particleVBOs[i][1]);
			gl.bufferData(gl.ARRAY_BUFFER, this.particleIDs, gl.STATIC_READ);

			this.particleVAOs[i] = gl.createVertexArray();
		}


		//	INIT SHADERS
		this.shaderEmit = new alfrid.GLShader(vsEmit, fsEmit, ['v_position']);
		this.shaderDraw = new alfrid.GLShader(vsDraw, fsDraw);


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
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, vboArray[1]);
		gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 0, 0);

		gl.enableVertexAttribArray(0);
		gl.enableVertexAttribArray(1);
	}


	emitParticles() {
		const sourceVBO = this.particleVBOs[this.currentSourceIdx];
		const sourceVAO = this.particleVAOs[this.currentSourceIdx];
		const destinationVBO = this.particleVBOs[(this.currentSourceIdx + 1) % 2];

		gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.transformFeedback);
		this.shaderEmit.bind();
		this.setupVertexAttributes(sourceVAO, sourceVBO);
		gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, destinationVBO[0]);

		gl.enable(gl.RASTERIZER_DISCARD);
		// Set uniforms
		// gl.uniform1f(emitTimeLocation, time);
		// gl.uniform2f(emitAccelerationLocation, 0.0, ACCELERATION);

		// Emit particles using transform feedback
		gl.beginTransformFeedback(gl.POINTS);
		gl.drawArrays(gl.POINTS, 0, NUM_PARTICLES);
		gl.endTransformFeedback();


		gl.disable(gl.RASTERIZER_DISCARD);
		gl.useProgram(null);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null);
		gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);

		this.currentSourceIdx = (this.currentSourceIdx + 1) % 2;
	}

	render() {

		this.emitParticles();

		GL.clear();
		this._bAxis.draw();
		this._bDots.draw();

		this.setupVertexAttributes(this.particleVAOs[this.currentSourceIdx], this.particleVBOs[this.currentSourceIdx]);

		this.shaderDraw.bind();

		gl.drawArrays(gl.POINTS, 0, NUM_PARTICLES);
		
	}
}


export default SceneTransformFeedbacks;