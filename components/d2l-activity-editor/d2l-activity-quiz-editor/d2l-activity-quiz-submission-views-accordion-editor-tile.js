import './d2l-activity-quiz-submission-view-release-description';
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
import { sharedSubmissionView as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsAccordionEditorTile
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			bodySmallStyles,
			labelStyles,
			selectStyles,
			checkboxStyles,
			css`
				.d2l-activity-quiz-submission-views-accordion-editor-primary-dropdown-heading {
					padding-bottom: 10px;
				}

				.d2l-activity-quiz-submission-views-accordion-editor-tile {
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 6px;
					margin-bottom: 10px;
					padding: 10px 0.5rem 0.5rem;
					position: relative;
				}
				.d2l-activity-quiz-submission-views-accordion-editor-primary-container {
					padding-bottom: 10px;
				}

				.d2l-activity-quiz-submission-views-accordion-editor-remove-view-button {
					position: absolute;
					right: 0;
					top: 0;
				}

				:host([dir="rtl"]) .d2l-activity-quiz-submission-views-accordion-editor-remove-view-button {
					left: 0;
					right: initial;
				}

				.d2l-activity-quiz-submission-views-accordion-editor-tile-primary-dropdown {
					margin-bottom: 1rem;
					width: 100%;
				}

				.d2l-activiy-quiz-submission-views-accordion-editor-tile-heading {
					padding-bottom: 5px;
				}

				.d2l-activity-quiz-submission-views-accordion-editor-tile-release-description {
					padding-bottom: 5px;
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

		return entity.isPrimaryView ? this._renderPrimaryView(entity) : this._renderTile(entity);
	}

	_deleteView() {
		const entity = store.get(this.href);
		const promise = entity && entity.deleteSubmissionView();
		this.dispatchEvent(new CustomEvent('d2l-activity-quiz-submission-views-accordion-editor-tile-removed', {
			bubbles: true,
			composed: true
		}));
		this._dispatchEditorChangedEvent(promise);
	}

	_dispatchEditorChangedEvent(promise) {
		this.dispatchEvent(new CustomEvent('d2l-activity-quiz-submission-views-accordion-editor-changed', {
			bubbles: true,
			composed: true,
			detail: {
				promise
			}
		}));
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
					class="d2l-input-select d2l-block-select d2l-activity-quiz-submission-views-accordion-editor-tile-primary-dropdown"
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
		const promise = entity && entity.setShowQuestionsAndCorrectAnswers(e.target.value);
		this._dispatchEditorChangedEvent(promise);
	}

	_onShowAttemptScoreChange(e) {
		const entity = store.get(this.href);
		const promise = entity && entity.setShowAttemptScore(e.target.checked);
		this._dispatchEditorChangedEvent(promise);
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
				<d2l-input-checkbox
					?checked=${showAttemptScore}
					@change="${this._onShowAttemptScoreChange}"
					ariaLabel="${this.localize('submissionViewCheckboxLabel')}"
					?disabled="${!canUpdateShowAttemptScore}">
					${this.localize('submissionViewCheckboxLabel')}
				</d2l-input-checkbox>
				<div class="d2l-label-text d2l-activity-quiz-submission-views-accordion-editor-primary-dropdown-heading">
					${this.localize('submissionViewHeading2')}
				</div>
				${this._generateDropdown(view)}
			</div>
		`;
	}

	_renderTile(view) {
		const { isPrimaryView, canDeleteSubmissionView } = view;

		return html`
			<div class="d2l-activity-quiz-submission-views-accordion-editor-tile">
				${ canDeleteSubmissionView ? html`
					<d2l-button-icon
						class="d2l-activity-quiz-submission-views-accordion-editor-remove-view-button"
						text="${this.localize('deleteViewWithTitle', 'message', view.message)}"
						icon="tier1:close-small"
						@click="${this._deleteView}">
					</d2l-button-icon>
				` : html`` }
				<div>
					<div class="d2l-label-text d2l-activiy-quiz-submission-views-accordion-editor-tile-heading">${isPrimaryView ? this.localize('primaryView') : this.localize('additionalViewComesIntoEffect')}</div>
					${isPrimaryView ? html`` : html`
						<div class="d2l-body-small d2l-activity-quiz-submission-views-accordion-editor-tile-release-description">
							<d2l-activity-quiz-submission-view-release-description href=${this.href} .token="${this.token}"></d2l-activity-quiz-submission-view-release-description>
						</div>
					`}
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
	'd2l-activity-quiz-submission-views-accordion-editor-tile',
	ActivityQuizSubmissionViewsAccordionEditorTile
);
