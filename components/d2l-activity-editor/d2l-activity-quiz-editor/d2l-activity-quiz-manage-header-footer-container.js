import '@brightspace-ui/core/components/alert/alert.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/icons/icon.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizManageHeaderFooterContainer extends ActivityEditorDialogMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {
	static get styles() {
		return [
			bodySmallStyles,
			labelStyles,
			css`
				#manage-header-footer-dialog-header-footer-editor {
					height: 430px;
				}
				d2l-alert {
					margin-bottom: 1rem;
				}
				.d2l-activity-quiz-manage-header-footer-container-dialog-summary {
					margin: 0.5rem 0;
				}
				.d2l-activity-quiz-manage-header-footer-container-dialog-summary d2l-icon {
					margin-right: 0.3rem;
				}
				:host([dir="rtl"]) .d2l-activity-quiz-manage-header-footer-container-dialog-summary d2l-icon {
					margin-left: 0.3rem;
					margin-right: 0;
				}
			`,
		];
	}

	constructor() {
		super(store);
	}

	firstUpdated() {
		super.firstUpdated();
		this.serverErrorTerm = this.localize('quizHeaderFooterServerError');
		this.validationErrorTerm = this.localize('quizHeaderFooterValidationError');
	}

	render() {
		console.log('rendering header footer container');
		return html`
			${this._renderDialogLabel()}
			${this._renderDialogOpener()}
    	`;
	}

	_renderDialogLabel() {
		console.log('Should see the label here');
		return html`
			<div id="manage-header-footer-editor-label" class="d2l-label-text">${this.localize('subHdrHeaderFooter')}</div>
		`;
	}

	_renderDialogOpener() {
		return html`
			<d2l-button-subtle text=${this.localize('manageHeaderFooter')} @click="${this.openDialog}" h-align="text"></d2l-button-subtle>
		`;
	}

	_renderQuizHeaderFooterEditor() {
		const entity = store.get(this.dialogHref);
		if (!entity) return html``;

		const {
			timingHref
		} = entity || {};

		return html`
			<d2l-activity-quiz-manage-header-footer-editor
				href="${timingHref}"
				.token="${this.token}">
			</d2l-activity-quiz-manage-header-footer-editor>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-manage-header-footer-container',
	ActivityQuizManageHeaderFooterContainer
);
