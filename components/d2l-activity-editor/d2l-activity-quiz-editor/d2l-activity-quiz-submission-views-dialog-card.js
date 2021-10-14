import './d2l-activity-quiz-submission-views-dialog-card-editor.js';
import { css, html } from 'lit-element/lit-element.js';
import { heading4Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { shared as quizStore, sharedSubmissionViews as store } from './state/quiz-store';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

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
			_editHref: {
				type: String
			},
			_checkedOutHref: {
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

				.d2l-activity-quiz-submission-views-dialog-card-contents > div {
					padding: 10px 0 20px;
				}

				.d2l-heading-4 {
					margin: 0;
				}

				.d2l-activity-quiz-submission-views-dialog-card-header {
					background-color: var(--d2l-color-regolith);
					border-bottom: 1px solid var(--d2l-color-gypsum);
					padding: 5px 30px;
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
		return html`
			${this._editing ? this._renderEditView() : this._renderReadonlyView()}
		`;
	}

	async _onClickEdit() {
		const viewsEntity = store.get(this.href);
		const viewEntity = viewsEntity.getSubmissionViewByHref(this.viewHref);
		const viewId = viewEntity.viewId();

		const quizEntity = quizStore.get(this.quizHref);
		this._checkedOutHref = await quizEntity.checkout(quizStore, true);

		const checkedOutEntity = quizStore.get(this._checkedOutHref);
		const submissionViewsEntity = await store.fetch(checkedOutEntity.submissionViewsHref);

		const matchingEditView = submissionViewsEntity.submissionViews.find(view => view.viewId() === viewId);
		this._editHref = matchingEditView.href;

		this._editing = true;
	}

	_onCancel() {
		this._checkedOutHref = '';
		this._editHref = '';
		this._editing = false;
	}

	_renderCardHeader(entity) {
		const { isPrimaryView } = entity;
		const cardHeader = isPrimaryView ? 'primaryView' : 'additonalViewComesIntoEffect';
		return html`
			<div class="d2l-activity-quiz-submission-views-dialog-card-header">
				<div class="d2l-activity-quiz-submission-views-dialog-card-header-text d2l-heading-4">
					${this.localize(cardHeader)}
				</div>
			</div>
		`;
	}

	_renderEditView() {
		const checkedOutEntity = this._checkedOutHref && quizStore.get(this._checkedOutHref);

		const viewsHref = checkedOutEntity && checkedOutEntity.submissionViewsHref;
		const viewsEntity = viewsHref && store.get(viewsHref);

		const entity = viewsEntity && this._editHref && viewsEntity.getSubmissionViewByHref(this._editHref);
		if (!entity) return html``;

		return html`
			${this._renderCardHeader(entity)}
			<div class="d2l-activity-quiz-submission-views-dialog-card-contents">
				<d2l-activity-quiz-submission-views-dialog-card-editor
					href="${viewsHref}"
					.token="${this.token}"
					edit-href="${this._editHref}">
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

	_renderReadonlyView() {
		const viewsEntity = this.href && store.get(this.href);
		const entity = viewsEntity && this.viewHref && viewsEntity.getSubmissionViewByHref(this.viewHref);
		if (!entity) return html``;

		const { message, isPrimaryView, showAttemptScore, showQuestionsType, showLearnerResponses, showCorrectAnswers } = entity;

		const attemptText = showAttemptScore ? 'submissionViewDialogCardAttemptScoreTrueText' : 'submissionViewDialogCardAttemptScoreFalseText';
		const questionText = showQuestionsType ? 'submissionViewDialogCardShowQuestionsTrueText' : 'submissionViewDialogCardShowQuestionsFalseText';
		const answersText = showCorrectAnswers ? 'submissionViewDialogCardShowAnswersTrueText' : 'submissionViewDialogCardShowAnswersFalseText';
		const responseText = showLearnerResponses ? 'submissionViewDialogCardShowResponsesTrueText' : 'submissionViewDialogCardShowResponsesFalseText';

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
						?disabled="${this.isSaving}"
						@click="${this._onClickEdit}">
						${this.localize('submissionViewDialogCardButtonOptionEditView')}
					</d2l-button>
					${isPrimaryView ? html`` : html`
						<d2l-button-subtle
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
