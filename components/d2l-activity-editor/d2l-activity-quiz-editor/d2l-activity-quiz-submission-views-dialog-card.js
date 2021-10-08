import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { html } from 'lit-element/lit-element.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { sharedSubmissionViews as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsDialogCard
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {
	static get properties() {
		return {
			viewHref: {
				attribute: 'view-href',
				reflect: true,
				type: String
			  }
		};
	}

	constructor() {
		super(store);
	}

	render() {
		const viewsEntity = store.get(this.href);
		if (!viewsEntity || !this.viewHref) {
			return html``;
		}

		const entity = viewsEntity.getSubmissionViewByHref(this.viewHref);
		const { isPrimaryView, messageText, showAttemptScore, showQuestionsType, showLearnerResponses, showCorrectAnswers } = entity;
		return html`
			<div>
				Primary: ${isPrimaryView}, Message: ${messageText},  Questions: ${showQuestionsType}, Learner's Responses: ${showLearnerResponses}, Grade: ${showAttemptScore}, Answers: ${showCorrectAnswers}
			</div>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-dialog-card',
	ActivityQuizSubmissionViewsDialogCard
);
