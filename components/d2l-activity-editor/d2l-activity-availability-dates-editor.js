import '@brightspace-ui/core/components/inputs/input-date-time.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityAvailabilityDatesEditor extends (ActivityEditorMixin(LocalizeActivityEditorMixin(MobxLitElement))) {

	static get styles() {
		return [labelStyles, css`
			:host([hidden]) {
				display: none;
			}
			#start-date-input {
				padding-bottom: 20px;
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

		const startDateErrorTerm = this.localize(dates.startDateErrorTerm);
		const startDateErrorValue = startDateErrorTerm ? startDateErrorTerm : null;

		const endDateErrorTerm = this.localize(dates.endDateErrorTerm);
		const endDateErrorValue = endDateErrorTerm ? endDateErrorTerm : null;

		return html`
			<d2l-input-date-time
				id="start-date-input"
				label="${this.localize('editor.startDate')}"
				value="${dates.startDate}"
				.validationError="${startDateErrorValue}"
				?invalid="${startDateErrorValue}"
				@change="${this._onStartDatetimeChanged}">
			</d2l-input-date-time>
			<d2l-input-date-time
				id="end-date-input"
				label="${this.localize('editor.endDate')}"
				value="${dates.endDate}"
				.validationError="${endDateErrorValue}"
				?invalid="${endDateErrorValue}"
				@change="${this._onEndDatetimeChanged}">
			</d2l-input-date-time>
		`;
	}

	_onEndDatetimeChanged(e) {
		store.get(this.href).dates.setEndDate(e.target.value);
	}

	_onStartDatetimeChanged(e) {
		store.get(this.href).dates.setStartDate(e.target.value);
	}
}
customElements.define('d2l-activity-availability-dates-editor', ActivityAvailabilityDatesEditor);
