import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { checkboxStyles } from '../styles/checkbox-styles.js';
import { Classes } from 'siren-sdk/src/hypermedia-constants';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { sharedSubmissionViews as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsAccordionEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			bodySmallStyles,
			labelStyles,
			selectStyles,
			checkboxStyles,
			css`
				.d2l-label-text {
					padding-bottom: 10px;
				}

				.d2l-activity-quiz-submission-views-accordion-editor-tile {
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 6px;
					margin-bottom: 10px;
					padding: 7px 0.5rem 0.5rem;
					position: relative;
				}

				.d2l-activity-quiz-submission-views-accordion-editor-primary-container {
					padding-bottom: 10px;
				}

				#submission-view-editor {
					margin-bottom: 1rem;
					width: 100%;
				}

				.d2l-activity-quiz-submission-views-accordion-editor-remove-view-button {
					position: absolute;
					right: 0;
					top: 0;
				}

				:host([dir="rtl"]) .d2l-activity-quiz-submission-views-accordion-editor-remove-view-button {
					right: initial;
					left: 0;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) return html``;

		const submissionViews = entity.submissionViews;
		if (!submissionViews) return html``;

		return html`
			${submissionViews.map(view => html`${this._renderSubmissionView(view)}`)}
		`;

	}

	async _deleteView(e) {
		const viewHref = e.target.dataset.key;
		const viewsEntity = store.get(this.href);
		const entity = viewsEntity && viewsEntity.getSubmissionViewByHref(viewHref);
		entity && entity.deleteSubmissionView();

		// Optimistic UI - Remove view from collection
		viewsEntity.removeView(viewHref);
	}

	_generateDropdown(view) {
		const {
			canUpdateHideShowQuestions,
			canUpdateShowQuestions,
			canUpdateShowCorrectAnswers,
			accordionDropdownOptions
		} = view;

		const canEditDropdown = canUpdateHideShowQuestions && canUpdateShowQuestions && canUpdateShowCorrectAnswers;

		return html`
			<div>
				<select
					id="submission-view-editor"
					class="d2l-input-select d2l-block-select"
					@change="${this._onDropdownChange}"
					?disabled="${!canEditDropdown}">
					${accordionDropdownOptions.map(option => html`
						<option value="${option.value}" ?selected="${option.selected}">${this.localize(option.langtermTitle)}</option>
					`)};
				</select>
			</div>
		`;
	}

	_onDropdownChange(e) {
		const entity = store.get(this.href);
		const primaryView = entity && entity.getPrimarySubmissionView();
		primaryView && primaryView.setShowQuestionsAndCorrectAnswers(e.target.value);
	}

	_onShowAttemptScoreChange(e) {
		const entity = store.get(this.href);
		const primaryView = entity && entity.getPrimarySubmissionView();
		primaryView && primaryView.setShowAttemptScore(e.target.checked);
	}

	_renderPrimaryView(view) {
		if (view.showQuestionsType === Classes.quizzes.submissionView.showQuestions.correctQuestions) {
			return this._renderTile(view);
		}

		const {
			canUpdateShowAttemptScore,
			showAttemptScore
		} = view;

		return html`
			<div class="d2l-activity-quiz-submission-views-accordion-editor-primary-container">
				<div class="d2l-label-text">
					${this.localize('submissionViewHeading1')}
				</div>
				<d2l-input-checkbox
					?checked=${showAttemptScore}
					@change="${this._onShowAttemptScoreChange}"
					ariaLabel="${this.localize('submissionViewCheckboxLabel')}"
					?disabled="${!canUpdateShowAttemptScore}">
					${this.localize('submissionViewCheckboxLabel')}
				</d2l-input-checkbox>
				<div class="d2l-label-text">
					${this.localize('submissionViewHeading2')}
				</div>
				${this._generateDropdown(view)}
			</div>
		`;
	}

	_renderSubmissionView(view) {
		return view.isPrimaryView ? this._renderPrimaryView(view) : this._renderTile(view);
	}

	_renderTile(view) {
		const { isPrimaryView, canDeleteSubmissionView } = view;
		const title = isPrimaryView ? this.localize('primaryView') : this.localize('additonalViewComesIntoEffect');

		return html`
			<div class="d2l-activity-quiz-submission-views-accordion-editor-tile">
				${ canDeleteSubmissionView ? html`
					<d2l-button-icon
						class="d2l-activity-quiz-submission-views-accordion-editor-remove-view-button"
						text="${this.localize('deleteViewWithTitle', 'message', view.message)}"
						icon="tier1:close-small"
						data-key="${view.href}"
						@click="${this._deleteView}">
					</d2l-button-icon>
				` : html`` }
				<div>
					<span class="d2l-label-text">${title}: </span>
					${isPrimaryView ? html`` : html`<div class="d2l-body-small"></div>`}
					<div class="d2l-body-small">${this._tileDescription(view)}</div>
				</div>
			</div>
		`;
	}

	_tileDescription(view) {
		function _noQuestionsTileDescription(view) {
			return view.showAttemptScore ? 'gradeVisibleNoQuestions' : 'noQuestions';
		}

		function _allQuestionsTileDescription(view) {
			if (view.showAttemptScore && view.showLearnerResponses) {
				return view.showCorrectAnswers ? 'gradeVisibleAllQuestionsWithCorrectAnswersLearnersResponses' : 'gradeVisibleAllQuestionsLearnersResponses';
			} else if (view.showAttemptScore) {
				return view.showCorrectAnswers ? 'gradeVisibleAllQuestionsWithCorrectAnswers' : 'gradeVisibleAllQuestions';
			} else if (view.showLearnerResponses) {
				return view.showCorrectAnswers ? 'allQuestionsWithCorrectAnswersLearnersResponses' : 'allQuestionsLearnersResponses';
			} else {
				return view.showCorrectAnswers ? 'allQuestionsWithCorrectAnswers' : 'allQuestions';
			}
		}

		function _incorrectQuestionsTileDescription(view) {
			if (view.showAttemptScore && view.showLearnerResponses) {
				return view.showCorrectAnswers ? 'gradeVisibleIncorrectQuestionsWithCorrectAnswersLearnersResponses' : 'gradeVisibleIncorrectQuestionsLearnersResponses';
			} else if (view.showAttemptScore) {
				return view.showCorrectAnswers ? 'gradeVisibleIncorrectQuestionsWithCorrectAnswers' : 'gradeVisibleIncorrectQuestions';
			} else if (view.showLearnerResponses) {
				return view.showCorrectAnswers ? 'incorrectQuestionsWithCorrectAnswersLearnersResponses' : 'incorrectQuestionsLearnersResponses';
			} else {
				return view.showCorrectAnswers ? 'incorrectQuestionsWithCorrectAnswers' : 'incorrectQuestions';
			}
		}

		function _correctQuestionsTileDescription(view) {
			if (view.showAttemptScore && view.showLearnerResponses) {
				return view.showCorrectAnswers ? 'gradeVisibleCorrectQuestionsWithCorrectAnswersLearnersResponses' : 'gradeVisibleCorrectQuestionsLearnersResponses';
			} else if (view.showAttemptScore) {
				return view.showCorrectAnswers ? 'gradeVisibleCorrectQuestionsWithCorrectAnswers' : 'gradeVisibleCorrectQuestions';
			} else if (view.showLearnerResponses) {
				return view.showCorrectAnswers ? 'correctQuestionsWithCorrectAnswersLearnersResponses' : 'correctQuestionsLearnersResponses';
			} else {
				return view.showCorrectAnswers ? 'correctQuestionsWithCorrectAnswers' : 'correctQuestions';
			}
		}

		if (view.hideQuestions) {
			return this.localize(_noQuestionsTileDescription(view));
		} else if (view.showQuestionsType === Classes.quizzes.submissionView.showQuestions.allQuestions) {
			return this.localize(_allQuestionsTileDescription(view));
		} else if (view.showQuestionsType === Classes.quizzes.submissionView.showQuestions.incorrectQuestions) {
			return this.localize(_incorrectQuestionsTileDescription(view));
		} else if (view.showQuestionsType === Classes.quizzes.submissionView.showQuestions.correctQuestions) {
			return this.localize(_correctQuestionsTileDescription(view));
		}
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-accordion-editor',
	ActivityQuizSubmissionViewsAccordionEditor
);
