import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import {QuickEvalLogging} from './QuickEvalLogging.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-table/d2l-table.js';

/**
 * @customElement
 * @polymer
 */

class D2LQuickEvalNoSubmissionsText extends QuickEvalLogging(QuickEvalLocalize(PolymerElement)) {
	static get template() {
		const quickEvalNoSubmissionsTextTemplate = html`
			<style include="d2l-table-style">
				.d2l-quick-eval-no-submissions-heading {
					@apply --d2l-heading-2;
					margin: 0;
				}
			</style>
			<h2 class="d2l-quick-eval-no-submissions-heading">[[localize('caughtUp')]]</h2>
			<template is="dom-if" if="[[courseLevel]]">
				<p class="d2l-body-standard">[[localize('noSubmissionsCourseLevel')]]</p>
				<p class="d2l-body-standard">[[localize('checkBackOftenCourseLevel')]]</p>
			</template>
			<template is="dom-if" if="[[!courseLevel]]">
				<p class="d2l-body-standard">[[localize('noSubmissions')]]</p>
				<p class="d2l-body-standard">[[localize('checkBackOften')]]</p>
			</template>
		`;

		quickEvalNoSubmissionsTextTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return quickEvalNoSubmissionsTextTemplate;
	}
	static get properties() {
		return {
			courseLevel: {
				type: Boolean,
				value: false
			}
		};
	}
	static get observers() {
		return [];
	}
}

window.customElements.define('d2l-quick-eval-no-submissions-text', D2LQuickEvalNoSubmissionsText);
