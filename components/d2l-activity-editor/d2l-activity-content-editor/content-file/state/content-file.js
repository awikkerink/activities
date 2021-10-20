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
		this.fileType = null;

		//html
		this.persistedFileContent = '';
		this.htmlFileContent = '';
		this.htmlTemplatesHref = null;
		this.fontSize = null;

		//media
		this.isMediaEmbedded = false;
	}

	async cancelCreate() {
		await this._contentFileEntity.deleteFile();
	}

	get dirty() {
		return !(this._contentFileEntity.equals(this._makeContentFileData()) && this._contentEquals());
	}

	get empty() {
		let innerHtml = this.htmlFileContent.substring(this.htmlFileContent.indexOf('<body') + 5, this.htmlFileContent.indexOf('</body>'));
		innerHtml = innerHtml.substring(innerHtml.indexOf('>') + 1);
		return (/^([\s\n]|[<p>(&nbsp;)*</p>])*$/g.test(innerHtml));
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);

		if(!sirenEntity) {
			return this;
		}
	
		let entity = new ContentFileEntity(sirenEntity, this.token, { remove: () => { } });
		entity = await this._checkout(entity);
		
		const fileEntityHref = entity.getFileHref();
		let htmlFileContent = '';

		if (entity.getFileType() === FILE_TYPES.html && fileEntityHref) {
			const fileEntityResponse = await fetchEntity(fileEntityHref, this.token);
			const fileEntity = new FileEntity(fileEntityResponse, this.token, { remove: () => { } });
			const fileContentFetchResponse = await window.d2lfetch.fetch(fileEntity.getFileDataLocationHref());

			if (fileContentFetchResponse.ok) {
				htmlFileContent = await fileContentFetchResponse.text();
			}
		}

		this.load(entity, htmlFileContent);
		return this;
	}

	load(contentFileEntity, htmlFileContent) {
		this._contentFileEntity = contentFileEntity;
		this.href = contentFileEntity.self();
		this.activityUsageHref = contentFileEntity.getActivityUsageHref();
		this.title = contentFileEntity.title();
		this.persistedFileContent = htmlFileContent;
		this.fileContent = htmlFileContent;
		this.fileType = contentFileEntity.getFileType();
		this.fileHref = contentFileEntity.getFileHref();

		if (this.fileType === FILE_TYPES.html) {
			const htmlFileEntity = new ContentHtmlFileEntity(contentFileEntity._entity, this.token, { remove: () => { } });
			this.htmlTemplatesHref = htmlFileEntity.getHtmlTemplatesHref();
			this.fontSize = htmlFileEntity.fontSize();
		} else if (this.fileType=== FILE_TYPES.audio || this.fileType === FILE_TYPES.video) {
			const mediaFileEntity = new ContentMediaFileEntity(contentFileEntity._entity, this.token, { remove: () => { } });
			this.isMediaEmbedded = mediaFileEntity.embedMedia();
		}
	}

	async saveHtmlFile() {
		if (!this._contentFileEntity) {
			return;
		}

		const htmlEntity = new ContentHtmlFileEntity(this._contentFileEntity, this.token, { remove: () => { } });
		await htmlEntity.setHtmlFileHtmlContent(this.htmlFileContent);
		return this._contentFileEntity;
	}

	async saveMediaFile() {
		if (!this._contentFileEntity) {
			return;
		}
		return this._contentFileEntity;
	}

	async saveFile() {
		if (!this._contentFileEntity) {
			return;
		}

		await this._contentFileEntity.setFileTitle(this.title);
		const committedContentFileEntity = await this._commit(this._contentFileEntity);
		const editableContentFileEntity = await this._checkout(committedContentFileEntity);

		this.load(editableContentFileEntity, this.htmlFileContent);
		return this._contentFileEntity;
	}

	setPageContent(pageContent) {
		this.htmlFileContent = pageContent;
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

	_contentEquals() {
		/* This check stops the discard dialog from appearing when no content
			is added to the editor but it was clicked in. Faster than stripping
			the html, body, etc. tags added by the new html editor
		*/
		if (this.persistedFileContent === '' && this.empty) {
			return true;
		}

		return this.persistedFileContent === this.htmlFileContent;
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
