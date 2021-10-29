import '../d2l-activity-text-editor.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { checkboxStyles } from '@brightspace-ui/core/components/inputs/input-checkbox';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { sharedSubmissionView as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsDialogCardEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			_outcomesTerm: { type: String }
		};
	}

	static get styles() {
		return [
			labelStyles,
			selectStyles,
			checkboxStyles,
			css`
				.d2l-activity-quiz-submission-views-dialog-card-editor > div {
					padding: 10px 0 20px;
				}
			`
		];
	}

	constructor() {
		super(store);
		this._debounceJobs = {};
	}

	connectedCallback() {
		super.connectedCallback();

		this._outcomesTerm = this._dispatchRequestProvider('d2l-provider-outcomes-term');
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) return html``;

		return this._renderEditView(entity);
	}

	_dispatchRequestProvider(key) {
		const event = new CustomEvent('d2l-request-provider', {
			detail: { key: key },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);
		return event.detail.provider;
	}

	_onShowAttemptScoreChange(e) {
		const view = store.get(this.href);
		view && view.setShowAttemptScore(e.target.checked);
	}

	_onShowStatsClassAverageChange(e) {
		const view = store.get(this.href);
		view && view.setShowStatsClassAverage(e.target.checked);
	}

	_onShowStatsScoreDistributionChange(e) {
		const view = store.get(this.href);
		view && view.setShowStatsScoreDistributionChange(e.target.checked);
	}

	_renderEditView(entity) {
		const {
			canUpdateShowAttemptScore,
			canUpdateMessage,
			showAttemptScore,
			canUpdateShowStatsClassAverage,
			showStatsClassAverage,
			canUpdateShowStatsScoreDistribution,
			showStatsScoreDistribution
		} = entity;

		return html`
			<div class="d2l-activity-quiz-submission-views-dialog-card-editor">
				<div>
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewMessageHeader')}
					</div>
				</div>

				<d2l-activity-text-editor
					htmlEditorType="inline"
					html-editor-height="2rem"
					html-editor-max-height="500"
					@d2l-activity-text-editor-change="${this._saveMessageOnChange}"
					?disabled="${!canUpdateMessage}">
				</d2l-activity-text-editor>

				<div>
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewGradeHeader')}
					</div>
					<d2l-input-checkbox
						?checked=${showAttemptScore}
						@change="${this._onShowAttemptScoreChange}"
						ariaLabel="${this.localize('submissionViewsDialogEditorGradeCheckbox')}"
						?disabled="${!canUpdateShowAttemptScore}">
						${this.localize('submissionViewsDialogEditorGradeCheckbox')}
					</d2l-input-checkbox>
				</div>
				<div>
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewQuestionsHeader')}
					</div>
					${this._renderHideShowQuestionsComponent(entity)}
				</div>
				<div>
					<div class="d2l-label-text">
						${this.localize('statistics')}
					</div>
					<d2l-input-checkbox
						?checked=${showStatsClassAverage}
						@change="${this._onShowStatsClassAverageChange}"
						ariaLabel="${this.localize('submissionViewsDialogEditorClassAverageCheckbox')}"
						?disabled="${!canUpdateShowStatsClassAverage}">
						${this.localize('submissionViewsDialogEditorClassAverageCheckbox')}
					</d2l-input-checkbox>
					<d2l-input-checkbox
						?checked=${showStatsScoreDistribution}
						@change="${this._onShowStatsScoreDistributionChange}"
						ariaLabel="${this.localize('submissionViewsDialogEditorGradeDistributionCheckbox')}"
						?disabled="${!canUpdateShowStatsScoreDistribution}">
						${this.localize('submissionViewsDialogEditorGradeDistributionCheckbox')}
					</d2l-input-checkbox>
				</div>
			</div>
		`;
	}

	_renderHideShowQuestionsComponent(entity) {
		const {
			canUpdateShowStandards,
			showStandards,
			isStandardsSupported
		} = entity;

		const lowerCaseOutcomesTerm = this._outcomesTerm && this._outcomesTerm.toLowerCase();

		return html`
			<i>Modifying Question options not yet implemented! (US132398)</i>
			${isStandardsSupported && lowerCaseOutcomesTerm ? html`
				<d2l-input-checkbox
					?checked=${showStandards}
					@change="${this._onShowStatsClassAverageChange}"
					ariaLabel="${this.localize('submissionViewsDialogEditorClassAverageCheckbox')}"
					?disabled="${!canUpdateShowStandards}">
					${this.localize('showOutcomesForTheDisplayedQuestionsCheckbox', 'outcomesTerm', lowerCaseOutcomesTerm)}
				</d2l-input-checkbox>
			` : html`` }
		`;
	}

	_saveMessage(value) {
		store.get(this.href).setMessage(value);
	}

	_saveMessageOnChange(e) {
		const { message } = store.get(this.href);
		const updatedMessage = e.detail.content;
		if (updatedMessage !== message) {
			this._saveMessage(updatedMessage);
		}
	}
}


customElements.define(
	'd2l-activity-quiz-submission-views-dialog-card-editor',
	ActivityQuizSubmissionViewsDialogCardEditor
);
