import { AttachmentCollection } from './attachment-collection.js';
import { ObjectStore } from '../../state/object-store.js';

export class AttachmentCollectionsStore extends ObjectStore {
	constructor() {
		super(AttachmentCollection);
	}
}

export const shared = new AttachmentCollectionsStore();
