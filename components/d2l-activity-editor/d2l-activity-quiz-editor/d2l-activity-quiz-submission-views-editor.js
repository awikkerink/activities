import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin.js';
import { html } from 'lit-element/lit-element.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsEditor
	extends ActivityEditorDialogMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	render() {
		return html`
			<label> ${this.localize('submissionViewHeading1')} </label>
			<d2l-button-icon
				icon="tier1:help"
				@click="${this.open}">
			</d2l-button-icon>
			${this._renderHelpDialog()}
		`;
	}

	_renderHelpDialog() {
		const showSpinnerWhenLoading = true;
		const width = 900;
		return html`
			<d2l-dialog
				?async="${showSpinnerWhenLoading}"
				?opened="${this.opened}"
				width="${width}"
				@d2l-dialog-close="${this.handleClose}"
				title-text="${this.localize('submissionViewsHelpDialogTitle')}">
				<div>
					<p>${this.localize('submissionViewsHelpDialogParagraph1')}</p>
					<p>${this.localize('submissionViewsHelpDialogParagraph2')}</p>
				</div>
				<d2l-button
					data-dialog-action
					slot="footer"
					primary>
					${this.localize('submissionViewsHelpDialogConfirmation')}
				</d2l-button>
			</d2l-dialog>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-editor',
	ActivityQuizSubmissionViewsEditor
);
