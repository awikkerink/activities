'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'clickToViewActivity': 'Klicka för att visa aktivitet',
			'enroll': 'Registrera'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);

