import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import {QuickEvalLogging} from './QuickEvalLogging.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './d2l-quick-eval-search-results-summary-container.js';
import './d2l-quick-eval-view-toggle.js';
import './d2l-quick-eval-activities.js';
import './d2l-quick-eval-submissions.js';

/**
 * @customElement
 * @polymer
 */
class D2LQuickEval extends mixinBehaviors(
	[D2L.PolymerBehaviors.Siren.EntityBehavior],
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
				[hidden] {
					display: none;
				}
			</style>
			<template is="dom-if" if="[[headerText]]">
				<h1 class="d2l-quick-eval-header-with-toggle" hidden$="[[!activitiesViewEnabled]]"">[[headerText]]</h1>
				<h1 class="d2l-quick-eval-header" hidden$="[[activitiesViewEnabled]]"">[[headerText]]</h1>
			</template>
			<d2l-quick-eval-view-toggle
				current-selected="submissions"
				hidden$="[[!activitiesViewEnabled]]"
				on-d2l-quick-eval-view-toggle-changed="_toggleView">
			</d2l-quick-eval-view-toggle>
			<d2l-quick-eval-submissions
				href="[[href]]"
				token="[[token]]"
				logging-endpoint="[[loggingEndpoint]]"
				master-teacher="[[masterTeacher]]"
				hidden$="[[_showActivitiesView]]">
			</d2l-quick-eval-submissions>
			<d2l-quick-eval-activities
				href="[[href]]"
				token="[[token]]"
				logging-endpoint="[[loggingEndpoint]]"
				is-visible="[[_showActivitiesView]]"
				hidden$="[[!_showActivitiesView]]">
			</d2l-quick-eval-activities>
		`;
	}

	static get is() {
		return 'd2l-quick-eval';
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

	attached()  {
		this.addEventListener('d2l-quick-eval-activities-list-sort-updated', this._sortChanged);
		this.addEventListener('d2l-quick-eval-activities-list-activities-shown-number-updated', this._updateNumberOfActivitiesToShow);
		this.addEventListener('d2l-quick-eval-activities-list-search-results-count', this._updateNumberOfActivitiesShownInSearchResults);

	}

	detached() {
		this.removeEventListener('d2l-quick-eval-activities-list-sort-updated', this._sortChanged);
		this.removeEventListener('d2l-quick-eval-activities-list-activities-shown-number-updated', this._updateNumberOfActivitiesToShow);
		this.removeEventListener('d2l-quick-eval-activities-list-search-results-count', this._updateNumberOfActivitiesShownInSearchResults);
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

	_sortChanged(e) {
		this.entity = e.detail.sortedActivities;
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
