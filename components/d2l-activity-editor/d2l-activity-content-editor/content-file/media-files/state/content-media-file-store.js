import { ContentMediaFile } from './content-media-file.js';
import { ObjectStore } from '../../../../state/object-store.js';

export class ContentMediaFileStore {
	constructor() {
		this._contentMediaFiles = new ObjectStore(ContentMediaFile);
	}

	clear() {
		this._contentMediaFiles.clear();
	}

	fetchContentMediaFileActivity(href, token) {
		return this._contentMediaFiles.fetch(href, token);
	}

	getContentMediaFileActivity(href) {
		return this._contentMediaFiles.get(href);
	}

	put(href, object) {
		this._contentMediaFiles.put(href, object);
	}
}

export const shared = new ContentMediaFileStore();
