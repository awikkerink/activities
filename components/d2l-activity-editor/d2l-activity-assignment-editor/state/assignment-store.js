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
			promise = new Promise((resolve, reject) => {
				const assignment = new Assignment(href, token);
				assignment.fetch().then(() => {
					resolve(assignment);
				}, reject);
			});
			this._assignments.set(href, promise);
		}
		return promise;
	}

	fetchActivity(href, token) {
		let promise = this._activities.get(href);
		if (!promise) {
			promise = new Promise((resolve, reject) => {
				const activity = new AssignmentActivityUsage(href, token);
				activity.fetch().then(() => {
					resolve(activity);
				}, reject);
			});
			this._activities.set(href, promise);
		}
		return promise;
	}
}

export const shared = new AssignmentStore();
