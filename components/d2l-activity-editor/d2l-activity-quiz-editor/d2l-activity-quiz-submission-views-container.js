import '@brightspace-ui/core/components/dialog/dialog.js';
import './d2l-activity-quiz-submission-views-dialog.js';
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
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
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
			
			<div>
				<d2l-button-subtle
					text=${this.localize('submissionViewButtonText')}
					@click="${this.open}" 
					h-align="text">
				</d2l-button-subtle>
			</div> 
			${this._renderDialog()}
		`;
	}

	_renderDialog() {
		return html`
			<d2l-dialog-fullscreen
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				id="quiz-submission-views-dialog"
				title-text=${this.localize('submissionViewButtonText')}>

				<d2l-activity-quiz-submission-views-dialog
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-quiz-submission-views-dialog>

				<d2l-button slot="footer" primary @click="${this.handleClose}" ?disabled="${this.isSaving}">${this.localize('submissionViewsDialogConfirmationMain')}</d2l-button>
				<d2l-button slot="footer" data-dialog-action ?disabled="${this.isSaving}">${this.localize('submissionViewsDialogCancelMain')}</d2l-button>
			</d2l-dialog-fullscreen>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-container',
	ActivityQuizSubmissionViewsContainer
);
