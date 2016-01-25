// Geom.js

'use strict';

import Mesh from './Mesh';
import GL from './GLTool';

let Geom = {};

Geom.plane = function(width, height, numSegments, withNormals=false, axis='xy', drawType=4) {
	let positions = [];
	let coords    = [];
	let indices   = [];
	let normals   = [];

	let gapX  = width/numSegments;
	let gapY  = height/numSegments;
	let gapUV = 1/numSegments;
	let index = 0;
	let sx    = -width * 0.5;
	let sy    = -height * 0.5;

	for(let i=0; i<numSegments; i++) {
		for (let j=0; j<numSegments; j++) {
			let tx = gapX * i + sx;
			let ty = gapY * j + sy;

			if(axis === 'xz') {
				positions.push([tx, 		0, 	ty+gapY	]);
				positions.push([tx+gapX, 	0, 	ty+gapY	]);
				positions.push([tx+gapX, 	0, 	ty	]);
				positions.push([tx, 		0, 	ty	]);	

				normals.push([0, 1, 0]);
				normals.push([0, 1, 0]);
				normals.push([0, 1, 0]);
				normals.push([0, 1, 0]);
			} else if(axis === 'yz') {
				positions.push([0, tx, 		ty]);
				positions.push([0, tx+gapX, ty]);
				positions.push([0, tx+gapX, ty+gapY]);
				positions.push([0, tx, 		ty+gapY]);	

				normals.push([1, 0, 0]);
				normals.push([1, 0, 0]);
				normals.push([1, 0, 0]);
				normals.push([1, 0, 0]);
			} else {
				positions.push([tx, 		ty, 	0]);
				positions.push([tx+gapX, 	ty, 	0]);
				positions.push([tx+gapX, 	ty+gapY, 	0]);
				positions.push([tx, 		ty+gapY, 	0]);	

				normals.push([0, 0, 1]);
				normals.push([0, 0, 1]);
				normals.push([0, 0, 1]);
				normals.push([0, 0, 1]);
			} 

			let u = i/numSegments;
			let v = j/numSegments;

			coords.push([u, v]);
			coords.push([u+gapUV, v]);
			coords.push([u+gapUV, v+gapUV]);
			coords.push([u, v+gapUV]);

			indices.push(index*4 + 0);
			indices.push(index*4 + 1);
			indices.push(index*4 + 2);
			indices.push(index*4 + 0);
			indices.push(index*4 + 2);
			indices.push(index*4 + 3);

			index++;
		}
	}

	let mesh = new Mesh(drawType);
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	if(withNormals) {
		mesh.bufferNormal(normals);
	}

	return mesh;
};

Geom.sphere = function(size, numSegments, withNormals=false, isInvert=false, drawType=4) {
	let positions = [];
	let coords    = [];
	let indices   = [];
	let normals   = [];
	let index     = 0;
	let gapUV     = 1/numSegments;

	let getPosition = function(i, j, isNormal=false) {	//	rx : -90 ~ 90 , ry : 0 ~ 360
		let rx        = i/numSegments * Math.PI - Math.PI * 0.5;
		let ry        = j/numSegments * Math.PI * 2;
		let r         = isNormal ? 1 : size;
		let pos       = [];
		pos[1]        = Math.sin(rx) * r;
		let t         = Math.cos(rx) * r;
		pos[0]        = Math.cos(ry) * t;
		pos[2]        = Math.sin(ry) * t;
		
		let precision = 10000;
		pos[0]        = Math.floor(pos[0] * precision) / precision;
		pos[1]        = Math.floor(pos[1] * precision) / precision;
		pos[2]        = Math.floor(pos[2] * precision) / precision;

		return pos;
	};

	
	for(let i=0; i<numSegments; i++) {
		for(let j=0; j<numSegments; j++) {
			positions.push(getPosition(i, j));
			positions.push(getPosition(i+1, j));
			positions.push(getPosition(i+1, j+1));
			positions.push(getPosition(i, j+1));

			if(withNormals) {
				normals.push(getPosition(i, j, true));
				normals.push(getPosition(i+1, j, true));
				normals.push(getPosition(i+1, j+1, true));
				normals.push(getPosition(i, j+1, true));	
			}
			

			let u = j/numSegments;
			let v = i/numSegments;
			
			
			coords.push([1.0 - u, v]);
			coords.push([1.0 - u, v+gapUV]);
			coords.push([1.0 - u - gapUV, v+gapUV]);
			coords.push([1.0 - u - gapUV, v]);

			indices.push(index*4 + 0);
			indices.push(index*4 + 1);
			indices.push(index*4 + 2);
			indices.push(index*4 + 0);
			indices.push(index*4 + 2);
			indices.push(index*4 + 3);

			index++;
		}
	}


	if(isInvert) {
		indices.reverse();
	}

	let mesh = new Mesh(drawType);
	mesh.bufferVertex(positions);
	mesh.bufferTexCoords(coords);
	mesh.bufferIndices(indices);
	if(withNormals) {
		mesh.bufferNormal(normals);
	}

	return mesh;
};

export default Geom;