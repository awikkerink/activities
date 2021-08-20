import { action, configure as configureMobx, decorate, observable, toJS } from 'mobx';
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction';
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

		this._mappingEntity = await fetchEntity(mappingHref, this.token, false);

		let ruleInfo = this._mappingEntity.properties.ruleInfo;
		let ruleType  = this._mappingEntity.properties.ruleType;



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
			this.ruleInfo = JSON.parse(this._mappingEntity.properties.ruleInfo);
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
				y.EvaluatorActors.forEach( z => {
					let id = z.split("_").pop();

					if(!this.mapping[id]) {
						this.mapping[id] = [];
					}

					this.mapping[id].push(y.StudentActor.split("_").pop());
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

	async save(map) {
		let apiMap = [];

		this.studentsMap.forEach( x => {
			let evaluatorList = [];
			map.forEach( y => {
				if(y[1].includes(x.id)){
					evaluatorList.push("user_"+y[0]);
				}
			})

			apiMap.push({
				"StudentActor": "user_" + x.id,
				"EvaluatorActors": evaluatorList
			});


		})

		const action = this._mappingEntity.getActionByName('set-evaluator-mapping');
		const fields  = [
			{
				name: 'ruleType',
			 	value: '69e86870-0157-426a-a2bd-80fa1b6ed23c'
			},{
				name: 'ruleInfo',
				value: JSON.stringify(apiMap)
			}
		];

		console.log(map)

		await performSirenAction(this.token, action, fields, true);
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
