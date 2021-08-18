import { ActivityEvaluators } from './activity-evaluators.js';
import { ObjectStore } from '../../state/object-store.js';

export class ActivityEvaluatorsStore extends ObjectStore {
	constructor() {
		super(ActivityEvaluators);
	}

}

export default new ActivityEvaluatorsStore();
