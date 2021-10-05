import '@brightspace-ui/core/components/dialog/dialog.js';
import './d2l-activity-quiz-submission-views-editor.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorWorkingCopyDialogMixin } from '../mixins/d2l-activity-editor-working-copy-dialog-mixin';
import { checkboxStyles } from '../styles/checkbox-styles.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsContainer
	extends ActivityEditorWorkingCopyDialogMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			labelStyles,
			selectStyles,
			checkboxStyles,
			css`
				.d2l-label-text {
					padding-bottom: 10px;
				}

				.quiz-submission-views-open-dialog-button {
					margin-top: 5px;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		return html`
			${this._renderAccordionView()}
			${this._renderDialogOpener()}
			${this._renderDialog()}
		`;
	}

	_renderAccordionView() {
		return html`
			<div class="d2l-label-text">
				${this.localize('submissionViewHeading1')}
			</div>
			<d2l-input-checkbox
				?checked=""
				@change=""
				ariaLabel="${this.localize('submissionViewCheckboxLabel')}"
				?disabled="">
				${this.localize('submissionViewCheckboxLabel')}
			</d2l-input-checkbox>

			<div class="d2l-label-text">
				${this.localize('submissionViewHeading2')}
			</div>
			<div>
				<select
					id="submission-view-editor"
					class="d2l-input-select d2l-block-select"
					@change="">

					<option value="">API Placeholder 1</option>
					<option value="">API Placeholder 2</option>
				</select>
			</div>
		`;
	}

	_renderDialog() {
		const showSpinnerWhenLoading = true;
		const width = 900;
		return html`
			<d2l-dialog-fullscreen
				id="quiz-submission-views-editor"
				title-text=${this.localize('submissionViewButtonText')}
				?async="${showSpinnerWhenLoading}"
				?opened="${this.opened}"
				width="${width}"
				@d2l-dialog-close="${this.handleClose}">
				${this._renderDialogEditor()}
				<d2l-button slot="footer" primary @click="${this.handleClose}" ?disabled="${this.isSaving}">${this.localize('submissionViewsDialogConfirmationMain')}</d2l-button>
				<d2l-button slot="footer" data-dialog-action ?disabled="${this.isSaving}">${this.localize('submissionViewsDialogCancelMain')}</d2l-button>
			</d2l-dialog-fullscreen>
		`;
	}

	_renderDialogEditor() {
		const entity = store.get(this.dialogHref);
		if (!entity) return html``;

		const {
			submissionViewsHref
		} = entity || {};

		return html`
			<d2l-activity-quiz-submission-views-editor
				href="${submissionViewsHref}"
				.token="${this.token}">
			</d2l-activity-quiz-submission-views-editor>
		`;
	}

	_renderDialogOpener() {
		return html`
			<d2l-button-subtle
				class="quiz-submission-views-open-dialog-button"
				text=${this.localize('submissionViewButtonText')}
				@click="${this.openDialog}"
				h-align="text">
			</d2l-button-subtle>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-container',
	ActivityQuizSubmissionViewsContainer
);
