'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangKoImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ko = {
			'clickToViewActivity': '클릭하여 활동 보기',
			'enroll': '등록'
		};
	}
};

export const LangKo = dedupingMixin(LangKoImpl);

