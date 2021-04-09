import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from './fetch-entity.js';
import { AssociateGradeEntity } from 'siren-sdk/src/activities/associateGrade/AssociateGradeEntity.js';

configureMobx({ enforceActions: 'observed' });

export class AssociateGrade {
	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	GradebookStatus = {
		NotInGradebook: "not-in-gradebook",
		NewGrade: "new-grade",
		ExistingGrade: "existing-grade"
	};

	async fetch(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);
		if (sirenEntity) {
			const entity = new AssociateGradeEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
	}

	setGradebookStatus(newStatus) {
		this._entity.setGradebookStatus(newStatus);
	}
}

decorate(AssociateGrade, {
	// props
	// actions
	load: action,
	setGradebookStatus: action
});