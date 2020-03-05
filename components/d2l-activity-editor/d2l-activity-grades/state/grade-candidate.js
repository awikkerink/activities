import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { GradeCandidateEntity } from 'siren-sdk/src/activities/GradeCandidateEntity.js';
import { GradeCategoryEntity } from 'siren-sdk/src/activities/GradeCategoryEntity.js';
import { GradeEntity } from 'siren-sdk/src/activities/GradeEntity.js';

configureMobx({ enforceActions: 'observed' });

export class GradeCandidate {

	constructor(gradeCandidateEntity, token) {
		this.gradeCandidateEntity = gradeCandidateEntity;
		this.token = token;
	}

	async fetch() {
		const href = this.gradeCandidateEntity.href();
		const sirenEntity = await fetchEntity(href, this.token);
		if (sirenEntity) {
			let entity;
			if (this.gradeCandidateEntity.isCategory()) {
				entity = new GradeCategoryEntity(sirenEntity, this.token, { remove: () => { } });
			} else {
				entity = new GradeEntity(sirenEntity, this.token, { remove: () => { } });
			}
			await this.load(entity);
		}
		return this;
	}

	async fetchGradeCandidate(gradeCandidateEntity) {
		const gradeCandidate = new GradeCandidate(gradeCandidateEntity, this.token);
		await gradeCandidate.fetch();
		return gradeCandidate;
	}

	async load(entity) {
		this._entity = entity;
		this.name = entity.name();
		this.isCategory = this.gradeCandidateEntity.isCategory();
		if (!this.isCategory) {
			this.baseWeight = entity.baseWeight();
			this.maxPoints = entity.maxPoints();
		}
		const gradeCandidatePromises = this.gradeCandidateEntity.getGradeCandidates().map(gc => {
			const gradeCandidateEntity = new GradeCandidateEntity(gc, this.token, { remove: () => { }});
			return this.fetchGradeCandidate(gradeCandidateEntity);
		});
		this.gradeCandidates = await Promise.all(gradeCandidatePromises);
	}
}

decorate(GradeCandidate, {
	// props
	name: observable,
	isCategory: observable,
	baseWeight: observable,
	maxPoints: observable,
	gradeCandidates: observable,
	// actions
	load: action
});
