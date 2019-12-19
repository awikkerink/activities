import 'd2l-datetime-picker/d2l-datetime-picker';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import storeName from './state-mobxs/store-name.js';
import { connect } from './mobxs-connect-mixin.js';
import { ActivityEditorMixin } from './d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';

class ActivityAvailabilityDatesEditor extends connect(ActivityEditorMixin(LocalizeMixin(MobxLitElement))) {

	static storeName = storeName;

	static get properties() {
		return {
			_overrides: { type: Object },
			_activity: { type: Object },
		};
	}

	static get styles() {
		return [labelStyles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._overrides = document.documentElement.dataset.intlOverrides || '{}';
	}

	_updateStartDate(date) {
		this._activity.setStartDate(date);
	}

	_updateEndDate(date) {
		this._activity.setEndDate(date);
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this._activity = this.store.fetchActivity(this.href, this.token, this.autoSave);
		}
	}

	_onStartDatetimePickerDatetimeCleared() {
		this._updateStartDate('');
	}

	_onStartDatetimePickerDatetimeChanged(e) {
		if (e.detail.isSame(this._startDate)) {
			return;
		}
		this._updateStartDate(e.detail.toISOString());
	}

	_onEndDatetimePickerDatetimeCleared() {
		this._updateEndDate('');
	}

	_onEndDatetimePickerDatetimeChanged(e) {
		if (e.detail.isSame(this._endDate)) {
			return;
		}
		this._updateEndDate(e.detail.toISOString());
	}

	render() {
		if (!this._activity) {
			return html``;
		}

		const {
			startDate,
			canEditStartDate,
			endDate,
			canEditEndDate
		} = this._activity;

		return html`
		<label class="d2l-label-text" ?hidden=${!canEditStartDate}>${this.localize('startDate')}</label>
		<div id="startdate-container" ?hidden=${!canEditStartDate}>
			<d2l-datetime-picker
				hide-label
				name="startDate"
				id="startDate"
				date-label="${this.localize('startDate')}"
				time-label="${this.localize('startTime')}"
				datetime="${startDate}"
				overrides="${this._overrides}"
				placeholder="${this.localize('noStartDate')}"
				@d2l-datetime-picker-datetime-changed="${this._onStartDatetimePickerDatetimeChanged}"
				@d2l-datetime-picker-datetime-cleared="${this._onStartDatetimePickerDatetimeCleared}">
			</d2l-datetime-picker>
		</div>
		<label class="d2l-label-text" ?hidden=${!canEditEndDate}>${this.localize('endDate')}</label>
		<div id="enddate-container" ?hidden=${!canEditEndDate}>
			<d2l-datetime-picker
				hide-label
				name="endDate"
				id="endDate"
				date-label="${this.localize('endDate')}"
				time-label="${this.localize('endTime')}"
				datetime="${endDate}"
				overrides="${this._overrides}"
				placeholder="${this.localize('noEndDate')}"
				@d2l-datetime-picker-datetime-changed="${this._onEndDatetimePickerDatetimeChanged}"
				@d2l-datetime-picker-datetime-cleared="${this._onEndDatetimePickerDatetimeCleared}">
			</d2l-datetime-picker>
		</div>
		`;
	}
}
customElements.define('d2l-activity-availability-dates-editor', ActivityAvailabilityDatesEditor);
