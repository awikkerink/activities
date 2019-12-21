import { AttachmentCollection } from './attachment-collection.js';
import { Attachment } from './attachment.js';

import { configure as configureMobx } from 'mobx'

configureMobx({ enforceActions: 'observed' });

export class AttachmentCollectionsStore {
	collections = new Map();
	attachments = new Map();

	fetchCollection(href, token, autoSave=false, shared=true) {

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
			return new AttachmentCollection(this, href, token, autoSave, shared);
		}

		let collection = this.collections.get(href);
		if (!collection) {
			collection = new AttachmentCollection(this, href, token, autoSave, shared);
			this.collections.set(href, collection);
		}
		return collection;
	}

	fetchAttachment(href, token, autoSave = false, shared = true) {
		if (!shared) {
			return new Attachment(href, token, autoSave);
		}

		let attachment = this.attachments.get(href);
		if (!attachment) {
			attachment = new Attachment(href, token, autoSave);
			this.attachments.set(href, attachment);
		}
		return attachment;
	}
}