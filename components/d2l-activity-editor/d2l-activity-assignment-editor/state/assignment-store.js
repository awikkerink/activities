import { Assignment } from './assignment.js';
import { AssignmentActivityUsage } from './assignment-activity-usage.js';

export class AssignmentStore {
	constructor() {
		this._assignments = new Map();
		this._activities = new Map();
	}

	fetchAssignment(href, token) {

		let promise = this._assignments.get(href);
		if (!promise) {
			promise = new Promise(async(resolve) => {
				const assignment = new Assignment(href, token);
				await assignment.fetch();
				resolve(assignment);
			});
			this._assignments.set(href, promise);
		}
		return promise;
	}

	fetchActivity(href, token) {

		let promise = this._activities.get(href);
		if (!promise) {
			promise = new Promise(async(resolve) => {
				const activity = new AssignmentActivityUsage(href, token);
				await activity.fetch();
				resolve(activity);
			});
			this._activities.set(href, promise);
		}
		return promise;
	}
}

export const shared = new AssignmentStore();
