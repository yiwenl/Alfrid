// ObjLoader.js

'use strict';

import BinaryLoader from './BinaryLoader';
import Mesh from '../Mesh';

class ObjLoader extends BinaryLoader {
	constructor() {
		super();
	}

	load(url, callback, ignoreNormals=true, drawType=4) {
		this._ignoreNormals = ignoreNormals;
		this._drawType = drawType;
		super.load(url, callback);
	}

	_onLoaded(e) {
		this._parseObj(this._req.response);
	}

	_parseObj(objStr) {
		var lines = objStr.split('\n');

		var positions    = [];
		var coords       = [];
		var finalNormals = [];
		var vertices     = [];
		var normals      = [];
		var uvs          = [];
		var indices      = [];
		var count        = 0;
		var result;

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
		var face_pattern4 = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/;


		function parseVertexIndex( value ) {
			var index = parseInt( value );
			return ( index >= 0 ? index - 1 : index + vertices.length / 3 ) * 3;
		}

		function parseNormalIndex( value ) {
			var index = parseInt( value );
			return ( index >= 0 ? index - 1 : index + normals.length / 3 ) * 3;
		}

		function parseUVIndex( value ) {
			var index = parseInt( value );
			return ( index >= 0 ? index - 1 : index + uvs.length / 2 ) * 2;
		}


		function addVertex(a, b ,c) {
			positions.push([vertices[a], vertices[a+1], vertices[a+2]]);
			positions.push([vertices[b], vertices[b+1], vertices[b+2]]);
			positions.push([vertices[c], vertices[c+1], vertices[c+2]]);

			indices.push(count * 3 + 0);
			indices.push(count * 3 + 1);
			indices.push(count * 3 + 2);

			count ++;
		}


		function addUV(a, b, c) {
			coords.push([uvs[a], uvs[a+1]]);
			coords.push([uvs[b], uvs[b+1]]);
			coords.push([uvs[c], uvs[c+1]]);
		}


		function addNormal(a, b, c) {
			finalNormals.push([normals[a], normals[a+1], normals[a+2]]);
			finalNormals.push([normals[b], normals[b+1], normals[b+2]]);
			finalNormals.push([normals[c], normals[c+1], normals[c+2]]);
		}

		function addFace( a, b, c, d,  ua, ub, uc, ud,  na, nb, nc, nd ) {
			var ia = parseVertexIndex( a );
			var ib = parseVertexIndex( b );
			var ic = parseVertexIndex( c );
			var id;

			if ( d === undefined ) {

				addVertex( ia, ib, ic );

			} else {

				id = parseVertexIndex( d );

				addVertex( ia, ib, id );
				addVertex( ib, ic, id );

			}


			if ( ua !== undefined ) {

				ia = parseUVIndex( ua );
				ib = parseUVIndex( ub );
				ic = parseUVIndex( uc );

				if ( d === undefined ) {

					addUV( ia, ib, ic );

				} else {

					id = parseUVIndex( ud );

					addUV( ia, ib, id );
					addUV( ib, ic, id );

				}

			}

			if ( na !== undefined ) {

				ia = parseNormalIndex( na );
				ib = parseNormalIndex( nb );
				ic = parseNormalIndex( nc );

				if ( d === undefined ) {

					addNormal( ia, ib, ic );

				} else {

					id = parseNormalIndex( nd );

					addNormal( ia, ib, id );
					addNormal( ib, ic, id );

				}

			}
		}


		for ( var i = 0; i < lines.length; i ++ ) {
			var line = lines[ i ];
			line = line.trim();

			if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

				continue;

			} else if ( ( result = vertex_pattern.exec( line ) ) !== null ) {

				vertices.push(
					parseFloat( result[ 1 ] ),
					parseFloat( result[ 2 ] ),
					parseFloat( result[ 3 ] )
				);

			} else if ( ( result = normal_pattern.exec( line ) ) !== null ) {

				normals.push(
					parseFloat( result[ 1 ] ),
					parseFloat( result[ 2 ] ),
					parseFloat( result[ 3 ] )
				);

			} else if ( ( result = uv_pattern.exec( line ) ) !== null ) {

				uvs.push(
					parseFloat( result[ 1 ] ),
					parseFloat( result[ 2 ] )
				);

			} else if ( ( result = face_pattern1.exec( line ) ) !== null ) {

				addFace(
					result[ 1 ], result[ 2 ], result[ 3 ], result[ 4 ]
				);

			} else if ( ( result = face_pattern2.exec( line ) ) !== null ) {

				addFace(
					result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
					result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
				);

			} else if ( ( result = face_pattern3.exec( line ) ) !== null ) {
				addFace(
					result[ 2 ], result[ 6 ], result[ 10 ], result[ 14 ],
					result[ 3 ], result[ 7 ], result[ 11 ], result[ 15 ],
					result[ 4 ], result[ 8 ], result[ 12 ], result[ 16 ]
				);

			} else if ( ( result = face_pattern4.exec( line ) ) !== null ) {
				addFace(
					result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
					undefined, undefined, undefined, undefined,
					result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
				);

			} 
		}

		this._generateMeshes({	
			positions:positions,
			coords:coords,
			normals:finalNormals,
			indices:indices
		});
	}

	_generateMeshes(o) {

		let mesh = new Mesh(this._drawType);
		mesh.bufferVertex(o.positions);
		mesh.bufferTexCoords(o.coords);
		mesh.bufferIndices(o.indices);
		console.log(o.normals.length);
		if(!this._ignoreNormals) {
			mesh.bufferNormal(o.normals);
		}

		if(this._callback) {
			this._callback(mesh, o);
		}
	}
}

export default ObjLoader;