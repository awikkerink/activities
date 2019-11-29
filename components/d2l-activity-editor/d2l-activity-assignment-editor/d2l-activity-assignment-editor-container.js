import '../d2l-activity-editor.js';
import './d2l-activity-assignment-editor-detail.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';

function initAssignmentDetail(entity) {
	// TODO - maybe split this to business data and config data like canEdit, completionTypes etc
	return {
		name: entity.name(),
		canEditName: entity.canEditName(),
		instructions: entity.instructionsEditorHtml(),
		canEditInstructions: entity.canEditInstructions(),
		instructionsRichTextEditorConfig: entity.instructionsRichTextEditorConfig(),
		submissionTypes: entity.submissionTypeOptions(),
		completionTypes: entity.allCompletionTypeOptions(),
		submissionType: entity.submissionType().value,
		completionType: entity.completionType().value,
		canEditSubmissionType: entity.canEditSubmissionType(),
		canEditCompletionType: entity.canEditCompletionType(),
	}
}

class AssignmentEditorContainer extends EntityMixinLit(LitElement) {

	static get properties() {
		return {
			htmlEditorEnabled: { type: Boolean },
			_assignmentHref: { type: String },
			_assignmentDetail: { type: Object },
			activity: { type: Object }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	constructor() {
		super();
		this._setEntityType(AssignmentEntity);
	}

	async save() {
		return this._entity.update(this._assignmentDetail);
	}

	get _entity() {
		return super._entity;
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			const oldValue = this._entity;
			this._onAssignmentChange(entity);
			super._entity = entity;
			this.requestUpdate();
		}
	}

	_onAssignmentChange(entity) {
		this._assignmentDetail = initAssignmentDetail(entity);
	}

	_update(e) {
		this._assignmentDetail = Object.assign({}, this._assignmentDetail);
		this._assignmentDetail[e.detail.prop] = e.detail.value;
	}

	render() {
		return html`
			<d2l-activity-assignment-editor-detail
				?htmlEditorEnabled="${this.htmlEditorEnabled}"
				.activity="${this.activity}"
				.assignment="${this._assignmentDetail}"
				@d2l-activity-assignment-update="${this._update}"
			>
			</d2l-activity-assignment-editor-detail>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-container', AssignmentEditorContainer);
