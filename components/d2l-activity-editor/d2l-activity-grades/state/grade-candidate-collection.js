import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { GradeCandidate } from './grade-candidate.js';
import { GradeCandidateCollectionEntity } from 'siren-sdk/src/activities/GradeCandidateCollectionEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class GradeCandidateCollection {

	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new GradeCandidateCollectionEntity(sirenEntity, this.token, { remove: () => { } });
			await this.load(entity);
		}
		return this;
	}

	async fetchGradeCandidate(href, gradeCandidateChildrenHrefs) {
		const gradeCandidate = new GradeCandidate(href, this.token, gradeCandidateChildrenHrefs);
		await gradeCandidate.fetch();
		return gradeCandidate;
	}

	async load(entity) {
		this._entity = entity;
		const gradeCandidateHrefs = entity.getGradeCandidateHrefs();
		const gradeCandidatePromises = gradeCandidateHrefs.map(href => {
			const gradeCandidateChildrenHrefs = entity.getGradeCandidatesForCategory(href);
			return this.fetchGradeCandidate(href, gradeCandidateChildrenHrefs);
		});
		this.gradeCandidates = await Promise.all(gradeCandidatePromises);
	}
}

decorate(GradeCandidateCollection, {
	// props
	gradeCandidates: observable,
	// actions
	load: action
});
