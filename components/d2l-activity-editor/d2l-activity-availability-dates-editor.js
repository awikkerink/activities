import '@brightspace-ui/core/components/inputs/input-date-time.js';
import '@brightspace-ui/core/components/validation/validation-custom.js';
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

		return html`
			<d2l-input-date-time
				id="start-date-input"
				label="${this.localize('editor.startDate')}"
				value="${dates.startDate}"
				@change="${this._onStartDatetimeChanged}">
			</d2l-input-date-time>
			<d2l-validation-custom for="start-date-input" @d2l-validation-custom-validate=${this._validateStartDate} failure-text=${this.localize(dates.startDateErrorTerm)}>
			</d2l-validation-custom>

			<d2l-input-date-time
				id="end-date-input"
				label="${this.localize('editor.endDate')}"
				value="${dates.endDate}"
				@change="${this._onEndDatetimeChanged}">
			</d2l-input-date-time>
			<d2l-validation-custom for="end-date-input" @d2l-validation-custom-validate=${this._validateEndDate} failure-text=${this.localize(dates.endDateErrorTerm)}>
			</d2l-validation-custom>
		`;
	}

	updated(properties) {
		super.updated(properties);

		const startDateInput = this.shadowRoot.querySelector('#start-date-input');
		if (startDateInput) {
			startDateInput.requestValidate();
		}
		const endDateInput = this.shadowRoot.querySelector('#end-date-input');
		if (endDateInput) {
			endDateInput.requestValidate();
		}
	}

	_onEndDatetimeChanged(e) {
		store.get(this.href).dates.setEndDate(e.target.value);
	}

	_onStartDatetimeChanged(e) {
		store.get(this.href).dates.setStartDate(e.target.value);
	}

	_validateEndDate(e) {
		const entity = store.get(this.href);
		if (!entity || !entity.dates || !entity.dates.canEditDates) {
			e.detail.resolve(true);
			return;
		}
		e.detail.resolve(!entity.dates.endDateErrorTerm);
	}

	_validateStartDate(e) {
		const entity = store.get(this.href);
		if (!entity || !entity.dates || !entity.dates.canEditDates) {
			e.detail.resolve(true);
			return;
		}
		e.detail.resolve(!entity.dates.startDateErrorTerm);
	}

}
customElements.define('d2l-activity-availability-dates-editor', ActivityAvailabilityDatesEditor);
