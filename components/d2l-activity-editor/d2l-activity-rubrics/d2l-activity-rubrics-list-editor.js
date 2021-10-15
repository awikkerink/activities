import 'd2l-rubric/d2l-rubric.js';
import '@brightspace-ui/core/components/dialog/dialog';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { shared as activityStore } from '../state/activity-store';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { shared as assignmentStore } from '../../d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';
import { fetchEvaluationCount } from './d2l-activity-rubrics-list-controller.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import store from './state/association-collection-store';

const DELETE_ASSOCIATION_ACTION = 'delete-association';

class ActivityRubricsListEditor extends ActivityEditorMixin(LocalizeActivityEditorMixin(RtlMixin((MobxLitElement)))) {

	static get properties() {
		return {
			assignmentHref: { type: String },
			associationsHref: { type: String },
			_associationBeingDeleted: { type: String }
		};
	}

	static get styles() {
		return [
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}

				.d2l-heading-4 {
					margin: 0 0 0.6rem 0;
				}
				.d2l-association-container {
					align-items: center;
					display: flex;
					margin: 0 0 1rem 0;
				}
				.d2l-delete-association-button {
					flex-shrink: 0;
					margin-left: 0.2rem;
				}
				.d2l-association-box {
					flex-grow: 1;
				}

				.d2l-detach-rubric-dialog-text {
					margin-bottom: 1rem;
				}
			`
		];
	}

	constructor() {
		super(store);
		this._associationBeingDeleted = null;
	}

	render() {

		const entity = store.get(this.href);
		const assignment = assignmentStore.get(this.assignmentHref);

		if (!entity || !assignment) {
			return html``;
		}

		const associations = entity.fetchAssociations();
		return html`${associations.map(this._renderAssociation, this)}`;
	}
	hasPendingChanges() {
		const entity = store.get(this.href);
		return entity && entity.dirty;
	}
	async save(saveInPlace) {
		const entity = store.get(this.href);
		if (!entity) {
			return;
		}
		await entity.save(saveInPlace);
	}

	_deleteAssociation(rubricHref) {
		if (!rubricHref) {
			return;
		}

		const entity = store.get(this.href);
		const assignment = assignmentStore.get(this.assignmentHref);
		const associationsDirect = store.get(this.associationsHref);

		if (!entity || !assignment) {
			return;
		}

		entity.deleteAssociation(rubricHref, assignment);
		associationsDirect.deleteAssociation(rubricHref, assignment);
		announce(this.localize('rubrics.txtRubricRemoved'));
	}

	_handleConfirmDetachDialogClose(e, rubricHref) {
		if (e.detail.action === DELETE_ASSOCIATION_ACTION) {
			this._deleteAssociation(rubricHref);
		}
		// closes delete confirmation dialog
		this._associationBeingDeleted = null;
	}

	async _onDeleteAssociationButtonClicked(association) {
		const associationEntity = association.entity._entity;
		const activityUsageLink = associationEntity.getSubEntityByClass('activity-usage');
		const activityUsage = activityStore.get(activityUsageLink.href);
		const activityUsageEntity = activityUsage._entity._entity;

		const evaluationCount = await fetchEvaluationCount(activityUsageEntity, activityUsageEntity.token);
		if (evaluationCount === 0) {
			this._deleteAssociation(association.rubricHref);
		} else {
			// opens delete confirmation dialog for specific association
			this._associationBeingDeleted = association.rubricHref;
		}
	}

	_renderAssociation(association) {
		const shouldShowRubric = (association.isAssociated || association.isAssociating);
		if (shouldShowRubric) {
			if (association.isDeleting) {
				return html`
					<div class="d2l-association-container">
						<d2l-rubric
							class="d2l-association-box"
							force-compact
							detached-view
							.href="${association.rubricHref}"
							.token="${this.token}">
						</d2l-rubric>
					</div>
				`;
			}

			const canDeleteAssociation = association.entity.canDeleteAssociation() || association.isAssociating;
			const deleteButtonClickedFunc = () => this._onDeleteAssociationButtonClicked(association);
			const deleteConfirmDialogClosedFunc = (e) => this._handleConfirmDetachDialogClose(e, association.rubricHref);

			return html`
				<div class="d2l-association-container">
					<d2l-rubric
						class="d2l-association-box"
						force-compact
						read-only
						.href="${association.rubricHref}"
						.token="${this.token}">
					</d2l-rubric>
					<d2l-button-icon
						?hidden="${!canDeleteAssociation}"
						class="d2l-delete-association-button"
						icon="tier1:close-default"
						data-id="${association.rubricHref}"
						@click="${deleteButtonClickedFunc}"
						text=${this.localize('rubrics.txtDeleteRubric')}
					></d2l-button-icon>
				</div>

				${this._associationBeingDeleted !== association.rubricHref ? null : html`
					<d2l-dialog-confirm
						opened
						text="${this.localize('rubrics.txtConfirmDetachRubric')}"
						@d2l-dialog-close="${deleteConfirmDialogClosedFunc}"
					>
						<d2l-button
							slot="footer"
							primary data-dialog-action="${DELETE_ASSOCIATION_ACTION}"
						>
							${this.localize('rubrics.btnDetach')}
						</d2l-button>
						<d2l-button
							slot="footer"
							class="detach-rubric-dialog-cancel-button"
							data-dialog-action
						>
							${this.localize('rubrics.btnCancel')}
						</d2l-button>
					</d2l-dialog-confirm>
				`}
			`;
		} else {
			return html``;
		}
	}

}
customElements.define('d2l-activity-rubrics-list-editor', ActivityRubricsListEditor);
