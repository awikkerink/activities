import { observable, action } from 'mobx';
import { AttachmentEntity } from 'siren-sdk/src/activities/AttachmentEntity';
import { entityFactory, dispose } from 'siren-sdk/src/es6/EntityFactory.js';

export class Attachment {

	@observable loaded = false;
	@observable attachment = {};
	@observable editing = false;
	@observable deleted = false;

	constructor(href, token, autoSave = false) {
		this.href = href;
		this.token = token;
		this.autoSave = autoSave;
		this._fetchEntity();
	}

	async _fetchEntity() {
		dispose(this._entity);

		entityFactory(AttachmentEntity, this.href, this.token, (entity, error) => {
			if (entity) {
				const newEntity = this.autoSave || !this._entity ? entity : this._entity;
				if (newEntity !== this._entity) {
					this.loadAttachment(newEntity);
				}
			} else {
				// TODO handle error
			}
		});
	}

	@action
	async loadAttachment(entity) {
		try {
			this._entity = entity;
			this.editing = entity.canDeleteAttachment();
			this.attachment = {
				id: entity.href(),
				name: entity.name(),
				url: entity.href()
			}
			this.loaded = true;
		} catch (e) {
			this.loaded = true;
		}
	}

	@action
	async deleteAttachment(deleted) {
		this.deleted = deleted;

		if (this.autoSave && deleted) {
			await this._entity.deleteAttachment();
		}
	}
}