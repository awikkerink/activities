'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'clickToViewActivity': 'Etkinliği görüntülemek için tıklayın',
			'enroll': 'Kaydol'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);

