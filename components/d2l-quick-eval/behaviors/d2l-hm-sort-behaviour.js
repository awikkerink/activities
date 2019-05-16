import { Rels } from 'd2l-hypermedia-constants';
import './d2l-siren-helper-behavior.js';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.QuickEval = window.D2L.PolymerBehaviors.QuickEval || {};

/*
* Behavior for interacting with hm sort
* @polymerBehavior
*/
D2L.PolymerBehaviors.QuickEval.D2LHMSortBehaviourImpl = {

	_followSortRel: function(entity) {
		return this._followLink(entity, Rels.sorts);
	},

	_loadSorts: function(entity) {
		return this._followSortRel(entity)
			.then(sortsEntity => {
				if (!sortsEntity || !sortsEntity.entity) {
					return Promise.reject(new Error('Could not load sorts endpoint'));
				}

				return Promise.resolve(sortsEntity.entity);
			});
	},

	_applySortAndFetchData: function(sortClass, descending, customParams) {
		return this._followSortRel(this.entity)
			.then((sortsEntity => {
				if (!sortsEntity || !sortsEntity.entity) {
					return Promise.reject(new Error('Could not load sorts endpoint'));
				}

				const sort = sortsEntity.entity.getSubEntityByClass(sortClass);
				if (!sort) {
					return Promise.reject(new Error(`Could not find sort class ${sortClass}`));
				}

				const actionName = descending ? 'sort-descending' : 'sort-ascending';
				const action = sort.getActionByName(actionName);
				if (!action) {
					return Promise.reject(new Error(`Could not find sort action ${actionName} for sort ${JSON.stringify(sort)}`));
				}

				return this._performSirenActionWithQueryParams(action);
			}).bind(this))
			.then((sortsEntity => {
				if (!sortsEntity) {
					return Promise.reject(new Error('Could not load sorts endpoint after sort is applied'));
				}
				const action = sortsEntity.getActionByName('apply');
				if (!action) {
					return Promise.reject(new Error(`Could not find apply action in ${sortsEntity}`));
				}
				return this._performSirenActionWithQueryParams(action, customParams);
			}).bind(this));
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.QuickEval.D2LHMSortBehaviour = [
	D2L.PolymerBehaviors.Siren.D2LSirenHelperBehavior,
	D2L.PolymerBehaviors.QuickEval.D2LHMSortBehaviourImpl
];
