'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fr = {
			'activityName': 'Nom de l\'activité',
			'caughtUp': 'You\'re all caught up!',
			'checkBackOften': 'Check back often for new submissions.',
			'courseName': 'Cours',
			'displayName': 'Prénom et Nom de famille',
			'loading': 'Loading',
			'loadMore': 'En voir plus',
			'masterTeacher': 'Master Teacher',
			'noSubmissions': 'There are no submissions that need your attention.',
			'submissionDate': 'Date de soumission'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);

