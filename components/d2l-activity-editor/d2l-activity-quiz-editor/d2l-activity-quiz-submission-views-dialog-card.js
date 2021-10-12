import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { css, html } from 'lit-element/lit-element.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { sharedSubmissionViews as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsDialogCard
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			labelStyles,
			css`
				:host {
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 6px;
					display: inline-block;
					padding: 10px;
					width: 100%;
				}

				#questions-answers-response-box {
					display: inline-block;
					padding-left: 0;
					padding-right: 20px;
				}

				:host([dir="rtl"]) #questions-answers-response-box {
					padding-left: 20px;
					padding-right: 0;
				}

				.d2l-label-text {
					padding-top: 15px;
				}
			`
		];
	}

	static get properties() {
		return {
			viewHref: {
				attribute: 'view-href',
				reflect: true,
				type: String
			  }
		};
	}

	constructor() {
		super(store);
	}

	render() {
		const viewsEntity = store.get(this.href);
		if (!viewsEntity || !this.viewHref) {
			return html``;
		}

		const entity = viewsEntity.getSubmissionViewByHref(this.viewHref);
		const { isPrimaryView, showAttemptScore, showQuestionsType, showLearnerResponses, showCorrectAnswers } = entity;

		const cardHeader = isPrimaryView ? 'primaryView' : 'additonalViewComesIntoEffect';
        const attemptText = showAttemptScore ? 'submissionViewDialogCardAttemptScoreTrueText' : 'submissionViewDialogCardAttemptScoreFalseText';
        const questionText = showQuestionsType ? 'submissionViewDialogCardShowQuestionsTrueText' : 'submissionViewDialogCardShowQuestionsFalseText';
		const answersText = showCorrectAnswers ? 'submissionViewDialogCardShowAnswersTrueText': 'submissionViewDialogCardShowAnswersFalseText';
		const responseText = showLearnerResponses ? 'submissionViewDialogCardShowResponsesTrueText' : 'submissionViewDialogCardShowResponsesFalseText';

		const hardcodedMessage = "Your Quiz has been submitted Successfully.";

		return html`
			<b>${this.localize(cardHeader)}</b>
			<div>
				<div class="d2l-label-text">
					${this.localize('submissionViewDialogCardSubmissionViewMessageHeader')}
				</div>
				<div>${hardcodedMessage}</div>
			</div>
			<div>
				<div class="d2l-label-text">
					${this.localize('submissionViewDialogCardSubmissionViewGradeHeader')}
				</div>
				<div>${this.localize(attemptText)}</div>
			</div>
			<div>
				<div id="questions-answers-response-box">
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewQuestionsHeader')}
					</div>
					<div>${this.localize(questionText)}</div>
				</div>
				<div id="questions-answers-response-box">
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewAnswerHeader')}
					</div>
					<div>${this.localize(answersText)}</div>
				</div>
				<div id="questions-answers-response-box">
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewResponseHeader')}
					</div>
					<div>${this.localize(responseText)}</div>
				</div>
			</div>
			<d2l-button ?disabled="${this.isSaving}">${this.localize('submissionViewDialogCardButtonOptionEditView')}</d2l-button>
			<d2l-button-subtle
				class="d2l-quiz-submission-views-open-dialog-button"
				text=${this.localize('submissionViewDialogCardButtonOptionDeleteView')}>
			</d2l-button-subtle>
        `
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-dialog-card',
	ActivityQuizSubmissionViewsDialogCard
);
