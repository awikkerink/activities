import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from '../QuickEvalLocalize.js';
import '../../d2l-activity-name/d2l-activity-name.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier3-icons.js';
import 'd2l-tooltip/d2l-tooltip.js';
import 'd2l-offscreen/d2l-offscreen-shared-styles.js';

class D2LQuickEvalActivityCard extends QuickEvalLocalize(PolymerElement) {
	static get is() { return 'd2l-quick-eval-activity-card'; }
	static get template() {
		return html`
			<style include="d2l-offscreen-shared-styles">
				:host {
					--d2l-quick-eval-activity-card-items-content-size: 6.25rem;
				}
				[hidden] {
					display: none;
				}
				.d2l-quick-eval-card {
					border: 3px solid var(--d2l-color-ferrite);
					border-radius: 10px;
					padding: 2.2rem;
					display: flex;
					justify-content: space-between;
				}
				.d2l-quick-eval-card:hover,
				.d2l-quick-eval-card:focus-within {
					border-color: var(--d2l-color-celestine-plus-1);
					outline: none;
				}
				.d2l-quick-eval-activity-card-item {
					width: 7.5rem;
					height: 3rem;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: space-around;
				}
				.d2l-quick-eval-activity-card-items-separator {
					border-left: .05rem solid var(--d2l-color-mica);
  					height: 3rem;
				}
				.d2l-quick-eval-card-right,
				.d2l-quick-eval-activity-card-items-meters,
				.d2l-quick-eval-activity-card-items-buttons {
					display: flex;
					align-items: center;
				}
				.d2l-quick-eval-card:hover .d2l-quick-eval-activity-card-items-meters,
				.d2l-quick-eval-card:focus-within .d2l-quick-eval-activity-card-items-meters,
				.d2l-quick-eval-card:not(:hover):not(:focus-within) .d2l-quick-eval-activity-card-items-buttons {
					@apply --d2l-offscreen;
				}
				.d2l-quick-eval-card:hover .d2l-quick-eval-activity-card-hovered-on,
				.d2l-quick-eval-card:focus-within .d2l-quick-eval-activity-card-hovered-on,
				.d2l-quick-eval-card:not(:hover):not(:focus-within) .d2l-quick-eval-activity-card-hovered-off {
					fill: var(--d2l-color-tungsten);
				}
				button {
					background-color: transparent;
					border: none;
					outline: none;
				}
				button:hover,
				button:focus,
				button:hover d2l-icon,
				button:focus d2l-icon {
					color: var(--d2l-color-celestine-plus-1);
				}
				circle {
					stroke: var(--d2l-color-tungsten);
					fill: transparent;
				}
			</style>
			<div class="d2l-quick-eval-card" on-click="_clicked" tabindex="-1">
				<div>
					<d2l-activity-name href="[[activityNameHref]]" token="[[token]]"></d2l-activity-name>
					<div>[[activityType]] &bull; [[localize('due', 'date', dueDate)]]</div>
				</div>
				<div class="d2l-quick-eval-card-right">
					<div id="d2l-quick-eval-activity-card-submissions" class="d2l-quick-eval-activity-card-item">[[_getNewSubmissionsText()]]</div>
					<d2l-tooltip for="d2l-quick-eval-activity-card-submissions" position="bottom">[[_getSubmissionTooltipText()]]</d2l-tooltip>
					<div class="d2l-quick-eval-activity-card-items-separator"></div>
					<div class="d2l-quick-eval-activity-card-items-meters">
						<span class="d2l-quick-eval-activity-card-item">[[completed]]/[[total]] [[localize('completed')]]</span>
						<div class="d2l-quick-eval-activity-card-items-separator"></div>
						<span class="d2l-quick-eval-activity-card-item">[[evaluated]]/[[total]] [[localize('evaluated')]]</span>
						<div class="d2l-quick-eval-activity-card-items-separator"></div>
						<span class="d2l-quick-eval-activity-card-item">[[published]]/[[total]] [[localize('published')]]</span>
					</div>
					<div class="d2l-quick-eval-activity-card-items-buttons">
						<button class="d2l-quick-eval-activity-card-item"><d2l-icon icon="d2l-tier3:quizzing"></d2l-icon>[[localize('evaluateAll')]]</button>
						<div class="d2l-quick-eval-activity-card-items-separator"></div>
						<button class="d2l-quick-eval-activity-card-item"><d2l-icon icon="d2l-tier3:preview"></d2l-icon>[[localize('submissionList')]]</button>
						<div class="d2l-quick-eval-activity-card-items-separator"></div>
						<button class="d2l-quick-eval-activity-card-item"><d2l-icon icon="d2l-tier3:grade"></d2l-icon>[[localize('publishAll')]]</button>
					</div>
					<div class="d2l-quick-eval-activity-card-items-separator"></div>
					<svg width=".7rem" height="1.4rem">
						<circle cx=".35rem" cy=".35rem" r=".25rem" stroke-width=".1rem" class="d2l-quick-eval-activity-card-hovered-off"></circle>
						<circle cx=".35rem" cy="1.1rem" r=".25rem" stroke-width=".1rem" class="d2l-quick-eval-activity-card-hovered-on"></circle>
					</svg>
				</div>
			</div>
		`;
	}
	static get properties() {
		return {
			total: {
				type: Number,
				value: 0
			},
			completed: {
				type: Number,
				value: 0
			},
			evaluated: {
				type: Number,
				value: 0
			},
			published: {
				type: Number,
				value: 0
			},
			unread: {
				type: Number,
				value: 0
			},
			resubmitted: {
				type: Number,
				value: 0
			},
			dueDate: {
				type: String,
				value: ''
			},
			activityNameHref: {
				type: String,
				value: ''
			},
			token: {
				type: String,
				value: ''
			},
			activityType: {
				type: String,
				value: ''
			},
			_focused: {
				type: Boolean,
				value: false
			}
		};
	}

	_clicked() {
		if (this._focused) {
			this.blur();
		}
		this._focused = !this._focused;
	}

	_getNewSubmissionsText() {
		return this.localize('unreadSubmissions', 'num', this.unread + this.resubmitted);
	}

	_getSubmissionTooltipText() {
		return this.localize('unreadSubmissionsDetail', 'unread', this.unread, 'resub', this.resubmitted);
	}
}

window.customElements.define(D2LQuickEvalActivityCard.is, D2LQuickEvalActivityCard);
