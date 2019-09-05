import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-fetch/d2l-fetch.js';

/**
 * @customElement
 * @polymer
 */
class D2LQuickEvalViewToggle extends QuickEvalLocalize(PolymerElement) {
	static get is() { return 'd2l-quick-eval-view-toggle'; }
	static get template() {
		const toggleTemplate = html`
			<style>
				button.d2l-quick-eval-view-toggle-left,
				:host(:dir(rtl)) button.d2l-quick-eval-view-toggle-right {
					border-top-left-radius: 0.3rem;
					border-bottom-left-radius: 0.3rem;
					border-right-color: transparent;
					border-top-right-radius: 0rem;
					border-bottom-right-radius: 0;
					border-left-color: var(--d2l-color-mica);
				}
				button.d2l-quick-eval-view-toggle-right,
				:host(:dir(rtl)) button.d2l-quick-eval-view-toggle-left {
					border-top-right-radius: 0.3rem;
					border-bottom-right-radius: 0.3rem;
					border-left-color: transparent;
					border-top-left-radius: 0rem;
					border-bottom-left-radius: 0rem;
					border-right-color: var(--d2l-color-mica);
				}
				button {
					background-color: var(--d2l-color-sylvite);
					border-color: var(--d2l-color-mica);
					border-style: solid;
					border-width: 1px;
					box-sizing: border-box;
					color: var(--d2l-color-ferrite);
					cursor: pointer;
					display: inline;
					flex: 1;
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
				button:hover, button:focus {
					border: 1px solid var(--d2l-color-celestine) !important;
				}
				button.d2l-quick-eval-view-toggle-left[selected], button.d2l-quick-eval-view-toggle-right[selected] {
					background-color: var(--d2l-color-tungsten);
					border-color: var(--d2l-color-tungsten);
					color: var(--d2l-color-white);
				}
				button[selected]:hover, button[selected]:focus {
					box-shadow: inset 0 0 0 2px #ffffff;
				}
				:host {
					width: 100%;
					display: flex;
				}
				label {
					display: none;
				}
				@media (min-width: 525px) {
					:host {
						margin: 0 -0.9rem;
						display: block;
						width: auto;
					}
					label {
						margin: 0 0.9rem;
						display: inline;
					}
				}
			</style>
			<label>[[localize('viewBy')]]</label>
			<button
				aria-pressed$="[[_isPressed(_viewTypes.submissions, currentSelected)]]"
				class="d2l-quick-eval-view-toggle-left"
				on-click="_selectSubmissions"
				selected$="[[_isSelected(_viewTypes.submissions, currentSelected)]]"
			>[[localize('submissions')]]</button>
			<button
				aria-pressed$="[[_isPressed(_viewTypes.activities, currentSelected)]]"
				class="d2l-quick-eval-view-toggle-right"
				on-click="_selectActivities"
				selected$="[[_isSelected(_viewTypes.activities, currentSelected)]]"
			>[[localize('activities')]]</button>
		`;
		toggleTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return toggleTemplate;
	}
	static get properties() {
		return {
			currentSelected: {
				type: String,
				observer: '_handleSelectionChange'
			},
			toggleHref: {
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

	ready() {
		super.ready();
		if (
			(this.currentSelected !== this._viewTypes.submissions)
			&& (this.currentSelected !== this._viewTypes.activities)
		) {
			this.currentSelected = this._viewTypes.submissions;
		}
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
	_isPressed(view) {
		return this._isSelected(view).toString();
	}
	_handleSelectionChange(view, previousView) {

		if (
			this.toggleHref
			&& previousView !== null
			&& previousView !== undefined
		) {
			const data = { toggleState: view };

			window.d2lfetch.fetch(
				new Request(
					this.toggleHref,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(data)
					}
				)
			);
		}

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
