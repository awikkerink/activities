import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { QuizSubmissionViewLinkedEntity } from 'siren-sdk/src/activities/quizzes/submissionViews/QuizSubmissionViewLinkedEntity.js';

configureMobx({ enforceActions: 'observed' });

export class QuizLinkedSubmissionView {
	constructor(sirenEntity) {
		const entity = new QuizSubmissionViewLinkedEntity(sirenEntity);
		this.load(entity);
	}

	load(entity) {
		this._entity = entity;
		this.href = entity.href();
		this.isPrimaryView = entity.isPrimaryView();
	}
}

decorate(QuizLinkedSubmissionView, {
	// props
	isPrimaryView: observable,
	// actions
	load: action
});
