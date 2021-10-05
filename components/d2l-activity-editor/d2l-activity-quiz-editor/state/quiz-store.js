import { ObjectStore } from '../../state/object-store.js';
import { Quiz } from './quiz.js';
import { QuizAttempts } from './quiz-attempts.js';
import { QuizIpRestrictions } from './quiz-ipRestrictions.js';
import { QuizTiming } from './quiz-timing.js';
import { QuizSubmissionViews } from './quiz-submission-views.js';

export class QuizStore extends ObjectStore {
	constructor() {
		super(Quiz);
	}
}

export class QuizIpRestrictionsStore extends ObjectStore {
	constructor() {
		super(QuizIpRestrictions);
	}
}
export class QuizTimingStore extends ObjectStore {
	constructor() {
		super(QuizTiming);
	}
}

export class QuizAttemptsStore extends ObjectStore {
	constructor() {
		super(QuizAttempts);
	}
}

export class QuizSubmissionViewsStore extends ObjectStore {
	constructor() {
		super(QuizSubmissionViews);
	}
}

export const shared = new QuizStore();
export const sharedIpRestrictions = new QuizIpRestrictionsStore();
export const sharedTiming = new QuizTimingStore();
export const sharedAttempts = new QuizAttemptsStore();
export const sharedSubmissionViews = new QuizSubmissionViewsStore();
