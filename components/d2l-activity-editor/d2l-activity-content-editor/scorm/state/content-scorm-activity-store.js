import { ContentScormActivity } from './content-scorm-activity.js';
import { ObjectStore } from '../../../state/object-store.js';

export class ContentScormActivityStore {
	constructor() {
		this._contentScormActivities = new ObjectStore(ContentScormActivity);
	}

	clear() {
		this._contentScormActivities.clear();
	}

	fetchContentScormActivity(href, token) {
		return this._contentScormActivities.fetch(href, token);
	}

	getContentScormActivity(href) {
		return this._contentScormActivities.get(href);
	}

	put(href, object) {
		this._contentScormActivities.put(href, object);
	}
}

export const shared = new ContentScormActivityStore();
