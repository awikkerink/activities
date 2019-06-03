import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { QuickEvalLogging } from './QuickEvalLogging.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import './behaviors/d2l-quick-eval-siren-helper-behavior.js';
import './d2l-quick-eval-activities-list.js';

class D2LQuickEvalSubmissions extends mixinBehaviors(
	[D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior],
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
			}
		};
	}

	static get observers() {
		return [
			'_loadData(entity)',
			'_handleSorts(entity)'
		];
	}

	get list() {
		return this.shadowRoot.querySelector('d2l-quick-eval-activities-list');
	}

	_handleSorts(entity) {
		this.list._handleSorts(entity);
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
