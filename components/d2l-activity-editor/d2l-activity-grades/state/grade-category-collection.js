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

		const gradeCategories = await Promise.all(gradeCategoryPromises);
		await this.load(gradeCategories);
		return this;
	}

	async fetchGradeCategory(gradeCategoryLinkedEntity) {
		const gradeCategory = new GradeCategory(gradeCategoryLinkedEntity, this.token);
		await gradeCategory.fetch();
		return gradeCategory;
	}

	async load(gradeCategories) {
		if (gradeCategories) {
			this.gradeCategories = gradeCategories;
		}
		this.selected = this._getSelectedCategory();
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

	_getSelectedCategory() {
		if (!this.gradeCategories) {
			return;
		}
		return this.gradeCategories.find(cat => cat.isSelected);
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
