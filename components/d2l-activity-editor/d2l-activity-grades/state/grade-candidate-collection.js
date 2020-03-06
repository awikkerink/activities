import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { GradeCandidate } from './grade-candidate.js';
import { GradeCandidateCollectionEntity } from 'siren-sdk/src/activities/GradeCandidateCollectionEntity.js';
import { GradeCandidateEntity } from 'siren-sdk/src/activities/GradeCandidateEntity.js';

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

	async fetchGradeCandidate(gradeCandidateEntity) {
		const gradeCandidate = new GradeCandidate(gradeCandidateEntity, this.token);
		await gradeCandidate.fetch();
		return gradeCandidate;
	}

	async load(entity) {
		this._entity = entity;
		const gradeCandidatePromises = entity.getGradeCandidates().map(gc => {
			const gradeCandidateEntity = new GradeCandidateEntity(gc, this.token, { remove: () => { }});
			return this.fetchGradeCandidate(gradeCandidateEntity);
		});
		this.gradeCandidates = await Promise.all(gradeCandidatePromises);
		this.selected = this._findCurrentAssociation(this.gradeCandidates) || this._findFirstGradeItemFromCandidates(this.gradeCandidates);
	}

	setSelected(href) {
		this.selected = this._findGradeCandidate(href, this.gradeCandidates);
	}

	_findGradeCandidate(href, gradeCandidates) {
		for (const gc of gradeCandidates) {
			if (href === gc.href) {
				return gc;
			}
			const findGradeCandidate = this._findGradeCandidate(href, gc.gradeCandidates);
			if (findGradeCandidate) {
				return findGradeCandidate;
			}
		}
	}

	_findCurrentAssociation(gradeCandidates) {
		for (const gc of gradeCandidates) {
			if (gc.isCurrentAssociation) {
				return gc;
			}
			const currentAssociation = this._findCurrentAssociation(gc.gradeCandidates);
			if (currentAssociation) {
				return currentAssociation;
			}
		}
	}

	_findFirstGradeItemFromCandidates(gradeCandidates) {
		for (const gc of gradeCandidates) {
			if (!gc.isCategory) {
				return gc;
			}
			return this._findFirstGradeItemFromCandidates(gc.gradeCandidates);
		}
	}
}

decorate(GradeCandidateCollection, {
	// props
	gradeCandidates: observable,
	selected: observable,
	// actions
	load: action,
	setSelected: action
});