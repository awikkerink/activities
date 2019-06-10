'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fr = {
			'activities': 'Activités',
			'activityName': 'Nom de l’activité',
			'caughtUp': 'Vous avez terminé!',
			'checkBackOften': 'Revenez régulièrement pour de nouvelles soumissions.',
			'clearSearch': 'Effacer la recherche',
			'completed': 'Completed',
			'courseName': 'Cours',
			'displayName': 'Prénom et Nom de famille',
			'due': 'Due: {date}',
			'evaluate': 'Évaluer {displayName}',
			'evaluateAll': 'Evaluate All',
			'evaluated': 'Evaluated',
			'failedToFilter': 'Impossible d’appliquer le filtre. Réessayez dans quelques minutes.',
			'failedToLoadData': 'Impossible de charger les soumissions. Réessayez dans quelques minutes.',
			'failedToLoadMore': 'Impossible de charger plus de soumissions. Réessayez dans quelques minutes.',
			'failedToSearch': 'Impossible d’appliquer la recherche. Réessayez dans quelques minutes.',
			'firstName': 'Prénom',
			'lastName': 'Nom de famille',
			'loadMore': 'En voir plus',
			'loading': 'Chargement',
			'masterTeacher': 'Enseignant',
			'noCriteriaMatch': 'Aucune soumission ne correspond à vos critères.',
			'noResults': 'Aucun résultat ici.',
			'noSubmissions': 'Aucune soumission ne requiert votre attention.',
			'publishAll': 'Publish All',
			'published': 'Published',
			'search': 'Rechercher',
			'searchResultsMore': '{num}+ résultats de recherche',
			'searchResultsMultiple': '{num} résultats de recherche',
			'searchResultsSingle': '1 résultat de recherche',
			'sortBy': 'Trier par {columnName}',
			'submissionDate': 'Date de soumission',
			'submissionList': 'Submission List',
			'submissions': 'Soumissions',
			'tableTitle': 'Liste des soumissions des apprenants non évaluées provenant des cours et des outils',
			'tryAgain': 'Réessayer',
			'unreadSubmissions': '{num} unread submissions',
			'unreadSubmissionsDetail': '{unread} new, {resub} resubmissions',
			'viewBy': 'Afficher par :'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);

