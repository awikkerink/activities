import '@brightspace-ui/core/components/dialog/dialog.js';
import './d2l-activity-quiz-submission-views-accordion-editor.js';
import './d2l-activity-quiz-submission-views-editor.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorWorkingCopyDialogMixin } from '../mixins/d2l-activity-editor-working-copy-dialog-mixin';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsContainer
	extends ActivityEditorWorkingCopyDialogMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			css`
				.d2l-quiz-submission-views-open-dialog-button {
					margin-top: 5px;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('d2l-activity-quiz-submission-views-accordion-editor-tile-removed', this._onTileRemoved);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('d2l-activity-quiz-submission-views-accordion-editor-tile-removed', this._onTileRemoved);
	}

	render() {
		return html`
			${this._renderAccordionView()}
			${this._renderDialogOpener()}
			${this._renderDialog()}
		`;
	}

	async _onTileRemoved(e) {
		if (!e || !e.detail || !e.detail.promise) return;

		await e.detail.promise;
		const entity = store.get(this.checkedOutHref);
		entity && entity.fetch(true);
	}

	_renderAccordionView() {
		const entity = store.get(this.checkedOutHref);
		if (!entity) return html``;

		const {
			submissionViewsHref
		} = entity;

		return html`
			<d2l-activity-quiz-submission-views-accordion-editor
				href="${submissionViewsHref}"
				.token="${this.token}">
			</d2l-activity-quiz-submission-views-accordion-editor>
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
				quiz-href="${this.dialogHref}"
				.token="${this.token}">
			</d2l-activity-quiz-submission-views-editor>
		`;
	}

	_renderDialogOpener() {
		return html`
			<d2l-button-subtle
				class="d2l-quiz-submission-views-open-dialog-button"
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
