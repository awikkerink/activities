import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizHeaderFooterSummary extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	render() {
		const quiz = store.get(this.href);

		const {
			header
		} = quiz || {};

		if (!quiz || !header || header.length === 0) {
			return html``;
		} else {
			return html`${this.localize('headerAdded')}`;
		}
	}
}

customElements.define(
	'd2l-activity-quiz-manage-header-footer-summary',
	ActivityQuizHeaderFooterSummary
);
