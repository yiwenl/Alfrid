(function() {
	requirejs.config(
		{
			"paths": {
				"glMatrix": ["../../../js/libs/gl-matrix-2.2.2-min"],
				"Scheduler": ["../../../js/bongiovi/Scheduler"]
			},
			"shim": {
				"glMatrix": "glMatrix",
				"Scheduler": "Scheduler"
			}
		}
	);
	
	requirejs(["app"]);
})();