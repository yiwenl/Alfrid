define(["glMatrix"], function(glMatrix) {

	var SceneRotation = function(aListenerTarget) {
		if(aListenerTarget == undefined) aListenerTarget = document;

		this._z             = 0;
		this._mouseZ        = 0;
		this._preZ          = 0;
		this._isRotateZ     = 0;
		this.matrix         = glMatrix.mat4.create();
		this.m              = glMatrix.mat4.create();
		this._vZaxis        = glMatrix.vec3.clone([0, 0, 0]);
		this._zAxis         = glMatrix.vec3.clone([0, 0, -1]);
		this.preMouse       = {x:0, y:0};
		this.mouse          = {x:0, y:0};
		this._isMouseDown   = false;
		this._rotation      = glMatrix.quat.clone([0, 0, 1, 0]);
		this.tempRotation   = glMatrix.quat.clone([0, 0, 0, 0]);
		this.invertRotation = glMatrix.quat.create();
		this._rotateZMargin = 0;
		this.diffX          = 0;
		this.diffY          = 0;
		this._currDiffX     = 0;
		this._currDiffY     = 0;
		this._offset        = .004;
		this._easing        = .1;
		this._slerp			= -1;

		var that = this;
		aListenerTarget.addEventListener("mousedown", function(aEvent) { that._onMouseDown(aEvent); });
		aListenerTarget.addEventListener("touchstart", function(aEvent) {	that._onMouseDown(aEvent); });
		aListenerTarget.addEventListener("mouseup", function(aEvent) { that._onMouseUp(aEvent); });
		aListenerTarget.addEventListener("touchend", function(aEvent) { that._onMouseUp(aEvent); });
		aListenerTarget.addEventListener("mousemove", function(aEvent) { that._onMouseMove(aEvent); });
		aListenerTarget.addEventListener("touchmove", function(aEvent) { that._onMouseMove(aEvent); });
		aListenerTarget.addEventListener("mousewheel", function(aEvent) {	that._onMouseWheel(aEvent); });
		aListenerTarget.addEventListener("DOMMouseScroll", function(aEvent) {	that._onMouseWheel(aEvent); });
	};

	var p = SceneRotation.prototype;

	p.getMousePos = function(aEvent) {
		var mouseX, mouseY;

		if(aEvent.changedTouches != undefined) {
			mouseX = aEvent.changedTouches[0].pageX;
			mouseY = aEvent.changedTouches[0].pageY;
		} else {
			mouseX = aEvent.clientX;
			mouseY = aEvent.clientY;
		}
		
		return {x:mouseX, y:mouseY};
	};

	p._onMouseDown = function(aEvent) {
		if(this._isMouseDown) return;

		var mouse = this.getMousePos(aEvent);
		var tempRotation = glMatrix.quat.clone(this._rotation);
		this._updateRotation(tempRotation);
		this._rotation = tempRotation;

		this._isMouseDown = true;
		this._isRotateZ = 0;
		this.preMouse = {x:mouse.x, y:mouse.y};

		if(mouse.y < this._rotateZMargin || mouse.y > (window.innerHeight - this._rotateZMargin) ) this._isRotateZ = 1;
		else if(mouse.x < this._rotateZMargin || mouse.x > (window.innerWidth - this._rotateZMargin) ) this._isRotateZ = 2;	
		
		this._z = this._preZ;

		this._currDiffX = this.diffX = 0;
		this._currDiffY = this.diffY = 0;
	};

	p._onMouseMove = function(aEvent) {
		this.mouse = this.getMousePos(aEvent);
	};

	p._onMouseUp = function(aEvent) {
		if(!this._isMouseDown) return;
		this._isMouseDown = false;
	};

	p._onMouseWheel = function(aEvent) {
		aEvent.preventDefault();
		var w = aEvent.wheelDelta;
		var d = aEvent.detail;
		var value = 0;
		if (d){
			if (w) value = w/d/40*d>0?1:-1; // Opera
			else value = -d/3;              // Firefox;         TODO: do not /3 for OS X
		} else value = w/120; 

		this._preZ -= value*5;
	};

	p.setCameraPos = function(quat) {
		console.log( "Set camera pos : ", quat );

		if(this._slerp > 0) return;

		var tempRotation = glMatrix.quat.clone(this._rotation);
		this._updateRotation(tempRotation);
		this._rotation = glMatrix.quat.clone(tempRotation);
		this._currDiffX = this.diffX = 0;
		this._currDiffY = this.diffY = 0;

		this._isMouseDown = false;
		this._isRotateZ = 0;

		this._targetQuat = glMatrix.quat.clone(quat);
		this._slerp = 1;

	};


	p.resetQuat = function() {
		this._rotation    = glMatrix.quat.clone([0, 0, 1, 0]);
		this.tempRotation = glMatrix.quat.clone([0, 0, 0, 0]);
		this._targetQuat  = undefined;
		this._slerp       = -1;
	};

	p.update = function() {
		glMatrix.mat4.identity(this.m);
		glMatrix.mat4.identity(this.matrix);

		if(this._targetQuat == undefined) { 
			glMatrix.quat.set(this.tempRotation, this._rotation[0], this._rotation[1], this._rotation[2], this._rotation[3]);
			this._updateRotation(this.tempRotation);
		} else {
			this._slerp += (0 - this._slerp) * .1;

			if(this._slerp < .001) {
				glMatrix.quat.set(this._rotation, this._targetQuat[0], this._targetQuat[1], this._targetQuat[2], this._targetQuat[3]);
				this._targetQuat = undefined;
				this._slerp = -1;
			} else {
				glMatrix.quat.set(this.tempRotation, 0, 0, 0, 0);
				glMatrix.quat.slerp(this.tempRotation, this._targetQuat, this._rotation, this._slerp);
			}
		}

		glMatrix.vec3.set(this._vZaxis, 0, 0, this._z);
		this.invertRotation = glMatrix.quat.create();
		glMatrix.quat.invert(this.invertRotation, this.tempRotation);
		glMatrix.vec3.transformQuat(this._vZaxis, this._vZaxis, this.invertRotation);

		glMatrix.mat4.translate(this.m, this.m, this._vZaxis);
		glMatrix.mat4.fromQuat(this.matrix, this.tempRotation);
		glMatrix.mat4.multiply(this.matrix, this.matrix, this.m);
	};


	p._updateRotation = function(aTempRotation) {
		if(this._isMouseDown && !this._isLocked) {
			this.diffX = (this.mouse.x - this.preMouse.x) ;
			this.diffY = -(this.mouse.y - this.preMouse.y) ;

			if(this._isInvert) this.diffX = -this.diffX;
			if(this._isInvert) this.diffY = -this.diffY;
		}
		
		this._currDiffX += (this.diffX - this._currDiffX) * this._easing;
		this._currDiffY += (this.diffY - this._currDiffY) * this._easing;

		if(this._isRotateZ > 0) {
			if(this._isRotateZ == 1) {
				var angle = -this._currDiffX * this._offset; 
				angle *= (this.preMouse.y < this._rotateZMargin) ? -1 : 1;
				var quat = glMatrix.quat.clone( [0, 0, Math.sin(angle), Math.cos(angle) ] );
				glMatrix.quat.multiply(quat, aTempRotation, quat);
			} else {
				var angle = -this._currDiffY * this._offset; 
				angle *= (this.preMouse.x < this._rotateZMargin) ? 1 : -1;
				var quat = glMatrix.quat.clone( [0, 0, Math.sin(angle), Math.cos(angle) ] );
				glMatrix.quat.multiply(quat, aTempRotation, quat);
			}
		} else {
			var v = glMatrix.vec3.clone([this._currDiffX, this._currDiffY, 0]);
			var axis = glMatrix.vec3.create();
			glMatrix.vec3.cross(axis, v, this._zAxis);
			glMatrix.vec3.normalize(axis, axis);
			var angle = glMatrix.vec3.length(v) * this._offset;
			var quat = glMatrix.quat.clone( [Math.sin(angle) * axis[0], Math.sin(angle) * axis[1], Math.sin(angle) * axis[2], Math.cos(angle) ] );
			glMatrix.quat.multiply(aTempRotation, aTempRotation, quat);
		}
		
		this._z += (this._preZ - this._z) * this._easing;

	};

	return SceneRotation;
	
});