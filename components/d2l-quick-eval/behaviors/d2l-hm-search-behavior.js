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
		}
	},

	_setSearchAction: function(entity) {
		const search = 'search';
		if (entity && entity.hasActionByName && entity.hasActionByName(search)) {
			this.searchAction = entity.getActionByName(search);
		} else {
			this.searchAction = null;
		}
	},

	_clearSearchError: function() {
		this.searchError = false;
	},

	_searchResultsLoaded: function(e) {
		const entity = e.detail.results;
		this.searchApplied = !e.detail.searchIsCleared;

		if (entity && entity.entities) {
			this.searchResultsCount = entity.entities.length;
		} else {
			this.searchResultsCount = 0;
		}
		this._clearSearchError();
	},

	_errorOnSearch: function() {
		this.searchError = true;
	},

	_clearSearchResults: function() {
		this.searchApplied = false;
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviour = [
	D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviourImpl
];
