import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../../state/fetch-entity';
import { GblActivityUsageEntity } from 'siren-sdk/src/activities/gbl/GblActivityUsageEntity';
import { GblMapEntity } from 'siren-sdk/src/activities/gbl/GblMapEntity';

configureMobx({ enforceActions: 'observed' });

export class GblMap {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.title = '';
		this.mapData = '';
	}

	get dirty() {
		return !(this._gblMapEntity.equals(this._makeGblMapEntityData()));
	}

	async fetch() {
		const entity = await fetchEntity(this.href, this.token);
		if (entity) {
			const activityUsage = new GblActivityUsageEntity(entity, this.token, { remove: () => {} });
			const gblMapEntity = await fetchEntity(activityUsage.getGblMapHref(), this.token);
			if (gblMapEntity) {
				const gblMap = new GblMapEntity(gblMapEntity, this.token, { remove: () => {} });
				this.load(gblMap);
			}
		}
		return this;
	}

	load(gblMap) {
		this._gblMapEntity = gblMap;
		this.name = gblMap.name();
		this.mapData = gblMap.mapData();
	}

	async save() {
		if (!this._gblMapEntity) {
			return;
		}

		if (this.name !== this._gblMapEntity.name()) {
			await this._gblMapEntity.setName(this.name);
		}

		if (this.mapData !== this._gblMapEntity.mapData()) {
			await this._gblMapEntity.setMapData(this.mapData);
		}

		await this.fetch();
	}

	setMapData(value) {
		this.mapData = value;
	}

	setName(value) {
		this.name = value;
	}

	_makeGblMapEntityData() {
		return {
			name: this.name,
			mapData: this.mapData
		};
	}
}

decorate(GblMap, {
	// props
	title: observable,
	mapData: observable,
	// actions
	load: action,
	setMapData: action,
	setTitle: action,
});
