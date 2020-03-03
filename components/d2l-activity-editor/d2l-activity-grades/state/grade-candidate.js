import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { GradeCandidateEntity } from 'siren-sdk/src/activities/GradeCandidateEntity.js';

configureMobx({ enforceActions: 'observed' });

export class GradeCandidate {

	constructor(href, token, gradeCandidateChildrenHrefs) {
		this.href = href;
		this.token = token;
		this.gradeCandidateChildrenHrefs = gradeCandidateChildrenHrefs;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new GradeCandidateEntity(sirenEntity, this.token, { remove: () => { } });
			await this.load(entity);
		}
		return this;
	}

	async fetchGradeCandidate(href) {
		const gradeCandidate = new GradeCandidate(href, this.token, null);
		await gradeCandidate.fetch();
		return gradeCandidate;
	}

	async load(entity) {
		this._entity = entity;
		this.name = entity.name();
		this.isCategory = entity.isCategory();
		this.baseWeight = entity.baseWeight();
		this.maxPoints = entity.maxPoints();
		const gradeCandidatePromises = (this.gradeCandidateChildrenHrefs || []).map(href => this.fetchGradeCandidate(href));
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
