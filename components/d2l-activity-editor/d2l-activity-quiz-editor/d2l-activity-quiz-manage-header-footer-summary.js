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
			header,
			footer
		} = quiz || {};
		const isHeader = header && header.length > 0;
		const isFooter = footer && footer.length > 0;

		if (!quiz || !(isHeader || isFooter)) {
			return html``;
		} else if (isHeader && !isFooter) {
			return html`${this.localize('headerAdded')}`;
		} else if (!isHeader && isFooter) {
			return html`${this.localize('footerAdded')}`;
		} else if (isHeader && isFooter) {
			return html`${this.localize('headerAndFooterAdded')}`;
		}
	}
}

customElements.define(
	'd2l-activity-quiz-manage-header-footer-summary',
	ActivityQuizHeaderFooterSummary
);
