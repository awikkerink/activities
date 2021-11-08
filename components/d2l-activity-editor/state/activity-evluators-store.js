import { ObjectStore } from './object-store.js';
import { ActivityEvaluators } from './activity-evaluators.js'

export class ActivityEvaluatorsStore extends ObjectStore {

	constructor() {
		super(ActivityEvaluators);
	}
}

export const sharedEvaluators = new ActivityEvaluatorsStore();