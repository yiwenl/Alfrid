// alfrid.js

import GLM 					from 'gl-matrix';
import GLTool 				from './alfrid/GLTool';
import GLShader 			from './alfrid/GLShader';
import Mesh 				from './alfrid/Mesh';

//	TOOLS
import Scheduler 			from './alfrid/tools/Scheduler';
import EventDispatcher 		from './alfrid/tools/EventDispatcher';
import EaseNumber 			from './alfrid/tools/EaseNumber';
import OrbitalControl		from './alfrid/tools/OrbitalControl';

//	CAMERAS
import Camera 				from './alfrid/cameras/Camera';
import CameraOrtho 			from './alfrid/cameras/CameraOrtho';
import CameraPerspective	from './alfrid/cameras/CameraPerspective';


const VERSION = '1.0.0';

class alfrid {

	constructor() {
		
		this.glm               = GLM;
		this.GL                = GLTool;
		this.GLTool            = GLTool;
		this.GLShader          = GLShader;
		this.Mesh              = Mesh;
		this.Scheduler         = Scheduler;
		this.EventDispatcher   = EventDispatcher;
		this.EaseNumber        = EaseNumber;
		this.Camera            = Camera;
		this.CameraOrtho       = CameraOrtho;
		this.CameraPerspective = CameraPerspective;
		this.OrbitalControl    = OrbitalControl;


		//	NOT SUPER SURE I'VE DONE THIS IS A GOOD WAY

		for( let s in GLM) {
			if(GLM[s]) {
				window[s] = GLM[s];
			}
		}


		//	TESTING CODES
	}


	log() {
		if(navigator.userAgent.indexOf('Chrome') > -1) {
            console.log('%clib alfrid : VERSION ' + VERSION, 'background: #193441; color: #FCFFF5');
        } else {
        	console.log('lib alfrid : VERSION ', VERSION);
        }
		console.log('%cClasses : ', 'color: #193441');

		for(let s in this) {
			if(this[s]) {
				console.log('%c - '+s, 'color: #3E606F');
			}
		}
	}

}

let b = new alfrid();

module.exports = b;
