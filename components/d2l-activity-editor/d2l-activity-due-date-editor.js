import 'd2l-datetime-picker/d2l-datetime-picker';
import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { SaveStatusMixin } from './save-status-mixin';

class ActivityDueDateEditor extends SaveStatusMixin(EntityMixinLit(LitElement)) {

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
		this._overrides = document.documentElement.intlOverrides || '{}';
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
		this.save(super._entity.setDueDate(''));
	}

	_onDatetimePickerDatetimeChanged(e) {
		if (e.detail.isSame(this._date)) {
			return;
		}

		this.save(super._entity.setDueDate(e.detail.toISOString()));
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
