// Scene.js

import CameraOrtho from '../cameras/CameraOrtho';
import CameraPerspective from '../cameras/CameraPerspective';
import GL from '../GLTool';
import OrbitalControl from '../utils/OrbitalControl';
import Scheduler from 'scheduling';

class Scene {


	constructor(options = {}) {
		this._children = [];
		this._matrixIdentity = mat4.create();
		GL.enableAlphaBlending();

		this._init(options);
		this._initTextures(options);
		this._initViews(options);

		this._efIndex = Scheduler.addEF(()=>this._loop());

		this._targetListener = options.container || window;

		this._resize = this.resize.bind(this);
		window.addEventListener('resize', this._resize);
	}
	

	
	//	PUBLIC METHODS

	update() {

	}

	render() {

	}


	stop() {
		if(this._efIndex === -1) {	return; }
		this._efIndex = Scheduler.removeEF(this._efIndex);
	}


	start() {
		if(this._efIndex !== -1) {
			return;
		} 

		this._efIndex = Scheduler.addEF(()=>this._loop());
	}


	resize(width, height) {
		GL.setSize(width || window.innerWidth, height || window.innerHeight);
		this.camera.setAspectRatio(GL.aspectRatio);
	}


	addChild(mChild) {
		this._children.push(mChild);
	}

	removeChild(mChild) {
		const index = this._children.indexOf(mChild);
		if(index == -1) {	console.warn('Child no exist'); return;	}

		this._children.splice(index, 1);
	}


	//	PROTECTED METHODS TO BE OVERRIDEN BY CHILDREN

	_initTextures() {

	}


	_initViews() {

	}


	_renderChildren() {
		let child;
		for(let i=0; i<this._children.length; i++) {
			child = this._children[i];
			child.toRender();
		}

		GL.rotate(this._matrixIdentity);
	}

	//	PRIVATE METHODS

	_init(options) {
		this.camera                 = new CameraPerspective();
		this.camera.setPerspective(45 * Math.PI / 180, GL.aspectRatio, 0.1, 100);
		this.orbitalControl.radius.value = 10;
		
		this.cameraOrtho            = new CameraOrtho();
	}

	_loop() {

		//	RESET VIEWPORT
		GL.viewport(0, 0, GL.width, GL.height);

		//	RESET CAMERA
		GL.setMatrices(this.camera);

		this.update();
		this._renderChildren();
		this.render();
	}
}


export default Scene;