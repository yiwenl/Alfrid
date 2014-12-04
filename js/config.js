(function() {
	
	var deployJsFolder = "";
	
	requirejs.config(
		{
			"paths": {
				"alfrid": deployJsFolder + "alfrid",
				"Modernizr": deployJsFolder + "libs/modernizr.custom.94850",
				"jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
				"tween": deployJsFolder + "libs/tween"
			},
			"map": {
				
			},
			"shim": {
				"Modernizr": {
					"exports": "Modernizr"
				},
				"tween": {
					"exports": "TWEEN"
				}
			}
		}
	);
	
	requirejs(["app"]);
})();