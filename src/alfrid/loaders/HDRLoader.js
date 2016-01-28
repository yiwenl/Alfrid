// HDRLoader.js

'use strict';

import BinaryLoader from './BinaryLoader';
import HDRParser from '../tools/HDRParser';

class HDRLoader extends BinaryLoader {
	constructor() {
		super(true);
	}

	parse(mArrayBuffer) {
		return HDRParser(mArrayBuffer);
	}

	_onLoaded() {
		let o = this.parse(this._req.response);
		if(this._callback) {
			this._callback(o);
		}
	}

}


HDRLoader.parse = function(mArrayBuffer) {
	return HDRParser(mArrayBuffer);
};

export default HDRLoader;