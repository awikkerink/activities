import { action, computed, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { fetchEntity } from './fetch-entity.js';
import { Rels } from 'd2l-hypermedia-constants';
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction.js';

configureMobx({ enforceActions: 'observed' });

const 
	evaluatorClass = "candidate-evaluator",
	selectedClass = "selected",
	userRel = "https://activities.api.brightspace.com/rels/user";

export class ActivityEvaluators {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this._entity = null;
		this._candidates = new Map();
		this.hasUpdateAction = false;	
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
		
		console.log("load");

		this._entity = entity;

		if(loadCandidates){
			await this.loadCandidateEvaluators();		
		}
	}

	async loadCandidateEvaluators()
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
		let count = 0;
		
		this._candidates.forEach((value) => {
			if (value.isSelected) {
				count++;
			}
		});

		return count;
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

		let action = evaluatorEntity.getActionByName("toggle-selection");

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

	async save(){

	}

	async cancel(){


	}

}
decorate(ActivityEvaluators, {
	// props
	//_candidates: observable,
	hasUpdateAction: observable,
	// actions
	load: action,
	toggleSelection: action,
	//computed
	isEnabled: computed,
	countSelected: computed,
	countAll: computed,
	getSelected: computed,
	getAll: computed
});