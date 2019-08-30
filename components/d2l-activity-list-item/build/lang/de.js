'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDeImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.de = {
			'clickToViewActivity': 'Zum Anzeigen der Aktivitäten klicken',
			'enroll': 'Anmelden'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);

