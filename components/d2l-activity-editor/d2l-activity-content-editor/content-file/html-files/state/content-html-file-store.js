import { ContentHtmlFile } from './content-html-file.js';
import { ObjectStore } from '../../../../state/object-store.js';

export class ContentHtmlFileStore {
	constructor() {
		this._contentHtmlFiles = new ObjectStore(ContentHtmlFile);
	}

	clear() {
		this._contentHtmlFiles.clear();
	}

	fetchContentHtmlFileActivity(href, token) {
		return this._contentHtmlFiles.fetch(href, token);
	}

	getContentHtmlFileActivity(href) {
		return this._contentHtmlFiles.get(href);
	}

	put(href, object) {
		this._contentHtmlFiles.put(href, object);
	}
}

export const shared = new ContentHtmlFileStore();
