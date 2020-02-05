import { Assignment } from './assignment.js';
import { AssignmentActivityUsage } from './assignment-activity-usage.js';
import { ObjectStore } from '../../state/object-store.js';

export class AssignmentStore {
	constructor() {
		this._assignments = new ObjectStore(Assignment);
		this._activities = new ObjectStore(AssignmentActivityUsage);
	}

	fetchAssignment(href, token) {
		return this._assignments.fetch(href, token);
	}

	getAssignment(href, token) {
		return this._assignments.get(href, token);
	}

	fetchActivity(href, token) {
		return this._activities.fetch(href, token);
	}

	getActivity(href, token) {
		return this._activities.get(href, token);
	}
}

export const shared = new AssignmentStore();
