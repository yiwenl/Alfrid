// main.js
import './global.scss';
import quickSetup from './utils/quickSetup';

import { GL, Geom, GLShader } from '../src/alfrid';
let cube, shader;

let mtx1 = mat4.create();
mat4.translate(mtx1, mtx1, vec3.fromValues(0, 2, 0));
let mtx2 = mat4.create();

mat4.translate(mtx2, mtx2, vec3.fromValues(1, 1, 0));

function render() {
	shader.bind();

	GL.pushMatrix();
	GL.rotate(mtx1);


	GL.pushMatrix();
	GL.rotate(mtx2);
	GL.draw(cube);

	GL.popMatrix();
	GL.draw(cube);

	GL.popMatrix();
	GL.draw(cube);
}


quickSetup(render)
.then(()=> {
	cube = Geom.cube(1, 1, 1);
	shader = new GLShader();
});
