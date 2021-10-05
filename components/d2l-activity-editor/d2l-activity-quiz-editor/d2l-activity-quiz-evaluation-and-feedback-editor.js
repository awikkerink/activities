import '../d2l-activity-accordion-collapse.js';
import './d2l-activity-quiz-auto-set-graded-editor.js';
import './d2l-activity-quiz-auto-set-graded-summary.js';
import './d2l-activity-quiz-submission-views-container.js';
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

class ActivityQuizEvaluationAndFeedbackEditor extends AsyncContainerMixin(LocalizeActivityQuizEditorMixin(SkeletonMixin(ActivityEditorMixin(ActivityEditorDialogMixin(MobxLitElement))))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object },
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

				<div class="d2l-editor" slot="components">
					${this._renderAutomaticGradesEditor()}
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
}

customElements.define(
	'd2l-activity-quiz-evaluation-and-feedback-editor',
	ActivityQuizEvaluationAndFeedbackEditor
);
