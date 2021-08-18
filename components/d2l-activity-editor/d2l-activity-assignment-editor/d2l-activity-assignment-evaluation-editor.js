import './d2l-activity-assignment-annotations-editor.js';
import './d2l-activity-assignment-annotations-summary.js';
import './d2l-activity-assignment-anonymous-marking-editor.js';
import './d2l-activity-assignment-anonymous-marking-summary.js';
import '../d2l-activity-evaluators/d2l-activity-evaluator-delegation-editor.js';
import '../d2l-activity-evaluators/d2l-activity-evaluator-delegation-summary.js';
import '../d2l-activity-competencies.js';
import '../d2l-activity-competencies-summary.js';
import '../d2l-activity-rubrics/d2l-activity-rubrics-list-wrapper.js';
import '../d2l-activity-rubrics/d2l-activity-rubrics-summary-wrapper.js';
import './d2l-assignment-turnitin-editor.js';
import './d2l-assignment-turnitin-summary.js';
import '../d2l-activity-accordion-collapse.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { shared as activityStore } from '../state/activity-store.js';
import { html } from 'lit-element/lit-element.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from './state/assignment-store.js';

class ActivityAssignmentEvaluationEditor extends SkeletonMixin(LocalizeActivityAssignmentEditorMixin(ActivityEditorMixin(MobxLitElement))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object },
			activityUsageHref: { type: String },
		};
	}

	static get styles() {

		return [
			super.styles,
			accordionStyles
		];
	}

	render() {
		const assignment = store.get(this.href) || {};
		const activity = activityStore.get(this.activityUsageHref) || {};

		return html`
			<d2l-activity-accordion-collapse ?skeleton="${this.skeleton}">
				<span slot="header">
					${this.localize('evaluationAndFeedback')}
				</span>
				${html`<li slot="summary-items">${this._renderRubricsSummary()}</li>`}
				${activity.canEditCompetencies ? html`<li slot="summary-items">${this._renderCompetenciesSummary()}</li>` : null}
				${html`<li slot="summary-items">${this._renderAnnotationsSummary()}</li>`}
				${html`<li slot="summary-items">${this._renderAnonymousMarkingSummary()}</li>`}
				${assignment.canEditTurnitin ? html`<li slot="summary-items">${this._renderTurnitinSummary()}</li>` : null}
				${html`<li slot="summary-items">${this._renderEvaluatorSummary()}</li>`}
				<span slot="components">
					${ html`${this._renderRubricsCollectionEditor()}`}
					${activity.canEditCompetencies ? this._renderCompetenciesOpener() : null}
					${html`${this._renderAnnotationsEditor()}`}
					${html`${this._renderAnonymousMarkingEditor()}`}
					${assignment.canEditTurnitin ? html`${this._renderTurnitinEditor()}` : null}
					${html`${this._renderEvaluatorEditor()}`}
				</span>
			</d2l-activity-accordion-collapse>
		`;
	}
	_renderAnnotationsEditor() {

		return html`
			<div class="d2l-editor">
				<d2l-activity-assignment-annotations-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-assignment-annotations-editor>
			</div>
		`;
	}
	_renderAnnotationsSummary() {

		return html`
			<d2l-activity-assignment-annotations-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-annotations-summary>
		`;
	}
	_renderAnonymousMarkingEditor() {

		return html`
			<div class="d2l-editor">
				<d2l-activity-assignment-anonymous-marking-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-assignment-anonymous-marking-editor>
			</div>
		`;
	}
	_renderAnonymousMarkingSummary() {

		return html`
			<d2l-activity-assignment-anonymous-marking-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-anonymous-marking-summary>
		`;
	}

	_renderCompetenciesOpener() {
		return html`
			<div class="d2l-editor">
				<d2l-activity-competencies
					.href="${this.activityUsageHref}"
					.token="${this.token}">
				</d2l-activity-competencies>
			</div>
		`;
	}
	_renderCompetenciesSummary() {
		return html`
			<d2l-activity-competencies-summary
				.href="${this.activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-competencies-summary>
		`;
	}
	_renderRubricsCollectionEditor() {
		return html`
			<div class="d2l-editor">
				<d2l-activity-rubrics-list-wrapper
					.href="${this.activityUsageHref}"
					.token="${this.token}"
					.assignmentHref="${this.href}">
				</d2l-activity-rubrics-list-wrapper>
			</div>
		`;
	}
	_renderRubricsSummary() {
		return html`
			<d2l-activity-rubrics-summary-wrapper
				.href="${this.activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-rubrics-summary-wrapper>
		`;
	}
	_renderTurnitinEditor() {
		return html`
			<div class="d2l-editor">
				<d2l-assignment-turnitin-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-assignment-turnitin-editor>
			</div>
		`;
	}

	_renderTurnitinSummary() {

		return html`
			<d2l-assignment-turnitin-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-assignment-turnitin-summary>
		`;
	}

	_renderEvaluatorSummary() {
		return html`
		<d2l-activity-evaluator-delegation-summary
			.href="${this.activityUsageHref}"
			.token="${this.token}">
		</d2l-activity-evaluator-delegation-summary>
		`;
	}

	_renderEvaluatorEditor() {
		return html`
			<d2l-activity-evaluator-delegation-editor
				.href="${this.activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-evaluator-delegation-editor>
		`;
	}

}
customElements.define(
	'd2l-activity-assignment-evaluation-editor',
	ActivityAssignmentEvaluationEditor
);
