import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizEntity } from 'siren-sdk/src/activities/quizzes/QuizEntity.js';

configureMobx({ enforceActions: 'observed' });

export class Quiz {
	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	get dirty() {
		return !this._entity.equals(this._makeAssignmentData());
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new QuizEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.name = entity.name();
		this.canEditName = entity.canEditName();
	}

	setName(value) {
		this.name = value;
	}
}

decorate(Quiz, {
	// props
	name: observable,
	canEditName: observable,
	// actions
	load: action,
	setName: action,
	save: action,
});
