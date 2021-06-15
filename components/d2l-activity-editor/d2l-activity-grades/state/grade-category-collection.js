import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { GradeCategory } from './grade-category.js';
import { GradeCategoryLinkedEntity } from 'siren-sdk/src/activities/associateGrade/GradeCategoryLinkedEntity.js';

configureMobx({ enforceActions: 'observed' });

export class GradeCategoryCollection {

	constructor(gradeCategoryCollectionEntity, token) {
		this.gradeCategoryCollectionEntity = gradeCategoryCollectionEntity;
		this.token = token;
		this.gradeCategories = [];
		this.selected = null;
	}

	async fetch() {
		const gradeCategoryPromises = this.gradeCategoryCollectionEntity.getGradeCategories().map(category => {
			const gradeCategoryLinkedEntity = new GradeCategoryLinkedEntity(category, this.token, { remove: () => { } });
			return this.fetchGradeCategory(gradeCategoryLinkedEntity);
		});

		const gradeCategoriesEntity = await Promise.all(gradeCategoryPromises);
		await this.load(gradeCategoriesEntity);
		return this;
	}

	async fetchGradeCategory(gradeCategoryLinkedEntity) {
		const gradeCategory = new GradeCategory(gradeCategoryLinkedEntity, this.token);
		await gradeCategory.fetch();
		return gradeCategory;
	}

	async load(gradeCategoriesEntity) {
		this.selected = this.gradeCategoryCollectionEntity.getSelectedCategory();
		this.gradeCategories = gradeCategoriesEntity;
	}

	setSelected(href, associateGradeStore) {
		const gradeCategory = this._findGradeCategory(href, this.gradeCategories);
		if (gradeCategory) {
			this.selected = gradeCategory;

			if (associateGradeStore) {
				gradeCategory.selectCategory(associateGradeStore);
			}
		}
	}

	_findGradeCategory(href, gradeCategories) {
		if (!gradeCategories) {
			return;
		}
		for (const gc of gradeCategories) {
			if (href === gc.href || (!gc.href && href === 'undefined')) {
				return gc;
			}
		}
	}
}

decorate(GradeCategoryCollection, {
	// props
	gradeCategories: observable,
	selected: observable,
	// actions
	load: action,
	setSelected: action
});
