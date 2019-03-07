'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhtwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'activityName': '活動名稱',
			'courseName': '課程',
			'displayName': '名字，姓氏',
			'failedToLoadData': 'Unable to load submissions. Try again in a few minutes.',
			'failedToLoadMore': 'Unable to load more submissions. Try again in a few minutes.',
			'firstName': 'First Name',
			'lastName': 'Last Name',
			'loadMore': '載入更多',
			'loading': '正在載入',
			'masterTeacher': 'Master Teacher',
			'submissionDate': '提交日期',
			'tryAgain': 'Try Again'
		};
	}
};

export const LangZhtw = dedupingMixin(LangZhtwImpl);

