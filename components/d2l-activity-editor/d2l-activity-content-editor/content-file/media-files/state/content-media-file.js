import { configure as configureMobx, decorate, observable } from 'mobx';
import { ContentMediaFileEntity } from 'siren-sdk/src/activities/content/ContentMediaFileEntity.js';
import { shared as contentFileStore } from '../../state/content-file-store.js';
import { fetchEntity } from '../../../../state/fetch-entity.js';
import { FileEntity } from 'siren-sdk/src/files/FileEntity.js';

configureMobx({ enforceActions: 'observed' });

export class ContentMediaFile {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.isMediaEmbedded = false;
		this._mediaFileEntity = null;
	}

	async cancelCreate() {
		await this._contentFileEntity.deleteFile();
	}

	async fetch() {
		const sirenEntity = contentFileStore.getContentFileActivity(this.href)._contentFileEntity._entity;

		if (!sirenEntity) {
			return this;
		}

		const mediaFileEntity = new ContentMediaFileEntity(sirenEntity, this.token, { remove: () => { } });
		const mediaFileEntityHref = mediaFileEntity.getFileHref();

		if(!mediaFileEntityHref) {
			return this;
		}

		const fileEntityResponse = await fetchEntity(mediaFileEntityHref, this.token);
		const fileEntity = new FileEntity(fileEntityResponse, this.token, { remove: () => { } });
        const fileLocationHref = fileEntity.getFileLocationHref();

		this.load(mediaFileEntity, fileLocationHref);
		return this;
	}

	load(mediaFileEntity, fileLocationHref) {
        this._mediaFileEntity = mediaFileEntity;
        this.isMediaEmbedded = mediaFileEntity.embedMedia();
		this.fileLocationHref = fileLocationHref;
	}

	async save() {
		if (!this._mediaFileEntity) {
			return;
		}

		return this._mediaFileEntity;
	}
}
