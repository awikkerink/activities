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
		_searchAction: {
			type: Object,
			computed: '_getSearchAction(entity)'
		},
		_searchError: {
			type: Boolean,
			value: false
		},
		_searchResultsCount: {
			type: Number,
			value: 0
		},
		_searchCleared: {
			type: Boolean,
			value: true
		},
		_showSearchResultSummary: {
			type: Boolean,
			computed: '_isSearchResultSummaryVisible()'
		}
	},

	_getSearchAction: function(entity) {
		const search = 'search';
		if (entity && entity.hasActionByName && entity.hasActionByName(search)) {
			return entity.getActionByName(search);
		}
		return null;
	},

	_isSearchResultSummaryVisible: function() {
		return !this._searchError && !this._searchCleared;
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviour = [
	D2L.PolymerBehaviors.Siren.D2LSirenHelperBehavior,
	D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviourImpl
];
