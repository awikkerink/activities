import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizNotificationEmailEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {

		return [
			css`
			:host {
				display: block;
			}

			:host([hidden]) {
				display: none;
			}
			`
		];
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
			<div id="assignment-notification-email-container">
				<d2l-input-text
					label="${this.localize('emailNotificationDescription')}"
					value="${entity.notificationEmail}"
					maxlength="1024"
					?disabled="${!entity.canEditNotificationEmail}"
					@change="${this._onNotificationEmailChanged}"
					skip-alert
					novalidate
				></d2l-input-text>
			</div>
		`;
	}

	_onNotificationEmailChanged(event) {
		const entity = store.get(this.href);
		entity.setNotificationEmail(event.target.value);
	}
}

customElements.define(
	'd2l-activity-quiz-notification-email-editor',
	ActivityQuizNotificationEmailEditor
);
