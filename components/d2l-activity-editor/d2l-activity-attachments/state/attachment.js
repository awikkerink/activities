import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { AttachmentEntity } from 'siren-sdk/src/activities/AttachmentEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class Attachment {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.editing = false;
		this.creating = false;
		this.deleted = false;
		this.attachment = null;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new AttachmentEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;

		this.editing = entity.canDeleteAttachment();
		this.creating = false;
		this.deleted = false;

		this.attachment = {
			id: entity.self(),
			name: entity.name(),
			url: entity.href()
		};

		if (entity.hasClass('file')) {
			this.attachment.type = 'Document';
		}
	}

	markDeleted(deleted) {
		this.deleted = deleted;
	}
}

decorate(Attachment, {
	// props
	editing: observable,
	creating: observable,
	deleted: observable,
	attachment: observable,
	// actions
	load: action,
	markDeleted: action
});

export class LinkAttachment extends Attachment {
	initLink(name, url) {
		this.editing = true;
		this.creating = true;
		this.deleted = false;

		this.attachment = {
			id: this.href,
			name: name,
			url: url
		};
	}
}

decorate(LinkAttachment, {
	// actions
	initLink: action
});

export class GoogleDriveAttachment extends LinkAttachment {
}

export class OneDriveAttachment extends LinkAttachment {
}

export class FileAttachment extends Attachment {
	initFile(name, fileSystemType, fileId) {
		this.editing = true;
		this.creating = true;
		this.deleted = false;

		this.fileSystemType = fileSystemType;
		this.fileId = fileId;

		this.attachment = {
			id: this.href,
			name: name,
			// TODO - Need to find a way to get access to temp file URL
			url: name,
			type: 'Document'
		};
	}
}

decorate(FileAttachment, {
	// actions
	initFile: action
});

export class VideoAttachment extends FileAttachment {
}

export class AudioAttachment extends FileAttachment {
}

