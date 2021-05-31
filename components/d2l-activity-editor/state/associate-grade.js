import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { AssociateGradeEntity } from 'siren-sdk/src/activities/associateGrade/AssociateGradeEntity.js';
import { GradeCategoryCollection } from '../d2l-activity-grades/state/grade-category-collection.js';
import { fetchEntity } from './fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class AssociateGrade {
	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async fetch(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);
		if (sirenEntity) {
			const entity = new AssociateGradeEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.gradebookStatus = entity.gradebookStatus();
		this.gradeName = entity.gradeName();
		this.maxPoints = entity.maxPoints();
		this.gradeType = entity.gradeType();
		this.gradeCategoryCollection = null; // what is this, or call it collection ?? how do we use it?
	}

	async getGradeCategories() {
		const gradeCategoryCollectionEntity = await this._entity.getGradeCategories();
		if (!gradeCategoryCollectionEntity) return;
		this.gradeCategoryCollection = new GradeCategoryCollection(gradeCategoryCollectionEntity, this.token);
		this.gradeCategoryCollection.fetch();
	}

	async setGradebookStatus(newStatus, gradeName, maxPoints) {
		if (gradeName) this.gradeName = gradeName;
		if (maxPoints) this.maxPoints = maxPoints;
		await this._updateProperty(() => this._entity.setGradebookStatus(newStatus, gradeName, maxPoints));
	}

	setGradeMaxPoints(maxPoints) {
		this._updateProperty(() => this._entity.setGradeMaxPoints(maxPoints));
	}

	setGradeName(gradeName) {
		this._updateProperty(() => this._entity.setGradeName(gradeName));
	}

	async _updateProperty(updateFunc) {
		const entity = await updateFunc();
		if (!entity) {
			this.fetch();
			return;
		}

		this.load(entity);
	}
}

decorate(AssociateGrade, {
	// props
	gradebookStatus: observable,
	gradeName: observable,
	maxPoints: observable,
	gradeType: observable,
	gradeCategoryCollection: observable,
	gradeCandidatesHref: observable,
	gradeCandidateCollection: observable,
	// actions
	load: action,
	getGradeCategories: action,
	setGradebookStatus: action,
	setGradeMaxPoints: action,
	setGradeName: action
});
