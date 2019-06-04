import {Rels} from 'd2l-hypermedia-constants';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.QuickEval = window.D2L.PolymerBehaviors.QuickEval || {};

/*
* Behavior for interacting with hm filter
* @polymerBehavior
*/
D2L.PolymerBehaviors.QuickEval.D2LHMFilterBehaviourImpl = {

	properties: {
		filterHref: {
			type: String
		},
		filterApplied: {
			type: Boolean,
			value: false
		},
		filterError: {
			type: Boolean,
			value: false
		},
	},

	_setFilterHref: function(entity) {
		if (entity && entity.hasLinkByRel && entity.hasLinkByRel(Rels.filters)) {
			this.filterHref = entity.getLinkByRel(Rels.filters).href;
		} else {
			this.filterHref = '';
		}
	},

	_filtersLoaded: function(e) {
		this.filterApplied = e.detail.totalSelectedFilters > 0;
		this._clearFilterError();
	},

	_clearFilterError: function() {
		this.filterError = false;
	},

	_errorOnFilter: function() {
		this.filterError = true;
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.QuickEval.D2LHMFilterBehaviour = [
	D2L.PolymerBehaviors.QuickEval.D2LHMFilterBehaviourImpl
];
