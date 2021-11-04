import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { shared as activityStore, sharedAssociateGrade as associateGradeStore } from '../state/activity-store.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { checkboxStyles } from '../styles/checkbox-styles.js';
import { GradebookStatus } from 'siren-sdk/src/activities/associateGrade/AssociateGradeEntity.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizSyncGradebookEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(ActivityEditorDialogMixin(MobxLitElement)))) {

	static get properties() {
		return {
			quizHref: { type: String }
		};
	}

	static get styles() {
		return [
			checkboxStyles,
			css`
				.d2l-input-checkbox-help-container {
					align-items: flex-start;
					display: flex;
				}

				.d2l-input-checkbox-help {
					margin: auto 0.4em auto 0;
					padding: 0;
				}

				:host([dir="rtl"]) .d2l-input-checkbox-help {
					margin: auto 0 auto 0.4em;
				}
			`
		];
	}

	constructor() {
		super(activityStore);
		this.checkoutOnLoad = true; // this is for the activityUsage, not the quiz
	}

	render() {
		const entity = store.get(this.quizHref);
		const activityEntity = activityStore.get(this.checkedOutHref);

		if (!entity || !activityEntity) {
			return html``;
		}

		const associateGradeEntity = associateGradeStore.get(activityEntity.associateGradeHref);
		const gradebookStatus = associateGradeEntity.gradebookStatus;

		if (gradebookStatus === GradebookStatus.NotInGradebook && entity.isSyncGradebookEnabled) {
			this._setSyncGradebook(entity, false);
		} else if (gradebookStatus !== GradebookStatus.NotInGradebook
			&& !entity.isSyncGradebookEnabled
			&& entity.isSyncGradebookDefault) {
				this._setSyncGradebook(entity, true);
		}

		return html`
			<d2l-input-checkbox-spacer
				class="d2l-body-small">
			</d2l-input-checkbox-spacer>

			<div class="d2l-input-checkbox-help-container">
				<d2l-input-checkbox
					class="d2l-input-checkbox-help"
					?checked="${entity.isSyncGradebookDefault || entity.isSyncGradebookEnabled}"
					@change="${this._setSyncGradebookCheck}"
					ariaLabel="${this.localize('syncGradebookDescription')}"
					?disabled="${!entity.canEditSyncGradebook || gradebookStatus === GradebookStatus.NotInGradebook}">

					<label> ${this.localize('syncGradebookDescription')} </label>
				</d2l-input-checkbox>

				<d2l-button-icon
					text="${this.localize('syncGradebookAccessibleHelpText')}"
					icon="tier1:help"
					@click="${this.open}">
				</d2l-button-icon>
			</div>

			${this._renderDialog()}
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);
		if ((changedProperties.has('quizHref') || changedProperties.has('token')) &&
			this.quizHref && this.token) {

			this.store && this._fetch(async() => {
				return this.store.fetch(this.quizHref, this.token);
			});
		}
	}

	_renderDialog() {
		return html`
			<d2l-dialog
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				title-text="${this.localize('syncGradebookHelpDialogTitle')}">
					<div>
						<p>${this.localize('syncGradebookHelpDialogParagraph1')}</p>
						<p>${this.localize('syncGradebookHelpDialogParagraph2')}</p>
					</div>
					<d2l-button
						data-dialog-action="done"
						slot="footer"
						primary>
						${this.localize('syncGradebookHelpDialogConfirmationText')}
					</d2l-button>
			</d2l-dialog>
		`;
	}

	_setSyncGradebook(entity, isChecked) {
		entity.setSyncGradebook(isChecked);
	}

	_setSyncGradebookCheck(event) {
		const entity = store.get(this.quizHref);
		this._setSyncGradebook(entity, event.target.checked)
		entity.unsetSyncGradebookDefault();
	}
}

customElements.define(
	'd2l-activity-quiz-sync-gradebook-editor',
	ActivityQuizSyncGradebookEditor
);
