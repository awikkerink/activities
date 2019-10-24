import 'd2l-datetime-picker/d2l-datetime-picker';
import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { SirenFetchMixinLit } from 'siren-sdk/src/mixin/siren-fetch-mixin-lit';

class ActivityDueDateEditor extends SirenFetchMixinLit(EntityMixinLit(LitElement)) {

	static get properties() {
		return {
			dateLabel: { type: String },
			timeLabel: { type: String },
			_date: { type: String },
			_overrides: { type: Object }
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

	constructor() {
		super();
		this._setEntityType(ActivityUsageEntity);
		this._date = '';
		this._overrides = document.documentElement.dataset.intlOverrides || '{}';
	}

	set _entity(entity) {
		if (!this._entityHasChanged(entity)) {
			return;
		}

		if (entity) {
			this._date = entity.dueDate();
		}

		super._entity = entity;
	}

	_onDatetimePickerDatetimeCleared() {
		this._updateDueDate('');
	}

	_onDatetimePickerDatetimeChanged(e) {
		if (e.detail.isSame(this._date)) {
			return;
		}

		this._updateDueDate(e.detail.toISOString());
	}

	_updateDueDate(dateString) {
		if (!super._entity.canEditDueDate()) {
			return;
		}

		const action = super._entity.saveDueDateAction();
		const fields = [{ name: 'dueDate', value: dateString }];
		this._performSirenAction(action, fields);
	}

	render() {
		return html`
			<div id="datetime-picker-container">
				<d2l-datetime-picker
					hide-label
					name="date"
					id="date"
					date-label="${this.dateLabel}"
					time-label="${this.timeLabel}"
					datetime="${this._date}"
					overrides="${this._overrides}"
					@d2l-datetime-picker-datetime-changed="${this._onDatetimePickerDatetimeChanged}"
					@d2l-datetime-picker-datetime-cleared="${this._onDatetimePickerDatetimeCleared}">
				</d2l-datetime-picker>
			</div>
		`;
	}

}
customElements.define('d2l-activity-due-date-editor', ActivityDueDateEditor);
