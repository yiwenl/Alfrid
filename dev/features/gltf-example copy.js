// gltf-example.js
console.log('dev : gltf-example');
import AssetLoader from 'assets-loader';

import '../global.scss';
import quickSetup from '../utils/quickSetup';

import alfrid, { GL, WebglNumber } from 'src/alfrid';
import vs from '../shaders/gltf.vert';
import fs from '../shaders/gltf.frag';

const assetsToLoad = [
		{"id":"scene","url":"assets/gltf/cube/scene.gltf","type":"text"},
		{"id":"sceneBin","url":"assets/gltf/cube/scene.bin","type":"binary"}
	];

quickSetup(assetsToLoad, render).then((o)=>init(o)).catch(err=>{
	console.log('Error :', err);
});


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



var sizeMap = {
	5123:2,
	5126:4,
	5121:1,
	5125:4,
}

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

let mesh, shader, meshTest;

function init(o) {
	console.log('Init', o, assets);

	const gltfInfo = JSON.parse(getAsset('scene'));
	

	console.log('GLTF Info :', gltfInfo);
	//	need to think about loading .bin / textures
	// console.log('Images :', gltfData.images);

	readAccessors(gltfInfo);
	mesh = readMesh(gltfInfo);

	console.log('Mesh :', mesh);

	shader = new alfrid.GLShader(vs, fs);


	const positions = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1];
	const indices = [0, 1, 2, 3, 2, 1, 4, 5, 6, 7, 6, 5, 8, 9, 10, 11, 10, 9, 12, 13, 14, 15, 14, 13, 16, 17, 18, 19, 18, 17, 20, 21, 22, 23, 22, 21];

	meshTest = new alfrid.Mesh();
	meshTest.bufferFlattenData(positions, 'aVertexPosition', 3);
	meshTest.bufferFlattenData(positions, 'aNormal', 3);
	meshTest.bufferIndex(indices);

}


function readAccessors(info) {
	const gltfData = getAsset('sceneBin');

	const { accessors, bufferViews } = info;

	accessors.map( (accessorInfo, i) => {
		const bufferViewIndex = accessorInfo.bufferView;
		const bufferView      = bufferViews[bufferViewIndex];
		/*/
		const byteOffset      = accessorInfo.byteOffset || 0;
		/*/
		const byteOffset      = bufferView.byteOffset || 0;
		//*/
		// console.log('byteOffset', i, accessorInfo.byteOffset, bufferView.byteOffset);
		const ArrayCtor       = ARRAY_CTOR_MAP[accessorInfo.componentType] || Float32Array;
		const size            = SIZE_MAP[accessorInfo.type];
		const buffer          = info.buffers[bufferView.buffer];
		
		if(!bufferView.data) {
			var length 			  = bufferView.byteLength / sizeMap[accessorInfo.componentType];
			const arr             = new ArrayCtor(gltfData, byteOffset, size * accessorInfo.count);
			// const arr             = new ArrayCtor(gltfData, byteOffset, length);
			bufferView.data 	  = arr;
			console.log('Attribute', i, arr);
		}
		

	    const quantizeExtension = accessorInfo.extensions && accessorInfo.extensions['WEB3D_quantized_attributes'];
	    if(quantizeExtension) {
	    	console.log('need to work');
	    }
	    	
	    
	});

}

function readMesh(data) {
	const { meshes, bufferViews } = data;

	const _mesh = new alfrid.Mesh();

	meshes.forEach( mesh => {

		const { primitives } = mesh;

		primitives.forEach( primitive => {
			const semantics = Object.keys(primitive.attributes);
			// console.log('primitive', primitive, semantics);

			for (let s in primitive.attributes) {
				const attrName = s;
				const attrIndex = primitive.attributes[s];
				const accessorData = data.accessors[attrIndex];
				const bufferView = data.bufferViews[accessorData.bufferView];
				const attrArrayView = bufferView.data;
				console.log('attrArrayView', attrIndex, attrArrayView);
				const mappedAttrName = semanticAttributeMap[attrName];
				const size = SIZE_MAP[accessorData.type];
				if(!mappedAttrName) {
					continue;
				}
				// console.log('Attribute :', attrName, mappedAttrName, size, attrArrayView);

				_mesh.bufferFlattenData(attrArrayView, mappedAttrName, size);
			}

			const indices = primitive.indices;

			if(indices !== undefined) {
				// console.log('Index buffer', indices);
				const accessorData = data.accessors[indices];
				// console.log('type', accessorData.componentType);
				const bufferView = data.bufferViews[accessorData.bufferView];
				// const size = SIZE_MAP[accessorData.type];
				const attrArrayView = bufferView.data;
				const ary = [];
				for(let i=0; i<attrArrayView.length; i++) {
					ary.push(attrArrayView[i]);
				}
				// console.log(attrArrayView);
				// _mesh.bufferIndex([0, 1, 2, 0, 2, 3]);
				
				const tmp = [0, 1, 2, 3, 2, 1, 4, 5, 6, 7, 6, 5, 8, 9, 10, 11, 10, 9, 12, 13, 14, 15, 14, 13, 16, 17, 18, 19, 18, 17, 20, 21, 22, 23, 22, 21];
				console.log(attrArrayView, tmp, ary);
				_mesh.bufferIndex(attrArrayView);
			}

		});


	});

	return _mesh;
}


function render() {
	shader.bind();
	// GL.draw(meshTest);
}