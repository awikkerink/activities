import { Rels } from 'd2l-hypermedia-constants';

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
			type: String,
			computed: '_computeFilterHref(entity)'
		},
		filterApplied: {
			type: Boolean,
			value: false
		},
		filterError: {
			type: Object,
			value: false
		},
		filtersLoading: {
			type: Boolean,
			value: false
		}
	},

	attached: function() {
		this.addEventListener('d2l-hm-filter-filters-loaded', this._onFiltersLoaded);
		this.addEventListener('d2l-hm-filter-filters-updating', this._onFiltersUpdating);
		this.addEventListener('d2l-hm-filter-filters-updated', this._onFiltersUpdated);
		this.addEventListener('d2l-hm-filter-error', this._onFilterError);
	},

	detached: function() {
		this.removeEventListener('d2l-hm-filter-filters-loaded', this._onFiltersLoaded);
		this.removeEventListener('d2l-hm-filter-filters-updating', this._onFiltersUpdating);
		this.removeEventListener('d2l-hm-filter-filters-updated', this._onFiltersUpdated);
		this.removeEventListener('d2l-hm-filter-error', this._onFilterError);
	},

	_computeFilterHref: function(entity) {
		return this._getHref(entity, Rels.filters);
	},

	_onFiltersLoaded: function(e) {
		this.filterApplied = e.detail.totalSelectedFilters > 0;
		this._clearErrors();
	},

	_onFiltersUpdating: function() {
		this.filtersLoading = true;
		this._clearErrors();
	},

	_onFiltersUpdated: function(e) {
		this.entity = e.detail.filteredActivities;
		this._clearErrors();
	},

	_onFilterError: function(e) {
		this.filtersLoading = false;
		this.filterError = e.detail;
	},

	_clearErrors: function() {
		this.filterError = false;
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.QuickEval.D2LHMFilterBehaviour = [
	D2L.PolymerBehaviors.Siren.D2LSirenHelperBehavior,
	D2L.PolymerBehaviors.QuickEval.D2LHMFilterBehaviourImpl
];
