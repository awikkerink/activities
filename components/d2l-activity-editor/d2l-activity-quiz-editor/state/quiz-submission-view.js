import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizSubmissionViewEntity } from 'siren-sdk/src/activities/quizzes/submissionViews/QuizSubmissionViewEntity.js';

configureMobx({ enforceActions: 'observed' });

export class QuizSubmissionView {
	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async fetch(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);

		if (sirenEntity) {
			const entity = new QuizSubmissionViewEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.isPrimaryView = entity.isPrimaryView();
	}

	async updateProperty(updateFunc) {
		this.saving = updateFunc();
		const entity = await this.saving;
		this.saving = null;
		// The siren-sdk function called to perform an action first checks that the entity has permission to do so.
		// If the entity lacks permission, the function returns `undefined`, otherwise it returns a reconstructed siren-sdk submission views entity.
		// If `undefined` is returned, it likely means the UI is out of sync with the entity state, and disallowed actions can be performed.
		// In this case, we should attempt to reload the MobX object, so that the UI state is in sync again.
		if (!entity) {
			this.fetch();
			return;
		}
		this._entity = entity;
	}
}

decorate(QuizSubmissionView, {
	// props
	isPrimaryView: observable,
	// actions
	load: action
});
