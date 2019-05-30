import {Rels} from 'd2l-hypermedia-constants';
import './d2l-siren-helper-behavior.js';

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
		filterError: {
			type: Boolean,
			value: false
		},
	},

	observers: [
		'_setFilterHref(entity)'
	],

	attached: function() {
		this.addEventListener('d2l-hm-filter-filters-loaded', this._clearFilterError);
		this.addEventListener('d2l-hm-filter-filters-updating', this._clearFilterError);
		this.addEventListener('d2l-hm-filter-filters-updated', this._clearFilterError);
		this.addEventListener('d2l-hm-filter-error', this._errorOnFilter);
		this.addEventListener('d2l-hm-search-results-loading', this._clearFilterError);
		this.addEventListener('d2l-hm-search-results-loaded', this._clearFilterError);
	},

	detached: function() {
		this.removeEventListener('d2l-hm-filter-filters-loaded', this._clearFilterError);
		this.removeEventListener('d2l-hm-filter-filters-updating', this._clearFilterError);
		this.removeEventListener('d2l-hm-filter-filters-updated', this._clearFilterError);
		this.removeEventListener('d2l-hm-filter-error', this._errorOnFilter);
		this.removeEventListener('d2l-hm-search-results-loading', this._clearFilterError);
		this.removeEventListener('d2l-hm-search-results-loaded', this._clearFilterError);
	},

	_setFilterHref: function(entity) {
		if (entity && entity.hasLinkByRel && entity.hasLinkByRel(Rels.filters)) {
			this.filterHref = entity.getLinkByRel(Rels.filters).href;
		} else {
			this.filterHref = '';
		}
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
	D2L.PolymerBehaviors.Siren.D2LSirenHelperBehavior,
	D2L.PolymerBehaviors.QuickEval.D2LHMFilterBehaviourImpl
];
