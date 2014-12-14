// ObjLoader.js


define(["require"], function(require) {
	var ObjLoader = function(strObj) {
		this.strObj        = strObj;
		this.positions     = [];
		this.coords        = [];
		this.indices       = [];
		this.verticesCount = 0;
		this.vertices      = [];
		this.normals       = [];
		this.vertexNormals = [];
		this.uvs           = [];
		this.faces         = [];

		this._parse();
	}


	var p = ObjLoader.prototype;


	p._parse = function() {
		// v float float float
		var vertex_pattern = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

		// vn float float float
		var normal_pattern = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

		// vt float float
		var uv_pattern = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

		// f vertex vertex vertex ...
		var face_pattern1 = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/;

		// f vertex/uv vertex/uv vertex/uv ...
		var face_pattern2 = /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/;

		// f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...
		var face_pattern3 = /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/;

		// f vertex//normal vertex//normal vertex//normal ... 
		var face_pattern4 = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/



		var lines = this.strObj.split( '\n' );

		for ( var i = 0; i < lines.length; i ++ ) {

			var line = lines[ i ];
			line = line.trim();

			var result;

			if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

				continue;

			} else if ( ( result = vertex_pattern.exec( line ) ) !== null ) {

				// ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

				this.vertices.push( [
					parseFloat( result[ 1 ] ),
					parseFloat( result[ 2 ] ),
					parseFloat( result[ 3 ] )
				]);

			} else if ( ( result = normal_pattern.exec( line ) ) !== null ) {

				// ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

				this.vertexNormals.push( [
					parseFloat( result[ 1 ] ),
					parseFloat( result[ 2 ] ),
					parseFloat( result[ 3 ] )
				]);

			} else if ( ( result = uv_pattern.exec( line ) ) !== null ) {

				// ["vt 0.1 0.2", "0.1", "0.2"]

				this.uvs.push(  [
					parseFloat( result[ 1 ] ),
					parseFloat( result[ 2 ] )
				]);

			} else if ( ( result = face_pattern1.exec( line ) ) !== null ) {

				faces.push( [ 	parseInt( result[ 1 ] ) - 1,
								parseInt( result[ 2 ] ) - 1,
								parseInt( result[ 3 ] ) - 1 	]);

				positions.push(	[	this.vertices[parseInt( result[ 1 ] ) - 1], 
									this.vertices[parseInt( result[ 2 ] ) - 1], 
									this.vertices[parseInt( result[ 3 ] ) - 1] ]);

				this.indices.push(this.verticesCount++);
				this.indices.push(this.verticesCount++);
				this.indices.push(this.verticesCount++);

			} else if ( ( result = face_pattern2.exec( line ) ) !== null ) {

				if(result[ 11 ] == undefined) {
					this.positions.push( this.vertices[parseInt( result[ 2 ] ) - 1]);
					this.positions.push( this.vertices[parseInt( result[ 5 ] ) - 1]);
					this.positions.push( this.vertices[parseInt( result[ 8 ] ) - 1]);

					this.coords.push( this.uvs[ parseInt( result[ 3 ] ) - 1 ]);
					this.coords.push( this.uvs[ parseInt( result[ 6 ] ) - 1 ]);
					this.coords.push( this.uvs[ parseInt( result[ 9 ] ) - 1 ]);

					this.indices.push( this.verticesCount++);
					this.indices.push( this.verticesCount++);
					this.indices.push( this.verticesCount++);
				} else {
					this.positions.push( this.vertices[parseInt( result[ 11 ] ) - 1]);
					this.positions.push( this.vertices[parseInt( result[ 5 ] ) - 1]);
					this.positions.push( this.vertices[parseInt( result[ 2 ] ) - 1]);
					
					this.coords.push( this.uvs[ parseInt( result[ 12 ] ) - 1 ]);
					this.coords.push( this.uvs[ parseInt( result[ 6 ] ) - 1 ]);
					this.coords.push( this.uvs[ parseInt( result[ 3 ] ) - 1 ]);

					this.indices.push(this.verticesCount++);
					this.indices.push(this.verticesCount++);
					this.indices.push(this.verticesCount++);
					
					this.positions.push(this.vertices[parseInt( result[ 11 ] ) - 1]);
					this.positions.push(this.vertices[parseInt( result[ 8 ] ) - 1]);
					this.positions.push(this.vertices[parseInt( result[ 5 ] ) - 1]);
					
					this.coords.push( this.uvs[ parseInt( result[ 12 ] ) - 1 ]);
					this.coords.push( this.uvs[ parseInt( result[ 9 ] ) - 1 ]);
					this.coords.push( this.uvs[ parseInt( result[ 6 ] ) - 1 ]);

					this.indices.push( this.verticesCount++);
					this.indices.push( this.verticesCount++);
					this.indices.push( this.verticesCount++);
				}

			} else if ( ( result = face_pattern3.exec( line ) ) !== null ) {

				if(result[ 14 ] == undefined) {
					this.positions.push( this.vertices[parseInt( result[ 2 ] ) - 1]);
					this.positions.push( this.vertices[parseInt( result[ 6 ] ) - 1]);
					this.positions.push( this.vertices[parseInt( result[ 10 ] ) - 1]);

					this.coords.push( this.uvs[ parseInt( result[ 3 ] ) - 1 ]);
					this.coords.push( this.uvs[ parseInt( result[ 7 ] ) - 1 ]);
					this.coords.push( this.uvs[ parseInt( result[ 11 ] ) - 1 ]);

					this.normals.push( this.vertexNormals[ parseInt( result[ 4 ] ) - 1 ]);
					this.normals.push( this.vertexNormals[ parseInt( result[ 8 ] ) - 1 ]);
					this.normals.push( this.vertexNormals[ parseInt( result[ 12 ] ) - 1 ]);

					this.indices.push( this.verticesCount++);
					this.indices.push( this.verticesCount++);
					this.indices.push( this.verticesCount++);
				} else {
					this.positions.push( this.vertices[parseInt( result[ 2 ] ) - 1]);
					this.positions.push( this.vertices[parseInt( result[ 6 ] ) - 1]);
					this.positions.push( this.vertices[parseInt( result[ 14 ] ) - 1]);
					
					this.coords.push( this.uvs[ parseInt( result[ 3 ] ) - 1 ]);
					this.coords.push( this.uvs[ parseInt( result[ 7 ] ) - 1 ]);
					this.coords.push( this.uvs[ parseInt( result[ 15 ] ) - 1 ]);
					
					this.normals.push( this.vertexNormals[ parseInt( result[ 4 ] ) - 1 ]);
					this.normals.push( this.vertexNormals[ parseInt( result[ 8 ] ) - 1 ]);
					this.normals.push( this.vertexNormals[ parseInt( result[ 16 ] ) - 1 ]);

					this.indices.push(this.verticesCount++);
					this.indices.push(this.verticesCount++);
					this.indices.push(this.verticesCount++);
					
					this.positions.push(this.vertices[parseInt( result[ 6 ] ) - 1]);
					this.positions.push(this.vertices[parseInt( result[ 10 ] ) - 1]);
					this.positions.push(this.vertices[parseInt( result[ 14 ] ) - 1]);
					
					this.coords.push( this.uvs[ parseInt( result[ 7 ] ) - 1 ]);
					this.coords.push( this.uvs[ parseInt( result[ 11 ] ) - 1 ]);
					this.coords.push( this.uvs[ parseInt( result[ 15 ] ) - 1 ]);
					
					this.normals.push( this.vertexNormals[ parseInt( result[ 8 ] ) - 1 ]);
					this.normals.push( this.vertexNormals[ parseInt( result[ 12 ] ) - 1 ]);
					this.normals.push( this.vertexNormals[ parseInt( result[ 16 ] ) - 1 ]);

					this.indices.push( this.verticesCount++);
					this.indices.push( this.verticesCount++);
					this.indices.push( this.verticesCount++);
				}

			

			} else if ( ( result = face_pattern4.exec( line ) ) !== null ) {

				console.log("Face 4");

				// ["f 1//1 2//2 3//3", " 1//1", "1", "1", " 2//2", "2", "2", " 3//3", "3", "3"]

				// geometry.vertices.push(
				// 	vertices[ parseInt( result[ 2 ] ) - 1 ],
				// 	vertices[ parseInt( result[ 5 ] ) - 1 ],
				// 	vertices[ parseInt( result[ 8 ] ) - 1 ]
				// );

				// geometry.faces.push( face3(
				// 	verticesCount ++,
				// 	verticesCount ++,
				// 	verticesCount ++,
				// 	[
				// 		normals[ parseInt( result[ 3 ] ) - 1 ],
				// 		normals[ parseInt( result[ 6 ] ) - 1 ],
				// 		normals[ parseInt( result[ 9 ] ) - 1 ]
				// 	]
				// ) );

			}
		}

	};


	return ObjLoader;
});