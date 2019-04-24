'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrfrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.frfr = {
			'draftInfo': 'Évaluation enregistrée comme brouillon'
		};
	}
};

export const LangFrfr = dedupingMixin(LangFrfrImpl);

