import './d2l-siren-helper-behavior.js';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.QuickEval = window.D2L.PolymerBehaviors.QuickEval || {};

/*
* Behavior for interacting with hm search
* @polymerBehavior
*/
D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviourImpl = {

	properties: {
		searchAction: {
			type: Object
		},
		searchCleared: {
			type: Boolean,
			value: true
		},
		searchError: {
			type: Boolean,
			value: false
		},
		searchResultsCount: {
			type: Number,
			value: 0
		}
	},

	observers: [
		'_getSearchAction(entity)'
	],

	attached: function() {
		this.addEventListener('d2l-hm-search-results-loading', this._searchResultsLoading);
		this.addEventListener('d2l-hm-search-results-loaded', this._searchResultsLoaded);
		this.addEventListener('d2l-hm-search-error', this._errorOnSearch);
		this.addEventListener('d2l-quick-eval-search-results-summary-container-clear-search', this._clearSearchResults);
	},

	detached: function() {
		this.removeEventListener('d2l-hm-search-results-loading', this._searchResultsLoading);
		this.removeEventListener('d2l-hm-search-results-loaded', this._searchResultsLoaded);
		this.removeEventListener('d2l-hm-search-error', this._errorOnSearch);
		this.removeEventListener('d2l-quick-eval-search-results-summary-container-clear-search', this._clearSearchResults);
	},

	_getSearchAction: function(entity) {
		const search = 'search';
		if (entity && entity.hasActionByName && entity.hasActionByName(search)) {
			this.searchAction = entity.getActionByName(search);
		}
	},

	_searchResultsLoading: function() {
		this.searchError = false;
	},

	_searchResultsLoaded: function(e) {
		this.entity = e.detail.results;
		this.searchCleared = e.detail.searchIsCleared;

		if (this.entity && this.entity.entities) {
			this.searchResultsCount = this.entity.entities.length;
		} else {
			this.searchResultsCount = 0;
		}
		this.searchError = false;
	},

	_errorOnSearch: function(e) {
		this.searchError = true;
	},

	_clearSearchResults: function() {
		this.searchCleared = true;
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviour = [
	D2L.PolymerBehaviors.Siren.D2LSirenHelperBehavior,
	D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviourImpl
];
