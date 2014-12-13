// ElementUtils.js

define([], function() {

	var ElementUtils = function() {
	}

	var p = ElementUtils.prototype;


	ElementUtils.addClass = function addClass(aNode, aClassName) {
		if(aNode == undefined) return;
		if (!ElementUtils.hasClass(aNode, aClassName)) {
				aNode.className += (aNode.className ? ' ' : '') + aClassName;
		}			
		
		return aNode;
	};
	
	ElementUtils.hasClass = function hasClass(aNode, aClassName) {
		try {
			return new RegExp('(\\s|^)'+aClassName+'(\\s|$)').test(aNode.className);	
		} catch(err) {
			console.error("ElementUtils.hasClass :: error : ", err);
		}
		return false;
	}
	
	ElementUtils.removeClass = function removeClass(aNode, aClassName, aDelay) {
		if (parseFloat(aDelay) > 0)
		{
			var callbackFunction = ListenerFunctions.createListenerFunctionWithArguments(this, this.removeClass, [aNode, aClassName]);
			setTimeout(callbackFunction, aDelay);
			
		}
		else
			{
			if (ElementUtils.hasClass(aNode, aClassName)) {
				aNode.className=aNode.className.replace(new RegExp('(\\s|^)'+aClassName+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
			}
		}
		
		return aNode;
	}


	return ElementUtils;
});