// multi-render-target.js
console.log('dev : multi-render-target');

import '../global.scss';
import quickSetup from '../utils/quickSetup';
import alfrid, { GL } from 'src/alfrid';
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
	shader = new alfrid.GLShader(vs, fs);

	const fboSize = 1024;
	fbo = new alfrid.FrameBuffer(fboSize, fboSize, {}, 9);

	bCopy = new alfrid.BatchCopy();

	console.log('DEPTH_COMPONENT16', GL.gl.DEPTH_COMPONENT16);
}


function render() {

	fbo.bind();
	GL.clear(0, 0, 0, 0);
	shader.bind();
	GL.draw(mesh);
	fbo.unbind();

	const s = GL.width / fbo.numTargets;
	for(let i=0; i<fbo.numTargets; i++) {
		GL.viewport(s * i, 0, s, s/GL.aspectRatio);
		bCopy.draw(fbo.getTexture(i));
	}

	GL.viewport(0, 0, GL.width, GL.height);
}