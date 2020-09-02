import '@brightspace-ui/core/components/inputs/input-date-time.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityDueDateEditor extends ActivityEditorMixin(LocalizeActivityEditorMixin(MobxLitElement)) {

	static get styles() {
		return [labelStyles, css`
			:host([hidden]) {
				display: none;
			}
		`];
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		const dates = entity.dates || {};
		if (!dates.canEditDates) {
			return html``;
		}

		const errorTerm = this.localize(dates.dueDateErrorTerm);
		const errorValue = errorTerm ? errorTerm : null;

		return html`
			<d2l-input-date-time
				label="${this.localize('editor.dueDate')}"
				value="${dates.dueDate}"
				.validationError="${errorValue}"
				?invalid="${errorValue}"
				@change="${this._onDatetimeChanged}">
			</d2l-input-date-time>
		`;
	}

	_onDatetimeChanged(e) {
		store.get(this.href).dates.setDueDate(e.target.value);
	}
}
customElements.define('d2l-activity-due-date-editor', ActivityDueDateEditor);
