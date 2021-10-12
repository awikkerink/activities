import '@brightspace-ui/core/components/icons/icon.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { sharedSubmissionViews as store } from './state/quiz-store';

class ActivityQuizSubmissionViewsSummary
	extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity || !entity.submissionViews) return html``;
		return html`${this.localize('submissionViewsAccordionSummary', 'count', entity.submissionViews.length)}`;
	}
}

customElements.define(
	'd2l-activity-quiz-submission-views-summary',
	ActivityQuizSubmissionViewsSummary
);
