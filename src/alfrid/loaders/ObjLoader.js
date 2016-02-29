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

	_onLoaded() {
		this._parseObj(this._req.response);
	}

	_parseObj(objStr) {
		let lines = objStr.split('\n');

		let positions    = [];
		let coords       = [];
		let finalNormals = [];
		let vertices     = [];
		let normals      = [];
		let uvs          = [];
		let indices      = [];
		let count        = 0;
		let result;

		// v float float float
		let vertex_pattern = /v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

		// vn float float float
		let normal_pattern = /vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

		// vt float float
		let uv_pattern = /vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/;

		// f vertex vertex vertex ...
		let face_pattern1 = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/;

		// f vertex/uv vertex/uv vertex/uv ...
		let face_pattern2 = /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/;

		// f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...
		let face_pattern3 = /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/;

		// f vertex//normal vertex//normal vertex//normal ... 
		let face_pattern4 = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/;


		function parseVertexIndex( value ) {
			let index = parseInt( value );
			return ( index >= 0 ? index - 1 : index + vertices.length / 3 ) * 3;
		}

		function parseNormalIndex( value ) {
			let index = parseInt( value );
			return ( index >= 0 ? index - 1 : index + normals.length / 3 ) * 3;
		}

		function parseUVIndex( value ) {
			let index = parseInt( value );
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
			let ia = parseVertexIndex( a );
			let ib = parseVertexIndex( b );
			let ic = parseVertexIndex( c );
			let id;

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


		for ( let i = 0; i < lines.length; i ++ ) {
			let line = lines[ i ];
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
		const maxNumVertices = 65535;
		let hasNormals = o.normals.length > 0;
		let hasUVs = o.coords.length > 0;

		if(o.positions.length > maxNumVertices) {
			let meshes = [];
			let lastIndex = 0;

			let oCopy       = {};
			oCopy.positions = o.positions.concat();
			oCopy.coords    = o.coords.concat();
			oCopy.indices   = o.indices.concat();
			oCopy.normals   = o.normals.concat();

			while(o.indices.length > 0) {

				let sliceNum  = Math.min(maxNumVertices, o.positions.length);
				let indices   = o.indices.splice(0, sliceNum);
				let positions = [];
				let coords    = [];
				let normals   = [];
				let index, tmpIndex = 0;

				for(let i=0; i<indices.length; i++ ) {
					if(indices[i] > tmpIndex) {
						tmpIndex = indices[i];
					}

					index = indices[i];

					positions.push(oCopy.positions[index]);
					if(hasUVs) {
						coords.push(oCopy.coords[index]);	
					}
					if(hasNormals) {
						normals.push(oCopy.normals[index]);	
					}
					
					indices[i] -= lastIndex;
				}

				lastIndex = tmpIndex+1;

				let mesh = new Mesh(this._drawType);
				mesh.bufferVertex(positions);
				if(hasUVs) {
					mesh.bufferTexCoords(coords);	
				}
				
				mesh.bufferIndices(indices);
				if(!this._ignoreNormals && hasNormals) {
					mesh.bufferNormal(normals);
				}

				meshes.push(mesh);
			}

			if(this._callback) {
				this._callback(meshes, oCopy);
			}
		} else {
			let mesh = new Mesh(this._drawType);
			mesh.bufferVertex(o.positions);
			if(hasUVs) {
				mesh.bufferTexCoords(o.coords);	
			}
			mesh.bufferIndices(o.indices);
			if(!this._ignoreNormals && hasNormals) {
				mesh.bufferNormal(o.normals);
			}

			if(this._callback) {
				this._callback(mesh, o);
			}
		}
		
	}
}

export default ObjLoader;