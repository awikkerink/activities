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
	}

	async save() {
		// TODO - save props
		this.fetch();
	}
}

decorate(Assignment, {
	// props
	name: observable,
	// actions
	load: action,
	save: action
});
