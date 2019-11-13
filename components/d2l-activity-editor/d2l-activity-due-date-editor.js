import 'd2l-datetime-picker/d2l-datetime-picker';
import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { SaveStatusMixin } from './save-status-mixin';

class ActivityDueDateEditor extends SaveStatusMixin(EntityMixinLit(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
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

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
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
		this.wrapSaveAction(super._entity.setDueDate(''));
	}

	_onDatetimePickerDatetimeChanged(e) {
		if (e.detail.isSame(this._date)) {
			return;
		}

		this.wrapSaveAction(super._entity.setDueDate(e.detail.toISOString()));
	}

	render() {
		return html`
			<div id="datetime-picker-container">
				<d2l-datetime-picker
					hide-label
					name="date"
					id="date"
					date-label="${this.localize('dueDate')}"
					time-label="${this.localize('dueTime')}"
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
