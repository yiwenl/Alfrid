// main.js
import './global.scss';
import quickSetup from './utils/quickSetup';

import { GL, Geom, GLShader } from '../src/alfrid';
let cube, shader;

function render() {
	shader.bind();
	GL.draw(cube);
}

function onComplete() {
	cube = Geom.cube(1, 1, 1);
	shader = new GLShader();
}

quickSetup(render, onComplete);
