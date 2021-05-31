import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizHeaderFooterDialogSummary extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	static get styles() {

		return [
			bodySmallStyles,
			css`
				.d2l-body-small {
					margin-top: 0.3rem;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		return html`
			${this._renderHeaderAdded()}
			${this._renderFooterAdded()}
		`;
	}

	_renderFooterAdded() {
		const quiz = store.get(this.href);

		const {
			footer
		} = quiz || {};
		const isFooter = footer && footer.length > 0;
		if (!quiz || !isFooter) {
			return html``;
		} else if (isFooter) {
			return html`
				<div class="d2l-body-small">${this.localize('footerAdded')}</div>
			`;
		}
	}

	_renderHeaderAdded() {
		const quiz = store.get(this.href);

		const {
			header
		} = quiz || {};

		const isHeader = header && header.length > 0;

		if (!quiz || !isHeader) {
			return html``;
		} else if (isHeader) {
			return html`
				<div class="d2l-body-small">${this.localize('headerAdded')}</div>
			`;
		}
	}
}

customElements.define(
	'd2l-activity-quiz-manage-header-footer-dialog-summary',
	ActivityQuizHeaderFooterDialogSummary
);
