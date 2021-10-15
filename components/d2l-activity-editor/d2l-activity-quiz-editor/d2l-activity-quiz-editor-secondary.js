import './d2l-activity-quiz-availability-editor.js';
import './d2l-activity-quiz-timing-and-display-editor.js';
import './d2l-activity-quiz-attempts-and-completion-editor.js';
import './d2l-activity-quiz-evaluation-and-feedback-editor.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from './state/quiz-store';

class QuizEditorSecondary extends ActivityEditorMixin(AsyncContainerMixin(SkeletonMixin(RtlMixin(LitElement)))) {

	static get properties() {
		return {
			activityUsageHref: { type: String, attribute: 'activity-usage-href' },
			isNew: { type: Boolean, attribute: 'isnew' }
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
			css`
				:host {
					background: var(--d2l-color-gypsum);
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:host > * {
					background: var(--d2l-color-white);
					border-radius: 8px;
					margin-bottom: 10px;
					padding: 20px;
					padding-top: 0;
				}
			`
		];
	}

	constructor() {
		super(store);
		this._debounceJobs = {};
		this.skeleton = true;
	}

	render() {
		const availabilityAccordion = html`
			<d2l-activity-quiz-availability-editor
				.activityUsageHref="${this.activityUsageHref}"
				.href="${this.href}"
				.token="${this.token}"
				?skeleton="${this.skeleton}">
			</d2l-activity-quiz-availability-editor>
		`;

		const timingAndDisplayAccordion = html`
			<d2l-activity-quiz-timing-and-display-editor
				.href="${this.href}"
				.token="${this.token}"
				?skeleton="${this.skeleton}">
			</d2l-activity-quiz-timing-and-display-editor>
		`;

		const attemptsAndCompletionAccordion = html`
			<d2l-activity-quiz-attempts-and-completion-editor
				.href="${this.href}"
				.token="${this.token}"
				?skeleton="${this.skeleton}">
			</d2l-activity-quiz-attempts-and-completion-editor>
		`;

		const evaluationAndFeedbackAccordion = html`
			<d2l-activity-quiz-evaluation-and-feedback-editor
				.href="${this.href}"
				.token="${this.token}"
				?skeleton="${this.skeleton}">
			</d2l-activity-quiz-evaluation-and-feedback-editor>
		`;

		return html`
			${availabilityAccordion}
			${timingAndDisplayAccordion}
			${attemptsAndCompletionAccordion}
			${evaluationAndFeedbackAccordion}
		`;

	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}

		if ((changedProperties.has('isNew')
			|| changedProperties.has('href')
			|| changedProperties.has('token')
			|| changedProperties.has('asyncState'))
			&& this.isNew && this.href && this.token && this.asyncState === asyncStates.complete) {

			store.get(this.href).setAutoSetGraded(true);
		}
	}
}
customElements.define('d2l-activity-quiz-editor-secondary', QuizEditorSecondary);
