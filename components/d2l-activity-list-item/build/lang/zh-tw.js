'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhtwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'clickToViewActivity': '按一下以檢視活動',
			'enroll': '註冊'
		};
	}
};

export const LangZhtw = dedupingMixin(LangZhtwImpl);

