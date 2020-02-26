import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class Assignment {

	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new AssignmentEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	_getValidCompletionTypes(currentSubmissionType) {
		return this.submissionTypeOptions.find(
			submissionType => submissionType.value.toString() === currentSubmissionType
		).completionTypes
	}

	_isCompletionTypeValid(completionType, validCompletionTypes) {
		return validCompletionTypes.some(validCompletionType => completionType.toString() === validCompletionType.toString());
	}

	_setValidCompletionTypeForSubmissionType(){
		const validCompletionTypes = this._getValidCompletionTypes(this.submissionType);
		
		if (validCompletionTypes !== null && validCompletionTypes.length > 0) {
			this.canEditCompletionType = true;
			this.completionTypeOptions = this.allCompletionTypeOptions.filter(
				completionType => this._isCompletionTypeValid(completionType.value, validCompletionTypes)
			);
			
			if (!this._isCompletionTypeValid(this.completionType, validCompletionTypes)) {
				this.completionType = validCompletionTypes[0];
			}
		} else {
			this.canEditCompletionType = false;
			this.completionTypeOptions = [];
		}
	}

	load(entity) {
		this._entity = entity;
		this.name = entity.name();
		this.canEditName = entity.canEditName();
		this.instructions = entity.instructionsEditorHtml();
		this.canEditInstructions = entity.canEditInstructions();
		this.instructionsRichTextEditorConfig = entity.instructionsRichTextEditorConfig();
		this.activityUsageHref = entity.activityUsageHref();
		this.submissionTypeOptions = entity.submissionTypeOptions();
		this.completionTypeOptions = entity.completionTypeOptions();
		this.allCompletionTypeOptions = entity.allCompletionTypeOptions();
		this.canEditSubmissionType = entity.canEditSubmissionType();
		this.canEditCompletionType = entity.canEditCompletionType();
		this.submissionType = entity.submissionType().value;
		this.completionType = entity.completionType().value;
	}

	setSubmissionType(value) {
		this.submissionType = value;
		this._setValidCompletionTypeForSubmissionType();
	}

	setCompletionType(value) {
		this.completionType = value;
	}

	setName(value) {
		this.name = value;
	}

	setInstructions(value) {
		this.instructions = value;
	}

	async save() {
		if (!this._entity) {
			return;
		}

		await this._entity.save({
			name: this.name,
			instructions: this.instructions
		});
		await this.fetch();
	}
}

decorate(Assignment, {
	// props
	name: observable,
	canEditName: observable,
	instructions: observable,
	canEditInstructions: observable,
	instructionsRichTextEditorConfig: observable,
	activityUsageHref: observable,
	completionTypeOptions: observable,
	canEditSubmissionType: observable,
	canEditCompletionType: observable,
	// actions
	load: action,
	setName: action,
	setInstructions: action,
	setSubmissionType: action,
	setCompletionType: action,
	save: action
});
