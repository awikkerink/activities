import { Assignment } from './assignment.js';
import { AssignmentActivityUsage } from './assignment-activity-usage.js';

export class AssignmentStore {
	constructor() {
		this.assignments = new Map();
		this.activities = new Map();
	}

	fetchAssignment(href, token, autoSave = false) {

		let assignment = this.assignments.get(href);
		if (!assignment) {
			assignment = new Assignment(href, token, autoSave);
			assignment.fetch();
			this.assignments.set(href, assignment);
		}
		return assignment;
	}

	fetchActivity(href, token, autoSave) {

		let activity = this.activities.get(href);
		if (!activity) {
			activity = new AssignmentActivityUsage(href, token, autoSave);
			activity.fetch();
			this.activities.set(href, activity);
		}
		return activity;
	}
}

export const shared = new AssignmentStore();
