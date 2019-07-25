import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier3-icons.js';
import 'd2l-icons/tier2-icons.js';

class D2LQuickEvalActivityCardActionButton extends PolymerElement {
	static get is() { return 'd2l-quick-eval-activity-card-action-button'; }
	static get template() {
		return html`
			<style>
				:host {
					--d2l-quick-eval-card-button-icon-size: 1.2rem;
					--d2l-quick-eval-card-button-icon-background-size: 1.5rem;
					--d2l-quick-eval-card-button-font-size: .6rem;
					--d2l-quick-eval-card-button-icon-padding: calc(calc(var(--d2l-quick-eval-card-button-icon-background-size) - var(--d2l-quick-eval-card-button-icon-size)) / 2);
					--d2l-quick-eval-card-button-icon-hover: 0 0 0 var(--d2l-quick-eval-card-button-icon-padding) var(--d2l-color-gypsum);
					--d2l-quick-eval-card-button-icon-focus-inner: 0 0 0 calc(var(--d2l-quick-eval-card-button-icon-padding) + 2px) white;
					--d2l-quick-eval-card-button-icon-focus-outer: 0 0 0 calc(var(--d2l-quick-eval-card-button-icon-padding) + 4px) var(--d2l-color-celestine);
				}
				:host button {
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					align-content: center;
					justify-content: space-between;
					font-size: var(--d2l-quick-eval-card-button-font-size);
					line-height: calc(var(--d2l-quick-eval-card-button-font-size) - .2rem);
					color: var(--d2l-color-ferrite);
					background: white;
					height: 100%;
					width: 100%;
					outline: none;
					border: none;
					padding: 0;
				}
				.d2l-quick-eval-activity-card-button-icon {
					width: var(--d2l-quick-eval-card-button-icon-size);
					height: var(--d2l-quick-eval-card-button-icon-size);
					border-radius: .3rem;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				:host(:hover) button,
				:host(:hover) d2l-icon,
				:host(:focus-within) button,
				:host(:focus-within) d2l-icon,
				:host(:focus) button,
				:host(:focus) d2l-icon {
					text-decoration: underline;
					color: var(--d2l-color-celestine-minus-1);
				}
				:host(:hover) .d2l-quick-eval-activity-card-button-icon {
					background-color: var(--d2l-color-gypsum);
					box-shadow: var(--d2l-quick-eval-card-button-icon-hover);
				}
				:host(:focus) .d2l-quick-eval-activity-card-button-icon,
				:host(:focus-within) .d2l-quick-eval-activity-card-button-icon {
					background-color: var(--d2l-color-gypsum);
					box-shadow: var(--d2l-quick-eval-card-button-icon-hover), var(--d2l-quick-eval-card-button-icon-focus-inner), var(--d2l-quick-eval-card-button-icon-focus-outer)
				}
				.d2l-quick-eval-card-button-icon-large {
					display: none;
				}
				@media (min-width: 900px) {
					.d2l-quick-eval-card-button-icon-large {
						display: unset;
					}
					.d2l-quick-eval-card-button-icon-small {
						display: none;
					}
					:host {
						--d2l-quick-eval-card-button-icon-size: 1.5rem;
						--d2l-quick-eval-card-button-icon-background-size: 2.1rem;
						--d2l-quick-eval-card-button-font-size: .7rem;
					}
				}
			</style>
			<button 
				aria-labelledby$="d2l-quick-eval-activity-card-button-text"
				aria-expanded$="[[ariaExpanded]]"
				aria-haspopup$="[[ariaHaspopup]]"
				aria-label$="[[_ariaLabel]]"
				form$="[[form]]"
				formaction$="[[formaction]]"
				formenctype$="[[formenctype]]"
				formmethod$="[[formmethod]]"
				formnovalidate$="[[formnovalidate]]"
				formtarget$="[[formtarget]]"
				name$="[[name]]"
				title$="[[text]]"
				type$="[[type]]">
				<div class="d2l-quick-eval-activity-card-button-icon">
					<d2l-icon icon="[[_computeIcon(3)]]" class="d2l-quick-eval-card-button-icon-large"></d2l-icon>
					<d2l-icon icon="[[_computeIcon(2)]]" class="d2l-quick-eval-card-button-icon-small"></d2l-icon>
				</div>
				<span id="d2l-quick-eval-activity-card-button-text">[[text]]</span>
			</button>
		`;
	}
	static get properties() {
		return {
			text: {
				type: String
			},
			iconName: {
				type: String
			}
		};
	}

	_computeIcon(tier) {
		return `d2l-tier${tier}:${this.iconName}`;
	}
}

window.customElements.define(D2LQuickEvalActivityCardActionButton.is, D2LQuickEvalActivityCardActionButton);