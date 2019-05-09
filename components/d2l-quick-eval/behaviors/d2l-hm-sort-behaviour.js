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

	_getSortsPromise: function(entity) {
		return this._followLink(entity, Rels.sorts);
	},

	_loadSorts: function(entity) {
		// entity is null on initial load
		if (!entity) {
			return Promise.resolve();
		}

		return this._getSortsPromise(entity)
			.then(sortsEntity => {
				if (!sortsEntity || !sortsEntity.entity) {
					return Promise.reject(new Error('Could not load sorts endpoint'));
				}

				this._headerColumns.forEach((headerColumn, i) => {
					headerColumn.headers.forEach((header, j) => {
						if (header.sortClass) {
							const sort = sortsEntity.entity.getSubEntityByClass(header.sortClass);
							if (sort) {
								this.set(`_headerColumns.${i}.headers.${j}.canSort`, true);
								if (sort.properties && sort.properties.applied && (sort.properties.priority === 0)) {
									const descending = sort.properties.direction === 'descending';
									this.set(`_headerColumns.${i}.headers.${j}.sorted`, true);
									this.set(`_headerColumns.${i}.headers.${j}.desc`, descending);

								} else {
									this.set(`_headerColumns.${i}.headers.${j}.sorted`, false);
									this.set(`_headerColumns.${i}.headers.${j}.desc`, false);
								}
							}
						}
					});
				});
				return Promise.resolve();
			});
	},

	_updateSortState: function(event) {

		let result;
		const headerId = event.currentTarget.id;

		this._headerColumns.forEach((headerColumn, i) => {
			headerColumn.headers.forEach((header, j) => {
				if ((header.key === headerId) && header.canSort) {
					const descending = header.sorted && !header.desc;
					this.set(`_headerColumns.${i}.headers.${j}.sorted`, true);
					this.set(`_headerColumns.${i}.headers.${j}.desc`, descending);

					result = this._fetchSortedData(header.sortClass, descending);
				}
				else {
					this.set(`_headerColumns.${i}.headers.${j}.sorted`, false);
				}
			});
		});

		if (result) {
			return result;
		} else {
			return Promise.reject(new Error(`Could not find sortable header for ${headerId}`));
		}
	},

	_fetchSortedData: function(sortClass, descending) {
		return this._getSortsPromise(this.entity)
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
				const customParams = this._numberOfActivitiesToShow > 0 ? {pageSize: this._numberOfActivitiesToShow} : undefined;
				return this._performSirenActionWithQueryParams(action, customParams);
			}).bind(this))
			.then((collection => {
				this.entity = collection;
				this._dispatchSortUpdatedEvent(collection);
				return Promise.resolve(collection);
			}).bind(this));
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.QuickEval.D2LHMSortBehaviour = [
	D2L.PolymerBehaviors.Siren.D2LSirenHelperBehavior,
	D2L.PolymerBehaviors.QuickEval.D2LHMSortBehaviourImpl
];
