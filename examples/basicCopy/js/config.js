(function() {
	
	var projectJsFolder = "";
	var alfridJsFolder = "../../../js/";
	
	requirejs.config(
		{
			"paths": {
				"alfrid": alfridJsFolder + "alfrid",
				"Modernizr": alfridJsFolder + "libs/modernizr.custom.94850",
				"jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
				"tween": alfridJsFolder + "libs/tween",
				"glMatrix" : alfridJsFolder + "libs/gl-matrix-2.2.2-min",
				"datgui": "http://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.5/dat.gui.min"
			},
			"map": {
				
			},
			"shim": {
				"Modernizr": {
					"exports": "Modernizr"
				},
				"tween": {
					"exports": "TWEEN"
				},
				"glMatrix" : {
					"exports": "glMatrix"
				},
				"datgui": {
            		"exports": "dat"
        		}
			}
		}
	);
	
	requirejs(["alfrid/utils/PolyFills", "app"]);
})();