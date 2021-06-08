import './d2l-activity-grade-candidate-selector';
import './d2l-activity-grade-category-selector';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-radio-spacer.js';
import { sharedAssociateGrade as associateGradeStore, shared as store } from '../state/activity-store.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorWorkingCopyDialogMixin } from '../mixins/d2l-activity-editor-working-copy-dialog-mixin.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { formatNumber } from '@brightspace-ui/intl/lib/number.js';
import { GradebookStatus } from 'siren-sdk/src/activities/associateGrade/AssociateGradeEntity.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityGradesDialog extends ActivityEditorWorkingCopyDialogMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			_createNewRadioChecked: { type: Boolean },
			_canLinkNewGrade: { type: Boolean },
			_hasGradeCandidates: { type: Boolean },
			_createSelectboxGradeItemEnabled: { type: Boolean }
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			radioStyles,
			css`
			:host {
				display: block;
			}
			:host([hidden]),
			[hidden] {
				display: none !important;
			}
			.d2l-activity-grades-dialog-create-new-container {
				display: flex;
				margin-bottom: 18px;
			}
			.d2l-activity-grades-dialog-create-new-activity-name {
				overflow-wrap: anywhere; /* not supported by safari */
				word-break: break-word;
			}
			.d2l-activity-grades-dialog-create-new-icon {
				padding-right: 9px;
			}
			:host([dir="rtl"]) .d2l-activity-grades-dialog-create-new-icon {
				padding-left: 9px;
				padding-right: 0;
			}
			.d2l-activity-grades-dialog-grade-icon {
				padding-bottom: 6px;
				padding-top: 6px;
			}
			.d2l-input-radio-label-disabled {
				margin-bottom: 0;
			}
			.d2l-activity-grade-category-selector {
				padding-top: 16px;
			}
			#linkToExistingGradeItemRadioButton {
				padding-bottom: 10px;
			}
			.d2l-activity-grades-dialog-editor {
				min-height: 300px;
			}
			`
		];
	}

	constructor() {
		super(store);
	}

	connectedCallback() {
		super.connectedCallback();

		const event = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-create-selectbox-grade-item-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);

		this._createSelectboxGradeItemEnabled = event.detail.provider;
		if (!this._createSelectboxGradeItemEnabled) {
			this.checkoutOnLoad = false;
		}
	}

	render() {
		const showSpinnerWhenLoading = this._createSelectboxGradeItemEnabled;
		const width = 460;
		const titleText = this._createSelectboxGradeItemEnabled ? this.localize('editor.editLinkExisting') : this.localize('editor.chooseFromGrades');

		return html`
			<d2l-dialog
				id="activity-grades-dialog"
				title-text="${titleText}"
				width="${width}"
				?opened="${this.opened}"
				@d2l-dialog-open="${this._onDialogOpen}"
				@d2l-dialog-close="${this._onDialogClose}"
				?async="${showSpinnerWhenLoading}">
				${this._renderDialogEditor()}
				<d2l-button slot="footer" primary @click=${this._saveAssociateGrade} ?disabled="${this.isSaving}" dialog-action="done">${this.localize('editor.ok')}</d2l-button>
				<d2l-button slot="footer" @click=${this._cancel} ?disabled="${this.isSaving}" dialog-action="cancel">${this.localize('editor.cancel')}</d2l-button>
			</d2l-dialog>
		`;
	}

	async openGradesDialog() {
		if (this._createSelectboxGradeItemEnabled) {
			await this.openDialog();
		}

		const href = this.dialogHref || this.href;
		const scoreAndGrade = store.get(href).scoreAndGrade;
		await Promise.all([
			scoreAndGrade.fetchGradeCandidates(),
			scoreAndGrade.fetchNewGradeCandidates()
		]);

		const {
			gradeCandidateCollection,
			createNewGrade
		} = scoreAndGrade;

		this._canLinkNewGrade = !!scoreAndGrade.getAssociateNewGradeAction();
		this._createNewRadioChecked = createNewGrade && this._canLinkNewGrade;
		this._hasGradeCandidates = gradeCandidateCollection && gradeCandidateCollection.gradeCandidates.length > 0;

		if (this._createSelectboxGradeItemEnabled) {
			const dialogEntity = store.get(this.dialogHref);
			if (dialogEntity && dialogEntity.associateGradeHref) {
				this._associateGradeHref = dialogEntity.associateGradeHref;
				this._fetch(() => {
					return associateGradeStore.fetch(this._associateGradeHref, this.token);
				});
			}

			const associateGrade = associateGradeStore.get(this._associateGradeHref);
			if (this._createNewRadioChecked) {
				await this._associateGradeSetGradebookStatus(GradebookStatus.NewGrade);
				if (associateGrade) {
					await associateGrade.getGradeCategories();
				}
			} else {
				await this._associateGradeSetGradebookStatus(GradebookStatus.ExistingGrade);
				if (associateGrade) {
					await associateGrade.getGradeCandidates();
				}
			}
		}

		if (!this._createSelectboxGradeItemEnabled) {
			this.openDialog();
		}
	}

	async _associateGradeSetGradebookStatus(gradebookStatus) {
		const baseEntity = store.get(this.href);
		const scoreAndGradeBase = baseEntity && baseEntity.scoreAndGrade;

		const associateGrade = associateGradeStore.get(this._associateGradeHref);

		if (!scoreAndGradeBase || !associateGrade) return;

		await associateGrade.setGradebookStatus(gradebookStatus, scoreAndGradeBase.newGradeName, scoreAndGradeBase.scoreOutOf);
	}

	async _dialogRadioChanged(e) {
		const currentTarget = e.currentTarget;
		const associateGrade = associateGradeStore.get(this._associateGradeHref);
		if (currentTarget && currentTarget.value === 'createNew') {
			this._createNewRadioChecked = true;
		} else if (currentTarget && currentTarget.value === 'linkExisting') {
			this._createNewRadioChecked = false;
		}

		if (this._createSelectboxGradeItemEnabled) {
			if (currentTarget && currentTarget.value === 'createNew') {
				await this._associateGradeSetGradebookStatus(GradebookStatus.NewGrade);
				if (associateGrade) {
					associateGrade.getGradeCategories();
				}
			} else if (currentTarget && currentTarget.value === 'linkExisting') {
				this._createNewRadioChecked = false;
				this._associateGradeSetGradebookStatus(GradebookStatus.ExistingGrade);
				if (associateGrade) {
					associateGrade.getGradeCandidates();
				}
			}
		}

		const dialog = this.shadowRoot.querySelector('d2l-dialog');
		dialog.resize();
	}

	_onDialogClose(e) {
		if (!this._createSelectboxGradeItemEnabled && e.detail.action !== 'done') {
			const scoreAndGrade = store.get(this.href).scoreAndGrade;

			const {
				gradeCandidateCollection,
				newGradeCandidatesCollection
			} = scoreAndGrade;

			const prevSelectedHref = gradeCandidateCollection && gradeCandidateCollection.selected ? gradeCandidateCollection.selected.href : null;
			const prevSelectedCategoryHref = newGradeCandidatesCollection.selected.href;

			if (prevSelectedHref) {
				gradeCandidateCollection.setSelected(prevSelectedHref);
			}
			newGradeCandidatesCollection.setSelected(prevSelectedCategoryHref);
		}
		this.handleClose(e);
	}

	_onDialogOpen(e) {
		if (this._createSelectboxGradeItemEnabled) {
			const gradeCategorySelector = this.shadowRoot.querySelector('d2l-activity-grade-category-selector');
			gradeCategorySelector && gradeCategorySelector.resetShowCategoriesProperty();
			e.target.resize();
		}
	}

	_renderDialogEditor() {
		const href = this._createSelectboxGradeItemEnabled ? this.dialogHref : this.href;

		const activity = store.get(href);
		if (!activity) {
			return html``;
		}

		const scoreAndGrade = store.get(this.href).scoreAndGrade;
		const {
			scoreOutOf,
			scoreOutOfError,
			newGradeName
		} = scoreAndGrade;

		return html`
			<div class="d2l-activity-grades-dialog-editor">
				<label class="d2l-input-radio-label ${!this._canLinkNewGrade ? 'd2l-input-radio-label-disabled' : ''}">
					<input
						type="radio"
						name="chooseFromGrades"
						value="createNew"
						?disabled="${!this._canLinkNewGrade}"
						.checked="${this._createNewRadioChecked}"
						@change="${this._dialogRadioChanged}">
					${this.localize('editor.createAndLinkToNewGradeItem')}
				</label>
				<d2l-input-radio-spacer ?hidden="${!this._createNewRadioChecked && this._canLinkNewGrade}">
					${this._canLinkNewGrade ? html`
						<div class="d2l-activity-grades-dialog-create-new-container">
							<div class="d2l-activity-grades-dialog-create-new-icon"><d2l-icon class="d2l-activity-grades-dialog-grade-icon" icon="tier1:grade"></d2l-icon></div>
							<div>
								<div class="d2l-activity-grades-dialog-create-new-activity-name">${newGradeName}</div>
								<div class="d2l-body-small">${scoreOutOf && !scoreOutOfError ? html`
									${this.localize('editor.points', { points: formatNumber(scoreOutOf, { maximumFractionDigits: 2 }) })}
								` : null }
								</div>
							</div>
						</div>
						<d2l-activity-grade-category-selector
							.href="${href}"
							.token="${this.token}">
						</d2l-activity-grade-category-selector>
					` : html`
						<div class="d2l-body-small">
							${this.localize('editor.noGradeCreatePermission')}
						</div>
					`}
				</d2l-input-radio-spacer>
				<label id="linkToExistingGradeItemRadioButton" class="d2l-input-radio-label ${!this._hasGradeCandidates ? 'd2l-input-radio-label-disabled' : ''}">
					<input
						type="radio"
						name="chooseFromGrades"
						value="linkExisting"
						?disabled="${!this._hasGradeCandidates}"
						.checked="${!this._createNewRadioChecked && this._hasGradeCandidates}"
						@change="${this._dialogRadioChanged}">
					${this.localize('editor.linkToExistingGradeItem')}
				</label>
				<d2l-input-radio-spacer ?hidden="${this._createNewRadioChecked && this._hasGradeCandidates}" ?disabled="${!this._hasGradeCandidates}">
					${this._hasGradeCandidates ? html`<d2l-activity-grade-candidate-selector
						.href="${href}"
						.token="${this.token}">
					</d2l-activity-grade-candidate-selector>` : html`<div class="d2l-body-small">
						${this.localize('editor.noGradeItems')}
					</div>`}
				</d2l-input-radio-spacer>
			</div>
		`;
	}

	async _saveAssociateGrade(e) {
		if (this._createSelectboxGradeItemEnabled) {
			const entity = store.get(this.dialogHref);
			if (!entity) return;

			await entity.saving; // Wait for activity usage entity PATCH requests to complete before checking in

			await this.checkinDialog(e);
		} else {
			const scoreAndGrade = store.get(this.href).scoreAndGrade;

			if (this._createNewRadioChecked) {
				scoreAndGrade.linkToNewGrade();
			} else if (!this._createNewRadioChecked && this._hasGradeCandidates) {
				scoreAndGrade.linkToExistingGrade();
			}

			this.closeDialog();
		}
	}
}
customElements.define('d2l-activity-grades-dialog', ActivityGradesDialog);
