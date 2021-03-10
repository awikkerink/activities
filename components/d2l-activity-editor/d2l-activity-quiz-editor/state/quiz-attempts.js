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
		this.canUpdateAttemptsAllowed = entity.canUpdateAttemptsAllowed();
		this.attemptsAllowed = entity.attemptsAllowed();
		this.attemptsAllowedOptions = entity.attemptsAllowedOptions();
		this.canUpdateOverallGradeCalculation = entity.canUpdateOverallGradeCalculation();
		this.overallGradeCalculationType = entity.overallGradeCalculationType();
		this.overallGradeCalculationOptions = entity.overallGradeCalculationOptions();
		this.canUpdateRetakeIncorrectOnly = entity.canUpdateRetakeIncorrectOnly();
		this.isRetakeIncorrectOnly = entity.isRetakeIncorrectOnly();
	}

	setAttemptsAllowed(data) {
		this.canUpdateAttemptsAllowed = this._entity.canUpdateAttemptsAllowed;
		this.attemptsAllowed = data;
		this.updateProperty(() => this._entity.setAttemptsAllowed(data));
	}

	setOverallGradeCalculationType(data) {
		this.canUpdateOverallGradeCalculation = this._entity.canUpdateOverallGradeCalculation;
		this.overallGradeCalculationType = data;
		this.updateProperty(() => this._entity.setOverallGradeCalculationType(data));
	}

	setRetakeIncorrectOnly(data) {
		this.canUpdateRetakeIncorrectOnly = this._entity.canUpdateRetakeIncorrectOnly;
		this.isRetakeIncorrectOnly = data;
		this.updateProperty(() => this._entity.setRetakeIncorrectOnly(data));
	}

	async updateProperty(updateFunc) {
		const entity = await updateFunc();
		// The siren-sdk function called to perform an action first checks that the entity has permission to do so.
		// If the entity lacks permission, the function returns `undefined`, otherwise it returns a reconstructed siren-sdk attempts entity.
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
	canUpdateAttemptsAllowed: observable,
	attemptsAllowed: observable,
	attemptsAllowedOptions: observable,
	canUpdateOverallGradeCalculation: observable,
	overallGradeCalculationType: observable,
	overallGradeCalculationOptions: observable,
	canUpdateRetakeIncorrectOnly: observable,
	isRetakeIncorrectOnly: observable,

	// actions
	load: action,
	setAttemptsAllowed: action,
	setOverallGradeCalculationType: action,
	setRetakeIncorrectOnly: action
});
