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
		console.log('checking if dirty');
		//console.log(this.mapData);
		//console.log(this._gblMapEntity.mapData);
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
		this.title = gblMap.title();
		this.mapData = gblMap.mapData();
	}

	setMapData(value) {
		this.mapData = value;
	}

	setTitle(value) {
		this.title = value;
	}

	_makeGblMapEntityData() {
		return {
			title: this.title,
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
