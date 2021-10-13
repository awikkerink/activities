import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { checkboxStyles } from '@brightspace-ui/core/components/inputs/input-checkbox';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { sharedSubmissionViews as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsDialogCard
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			quizHref: {
				attribute: 'quiz-href',
				reflect: true,
				type: String
			},
			viewHref: {
				attribute: 'view-href',
				reflect: true,
				type: String
			},
			_editing: {
				type: Boolean
			}
		};
	}

	static get styles() {
		return [
			labelStyles,
			selectStyles,
			checkboxStyles,
			css`
				:host {
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 6px;
					display: inline-block;
					padding: 10px;
					width: 100%;
				}

				.d2l-activity-quiz-submission-views-dialog-card-readonly-view-field {
					display: inline-block;
					padding-right: 20px;
				}

				:host([dir="rtl"]) .d2l-activity-quiz-submission-views-dialog-card-readonly-view-field {
					padding-left: 20px;
					padding-right: 0;
				}

				.d2l-label-text {
					padding-top: 15px;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const viewsEntity = store.get(this.href);
		if (!viewsEntity || !this.viewHref) return html``;

		const entity = viewsEntity.getSubmissionViewByHref(this.viewHref);
		if (!entity) return html``;

		return html`
			${this._editing ? this._renderEditView(entity) : this._renderReadonlyView(entity)}
		`;
	}

	_onClickEdit() {
		this._editing = true;
	}

	_onCancel() {}

	_onShowAttemptScoreChange(e) {
		const viewsEntity = store.get(this.href);
		const view = viewsEntity && viewsEntity.getSubmissionViewByHref(this.viewHref);
		view && view.setShowAttemptScore(e.target.checked);
	}

	_onShowStatsClassAverageChange(e) {
		const viewsEntity = store.get(this.href);
		const view = viewsEntity && viewsEntity.getSubmissionViewByHref(this.viewHref);
		view && view.setShowStatsClassAverage(e.target.checked);
	}

	_onShowStatsScoreDistributionChange(e) {
		const viewsEntity = store.get(this.href);
		const view = viewsEntity && viewsEntity.getSubmissionViewByHref(this.viewHref);
		view && view.setShowStatsScoreDistributionChange(e.target.checked);
	}

	_renderEditView(entity) {
		const {
			canUpdateMessage,
			message,
			isMessageRichtext,
			canUpdateShowAttemptScore,
			showAttemptScore,
			canUpdateShowStatsClassAverage,
			showStatsClassAverage,
			canUpdateShowStatsScoreDistribution,
			showStatsScoreDistribution
		} = entity;
		return html`
			<div>
				<div>
					<div class="d2l-label-text">${this.localize('submissionViewDialogCardSubmissionViewMessageHeader')}</div>
					<i>html-editor or text editor goes here!</i>
				</div>
				<div>
				<div class="d2l-label-text">${this.localize('submissionViewDialogCardSubmissionViewGradeHeader')}</div>
					<d2l-input-checkbox
						?checked=${showAttemptScore}
						@change="${this._onShowAttemptScoreChange}"
						ariaLabel="${this.localize('submissionViewsDialogEditorGradeCheckbox')}"
						?disabled="${!canUpdateShowAttemptScore}">
						${this.localize('submissionViewsDialogEditorGradeCheckbox')}
					</d2l-input-checkbox>
				</div>
				<div class="d2l-label-text">${this.localize('submissionViewDialogCardSubmissionViewQuestionsHeader')}</div>
					<i>Modifying Question options not yet implemented! (US132398)</i>
				</div>
				<div class="d2l-label-text">${this.localize('statistics')}</div>
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
			<d2l-button ?disabled="${this.isSaving}" @click="${this._onCancel}">
				${this.localize('quizSubmissionViewsDialogCardUpdate')}
			</d2l-button>
			<d2l-button-subtle
				text=${this.localize('quizSubmissionViewsDialogCardCancel')}>
			</d2l-button-subtle>
		`;
	}

	_renderReadonlyView(entity) {
		const { message, isPrimaryView, showAttemptScore, showQuestionsType, showLearnerResponses, showCorrectAnswers } = entity;

		const cardHeader = isPrimaryView ? 'primaryView' : 'additonalViewComesIntoEffect';
		const attemptText = showAttemptScore ? 'submissionViewDialogCardAttemptScoreTrueText' : 'submissionViewDialogCardAttemptScoreFalseText';
		const questionText = showQuestionsType ? 'submissionViewDialogCardShowQuestionsTrueText' : 'submissionViewDialogCardShowQuestionsFalseText';
		const answersText = showCorrectAnswers ? 'submissionViewDialogCardShowAnswersTrueText' : 'submissionViewDialogCardShowAnswersFalseText';
		const responseText = showLearnerResponses ? 'submissionViewDialogCardShowResponsesTrueText' : 'submissionViewDialogCardShowResponsesFalseText';

		return html`
			<b>${this.localize(cardHeader)}</b>
			<div>
				<div class="d2l-label-text">
					${this.localize('submissionViewDialogCardSubmissionViewMessageHeader')}
				</div>
				<div>${message}</div>
			</div>
			<div>
				<div class="d2l-label-text">
					${this.localize('submissionViewDialogCardSubmissionViewGradeHeader')}
				</div>
				<div>${this.localize(attemptText)}</div>
			</div>
			<div>
				<div class="d2l-activity-quiz-submission-views-dialog-card-readonly-view-field">
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewQuestionsHeader')}
					</div>
					<div>${this.localize(questionText)}</div>
				</div>
				<div class="d2l-activity-quiz-submission-views-dialog-card-readonly-view-field">
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewAnswerHeader')}
					</div>
					<div>${this.localize(answersText)}</div>
				</div>
				<div class="d2l-activity-quiz-submission-views-dialog-card-readonly-view-field">
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewResponseHeader')}
					</div>
					<div>${this.localize(responseText)}</div>
				</div>
			</div>
			<d2l-button ?disabled="${this.isSaving}" @click="${this._onClickEdit}">
				${this.localize('submissionViewDialogCardButtonOptionEditView')}
			</d2l-button>
			${isPrimaryView ? html`` : html`
				<d2l-button-subtle
					text=${this.localize('submissionViewDialogCardButtonOptionDeleteView')}>
				</d2l-button-subtle>
			`}
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-dialog-card',
	ActivityQuizSubmissionViewsDialogCard
);
