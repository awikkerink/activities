'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrfrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.frfr = {
			'enroll': 'Inscription'
		};
	}
};

export const LangFrfr = dedupingMixin(LangFrfrImpl);

