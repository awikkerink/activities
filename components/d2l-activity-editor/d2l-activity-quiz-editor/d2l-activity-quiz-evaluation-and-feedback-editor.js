import '../d2l-activity-accordion-collapse.js';
import './d2l-activity-quiz-auto-set-graded-editor.js';
import './d2l-activity-quiz-auto-set-graded-summary.js';
import './d2l-activity-quiz-sync-gradebook-editor.js';
import './d2l-activity-quiz-sync-gradebook-summary.js';
import './d2l-activity-quiz-submission-views-container.js';
import './d2l-activity-quiz-submission-views-summary.js';
import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { css, html } from 'lit-element/lit-element.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizEvaluationAndFeedbackEditor extends ActivityEditorMixin(AsyncContainerMixin(LocalizeActivityQuizEditorMixin(SkeletonMixin(ActivityEditorDialogMixin(MobxLitElement))))) {

	static get properties() {
		return {
			activityUsageHref: { type: String }
		};
	}

	static get styles() {

		return [
			super.styles,
			labelStyles,
			accordionStyles,
			css`
				.d2l-label-text {
					display: inline;
				}
			`
		];
	}

	constructor() {
		super(store);
		this.checkoutOnLoad = true;
	}

	render() {
		return html`
			<d2l-activity-accordion-collapse
				?has-errors=${this._errorInAccordion()}
				?skeleton="${this.skeleton}">

				<span slot="header">
					${this.localize('hdrEvaluationAndFeedback')}
				</span>

				<li slot="summary-items">${this._renderAutoSetGradedSummary()}</li>
				<li slot="summary-items">${this._renderSyncGradebookSummary()}</li>
				<li slot="summary-items">${this._renderSubmissionViewsSummary()}</li>

				<div class="d2l-editor" slot="components">
					${this._renderAutomaticGradesEditor()}
				</div>
				<div class="d2l-editor" slot="components">
					${this._renderSyncGradebookEditor()}
				</div>
				<div class="d2l-editor" slot="components">
					${this._renderSubmissionView()}
				</div>
			</d2l-activity-accordion-collapse>
		`;
	}

	// Returns true if any error states relevant to this accordion are set
	_errorInAccordion() {
		return false; // Todo: implement error handling
	}

	_renderAutomaticGradesEditor() {
		return html`
			<d2l-activity-quiz-auto-set-graded-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-auto-set-graded-editor>
		`;
	}

	_renderAutoSetGradedSummary() {
		return html`
			<d2l-activity-quiz-auto-set-graded-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-auto-set-graded-summary>
		`;
	}

	_renderSubmissionView() {
		return html`
			<d2l-activity-quiz-submission-views-container
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-submission-views-container>
		`;
	}

	_renderSubmissionViewsSummary() {
		const entity = this.checkedOutHref && store.get(this.checkedOutHref);
		const submissionViewsHref = entity && entity.submissionViewsHref;
		if (!submissionViewsHref) return html``;
		return html`
			<d2l-activity-quiz-submission-views-summary
				href="${submissionViewsHref}"
				.token="${this.token}">
			</d2l-activity-quiz-submission-views-summary>
		`;
	}

	_renderSyncGradebookEditor() {
		return html`
			<d2l-activity-quiz-sync-gradebook-editor
				.quizHref="${this.href}"
				href="${this.activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-quiz-sync-gradebook-editor>
		`;
	}

	_renderSyncGradebookSummary() {
		return html`
			<d2l-activity-quiz-sync-gradebook-summary
				.quizHref="${this.href}"
				href="${this.activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-quiz-sync-gradebook-summary>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-evaluation-and-feedback-editor',
	ActivityQuizEvaluationAndFeedbackEditor
);
