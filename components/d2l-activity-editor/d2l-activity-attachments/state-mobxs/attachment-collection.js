import { observable, action } from 'mobx';
import { AttachmentCollectionEntity } from 'siren-sdk/src/activities/AttachmentCollectionEntity';
import { entityFactory, dispose } from 'siren-sdk/src/es6/EntityFactory.js';

export class AttachmentCollection {

	@observable canAddAttachments = false;
	@observable canAddLink = false;
	@observable canAddGoogleDriveLink = false;
	@observable canAddOneDriveLink = false;

	@observable attachments = [];

	@observable loaded = false;

	constructor(store, href, token, autoSave = false, shared = true) {
		this.store = store;
		this.href = href;
		this.token = token;
		this.autoSave = autoSave;
		this.shared = shared;
		this._entity = null;
		this._fetchEntity();
	}

	async _fetchEntity() {
		dispose(this._entity);
		this._entity = null;

		entityFactory(AttachmentCollectionEntity, this.href, this.token, (entity, error) => {
			if (entity) {
				const newEntity = this.autoSave || !this._entity ? entity : this._entity;
				if (newEntity !== this._entity) {
					this.loadCollection(newEntity);
				}
			} else {
				// TODO handle error
			}
		});
	}

	@action
	async loadCollection(entity) {
		try {
			this._entity = entity;

			this.canAddAttachments = entity.canAddAttachments();
			this.canAddLink = entity.canAddLinkAttachment();
			this.canAddGoogleDriveLink = entity.canAddGoogleDriveLinkAttachment();
			this.canAddOneDriveLink = entity.canAddOneDriveLinkAttachment();

			this.attachments = [];

			const attachments = entity.getAttachmentEntityHrefs();
			attachments.map(href => {
				this.store.fetchAttachment(href, this.token, this.autoSave, this.shared);
				this.attachments.push(href);
			});

			this.loaded = true;

		} catch (e) {
			this.loaded = true;
		}
	}


	@action
	async addLinkAttachment(name, url) {

		const newId = this.store.addNewAttachment();
		const attachment = this.store.fetchAttachment(newId);
		attachment.loadAttachment(name, url);
		this.attachments.push(newId);

		if (this.autoSave) {
			await this._entity.addLinkAttachment(name, url);
		}
	}

	async saveAttachments() {
		for (let href of this.attachments) {
			// TODO - Should we run these concurrently using an array of promises?
			// Siren action helper will still serialize them though so might not be much benefit?
			const attachment = this.store.fetchAttachment(href);
			if (attachment.deleted && !attachment.creating) {
				await attachment.delete();
			}
			if (attachment.creating && !attachment.deleted) {
				await this._entity.addLinkAttachment(attachment.attachment.name, attachment.attachment.url);
			}

			// Clean up store reference to temporary or deleted attachments
			if (attachment.creating || attachment.deleted) {
				this.store.clearAttachment(href);
			}
		}
		this._fetchEntity();
	}
}