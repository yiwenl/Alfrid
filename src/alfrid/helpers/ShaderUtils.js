// ShaderUtils.js

const ShaderUtils = {

};

const definesToString = function(defines) {
    let outStr = '';
    for (const def in defines) {
    	if(defines[def]) {
    		outStr += '#define ' + def + ' ' + defines[def] + '\n';	
    	}
        
    }
    return outStr;
};

const getUniformType = function (mValue) {
	if(mValue.length) {
		return `vec${mValue.length}`;
	} else {
		return 'float';
	}
};

ShaderUtils.addUniforms = function (mShader, mObjUniforms) {

	let strUniforms = '';
	for(const uniformName in mObjUniforms) {
		const uniformValue = mObjUniforms[uniformName];
		const uniformType = getUniformType(uniformValue);

		strUniforms += `uniform ${uniformType} ${uniformName};\n`;
	}

	mShader = mShader.replace('{{UNIFORMS}}', strUniforms);

	return mShader;
};


ShaderUtils.bindUniforms = function (mShader, mObjUniforms) {

	for(const uniformName in mObjUniforms) {
		const uniformValue = mObjUniforms[uniformName];
		const uniformType = getUniformType(uniformValue);
		mShader.uniform(uniformName, uniformType, uniformValue);
	}
	
};

ShaderUtils.injectDefines = function (mShader, mDefines) {

	return `${definesToString(mDefines)}\n${mShader}`;

}


export default ShaderUtils;