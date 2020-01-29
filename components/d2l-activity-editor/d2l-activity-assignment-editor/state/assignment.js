import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { dispose, entityFactory } from 'siren-sdk/src/es6/EntityFactory.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';

configureMobx({ enforceActions: 'observed' });

export class Assignment {

	constructor(href, token, autoSave = false) {
		this.href = href;
		this.token = token;
		this.autoSave = autoSave;
		this.loading = Promise.resolve();
	}

	async fetch() {
		dispose(this._entity);
		this._entity = null;

		let pendingResolve;
		this.loading = new Promise(resolve => {
			pendingResolve = resolve;
		});

		entityFactory(AssignmentEntity, this.href, this.token, (entity) => {
			if (entity) {
				const newEntity = this.autoSave || !this._entity ? entity : this._entity;
				if (newEntity !== this._entity) {
					this.load(newEntity);
				}
			} else {
				// TODO handle error
			}
			pendingResolve && pendingResolve();
			pendingResolve = null;
		});
	}

	async load(entity) {
		this._entity = entity;
		this.name = entity.name();
		this.canEditName = entity.canEditName();
		this.instructions = entity.instructionsEditorHtml();
		this.canEditInstructions = entity.canEditInstructions();
		this.instructionsRichTextEditorConfig = entity.instructionsRichTextEditorConfig();
	}

	setName(value) {
		this.name = value;
	}

	setInstructions(value) {
		this.instructions = value;
	}

	async save() {
		await this._entity.save({
			name: this.name,
			instructions: this.instructions
		});
		this.fetch();
	}
}

decorate(Assignment, {
	// props
	name: observable,
	canEditName: observable,
	instructions: observable,
	canEditInstructions: observable,
	instructionsRichTextEditorConfig: observable,
	// actions
	load: action,
	setName: action,
	setInstructions: action,
	save: action
});
