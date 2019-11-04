'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEnImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.en = {
			'dueDate': {
						'translation': 'Due Date',
						'context': 'ARIA label for the due date field when creating/editing an activity'
			},
			'dueTime': {
						'translation': 'Due Time',
						'context': 'ARIA label for the due time field when creating/editing an activity'
			}
		};
	}
};

export const LangEn = dedupingMixin(LangEnImpl);

