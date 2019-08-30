'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangNlImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.nl = {
			'clickToViewActivity': 'Klik om activiteit te bekijken',
			'enroll': 'Inschrijven'
		};
	}
};

export const LangNl = dedupingMixin(LangNlImpl);

