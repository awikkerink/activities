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
		this.scoreOutOf = entity.gradeMaxPoints() ? entity.gradeMaxPoints() : entity.scoreOutOf();
		this.totalPoints = entity.scoreOutOf();
		this.canUpdateScoring = entity.canUpdateScoring();
	}

	async save() {
		if (!this._entity) {
			return;
		}

		await this._entity.save(this._makeEntityData());
		await this.fetch();
	}

	setNewGradeName(name) {
		this.newGradeName = name;
	}

	setScoreOutOf(score) {
		this.scoreOutOf = score;
	}

	_makeEntityData() {
		return {
			scoreOutOf: this.scoreOutOf
		};
	}
}

decorate(Scoring, {
	// props
	scoreOutOf: observable,
	totalPoints: observable,
	canUpdateScoring: observable,
	newGradeName: observable,
	// actions
	load: action,
	setScoreOutOf: action,
	setNewGradeName: action
});
