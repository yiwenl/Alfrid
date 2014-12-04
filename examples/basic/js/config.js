(function() {
	
	var projectJsFolder = "";
	var alfridJsFolder = "../../js/";
	
	requirejs.config(
		{
			"paths": {
				"alfrid": alfridJsFolder + "alfrid",
				"Modernizr": alfridJsFolder + "libs/modernizr.custom.94850",
				"jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
				"tween": alfridJsFolder + "libs/tween"
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