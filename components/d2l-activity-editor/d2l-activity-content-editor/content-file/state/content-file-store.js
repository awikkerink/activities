import { ContentFile } from './content-file.js';
import { ObjectStore } from '../../../state/object-store.js';

export class ContentFileStore {
	constructor() {
		this._contentFiles = new ObjectStore(ContentFile);
	}

	clear() {
		this._contentFiles.clear();
	}

	fetchContentFileActivity(href, token) {
		return this._contentFiles.fetch(href, token);
	}

	getContentFileActivity(href) {
		return this._contentFiles.get(href);
	}

	put(href, object) {
		this._contentFiles.put(href, object);
	}
}

export const shared = new ContentFileStore();
