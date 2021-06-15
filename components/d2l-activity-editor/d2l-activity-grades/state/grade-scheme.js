import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { GradeSchemeEntity } from 'siren-sdk/src/activities/associateGrade/GradeSchemeEntity.js';

configureMobx({ enforceActions: 'observed' });

export class GradeScheme {

	constructor(gradeSchemeLinkedEntity, token) {
		this.gradeSchemeLinkedEntity = gradeSchemeLinkedEntity;
		this.token = token;
	}

	async fetch() {
		const href = this.gradeSchemeLinkedEntity.href();
		let sirenEntity;
		if (href) {
			sirenEntity = await fetchEntity(href, this.token);
		}
		if (sirenEntity) {
			const entity = new GradeSchemeEntity(sirenEntity, this.token, { remove: () => { } });
			await this.load(entity);
		}
		return this;
	}

	async load(entity) {
		this.href = this.gradeSchemeLinkedEntity.href();
		this._entity = entity;
		this.name = entity.name();
	}
}

decorate(GradeScheme, {
	// props
	name: observable,
	// actions
	load: action
});
