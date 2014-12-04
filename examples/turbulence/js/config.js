(function() {
	
	var projectJsFolder = "";
	var alfridJsFolder = "../../../js/";
	
	requirejs.config(
		{
			"paths": {
				"alfrid": alfridJsFolder + "alfrid"
			},
			"map": {
				
			},
			"shim": {
				
			}
		}
	);
	
	requirejs(["app"]);
})();