'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDeImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.de = {
			'activities': 'Activities',
			'activityName': 'Name der Aktivität',
			'caughtUp': 'Sie sind auf dem neuesten Stand!',
			'checkBackOften': 'Sehen Sie regelmäßig nach, ob neue Abgaben verfügbar sind.',
			'clearSearch': 'Suche löschen',
			'courseName': 'Kurs',
			'displayName': 'Vorname, Nachname',
			'evaluate': '{displayName} bewerten',
			'failedToFilter': 'Filter konnte nicht angewendet werden. Versuchen Sie es in ein paar Minuten erneut.',
			'failedToLoadData': 'Abgaben können nicht geladen werden. Versuchen Sie es in ein paar Minuten erneut.',
			'failedToLoadMore': 'Es können keine weiteren Abgaben geladen werden. Versuchen Sie es in ein paar Minuten erneut.',
			'failedToSearch': 'Suche konnte nicht durchgeführt werden. Versuchen Sie es in ein paar Minuten erneut.',
			'firstName': 'Vorname',
			'lastName': 'Nachname',
			'loadMore': 'Mehr laden',
			'loading': 'Wird geladen',
			'masterTeacher': 'Lehrer',
			'noCriteriaMatch': 'Es gibt keine Abgaben, die mit Ihren Kriterien übereinstimmen.',
			'noResults': 'Keine Ergebnisse',
			'noSubmissions': 'Es gibt keine Abgaben, die Ihre Aufmerksamkeit erfordern.',
			'search': 'Suchen',
			'searchResultsMore': 'Über {num} Suchergebnisse',
			'searchResultsMultiple': '{num} Suchergebnisse',
			'searchResultsSingle': '1 Suchergebnis',
			'sortBy': 'Sortieren nach {columnName}',
			'submissionDate': 'Abgabedatum',
			'submissions': 'Submissions',
			'tableTitle': 'Liste nicht bewerteter Abgaben von Lernern in allen Kursen und Tools',
			'tryAgain': 'Erneut versuchen'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);

