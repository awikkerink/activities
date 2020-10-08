import '@brightspace-ui/core/components/inputs/input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '../d2l-activity-due-date-editor.js';
import '../d2l-activity-outcomes.js';
import '../d2l-activity-score-editor.js';
import '../d2l-activity-text-editor.js';
import '../d2l-activity-attachments/d2l-activity-attachments-editor.js';

import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityAssignmentEditorMixin } from '../d2l-activity-assignment-editor/mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from '../d2l-activity-assignment-editor/state/assignment-store.js';

class QuizEditorDetail extends AsyncContainerMixin(SkeletonMixin(LocalizeActivityAssignmentEditorMixin(RtlMixin(ActivityEditorMixin(MobxLitElement))))) {

	static get properties() {
		return {
			activityUsageHref: { type: String, attribute: 'activity-usage-href' },
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:host > div,
				.d2l-activity-label-container {
					margin-bottom: 8px;
				}
				:host([dir="rtl"]) #score-container {
					margin-left: 40px;
					margin-right: 0;
				}
				d2l-alert {
					margin-bottom: 10px;
					max-width: 100%;
				}
				.d2l-locked-alert {
					align-items: baseline;
					display: flex;
				}
				d2l-icon {
					padding-right: 1rem;
				}
				:host([dir="rtl"]) d2l-icon {
					padding-left: 1rem;
					padding-right: 0;
				}
			`
		];
	}

	constructor() {
		super();
		this._debounceJobs = {};
		this.skeleton = false;
	}

	render() {
		const quiz = store.getAssignment(this.href);

		const {
			name,
			canEditName,
		} = quiz || {};

		const hasSubmissions = false;

		return html`
			<d2l-alert ?hidden=${!hasSubmissions}>
				<div class="d2l-locked-alert">
					<d2l-icon icon="tier1:lock-locked"></d2l-icon>
					<div>${this.localize('assignmentLocked')}</div>
				</div>
			</d2l-alert>
			<div id="assignment-name-container">
				<d2l-input-text
					?skeleton="${this.skeleton}"
					id="assignment-name"
					maxlength="128"
					value="${name}"
					@input="${this._saveNameOnInput}"
					label="${this.localize('name')}"
					required
					?disabled="${!canEditName}"
					prevent-submit>
				</d2l-input-text>
			</div>

		`;
	}

}
customElements.define('d2l-activity-quiz-editor-detail', QuizEditorDetail);
