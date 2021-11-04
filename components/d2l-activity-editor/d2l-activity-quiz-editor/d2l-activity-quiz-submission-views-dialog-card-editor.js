import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { checkboxStyles } from '@brightspace-ui/core/components/inputs/input-checkbox';
import { Classes } from 'siren-sdk/src/hypermedia-constants';
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
				.d2l-submission-views-dialog-card-editor-questions-dropdown {
					margin-bottom: 20px;
				}
			`
		];
	}

	constructor() {
		super(store);
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

	_onQuestionsDropdownChange(e) {
		const view = store.get(this.href);

		if (e.target.value === Classes.quizzes.submissionView.hideShowQuestions.hideQuestions) {
			view && view.setHideQuestions();
			return;
		}

		view && view.setShowQuestions(e.target.value);
	}

	_onShowAttemptScoreChange(e) {
		const view = store.get(this.href);
		if (!view) return html``;
		view && view.setShowAttemptScore(e.target.checked);
	}

	_onShowCorrectAnswersChange(e) {
		const view = store.get(this.href);
		if (!view) return html``;
		view && view.setShowCorrectAnswers(e.target.checked);
	}

	_onShowLearnerResponsesChange(e) {
		const view = store.get(this.href);
		if (!view) return html``;
		view && view.setShowLearnerResponses(e.target.checked);
	}

	_onShowQuestionScoreChange(e) {
		const view = store.get(this.href);
		if (!view) return html``;
		view && view.setShowQuestionScore(e.target.checked);
	}

	_onShowStandardsChange(e) {
		const view = store.get(this.href);
		if (!view) return html``;
		view && view.setShowStandards(e.target.checked);
	}

	_onShowStatsClassAverageChange(e) {
		const view = store.get(this.href);
		if (!view) return html``;
		view && view.setShowStatsClassAverage(e.target.checked);
	}

	_onShowStatsScoreDistributionChange(e) {
		const view = store.get(this.href);
		if (!view) return html``;
		view && view.setShowStatsScoreDistribution(e.target.checked);
	}

	_renderEditView(entity) {
		const {
			canUpdateMessage,
			message,
			canUpdateShowAttemptScore,
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
					<textarea ?disabled="${!canUpdateMessage}">TEMPORARY - ${message}</textarea>
				</div>
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
			isStandardsSupported,
			canUpdateHideShowQuestions,
			hideQuestions,
			canUpdateShowCorrectAnswers,
			canUpdateShowLearnerResponses,
			canUpdateShowQuestions,
			canUpdateShowQuestionScore,
			showCorrectAnswers,
			showLearnerResponses,
			showQuestionScore,
			dialogQuestionsDropdownOptions
		} = entity;

		const lowerCaseOutcomesTerm = this._outcomesTerm && this._outcomesTerm.toLowerCase();
		const canEditQuestionsDropdown = canUpdateHideShowQuestions && canUpdateShowQuestions;

		return html`
			<div class="d2l-submission-views-dialog-card-editor-questions-dropdown">
				<select
					class="d2l-input-select d2l-block-select"
					@change="${this._onQuestionsDropdownChange}"
					?disabled="${!canEditQuestionsDropdown}">
					${dialogQuestionsDropdownOptions.map(option => html`
						<option value="${option.value}" ?selected="${option.selected}">${this.localize(option.langtermTitle)}</option>
					`)};
				</select>
			</div>
			${ hideQuestions ? html`` : html`
				<d2l-input-checkbox-spacer>
					<d2l-input-checkbox
						?checked=${showCorrectAnswers}
						@change="${this._onShowCorrectAnswersChange}"
						?disabled="${!canUpdateShowCorrectAnswers}">
						${this.localize('showCorrectAnswers')}
					</d2l-input-checkbox>
					<d2l-input-checkbox
						?checked=${showLearnerResponses}
						@change="${this._onShowLearnerResponsesChange}"
						?disabled="${!canUpdateShowLearnerResponses}">
						${this.localize('showLearnersResponses')}
					</d2l-input-checkbox>
					<d2l-input-checkbox
						?checked=${showQuestionScore}
						@change="${this._onShowQuestionScoreChange}"
						?disabled="${!canUpdateShowQuestionScore}">
						${this.localize('showLearnersGrade')}
					</d2l-input-checkbox>
					${isStandardsSupported && lowerCaseOutcomesTerm ? html`
						<d2l-input-checkbox
							?checked=${showStandards}
							@change="${this._onShowStandardsChange}"
							?disabled="${!canUpdateShowStandards}">
							${this.localize('showStandards')}
						</d2l-input-checkbox>
					` : html`` }
				</d2l-input-checkbox-spacer>
			`}
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-dialog-card-editor',
	ActivityQuizSubmissionViewsDialogCardEditor
);
