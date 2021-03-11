import { bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store.js';

class ActivityQuizManageHeaderFooterEditor extends ActivityEditorDialogMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {

		return [
			bodyCompactStyles,
			labelStyles,
			css`
				.d2l-body-text-container {
					margin-bottom: 1rem;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const quiz = store.get(this.href);

		const {
			header,
			canEditHeader,
			headerRichTextEditorConfig
		} = quiz || {};

		const headerLang = this.localize('header');

		return html`
			<div class="d2l-body-text-container"><p class="d2l-body-compact">${this.localize('headerDialogText')}</p></div>
			<div class="d2l-label-text">${this.localize('headerLabel')}</div>
			<d2l-activity-text-editor
				.value="${header}"
				.richtextEditorConfig="${headerRichTextEditorConfig}"
				@d2l-activity-text-editor-change="${this._saveHeaderOnChange}"
				ariaLabel="${headerLang}"
				?disabled="${canEditHeader === undefined ? false : !canEditHeader}">
			</d2l-activity-text-editor>
		`;
	}

	_saveHeaderOnChange(e) {
		store.get(this.href).setHeader(e.detail.content);
	}

}

customElements.define(
	'd2l-activity-quiz-manage-header-footer-editor',
	ActivityQuizManageHeaderFooterEditor
);
