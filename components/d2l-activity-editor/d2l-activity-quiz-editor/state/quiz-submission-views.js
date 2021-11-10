import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizLinkedSubmissionView } from './quiz-linked-submission-view';
import { QuizSubmissionViewsEntity } from 'siren-sdk/src/activities/quizzes/submissionViews/QuizSubmissionViewsEntity.js';
import { QuizSubmissionView } from './quiz-submission-view.js';

configureMobx({ enforceActions: 'observed' });

export class QuizSubmissionViews {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.saving = null;
	}

	async addView(submissionViewStore) {
		const submissionViewEntity = await this._entity.addView();
		if (submissionViewEntity) {
			const viewHref = submissionViewEntity.self();
			const entity = new QuizSubmissionView(viewHref, this.token);
			entity.load(submissionViewEntity);
			submissionViewStore.put(viewHref, entity);
			return entity;
		}
	}

	async fetch(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);

		if (sirenEntity) {
			const entity = new QuizSubmissionViewsEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.canAddView = entity.canAddView();
		this.linkedSubmissionViews = (entity.linkedSubmissionViews() || []).map(view => new QuizLinkedSubmissionView(view));
	}

	removeView(href) {
		this.linkedSubmissionViews = this.linkedSubmissionViews.filter(view => view.href !== href);
	}
}

decorate(QuizSubmissionViews, {
	// props
	canAddView: observable,
	saving: observable,
	linkedSubmissionViews: observable,
	// actions
	load: action,
	removeView: action,
	addView: action
});
