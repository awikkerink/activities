import { action, computed, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { fetchEntity } from './fetch-entity.js';
import { Rels } from 'd2l-hypermedia-constants';
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction.js';

configureMobx({ enforceActions: 'observed' });

const 
	evaluatorClass = "candidate-evaluator",
	selectedClass = "selected",
	userRel = "https://activities.api.brightspace.com/rels/user",
	updateAction = "update",
	clearStateAction = "clear-state",
	toggleSelectionAction = "toggle-selection";

export class ActivityEvaluators {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this._entity = null;
		this._candidates = new Map();
	}

	async fetch(bypassCache) {
			
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);

		if (sirenEntity) {	

			if (sirenEntity.hasLinkByRel(Rels.Activities.evaluatorCandidates)) {
				
				let evalHref = sirenEntity.getLinkByRel(Rels.Activities.evaluatorCandidates).href;
				
				const sirenEntityEvaluators = await fetchEntity(evalHref, this.token, bypassCache);

				if(sirenEntityEvaluators){
					await this.load(sirenEntityEvaluators, true);
				}
			}		
		}

		return this;
	}

	async load(entity, loadCandidates = false) {

		this._entity = entity;

		if(loadCandidates){
			await this._loadCandidateEvaluators();		
		}
	}

	async _loadCandidateEvaluators()
	{
		let candidateEntities = this._entity.getSubEntitiesByClasses([evaluatorClass]);

		for(let i = 0; i < candidateEntities.length; i++){

			let candidateEntity = candidateEntities[i];
			let userEntity = candidateEntity.getSubEntityByRel(userRel);
			
			if(this._candidates.has(userEntity.href)){

				let candidate = this._candidates.get(userEntity.href);
				if(candidate.isSelected !== candidateEntity.hasClass(selectedClass)){
					candidate.isSelected = candidateEntity.hasClass(selectedClass);
				}
			}
			else{

				let userSirenEntity = await fetchEntity(userEntity.href, this.token);

				this._candidates.set(userEntity.href, {
					userHref: userEntity.href,
					isSelected : candidateEntity.hasClass(selectedClass),
					displayName : userSirenEntity.hasSubEntityByRel(Rels.displayName) 
									? userSirenEntity.getSubEntityByRel(Rels.displayName).properties.name
									: null,
					orgDefinedId : userSirenEntity.hasSubEntityByRel(Rels.orgDefinedId)
									? userSirenEntity.getSubEntityByRel(Rels.orgDefinedId).properties.orgDefinedId
									: null
				});	
			}			
		}
	}

    get isEnabled() {

		if (this._entity) {
			return true;
		} else {
			return false;
		}
    }

	get countAll() {
		return this._candidates.size;
	}

	get countSelected() {
		return this.getSelected.length;
	}

	get getSelected(){
		 
		let arr = [];
		this._candidates.forEach((value, key) => {
			if (value.isSelected) {
				arr.push(value);
			}
		});

		return arr;
	}

	get getAll(){
		 
		let arr = [];
		this._candidates.forEach((value) => {
			arr.push(value);
		});

		return arr;
	}

	async toggleSelection( userHref ){

		let evaluatorEntity = this._getEvaluatorEntity(userHref);

		if (!evaluatorEntity.hasActionByName(toggleSelectionAction)) {
			return;
		}

		let action = evaluatorEntity.getActionByName(toggleSelectionAction);

		const resp = await performSirenAction(this.token, action, undefined, true);

		await this.load(resp);

	}

	_getEvaluatorEntity(userHref) {
		return this._entity
			.getSubEntitiesByClasses([evaluatorClass])
			.find((evaluatorEntity) => {
				return evaluatorEntity.hasSubEntityByRel(userRel)
				&& evaluatorEntity.getSubEntityByRel(userRel).href == userHref;
			});
	}

	async update(){

		if (!this._entity.hasActionByName(updateAction)){
			return;
		}

		let action = this._entity.getActionByName(updateAction);

		const resp = await performSirenAction(this.token, action, undefined, true);

		await this.load(resp, true);		

	}

	async clear(){

		if (!this._entity.hasActionByName(clearStateAction)){
			return;
		}

		let action = this._entity.getActionByName(clearStateAction);

		const resp = await performSirenAction(this.token, action, undefined, true);

		await this.load(resp);		
	}

}
decorate(ActivityEvaluators, {
	// props
	_candidates: observable,
	// actions
	load: action,
	update: action,
	clear: action,
	toggleSelection: action,
	//computed
	isEnabled: computed,
	countSelected: computed,
	countAll: computed,
	getSelected: computed,
	getAll: computed
});