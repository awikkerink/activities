import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { ContentFileEntity, FILE_TYPES } from 'siren-sdk/src/activities/content/ContentFileEntity.js';
import { ContentHtmlFileEntity } from 'siren-sdk/src/activities/content/ContentHtmlFileEntity.js';
import { ContentMediaFileEntity } from 'siren-sdk/src/activities/content/ContentMediaFileEntity.js';
import { fetchEntity } from '../../../state/fetch-entity.js';
import { FileEntity } from 'siren-sdk/src/files/FileEntity.js';
// TODO: Explore idea of using this shared WorkingCopy
// import { WorkingCopy } from '../../../state/working-copy.js';

configureMobx({ enforceActions: 'observed' });

export class ContentFile {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.title = '';
		this.activityUsageHref = '';
		this.persistedFileContent = '';
		this.fileContent = '';
		this.fileType = null;
		this.htmlTemplatesHref = null;
		this.fontSize = null;
		this.isMediaEmbedded = false;
		this._mediaFileEntity = null;
	}

	async cancelCreate() {
		await this._contentFileEntity.deleteFile();
	}

	get dirty() {
		return !(this._contentFileEntity.equals(this._makeContentFileData()));
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			let entity = new ContentFileEntity(sirenEntity, this.token, { remove: () => { } });
			let fileContent = '';

			entity = await this._checkout(entity);

			const fileEntityHref = entity.getFileHref();
			if (entity.getFileType() === FILE_TYPES.html && fileEntityHref) {
				const fileEntityResponse = await fetchEntity(fileEntityHref, this.token);
				const fileEntity = new FileEntity(fileEntityResponse, this.token, { remove: () => { } });
				const fileContentFetchResponse = await window.d2lfetch.fetch(fileEntity.getFileDataLocationHref());
				if (fileContentFetchResponse.ok) {
					fileContent = await fileContentFetchResponse.text();
				}
			}

			this.load(entity, fileContent);
		}
		return this;
	}

	load(contentFileEntity, fileContent) {
		this._contentFileEntity = contentFileEntity;
		this.href = contentFileEntity.self();
		this.activityUsageHref = contentFileEntity.getActivityUsageHref();
		this.title = contentFileEntity.title();
		this.persistedFileContent = fileContent;
		this.fileContent = fileContent;
		this.fileType = contentFileEntity.getFileType();
		this.fileHref = contentFileEntity.getFileHref();

		if (this.fileType === FILE_TYPES.html) {
			const htmlFileEntity = new ContentHtmlFileEntity(contentFileEntity._entity, this.token, { remove: () => { } });
			this.htmlTemplatesHref = htmlFileEntity.getHtmlTemplatesHref();
			this.fontSize = htmlFileEntity.fontSize();
		}

		if(this.fileType=== FILE_TYPES.audio || this.fileType === FILE_TYPES.media) {
			const mediaFileEntity = new ContentMediaFileEntity(contentFileEntity, this.token, { remove: () => { } });
			this.isMediaEmbedded = mediaFileEntity.embedMedia();;
			this._mediaFileEntity = mediaFileEntity.getFileHref();;
		}
	}

	async saveHtmlFile() {
		if (!this._contentFileEntity) {
			return;
		}

		const htmlEntity = new ContentHtmlFileEntity(this._contentFileEntity, this.token, { remove: () => { } });
		await htmlEntity.setHtmlFileHtmlContent(this.fileContent);
	}

	async saveMediaFile() {
		if (!this._contentFileEntity) {
			return;
		}
	}

	async save() {
		if (!this._contentFileEntity) {
			return;
		}

		await this._contentFileEntity.setFileTitle(this.title);
		const committedContentFileEntity = await this._commit(this._contentFileEntity);
		const editableContentFileEntity = await this._checkout(committedContentFileEntity);
		
		this.load(editableContentFileEntity, this.fileContent);
	}

	setPageContent(pageContent) {
		this.fileContent = pageContent;
	}

	setTitle(value) {
		this.title = value;
	}

	async _checkout(contentFileEntity) {
		if (!contentFileEntity) {
			return;
		}

		const sirenEntity = await contentFileEntity.checkout();
		if (!sirenEntity) {
			return contentFileEntity;
		}

		return new ContentFileEntity(sirenEntity, this.token, { remove: () => { } });
	}

	async _commit(contentFileEntity) {
		if (!contentFileEntity) {
			return;
		}

		const sirenEntity = await contentFileEntity.commit();
		if (!sirenEntity) {
			return contentFileEntity;
		}

		return new ContentFileEntity(sirenEntity, this.token, { remove: () => { } });
	}

	_makeContentFileData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
			The cancel workflow is making use of that to detect changes.
		*/
		return {
			title: this.title,
			fileHref: this.fileHref,
		};
	}
}

decorate(ContentFile, {
	// props
	title: observable,
	fileHref: observable,
	// actions
	load: action,
	setTitle: action,
});