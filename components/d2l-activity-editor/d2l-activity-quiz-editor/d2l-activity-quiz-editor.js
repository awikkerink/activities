import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorContainerMixin } from '../mixins/d2l-activity-editor-container-mixin';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { LocalizeActivityAssignmentEditorMixin } from '../d2l-activity-assignment-editor/mixins/d2l-activity-assignment-lang-mixin';

class QuizEditor extends ActivityEditorContainerMixin(EntityMixinLit(LocalizeActivityAssignmentEditorMixin(LitElement))) {

	static get properties() {
		return {
			/**
			* Set the WidthType on the template to constrain page width if necessary
			*/
			widthType: { type: String, attribute: 'width-type' }
		};
	}

	static get styles() {
		return css`
			div[slot="secondary"] {
				background: var(--d2l-color-gypsum);
				height: 100%;
			}
		`;
	}

	render() {
		return html`
			<d2l-activity-editor
				type="assignment"
				telemetryId="assignments"
				.href=${this.href}
				.token=${this.token}
				?is-saving=${this.isSaving}>

				${this._editorTemplate}

			</d2l-activity-editor>

			<d2l-dialog-confirm title-text="${this.localize('discardChangesTitle')}" text=${this.localize('discardChangesQuestion')}>
				<d2l-button slot="footer" primary dialog-action="confirm">${this.localize('yesLabel')}</d2l-button>
				<d2l-button slot="footer" dialog-action="cancel">${this.localize('noLabel')}</d2l-button>
			</d2l-dialog-confirm>
		`;
	}

	get _editorTemplate() {
		return html`
			<d2l-template-primary-secondary slot="editor" width-type="${this.widthType}">
				<slot name="editor-nav" slot="header"></slot>
				<div slot="secondary"></div>
				<d2l-activity-editor-footer
					.href="${this.href}"
					.token="${this.token}"
					slot="footer"
					class="d2l-activity-editor-footer">
				</d2l-activity-editor-footer>
			</d2l-template-primary-secondary>
		`;
	}
}
customElements.define('d2l-activity-quiz-editor', QuizEditor);
