import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from '../QuickEvalLocalize.js';

class D2LQuickEvalActivityCardSubtitle extends QuickEvalLocalize(PolymerElement) {
	static get template() {
		const subtitleTemplate =  html`
			<style>
				span {
					font-size: .6rem;
				}
				span::before {
					content: "\u2022";
					margin: .2rem;
				}
				:host span:first-of-type::before {
					content: "";
					margin: 0;
				}
				@media (min-width: 900px) {
					span {
						font-size: .7rem;
						line-height: .7rem;
					}
				}
			</style>
			<template is="dom-repeat" items="[[_displayText]]">
				<span>[[item]]</span>
			</template>
		`;
		subtitleTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return subtitleTemplate;
	}

	static get properties() {
		return {
			text: {
				type: Array
			},
			_displayText: {
				type: Array,
				computed: '_computeDisplayText(text)'
			}
		};
	}

	_computeDisplayText(text) {
		return text.filter(t => t);
	}
}

window.customElements.define('d2l-quick-eval-activity-card-subtitle', D2LQuickEvalActivityCardSubtitle);
