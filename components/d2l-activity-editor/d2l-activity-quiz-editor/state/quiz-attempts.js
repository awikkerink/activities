import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizAttemptsEntity } from 'siren-sdk/src/activities/quizzes/attempts/QuizAttemptsEntity.js';

configureMobx({ enforceActions: 'observed' });

export class QuizAttempts {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.saving = null;
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
		this.attemptConditions = entity.attemptConditions();
	}

	setAttemptCondition(data) {
		this.updateProperty(() => this._entity.setAttemptCondition(data));
	}

	setAttemptsAllowed(data) {
		const newAttemptsAllowed = parseInt(data);
		const attemptsAllowed = parseInt(this.attemptsAllowed);

		// Optimistic UI: attempts allowed set to 0 or 1, clear attempt conditions
		if (newAttemptsAllowed <= 1) {
			this.updateAttemptConditions(undefined);
		}
		// Optimistic UI: remove excess attempt conditions instead of waiting for attempts entity
		else if (newAttemptsAllowed > 1 && newAttemptsAllowed < this.attemptsAllowed) {

			const slicedAttemptConditions = this.attemptConditions.slice(0, newAttemptsAllowed - 1);
			this.updateAttemptConditions(slicedAttemptConditions);

		}
		// Optimistic UI: add additional attempt conditions with no min & max values
		else if (newAttemptsAllowed > 1 && newAttemptsAllowed > this.attemptsAllowed) {
			const newAttemptConditions = [];
			for (let i = attemptsAllowed; i < newAttemptsAllowed; i++) {
				if (i === 0) continue; // skip when `0`: happens when user rapidly switches attempts allowed
				newAttemptConditions.push({ properties: { attempt: i + 1, min: null, max: null } });
			}

			if (this.attemptConditions && this.attemptConditions.length > 0) {
				const combinedAttemptConditions = this.attemptConditions.slice(0, newAttemptsAllowed - 2).concat(newAttemptConditions);

				this.updateAttemptConditions(combinedAttemptConditions);
			}
			// No attempt conditions locally, add blank attempt conditions
			if (!this.attemptConditions) {
				this.updateAttemptConditions(newAttemptConditions);
			}

		} else {
			// attempts allowed has not changed due to async jank, don't update attempt conditions
			return;
		}
		// Update local attempts allowed value finally
		this.attemptsAllowed = data;

		this.updateProperty(() => this._entity.setAttemptsAllowed(data));
		// Update the local entity with fetched attempt conditions in case of loss of permissions
		// Unless we should never update the local values in case of jank?
		// this.updateACs(this._entity.attemptConditions());
	}

	setOverallGradeCalculationType(data) {
		this.overallGradeCalculationType = data;
		this.updateProperty(() => this._entity.setOverallGradeCalculationType(data));
	}

	setRetakeIncorrectOnly(data) {
		this.isRetakeIncorrectOnly = data;
		this.updateProperty(() => this._entity.setRetakeIncorrectOnly(data));
	}

	updateAttemptConditions(attemptConditions) {
		this.attemptConditions = attemptConditions;
	}

	async updateProperty(updateFunc) {
		this.saving = updateFunc();
		const entity = await this.saving;
		this.saving = null;
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
	canUpdateAttemptsAllowed: observable,
	attemptsAllowed: observable,
	attemptsAllowedOptions: observable,
	canUpdateOverallGradeCalculation: observable,
	overallGradeCalculationType: observable,
	overallGradeCalculationOptions: observable,
	canUpdateRetakeIncorrectOnly: observable,
	isRetakeIncorrectOnly: observable,
	canUpdateAttemptConditions: observable,
	attemptConditions: observable,

	// actions
	load: action,
	setAttemptsAllowed: action,
	setOverallGradeCalculationType: action,
	setRetakeIncorrectOnly: action,
	setAttemptCondtion: action,
	updateAttemptConditions: action
});
