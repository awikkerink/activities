import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizTimingEntity } from 'siren-sdk/src/activities/quizzes/timing/QuizTimingEntity.js';

configureMobx({ enforceActions: 'observed' });

export class QuizTiming {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this._saving = null;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);

		if (sirenEntity) {
			const entity = new QuizTimingEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.canEditTiming = entity.canEditTiming();
		this.isTimingEnforced = entity.isTimingEnforced();
		this.timingTypes = entity.timingTypes();
		this.submissionLateType = entity.submissionLateType();
		this.enforcedTimeLimit = entity.enforcedTimeLimit();
		this.enforcedGraceLimit = entity.enforcedGraceLimit();
		this.extendedDeadlineOptions = entity.extendedDeadlineOptions();
		this.isAutomaticZero = entity.isAutomaticZero();
		this.showClock = entity.showClock();
		this.recommendedTimeLimit = entity.recommendedTimeLimit();
		this.minRecommendedTimeLimit = entity.minRecommendedTimeLimit();
		this.maxRecommendedTimeLimit = entity.maxRecommendedTimeLimit();
		this.minEnforcedTimeLimit = entity.minEnforcedTimeLimit();
		this.maxEnforcedTimeLimit = entity.maxEnforcedTimeLimit();
		this.minEnforcedGraceLimit = entity.minEnforcedGraceLimit();
		this.maxEnforcedGraceLimit = entity.maxEnforcedGraceLimit();
	}

	async setExceededTimeLimitBehaviour(data) {
		this.isAutomaticZero = this._entity.isAutomaticZero(data);
		await this._entity.setExceededTimeLimitBehaviour(data);
		this.fetch();
	}

	async setExtendedDeadline(data) {
		await this._entity.setExtendedDeadline(data);
		this.fetch();
	}

	async setGracePeriod(data) {
		await this._entity.setGracePeriod(data);
		this.fetch();
	}

	async setTimeLimit(data) {
		await this._entity.setTimeLimit(data);
		this.fetch();
	}

	async setTimingType(data) {
		this.isTimingEnforced = this._entity.isTimingEnforced(data);
		await this._entity.setTimingType(data);
		this.fetch();
	}
}

decorate(QuizTiming, {
	// props
	name: observable,
	canEditTiming: observable,
	isTimingEnforced: observable,
	timingTypes: observable,
	submissionLateType: observable,
	enforcedTimeLimit: observable,
	enforcedGraceLimit: observable,
	extendedDeadlineOptions: observable,
	isAutomaticZero: observable,
	showClock: observable,
	recommendedTimeLimit: observable,
	minRecommendedTimeLimit: observable,
	maxRecommendedTimeLimit: observable,
	minEnforcedTimeLimit: observable,
	maxEnforcedTimeLimit: observable,
	minEnforcedGraceLimit: observable,
	maxEnforcedGraceLimit: observable,
	// actions
	load: action,
	setTimingType: action,
	setExceededTimeLimitBehaviour: action,
	setGracePeriod: action,
	setTimeLimit: action,
	setExtendedDeadline: action
});
