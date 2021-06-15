import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { GradeScheme } from './grade-scheme.js';
import { GradeSchemeLinkedEntity } from 'siren-sdk/src/activities/associateGrade/GradeSchemeLinkedEntity.js';

configureMobx({ enforceActions: 'observed' });

export class GradeSchemeCollection {

	constructor(gradeSchemeCollectionEntity, token) {
		this.gradeSchemeCollectionEntity = gradeSchemeCollectionEntity;
		this.token = token;
		this.gradeSchemes = [];
		this.selected = null;
	}

	async fetch() {
		const gradeSchemePromises = this.gradeSchemeCollectionEntity.getGradeSchemes().map(scheme => {
			const gradeSchemeLinkedEntity = new GradeSchemeLinkedEntity(scheme, this.token, { remove: () => { } });
			return this.fetchGradeScheme(gradeSchemeLinkedEntity);
		});

		await Promise.all(gradeSchemePromises);
		await this.load();
		return this;
	}

	async fetchGradeScheme(gradeSchemeLinkedEntity) {
		const gradeScheme = new GradeScheme(gradeSchemeLinkedEntity, this.token);
		await gradeScheme.fetch();
		return gradeScheme;
	}

	async load() {
		this.selected = this.gradeSchemeCollectionEntity.getSelectedScheme();
		this.gradeSchemes = this.gradeSchemeCollectionEntity.getGradeSchemes();
	}
}

decorate(GradeSchemeCollection, {
	// props
	gradeSchemes: observable,
	selected: observable,
	// actions
	load: action
});
