import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier3-icons.js';
import 'd2l-icons/tier2-icons.js';

class D2LQuickEvalActivityCardActionButton extends PolymerElement {
	static get is() { return 'd2l-quick-eval-activity-card-action-button'; }
	static get template() {
		return html`
			<style>
				:host button {
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					align-content: center;
					justify-content: flex-end;
					font-size: .6rem;
					line-height: .6rem;
					color: var(--d2l-color-ferrite);
					background: white;
					height: 100%;
					width: 100%;
					outline: none;
					border: none;
					padding: 0;
				}
				:host button span {
					padding-top: .25rem;
				}
				.d2l-quick-eval-activity-card-button-icon {
					width: 1.5rem;
					height: 1.5rem;
					border-radius: .3rem;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.d2l-quick-eval-acivity-card-button-icon-focus {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 1.6rem;
					height: 1.6rem;
					border-radius: .3rem;
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
				:host(:hover) .d2l-quick-eval-activity-card-button-icon,
				:host(:focus) .d2l-quick-eval-activity-card-button-icon,
				:host(:focus-within) .d2l-quick-eval-activity-card-button-icon {
					background: var(--d2l-color-gypsum);
				}
				:host(:focus) .d2l-quick-eval-activity-card-button-icon,
				:host(:focus-within) .d2l-quick-eval-activity-card-button-icon {
					box-shadow: 0 0 0 2px white, 0 0 0 4px var(--d2l-color-celestine);
				}
				.d2l-quick-eval-card-button-icon-large {
					display: none;
				}
				@media (min-width: 900px) {
					:host button span {
						padding-top: 1rem;
					}
					.d2l-quick-eval-card-button-icon-large {
						display: unset;
					}
					.d2l-quick-eval-card-button-icon-small {
						display: none;
					}
					:host button span {
						font-size: .7rem;
						line-height: .7rem;
					}
					.d2l-quick-eval-activity-card-button-icon {
						width: 2.1rem;
						height: 2.1rem;
					}
				}
			</style>
			<button>
				<div class="d2l-quick-eval-activity-card-button-icon">
					<d2l-icon icon="[[_computeIcon(3)]]" class="d2l-quick-eval-card-button-icon-large"></d2l-icon>
					<d2l-icon icon="[[_computeIcon(2)]]" class="d2l-quick-eval-card-button-icon-small"></d2l-icon>
				</div>
				<span>[[text]]</span>
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