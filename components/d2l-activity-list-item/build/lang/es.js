'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.es = {
			'clickToViewActivity': 'Haga clic para ver la actividad',
			'enroll': 'Inscribirse'
		};
	}
};

export const LangEs = dedupingMixin(LangEsImpl);

