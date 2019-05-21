'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDadkImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.dadk = {
			'activities': 'Activities',
			'activityName': 'Aktivitetsnavn',
			'caughtUp': 'Du er helt med!',
			'checkBackOften': 'Kom tilbage med jævne mellemrum for at se nye afleveringer.',
			'clearSearch': 'Ryd søgning',
			'courseName': 'Kursus',
			'displayName': 'Fornavn, Efternavn',
			'due': 'Due:',
			'evaluate': 'Evaluer {displayName}',
			'failedToFilter': 'Kunne ikke anvende filter. Prøv igen om et par minutter.',
			'failedToLoadData': 'Kunne ikke indlæse afleveringer. Prøv igen om et par minutter.',
			'failedToLoadMore': 'Kunne ikke indlæse flere afleveringer. Prøv igen om et par minutter.',
			'failedToSearch': 'Kunne ikke gennemføre søgning. Prøv igen om et par minutter.',
			'firstName': 'Fornavn',
			'lastName': 'Efternavn',
			'loadMore': 'Indlæs flere',
			'loading': 'Indlæser',
			'masterTeacher': 'Lærer',
			'noCriteriaMatch': 'Der er ingen afleveringer, der matcher dine kriterier.',
			'noResults': 'Ingen resultater her.',
			'noSubmissions': 'Der er ingen afleveringer, der kræver din opmærksomhed.',
			'search': 'Søg',
			'searchResultsMore': '{num}+ søgeresultater',
			'searchResultsMultiple': '{num} søgeresultater',
			'searchResultsSingle': '1 søgeresultat',
			'sortBy': 'Sortér efter {columnName}',
			'submissionDate': 'Afleveringsdato',
			'submissions': 'Submissions',
			'tableTitle': 'Liste over ikke-evaluerede elevafleveringer på tværs af kurser og værktøjer',
			'tryAgain': 'Prøv igen',
			'viewBy': 'View by:'
		};
	}
};

export const LangDadk = dedupingMixin(LangDadkImpl);

