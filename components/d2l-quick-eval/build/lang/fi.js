'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFiImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fi = {
			'activities': 'Activities',
			'activityName': 'Activity Name',
			'caughtUp': 'You\'re all caught up!',
			'checkBackOften': 'Check back often for new submissions.',
			'clearSearch': 'Clear Search',
			'courseName': 'Course',
			'displayName': 'First Name, Last Name',
			'due': 'Due:',
			'evaluate': 'Evaluate {displayName}',
			'failedToFilter': 'Unable to apply filter. Try again in a few minutes.',
			'failedToLoadData': 'Unable to load submissions. Try again in a few minutes.',
			'failedToLoadMore': 'Unable to load more submissions. Try again in a few minutes.',
			'failedToSearch': 'Unable to apply search. Try again in a few minutes.',
			'firstName': 'First Name',
			'lastName': 'Last Name',
			'loading': 'Loading',
			'loadMore': 'Load more',
			'masterTeacher': 'Teacher',
			'noCriteriaMatch': 'There are no submissions that match your criteria.',
			'noResults': 'No results here.',
			'noSubmissions': 'There are no submissions that need your attention.',
			'search': 'Search',
			'searchResultsSingle': '1 Search Result',
			'searchResultsMultiple': '{num} Search Results',
			'searchResultsMore': '{num}+ Search Results',
			'sortBy': 'Sort by {columnName}',
			'submissionDate': 'Submission Date',
			'submissions': 'Submissions',
			'tableTitle': 'List of unevaluated Learner submissions from across courses and tools',
			'tryAgain': 'Try Again',
			'viewBy': 'View by:'
		};
	}
};

export const LangFi = dedupingMixin(LangFiImpl);

