import { action, configure, observable } from 'mobx';
import { ActivityUsage } from './activity-usage.js';

export class ActivityStore {
	constructor() {
		this._fetches = new Map();
		this._activities = observable.map();
	}

	fetchActivity(href, token) {
		let promise = this._fetches.get(href);
		if (!promise) {
			const activity = new ActivityUsage(href, token);
			promise = activity.fetch();
			this._fetches.set(href, promise);
			promise.then(action(() => {
				this._activities.set(href, activity);
			}), () => {});
		}
		return promise;
	}

	getActivity(href) {
		return this._activities.get(href);
	}
}

configure(ActivityStore, {
	// properties
	_activities: observable,
	// actions
	fetchActivity: action
});

export const shared = new ActivityStore();
