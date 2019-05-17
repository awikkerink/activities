import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import {QuickEvalLogging} from './QuickEvalLogging.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import './behaviors/d2l-quick-eval-siren-helper-behavior.js';
import './behaviors/d2l-hm-search-behavior.js';
import 'd2l-common/components/d2l-hm-filter/d2l-hm-filter.js';
import 'd2l-common/components/d2l-hm-search/d2l-hm-search.js';

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
					search-action="[[_searchAction]]"
					placeholder="[[localize('search')]]"
					aria-label$="[[localize('search')]]">
				</d2l-hm-search>
			</div>
			<div class="clear"></div>
			<d2l-alert type="critical" hidden$="[[!_searchError]]" id="d2l-quick-eval-search-error-alert">
				[[localize('failedToSearch')]]
			</d2l-alert>
			<d2l-quick-eval-search-results-summary-container
				search-results-count$="[[_searchResultsCount]]"
				hidden$="[[!_showSearchResultSummary]]">
			</d2l-quick-eval-search-results-summary-container>
		`;

		quickEvalActivitiesTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return quickEvalActivitiesTemplate;
	}
	static get is() { return 'd2l-quick-eval-activities'; }

	static get properties() {
		return {
			_searchAction: {
				type: Object
			}
		};
	}

	ready() {
		console.log('ready');
		super.ready();
		this._searchAction = this._getSearchAction(this.entity);
		console.log(this._searchAction);
	}

	attached()  {
		this.addEventListener('d2l-hm-search-results-loading', this._searchResultsLoading);
		this.addEventListener('d2l-hm-search-results-loaded', this._searchResultsLoaded);
		this.addEventListener('d2l-hm-search-error', this._errorOnSearch);
	}

	detached() {
		this.removeEventListener('d2l-hm-search-results-loading', this._searchResultsLoading);
		this.removeEventListener('d2l-hm-search-results-loaded', this._searchResultsLoaded);
		this.removeEventListener('d2l-hm-search-error', this._errorOnSearch);
	}

	_searchResultsLoading() {
		console.log('_searchResultsLoading');
		// set loading state of list to true
		this._searchError = false;
	}

	_searchResultsLoaded(e) {
		console.log('_searchResultsLoaded');
		this.entity = e.detail.results;
		this._searchCleared = !e.detail.searchIsCleared;

		if (this.entity && this.entity.entities) {
			this._searchResultsCount = this.entity.entities.length;
		} else {
			this._searchResultsCount = 0;
		}
		this._searchError = false;
	}

	_errorOnSearch(evt) {
		console.log('_errorOnSearch');
		this._logError(evt.detail.error, {developerMessage: 'Failed to retrieve search results.'});
		// set loading state of list to false
		this._searchError = true;
	}
}
window.customElements.define(D2LQuickEvalActivities.is, D2LQuickEvalActivities);
