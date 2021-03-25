import '@brightspace-ui/core/components/alert/alert.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/icons/icon.js';
import './d2l-activity-quiz-manage-header-footer-editor.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizManageHeaderFooterContainer extends ActivityEditorDialogMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			href: { type: String },
			token: { type: Object }
		};
	}

	static get styles() {
		return [
			bodySmallStyles
		];
	}

	constructor() {
		super(store);
	}

	firstUpdated() {
		super.firstUpdated();
	}

	render() {
		return html`
			${this._renderDialogLabel()}
			${this._renderDialogOpener()}
			${this._renderDialog()}
    	`;
	}

	_renderDialog() {
		const width = 700;
		return html`
			<d2l-dialog
				id="quiz-manage-header-footer-dialog"
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				width="${width}"
				title-text=${this.localize('headerFooterDialogTitle')}>
					${this._renderQuizHeaderFooterEditor()}
					<d2l-button slot="footer" primary @click="${this._save}" ?disabled="${this.isSaving}">${this.localize('manageHeaderFooterDialogAddText')}</d2l-button>
					<d2l-button slot="footer" data-dialog-action ?disabled="${this.isSaving}">${this.localize('manageHeaderFooterDialogCancelText')}</d2l-button>
			</d2l-dialog>
		`;
	}

	_renderDialogLabel() {
		return html`
			<div id="manage-header-footer-editor-label" class="d2l-label-text">${this.localize('subHdrHeaderFooter')}</div>
		`;
	}

	_renderDialogOpener() {
		return html`
			<d2l-button-subtle text=${this.localize('manageHeaderFooterButton')} @click="${this.open}" h-align="text"></d2l-button-subtle>
		`;
	}

	_renderQuizHeaderFooterEditor() {
		return html`
			<d2l-activity-quiz-manage-header-footer-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-manage-header-footer-editor>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-manage-header-footer-container',
	ActivityQuizManageHeaderFooterContainer
);
