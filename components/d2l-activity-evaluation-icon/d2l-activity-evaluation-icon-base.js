import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { ActivityEvaluationIconBaseLocalize } from './ActivityEvaluationIconBaseLocalize.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-polymer-behaviors/d2l-id.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-tooltip/d2l-tooltip.js';

/**
 * @customElement
 * @polymer
 */
class ActivityEvaluationIconBase extends ActivityEvaluationIconBaseLocalize(PolymerElement) {
	static get template() {
		return html`
			<style>
				:host {
					display: none;
				}

				:host([draft]) {
						display: inline-block;
				}
			</style>
			<template is="dom-if" if="[[draft]]">
				<d2l-icon aria-labelledby$="[[_tooltipId]]" icon="d2l-tier1:draft"></d2l-icon>
				<d2l-tooltip
					id$="[[_tooltipId]]"
					position="bottom"
					offset="15"
				>
					[[localize('draftInfo')]]
				</d2l-tooltip>
			</template>
		`;
	}

	static get is() { return 'd2l-activity-evaluation-icon-base'; }

	static get properties() {
		return {
			draft: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			_tooltipId: {
				type:String,
				computed: '_computeId()'
			}
		};
	}

	_computeId() {
		return D2L.Id.getUniqueId();
	}
}

window.customElements.define('d2l-activity-evaluation-icon-base', ActivityEvaluationIconBase);
