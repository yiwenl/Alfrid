// multi-render-target.js
console.log('dev : multi-render-target');

import '../global.scss';
import quickSetup from '../utils/quickSetup';
import alfrid, { GL, WebglNumber } from 'src/alfrid';
import vs from 'shaders/cube.vert';
import fs from 'shaders/cube.frag';


let shader, fbo, mesh, bCopy;


quickSetup(render).then((o)=>init(o)).catch(err=>{
	console.log('Error :', err);
});


function init(o) {
	console.log('Init', o);

	const s = 1;
	mesh = alfrid.Geom.cube(s, s, s);
	shader = new alfrid.GLShader();

	console.log('HALF_FLOAT :', GL.HALF_FLOAT);

	const fboSize = 1000;
	fbo = new alfrid.FrameBuffer(fboSize, fboSize, {type:GL.HALF_FLOAT});

	bCopy = new alfrid.BatchCopy();
}


function render() {

	fbo.bind();
	GL.clear(0, 0, 0, 0);
	shader.bind();
	GL.draw(mesh);
	fbo.unbind();

	
	const s = 200;
	GL.viewport(0, 0, s, s);
	bCopy.draw(fbo.getTexture());
	GL.viewport(0, 0, GL.width, GL.height);
}