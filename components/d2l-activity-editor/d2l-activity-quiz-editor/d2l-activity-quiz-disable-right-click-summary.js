import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizDisableRightClickSummary
	extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	render() {
		const activity = store.get(this.href);
		if (!activity) {
			return html``;
		}

		const isDisableRightClickEnabled = activity.isDisableRightClickEnabled;
		if (!isDisableRightClickEnabled) {
			return html``;
		}

		return html`${this.localize('disableRightClickSummary')}`;
	}
}

customElements.define(
	'd2l-activity-quiz-disable-right-click-summary',
	ActivityQuizDisableRightClickSummary
);
