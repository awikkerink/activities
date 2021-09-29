import { ActivityUsage } from './activity-usage.js';
import { AssociateGrade } from './associate-grade.js';
import { ObjectStore } from './object-store.js';
import { Scoring } from './scoring.js';

export class ActivityStore extends ObjectStore {
	constructor() {
		super(ActivityUsage);
	}
}

export class AssociateGradeStore extends ObjectStore {
	constructor() {
		super(AssociateGrade);
	}
}

export class ScoringStore extends ObjectStore {
	constructor() {
		super(Scoring);
	}
}

export const shared = new ActivityStore();
export const sharedAssociateGrade = new AssociateGradeStore();
export const sharedScoring = new ScoringStore();
