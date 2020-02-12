import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { AttachmentCollectionEntity } from 'siren-sdk/src/activities/AttachmentCollectionEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class AttachmentCollection {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.attachments = [];
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new AttachmentCollectionEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;

		this.canAddAttachments = entity.canAddAttachments();
		this.canAddLink = entity.canAddLinkAttachment();
		this.canAddFile = entity.canAddFileAttachment();
		this.canAddGoogleDriveLink = entity.canAddGoogleDriveLinkAttachment();
		this.canAddOneDriveLink = entity.canAddOneDriveLinkAttachment();
		this.canRecordVideo = entity.canAddVideoNoteAttachment();
		this.canRecordAudio = entity.canAddAudioNoteAttachment();

		this.attachments = entity.getAttachmentEntityHrefs() || [];
	}

	setCanAddAttachments(value) {
		this.canAddAttachments = value;
	}

	setCanAddFile(value) {
		this.canAddFile = value;
	}

	setCanAddLink(value) {
		this.canAddLink = value;
	}

	setCanAddGoogleDriveLink(value) {
		this.canAddGoogleDriveLink = value;
	}

	setCanAddOneDriveLink(value) {
		this.canAddOneDriveLink = value;
	}

	setCanRecordVideo(value) {
		this.canAddRecordVideo = value;
	}

	setCanRecordAudio(value) {
		this.canRecordAudio = value;
	}

	setAttachments(attachments) {
		this.attachments = attachments;
	}
}

decorate(AttachmentCollection, {
	// props
	canAddAttachments: observable,
	canAddLink: observable,
	canAddFile: observable,
	canAddGoogleDriveLink: observable,
	canAddOneDriveLink: observable,
	canRecordVideo: observable,
	canRecordAudio: observable,
	attachments: observable,
	// actions
	load: action,
	setCanAddAttachments: action,
	setCanAddFile: action,
	setCanAddLink: action,
	setCanAddGoogleDriveLink: action,
	setCanAddOneDriveLink: action,
	setCanRecordVideo: action,
	setCanRecordAudio: action,
	setAttachments: action,
});
