import { action, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { GradeScheme } from './grade-scheme.js';
import { GradeSchemeLinkedEntity } from 'siren-sdk/src/activities/associateGrade/GradeSchemeLinkedEntity.js';

configureMobx({ enforceActions: 'observed' });

export class GradeSchemeCollection {

	constructor(gradeSchemeCollectionEntity, token) {
		this.gradeSchemeCollectionEntity = gradeSchemeCollectionEntity;
		this.token = token;
		this.gradeSchemes = [];
	}

	async fetch() {
		const gradeSchemePromises = this.gradeSchemeCollectionEntity.getGradeSchemes().map(scheme => {
			const gradeSchemeLinkedEntity = new GradeSchemeLinkedEntity(scheme, this.token, { remove: () => { } });
			return this.fetchGradeScheme(gradeSchemeLinkedEntity);
		});

		const tempGradeSchemes = await Promise.all(gradeSchemePromises);

		runInAction(() => {
			this.gradeSchemes = tempGradeSchemes;
		});

		return this;
	}

	async fetchGradeScheme(gradeSchemeLinkedEntity) {
		const gradeScheme = new GradeScheme(gradeSchemeLinkedEntity, this.token);
		await gradeScheme.fetch();
		return gradeScheme;
	}

	findGradeScheme(href) {
		if (!href || !this.gradeSchemes) {
			return;
		}
		for (const scheme of this.gradeSchemes) {
			if (href === scheme.href) {
				return scheme;
			}
		}
	}

	async setGradeScheme(href, associateGradeStore) {
		const gradeScheme = this.findGradeScheme(href);

		if (associateGradeStore) {
			await gradeScheme.selectScheme(associateGradeStore);
		}
	}
}

decorate(GradeSchemeCollection, {
	// props
	gradeSchemes: observable,
	// actions
	setGradeScheme: action
});
