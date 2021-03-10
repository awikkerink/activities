import '@brightspace-ui/core/components/dialog/dialog.js';
import './d2l-activity-quiz-retake-incorrect-only-editor.js';
import './d2l-activity-quiz-attempt-conditions-editor.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { sharedAttempts as store } from './state/quiz-store';

class ActivityQuizManageAttemptsEditor extends ActivityEditorMixin(ActivityEditorDialogMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {
	static get styles() {
		return [
			labelStyles,
			selectStyles,
			css`
				.d2l-input-select {
					margin-bottom: 1.5rem;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		return html`
			${this._renderDialogOpener()}
			${this._renderDialog()}
		`;
	}

	_renderAttemptConditionsEditor() {
		return html`
			<d2l-activity-quiz-attempt-conditions-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-attempt-conditions-editor>
		`;
	}

	_renderAttemptsAllowedOptions(options) {
		if (!options) return html``;
		if (!Array.isArray(options)) {
			return html`<option value=${options[0]} selected>${options[0]}</option>`;
		}
		return html`
			${options.map((option) => html`<option value=${option.value} ?selected=${option.selected}>${option.title}</option>`)}
		`;
	}

	_renderAttemptsSelectsEditor(entity) {
		const {
			attemptsAllowed,
			attemptsAllowedOptions,
			canUpdateAttemptsAllowed,
			canUpdateOverallGradeCalculation,
			overallGradeCalculationType,
			overallGradeCalculationOptions
		} = entity || {};

		return html`
			<div class="d2l-label-text">${this.localize('attemptsAllowed')}</div>
			<select
				class="d2l-input-select"
				?disabled =${!canUpdateAttemptsAllowed}
				@change=${this._setAttemptsAllowed}>
				${this._renderAttemptsAllowedOptions(attemptsAllowedOptions ? attemptsAllowedOptions : attemptsAllowed)}
			</select>
			<div class="d2l-label-text">${this.localize('overallGradeCalculation')}</div>
			<select
				class="d2l-input-select"
				?disabled =${!canUpdateOverallGradeCalculation}
				@change=${this._setOverallGradeCalculationType}>
				${this._renderOverallGradeCalculationOptions(overallGradeCalculationOptions ? overallGradeCalculationOptions : overallGradeCalculationType)}
			</select>
		`;
	}
	_renderDialog() {
		return html`
			<d2l-dialog
				id="quiz-manage-attempts-dialog"
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				title-text="${this.localize('subHdrAttemptsTools')}"
				width=850>
					${this._renderDialogContent()}
					<d2l-button slot="footer" primary data-dialog-action="ok">${this.localize('manageAttemptsDialogConfirmationText')}</d2l-button>
		 			<d2l-button slot="footer" data-dialog-action>${this.localize('manageAttemptsDialogCancelText')}</d2l-button>
			</d2l-dialog>
		`;
	}
	_renderDialogContent() {
		// TODO: replace consts with data fetched from attempts entity
		const entity = store.get(this.href);
		const { attemptsAllowed } = entity || {};
		const showRio = attemptsAllowed > 1;
		const showAttemptsConditions = attemptsAllowed > 1;

		return html `
			${this._renderAttemptsSelectsEditor(entity)}
			${showRio ? html`${this._renderRioEditor()}` : null}
			${showAttemptsConditions ? html `${this._renderAttemptConditionsEditor()}` : null}
		`;
	}
	_renderDialogOpener() {
		return html`
			<div id="manage-attempts-editor-label" class="d2l-label-text">
				${this.localize('subHdrAttemptsTools')}
			</div>
			<d2l-button-subtle
				text="${this.localize('manageAttempts')}"
				@click="${this.open}"
				h-align="text">
			</d2l-button-subtle>
		`;
	}
	_renderOverallGradeCalculationOptions(options) {
		if (!options) return html``;
		if (!Array.isArray(options)) {
			return html`<option value=${options.value} selected>${options.title}</option>`;
		}
		return html`
			${options.map((option) => html`<option value=${option.value} ?selected=${option.selected}>${option.title}</option>`)}
		`;
	}

	_renderRioEditor() {
		return html `
			<d2l-activity-quiz-retake-incorrect-only-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-retake-incorrect-only-editor>
		`;
	}

	_setAttemptsAllowed(e) {
		const entity = store.get(this.href);
		const data = e.target.value;
		entity && entity.setAttemptsAllowed(data);
	}

	_setOverallGradeCalculationType(e) {
		const entity = store.get(this.href);
		const data = e.target.value;
		entity && entity.setOverallGradeCalculationType(data);
	}
}

customElements.define(
	'd2l-activity-quiz-manage-attempts-editor',
	ActivityQuizManageAttemptsEditor
);
