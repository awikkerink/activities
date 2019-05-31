import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import {QuickEvalLogging} from './QuickEvalLogging.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-alert/d2l-alert.js';
import 'd2l-common/components/d2l-hm-filter/d2l-hm-filter.js';
import 'd2l-common/components/d2l-hm-search/d2l-hm-search.js';
import './behaviors/d2l-hm-filter-behavior.js';
import './behaviors/d2l-hm-search-behavior.js';
import './d2l-quick-eval-search-results-summary-container.js';
import './d2l-quick-eval-view-toggle.js';
import './d2l-quick-eval-activities.js';
import './d2l-quick-eval-submissions.js';

/**
 * @customElement
 * @polymer
 */
class D2LQuickEval extends mixinBehaviors(
	[D2L.PolymerBehaviors.Siren.EntityBehavior, D2L.PolymerBehaviors.QuickEval.D2LHMFilterBehaviour, D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviour],
	QuickEvalLogging(QuickEvalLocalize(PolymerElement))
) {
	static get template() {
		return html`
			<style>
				:host {
					display: block;
				}
				h1 {
					@apply --d2l-heading-1;
					margin: 0;
				}
				d2l-hm-search {
					display: inline-block;
					width: 250px;
					margin-left: .25rem;
				}
				d2l-quick-eval-view-toggle {
					clear: both;
					float: left;
				}
				.d2l-quick-eval-header {
					float: left;
				}
				.d2l-quick-eval-header-with-toggle {
					float: left;
					padding-bottom: 1.2rem;
				}
				d2l-quick-eval-submissions {
					display: block;
					padding-top: 1rem;
				}
				d2l-alert {
					margin: auto;
					margin-bottom: 0.5rem;
				}
				d2l-quick-eval-search-results-summary-container {
					margin-bottom: 0.9rem;
					margin-top: 0.9rem;
					display: block;
				}
				[hidden] {
					display: none;
				}
				.d2l-quick-eval-activity-list-modifiers {
					float: right;
				}
				.clear {
					clear: both;
				}
			</style>
			<template is="dom-if" if="[[headerText]]">
				<h1 class="d2l-quick-eval-header-with-toggle" hidden$="[[!activitiesViewEnabled]]"">[[headerText]]</h1>
				<h1 class="d2l-quick-eval-header" hidden$="[[activitiesViewEnabled]]"">[[headerText]]</h1>
			</template>
			<d2l-quick-eval-view-toggle current-selected="submissions" hidden$="[[!activitiesViewEnabled]]"></d2l-quick-eval-view-toggle>
			<div class="d2l-quick-eval-activity-list-modifiers">
				<d2l-hm-filter
					href="[[filterHref]]"
					token="[[token]]"
					category-whitelist="[[_filterIds]]"
					result-size="[[_numberOfActivitiesToShow]]">
				</d2l-hm-filter>
				<d2l-hm-search
					hidden$="[[!searchEnabled]]"
					token="[[token]]"
					search-action="[[searchAction]]"
					placeholder="[[localize('search')]]"
					result-size="[[_numberOfActivitiesToShow]]"
					aria-label$="[[localize('search')]]">
				</d2l-hm-search>
			</div>
			<div class="clear"></div>
			<d2l-alert type="critical" hidden$="[[!filterError]]" id="d2l-quick-eval-filter-error-alert">
				[[localize('failedToFilter')]]
			</d2l-alert>
			<d2l-alert type="critical" hidden$="[[!searchError]]" id="d2l-quick-eval-search-error-alert">
				[[localize('failedToSearch')]]
			</d2l-alert>
			<d2l-quick-eval-search-results-summary-container
				search-results-count="[[searchResultsCount]]"
				more-results="[[_moreSearchResults]]"
				hidden$="[[!_searchResultsMessageEnabled(searchCleared, searchEnabled)]]">
			</d2l-quick-eval-search-results-summary-container>
			<d2l-quick-eval-submissions href="[[href]]" token="[[token]]" logging-endpoint="[[loggingEndpoint]]" master-teacher="[[masterTeacher]]" hidden$="[[_showActivitiesView]]"></d2l-quick-eval-submissions>
			<d2l-quick-eval-activities href="[[href]]" token="[[token]]" logging-endpoint="[[loggingEndpoint]]" hidden$="[[!_showActivitiesView]]"></d2l-quick-eval-activities>
		`;
	}

	static get properties() {
		return {
			headerText: {
				type: String
			},
			masterTeacher: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			searchEnabled: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			activitiesViewEnabled: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			_filterIds: {
				type: Array,
				computed: '_getFilterIds(masterTeacher)'
			},
			_numberOfActivitiesToShow: {
				type: Number,
				value: 20
			},
			_moreSearchResults: {
				type: Boolean,
				value: false
			},
			_showActivitiesView: {
				type: Boolean,
				value: false
			}
		};
	}

	static get is() { return 'd2l-quick-eval'; }

	attached()  {
		this.addEventListener('d2l-hm-filter-filters-loaded', this._filtersLoaded);
		this.addEventListener('d2l-hm-filter-filters-updating', this._filtersUpdating);
		this.addEventListener('d2l-hm-filter-filters-updated', this._filtersChanged);
		this.addEventListener('d2l-hm-filter-error', this._filterError);
		this.addEventListener('d2l-quick-eval-activities-list-sort-updated', this._sortChanged);
		this.addEventListener('d2l-hm-search-results-loading', this._searchResultsLoading);
		this.addEventListener('d2l-hm-search-results-loaded', this._searchResultsLoaded);
		this.addEventListener('d2l-quick-eval-search-results-summary-container-clear-search', this._clearSearchResults);
		this.addEventListener('d2l-hm-search-error', this._searchError);
		this.addEventListener('d2l-quick-eval-activities-list-activities-shown-number-updated', this._updateNumberOfActivitiesToShow);
		this.addEventListener('d2l-quick-eval-activities-list-search-results-count', this._updateNumberOfActivitiesShownInSearchResults);
		this.addEventListener('d2l-quick-eval-view-toggle-changed', this._toggleView);
	}

	detached() {
		this.removeEventListener('d2l-hm-filter-filters-loaded', this._filtersLoaded);
		this.removeEventListener('d2l-hm-filter-filters-updating', this._filtersUpdating);
		this.removeEventListener('d2l-hm-filter-filters-updated', this._filtersChanged);
		this.removeEventListener('d2l-hm-filter-error', this._filterError);
		this.removeEventListener('d2l-quick-eval-activities-list-sort-updated', this._sortChanged);
		this.removeEventListener('d2l-hm-search-results-loading', this._searchResultsLoading);
		this.removeEventListener('d2l-hm-search-results-loaded', this._searchResultsLoaded);
		this.removeEventListener('d2l-quick-eval-search-results-summary-container-clear-search', this._clearSearchResults);
		this.removeEventListener('d2l-hm-search-error', this._searchError);
		this.removeEventListener('d2l-quick-eval-activities-list-activities-shown-number-updated', this._updateNumberOfActivitiesToShow);
		this.removeEventListener('d2l-quick-eval-activities-list-search-results-count', this._updateNumberOfActivitiesShownInSearchResults);
		this.removeEventListener('d2l-quick-eval-view-toggle-changed', this._toggleView);
	}

	_updateNumberOfActivitiesToShow(e) {
		if (e && e.detail) {
			this.set('_numberOfActivitiesToShow', e.detail.count);
		}
	}

	_updateNumberOfActivitiesShownInSearchResults(e) {
		if (e && e.detail) {
			this._updateSearchResultsCount(e.detail.count);
		}
	}

	_getFilterIds(masterTeacher) {
		// [ 'activity-name', 'enrollments' ]
		let filters = [ 'c806bbc6-cfb3-4b6b-ae74-d5e4e319183d', 'f2b32f03-556a-4368-945a-2614b9f41f76' ];

		if (this._showActivitiesView) {
			return filters;
		}

		filters = filters.concat('05de346e-c94d-4e4b-b887-9c86c9a80351'); // [ 'completion-date' ]
		if (masterTeacher) {
			filters = filters.concat('35b3aca0-c10c-436d-b369-c8a3022455e3'); // [ 'primary-facilitator' ]
		}
		return filters;
	}

	_searchResultsMessageEnabled() {
		return !this.searchCleared && this.searchEnabled;
	}

	_filtersLoaded(e) {
		const list = this.shadowRoot.querySelector('d2l-quick-eval-submissions').shadowRoot.querySelector('d2l-quick-eval-activities-list');
		list.filterApplied = e.detail.totalSelectedFilters > 0;
	}

	_filtersUpdating() {
		const list = this.shadowRoot.querySelector('d2l-quick-eval-submissions').shadowRoot.querySelector('d2l-quick-eval-activities-list');
		list.setLoadingState(true);
	}

	_filtersChanged(e) {
		const submissions = this.shadowRoot.querySelector('d2l-quick-eval-submissions');
		const list = submissions.shadowRoot.querySelector('d2l-quick-eval-activities-list');
		submissions.entity = e.detail.filteredActivities;
		list.entity = e.detail.filteredActivities;
		this.entity = e.detail.filteredActivities;

		if (this.entity && this.entity.entities) {
			this._updateSearchResultsCount(this.entity.entities.length);
		}
	}

	_filterError(evt) {
		this._logError(evt.detail.error, {developerMessage: 'Failed to retrieve filter results'});
		const list = this.shadowRoot.querySelector('d2l-quick-eval-submissions').shadowRoot.querySelector('d2l-quick-eval-activities-list');
		list.setLoadingState(false);
	}

	_sortChanged(e) {
		this.entity = e.detail.sortedActivities;
	}

	_searchResultsLoading() {
		const list = this.shadowRoot.querySelector('d2l-quick-eval-submissions').shadowRoot.querySelector('d2l-quick-eval-activities-list');
		list.setLoadingState(true);
	}

	_searchResultsLoaded(e) {
		const submissions = this.shadowRoot.querySelector('d2l-quick-eval-submissions');
		const list = submissions.shadowRoot.querySelector('d2l-quick-eval-activities-list');

		submissions.entity = e.detail.results;
		list.entity = e.detail.results;
		this.entity = e.detail.results;
		this.searchCleared = e.detail.searchIsCleared;
		list.searchApplied = !e.detail.searchIsCleared;

		if (this.entity && this.entity.entities) {
			this._updateSearchResultsCount(this.entity.entities.length);
		} else {
			this._updateSearchResultsCount(0);
		}
	}

	_clearSearchResults() {
		const search = this.shadowRoot.querySelector('d2l-hm-search');
		search.clearSearch();
	}

	_searchError(evt) {
		this._logError(evt.detail.error, {developerMessage: 'Failed to retrieve search results.'});
		const list = this.shadowRoot.querySelector('d2l-quick-eval-submissions').shadowRoot.querySelector('d2l-quick-eval-activities-list');
		list.setLoadingState(false);
	}

	_updateSearchResultsCount(count) {
		this.searchResultsCount = count;

		const list = this.shadowRoot.querySelector('d2l-quick-eval-submissions').shadowRoot.querySelector('d2l-quick-eval-activities-list');
		if (list._pageNextHref) {
			this._moreSearchResults = true;
		} else {
			this._moreSearchResults = false;
		}
	}

	_toggleView(e) {
		if (e.detail.view === 'submissions') {
			this._showActivitiesView = false;
		} else {
			this._showActivitiesView = true;
		}
	}
}

window.customElements.define('d2l-quick-eval', D2LQuickEval);
