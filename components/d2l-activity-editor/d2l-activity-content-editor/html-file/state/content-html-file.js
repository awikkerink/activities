import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { ContentHtmlFileEntity } from 'siren-sdk/src/activities/content/ContentHtmlFileEntity.js';
import { fetchEntity } from '../../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class ContentHtmlFile {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.title = '';
	}

	async cancelCreate() {
		await this._contentHtmlFile.deleteHtmlFile();
	}

	get dirty() {
		return !this._contentHtmlFile.equals(this._makeHtmlFileData());
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new ContentHtmlFileEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	load(htmlFileEntity) {
		this._contentHtmlFile = htmlFileEntity;
		this.title = htmlFileEntity.title();
	}

	async save() {
		if (!this._contentHtmlFile) {
			return;
		}

		await this._contentHtmlFile.setHtmlFileTitle(this.title);
		await this.fetch();
	}

	setTitle(value) {
		this.title = value;
	}

	_makeHtmlFileData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
			The cancel workflow is making use of that to detect changes.
		*/
		return {
			title: this.title,
		};
	}
}

decorate(ContentHtmlFile, {
	// props
	title: observable,
	// actions
	load: action,
	setTitle: action,
});
