import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { QuickEvalLogging } from './QuickEvalLogging.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-common/components/d2l-hm-filter/d2l-hm-filter.js';
import 'd2l-common/components/d2l-hm-search/d2l-hm-search.js';
import './behaviors/d2l-quick-eval-siren-helper-behavior.js';
import './behaviors/d2l-hm-filter-behavior.js';
import './behaviors/d2l-hm-search-behavior.js';
import './d2l-quick-eval-activities-list.js';

class D2LQuickEvalSubmissions extends mixinBehaviors(
	[D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior, D2L.PolymerBehaviors.QuickEval.D2LHMFilterBehaviour, D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviour],
	QuickEvalLogging(PolymerElement)
) {
	static get template() {
		const template = html`
			<style>
				.d2l-quick-eval-activity-list-modifiers {
					float: right;
				}
				d2l-hm-search {
					display: inline-block;
					width: 250px;
					margin-left: .25rem;
				}
				.clear {
					clear: both;
				}
			</style>
			<div class="d2l-quick-eval-activity-list-modifiers">
				<d2l-hm-filter
					href="[[filterHref]]"
					token="[[token]]"
					category-whitelist="[[_filterIds]]"
					on-d2l-hm-filter-filters-loaded="_submisionsFiltersLoaded"
					on-d2l-hm-filter-filters-updating="_submissionsFiltersUpdating"
					on-d2l-hm-filter-filters-updated="_submissionsFiltersChanged"
					on-d2l-hm-filter-error="_filterError">
				</d2l-hm-filter>
				<d2l-hm-search
					token="[[token]]"
					search-action="[[searchAction]]"
					placeholder="[[localize('search')]]"
					aria-label$="[[localize('search')]]"
					on-d2l-hm-search-results-loading="_submissionsSearchResultsLoading"
					on-d2l-hm-search-results-loaded="_submissionsSearchResultsLoaded"
					on-d2l-hm-search-error="_searchError">
				</d2l-hm-search>
			</div>
			<div class="clear"></div>
			<d2l-quick-eval-activities-list
				href="[[href]]"
				token="[[token]]"
				logging-endpoint="[[loggingEndpoint]]"
				master-teacher="[[masterTeacher]]"
				_data="[[_data]]"
				on-d2l-quick-eval-submission-table-load-more="_loadMore"
				on-d2l-quick-eval-activities-list-sort-updated="_sortChanged"
			>
			</d2l-quick-eval-activities-list>
		`;
		template.setAttribute('strip-whitespace', 'strip-whitespace');
		return template;
	}

	static get is() {
		return 'd2l-quick-eval-submissions';
	}

	static get properties() {
		return {
			_data: {
				type: Array,
				value: []
			},
			masterTeacher: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			_filterIds: {
				type: Array,
				computed: '_getFilterIds(masterTeacher)'
			}
		};
	}

	static get observers() {
		return [
			'_loadFilterAndSearch(entity)',
			'_loadData(entity)',
			'_handleSorts(entity)'
		];
	}

	get list() {
		return this.shadowRoot.querySelector('d2l-quick-eval-activities-list');
	}

	_getFilterIds(masterTeacher) {
		// [ 'activity-name', 'enrollments', 'completion-date' ]
		let filters = [ 'c806bbc6-cfb3-4b6b-ae74-d5e4e319183d', 'f2b32f03-556a-4368-945a-2614b9f41f76', '05de346e-c94d-4e4b-b887-9c86c9a80351' ];

		if (masterTeacher) {
			filters = filters.concat('35b3aca0-c10c-436d-b369-c8a3022455e3'); // [ 'primary-facilitator' ]
		}
		return filters;
	}

	_submisionsFiltersLoaded(e) {
		const list = this.shadowRoot.querySelector('d2l-quick-eval-submissions').shadowRoot.querySelector('d2l-quick-eval-activities-list');
		list.filterApplied = e.detail.totalSelectedFilters > 0;
		this._filtersLoaded(e);
	}

	_submissionsFiltersUpdating() {
		const list = this.shadowRoot.querySelector('d2l-quick-eval-submissions').shadowRoot.querySelector('d2l-quick-eval-activities-list');
		list.setLoadingState(true);
		this._clearFilterError();
	}

	_submissionsFiltersChanged(e) {
		const submissions = this.shadowRoot.querySelector('d2l-quick-eval-submissions');
		const list = submissions.shadowRoot.querySelector('d2l-quick-eval-activities-list');
		submissions.entity = e.detail.filteredActivities;
		list.entity = e.detail.filteredActivities;
		this.entity = e.detail.filteredActivities;

		if (this.entity && this.entity.entities) {
			this._updateSearchResultsCount(this.entity.entities.length);
		}
		this._clearFilterError();
	}

	_filterError(evt) {
		this._logError(evt.detail.error, {developerMessage: 'Failed to retrieve filter results'});
		const list = this.shadowRoot.querySelector('d2l-quick-eval-submissions').shadowRoot.querySelector('d2l-quick-eval-activities-list');
		list.setLoadingState(false);

		this._errorOnFilter();
	}

	_handleSorts(entity) {
		this.list._handleSorts(entity);
	}

	_submissionsSearchResultsLoading() {
		const list = this.shadowRoot.querySelector('d2l-quick-eval-submissions').shadowRoot.querySelector('d2l-quick-eval-activities-list');
		list.setLoadingState(true);

		this._clearSearchError();
	}

	_submissionsSearchResultsLoaded(e) {
		this._searchResultsLoaded(e);

		const submissions = this.shadowRoot.querySelector('d2l-quick-eval-submissions');
		const list = submissions.shadowRoot.querySelector('d2l-quick-eval-activities-list');

		submissions.entity = e.detail.results;
		list.entity = e.detail.results;
		this.entity = e.detail.results;
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
		this._errorOnSearch();

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

	_loadFilterAndSearch(entity) {
		this._setFilterHref(entity);
		this._setSearchAction(entity);
	}

	async _loadData(entity) {
		if (!entity) {
			return Promise.resolve();
		}
		this.list._loading = true;
		this.list._fullListLoading = true;

		try {
			if (entity.entities) {
				const result = await this._parseActivities(entity);
				this._data = result;
			} else {
				this._data = [];
				this.list._pageNextHref = '';
			}
			this.list._clearAlerts();

		} catch (e) {
			this._logError(e, {developerMessage: 'Unable to load activities from entity.'});
			this.list._handleFullLoadFailure();
			return Promise.reject(e);
		} finally {
			this.list._fullListLoading = false;
			this.list._loading = false;
		}
	}

	_loadMore() {
		if (this.list._pageNextHref && !this.list._loading) {
			this.list._loading = true;
			this._followHref(this.list._pageNextHref)
				.then(async function(u) {
					if (u && u.entity) {
						const tbody = this.list.shadowRoot.querySelector('d2l-tbody');
						const lastFocusableTableElement = D2L.Dom.Focus.getLastFocusableDescendant(tbody, false);

						try {
							if (u.entity.entities) {
								const result = await this._parseActivities(u.entity);
								this._data = this._data.concat(result);
							}
						} catch (e) {
						// Unable to load more activities from entity.
							throw e;
						} finally {
							this.list._loading = false;
							window.requestAnimationFrame(function() {
								const newElementToFocus = D2L.Dom.Focus.getNextFocusable(lastFocusableTableElement, false);
								if (newElementToFocus) {
									newElementToFocus.focus();
								}
							});
						}
					}
				}.bind(this))
				.then(this.list._clearAlerts.bind(this.list))
				.catch(function(e) {
					this._logError(e, {developerMessage: 'Unable to load more.'});
					this.list._loading = false;
					this.list._handleLoadMoreFailure();
				}.bind(this));
		}
	}

	async _parseActivities(entity) {
		const extraParams = this._getExtraParams(this._getHref(entity, 'self'));

		const promises = [];
		entity.entities.forEach(function(activity) {
			promises.push(new Promise(function(resolve) {

				const item = {
					displayName: '',
					userHref: this._getUserHref(activity),
					courseName: '',
					activityNameHref: this._getActivityNameHref(activity),
					submissionDate: this._getSubmissionDate(activity),
					activityLink: this._getRelativeUriProperty(activity, extraParams),
					masterTeacher: '',
					isDraft: this.list._determineIfActivityIsDraft(activity)
				};

				const getUserName = this._getUserPromise(activity, item);
				const getCourseName = this._getCoursePromise(activity, item);
				const getMasterTeacherName =
					this.list._shouldDisplayColumn('masterTeacher')
						? this._getMasterTeacherPromise(activity, item)
						: Promise.resolve();

				Promise.all([getUserName, getCourseName, getMasterTeacherName]).then(function() {
					resolve(item);
				});
			}.bind(this)));
		}.bind(this));

		this.list._filterHref = this._getFilterHref(entity);
		this.list._pageNextHref = this._getPageNextHref(entity);

		const result = await Promise.all(promises);
		return result;
	}

	_sortChanged(e) {
		this.entity = e.detail.sortedActivities;
	}

	ready() {
		super.ready();
		this.addEventListener('d2l-siren-entity-error', function() {
			this.list._fullListLoading = false;
			this.list._loading = false;
			this.list._handleFullLoadFailure();
		}.bind(this));
	}
}

window.customElements.define(D2LQuickEvalSubmissions.is, D2LQuickEvalSubmissions);
