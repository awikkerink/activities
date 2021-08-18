import { action, configure as configureMobx, decorate } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class ActivityEvaluators {

	constructor(href, token) {
		this.href = href;
		this.token = token;
	}


	get dirty() {
		const associations = Array.from(this.associationsMap.values());
		for (const association of associations) {
			if (association.isAssociating || association.isDeleting) {
				return true;
			}
		}

		return false;
	}

	async fetch(bypassCache = false) {

		console.log(this.href);
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);

		console.log(sirenEntity);

		if (sirenEntity) {
			const entity = sirenEntity;
			this.load(entity);
		}
		return this;
	}



	load(entity) {
		this._entity = entity;
	}


	async save() {
	}



}

decorate(ActivityEvaluators, {
	// props

	// actions
	load: action,
	save: action
});
