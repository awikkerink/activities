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
		this.contentServiceName = '';
		this.contentServiceLastModified = null;
	}

	get dirty() {
		return !this._contentScormActivity.equals(this._makeScormActivityData());
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
		this.link = scormActivity.url();
		this.contentServiceName = scormActivity.contentServiceName();
		this.contentServiceLastModified = scormActivity.contentServiceLastModified();
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

	_makeScormActivityData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
			The cancel workflow is making use of that to detect changes.
		*/
		return {
			title: this.title,
			isExternalResource: this.isExternalResource
		};
	}
}

decorate(ContentScormActivity, {
	// props
	title: observable,
	isExternalResource: observable,
	// actions
	load: action,
	setTitle: action,
	setExternalResource: action
});
