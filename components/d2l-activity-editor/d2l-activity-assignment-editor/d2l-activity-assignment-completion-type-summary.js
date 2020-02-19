import { css, html } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';

class ActivityCompletionTypeSummary extends LocalizeMixin(MobxLitElement) {
	static get properties() {

		return {
			_completionType: { type: String }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	render() {
		return html`${this.localize('anonymousGradingEnabled')}`;
	}
}
customElements.define(
	'd2l-activity-assignment-completion-type-summary',
	ActivityCompletionTypeSummary
);