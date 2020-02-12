import { Attachment } from './attachment.js';
import { ObjectStore } from '../../state/object-store.js';

export class AttachmentStore extends ObjectStore {
	constructor() {
		super(Attachment);
	}
}

export const shared = new AttachmentStore();
