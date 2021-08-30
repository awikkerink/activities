import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { ContentScormActivityEntity } from 'siren-sdk/src/activities/content/ContentScormActivityEntity.js';
import { fetchEntity } from '../../../state/fetch-entity';

configureMobx({ enforceActions: 'observed' });

export class ContentScormActivity {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.title = '';
		this.link = '';
		this.isExternalResource = false;
		this.lastModified = null;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new ContentScormActivityEntity(sirenEntity, this.token, {
				remove: () => { }
			});
			this.load(entity);
		}

		return this;
	}

	load(scormActivity) {
		this._contentScormActivity = scormActivity;
		this.title = scormActivity.title();
		this.isExternalResource = scormActivity.isExternalResource();
		this.lastEdited = scormActivity.lastModified();
		this.link = scormActivity.url();
	}

	async save() {
		if (!this._contentScormActivity) {
			return;
		}

		await this._contentScormActivity.setScormActivityTitle(this.title);
		await this._contentScormActivity.setScormActivityExternalResource(this.isExternalResource);
		await this.fetch();
	}

	setExternalResource(isExternalResource) {
		this.isExternalResource = isExternalResource;
	}

	setTitle(value) {
		this.title = value;
	}
}

decorate(ContentScormActivity, {
	// props
	title: observable,
	// actions
	load: action,
	setTitle: action,
});
