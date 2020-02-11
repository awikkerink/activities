import { Attachment } from './attachment.js';
import { AttachmentCollection } from './attachment-collection.js';
import { ObjectStore } from '../../state/object-store.js';

export class AttachmentCollectionsStore {
	constructor() {
		this._collections = new ObjectStore(AttachmentCollection);
		this._attachments = new ObjectStore(Attachment);
	}

	fetchAttachment(href, token) {
		return this._assignments.fetch(href, token);
	}

	getAttachment(href) {
		return this._attachments.get(href);
	}

	fetchCollection(href, token) {
		return this._collections.fetch(href, token);
	}

	getCollection(href) {
		return this._collections.get(href);
	}
}

export const shared = new AttachmentCollectionsStore();
