import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store.js';

class ActivityQuizPasswordEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object }
		};
	}

	constructor() {
		super(store);
	}

	render() {

		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		return html`
			<d2l-input-text
				?skeleton="${this.skeleton}"
				maxlength="20"
				value="${entity.password}"
				@input="${this._setPassword}"
				label="${this.localize('passwordLabel')}"
				?disabled="${!entity.canEditPassword}"
				prevent-submit>
			</d2l-input-text>
		`;
	}

	_setPassword(event) {
		const entity = store.get(this.href);

		if (!entity) {
			return;
		}

		entity.setPassword(event.target.value);
	}
}

customElements.define(
	'd2l-activity-quiz-password-editor',
	ActivityQuizPasswordEditor
);
