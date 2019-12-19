import { observable } from 'mobx';
import { ActivityUsage } from './activity-usage.js';
import { configure as configureMobx } from 'mobx'

configureMobx({ enforceActions: 'observed' });

export class ActivityStore {
	@observable activities = observable.map();

	fetchActivity(href, token, autoSave=false, shared=true) {

		// TODO Think about whether it makes sense to support shared vs autosave
		// Might need to consider scenarios where some
		// components want autosave and others don't and potentially the shared
		// activities store would need to be keyed on autoSave too
		// The advantage of using sharing with autosave is that if you have different
		// parts of your UI that show the same info, then the component that just renders
		// the data can show the updated data immediately without having to wait for the API call
		// to return.
		// Also it probably doesnt make sense to have shared=false and autoSave=false unless the
		// editor using those settings implements a save handler.
		if (!shared) {
			return new ActivityUsage(href, token, autoSave);
		}

		let activity = this.activities.get(href);
		if (!activity) {
			activity = new ActivityUsage(href, token, autoSave);
			this.activities.set(href, activity);
		}
		return activity;
	}
}