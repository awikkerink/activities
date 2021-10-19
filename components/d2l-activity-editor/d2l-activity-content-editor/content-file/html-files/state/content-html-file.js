import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { ContentFileEntity} from 'siren-sdk/src/activities/content/ContentFileEntity.js';
import { ContentFile } from '../../state/content-file.js'
import { ContentHtmlFileEntity } from 'siren-sdk/src/activities/content/ContentHtmlFileEntity.js';
import { fetchEntity } from '../../../../state/fetch-entity.js';
import { FileEntity } from 'siren-sdk/src/files/FileEntity.js';
import { shared as contentFileStore } from '../../state/content-file-store.js';

// TODO: Explore idea of using this shared WorkingCopy
// import { WorkingCopy } from '../../../state/working-copy.js';

configureMobx({ enforceActions: 'observed' });

export class ContentHtmlFile {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.activityUsageHref = '';
		this.persistedFileContent = '';
		this.fileContent = '';
		this.htmlTemplatesHref = null;
		this.fontSize = null;
		this.fileHrefTest = null;
	}

	async cancelCreate() {
		await this._contentFileEntity.deleteFile();
	}

	get dirty() {
		return !(this._contentEquals());
	}

	get empty() {
		let innerHtml = this.fileContent.substring(this.fileContent.indexOf('<body') + 5, this.fileContent.indexOf('</body>'));
		innerHtml = innerHtml.substring(innerHtml.indexOf('>') + 1);
		return (/^([\s\n]|[<p>(&nbsp;)*</p>])*$/g.test(innerHtml));
	}

	async fetch() {
		const sirenEntity = contentFileStore.getContentFileActivity(this.href)._contentFileEntity._entity;

		this.fileHrefTest = this.href;

		if (sirenEntity) {
			let entity = new ContentFileEntity(sirenEntity, this.token, { remove: () => { } });
			let fileContent = '';
			const fileEntityHref = entity.getFileHref();

			if (fileEntityHref) {
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
		this.persistedFileContent = fileContent;
		this.fileContent = fileContent;
		this.fileHref = contentFileEntity.getFileHref();
		const htmlFileEntity = new ContentHtmlFileEntity(contentFileEntity._entity, this.token, { remove: () => { } });
		this.htmlTemplatesHref = htmlFileEntity.getHtmlTemplatesHref();
		this.fontSize = htmlFileEntity.fontSize();
	}

	async save() {
		if (!this._contentFileEntity) {
			return;
		}

		const htmlEntity = new ContentHtmlFileEntity(this._contentFileEntity, this.token, { remove: () => { } });
		const updatedEntity = await htmlEntity.setHtmlFileHtmlContent(this.fileContent);

		this.load(updatedEntity, this.fileContent);
		return this._contentFileEntity;
	}

	setPageContent(pageContent) {
		this.fileContent = pageContent;
	}

	_contentEquals() {
		/* This check stops the discard dialog from appearing when no content
			is added to the editor but it was clicked in. Faster than stripping
			the html, body, etc. tags added by the new html editor
		*/
		if (this.persistedFileContent === '' && this.empty) {
			return true;
		}

		return this.persistedFileContent === this.fileContent;
	}
}

decorate(ContentHtmlFile, {
	// props
	fileHref: observable,
	// actions
	load: action,
	setTitle: action,
});
