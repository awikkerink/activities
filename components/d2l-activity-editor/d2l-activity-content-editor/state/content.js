import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { CONTENT_TYPES, ContentEntity } from 'siren-sdk/src/activities/content/ContentEntity.js';
import { FILE_TYPES } from 'siren-sdk/src/activities/content/ContentFileEntity.js';
import { shared as contentFileStore } from '../content-file/state/content-file-store.js';
import { shared as contentHtmlFileStore } from '../content-file/html-files/state/content-html-file-store.js';
import { shared as contentMediaFileStore } from '../content-file/media-files/state/content-media-file-store.js';
import { fetchEntity } from '../../state/fetch-entity.js';
import { shared as ltiLinkStore } from '../lti-link/state/content-lti-link-store.js';
import { shared as moduleStore } from '../module/state/content-module-store.js';
import { shared as webLinkStore } from '../web-link/state/content-web-link-store.js';

configureMobx({ enforceActions: 'observed' });

export class Content {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.entityType = null;
		this.contentActivityHref = '';
		this.lessonViewPageHref = '';
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new ContentEntity(sirenEntity, this.token, { remove: () => { } });
			await this.load(entity);
		}
		return this;
	}

	async load(contentEntity) {
		this._entity = contentEntity;
		this.entityType = contentEntity.getEntityType();

		if (this.entityType === CONTENT_TYPES.module) {
			this.contentActivityHref = contentEntity.getModuleHref();
			moduleStore.fetchContentModuleActivity(this.contentActivityHref, this.token);
		} else if (this.entityType === CONTENT_TYPES.weblink) {
			this.contentActivityHref = contentEntity.getWebLinkHref();
			webLinkStore.fetchContentWebLinkActivity(this.contentActivityHref, this.token);
		} else if (this.entityType === CONTENT_TYPES.ltilink) {
			this.contentActivityHref = contentEntity.getLTILinkHref();
			ltiLinkStore.fetchContentLTILinkActivity(this.contentActivityHref, this.token);
		} else if (this.entityType === CONTENT_TYPES.contentFile) {
			this.contentActivityHref = contentEntity.getContentFileHref();
			let file = await contentFileStore.fetchContentFileActivity(this.contentActivityHref, this.token);

			if (file.fileType == FILE_TYPES.html) {
				contentHtmlFileStore.fetchContentHtmlFileActivity(this.contentActivityHref, this.token);
			} else if(file.fileType == FILE_TYPES.audio || file.fileType == FILE_TYPES.video) {
				contentMediaFileStore.fetchContentMediaFileActivity(this.contentActivityHref, this.token);
			}
		}

		this.lessonViewPageHref = contentEntity.getLessonViewPageHref();
	}
}
decorate(Content, {
	// props
	entityType: observable,
	contentActivityHref: observable,
	// actions
	load: action
});
