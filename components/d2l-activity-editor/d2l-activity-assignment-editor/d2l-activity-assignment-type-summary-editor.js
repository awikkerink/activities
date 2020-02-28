import { css, html } from 'lit-element/lit-element.js';
import { getLocalizeResources } from '../localization.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/assignment-store.js';

class ActivityTypeSummaryEditor extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {
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
		const assignment = store.getAssignment(this.href);
		if (assignment && !assignment.isIndividualAssignmentType) {
			return html`${this.localize('txtGroupAssignmentSummary')}`;
		}

		return html``;
	}
}

customElements.define(
	'd2l-activity-assignment-type-summary-editor',
	ActivityTypeSummaryEditor
);