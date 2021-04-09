import { ActivityUsage } from './activity-usage.js';
import { ObjectStore } from './object-store.js';
import { AssociateGrade } from './associate-grade.js';

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

export const shared = new ActivityStore();
export const sharedAssociateGrade = new AssociateGradeStore();
