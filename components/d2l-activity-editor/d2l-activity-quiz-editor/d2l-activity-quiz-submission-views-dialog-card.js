import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { sharedSubmissionViews as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsDialogCard
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			viewHref: {
				attribute: 'view-href',
				reflect: true,
				type: String
			}
		};
	}

	static get styles() {
		return [
			labelStyles,
			css`
				:host {
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 6px;
					display: inline-block;
					overflow: hidden;
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
					padding-top: 30px;
				}

				.d2l-activity-quiz-submission-views-dialog-card-header {
					background-color: var(--d2l-color-regolith);
					border-bottom: 1px solid var(--d2l-color-gypsum);
					padding: 5px 30px 5px 30px;
				}

				.d2l-activity-quiz-submission-views-dialog-card-contents {
					padding: 10px 30px 10px 30px;
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

		return this._renderReadonlyView(entity);
	}

	_renderReadonlyView(entity) {
		const { message, isPrimaryView, showAttemptScore, showQuestionsType, showLearnerResponses, showCorrectAnswers } = entity;

		const cardHeader = isPrimaryView ? 'primaryView' : 'additonalViewComesIntoEffect';
		const attemptText = showAttemptScore ? 'submissionViewDialogCardAttemptScoreTrueText' : 'submissionViewDialogCardAttemptScoreFalseText';
		const questionText = showQuestionsType ? 'submissionViewDialogCardShowQuestionsTrueText' : 'submissionViewDialogCardShowQuestionsFalseText';
		const answersText = showCorrectAnswers ? 'submissionViewDialogCardShowAnswersTrueText' : 'submissionViewDialogCardShowAnswersFalseText';
		const responseText = showLearnerResponses ? 'submissionViewDialogCardShowResponsesTrueText' : 'submissionViewDialogCardShowResponsesFalseText';

		return html`
			<div class="d2l-activity-quiz-submission-views-dialog-card-header">
				<b style="font-size: 80%;">${this.localize(cardHeader)}</b>
			</div>
			<div class="d2l-activity-quiz-submission-views-dialog-card-contents">
				<div>
					<div class="d2l-label-text" style="padding-top: 20px;">
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
				<d2l-button style="padding: 20px 0 20px 0;" ?disabled="${this.isSaving}">
					${this.localize('submissionViewDialogCardButtonOptionEditView')}
				</d2l-button>
				${isPrimaryView ? html`` : html`
					<d2l-button-subtle
						text=${this.localize('submissionViewDialogCardButtonOptionDeleteView')}>
					</d2l-button-subtle>
				`}
			</div>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-dialog-card',
	ActivityQuizSubmissionViewsDialogCard
);
