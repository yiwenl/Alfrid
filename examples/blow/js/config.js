(function() {
	var alfridJsFolder = "../../../js/";
	
	requirejs.config(
		{
			"paths": {
				"alfrid": alfridJsFolder + "alfrid",
				"glMatrix": ["../../../js/libs/gl-matrix-2.2.2-min"],
				"tween": ["../../../js/libs/Tween.min"],
				"text": ["../../../js/libs/text"],
				"SimpleImageLoader": ["../../../js/bongiovi/SimpleImageLoader"],
				"Scheduler": ["../../../js/bongiovi/Scheduler"]
			},
			"shim": {
				"glMatrix": "glMatrix",
				"SimpleImageLoader": "SimpleImageLoader",
				"Scheduler": "Scheduler",
				"tween": "tween"
			}
		}
	);
	
	requirejs(["app"]);
})();