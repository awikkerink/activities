import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { css, html } from 'lit-element/lit-element.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { sharedSubmissionViews as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsDialogCard
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			css`
				:host {
					background-color: #ffffff;
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 6px;
					box-sizing: border-box;
					display: inline-block;
					padding: 10px;
					position: relative;
					transition: transform 300ms ease-out 50ms, box-shadow 0.2s;
					width: 100%;
					z-index: 0;
				}

				#custom_box1 {
					display: inline-block;
					padding-left: 0;
				}

				#custom_box2 {
					display: inline-block;
					padding-left: 20px;
				}

				#custom_box3 {
					display: inline-block;
					padding-left: 20px;
				}

				.d2l-label-text {
					font-size: 0.7rem;
					font-weight: 700;
					letter-spacing: 0.2px;
					line-height: 1rem;
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
		const { message, isPrimaryView, showAttemptScore, showQuestionsType, showLearnerResponses, showCorrectAnswers } = entity;

		const card_header = (isPrimaryView) ? 'primaryView' : 'additonalViewComesIntoEffect';
        const attempt_text = (showAttemptScore) ? 'submissionViewDialogCardAttemptScoreTrueText' : 'submissionViewDialogCardAttemptScoreFalseText';
        const question_text = (showQuestionsType) ? 'submissionViewDialogCardShowQuestionsTrueText' : 'submissionViewDialogCardShowQuestionsFalseText';
		const display_text = (showCorrectAnswers) ? 'submissionViewDialogCardShowAnswersTrueText': 'submissionViewDialogCardShowAnswersFalseText';
		const response_text = (showLearnerResponses) ? 'submissionViewDialogCardShowResponsesTrueText' : 'submissionViewDialogCardShowResponsesFalseText';

		return html`
			<b>${this.localize(card_header)}</b>
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
				<div>${this.localize(attempt_text)}</div>
			</div>
			<div>
				<div id="custom_box1">
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewQuestionsHeader')}
					</div>
					<div>${this.localize(question_text)}</div>
				</div>
				<div id="custom_box2">
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewAnswerHeader')}
					</div>
					<div>${this.localize(display_text)}</div>
				</div>
				<div id="custom_box3">
					<div class="d2l-label-text">
						${this.localize('submissionViewDialogCardSubmissionViewResponseHeader')}
					</div>
					<div>${this.localize(response_text)}</div>
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
