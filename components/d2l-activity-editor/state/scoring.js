import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from './fetch-entity.js';
import { ScoringEntity } from 'siren-sdk/src/activities/ScoringEntity.js';

configureMobx({ enforceActions: 'observed' });

export class Scoring {
	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async dirty() {
		return !this._entity.equals(this._makeEntityData());
	}

	async fetch(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);

		if (sirenEntity) {
			const entity = new ScoringEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			await this.load(entity);
		}
		return this;
	}

	async load(entity) {
		this._entity = entity;
		this.scoreOutOf = entity.scoreOutOf();
		this.gradeMaxPoints = entity.gradeMaxPoints();
		this.canUpdateScoring = entity.canUpdateScoring();
	}

	async save() {
		if (!this._entity) {
			return;
		}

		await this._entity.save(this._makeEntityData());
		await this.fetch();
	}

	setGradeMaxPoints(score) {
		this.gradeMaxPoints = score;
	}

	setNewGradeName(name) {
		this.newGradeName = name;
	}

	_makeEntityData() {
		return {
			gradeMaxPoints: this.gradeMaxPoints
		};
	}
}

decorate(Scoring, {
	// props
	scoreOutOf: observable,
	gradeMaxPoints: observable,
	canUpdateScoring: observable,
	newGradeName: observable,
	// actions
	load: action,
	setGradeMaxPoints: action,
	setNewGradeName: action
});
