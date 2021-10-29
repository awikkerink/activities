import { action, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { Association } from 'siren-sdk/src/activities/Association.js';
import { Associations } from 'siren-sdk/src/activities/Associations.js';
import { fetchEntity } from '../../state/fetch-entity.js';
import { RubricEntity } from 'siren-sdk/src/rubrics/RubricEntity.js';

configureMobx({ enforceActions: 'observed' });

export class AssociationCollection {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.associationsMap = new Map();
	}

	addAssociations(associationsToAdd) {

		for (const ata of associationsToAdd) {
			const entity = new Association(ata, this.token);

			const rubricHref = entity.getRubricLink();

			if (this.associationsMap.has(rubricHref)) {
				const association = this.associationsMap.get(rubricHref);

				runInAction(() => this.addDefaultScoringRubricOption(association.rubricHref));

				if (association.isDeleting) {
					association.isDeleting = false;
				} else {
					if (association.isAssociated) {
						continue;
					}
					association.isAssociating = true;
				}

			}

		}

	}

	async addDefaultScoringRubricOption(rubricHref) {
		if (!rubricHref) {
			return;
		}

		const sirenEntity = await fetchEntity(rubricHref, this.token);
		const rubricEntity = new RubricEntity(sirenEntity);

		if (!rubricEntity || rubricEntity.isTextOnly()) {
			return;
		}

		const rubricId = rubricEntity.rubricId();
		const rubricAlreadyAnOption = this.defaultScoringRubricOptions.some(option => option.value === rubricId);

		if (!rubricAlreadyAnOption) {
			runInAction(() => this.defaultScoringRubricOptions.push({ title: rubricEntity.name(), value: rubricId }));
		}
	}
	addPotentialAssociationToMap(rubricHref, formattedEntity) {
		if (!this.associationsMap.has(rubricHref)) {
			this.associationsMap.set(rubricHref, formattedEntity);
		}
	}
	canCreateAssociation() {
		return this._entity.canCreateAssociation();
	}
	canCreatePotentialAssociation() {
		return this._entity.canCreatePotentialAssociation();
	}
	async createPotentialAssociation() {
		const newAssociation = await this._entity.createPotentialAssociation();
		const associationEntity = new Association(newAssociation, this.token);

		const rubricHref = associationEntity.getRubricLink();
		const formattedEntity = this._formatAssociationEntity(associationEntity);
		this.addPotentialAssociationToMap(rubricHref, formattedEntity);

		return newAssociation;
	}
	deleteAssociation(rubricHref, assignment, rubricIsAlsoIndirectlyAssociated) {

		if (this.associationsMap.has(rubricHref)) {
			const association = this.associationsMap.get(rubricHref);

			this.removeDefaultScoringRubricOption(rubricHref, assignment, rubricIsAlsoIndirectlyAssociated);

			if (association.isAssociating) {
				association.isAssociating = false;
			} else {
				association.isDeleting = true;
			}

		}
	}
	deleteAssociation_DoNotUse(rubricHref) {

		if (this.associationsMap.has(rubricHref)) {
			const association = this.associationsMap.get(rubricHref);

			if (association.isAssociating) {
				association.isAssociating = false;
			} else {
				association.isDeleting = true;
			}

		}
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
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);

		if (sirenEntity) {
			const entity = new Associations(sirenEntity, this.token);
			this.load(entity);
		}
		return this;
	}

	fetchAssociations() {
		return Array.from(this.associationsMap.values());
	}

	fetchAttachedAssociationsCount() {
		const associations = Array.from(this.associationsMap.values());
		let attachedAssociationCount = 0;

		for (const association of associations) {
			if ((association.isAssociated || association.isAssociating)
				&& !association.isDeleting
			) {
				attachedAssociationCount++;
			}
		}
		return attachedAssociationCount;
	}
	getRubricIdFromHref(rubricHref) {
		if (!rubricHref) {
			return;
		}

		return rubricHref.split('/').pop();
	}

	load(entity) {
		this._entity = entity;

		this.associationsMap = new Map();

		this.defaultScoringRubricOptions = [];

		this._entity.getAllAssociations().forEach(asc => {

			const associationEntity = new Association(asc, this.token);
			const rubricHref = associationEntity.getRubricLink();
			const formattedEntity = this._formatAssociationEntity(associationEntity);

			if (!this.associationsMap.has(rubricHref)) {
				this.associationsMap.set(rubricHref, formattedEntity);
			}
		});

		const associations = this.fetchAssociations();
		const validDefaultScoringOption = associations.filter(association => (association.isAssociating || association.isAssociated) && !association.isDeleting);

		for (const option of validDefaultScoringOption) {
			this.addDefaultScoringRubricOption(option.rubricHref);
		}
	}

	removeDefaultScoringRubricOption(rubricHref, assignment, rubricIsAlsoIndirectlyAssociated) {
		if (rubricHref && assignment) {
			const rubricId = this.getRubricIdFromHref(rubricHref);
			// typeof assignment.defaultScoringRubricId is `string`, rubricId is `string`
			if (assignment.defaultScoringRubricId === rubricId && !rubricIsAlsoIndirectlyAssociated) {
				assignment.resetDefaultScoringRubricId(false);
			}

			this.defaultScoringRubricOptions = this.defaultScoringRubricOptions.filter(
				option => String(option.value) !== rubricId // see DE45624
			);
		}
	}

	async save(saveInPlace) {
		const associations = this.associationsMap.values();

		for await (const association of associations) {
			await this._saveChanges(association);
		}

		if (saveInPlace) {
			await this.fetch(true);
		}
	}

	_formatAssociationEntity(entity) {

		const id = entity.getRubricLink();

		const isAssociated = entity.isSingleAssociation();

		const associationObj = {
			entity: entity,
			rubricHref: id,
			isAssociated: isAssociated,
			isAssociating: false,
			isDeleting: false
		};

		return associationObj;
	}

	async _saveChanges(association) {
		if (association.isAssociating) {
			await association.entity.createAssociation();
		} else if (association.isDeleting) {
			await association.entity.deleteAssociation();
		}
	}

}

decorate(AssociationCollection, {
	// props
	associationsMap: observable,
	defaultScoringRubricOptions: observable,
	// actions
	load: action,
	save: action,
	addAssociations: action,
	deleteAssociation: action,
	addPotentialAssociationToMap: action,
	addDefaultScoringRubricOption: action,
	removeDefaultScoringRubricOption: action,
	deleteAssociation_DoNotUse: action,
});
