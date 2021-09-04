import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { checkboxStyles } from '../styles/checkbox-styles.js';
import { html } from 'lit-element/lit-element.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizAutomaticGradeEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(ActivityEditorDialogMixin(MobxLitElement)))) {

	static get styles() {
		return checkboxStyles;
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
			<d2l-input-checkbox-spacer
				class="d2l-body-small">
			</d2l-input-checkbox-spacer>
		
				<d2l-input-checkbox 
					?checked="${entity.isAutoSetGradedEnabled}"
					@change="${this._setAutoSetGraded}"
					ariaLabel="${this.localize('autoSetGradedDescription')}"
					?disabled="${!entity.canEditAutoSetGraded}">

					<label> ${this.localize('autoSetGradedDescription')} </label>

					<d2l-button-icon
						text="${this.localize('autoSetGradedAccessibleHelpText')}"
						icon="tier1:help"
						@click="${this.open}">
					</d2l-button-icon>
					
				</d2l-input-checkbox>
				${this._renderDialog()}
		`;
	}

	_renderDialog() {
		return html`
			<d2l-dialog
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				title-text="${this.localize('autoSetGradedHelpDialogTitle')}">
					<div>
						<p>${this.localize('autoSetGradedHelpDialogParagraph1')}</p>
						<p>${this.localize('autoSetGradedHelpDialogParagraph2')}</p>
					</div>
					<d2l-button
						data-dialog-action="done"
						slot="footer"
						primary>
						${this.localize('autoSetGradedHelpDialogConfirmationText')}
					</d2l-button>
			</d2l-dialog>
		`;
	}

	_setAutoSetGraded(event) {
		const entity = store.get(this.href);
		entity.setAutoSetGraded(event.target.checked);
	}
}

customElements.define(
	'd2l-activity-quiz-auto-set-graded-editor',
	ActivityQuizAutomaticGradeEditor
);
