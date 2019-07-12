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
			type: Object,
			computed: '_computeSearchAction(entity)'
		},
		searchApplied: {
			type: Boolean,
			value: false
		},
		searchError: {
			type: Boolean,
			value: false
		},
		searchResultsCount: {
			type: Number,
			value: 0
		},
		searchLoading: {
			type: Boolean,
			value: false
		}
	},

	attached: function() {
		this.addEventListener('d2l-hm-search-results-loading', this.onSearchResultsLoading);
		this.addEventListener('d2l-hm-search-results-loaded', this.onSearchResultsLoaded);
		this.addEventListener('d2l-hm-search-error', this.onSearchError);
	},

	detached: function() {
		this.removeEventListener('d2l-hm-search-results-loading', this.onSearchResultsLoading);
		this.removeEventListener('d2l-hm-search-results-loaded', this.onSearchResultsLoaded);
		this.removeEventListener('d2l-hm-search-error', this.onSearchError);
	},

	_computeSearchAction: function(entity) {
		return this._getAction(entity, 'search');
	},

	onSearchResultsLoading: function() {
		this.searchLoading = true;
		this._clearErrors();
	},

	onSearchResultsLoaded: function(e) {
		this.entity = e.detail.results;
		this.searchApplied = !e.detail.searchIsCleared;
		this.searchLoading = false;
		this._clearErrors();
	},

	onSearchError: function(e) {
		this.searchLoading = false;
		this.searchError = e.detail;
	},

	_clearErrors: function() {
		this.searchError = false;
	},
};

/** @polymerBehavior */
D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviour = [
	D2L.PolymerBehaviors.Siren.D2LSirenHelperBehavior,
	D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviourImpl
];
