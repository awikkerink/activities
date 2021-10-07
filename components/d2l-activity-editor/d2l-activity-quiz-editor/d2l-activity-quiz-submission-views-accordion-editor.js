import '@brightspace-ui/core/components/colors/colors.js';
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
					padding: 0.5rem;
				}
				.d2l-activity-quiz-submission-views-accordion-editor-primary-container {
					padding-bottom: 10px;
				}
				#submission-view-editor {
					width: 100%;
					margin-bottom: 1rem;
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
					?disabled="${canEditDropdown}">
					${accordionDropdownOptions.map(option => html`
						<option value="${option.value}" ?selected="${option.selected}">${this.localize(option.langtermTitle)}</option>
					`)};
				</select>
			</div>
		`;
	}

	_onDropdownChange(e) {
		//e && e.target.value
		return e;
	}

	_onShowAttemptScoreChange(e) {
		//e && e.target.checked
		return e;
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
		// WIP
		let title = "title";
		if (view.isPrimaryView) {
			title = this.localize('primaryView');
		}
		return html`
			<div class="d2l-activity-quiz-submission-views-accordion-editor-tile">
				<div>
					<span class="d2l-label-text">${title}: </span>
					<span class="d2l-body-small"></span>
				</div>
		</div>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-accordion-editor',
	ActivityQuizSubmissionViewsAccordionEditor
);
