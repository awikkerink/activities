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
		const temp = html`
			<style>
				.d2l-quick-eval-view-toggle-left {
					border-top-left-radius: 0.3em;
					border-bottom-left-radius: 0.3em;
					border-width: 1px;
				}
				.d2l-quick-eval-view-toggle-right {
					border-top-right-radius: 0.3em;
					border-bottom-right-radius: 0.3em;
					border-width: 1px 1px 1px 0;
				}
				:host button {
					background-color: var(--d2l-color-regolith);
					border-color: var(--d2l-color-mica);
					border-style: solid;
					box-sizing: border-box;
					color: var(--d2l-color-ferrite);
					cursor: pointer;
					display: inline;
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
				:host button:hover,
				:host button[selected] {
					background-color: var(--d2l-color-gypsum);
				}
				:host button:focus-within {
					box-shadow: 0 0 0 4px rgba(0, 111, 191, 0.3);
					position: relative;
				}
			</style>
			<div>
				<button class="d2l-quick-eval-view-toggle-left" on-click="_selectSubmissions" selected$="[[_isSelected('submissions')]]">[[localize('submissions')]]</button>
				<button class="d2l-quick-eval-view-toggle-right" on-click="_selectActivities" selected$="[[_isSelected('activities')]]">[[localize('activities')]]</button>
			<div>
		`;
		temp.setAttribute('strip-whitespace', 'strip-whitespace');
		return temp;
	}
	static get properties() {
		return {
			currentSelected: {
				type: String
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
			this._dispatchSelectionChanged(this._viewTypes.submissions);
		}
	}
	_selectActivities() {
		if (this.currentSelected !== this._viewTypes.activities) {
			this.currentSelected = this._viewTypes.activities;
			this._dispatchSelectionChanged(this._viewTypes.activities);
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
