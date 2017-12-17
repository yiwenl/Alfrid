// GltfLoader.js

import xhr from './xhr';

const ARRAY_CTOR_MAP = {
	5120: Int8Array,
	5121: Uint8Array,
	5122: Int16Array,
	5123: Uint16Array,
	5125: Uint32Array,
	5126: Float32Array
};

const SIZE_MAP = {
	SCALAR: 1,
	VEC2: 2,
	VEC3: 3,
	VEC4: 4,
	MAT2: 4,
	MAT3: 9,
	MAT4: 16
};

const semanticAttributeMap = {
	'NORMAL': 'aNormal',
	'POSITION': 'aVertexPosition',
	// 'TANGENT': 'aTangent',
	'TEXCOORD_0': 'aTextureCoord',
	'TEXCOORD_1': 'aTextureCoord1',
	'WEIGHTS_0': 'aWeight',
	'JOINTS_0': 'aJoint',
	'COLOR': 'aColor'
};

let base;

const load = ( mSource ) => new Promise((resolve, reject) => {
	if((typeof mSource) === 'string') {
		base = mSource.substring(0, mSource.lastIndexOf('/')+1);
	} else {
		base = '';
	}

	_loadGltf(mSource)
	.then(_loadBin)
	.then(_getBufferViewData)
	.then(_loadTextures)
	.then(_parseMesh)
	.then((gltfInfo)=>{
		resolve(gltfInfo);
	})
	.catch(e => {
		console.log('Error:', e);
	});
});


const _getAccessorData = (gltf, accessorIdx, isIndices = false) => {
	const accessorInfo = gltf.accessors[accessorIdx];
	const buffer = gltf.bufferViews[accessorInfo.bufferView].data;
	const byteOffset = accessorInfo.byteOffset || 0;
	const ArrayCtor = ARRAY_CTOR_MAP[accessorInfo.componentType] || Float32Array;
	let size = SIZE_MAP[accessorInfo.type];
	if (size == null && isIndices) {
		size = 1;
	}
	let arr = new ArrayCtor(buffer, byteOffset, size * accessorInfo.count);
	const quantizeExtension = accessorInfo.extensions && accessorInfo.extensions['WEB3D_quantized_attributes'];
	if (quantizeExtension) {
		var decodedArr = new Float32Array(size * accessorInfo.count);
		var decodeMatrix = quantizeExtension.decodeMatrix;
		var decodeOffset, decodeScale;
		var decodeOffset = new Array(size);
		var decodeScale = new Array(size);
		for (var k = 0; k < size; k++) {
			decodeOffset[k] = decodeMatrix[size * (size + 1) + k];
			decodeScale[k] = decodeMatrix[k * (size + 1) + k];
		}
		for (var i = 0; i < accessorInfo.count; i++) {
			for (var k = 0; k < size; k++) {
				decodedArr[i * size + k] = arr[i * size + k] * decodeScale[k] + decodeOffset[k];
			}
		}

		arr = decodedArr;
	}

	console.log({buffer, byteOffset, ArrayCtor, size, arr});

	return arr;
}

const _parseMesh = (gltf) => new Promise((resolve, reject) => {
	const { meshes } = gltf;
	gltf.geometries = [];

	meshes.forEach( (mesh, i) => {
		const { primitives } = mesh;
		const geometry = {};

		primitives.forEach( (primitiveInfo, i) => {
			const semantics = Object.keys(primitiveInfo.attributes);

			semantics.forEach( (semantic, i) => {
				const accessorIdx = primitiveInfo.attributes[semantic];
				const attributeInfo = gltf.accessors[accessorIdx];
				const attributeName = semanticAttributeMap[semantic];
				if(!attributeName) {
					return;
				}
				const size = SIZE_MAP[attributeInfo.type];
				let attributeArray = _getAccessorData(gltf, accessorIdx);
				if (attributeArray instanceof Uint32Array) {
					attributeArray = new Float32Array(attributeArray);
				}

				// console.log({
				// 	accessorIdx,
				// 	attributeInfo,
				// 	attributeName,
				// 	size,
				// 	attributeArray
				// });

				geometry[attributeName] = {
					value:attributeArray,
					size,
				}
				// console.log('attribute', attributeName, geometry[attributeName]);
			});

			//	parse index
			if (primitiveInfo.indices != null) {
				const attributeArray = _getAccessorData(gltf, primitiveInfo.indices, true);
				geometry.indices = {
					value:attributeArray,
					size:1
				}
			}

			// console.log('Geometry:', geometry);
			gltf.geometries.push(geometry);
		});
	});

	resolve(gltf);
});


const _getBufferViewData = (gltfInfo) => new Promise((resolve, reject) => {
	const { bufferViews, buffers } = gltfInfo;

	bufferViews.forEach( (bufferViewInfo, i) => {
		const buffer = buffers[bufferViewInfo.buffer].data;
		bufferViewInfo.data = buffer.slice(bufferViewInfo.byteOffset || 0, (bufferViewInfo.byteOffset || 0) + (bufferViewInfo.byteLength || 0));
	});
	resolve(gltfInfo);
});

const _loadGltf = (mSource) => new Promise((resolve, reject) => {
	if( (typeof mSource) !== 'string') {
		resolve(mSource);
	} else {
		xhr(mSource).then((o)=>{
			resolve(JSON.parse(o));
		}, (e)=> {
			reject(e);
		});
	}
});


const _loadBin = (gltfInfo) => new Promise((resolve, reject) => {
	
	if(gltfInfo.buffers) {
		let count = gltfInfo.buffers.length;

		gltfInfo.buffers.forEach( buffer => {

			const urlBin = `${base}${gltfInfo.buffers[0].uri}`;
			xhr(urlBin, true).then((o)=> {
				buffer.data = o;

				count --;
				if(count === 0) {
					resolve(gltfInfo);	
				}
				
			}, e => {
				reject(e);
			});
		});
		
	} else {
		resolve(gltfInfo);	
	}
	
});

const _loadTextures = (gltfInfo) => new Promise((resolve, reject) => {
	console.log('TODO : Loading textures');
	resolve(gltfInfo);
});

const parse = ( mGltfInfo, mBin ) => new Promise((resolve, reject) => {
	resolve(mSource);
});


export default {
	load,
	parse
};