import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import 'd2l-colors/d2l-colors.js';

/**
 * @customElement
 * @polymer
 */
class D2LQuickEvalViewToggle extends QuickEvalLocalize(PolymerElement) {
	static get is() { return 'd2l-quick-eval-view-toggle'; }
	static get template() {
		const toggleTemplate = html`
			<style>
				:host button.d2l-quick-eval-view-toggle-left,
				:host(:dir(rtl)) button.d2l-quick-eval-view-toggle-right {
					border-top-left-radius: 0.3rem;
					border-bottom-left-radius: 0.3rem;
					border-right-color: transparent;
					border-top-right-radius: 0rem;
					border-bottom-right-radius: 0;
					border-left-color: var(--d2l-color-mica);
				}
				:host button.d2l-quick-eval-view-toggle-left {
					margin-inline-start: 0.9rem;
				}
				:host button.d2l-quick-eval-view-toggle-right,
				:host(:dir(rtl)) button.d2l-quick-eval-view-toggle-left {
					border-top-right-radius: 0.3rem;
					border-bottom-right-radius: 0.3rem;
					border-left-color: transparent;
					border-top-left-radius: 0rem;
					border-bottom-left-radius: 0rem;
					border-right-color: var(--d2l-color-mica);
				}
				:host button {
					background-color: var(--d2l-color-sylvite);
					border-color: var(--d2l-color-mica);
					border-style: solid;
					border-width: 1px;
					box-sizing: border-box;
					color: var(--d2l-color-ferrite);
					cursor: pointer;
					display: inline;
					font-family: inherit;
					font-size: .7rem;
					font-weight: 700;
					margin: 0;
					min-height: calc(2rem + 2px);
					outline: none;
					padding: 0.5rem 1.5rem;
					text-align: center;
					transition: box-shadow 0.2s;
					user-select: none;
					vertical-align: middle;
					white-space: nowrap;
					width: auto;
					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
				}
				:host button:hover {
					border: 1px solid var(--d2l-color-celestine) !important;
				}
				:host button:focus {
					background-color: #e6eaf0;
				}
				:host button.d2l-quick-eval-view-toggle-left[selected], :host button.d2l-quick-eval-view-toggle-right[selected] {
					background-color: var(--d2l-color-tungsten);
					border-color: var(--d2l-color-tungsten);
					color: var(--d2l-color-white);
				}
			</style>
			<div>
				<label id="d2l-quick-eval-view-toggle-label">[[localize('viewBy')]]</label>
				<button
					class="d2l-quick-eval-view-toggle-left"
					on-click="_selectSubmissions"
					selected$="[[_isSelected(_viewTypes.submissions, currentSelected)]]"
					aria-labelledby="d2l-quick-eval-view-toggle-label"
				>[[localize('submissions')]]</button>
				<button
					class="d2l-quick-eval-view-toggle-right"
					on-click="_selectActivities"
					selected$="[[_isSelected(_viewTypes.activities, currentSelected)]]"
					aria-labelledby="d2l-quick-eval-view-toggle-label"
				>[[localize('activities')]]</button>
			<div>
		`;
		toggleTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return toggleTemplate;
	}
	static get properties() {
		return {
			currentSelected: {
				type: String,
				observer: '_dispatchSelectionChanged'
			},
			_viewTypes: {
				type: Object,
				value: {
					submissions: 'submissions',
					activities: 'activities'
				}
			}
		};
	}
	_selectSubmissions() {
		if (this.currentSelected !== this._viewTypes.submissions) {
			this.currentSelected = this._viewTypes.submissions;
		}
	}
	_selectActivities() {
		if (this.currentSelected !== this._viewTypes.activities) {
			this.currentSelected = this._viewTypes.activities;
		}
	}
	_isSelected(view) {
		return this.currentSelected === view;
	}
	_dispatchSelectionChanged(view) {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-view-toggle-changed',
				{
					detail: {
						view: view
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}
}

window.customElements.define(D2LQuickEvalViewToggle.is, D2LQuickEvalViewToggle);
