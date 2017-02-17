// VertexArrayObject.js

export default function getAndApplyExtension(gl, name) {
	const ext = gl.getExtension(name);
	if (!ext) {
		return false;
	}
	const suffix = name.split('_')[0];
	const prefix = '_';
	const suffixRE = new RegExp(`${suffix}$`);
	const suffixREAttr = new RegExp(`_${suffix}$`);
	const prefixRE = new RegExp(`^${prefix}`);

	for (const key in ext) {
		const val = ext[key];
		if (typeof(val) === 'function') {
			const unsuffixedKey = key.replace(suffixRE, '');
			if (key.substring) {
				gl[unsuffixedKey] = ext[key].bind(ext);	
				console.log('Replacing :', key, '=>', unsuffixedKey);
			}
		}
	}

	return true;
}