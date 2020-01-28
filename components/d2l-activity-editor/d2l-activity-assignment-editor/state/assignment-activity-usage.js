import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { dispose, entityFactory } from 'siren-sdk/src/es6/EntityFactory.js';
import { AssignmentActivityUsageEntity } from 'siren-sdk/src/activities/assignments/AssignmentActivityUsageEntity.js';

configureMobx({ enforceActions: 'observed' });

export class AssignmentActivityUsage {

	constructor(href, token, autoSave = false) {
		this.href = href;
		this.token = token;
		this.autoSave = autoSave;
		this.assignmentHref = '';
		this.loading = Promise.resolve();
	}

	fetch() {
		dispose(this._entity);
		this._entity = null;

		let pendingResolve;
		this.loading = new Promise((resolve) => {
			pendingResolve = resolve;
		});

		entityFactory(AssignmentActivityUsageEntity, this.href, this.token, (entity) => {
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
		this.assignmentHref = entity.assignmentHref();
	}
}

decorate(AssignmentActivityUsage, {
	// props
	assignmentHref: observable,
	// actions
	load: action
});
