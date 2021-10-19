import { configure as configureMobx, decorate, observable } from 'mobx';
import { ContentMediaFileEntity } from 'siren-sdk/src/activities/content/ContentMediaFileEntity.js';
import { shared as contentFileStore } from '../../state/content-file-store.js';

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

		if (sirenEntity) {
			const entity = new ContentMediaFileEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}

		return this;
	}

	load(mediaFileEntity) {
        this._mediaFileEntity = mediaFileEntity;
        this.isMediaEmbedded = mediaFileEntity.embedMedia();
	}

	async save() {
		if (!this._mediaFileEntity) {
			return;
		}

		await contentFileStore.getContentFileActivity(this.fileHrefTest).save();
		return this._mediaFileEntity;
	}
}

decorate(ContentMediaFile, {
	// props
	isMediaEmbedded: observable
});
