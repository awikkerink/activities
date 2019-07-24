import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from '../QuickEvalLocalize.js';
import 'd2l-tooltip/d2l-tooltip.js';

class D2LQuickEvalActivityCardUnreadSubmissions extends QuickEvalLocalize(PolymerElement) {
	static get is() { return 'd2l-quick-eval-activity-card-unread-submissions'; }
	static get template() {
		return html`
			<style>
					.d2l-quick-eval-activity-card-submissions-container {
						align-items: baseline;
						display: flex;
						justify-content: space-around;
						margin: auto;
					}
					.d2l-quick-eval-activity-card-submissions-number {
						font-size: 1.2rem;
					}
					.d2l-quick-eval-activity-card-submissions-subtitle {
						font-size: 0.6rem;
					}
				@media (min-width: 525px) {
					.d2l-quick-eval-activity-card-submissions-container {
						align-items: center;
						flex-direction: column;
						margin: 0;
					}
					.d2l-quick-eval-activity-card-submissions-number {
						font-size: 1.5rem;
					}
					.d2l-quick-eval-activity-card-submissions-subtitle {
						font-size: 0.7rem;
					}
				}
			</style>
			<div id="d2l-quick-eval-activity-card-submissions-container" class="d2l-quick-eval-activity-card-submissions-container">
				<div class="d2l-quick-eval-activity-card-submissions-number">[[_getNewSubmissionsNumber(unread, resubmitted)]]</div>
				<div class="d2l-quick-eval-activity-card-submissions-subtitle">[[_getNewSubmissionsSubtitle(unread, resubmitted, activityType)]]</div>
			</div>
			<d2l-tooltip for="d2l-quick-eval-activity-card-submissions-container" position="bottom">[[_getSubmissionTooltipText(unread, resubmitted, activityType)]]</d2l-tooltip>
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

	_getNewSubmissionsNumber(unread, resubmitted) {
		return this.unread + this.resubmitted;
	}
	_getNewSubmissionsSubtitle(unread, resubmitted, activityType) {
		// return this.localize(this.activityTypeLocalizeNew[activityType], 'num', this.unread + this.resubmitted);
		return this.localize(this.activityTypeLocalizeNew[activityType]);
	}

	_getSubmissionTooltipText(unread, resubmitted, activityType) {
		return this.localize(this.activityTypeLocalizeDetail[activityType], 'newNum', this.unread, 'resub', this.resubmitted);
	}
}

window.customElements.define(D2LQuickEvalActivityCardUnreadSubmissions.is, D2LQuickEvalActivityCardUnreadSubmissions);
