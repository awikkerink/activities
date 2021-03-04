import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizAttemptsEntity } from 'siren-sdk/src/activities/quizzes/attempts/QuizAttemptsEntity.js';

configureMobx({ enforceActions: 'observed' });

export class QuizAttempts {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this._saving = null;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);

		if (sirenEntity) {
			const entity = new QuizAttemptsEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.canEditAttempts = entity.canUpdateAttemptsAllowed();
		this.attemptsAllowed = entity.attemptsAllowed();
		this.attemptsAllowedOptions = entity.attemptsAllowedOptions();
		this.overallGradeCalculationType = entity.overallGradeCalculationType();
		this.overallGradeCalculationOptions = entity.overallGradeCalculationOptions();
	}

	setAttemptsAllowed(data) {
		this.canUpdateAttemptsAllowed = this._entity.canUpdateAttemptsAllowed;
		this.updateProperty(() => this._entity.updateAttempts(data));

	}

	async updateProperty(updateFunc) {
		const entity = await updateFunc();
		// The siren-sdk function called to perform an action first checks that the entity has permission to do so.
		// If the entity lacks permission, the function returns `undefined`, otherwise it returns a reconstructed siren-sdk timing entity.
		// If `undefined` is returned, it likely means the UI is out of sync with the entity state, and disallowed actions can be performed.
		// In this case, we should attempt to reload the MobX object, so that the UI state is in sync again.
		if (!entity) {
			this.fetch();
			return;
		}
		this._entity = entity;
	}
}

decorate(QuizAttempts, {
	// props
	name: observable,
	canEditAttempts: observable,
	attemptsAllowed: observable,
	attemptsAllowedOptions: observable,
	overallGradeCalculationType: observable,
	overallGradeCalculationOptions: observable,

	// actions
	load: action,
	setAttemptsAllowed: action,
});
