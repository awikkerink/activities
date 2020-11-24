import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizHintsSummary
	extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	render() {
		const activity = store.get(this.href);
		if (!activity) {
			return html``;
		}

		const areHintsAllowed = activity.hintsToolEnabled;
		if (!areHintsAllowed) {
			return html``;
		}

		return html`${this.localize('hintsAllowedSummary')}`;
	}
}

customElements.define(
	'd2l-activity-quiz-hints-summary',
	ActivityQuizHintsSummary
);
