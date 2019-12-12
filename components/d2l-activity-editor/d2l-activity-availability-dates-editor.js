import 'd2l-datetime-picker/d2l-datetime-picker';
import { connect } from './connect-mixin.js';
import { ActivityEditorMixin } from './d2l-activity-editor-mixin.js';
import reducer, { storeName, actions, selectActivityEntity, selectActivity } from './state/activity-usage.js';
import { css, html, LitElement } from 'lit-element/lit-element';
import { getLocalizeResources } from './localization';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class ActivityAvailabilityDatesEditor extends connect(ActivityEditorMixin(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			_startDate: { type: String },
			_endDate: { type: String },
			_overrides: { type: Object },
			_entity: { type: Object },
			_canEditStartDate: {type: Boolean},
			_canEditEndDate: {type: Boolean},
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
		this._endDate = '';
		this._startDate = '';
		this._canEditStartDate = false;
		this._canEditEndDate = false;
		this._overrides = document.documentElement.dataset.intlOverrides || '{}';
		this._storeName = storeName;
	}

	get _reducers() {
		return reducer;
	}

	get _entity() {
		return this.__entity;
	}

	set _entity(entity) {
		if (entity === this.__entity) {
			return;
		}

		entity.canEditStartDate().then(result => this._canEditStartDate = result);
		entity.canEditEndDate().then(result => this._canEditEndDate = result);

		const oldEntity = this.__entity;
		this.__entity = entity;
		this.requestUpdate(this.__entity, oldEntity);
	}

	_mapStateToProps(state) {
		const activity = selectActivity(state, this.href, this.token);
		return activity ? {
			_date: activity.dueDate,
			_startDate: activity.startDate,
			_endDate: activity.endDate,
			_entity: selectActivityEntity(state, this.href, this.token),
		} : {};
	}

	_mapDispatchToProps(dispatch) {
		return {
			_fetchActivity: () => dispatch(actions.fetchActivity(this.href, this.token)),
			_updateStartDate: (date) => dispatch(actions.updateStartDate({ href: this.href, token: this.token, date })),
			_updateEndDate: (date) => dispatch(actions.updateEndDate({ href: this.href, token: this.token, date }))
		}
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this._fetchActivity();
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
		return html`
		<label class="d2l-label-text" ?hidden=${!this._canEditStartDate}>${this.localize('startDate')}</label>
		<div id="startdate-container" ?hidden=${!this._canEditStartDate}>
			<d2l-datetime-picker
				hide-label
				name="startDate"
				id="startDate"
				date-label="${this.localize('startDate')}"
				time-label="${this.localize('startTime')}"
				datetime="${this._startDate}"
				overrides="${this._overrides}"
				placeholder="${this.localize('noStartDate')}"
				@d2l-datetime-picker-datetime-changed="${this._onStartDatetimePickerDatetimeChanged}"
				@d2l-datetime-picker-datetime-cleared="${this._onStartDatetimePickerDatetimeCleared}">
			</d2l-datetime-picker>
		</div>
		<label class="d2l-label-text" ?hidden=${!this._canEditEndDate}>${this.localize('endDate')}</label>
		<div id="enddate-container" ?hidden=${!this._canEditEndDate}>
			<d2l-datetime-picker
				hide-label
				name="endDate"
				id="endDate"
				date-label="${this.localize('endDate')}"
				time-label="${this.localize('endTime')}"
				datetime="${this._endDate}"
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
