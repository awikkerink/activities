import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {EvaluationHubLocalize} from './EvaluationHubLocalize.js';
import 'd2l-table/d2l-table.js';
import 'd2l-button/d2l-button.js';
import 'd2l-loading-spinner/d2l-loading-spinner.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import 'd2l-polymer-behaviors/d2l-dom-focus.js';
import 'd2l-link/d2l-link.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {Rels, Classes} from 'd2l-hypermedia-constants';

/**
 * @customElement
 * @polymer
 */

class D2LEvaluationHubActivitiesList extends mixinBehaviors([D2L.PolymerBehaviors.Siren.EntityBehavior], EvaluationHubLocalize(PolymerElement)) {
	static get template() {
		return html`
			<style include="d2l-table-style">
				d2l-th {
					font-weight: bold;
				}
				d2l-td {
					font-weight: normal;
				}
				d2l-loading-spinner {
					width: 100%;
				}
				.d2l-evaluation-hub-activities-list-load-more-container {
					padding-top: 1rem;
					text-align: right;
					width: 100%;
				}
				[hidden] {
					display: none;
				}
			</style>
			<d2l-table hidden$="[[_initialLoading]]" aria-colcount$="[[_headers.length]]" aria-rowcount$="[[_data.length]]">
				<d2l-thead>
					<d2l-tr>
						<dom-repeat items="[[_headers]]">
							<template>
								<d2l-th><d2l-table-col-sort-button nosort on-click="_sort"><span>[[localize(item.localizationKey)]]</span></d2l-table-col-sort-button></d2l-th>
							</template>
						</dom-repeat>
					</d2l-tr>
				</d2l-thead>
				<d2l-tbody>
					<dom-repeat items="[[_data]]" as="s">
						<template>
							<d2l-tr>
								<dom-repeat items="[[_headers]]" as="h">
									<template>
										<d2l-td>
											<d2l-link href="[[s.activityLink]]" hidden$="[[!h.canLink]]">[[_getDataProperty(s, h.key)]]</d2l-link>
											<span hidden$="[[h.canLink]]">[[_getDataProperty(s, h.key)]]</span>
										</d2l-td>
									</template>
								</dom-repeat>
							</d2l-tr>
						</template>
					</dom-repeat>
				</d2l-tbody>
			</d2l-table>
			<d2l-offscreen role="alert" aria-live="aggressive" hidden$="[[!_loading]]">[[localize('loading')]]</d2l-offscreen>
			<d2l-loading-spinner size="80" hidden$="[[!_loading]]"></d2l-loading-spinner>
			<template is="dom-if" if="[[_pageNextHref]]">
				<div class="d2l-evaluation-hub-activities-list-load-more-container">
					<d2l-button class="d2l-evaluation-hub-activities-list-load-more" onclick="[[_loadMore]]">[[localize('loadMore')]]</d2l-button>
				</div>
			</template>
		`;
	}
	static get is() { return 'd2l-evaluation-hub-activities-list'; }
	static get properties() {
		return {
			_headers: {
				type: Array,
				value: [
					{ key: [ 'displayName' ], sortKey: 'displayName', localizationKey: 'displayName', canLink: true },
					{ key: [ 'activityName' ], sortKey: 'activityName', localizationKey: 'activityName', canLink: false },
					{ key: [ 'courseName' ], sortKey: 'courseName', localizationKey: 'courseName', canLink: false },
					{ key: [ 'submissionDate' ], sortKey: 'submissionDate', localizationKey: 'submissionDate', canLink: false }
				]
			},
			_data: {
				type: Array,
				value: [ ]
			},
			_initialLoading: {
				type: Boolean,
				value: true
			},
			_loading: {
				type: Boolean,
				value: true
			},
			_filterHref: {
				type: String,
				value: ''
			},
			_sortHref: {
				type: String,
				value: ''
			},
			_pageNextHref: {
				type: String,
				value: ''
			}
		};
	}
	static get observers() {
		return [
			'_loadData(entity, href)'
		];
	}
	ready() {
		super.ready();
		this.addEventListener('d2l-siren-entity-error', function() {
			this._initialLoading = false;
			this._loading = false;
		}.bind(this));
		this._loadMore = this._loadMore.bind(this);
	}
	constructor() { super(); }

	_fetch(url) {
		return window.D2L.Siren.EntityStore.fetch(url, this.token);
	}

	_sort(e) {
		if (e.currentTarget.nosort) {
			e.currentTarget.removeAttribute('nosort');
		} else if (e.currentTarget.desc) {
			e.currentTarget.removeAttribute('desc');
		} else {
			e.currentTarget.setAttribute('desc', 'desc');
		}

		var headers = this.shadowRoot.querySelectorAll('d2l-table-col-sort-button');
		for (var i = 0; i < headers.length; i++) {
			if (headers[i] !== e.currentTarget) {
				headers[i].removeAttribute('desc');
				headers[i].setAttribute('nosort', 'nosort');
			}
		}

		// TODO: get the new sorted data once sorting is enabled!!!
	}

	async _loadData(entity) {
		if (!entity) {
			return Promise.resolve();
		}

		this._loading = true;

		try {
			await this._parseActivities(entity);
		} catch (e) {
			// Unable to load activities from entity.
		} finally {
			this._initialLoading = false;
			this._loading = false;
		}
	}

	_loadMore() {
		if (this._pageNextHref && !this._loading) {
			this._loading = true;
			this._followHref(this._pageNextHref).then(async function(u) {
				if (u && u.entity) {
					var tbody = this.shadowRoot.querySelector('d2l-tbody');
					var lastFocusableTableElement = D2L.Dom.Focus.getLastFocusableDescendant(tbody, false);

					try {
						await this._loadData(u.entity);
					} catch (e) {
						// Unable to load more activities from entity.
					} finally {
						window.requestAnimationFrame(function() {
							var newElementToFocus = D2L.Dom.Focus.getNextFocusable(lastFocusableTableElement, false);
							newElementToFocus.focus();
						});
					}
				}
			}.bind(this));
		}
	}

	_followLink(entity, rel) {
		var href = this._getHref(entity, rel);
		return this._followHref(href);
	}

	_getHref(entity, rel) {
		if (entity && entity.hasLinkByRel && entity.hasLinkByRel(rel)) {
			return entity.getLinkByRel(rel).href;
		}
		return '';
	}

	_followHref(href) {
		if (href) {
			return this._fetch(href);
		}
		return Promise.resolve();
	}

	async _parseActivities(entity) {
		var promises = [];
		entity.entities.forEach(function(activity) {
			promises.push(new Promise(function(resolve) {
				var item = {
					displayName: '',
					courseName: '',
					activityName: '',
					submissionDate: this._getSubmissionDate(activity),
					activityLink: this._getHref(activity, Rels.Assessments.assessmentApplication)
				};

				var getUserName = this._getUserPromise(activity, item);
				var getCourseName = this._getCoursePromise(activity, item);
				var getActivityName = this._getActivityPromise(activity, item);

				Promise.all([getUserName, getCourseName, getActivityName]).then(function() {
					resolve(item);
				});
			}.bind(this)));
		}.bind(this));

		this._filterHref = this._getHref(entity, Rels.filters);
		//this._sortHref = this._getHref(entity, Rels.sort);
		this._pageNextHref = this._getHref(entity, 'next');

		const result = await Promise.all(promises);
		this._data = this._data.concat(result);
	}

	_getActivityPromise(entity, item) {
		var rel;
		if (entity.hasClass(Classes.activities.userQuizAttemptActivity)) {
			rel = Rels.quiz;
		} else if (entity.hasClass(Classes.activities.userAssignmentActivity)) {
			rel = Rels.assignment;
		} else if (entity.hasClass(Classes.activities.userDiscussionActivity)) {
			rel = Rels.Discussions.topic;
		} else {
			return Promise.resolve();
		}
		return this._followLink(entity, rel)
			.then(function(a) {
				if (a && a.entity && a.entity.properties) {
					item.activityName = a.entity.properties.name;
				}
			});
	}

	_getCoursePromise(entity, item) {
		return this._followLink(entity, Rels.organization)
			.then(function(o) {
				if (o && o.entity && o.entity.properties) {
					item.courseName = o.entity.properties.name;
				}
			});
	}

	_getUserPromise(entity, item) {
		return this._followLink(entity, Rels.user)
			.then(function(u) {
				if (u && u.entity && u.entity.hasSubEntityByRel(Rels.displayName)) {
					item.displayName = u.entity.getSubEntityByRel(Rels.displayName).properties.name;
				}
			});
	}

	_getSubmissionDate(entity) {
		if (entity.hasSubEntityByRel('item')) {
			var i = entity.getSubEntityByRel('item');
			if (i.hasSubEntityByRel(Rels.date)) {
				return i.getSubEntityByRel(Rels.date).properties.date;
			}
		}
		return '';
	}

	_getDataProperty(item, prop) {
		var result;
		if (Array.isArray(prop) && prop.length > 0) {
			result = item;
			for (var i = 0; i < prop.length; i++) {
				result = result[prop[i]];
			}
		} else {
			result = item[prop];
		}
		return result;
	}
}

window.customElements.define(D2LEvaluationHubActivitiesList.is, D2LEvaluationHubActivitiesList);
