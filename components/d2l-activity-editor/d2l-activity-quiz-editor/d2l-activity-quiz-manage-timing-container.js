import './d2l-activity-quiz-manage-timing-dialog.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizManageTimingContainer extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {
	static get properties() {

		return {
			href: { type: String },
			token: { type: Object },
			checkedOutHref: { type: String }
		};
	}

	static get styles() {
		return [
			labelStyles,
		];
	}

	constructor() {
		super(store);
		this.checkedOutHref = '';
	}

	render() {
		return html`
			${this._renderDialogOpener()}
			${this._renderDialog()}
    	`;
	}

	async save() {
		const entity = store.get(this.href);
		if (!entity) return;
		await entity.checkin(store);
	}

	async _closeDialog() {
		this.checkedOutHref = '';
	}

	async _openDialog(e) {
		const entity = store.get(this.href);
		if (!entity) return;

		this.checkedOutHref = await entity.checkout(store);

		this.shadowRoot.querySelector('d2l-activity-quiz-manage-timing-dialog').openDialog(e);
	}

	_renderDialog() {
		return html`
			<d2l-activity-quiz-manage-timing-dialog
				href="${this.checkedOutHref}"
				.token="${this.token}"
				@d2l-dialog-close="${this._closeDialog}">
			</d2l-activity-quiz-manage-timing-dialog>
		`;
	}

	_renderDialogOpener() {
		return html`
			<div id="manage-timing-editor-label" class="d2l-label-text">${this.localize('subHdrTimingTools')}</div>
			<div class="placeholder-for-summarizer"></div>
			<d2l-button-subtle text=${this.localize('manageTiming')} @click="${this._openDialog}" h-align="text"></d2l-button-subtle>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-manage-timing-container',
	ActivityQuizManageTimingContainer
);
