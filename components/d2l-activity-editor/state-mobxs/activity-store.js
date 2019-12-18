import { observable } from 'mobx';
import { ActivityUsage } from './activity-usage.js';
import { configure as configureMobx } from 'mobx'

configureMobx({ enforceActions: 'observed' });

export class ActivityStore {
	@observable activities = observable.map();

	fetchActivity(href, token, autoSave = false) {
		if (autoSave) {
			return new ActivityUsage(href, token, autoSave);
		}
		
		let activity = this.activities.get(href);
		if (!activity) {
			activity = new ActivityUsage(href, token);
			this.activities.set(href, activity);
		}
		return activity;
	}
}