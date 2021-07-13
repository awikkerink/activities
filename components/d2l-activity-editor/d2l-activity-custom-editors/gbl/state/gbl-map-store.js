import { GblMap } from './gbl-map';
import { ObjectStore } from '../../../state/object-store.js';

export class GblMapStore {
	constructor() {
		this._gblMaps = new ObjectStore(GblMap);
	}

	clear() {
		this._gblMaps.clear();
	}

	fetchGblMapActivity(href, token) {
		return this._gblMaps.fetch(href, token);
	}

	getGblMapActivity(href) {
		return this._gblMaps.get(href);
	}

	put(href, object) {
		this._gblMaps.put(href, object);
	}
}

export const shared = new GblMapStore();
