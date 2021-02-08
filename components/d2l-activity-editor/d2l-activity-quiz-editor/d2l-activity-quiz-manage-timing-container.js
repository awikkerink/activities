import './d2l-activity-quiz-manage-timing-dialog.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';


class ActivityQuizManageTimingContainer extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {
	static get styles() {
		return [
			labelStyles,
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

		const {
			timingHref
		} = entity || {};

		return html`
			${this._renderDialogOpener()}
			${this._renderDialog(timingHref)}
    	`;
	}

	_renderDialogOpener() {
		return html`
			<div id="manage-timing-editor-label" class="d2l-label-text">${this.localize('subHdrTimingTools')}</div>
			<div class="placeholder-for-summarizer"></div>
			<d2l-button-subtle text=${this.localize('manageTiming')} @click="${this._openDialog}" h-align="text"></d2l-button-subtle>
		`;
	}

	_renderDialog(timingHref) {
		if (!timingHref) return html``;

		return html`
			<d2l-activity-quiz-manage-timing-dialog
				href="${timingHref}"
				.token="${this.token}"
				@d2l-dialog-close="${this._onDialogClose}">
			</d2l-activity-quiz-manage-timing-dialog>
		`;
	}

	async _openDialog(e) {
		const entity = store.get(this.href);
		if (!entity) return;
		await entity.fork();
		this.shadowRoot.querySelector('d2l-activity-quiz-manage-timing-dialog').openDialog(e);
	}

	_onDialogClose(e) {
		if (e.detail.action === 'ok') {
			const entity = store.get(this.href);
			if (!entity) return;
			entity.merge();
		}
	}
}

customElements.define(
	'd2l-activity-quiz-manage-timing-container',
	ActivityQuizManageTimingContainer
);
