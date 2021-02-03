import './d2l-activity-quiz-manage-timing-editor.js';
import './d2l-activity-quiz-manage-timing-enforced-editor.js';
import './d2l-activity-quiz-manage-timing-recommended-editor.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles';
import { sharedTiming as store } from './state/quiz-store';

class ActivityQuizManageTimingEditor extends ActivityEditorMixin(ActivityEditorDialogMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {
	static get styles() {
		return [
			labelStyles,
			radioStyles,
			css`
				.d2l-timing-option-container {
					display: flex;
					flex-direction: row;
				}
				.d2l-input-radio-label {
					padding-right: 1rem;
				}
				.d2l-input-radio-label:last-of-type {
					margin-bottom: 0.9rem;
				}
			`,
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
			${this._renderDialog(entity)}
    	`;
	}

	_renderDialog(entity) {
		const {
			isTimingEnforced,
		} = entity || {};

		return html`
			<d2l-dialog
				id="quiz-manage-timing-dialog"
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				width=800
				title-text=${this.localize('subHdrTimingTools') }>
					${this._renderTimeEnforcementEditor(entity)}
					${this._renderQuizTimingEditor(isTimingEnforced)}
					<d2l-button slot="footer" primary data-dialog-action="ok">${this.localize('manageTimingDialogConfirmationText')}</d2l-button>
					<d2l-button slot="footer" data-dialog-action>${this.localize('manageTimingDialogCancelText')}</d2l-button>
			</d2l-dialog>
		`;
	}

	_renderDialogOpener() {
		return html`
			<div id="manage-timing-editor-label" class="d2l-label-text">${this.localize('subHdrTimingTools')}</div>
			<div class="placeholder-for-summarizer"></div>
			<d2l-button-subtle text=${this.localize('manageTiming')} @click="${this.open}" h-align="text"></d2l-button-subtle>
		`;
	}

	_renderQuizTimingEditor(isTimingEnforced) {
		return html`
			${isTimingEnforced ? html`
				<d2l-activity-quiz-manage-timing-enforced-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-quiz-manage-timing-enforced-editor>` : html`
				<d2l-activity-quiz-manage-timing-recommended-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-quiz-manage-timing-recommended-editor>`}
		`;
	}
	_renderTimeEnforcementEditor(entity) {
		const {
			canEditTiming,
			timingTypes
		} = entity || {};

		return canEditTiming ? html`
			<div class="d2l-timing-option-container">
				${timingTypes.map((type) => html`
				<label class="d2l-input-radio-label">
					<input
						type="radio"
						name="timeEnforcement"
						?checked=${type.selected}
						@change=${this._setTimingType}
						.value=${type.value} />
					${type.title}
				</label>`)}
			</div>` : null;
	}
	_setTimingType(e) {
		const entity = store.get(this.href);
		const data = e.target.value;
		entity && entity.setTimingType(data);
	}
}

customElements.define(
	'd2l-activity-quiz-manage-timing-editor',
	ActivityQuizManageTimingEditor
);
