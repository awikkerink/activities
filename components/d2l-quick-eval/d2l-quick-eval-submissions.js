import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { QuickEvalLogging } from './QuickEvalLogging.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import './behaviors/d2l-quick-eval-siren-helper-behavior.js';
import './d2l-quick-eval-activities-list.js';
import './behaviors/d2l-hm-sort-behaviour.js';

class D2LQuickEvalSubmissions extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior,
		D2L.PolymerBehaviors.QuickEval.D2LHMSortBehaviour
	],
	QuickEvalLogging(PolymerElement)
) {
	static get template() {
		const template = html`
			<d2l-quick-eval-activities-list
				href="[[href]]"
				token="[[token]]"
				logging-endpoint="[[loggingEndpoint]]"
				master-teacher="[[masterTeacher]]"
				_data="[[_data]]"
				_header-columns="[[_headerColumns]]"
				on-d2l-quick-eval-submission-table-load-more="_loadMore"
				on-d2l-quick-eval-submissions-table-sort-requested="_handleSortRequested"
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
			_headerColumns: {
				type: Array,
				value: [
					{
						key: 'displayName',
						meta: { firstThenLast: true },
						headers: [
							{ key: 'firstName', sortClass: 'first-name', suffix: ',', canSort: false, sorted: false, desc: false  },
							{ key: 'lastName', sortClass: 'last-name', canSort: false, sorted: false, desc: false  }
						]
					},
					{
						key: 'activityName',
						headers: [{ key: 'activityName', sortClass: 'activity-name', canSort: false, sorted: false, desc: false }]
					},
					{
						key: 'courseName',
						headers: [{ key: 'courseName', sortClass: 'course-name', canSort: false, sorted: false, desc: false }]
					},
					{
						key: 'submissionDate',
						headers: [{ key: 'submissionDate', sortClass: 'completion-date', canSort: false, sorted: false, desc: false }]
					},
					{
						key: 'masterTeacher',
						headers: [{ key: 'masterTeacher', sortClass: 'primary-facilitator', canSort: false, sorted: false, desc: false }]
					}
				]
			},
			_numberOfActivitiesToShow: {
				type: Number,
				computed: '_computeNumberOfActivitiesToShow(_data, _numberOfActivitiesToShow)',
				value: 20
			},
		};
	}

	static get observers() {
		return [
			'_loadData(entity)',
			'_handleSorts(entity)',
			'_dispatchPageSizeEvent(_numberOfActivitiesToShow)'
		];
	}

	get list() {
		return this.shadowRoot.querySelector('d2l-quick-eval-activities-list');
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
					isDraft: this._determineIfActivityIsDraft(activity)
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

	_handleSorts(entity) {
		// entity is null on initial load
		if (!entity) {
			return Promise.resolve();
		}

		return this._loadSorts(entity).then(sortsEntity => {
			this._headerColumns.forEach((headerColumn, i) => {
				headerColumn.headers.forEach((header, j) => {
					if (header.sortClass) {
						const sort = sortsEntity.getSubEntityByClass(header.sortClass);
						if (sort) {
							this.set(`_headerColumns.${i}.headers.${j}.canSort`, true);
							if (sort.properties && sort.properties.applied && (sort.properties.priority === 0)) {
								const descending = sort.properties.direction === 'descending';
								this.set(`_headerColumns.${i}.headers.${j}.sorted`, true);
								this.set(`_headerColumns.${i}.headers.${j}.desc`, descending);

							} else {
								this.set(`_headerColumns.${i}.headers.${j}.sorted`, false);
								this.set(`_headerColumns.${i}.headers.${j}.desc`, false);
							}
						}
					}
				});
			});
		});
	}

	_handleSortRequested(evt) {
		let result;
		const headerId = evt.detail.headerId;

		this._headerColumns.forEach((headerColumn, i) => {
			headerColumn.headers.forEach((header, j) => {
				if ((header.key === headerId) && header.canSort) {
					const descending = header.sorted && !header.desc;
					this.set(`_headerColumns.${i}.headers.${j}.sorted`, true);
					this.set(`_headerColumns.${i}.headers.${j}.desc`, descending);

					const customParams = this._numberOfActivitiesToShow > 0 ? { pageSize: this._numberOfActivitiesToShow } : undefined;
					result = this._applySortAndFetchData(header.sortClass, descending, customParams);
				}
				else {
					this.set(`_headerColumns.${i}.headers.${j}.sorted`, false);
				}
			});
		});

		if (result) {
			return result.then(sortedCollection => {
				this.entity = sortedCollection;
				this._dispatchSortUpdatedEvent(sortedCollection);
			});
		} else {
			return Promise.reject(new Error(`Could not find sortable header for ${headerId}`));
		}
	}

	_dispatchSortUpdatedEvent(sorted) {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-activities-list-sort-updated',
				{
					detail: {
						sortedActivities: sorted
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_computeNumberOfActivitiesToShow(data, currentNumberOfActivitiesShown) {
		return Math.max(data.length, currentNumberOfActivitiesShown);
	}

	_dispatchPageSizeEvent(numberOfActivitiesToShow) {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-activities-list-activities-shown-number-updated',
				{
					detail: {
						count: numberOfActivitiesToShow
					},
					composed: true,
					bubbles: true
				}
			)
		);
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
