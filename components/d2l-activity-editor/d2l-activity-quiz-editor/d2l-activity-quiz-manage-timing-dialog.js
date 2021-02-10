import './d2l-activity-quiz-manage-timing-editor.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { css, html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizManageTimingDialog extends ActivityEditorMixin(ActivityEditorDialogMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {
	static get styles() {
		return [
			css`
				#manage-timing-dialog-timing-editor {
					height: 400px;
				}
			`,
		];
	}

	constructor() {
		super(store);
	}

	render() {
		return html`
			${this._renderDialog()}
    	`;
	}

	_renderDialog() {
		return html`
			<d2l-dialog
				id="quiz-manage-timing-dialog"
				?opened="${this.opened}"
				@d2l-dialog-close="${this._closeDialog}"
				width=800
				title-text=${this.localize('subHdrTimingTools') }>
					<div id="manage-timing-dialog-timing-editor">${this._renderQuizTimingEditor()}</div>
					<d2l-button slot="footer" primary data-dialog-action="ok">${this.localize('manageTimingDialogConfirmationText')}</d2l-button>
					<d2l-button slot="footer" data-dialog-action>${this.localize('manageTimingDialogCancelText')}</d2l-button>
			</d2l-dialog>
		`;
	}

	async openDialog(e) {
		this.open(e);
	}

	async _closeDialog(e) {
		const entity = store.get(this.href);
		if (!entity) return;
		if (e.detail.action === 'ok') {
			await entity.merge(store);
		}

		this.handleClose(e);
	}

	_resize() {
		this.shadowRoot.querySelector('d2l-dialog').resize();
	}

	_renderQuizTimingEditor() {
		const entity = store.get(this.href);
		if (!entity) return html``;

		const {
			timingHref
		} = entity || {};

		return html`
			<d2l-activity-quiz-manage-timing-editor
				href="${timingHref}"
				.token="${this.token}"
				@d2l-activity-quiz-manage-timing-editor-updated="${this._resize}">
			</d2l-activity-quiz-manage-timing-editor>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-manage-timing-dialog',
	ActivityQuizManageTimingDialog
);
