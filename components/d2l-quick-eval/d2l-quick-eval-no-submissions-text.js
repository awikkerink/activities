import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import {QuickEvalLogging} from './QuickEvalLogging.js';
import 'd2l-alert/d2l-alert.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-table/d2l-table.js';
import 'd2l-button/d2l-button.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-polymer-behaviors/d2l-dom-focus.js';
import 'd2l-polymer-behaviors/d2l-id.js';
import 'd2l-link/d2l-link.js';
import 'd2l-users/components/d2l-profile-image.js';
import '../d2l-activity-name/d2l-activity-name.js';
import '../d2l-activity-evaluation-icon/d2l-activity-evaluation-icon-base.js';
import './d2l-quick-eval-no-submissions-image.js';
import './d2l-quick-eval-no-criteria-results-image.js';
import './d2l-quick-eval-submissions-skeleton.js';
import 'd2l-loading-spinner/d2l-loading-spinner.js';

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
