import './d2l-activity-quiz-submission-views-dialog-card-editor.js';
import { css, html } from 'lit-element/lit-element.js';
import { heading4Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { shared as quizStore, sharedSubmissionView as store, sharedSubmissionViews as submissionViewsStore } from './state/quiz-store';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { Classes } from 'siren-sdk/src/hypermedia-constants';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityQuizSubmissionViewsDialogCard
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			dialogInEditState: {
				attribute: 'dialog-in-edit-state',
				reflect: true,
				type: Boolean
			},
			quizHref: {
				attribute: 'quiz-href',
				reflect: true,
				type: String
			},
			_editHref: {
				type: String
			},
			_editing: {
				type: Boolean
			}
		};
	}

	static get styles() {
		return [
			heading4Styles,
			labelStyles,
			css`
				.d2l-activity-quiz-submission-views-dialog-card {
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

				.d2l-activity-quiz-submission-views-dialog-card-contents > div {
					padding: 10px 0 20px;
				}

				.d2l-activity-quiz-submission-views-dialog-card-header-text {
					margin: 0;
				}

				.d2l-activity-quiz-submission-views-dialog-card-header {
					background-color: var(--d2l-color-regolith);
					border-bottom: 1px solid var(--d2l-color-gypsum);
					padding: 7px 30px;
				}

				.d2l-activity-quiz-submission-views-dialog-card-contents {
					padding: 20px 30px;
				}

				.d2l-activity-quiz-submission-views-dialog-card-contents .d2l-activity-quiz-submission-views-dialog-card-footer-buttons {
					padding: 10px 0 0;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const href = this._editing ? this._editHref : this.href;
		const entity = store.get(href);
		if (!entity) return html``;

		return html`
			<div class="d2l-activity-quiz-submission-views-dialog-card">
				${this._editing ? this._renderEditView(entity) : this._renderReadonlyView(entity)}
			</div>
		`;
	}

	_onCancel() {
		this._editHref = '';
		this._editing = false;

		this.dispatchEvent(new CustomEvent('d2l-activity-quiz-submission-views-dialog-edit-end', {
			bubbles: true,
			composed: true
		}));
	}

	async _onClickEdit() {
		this.dispatchEvent(new CustomEvent('d2l-activity-quiz-submission-views-dialog-edit-start', {
			bubbles: true,
			composed: true
		}));

		const viewEntity = store.get(this.href);
		const viewId = viewEntity.viewId();

		const quizEntity = quizStore.get(this.quizHref);
		const checkedOutHref = await quizEntity.checkout(quizStore, true);

		const checkedOutEntity = quizStore.get(checkedOutHref);
		const submissionViewsEntity = await submissionViewsStore.fetch(checkedOutEntity.submissionViewsHref);

		const matchingEditView = submissionViewsEntity.linkedSubmissionViews.find(view => view.viewId() === viewId);
		this._editHref = matchingEditView.href;
		await store.fetch(this._editHref);

		this._editing = true;
	}

	_renderCardHeader(entity) {
		const { isPrimaryView } = entity;
		const cardHeader = isPrimaryView ? 'primaryView' : 'additionalViewComesIntoEffect';
		return html`
			<div class="d2l-activity-quiz-submission-views-dialog-card-header">
				<div class="d2l-activity-quiz-submission-views-dialog-card-header-text d2l-heading-4">
					${this.localize(cardHeader)}
				</div>
			</div>
		`;
	}

	_renderEditView(entity) {
		return html`
			${this._renderCardHeader(entity)}
			<div class="d2l-activity-quiz-submission-views-dialog-card-contents">
				<d2l-activity-quiz-submission-views-dialog-card-editor
					href="${this._editHref}"
					.token="${this.token}">
				</d2l-activity-quiz-submission-views-dialog-card-editor>
				<div class="d2l-activity-quiz-submission-views-dialog-card-footer-buttons">
					<d2l-button ?disabled="${this.isSaving}">
						${this.localize('quizSubmissionViewsDialogCardUpdate')}
					</d2l-button>
					<d2l-button-subtle
						text=${this.localize('quizSubmissionViewsDialogCardCancel')}
						@click="${this._onCancel}">
					</d2l-button-subtle>
				</div>
			</div>
		`;
	}

	_renderReadonlyView(entity) {
		const { message, isPrimaryView, hideQuestions, showAttemptScore, showQuestionsType, showLearnerResponses, showCorrectAnswers } = entity;

		const attemptText = showAttemptScore ? 'submissionViewDialogCardAttemptScoreTrueText' : 'submissionViewDialogCardAttemptScoreFalseText';
		let questionText = 'submissionViewDialogCardQuestionsNotDisplayed';
		if (!hideQuestions) {
			switch (showQuestionsType) {
				case Classes.quizzes.submissionView.showQuestions.allQuestions:
					questionText = 'submissionViewDialogCardQuestionsAllDisplayed';
					break;
				case Classes.quizzes.submissionView.showQuestions.incorrectQuestions:
					questionText = 'submissionViewDialogCardQuestionsIncorrectOnlyDisplayed';
					break;
				case Classes.quizzes.submissionView.showQuestions.correctQuestions:
					questionText = 'submissionViewDialogCardQuestionsCorrectOnlyDisplayed';
					break;
			}
		}
		const answersText = showCorrectAnswers ? 'submissionViewDialogCardShowAnswersTrueText' : 'submissionViewDialogCardShowAnswersFalseText';
		const responseText = showLearnerResponses ? 'submissionViewDialogCardShowResponsesTrueText' : 'submissionViewDialogCardShowResponsesFalseText';

		const disableReadonlyButtons = this.dialogInEditState;

		return html`
			${this._renderCardHeader(entity)}
			<div class="d2l-activity-quiz-submission-views-dialog-card-contents">
				${message ? html`
					<div>
						<div class="d2l-label-text
						d2l-activity-quiz-submission-views-dialog-card-message-header">
							${this.localize('submissionViewDialogCardSubmissionViewMessageHeader')}
						</div>
						<div>${message}</div>
					</div>
					` : html``}
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
				<div class="d2l-activity-quiz-submission-views-dialog-card-footer-buttons">
					<d2l-button
						?disabled="${disableReadonlyButtons}"
						@click="${this._onClickEdit}">
						${this.localize('submissionViewDialogCardButtonOptionEditView')}
					</d2l-button>
					${isPrimaryView ? html`` : html`
						<d2l-button-subtle
							?disabled="${disableReadonlyButtons}"
							text=${this.localize('submissionViewDialogCardButtonOptionDeleteView')}>
						</d2l-button-subtle>
					`}
				</div>
			</div>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-dialog-card',
	ActivityQuizSubmissionViewsDialogCard
);
