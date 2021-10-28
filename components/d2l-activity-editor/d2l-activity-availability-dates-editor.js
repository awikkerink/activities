import '../d2l-activity-date-type-dialog/d2l-activity-date-type-dialog.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/inputs/input-date-time.js';
import '@brightspace-ui/core/components/validation/validation-custom.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityAvailabilityDatesEditor extends (ActivityEditorMixin(LocalizeActivityEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			labelStyles,
			bodySmallStyles,
			css`
			:host([hidden]) {
				display: none;
			}
			:host {
				display: flex;
				flex-direction: column;
			}
			#start-date-input {
				padding-bottom: 20px;
			}
			#start-date-type-text {
				margin-top: -16px;
				padding-bottom: 20px;
			}
			#end-date-type-text {
				margin-top: 4px;
			}
			.d2l-body-small {
				margin: 0.5rem 0 1rem 0;
			}
		`];
	}

	constructor() {
		super(store);
	}

	render() {
		const {
			canEditDates,
			startDate,
			startDateType,
			endDate,
			endDateType,
			startDateError,
			endDateError,
			defaultStartDateType,
			defaultEndDateType,
			displayInCalendar,
		} = this._getDateValues();

		const renderDateTypeEditor = startDateType !== undefined && endDateType !== undefined;
		const startType = (startDateType === undefined || startDateType === null)
			? defaultStartDateType
			: startDateType;
		const endType = (endDateType === undefined || endDateType === null)
			? defaultEndDateType
			: endDateType;

		return html`
			<d2l-input-date-time
				id="start-date-input"
				label="${this.localize('editor.startDate')}"
				time-default-value="startOfDay"
				value="${startDate}"
				@change="${this._onStartDatetimeChanged}"
				?disabled="${!canEditDates}">
			</d2l-input-date-time>
			${this._renderStartDateTypeEditor(renderDateTypeEditor, startDate, startType, displayInCalendar)}
			<d2l-validation-custom
				for="start-date-input"
				@d2l-validation-custom-validate=${this._validateStartDate}
				failure-text="${startDateError}">
			</d2l-validation-custom>
			<d2l-input-date-time
				id="end-date-input"
				label="${this.localize('editor.endDate')}"
				time-default-value="endOfDay"
				value="${endDate}"
				@change="${this._onEndDatetimeChanged}"
				?disabled="${!canEditDates}">
			</d2l-input-date-time>
			${this._renderEndDateTypeEditor(renderDateTypeEditor, endDate, endType, displayInCalendar)}
			<d2l-validation-custom
				for="end-date-input"
				@d2l-validation-custom-validate=${this._validateEndDate}
				failure-text="${endDateError}">
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

	_getDateTypeLangTerm(dateType) {
		const dateTypeLangMap = {
			0 : 'editor.lblVisibleWithAccessRestricted', //accessRestricted
			1 : 'editor.lblVisibleWithSubmissionRestricted', //submissionRestricted
			2 : 'editor.lblHidden' //hidden
		};

		return this.localize(dateTypeLangMap[dateType]);
	}
	_getDateValues() {
		const datesEntity = {
			canEditDates: true,
			startDate: null,
			startDateType: null,
			endDate: null,
			endDateType: null,
			startDateError: null,
			endDateError: null,
			defaultStartDateType: 0, //@todo: (accessRestricted) this default type should be fetched from the store once it is updated
			defaultEndDateType: 0, //@todo: (accessRestricted) this default type should be fetched from the store once it is updated
			displayInCalendar: false, //@todo: this value should be fetched from the store once it is updated
		};

		const entity = store.get(this.href);
		if (!entity || !entity.dates) {
			return datesEntity;
		}

		const dates = entity.dates;

		if (!dates.canEditDates) {
			datesEntity.canEditDates = false;
		}

		if (dates.startDateErrorTerm) {
			datesEntity.startDateError = this.localize(dates.startDateErrorTerm);
		}

		if (dates.endDateErrorTerm) {
			datesEntity.endDateError = this.localize(dates.endDateErrorTerm);
		}

		if (dates.startDate) {
			datesEntity.startDate = dates.startDate;
		}
		datesEntity.startDateType = dates.startDateType;

		if (dates.endDate) {
			datesEntity.endDate = dates.endDate;
		}
		datesEntity.endDateType = dates.endDateType;

		return datesEntity;
	}

	_onEndDatetimeChanged(e) {
		store.get(this.href).dates.setEndDate(e.target.value);
	}

	_onEndDateTypeUpdate(e) {
		const { action, dateType, displayInCalendar } = e.detail;
		if (action !== 'done') return;

		const endDateTypeButton = this.shadowRoot.querySelector('#end-date-type-button');
		endDateTypeButton.text = this._getDateTypeLangTerm(dateType);

		// Sync display in calendar selection
		const startDateTypeDialog = this.shadowRoot.querySelector('#start-date-type-dialog');
		startDateTypeDialog.displayInCalendar = displayInCalendar;
	}

	_onStartDatetimeChanged(e) {
		store.get(this.href).dates.setStartDate(e.target.value);
	}

	_onStartDateTypeUpdate(e) {
		const { action, dateType, displayInCalendar } = e.detail;
		if (action !== 'done') return;

		const startDateTypeButton = this.shadowRoot.querySelector('#start-date-type-button');
		startDateTypeButton.text = this._getDateTypeLangTerm(dateType);

		// Sync display in calendar selection
		const endDateTypeDialog = this.shadowRoot.querySelector('#end-date-type-dialog');
		endDateTypeDialog.displayInCalendar = displayInCalendar;
	}

	_openEndDateTypeDialog() {
		const dialog = this.shadowRoot.querySelector('#end-date-type-dialog');
		dialog.opened = true;
	}

	_openStartDateTypeDialog() {
		const dialog = this.shadowRoot.querySelector('#start-date-type-dialog');
		dialog.opened = true;
	}

	_renderEndDateTypeEditor(renderDateTypeEditor, endDate, dateType, displayInCalendar) {
		if (!renderDateTypeEditor) {
			return html``;
		}

		return html`
			<div ?hidden=${!endDate} id="end-date-type-text">
				<span class="d2l-body-small">${this.localize('editor.afterEndDate')}</span>
				<d2l-button-subtle
					id="end-date-type-button"
					@click=${this._openEndDateTypeDialog}
					text=${this._getDateTypeLangTerm(dateType)}
					aria-haspopup="true">
				</d2l-button-subtle>
			</div>
			<d2l-activity-date-type-dialog
				id="end-date-type-dialog"
				@d2l-activity-date-type-dialog-closed=${this._onEndDateTypeUpdate}
				.titleText=${this.localize('editor.availabilityEndTitle')}
				.descriptionText=${this.localize('editor.endDescription', { assignment: this.localize('editor.assignment') })}
				.dateType=${dateType}
				.displayInCalendar=${displayInCalendar}
			>
			</d2l-activity-date-type-dialog>
		`;
	}

	_renderStartDateTypeEditor(renderDateTypeEditor, startDate, dateType, displayInCalendar) {
		if (!renderDateTypeEditor) {
			return html``;
		}

		return html`
			<div ?hidden=${!startDate} id="start-date-type-text">
				<span class="d2l-body-small">${this.localize('editor.beforeStartDate')}</span>
				<d2l-button-subtle
					id="start-date-type-button"
					@click=${this._openStartDateTypeDialog}
					text=${this._getDateTypeLangTerm(dateType)}
					aria-haspopup="true">
				</d2l-button-subtle>
			</div>
			<d2l-activity-date-type-dialog
				id="start-date-type-dialog"
				@d2l-activity-date-type-dialog-closed=${this._onStartDateTypeUpdate}
				.titleText=${this.localize('editor.availabilityStartTitle')}
				.descriptionText=${this.localize('editor.startDescription', { assignment: this.localize('editor.assignment') })}
				.dateType=${dateType}
				.displayInCalendar=${displayInCalendar}
			>
			</d2l-activity-date-type-dialog>
		`;
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
