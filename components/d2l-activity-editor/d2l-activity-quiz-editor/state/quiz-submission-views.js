import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizSubmissionView } from './quiz-submission-view.js';
import { QuizSubmissionViewsEntity } from 'siren-sdk/src/activities/quizzes/submissionViews/QuizSubmissionViewsEntity.js';

configureMobx({ enforceActions: 'observed' });

export class QuizSubmissionViews {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.saving = null;
	}

	async fetch(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);

		if (sirenEntity) {
			const entity = new QuizSubmissionViewsEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			await this.load(entity);
		}
		return this;
	}

	getPrimarySubmissionView() {
		return this.submissionViews.find(view => view.isPrimaryView);
	}

	getSubmissionView(href) {
		if (!this.submissionViews) return;
		return this.submissionViews.find(view => view.href = href);
	}

	async load(entity, bypassCache) {
		this._entity = entity;
		this.canAddView = entity.canAddView();
		await Promise.all([
			this._loadSubmissionViews(entity, bypassCache)
		]);
	}

	async _loadSubmissionViews(entity, bypassCache) {
		if (!bypassCache && this.submissionViews) return;
		const linkedViewEntities = entity.linkedSubmissionViews();
		if (!linkedViewEntities || linkedViewEntities.length === 0) {
			return;
		}

		const fetchLinkedViewsPromises = [];
		linkedViewEntities.forEach(linkedEntity => {
			const submissionView = new QuizSubmissionView(linkedEntity.href, this.token);
			fetchLinkedViewsPromises.push(submissionView.fetch(bypassCache));
		});
		const views = await Promise.all(fetchLinkedViewsPromises);
		this.submissionViews = views;
	}
}

decorate(QuizSubmissionViews, {
	// props
	canAddView: observable,
	saving: observable,
	submissionViews: observable,
	// actions
	load: action
});
