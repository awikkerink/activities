import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from '../QuickEvalLocalize.js';
import 'd2l-tooltip/d2l-tooltip.js';

class D2LQuickEvalActivityCardUnreadSubmissions extends QuickEvalLocalize(PolymerElement) {
	static get is() { return 'd2l-quick-eval-activity-card-unread-submissions'; }
	static get template() {
		return html`
			<style>
				#d2l-quick-eval-activity-card-submissions {
					text-align: center;
					align-items: center;
					display: flex;
					justify-content: space-around;
				}
			</style>
			<div id="d2l-quick-eval-activity-card-submissions">[[_getNewSubmissionsText(activityType)]]</div>
			<d2l-tooltip for="d2l-quick-eval-activity-card-submissions" position="bottom">[[_getSubmissionTooltipText(activityType)]]</d2l-tooltip>
		`;
	}
	static get properties() {
		return {
			unread: {
				type: Number,
				value: 0
			},
			resubmitted: {
				type: Number,
				value: 0
			},
			activityType: {
				type: String,
				value: ''
			},
			activityTypeLocalizeNew: {
				type: Object,
				value: {
					'Assignment': 'newSubmissions',
					'Discussion': 'newPosts',
					'Quiz': 'newAttempts'
				}
			},
			activityTypeLocalizeDetail: {
				type: Object,
				value: {
					'Assignment': 'newSubmissionDetails',
					'Discussion': 'newPostDetails',
					'Quiz': 'newAttemptsDetails'
				}
			}

		};
	}

	_getNewSubmissionsText(activityType) {
		return this.localize(this.activityTypeLocalizeNew[activityType], 'num', this.unread + this.resubmitted);
	}

	_getSubmissionTooltipText(activityType) {
		return this.localize(this.activityTypeLocalizeDetail[activityType], 'newNum', this.unread, 'resub', this.resubmitted);
	}
}

window.customElements.define(D2LQuickEvalActivityCardUnreadSubmissions.is, D2LQuickEvalActivityCardUnreadSubmissions);
