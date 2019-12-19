import 'd2l-datetime-picker/d2l-datetime-picker';
import { css, html } from 'lit-element/lit-element';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import storeName from './state-mobxs/store-name.js';
import { connect } from './mobxs-connect-mixin.js';
import { ActivityEditorMixin } from './d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';

class ActivityDueDateEditor extends connect(ActivityEditorMixin(LocalizeMixin(MobxLitElement))) {

	static storeName = storeName;

	static get properties() {
		return {
			_activity: { type: Object },
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
		this._overrides = document.documentElement.dataset.intlOverrides || '{}';
	}

	_updateDueDate(date) {
		this._activity.setDueDate(date);
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this._activity = this.store.fetchActivity(this.href, this.token, this.autoSave);
		}
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

	render() {
		if (!this._activity) {
			return html``;
		}

		const {
			dueDate,
			canEditDueDate
		} = this._activity;

		return html`
			<div id="datetime-picker-container">
				<d2l-datetime-picker
					?disabled="${canEditDueDate}"
					hide-label
					name="date"
					id="date"
					date-label="${this.localize('dueDate')}"
					time-label="${this.localize('dueTime')}"
					datetime="${dueDate}"
					overrides="${this._overrides}"
					placeholder="${this.localize('noDueDate')}"
					@d2l-datetime-picker-datetime-changed="${this._onDatetimePickerDatetimeChanged}"
					@d2l-datetime-picker-datetime-cleared="${this._onDatetimePickerDatetimeCleared}">
				</d2l-datetime-picker>
			</div>
		`;
	}

}
customElements.define('d2l-activity-due-date-editor', ActivityDueDateEditor);
