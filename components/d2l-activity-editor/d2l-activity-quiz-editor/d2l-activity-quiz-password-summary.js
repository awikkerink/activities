import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizPasswordSummary
	extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	render() {
		const activity = store.get(this.href);
		if (!activity) {
			return html``;
		}

		const hasPassword = activity.password;
		if (!hasPassword) {
			return html``;
		}

		return html`${this.localize('passwordSummary')}`;
	}
}

customElements.define(
	'd2l-activity-quiz-password-summary',
	ActivityQuizPasswordSummary
);
