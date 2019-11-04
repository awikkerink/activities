'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEnImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.en = {
			'name': {
						'translation': 'Name',
						'context': 'Label for the name field when creating/editing an activity'
			},
			'emptyNameError': {
						'translation': 'Name is required',
						'context': 'Error message to inform user that the activity name is a required field'
			},
			'instructions': {
						'translation': 'Instructions',
						'context': 'Label for the instruction field when creating/editing an activity'
			},
			'dueDate': {
						'translation': 'Due Date',
						'context': 'Label for the due date field when creating/editing an activity'
			},
			'submissionType': {
						'translation': 'Submission Type',
						'context': 'Label for the submission type field when creating/editing an assignment'
			},
			'completionType': {
						'translation': 'Marked as completed',
						'context': 'Label for the completion type field when creating/editing an assignment'
			}
		};
	}
};

export const LangEn = dedupingMixin(LangEnImpl);

