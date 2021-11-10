import './d2l-activity-quiz-submission-views-dialog-card-editor.js';
import { css, html } from 'lit-element/lit-element.js';
import { shared as quizStore, sharedSubmissionView as submissionViewStore, sharedSubmissionViews as store } from './state/quiz-store';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { ActivityEditorWorkingCopyMixin } from '../mixins/d2l-activity-editor-working-copy-mixin.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityQuizSubmissionViewsAddAdditionalView
	extends ActivityEditorWorkingCopyMixin(ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)))) {

	static get properties() {
		return {
			dialogInEditState: {
				attribute: 'dialog-in-edit-state',
				reflect: true,
				type: Boolean
			},
			quizHref: {
				attribute: 'quiz-href',
				reflect: true,
				type: String
			},
			_editHref: {
				type: String
			},
			_editViewQuizHref: {
				type: String
			}
		};
	}

	static get styles() {
		return [
			css`
				.d2l-activity-quiz-submission-views-add-additional-view-editor {
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 6px;
					display: inline-block;
					margin: 10px 0;
					overflow: hidden;
					width: 100%;
				}

				.d2l-activity-quiz-submission-views-add-additional-view-editor {
					padding: 20px 30px;
				}

				.d2l-activity-quiz-submission-views-add-additional-view-editor .d2l-activity-quiz-submission-views-add-additional-view-editor-buttons {
					padding: 10px 0 0;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity || !entity.canAddView ) return html``;
		return html`
			${this._editHref ? this._renderAdditionalViewEditor() : html``}
			<d2l-button-subtle
				text=${this.localize('additionalView')}
				@click="${this._initializeAdditionalViewEditor}"
				icon="tier1:plus-large"
				?disabled="${this.dialogInEditState}"
				h-align="text">
			</d2l-button-subtle>
		`;
	}

	_renderAdditionalViewEditor() {
		return html`
			<div class="d2l-activity-quiz-submission-views-add-additional-view-editor">
				<d2l-activity-quiz-submission-views-dialog-card-editor
					href="${this._editHref}"
					.token="${this.token}">
				</d2l-activity-quiz-submission-views-dialog-card-editor>
				<div class="d2l-activity-quiz-submission-views-add-additional-view-editor-buttons">
					<d2l-button
						?disabled="${this.isSaving}"
						@click="${this._saveAdditionalView}">
						${this.localize('quizSubmissionViewsDialogCardCreate')}
					</d2l-button>
					<d2l-button-subtle
						?disabled="${this.isSaving}"
						text=${this.localize('quizSubmissionViewsDialogCardCancel')}
						@click="${this._exitEditAdditionalView}">
					</d2l-button-subtle>
				</div>
			</div>
		`;
	}

	async _initializeAdditionalViewEditor() {
		this.dispatchEvent(new CustomEvent('d2l-activity-quiz-submission-views-dialog-edit-start', {
			bubbles: true,
			composed: true
		}));

		this._editViewQuizHref = await this.checkout(quizStore, this.quizHref);

		const checkedOutEntity = quizStore.get(this._editViewQuizHref);
		const submissionViewsEntity = await store.fetch(checkedOutEntity.submissionViewsHref);

		const newSubmissionView = await submissionViewsEntity.addView(submissionViewStore);
		this._editHref = newSubmissionView.href;
	}

	async _saveAdditionalView() {
		const editEntity = submissionViewStore.get(this._editHref);

		await editEntity.saving; // Wait for submissionview save requests to complete before checking in

		const result = await this.checkin(quizStore, this._editViewQuizHref);

		this._exitEditAdditionalView();

		if (result) {
			// refetch submission views to update displayed read-only cards
			const quizEntity = quizStore.get(this.quizHref);
			const submissionViewsHref = quizEntity && quizEntity.submissionViewsHref;
			const submissionViewsEntity = store.get(submissionViewsHref);
			await submissionViewsEntity.fetch(true);
		}
	}

	_exitEditAdditionalView() {
		this._editHref = '';
		this._editViewQuizHref = '';

		this.dispatchEvent(new CustomEvent('d2l-activity-quiz-submission-views-dialog-edit-end', {
			bubbles: true,
			composed: true
		}));
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-add-additional-view',
	ActivityQuizSubmissionViewsAddAdditionalView
);
