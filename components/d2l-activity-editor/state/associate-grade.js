import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { AssociateGradeEntity } from 'siren-sdk/src/activities/associateGrade/AssociateGradeEntity.js';
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
	}

	setGradebookStatus(newStatus, gradeName, maxPoints) {
		this.gradebookStatus = newStatus;
		if (gradeName) this.gradeName = gradeName;
		if (maxPoints) this.maxPoints = maxPoints;
		this._updateProperty(() => this._entity.setGradebookStatus(newStatus, gradeName, maxPoints));
	}

	setGradeMaxPoints(maxPoints) {
		this.maxPoints = maxPoints;
		this._updateProperty(() => this._entity.setGradeMaxPoints(maxPoints));
	}

	setGradeName(gradeName) {
		this.gradeName = gradeName;
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
	gradeCandidatesHref: observable,
	gradeCandidateCollection: observable,
	// actions
	load: action,
	setGradebookStatus: action,
	setGradeMaxPoints: action,
	setGradeName: action
});
