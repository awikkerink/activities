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

	_getValidCompletionTypes(){
		return this.completionTypeOptions;
	}

	_isCurrentCompletionTypeValid(validCompletionTypes) {
		return validCompletionTypes.find(completionType => completionType.value === this.completionTypeOptions);
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
		this.canEditSubmissionType = entity.canEditSubmissionType();
		this.canEditCompletionType = entity.canEditCompletionType();
		this.submissionType = entity.submissionType().value;
		this.completionType = entity.completionType().value;
	}

	setSubmissionType(value) {
		this.submissionType = value;

		debugger;
		const validCompletionTypes = this._getValidCompletionTypes();

		if (validCompletionTypes.length > 0) {
			this.canEditCompletionType = true;
			if(!this._isCurrentCompletionTypeValid(validCompletionTypes)){
				this.completionType = validCompletionTypes[0].value;
			}
		}else{
			this.canEditCompletionType = true;
		}
	}

	setCompletionType(value) {
		const newSelection = parseInt(value);
		if (!isNaN(newSelection)) {
			this.completionType = value;
		}
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
	submissionTypeOptions: observable,
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
