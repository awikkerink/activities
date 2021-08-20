import { action, configure as configureMobx, decorate, observable, toJS } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class ActivityEvaluators {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.studentsMap = [];
		this.evaluatorsMap = [];
		this.mapping = {};
		this.ruleType = undefined;
		this.ruleInfo = undefined;
	}


	get dirty() {
		return false;
	}

	async fetch(bypassCache = false) {

		console.log(this.href);
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);

		if (sirenEntity) {
			const entity = sirenEntity;
			await this.load(entity);
		}

		return this;
	}



	async load(entity) {
		this._entity = entity;

		this.studentsMap = [];
		this.evaluatorsMap = [];

		let evaluatorsHref = this._entity.getLinkByRel('https://api.brightspace.com/rels/evaluators');
		let studentsHref = this._entity.getLinkByRel('https://api.brightspace.com/rels/students');

		let mappingHref = this._entity.getLinkByRel('https://activities.api.brightspace.com/rels/evaluator-mapping');

		let allEvaluators = await fetchEntity(evaluatorsHref, this.token, false);
		let allStudents = await fetchEntity(studentsHref, this.token, false);

		let mappingEntity = await fetchEntity(mappingHref, this.token, false);

		let ruleInfo = mappingEntity.properties.ruleInfo;
		let ruleType  = mappingEntity.properties.ruleType;



		allEvaluators.entities.forEach( x => {
			let name = x.getSubEntityByRel('https://api.brightspace.com/rels/display-name').properties.name;
			let href = x.getLinkByRel('https://users.api.brightspace.com/rels/canonical-user').href
			let id = href.split(/[//]+/).pop();
			let image = x.getSubEntityByRel('https://api.brightspace.com/rels/user-profile').getSubEntityByRel('https://api.brightspace.com/rels/profile-image').getLinkByRel('https://api.brightspace.com/rels/thumbnail#small').href;

			this.evaluatorsMap.push({
				id: id,
				name: name,
				image: image,
				href: href
			})

		});

		allStudents.entities.forEach( x => {
			let name = x.getSubEntityByRel('https://api.brightspace.com/rels/display-name').properties.name;
			let href = x.getLinkByRel('https://users.api.brightspace.com/rels/canonical-user').href
			let id = href.split(/[//]+/).pop();
			let image = x.getSubEntityByRel('https://api.brightspace.com/rels/user-profile').getSubEntityByRel('https://api.brightspace.com/rels/profile-image').getLinkByRel('https://api.brightspace.com/rels/thumbnail#small').href;

			this.studentsMap.push({
				id: id,
				name: name,
				image: image,
				href: href,
			})

		});

		if(!ruleType){
			this.ruleType = "DefaultRule"
		} else {
			this.ruleType = ruleType.split(".").pop();
		};


		if(ruleInfo){
			this.ruleInfo = JSON.parse(mappingEntity.properties.ruleInfo);
		} else {
			this.ruleInfo = null;
		};

		this._convertInfoToEvaluatorMap();
		console.log(this.mapping);

	}

	_convertInfoToEvaluatorMap() {
		if(!this.ruleInfo) {
			this.evaluatorsMap.forEach( x=> {
				this.mapping[x.id] = toJS(this.studentsMap);
			});
		} else {

			this.ruleInfo.forEach( y => {
				y.forEach( z => {
					let id = z.split("_").pop();

					if(!this.mapping[id]) {
						this.mapping[id] = [];
					}

					this.mapping[id].push(y);
				});
			});
		}

		return;
	}

	getStudents(){
		return toJS(this.studentsMap);
	}

	getMap(){
		return toJS(this.mapping);
	}


	getEvaluators(){
		return toJS(this.evaluatorsMap);
	}

	async save() {

	}
}

decorate(ActivityEvaluators, {
	// props
	studentsMap: observable,
	evaluatorsMap: observable,
	// actions
	load: action,
	save: action
});
