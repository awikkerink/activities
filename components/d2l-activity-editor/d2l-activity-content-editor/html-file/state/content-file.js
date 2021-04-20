import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { ContentFileEntity } from 'siren-sdk/src/activities/content/ContentFileEntity.js';
import { fetchEntity } from '../../../state/fetch-entity.js';
// TODO: Explore idea of using this shared WorkingCopy
// import { WorkingCopy } from '../../../state/working-copy.js';

configureMobx({ enforceActions: 'observed' });

export class ContentFile {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.title = '';
	}

	async cancelCreate() {
		await this._contentFile.deleteFile();
	}

	get dirty() {
		return !this._contentFile.equals(this._makeContentFileData());
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			let entity = new ContentFileEntity(sirenEntity, this.token, { remove: () => { } });
			console.log({1: entity});
			entity = await this._checkout(entity);
			console.log({2: entity});
			this.load(entity);
		}
		return this;
	}

	load(fileEntity) {
		this._contentFile = fileEntity;
		this.title = fileEntity.title();
	}

	async save() {
		if (!this._contentFile) {
			return;
		}

		await this._contentFile.setFileTitle(this.title);
		const committedContentFileEntity = await this._commit(this._contentFile);
		const editableContentFileEntity = await this._checkout(committedContentFileEntity);
		this.load(editableContentFileEntity);
		// await this.fetch();
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

		console.log({a: contentFileEntity});
		const sirenEntity = await contentFileEntity.commit();
		console.log({b: contentFileEntity});
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
		};
	}
}

decorate(ContentFile, {
	// props
	title: observable,
	// actions
	load: action,
	setTitle: action,
});
