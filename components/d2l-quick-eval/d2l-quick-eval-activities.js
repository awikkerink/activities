import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import {QuickEvalLogging} from './QuickEvalLogging.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import './behaviors/d2l-quick-eval-siren-helper-behavior.js';
import './behaviors/d2l-hm-search-behavior.js';
import 'd2l-common/components/d2l-hm-filter/d2l-hm-filter.js';
import 'd2l-common/components/d2l-hm-search/d2l-hm-search.js';
import './d2l-quick-eval-no-submissions-image.js';
import './d2l-quick-eval-no-criteria-results-image.js';

/**
 * @customElement
 * @polymer
 */

class D2LQuickEvalActivities extends mixinBehaviors(
	[D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior, D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviour],
	QuickEvalLogging(QuickEvalLocalize(PolymerElement))
) {
	static get template() {
		const quickEvalActivitiesTemplate = html`
			<style>
				.d2l-quick-eval-activity-list-modifiers {
					float: right;
				}
				.clear {
					clear: both;
				}
				d2l-hm-search {
					display: inline-block;
					width: 250px;
					margin-left: .25rem;
				}
				.d2l-quick-eval-no-submissions,
				.d2l-quick-eval-no-criteria-results {
					text-align: center;
				}
				d2l-quick-eval-no-submissions-image {
					padding-top: 30px;
					padding-bottom: 30px;
					height: 35%;
					width: 35%;
				}
				d2l-quick-eval-no-criteria-results-image {
					padding-top: 30px;
					padding-bottom: 30px;
					height: 15%;
					width: 15%;
				}
				.d2l-quick-eval-no-submissions-heading,
				.d2l-quick-eval-no-criteria-results-heading {
					@apply --d2l-heading-2;
					margin: 0;
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
			</style>
			<div class="d2l-quick-eval-activity-list-modifiers">
				<d2l-hm-filter>
				</d2l-hm-filter>
				<d2l-hm-search
					token="[[token]]"
					search-action="[[searchAction]]"
					placeholder="[[localize('search')]]"
					aria-label$="[[localize('search')]]">
				</d2l-hm-search>
			</div>
			<div class="clear"></div>
			<d2l-alert type="critical" hidden$="[[!searchError]]" id="d2l-quick-eval-search-error-alert">
				[[localize('failedToSearch')]]
			</d2l-alert>
			<d2l-quick-eval-search-results-summary-container
				search-results-count$="[[searchResultsCount]]"
				hidden$="[[searchCleared]]">
			</d2l-quick-eval-search-results-summary-container>
			<div class="d2l-quick-eval-no-submissions" hidden$="[[!_shouldShowNoSubmissions(_data, filterApplied, searchCleared)]]">
				<d2l-quick-eval-no-submissions-image></d2l-quick-eval-no-submissions-image>
				<h2 class="d2l-quick-eval-no-submissions-heading">[[localize('caughtUp')]]</h2>
				<p class="d2l-body-standard">[[localize('noSubmissions')]]</p>
				<p class="d2l-body-standard">[[localize('checkBackOften')]]</p>
			</div>
			<div class="d2l-quick-eval-no-criteria-results" hidden$="[[!_shouldShowNoCriteriaResults(_data, filterApplied, searchCleared)]]">
				<d2l-quick-eval-no-criteria-results-image></d2l-quick-eval-no-criteria-results-image>
				<h2 class="d2l-quick-eval-no-criteria-results-heading">[[localize('noResults')]]</h2>
				<p class="d2l-body-standard">[[localize('noCriteriaMatch')]]</p>
			</div>
		`;

		quickEvalActivitiesTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return quickEvalActivitiesTemplate;
	}
	static get is() { return 'd2l-quick-eval-activities'; }
	static get properties() {
		return {
			_data: {
				type: Array,
				value: []
			},
			filterApplied: {
				type: Boolean,
				value: false
			},
			searchCleared: {
				type: Boolean,
				value: true
			}
		};
	}

	_shouldShowNoSubmissions() {
		return !(this._data.length) && !(this.filterApplied || !this.searchCleared);
	}

	_shouldShowNoCriteriaResults() {
		return !(this._data.length) && (this.filterApplied || !this.searchCleared);
	}
}
window.customElements.define(D2LQuickEvalActivities.is, D2LQuickEvalActivities);
